'use strict';

/* Lift & Cut 2.5.0 – RFL mode
 * A user-controlled planning and monitoring workspace based on the category,
 * protein, training-volume and break schedules in the supplied first edition
 * of The Rapid Fat Loss Handbook. It deliberately does not prescribe drugs,
 * stimulants, electrolyte doses or medical care.
 */

const LC_RFL = Object.freeze({
  VERSION: '2.5.0',
  SOURCE_EDITION: 'The Rapid Fat Loss Handbook, first edition (2005)',
  DAYS: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  PROTEIN_FACTORS: {
    1: {inactive:[1,1.25], aerobic:[1.25,1.5], weights:[1.5,2.0]},
    2: {inactive:[0.9,0.9], aerobic:[1.1,1.1], weights:[1.25,1.25]},
    3: {inactive:[0.8,0.8], aerobic:[0.9,0.9], weights:[1.0,1.0]}
  },
  DURATIONS: {
    1:{min:11,max:12,defaultDays:12,label:'11–12 days'},
    2:{min:14,max:42,defaultDays:28,label:'2–6 weeks'},
    3:{min:42,max:84,defaultDays:56,label:'6–12 weeks'}
  },
  EVENT_LABELS: {
    'Free meal':'Free meal',
    'Structured refeed':'Structured refeed',
    'End-of-block refeed':'End-of-block refeed / transition',
    'Full diet break':'Full diet break / maintenance',
    'Transition':'Transition',
    'Note':'Plan note'
  },
  SYMPTOMS: ['Dizziness','Fainting','Chest pain','Palpitations','Unusual weakness','Severe weakness','Persistent vomiting','Other concerning symptom'],
  SERIOUS_SYMPTOMS: ['Fainting','Chest pain','Palpitations','Severe weakness','Persistent vomiting']
});

let selectedRflDate = localDateISO();
let rflSetupSuggestedProtein = 0;

function rflEnsureState(target = state) {
  if (!target || typeof target !== 'object') return target;
  ['rflProfiles','rflDailyLogs','rflEvents'].forEach(key => {
    if (!Array.isArray(target[key])) target[key] = [];
  });
  target.schemaVersion = 6;
  target.meta ||= {};
  target.meta.appVersion = LC_RFL.VERSION;
  target.settings ||= {};
  const defaults = {
    rflVegetableGoal:3,
    rflAutoSwitchProgram:true,
    rflRestoreProgramOnEnd:true,
    rflDefaultProfessionalSupport:'Not recorded',
    rflLastView:'dashboard',
    rflSafetyAcknowledged:false
  };
  Object.entries(defaults).forEach(([key,value]) => {
    if (target.settings[key] === undefined || target.settings[key] === null) target.settings[key] = value;
  });
  (target.programs || []).forEach(program => {
    const shipped = ['UL4','RFL2','GVS_EXTRA'].includes(program.id);
    if (program.builtIn === undefined) program.builtIn = shipped;
    program.sourceType ||= shipped ? 'Built-in' : 'Custom';
  });
  target.rflProfiles.forEach(row => {
    row.id ||= uid('rfl-profile');
    row.freeMealDays = Array.isArray(row.freeMealDays) ? row.freeMealDays : [];
    row.updatedAt ||= nowISO();
  });
  target.rflDailyLogs.forEach(row => {
    row.id ||= uid('rfl-day');
    row.symptoms = Array.isArray(row.symptoms) ? row.symptoms : [];
    row.updatedAt ||= nowISO();
  });
  target.rflEvents.forEach(row => {
    row.id ||= uid('rfl-event');
    row.planned = row.planned !== false;
    row.completed = Boolean(row.completed);
    row.updatedAt ||= nowISO();
  });
  return target;
}

function rflAddDays(dateISO, amount) {
  const date = parseDate(dateISO);
  if (!date) return '';
  date.setDate(date.getDate() + Number(amount || 0));
  return localDateISO(date);
}
function activeRflPhase() {
  return [...(state.dietPhases || [])]
    .filter(row => row.mode === 'RFL / PSMF' && row.status === 'Active')
    .sort((a,b) => String(b.startDate).localeCompare(String(a.startDate)))[0] || null;
}
function rflProfileForPhase(phaseId) {
  return (state.rflProfiles || []).find(row => row.phaseId === phaseId) || null;
}
function latestRflProfile() {
  return [...(state.rflProfiles || [])].sort((a,b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))[0] || null;
}
function rflDailyLog(dateISO = selectedRflDate, create = false, phaseId = activeRflPhase()?.id || '') {
  let row = (state.rflDailyLogs || []).find(item => item.date === dateISO && (!phaseId || item.phaseId === phaseId));
  if (!row && create) {
    row = {id:uid('rfl-day'),date:dateISO,phaseId,vegetableServings:'',essentialFatPlanDone:false,supplementPlanDone:false,symptoms:[],notes:'',updatedAt:nowISO()};
    state.rflDailyLogs.push(row);
  }
  return row || null;
}
function rflEventsForPhase(phaseId) {
  return (state.rflEvents || []).filter(row => row.phaseId === phaseId).sort((a,b) => String(a.date+a.type).localeCompare(String(b.date+b.type)));
}
function rflFormValue(id) { return document.getElementById(id)?.value ?? ''; }
function rflFormChecked(id) { return Boolean(document.getElementById(id)?.checked); }
function rflLatestWeight() { return toNum(latestMetric()?.weightKg) || 0; }
function rflLatestBodyFat() {
  return [...(state.bodyMetrics || [])].filter(row => toNum(row.bodyFatPct)>0).sort((a,b)=>String(b.date).localeCompare(String(a.date)))[0]?.bodyFatPct || '';
}
function rflCategoryFromBodyFat(sex, bodyFatPct) {
  const bf = toNum(bodyFatPct);
  if (!bf) return 0;
  if (sex === 'Female') return bf <= 24 ? 1 : bf <= 34 ? 2 : 3;
  if (sex === 'Male') return bf <= 15 ? 1 : bf <= 25 ? 2 : 3;
  return 0;
}
function rflCategoryBandText(sex) {
  return sex === 'Female' ? 'Category 1 ≤24%; Category 2 25–34%; Category 3 ≥35%.' : 'Category 1 ≤15%; Category 2 16–25%; Category 3 ≥26%.';
}
function rflFactorRange(category, activity) {
  return LC_RFL.PROTEIN_FACTORS[Number(category)]?.[activity] || [0,0];
}
function rflActivityLabel(value) {
  return value === 'weights' ? 'Weight training' : value === 'aerobic' ? 'Aerobic only' : 'Inactive';
}
function rflScheduleSummary(category) {
  if (Number(category) === 1) return 'No routine free meal; finish the 11–12 day block with a 2–3 day structured refeed/transition.';
  if (Number(category) === 2) return 'One free meal and one approximately five-hour structured refeed each week; then a maintenance/diet break.';
  if (Number(category) === 3) return 'Two free meals each week; no routine structured refeed; then a maintenance/diet break.';
  return 'Choose a category to see the supplied edition’s schedule.';
}
function rflSetupCalculation() {
  const basis = rflFormValue('rflBasis') || 'Body-fat estimate';
  const sex = rflFormValue('rflSex');
  const bodyWeightKg = toNum(rflFormValue('rflBodyWeight'));
  const bodyFatPct = toNum(rflFormValue('rflBodyFat'));
  const enteredLbmKg = toNum(rflFormValue('rflLbmKg'));
  const activity = rflFormValue('rflActivity') || 'weights';
  const autoCategory = rflCategoryFromBodyFat(sex,bodyFatPct);
  const override = rflFormValue('rflCategoryOverride');
  const category = override ? Number(override) : autoCategory;
  const leanBodyMassKg = basis === 'Lean body mass' ? enteredLbmKg : bodyWeightKg && bodyFatPct ? bodyWeightKg*(1-bodyFatPct/100) : 0;
  const leanBodyMassLb = leanBodyMassKg*2.2046226218;
  const factors = rflFactorRange(category,activity);
  const minProtein = leanBodyMassLb*factors[0];
  const maxProtein = leanBodyMassLb*factors[1];
  const suggestedProtein = minProtein && maxProtein ? Math.round((minProtein+maxProtein)/2) : 0;
  return {basis,sex,bodyWeightKg,bodyFatPct,enteredLbmKg,activity,autoCategory,category,leanBodyMassKg,leanBodyMassLb,factors,minProtein,maxProtein,suggestedProtein,duration:LC_RFL.DURATIONS[category]||{min:0,max:0,defaultDays:0,label:'—'}};
}

function openRflSetup(phaseId = '') {
  rflEnsureState();
  const phase = phaseId ? state.dietPhases.find(row=>row.id===phaseId && row.status==='Active') : null;
  const prior = phase ? rflProfileForPhase(phase.id) : latestRflProfile();
  const activeProgramNow = activeProgram();
  const category = toNum(prior?.category);
  const startDate = phase?.startDate || localDateISO();
  const duration = toNum(prior?.plannedDays) || toNum(phase?.plannedDays) || LC_RFL.DURATIONS[category]?.defaultDays || 28;
  const previousProgramId = prior?.previousProgramId || (activeProgramNow?.id === 'RFL2' ? 'UL4' : activeProgramNow?.id || 'UL4');
  const defaultFree1 = prior?.freeMealDays?.[0] || 'Thursday';
  const defaultFree2 = prior?.freeMealDays?.[1] || 'Monday';
  showModal(`<div class="card-title"><span>${phase?'Review':'Set up'} RFL phase</span><button class="ghost compact" onclick="closeModal();render()">Close</button></div>
    <div class="notice warn"><strong>Extreme-diet workspace.</strong> It calculates the supplied book’s category/protein framework and monitors the plan you choose. It does not decide that RFL is appropriate or provide medication, stimulant, electrolyte or supplement dosing.</div>
    <form class="stack rfl-setup-form" style="margin-top:10px" onsubmit="saveRflSetup(event,'${esc(phaseId)}')">
      <details open><summary><strong>1 · Body composition</strong></summary>
        <div class="split rfl-form-grid">
          <label>Sex used by the category table<select id="rflSex" required onchange="updateRflSetupPreview()"><option value="">Choose</option>${['Male','Female'].map(value=>`<option ${value===prior?.sex?'selected':''}>${value}</option>`).join('')}</select></label>
          <label>Calculation basis<select id="rflBasis" onchange="updateRflSetupPreview()">${['Body-fat estimate','Lean body mass'].map(value=>`<option ${value===(prior?.calculationBasis||'Body-fat estimate')?'selected':''}>${value}</option>`).join('')}</select></label>
          <label>Body weight kg<input id="rflBodyWeight" type="number" min="30" max="400" step="0.1" value="${esc(toNum(prior?.bodyWeightKg)||toNum(phase?.startWeightKg)||rflLatestWeight()||'')}" oninput="updateRflSetupPreview()"></label>
          <label>Body-fat %<input id="rflBodyFat" type="number" min="3" max="70" step="0.1" value="${esc(toNum(prior?.bodyFatPct)||rflLatestBodyFat()||'')}" oninput="updateRflSetupPreview()"></label>
          <label>Direct lean mass kg<input id="rflLbmKg" type="number" min="20" max="250" step="0.1" value="${esc(toNum(prior?.leanBodyMassKg)||'')}" oninput="updateRflSetupPreview()"></label>
          <label>Body-fat / lean-mass method<input id="rflBodyFatMethod" value="${esc(prior?.bodyFatMethod||'')}" placeholder="Calipers, DEXA, estimate..."></label>
          <label>Category override<select id="rflCategoryOverride" onchange="updateRflSetupPreview()"><option value="">Automatic from body-fat %</option>${[1,2,3].map(value=>`<option value="${value}" ${Number(prior?.category)===value && prior?.categoryOverridden?'selected':''}>Category ${value}</option>`).join('')}</select></label>
          <label>Activity for protein table<select id="rflActivity" onchange="updateRflSetupPreview()">${[['inactive','Inactive'],['aerobic','Aerobic only'],['weights','Weight training']].map(([value,label])=>`<option value="${value}" ${value===(prior?.activity||'weights')?'selected':''}>${label}</option>`).join('')}</select></label>
        </div>
        <div id="rflSetupPreview" class="rfl-setup-preview"></div>
      </details>
      <details open><summary><strong>2 · Phase plan</strong></summary>
        <div class="split rfl-form-grid">
          <label>Start date<input id="rflStartDate" type="date" value="${esc(startDate)}" required></label>
          <label>Planned days<input id="rflPlannedDays" type="number" min="1" max="120" value="${esc(duration)}" oninput="this.dataset.userSet='1';updateRflSetupPreview()"></label>
          <label>Protein target g<input id="rflProteinTarget" type="number" min="40" max="500" value="${esc(toNum(prior?.proteinTargetG)||toNum(phase?.proteinTargetAtStart)||'')}"></label>
          <label>Optional calorie target<input id="rflCalorieTarget" type="number" min="0" value="${esc(toNum(phase?.calorieTargetAtStart)||toNum(state.settings.rflCalorieTarget)||'')}" placeholder="From your actual plan"></label>
          <label>Free-meal day 1<select id="rflFreeDay1">${['None',...LC_RFL.DAYS].map(value=>`<option ${value===defaultFree1?'selected':''}>${value}</option>`).join('')}</select></label>
          <label>Free-meal day 2<select id="rflFreeDay2">${['None',...LC_RFL.DAYS].map(value=>`<option ${value===defaultFree2?'selected':''}>${value}</option>`).join('')}</select></label>
          <label>Structured-refeed day<select id="rflRefeedDay">${LC_RFL.DAYS.map(value=>`<option ${value===(prior?.refeedDay||'Monday')?'selected':''}>${value}</option>`).join('')}</select></label>
          <label>Return-to program<select id="rflPreviousProgram">${state.programs.filter(program=>program.id!=='RFL2'&&program.active!==false).map(program=>`<option value="${esc(program.id)}" ${program.id===previousProgramId?'selected':''}>${esc(program.name)}</option>`).join('')}</select></label>
        </div>
        <label class="inline-check"><input id="rflSwitchProgram" type="checkbox" ${prior?.switchedProgram===false?'':'checked'}> Switch training to the equipment-aware RFL two-day programme</label>
      </details>
      <details open><summary><strong>3 · Safety and oversight</strong></summary>
        <label>Professional support status<select id="rflProfessionalSupport">${['Not recorded','Discussed with doctor','Dietitian / nutrition professional involved','Specialist service involved','Other'].map(value=>`<option ${value===(prior?.professionalSupport||state.settings.rflDefaultProfessionalSupport)?'selected':''}>${value}</option>`).join('')}</select></label>
        <label class="inline-check rfl-ack"><input id="rflSafetyAck" type="checkbox" ${prior?.safetyAcknowledged?'checked':''} required> I understand this is an extreme short-term phase and the app is not a substitute for medical advice or clinical monitoring.</label>
        <label class="inline-check rfl-ack"><input id="rflPlanAck" type="checkbox" ${prior?.planAcknowledged?'checked':''} required> I will use my own book/clinician plan for food choices, essential fats, fluids, electrolytes, supplements, medication review, free meals and refeeds.</label>
        <label>Notes<textarea id="rflSetupNotes" placeholder="Context, professional instructions, planned transition...">${esc(prior?.notes||phase?.notes||'')}</textarea></label>
      </details>
      <button type="submit">${phase?'Save phase changes':'Start RFL phase'}</button>
    </form>`);
  updateRflSetupPreview();
}

function updateRflSetupPreview() {
  const box=document.getElementById('rflSetupPreview');
  if(!box)return;
  const calc=rflSetupCalculation();
  const daysInput=document.getElementById('rflPlannedDays');
  if(calc.category && daysInput && !daysInput.dataset.userSet){
    const current=toNum(daysInput.value);
    if(!current || current===28)daysInput.value=calc.duration.defaultDays;
  }
  rflSetupSuggestedProtein=calc.suggestedProtein;
  const proteinInput=document.getElementById('rflProteinTarget');
  if(proteinInput && !toNum(proteinInput.value) && calc.suggestedProtein)proteinInput.value=calc.suggestedProtein;
  const planned=toNum(daysInput?.value);
  const outside=calc.category&&planned&&(planned<calc.duration.min||planned>calc.duration.max);
  if(!calc.category||!calc.leanBodyMassKg){
    box.innerHTML='<div class="notice warn">Enter a valid body-fat basis or direct lean mass and choose/derive a category.</div>';
    return;
  }
  box.innerHTML=`<div class="rfl-preview-kpis"><div><span>Category</span><strong>${calc.category}</strong></div><div><span>Lean mass</span><strong>${round(calc.leanBodyMassKg,1)} kg</strong></div><div><span>Protein factor</span><strong>${round(calc.factors[0],2)}${calc.factors[1]!==calc.factors[0]?`–${round(calc.factors[1],2)}`:''} g/lb</strong></div><div><span>Protein range</span><strong>${Math.round(calc.minProtein)}${Math.round(calc.maxProtein)!==Math.round(calc.minProtein)?`–${Math.round(calc.maxProtein)}`:''} g</strong></div></div><div class="small muted">${esc(rflCategoryBandText(calc.sex))} Planned block in the supplied edition: ${esc(calc.duration.label)}. ${esc(rflScheduleSummary(calc.category))}</div>${outside?`<div class="notice warn" style="margin-top:8px">${planned} days is outside the supplied edition’s usual ${esc(calc.duration.label)} range for Category ${calc.category}. Add an explanation in Notes before saving.</div>`:''}`;
}

function rflValidatedSchedule(category, freeDays, refeedDay) {
  const unique=[...new Set(freeDays.filter(value=>value&&value!=='None'))];
  if(Number(category)===1)return {freeMealDays:[],refeedDay:''};
  if(Number(category)===2)return {freeMealDays:unique.slice(0,1),refeedDay:refeedDay||'Monday'};
  return {freeMealDays:unique.slice(0,2),refeedDay:''};
}
function saveRflSetup(event, phaseId='') {
  event.preventDefault();
  rflEnsureState();
  const calc=rflSetupCalculation();
  const startDate=rflFormValue('rflStartDate');
  const plannedDays=Math.max(1,Math.round(toNum(rflFormValue('rflPlannedDays'))));
  const proteinTarget=Math.round(toNum(rflFormValue('rflProteinTarget'))||calc.suggestedProtein);
  if(!calc.sex||!calc.category||!calc.leanBodyMassKg||!proteinTarget)return showToast('Complete body composition, category and protein details',4500);
  if(!startDate)return showToast('Choose a start date');
  if(startDate>localDateISO())return showToast('Start the phase on its first day; future phases can be recorded in Notes',5000);
  if(!rflFormChecked('rflSafetyAck')||!rflFormChecked('rflPlanAck'))return showToast('Both acknowledgements are required',5000);
  const outside=plannedDays<calc.duration.min||plannedDays>calc.duration.max;
  const notes=rflFormValue('rflSetupNotes').trim();
  if(outside&&!notes)return showToast('Explain the duration outside the supplied book range in Notes',5000);
  const schedule=rflValidatedSchedule(calc.category,[rflFormValue('rflFreeDay1'),rflFormValue('rflFreeDay2')],rflFormValue('rflRefeedDay'));
  const previousProgramId=rflFormValue('rflPreviousProgram')||'UL4';
  const switchedProgram=rflFormChecked('rflSwitchProgram')&&state.programs.some(program=>program.id==='RFL2');
  let phase=phaseId?state.dietPhases.find(row=>row.id===phaseId&&row.status==='Active'):null;
  const isNew=!phase;
  if(!phase){
    (state.dietPhases||[]).filter(row=>row.status==='Active').forEach(row=>{
      row.status='Completed';row.actualEndDate=rflAddDays(startDate,-1);row.endWeightKg=toNum(metricOnOrBefore(row.actualEndDate)?.weightKg)||'';row.updatedAt=nowISO();
    });
    phase={id:uid('phase'),status:'Active'};state.dietPhases.push(phase);
  }
  const plannedEndDate=rflAddDays(startDate,plannedDays-1);
  Object.assign(phase,{name:`RFL Category ${calc.category} · ${formatDate(startDate,{day:'numeric',month:'short',year:'numeric'})}`,mode:'RFL / PSMF',goalType:'RFL monitoring',startDate,plannedEndDate,actualEndDate:'',startWeightKg:calc.bodyWeightKg||toNum(metricOnOrBefore(startDate)?.weightKg)||'',endWeightKg:'',targetWeightKg:'',targetLossKg:'',targetRatePctPerWeek:'',calorieTargetAtStart:numOrBlank(rflFormValue('rflCalorieTarget')),proteinTargetAtStart:proteinTarget,status:'Active',refeedPlan:rflScheduleSummary(calc.category),notes,plannedDays,rflCategory:calc.category,updatedAt:nowISO()});
  let profile=rflProfileForPhase(phase.id);
  if(!profile){profile={id:uid('rfl-profile'),phaseId:phase.id};state.rflProfiles.push(profile);}
  Object.assign(profile,{sex:calc.sex,calculationBasis:calc.basis,bodyWeightKg:calc.bodyWeightKg||'',bodyFatPct:calc.bodyFatPct||'',leanBodyMassKg:round(calc.leanBodyMassKg,2),leanBodyMassLb:round(calc.leanBodyMassLb,2),bodyFatMethod:rflFormValue('rflBodyFatMethod'),category:calc.category,categoryOverridden:Boolean(rflFormValue('rflCategoryOverride')),activity:calc.activity,proteinFactorMin:calc.factors[0],proteinFactorMax:calc.factors[1],proteinTargetG:proteinTarget,plannedDays,previousProgramId,switchedProgram,freeMealDays:schedule.freeMealDays,refeedDay:schedule.refeedDay,professionalSupport:rflFormValue('rflProfessionalSupport'),safetyAcknowledged:true,planAcknowledged:true,sourceEdition:LC_RFL.SOURCE_EDITION,notes,updatedAt:nowISO()});
  state.settings.rflProteinTarget=proteinTarget;
  state.settings.rflCalorieTarget=numOrBlank(rflFormValue('rflCalorieTarget'));
  state.settings.rflSafetyAcknowledged=true;
  state.settings.rflDefaultProfessionalSupport=profile.professionalSupport;
  state.settings.dietMode='RFL / PSMF';
  state.settings.dietView='rfl';
  if(switchedProgram){state.settings.activeProgram='RFL2';state.settings.lastSession=sessionKey('RFL2',state.programs.find(program=>program.id==='RFL2')?.sessions?.[0]?.id||'');}
  rflRegenerateEvents(phase,profile);
  saveState();closeModal();page='diet';localStorage.setItem(PAGE_KEY,page);selectedRflDate=localDateISO();render();showToast(isNew?'RFL phase started':'RFL phase updated',3500);
}

function rflRegenerateEvents(phase,profile) {
  const completed=(state.rflEvents||[]).filter(event=>event.phaseId===phase.id&&event.completed);
  const custom=(state.rflEvents||[]).filter(event=>event.phaseId===phase.id&&!event.planned);
  state.rflEvents=(state.rflEvents||[]).filter(event=>event.phaseId!==phase.id);
  const byKey=new Map([...completed,...custom].map(event=>[`${event.date}|${event.type}`,event]));
  const add=(date,type,extra={})=>{
    const old=byKey.get(`${date}|${type}`);
    state.rflEvents.push({id:old?.id||uid('rfl-event'),phaseId:phase.id,date,endDate:extra.endDate||old?.endDate||'',type,durationHours:extra.durationHours??old?.durationHours??'',planned:true,completed:Boolean(old?.completed),notes:old?.notes||'',updatedAt:nowISO()});
  };
  let cursor=parseDate(phase.startDate),end=parseDate(phase.plannedEndDate);
  while(cursor&&end&&cursor<=end){
    const iso=localDateISO(cursor),day=weekdayName(iso);
    if((profile.freeMealDays||[]).includes(day))add(iso,'Free meal');
    if(Number(profile.category)===2&&profile.refeedDay===day)add(iso,'Structured refeed',{durationHours:5});
    cursor.setDate(cursor.getDate()+1);
  }
  const after=rflAddDays(phase.plannedEndDate,1);
  if(Number(profile.category)===1)add(after,'End-of-block refeed',{endDate:rflAddDays(after,2),durationHours:72});
  else add(after,'Full diet break',{endDate:rflAddDays(after,13),durationHours:336});
  custom.forEach(event=>{if(!state.rflEvents.some(row=>row.id===event.id))state.rflEvents.push(event);});
}

function setDietViewRfl(){rflEnsureState();state.settings.dietView='rfl';saveState();render();window.scrollTo({top:0,behavior:'smooth'});}
function openRflPage(){state.settings.dietView='rfl';saveState();setPage('diet');}
function rflNextEvent(phaseId,date=localDateISO()){return rflEventsForPhase(phaseId).find(event=>!event.completed&&event.date>=date)||null;}
function rflNextEventText(phaseId){const event=rflNextEvent(phaseId);return event?`${LC_RFL.EVENT_LABELS[event.type]||event.type} · ${formatDate(event.date,{day:'numeric',month:'short'})}`:'None scheduled';}
function rflWorkoutScheduled(dateISO){return Boolean(activeProgram()?.sessions?.some(session=>String(session.day).toLowerCase()===weekdayName(dateISO).toLowerCase()));}

function renderRflInactivePage(){
  const history=[...(state.dietPhases||[])].filter(row=>row.mode==='RFL / PSMF').sort((a,b)=>String(b.startDate).localeCompare(String(a.startDate))).slice(0,10);
  return `<div class="grid rfl-page">${renderDietSectionNav('rfl')}
    <div class="card highlight rfl-hero"><div class="row-head"><div><div class="eyebrow">RFL workspace</div><h2>Plan, monitor and exit a short RFL block</h2></div><span class="pill warn">Extreme phase</span></div><p class="small muted">Calculate lean mass and the supplied edition’s category-dependent protein range, generate the break schedule, switch to low-volume training, track daily execution and finish through a deliberate transition.</p><div class="button-row"><button onclick="openRflSetup()">Set up RFL phase</button><button class="ghost" onclick="setDietView('coach')">Weight-loss coach</button></div><div class="notice warn" style="margin-top:10px">This mode supports a plan you have chosen. It does not determine whether a very-low-energy diet is appropriate for you and does not prescribe drugs or supplements.</div></div>
    <div class="cards rfl-feature-cards"><div><strong>Category calculator</strong><span>Body-fat or direct lean-mass basis</span></div><div><strong>Protein range</strong><span>Category × activity × lean mass</span></div><div><strong>Training preservation</strong><span>Two-day low-volume program</span></div><div><strong>Exit planning</strong><span>Refeed or maintenance transition</span></div></div>
    <div class="card"><div class="card-title"><span>Previous RFL phases</span><span class="pill gray">${history.length}</span></div>${history.length?`<div class="list">${history.map(phase=>`<div class="row"><div class="row-head"><div><strong>${esc(phase.name)}</strong><div class="small muted">${esc(phase.startDate)} → ${esc(phase.actualEndDate||phase.plannedEndDate||'open')} · ${esc(phase.status)}</div></div><button class="ghost compact" onclick="openRflPhaseSummary('${esc(phase.id)}')">Review</button></div></div>`).join('')}</div>`:'<div class="empty">No RFL phases recorded.</div>'}</div>
    <details class="card"><summary class="card-title"><span>Mode boundaries</span></summary><div class="stack small muted"><p>The calculation uses the supplied first edition’s category thresholds, lean-body-mass protein factors and break schedule.</p><p>The app deliberately omits its stimulant/drug discussion and does not provide electrolyte or supplement doses. You remain responsible for obtaining appropriate clinical advice and using an up-to-date plan.</p></div></details>
  </div>`;
}
function openRflPhaseSummary(phaseId){
  const phase=state.dietPhases.find(row=>row.id===phaseId),profile=rflProfileForPhase(phaseId);if(!phase)return;
  const logs=(state.rflDailyLogs||[]).filter(row=>row.phaseId===phaseId);
  const events=rflEventsForPhase(phaseId);
  const start=toNum(phase.startWeightKg),end=toNum(phase.endWeightKg)||toNum(metricOnOrBefore(phase.actualEndDate||phase.plannedEndDate)?.weightKg);
  showModal(`<div class="card-title"><span>${esc(phase.name)}</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="rfl-preview-kpis"><div><span>Category</span><strong>${profile?.category||'—'}</strong></div><div><span>Protein</span><strong>${profile?.proteinTargetG?`${Math.round(profile.proteinTargetG)} g`:'—'}</strong></div><div><span>Daily logs</span><strong>${logs.length}</strong></div><div><span>Scale change</span><strong>${start&&end?`${round(end-start,1)} kg`:'—'}</strong></div></div><div class="small muted">${esc(phase.startDate)} → ${esc(phase.actualEndDate||phase.plannedEndDate||'open')} · ${esc(phase.status)}</div>${phase.notes?`<div class="notice" style="margin-top:10px">${esc(phase.notes)}</div>`:''}<div class="list" style="margin-top:10px">${events.slice(0,12).map(event=>`<div class="metric-line"><span>${esc(formatDate(event.date))} · ${esc(LC_RFL.EVENT_LABELS[event.type]||event.type)}</span><strong>${event.completed?'Done':'Planned'}</strong></div>`).join('')||'<div class="empty">No scheduled events.</div>'}</div>`);
}

function renderRflModePage(){
  rflEnsureState();
  const phase=activeRflPhase();
  if(!phase)return renderRflInactivePage();
  const profile=rflProfileForPhase(phase.id);
  if(!profile)return `<div class="grid">${renderDietSectionNav('rfl')}<div class="card"><div class="notice warn">This phase has no RFL setup profile.</div><button style="margin-top:10px" onclick="openRflSetup('${esc(phase.id)}')">Repair setup</button></div></div>`;
  const today=localDateISO();
  const phaseEnd=phase.actualEndDate||phase.plannedEndDate;
  if(selectedRflDate<phase.startDate||selectedRflDate>phaseEnd)selectedRflDate=today>=phase.startDate&&today<=phaseEnd?today:phase.startDate;
  const totals=foodTotals(selectedRflDate);
  const log=rflDailyLog(selectedRflDate,false,phase.id)||{};
  const checkin=(state.dailyCheckins||[]).find(row=>row.date===selectedRflDate)||{};
  const nutrition=coachingNutritionDayAssessment(selectedRflDate);
  const workouts=(state.workoutSessions||[]).filter(row=>row.date===selectedRflDate&&row.completed!==false);
  const score=rflChecklistScore(profile,log,totals,nutrition,checkin,workouts);
  const currentDay=Math.max(1,daysBetween(phase.startDate,today)+1);
  const totalDays=Math.max(1,daysBetween(phase.startDate,phase.plannedEndDate)+1);
  const daysLeft=Math.max(0,daysBetween(today,phase.plannedEndDate));
  const rate=coachingRateMetrics(today,Math.min(21,Math.max(8,currentDay)));
  const symptoms=log.symptoms||[];
  const serious=symptoms.some(value=>LC_RFL.SERIOUS_SYMPTOMS.includes(value));
  const todayEvent=rflEventsForPhase(phase.id).find(event=>event.date===selectedRflDate);
  return `<div class="grid rfl-page">${renderDietSectionNav('rfl')}
    <div class="card highlight rfl-hero"><div class="row-head"><div><div class="eyebrow">RFL mode · Category ${profile.category}</div><h2>Day ${Math.min(currentDay,totalDays)} of ${totalDays}</h2></div><span class="pill warn">Monitoring only</span></div><div class="rfl-hero-grid"><div><span>Protein target</span><strong>${Math.round(profile.proteinTargetG)} g</strong></div><div><span>Days remaining</span><strong>${daysLeft}</strong></div><div><span>Trend rate</span><strong>${rate.available?`${round(rate.lossPctPerWeek,2)}%/wk`:'Building'}</strong></div><div><span>Next event</span><strong>${esc(rflNextEventText(phase.id))}</strong></div></div><div class="button-row"><button onclick="openRflDailyLog('${esc(today)}')">Today’s check-in</button><button class="secondary" onclick="setPage('train')">Train</button><button class="ghost" onclick="openRflSetup('${esc(phase.id)}')">Edit phase</button><button class="ghost" onclick="openEndRflPhase('${esc(phase.id)}')">End / transition</button></div><div class="notice warn" style="margin-top:10px">Very-low-energy diets are not a long-term strategy and warrant professional oversight. This app does not provide medication or supplement dosing.</div></div>
    ${serious?`<div class="card danger-card"><div class="card-title"><span>Concerning symptom recorded</span><span class="pill danger">Act now</span></div><strong>${esc(symptoms.join(' · '))}</strong><div class="small muted" style="margin-top:6px">Stop the diet and obtain prompt medical assessment; use urgent services for severe or acute symptoms.</div></div>`:symptoms.length?`<div class="card warning-card"><div class="card-title"><span>Symptoms recorded</span><span class="pill warn">${symptoms.length}</span></div><strong>${esc(symptoms.join(' · '))}</strong><div class="small muted">Review persistent or worsening symptoms with a healthcare professional.</div></div>`:''}
    <div class="card rfl-date-card"><div class="row-head"><button class="ghost compact" onclick="changeRflDate(-1)">←</button><div><div class="small muted">Daily RFL log</div><strong>${esc(formatDate(selectedRflDate,{weekday:'long',day:'numeric',month:'short'}))}</strong></div><button class="ghost compact" onclick="changeRflDate(1)">→</button></div><input type="date" value="${esc(selectedRflDate)}" min="${esc(phase.startDate)}" max="${esc(phaseEnd)}" onchange="selectedRflDate=this.value;render()">${todayEvent?`<div class="notice" style="margin-top:8px"><strong>${esc(LC_RFL.EVENT_LABELS[todayEvent.type]||todayEvent.type)}</strong>${todayEvent.durationHours?` · ${esc(todayEvent.durationHours)} hours`:''}</div>`:''}</div>
    <div class="cards rfl-kpis"><div><span>Protein</span><strong>${Math.round(totals.protein)} / ${Math.round(profile.proteinTargetG)} g</strong><div class="progress"><span style="width:${clamp(totals.protein/profile.proteinTargetG*100,0,100)}%"></span></div></div><div><span>Checklist</span><strong>${score.score}%</strong><small>${esc(score.label)}</small></div><div><span>Vegetables</span><strong>${toNum(log.vegetableServings)||0} / ${toNum(state.settings.rflVegetableGoal)||3}</strong><small>user-defined servings</small></div><div><span>Water</span><strong>${toNum(checkin.waterMl)||0} ml</strong><small>target ${toNum(state.settings.waterTargetMl)||'—'}</small></div></div>
    <div class="card"><div class="card-title"><span>Daily checklist</span><button class="secondary compact" onclick="openRflDailyLog('${esc(selectedRflDate)}')">Edit details</button></div><div class="rfl-checklist">
      ${rflChecklistButton('Nutrition log',nutrition.score>=85,`${nutrition.status} · ${Math.round(nutrition.score)}%`,`openNutritionDayStatusModal('${esc(selectedRflDate)}')`)}
      ${rflChecklistButton('Protein target',totals.protein>=profile.proteinTargetG*.9,`${Math.round(totals.protein)} of ${Math.round(profile.proteinTargetG)} g`,`setDietView('diary')`)}
      ${rflChecklistButton('Non-starchy vegetables',toNum(log.vegetableServings)>=toNum(state.settings.rflVegetableGoal),`${toNum(log.vegetableServings)||0} servings`,`openRflDailyLog('${esc(selectedRflDate)}')`)}
      ${rflChecklistButton('Essential-fat plan',Boolean(log.essentialFatPlanDone),log.essentialFatPlanDone?'Marked complete':'Not checked',`toggleRflDailyFlag('${esc(selectedRflDate)}','essentialFatPlanDone')`)}
      ${rflChecklistButton('Book / clinician supplement plan',Boolean(log.supplementPlanDone),log.supplementPlanDone?'Marked complete':'Not checked',`toggleRflDailyFlag('${esc(selectedRflDate)}','supplementPlanDone')`)}
      ${rflChecklistButton('Training / recovery',workouts.length>0||!rflWorkoutScheduled(selectedRflDate),workouts.length?`${workouts.length} workout completed`:rflWorkoutScheduled(selectedRflDate)?'Scheduled today':'Recovery day',`setPage('train')`)}
    </div></div>
    <div class="grid rfl-two-column">${renderRflPlanCard(phase,profile)}${renderRflScheduleCard(phase)}</div>
    <div class="grid rfl-two-column">${renderRflStrengthCard(phase)}${renderRflWeightCard(phase)}</div>
    ${renderRflRecipeCard()}${renderRflRecentDays(phase)}
  </div>`;
}

function rflChecklistButton(label,done,detail,action){return `<button type="button" class="rfl-check-row ${done?'done':''}" onclick="${action}"><span class="rfl-check-icon">${done?'✓':'○'}</span><span><strong>${esc(label)}</strong><small>${esc(detail)}</small></span><span>›</span></button>`;}
function rflChecklistScore(profile,log,totals,nutrition,checkin,workouts){
  const criteria=[nutrition.score>=85,totals.protein>=profile.proteinTargetG*.9,toNum(log.vegetableServings)>=toNum(state.settings.rflVegetableGoal),Boolean(log.essentialFatPlanDone),Boolean(log.supplementPlanDone),workouts.length>0||!rflWorkoutScheduled(selectedRflDate)];
  const score=Math.round(criteria.filter(Boolean).length/criteria.length*100);
  return {score,label:score>=85?'On plan':score>=60?'Needs attention':'Incomplete'};
}
function changeRflDate(amount){const phase=activeRflPhase();if(!phase)return;const next=rflAddDays(selectedRflDate,amount),end=phase.actualEndDate||phase.plannedEndDate;if(next<phase.startDate||next>end)return;selectedRflDate=next;render();window.scrollTo({top:0,behavior:'smooth'});}
function toggleRflDailyFlag(dateISO,key){const phase=activeRflPhase();if(!phase)return;const row=rflDailyLog(dateISO,true,phase.id);row[key]=!row[key];row.updatedAt=nowISO();saveState();render();}
function openRflDailyLog(dateISO=localDateISO()){
  const phase=activeRflPhase();if(!phase)return openRflSetup();
  const row=rflDailyLog(dateISO,false,phase.id)||{};
  showModal(`<div class="card-title"><span>RFL daily check-in</span><button class="ghost compact" onclick="closeModal()">Close</button></div><form class="stack" onsubmit="saveRflDailyLog(event,'${esc(dateISO)}','${esc(row.id||'')}')"><label>Date<input id="rflLogDate" type="date" min="${esc(phase.startDate)}" max="${esc(phase.actualEndDate||phase.plannedEndDate)}" value="${esc(dateISO)}"></label><label>Non-starchy vegetable servings<input id="rflVegServings" type="number" min="0" max="30" step="0.5" value="${esc(row.vegetableServings||'')}"></label><label class="inline-check"><input id="rflEssentialFatDone" type="checkbox" ${row.essentialFatPlanDone?'checked':''}> Completed my own essential-fat plan</label><label class="inline-check"><input id="rflSupplementDone" type="checkbox" ${row.supplementPlanDone?'checked':''}> Completed my book/clinician supplement and electrolyte plan</label><fieldset><legend>Symptoms</legend><div class="rfl-symptom-grid">${LC_RFL.SYMPTOMS.map(value=>`<label class="inline-check"><input type="checkbox" name="rflSymptom" value="${esc(value)}" ${(row.symptoms||[]).includes(value)?'checked':''}> ${esc(value)}</label>`).join('')}</div></fieldset><label>Notes<textarea id="rflDailyNotes" placeholder="Energy, hunger, training, event details...">${esc(row.notes||'')}</textarea></label><div class="notice warn">Fainting, chest pain, palpitations, severe weakness or persistent vomiting should not be treated as an ordinary adherence issue.</div><button type="submit">Save check-in</button></form>`);
}
function saveRflDailyLog(event,originalDate,id){
  event.preventDefault();const phase=activeRflPhase();if(!phase)return;
  const date=rflFormValue('rflLogDate')||originalDate;
  let row=id?state.rflDailyLogs.find(item=>item.id===id):rflDailyLog(originalDate,false,phase.id);
  if(!row){row={id:uid('rfl-day'),phaseId:phase.id};state.rflDailyLogs.push(row);}
  Object.assign(row,{date,vegetableServings:numOrBlank(rflFormValue('rflVegServings')),essentialFatPlanDone:rflFormChecked('rflEssentialFatDone'),supplementPlanDone:rflFormChecked('rflSupplementDone'),symptoms:[...document.querySelectorAll('input[name="rflSymptom"]:checked')].map(input=>input.value),notes:rflFormValue('rflDailyNotes').trim(),updatedAt:nowISO()});
  selectedRflDate=date;saveState();closeModal();render();showToast('RFL check-in saved');
}

function renderRflPlanCard(phase,profile){
  const activeProgramNow=activeProgram();const kit=programEquipmentSummary(activeProgramNow);
  return `<div class="card"><div class="card-title"><span>Phase plan</span><span class="pill warn">Category ${profile.category}</span></div><div class="list compact-list"><div class="metric-line"><span>Lean body mass</span><strong>${round(profile.leanBodyMassKg,1)} kg</strong></div><div class="metric-line"><span>Protein factor</span><strong>${round(profile.proteinFactorMin,2)}${profile.proteinFactorMax!==profile.proteinFactorMin?`–${round(profile.proteinFactorMax,2)}`:''} g/lb</strong></div><div class="metric-line"><span>Protein target</span><strong>${Math.round(profile.proteinTargetG)} g</strong></div><div class="metric-line"><span>Activity table</span><strong>${esc(rflActivityLabel(profile.activity))}</strong></div><div class="metric-line"><span>Professional support</span><strong>${esc(profile.professionalSupport||'Not recorded')}</strong></div></div><hr class="divider"><div class="row-head"><div><strong>${esc(activeProgramNow?.name||'No program')}</strong><div class="small muted">${kit.ready}/${kit.total} slots match your equipment · 2–3 RIR · no failure</div></div><button class="secondary compact" onclick="setPage('program')">Program</button></div>${kit.issues.length?`<button class="ghost compact" style="margin-top:8px" onclick="openEquipmentAdaptation('${esc(activeProgramNow?.id||'')}')">Create equipment-matched copy</button>`:''}</div>`;
}
function renderRflScheduleCard(phase){
  const events=rflEventsForPhase(phase.id),next=rflNextEvent(phase.id);
  return `<div class="card"><div class="card-title"><span>Break and transition schedule</span><button class="secondary compact" onclick="openRflEventModal('${esc(phase.id)}')">Add note/event</button></div>${next?`<div class="notice"><strong>Next: ${esc(LC_RFL.EVENT_LABELS[next.type]||next.type)}</strong><div class="small">${esc(formatDate(next.date,{weekday:'short',day:'numeric',month:'short'}))}${next.endDate?` → ${esc(formatDate(next.endDate))}`:''}</div></div>`:''}<div class="list rfl-event-list" style="margin-top:10px">${events.slice(0,14).map(event=>`<button class="rfl-event-row ${event.completed?'done':''}" onclick="toggleRflEvent('${esc(event.id)}')"><span>${event.completed?'✓':'○'}</span><span><strong>${esc(LC_RFL.EVENT_LABELS[event.type]||event.type)}</strong><small>${esc(formatDate(event.date,{weekday:'short',day:'numeric',month:'short'}))}${event.endDate?` → ${esc(formatDate(event.endDate))}`:''}</small></span></button>`).join('')||'<div class="empty">No schedule generated.</div>'}</div><div class="small muted">Tap an event to mark it complete. Free meals and refeeds are planned events, not unbounded eating periods.</div></div>`;
}
function toggleRflEvent(id){const row=state.rflEvents.find(event=>event.id===id);if(!row)return;row.completed=!row.completed;row.updatedAt=nowISO();saveState();render();}
function openRflEventModal(phaseId){showModal(`<div class="card-title"><span>Add RFL event</span><button class="ghost compact" onclick="closeModal()">Close</button></div><form class="stack" onsubmit="saveRflEvent(event,'${esc(phaseId)}')"><label>Date<input id="rflEventDate" type="date" value="${esc(localDateISO())}"></label><label>Type<select id="rflEventType">${Object.keys(LC_RFL.EVENT_LABELS).map(type=>`<option value="${esc(type)}">${esc(LC_RFL.EVENT_LABELS[type])}</option>`).join('')}</select></label><label>Duration hours<input id="rflEventHours" type="number" min="0" step="1"></label><label>Notes<textarea id="rflEventNotes"></textarea></label><button type="submit">Save event</button></form>`);}
function saveRflEvent(event,phaseId){event.preventDefault();state.rflEvents.push({id:uid('rfl-event'),phaseId,date:rflFormValue('rflEventDate'),endDate:'',type:rflFormValue('rflEventType'),durationHours:numOrBlank(rflFormValue('rflEventHours')),planned:false,completed:false,notes:rflFormValue('rflEventNotes').trim(),updatedAt:nowISO()});saveState();closeModal();render();showToast('RFL event added');}

function renderRflWeightCard(phase){
  const metrics=(state.bodyMetrics||[]).filter(row=>row.date>=phase.startDate&&row.date<=(phase.actualEndDate||localDateISO())&&toNum(row.weightKg)>0);
  const rate=coachingRateMetrics(localDateISO(),Math.min(21,Math.max(8,daysBetween(phase.startDate,localDateISO())+1)));
  const start=toNum(phase.startWeightKg),current=rate.currentTrend||toNum(latestMetric()?.weightKg),change=start&&current?current-start:0;
  return `<div class="card"><div class="card-title"><span>Weight trend</span><span class="pill gray">${metrics.length} weigh-ins</span></div>${coachingTrendChartSvg(30)}<div class="rfl-mini-grid"><div><span>Start</span><strong>${start?`${round(start,1)} kg`:'—'}</strong></div><div><span>Current trend</span><strong>${current?`${round(current,1)} kg`:'—'}</strong></div><div><span>Change</span><strong>${current&&start?`${change>0?'+':''}${round(change,1)} kg`:'—'}</strong></div></div><div class="small muted">Early low-carbohydrate scale change includes water and is not equivalent to fat loss.</div></div>`;
}
function rflStrengthMetrics(phase){
  const baselineStart=rflAddDays(phase.startDate,-42),baselineEnd=rflAddDays(phase.startDate,-1),activeEnd=phase.actualEndDate||localDateISO();
  const program=state.programs.find(row=>row.id==='RFL2');
  const slots=[...new Map((program?.sessions||[]).flatMap(session=>(session.exercises||[]).map(slot=>[slot.exerciseId||slot.name,slot])).filter(([key])=>key)).values()];
  const rows=[];
  slots.forEach(slot=>{
    const match=log=>slot.exerciseId?log.exerciseId===slot.exerciseId:log.exercise===slot.name;
    const before=(state.workoutLogs||[]).filter(log=>match(log)&&!log.warmup&&log.date>=baselineStart&&log.date<=baselineEnd).map(log=>toNum(log.estimated1RM)).filter(Boolean);
    const during=(state.workoutLogs||[]).filter(log=>match(log)&&!log.warmup&&log.date>=phase.startDate&&log.date<=activeEnd).sort((a,b)=>String(a.date).localeCompare(String(b.date))).map(log=>toNum(log.estimated1RM)).filter(Boolean);
    if(before.length&&during.length){const baseline=Math.max(...before),current=during.at(-1);rows.push({name:slot.name,baseline,current,ratio:current/baseline});}
  });
  const ratio=rows.length?rows.reduce((sum,row)=>sum+row.ratio,0)/rows.length:0;
  return {rows,ratio,label:!rows.length?'Building baseline':ratio>=.95?'Stable':ratio>=.9?'Watch':'Declining'};
}
function renderRflStrengthCard(phase){const metrics=rflStrengthMetrics(phase),cls=metrics.label==='Stable'?'good':metrics.label==='Declining'?'danger':'warn';return `<div class="card"><div class="card-title"><span>Strength retention</span><span class="pill ${cls}">${esc(metrics.label)}</span></div>${metrics.rows.length?`<div class="list compact-list">${metrics.rows.slice(0,6).map(row=>`<div class="metric-line"><span>${esc(row.name)}</span><strong>${Math.round(row.ratio*100)}%</strong></div>`).join('')}</div><div class="small muted">Compared with the best estimated 1RM in the six weeks before the phase. This is directional, not a muscle-mass measurement.</div>`:'<div class="empty">Complete comparable exercises before and during the phase to build a retention signal.</div>'}<button class="secondary compact" style="margin-top:10px" onclick="setPage('train')">Open training</button></div>`;}
function renderRflRecipeCard(){const recipes=[...(state.recipes||[])].filter(recipe=>recipe.rflFriendly==='Yes').filter(recipe=>!(state.settings.noShellfish&&recipe.noShellfish===false)).filter(recipe=>!(state.settings.noBellPeppers&&recipe.noBellPeppers===false)).sort((a,b)=>toNum(perServing(b,'protein'))-toNum(perServing(a,'protein'))).slice(0,8);return `<div class="card"><div class="card-title"><span>Saved RFL-friendly recipes</span><button class="secondary compact" onclick="setDietView('diary')">All recipes</button></div>${recipes.length?`<div class="rfl-recipe-grid">${recipes.map(recipe=>`<button class="rfl-recipe-tile" onclick="openRecipeView('${esc(recipe.id)}')"><strong>${esc(recipe.name)}</strong><span>${Math.round(perServing(recipe,'kcal'))} kcal · ${round(perServing(recipe,'protein'),0)}P · ${round(perServing(recipe,'fat'),0)}F</span></button>`).join('')}</div>`:'<div class="empty">Tag suitable recipes as RFL Yes after reviewing their ingredients and your plan.</div>'}<div class="small muted" style="margin-top:8px">The tag is a personal filter, not medical or dietary approval.</div></div>`;}
function renderRflRecentDays(phase){const dates=[];for(let i=6;i>=0;i--)dates.push(rflAddDays(localDateISO(),-i));return `<details class="card"><summary class="card-title"><span>Last seven days</span><span class="pill gray">daily execution</span></summary><div class="coaching-week-table"><div class="coaching-week-head"><span>Date</span><span>Protein</span><span>Veg</span><span>Log</span><span>Symptoms</span></div>${dates.map(date=>{const totals=foodTotals(date),log=rflDailyLog(date,false,phase.id)||{},nutrition=coachingNutritionDayAssessment(date);return `<div class="coaching-week-row" onclick="selectedRflDate='${esc(date)}';render()"><span>${esc(formatDate(date))}</span><strong>${Math.round(totals.protein)}g</strong><span>${toNum(log.vegetableServings)||0}</span><span>${Math.round(nutrition.score)}%</span><span>${(log.symptoms||[]).length||'—'}</span></div>`;}).join('')}</div></details>`;}

function openEndRflPhase(phaseId){
  const phase=state.dietPhases.find(row=>row.id===phaseId),profile=rflProfileForPhase(phaseId);if(!phase||!profile)return;
  showModal(`<div class="card-title"><span>End RFL and transition</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="notice warn">A scale increase after carbohydrate, sodium and food volume return can reflect glycogen, water and gut content. Do not judge the transition from one weigh-in.</div><form class="stack" style="margin-top:10px" onsubmit="saveEndRflPhase(event,'${esc(phaseId)}')"><div class="split"><label>Actual end date<input id="rflEndDate" type="date" min="${esc(phase.startDate)}" value="${esc(localDateISO())}"></label><label>Ending weight kg<input id="rflEndWeight" type="number" step="0.1" value="${esc(toNum(latestMetric()?.weightKg)||'')}"></label></div><label>Next phase<select id="rflNextMode"><option>Maintenance / transition</option><option>Normal / moderate deficit</option><option>Custom / decide later</option></select></label><label class="inline-check"><input id="rflRestoreProgram" type="checkbox" ${state.settings.rflRestoreProgramOnEnd!==false?'checked':''}> Restore ${esc(state.programs.find(program=>program.id===profile.previousProgramId)?.name||'previous program')}</label><label>Transition notes<textarea id="rflEndNotes" placeholder="Refeed/diet-break plan, calorie target, professional advice..."></textarea></label><button type="submit">Complete phase</button></form>`);
}
function saveEndRflPhase(event,phaseId){
  event.preventDefault();const phase=state.dietPhases.find(row=>row.id===phaseId),profile=rflProfileForPhase(phaseId);if(!phase||!profile)return;
  const endDate=rflFormValue('rflEndDate')||localDateISO();
  phase.actualEndDate=endDate;phase.endWeightKg=numOrBlank(rflFormValue('rflEndWeight'));phase.status='Completed';phase.notes=[phase.notes,rflFormValue('rflEndNotes').trim()].filter(Boolean).join(' | ');phase.updatedAt=nowISO();
  const nextMode=rflFormValue('rflNextMode');
  if(nextMode!=='Custom / decide later'){
    state.settings.dietMode=nextMode;
    state.dietPhases.push({id:uid('phase'),name:nextMode==='Maintenance / transition'?'Post-RFL transition':'Post-RFL normal cut',mode:nextMode,goalType:nextMode==='Maintenance / transition'?'Maintain weight':'Lose weight',startDate:rflAddDays(endDate,1),plannedEndDate:'',actualEndDate:'',startWeightKg:phase.endWeightKg||'',endWeightKg:'',targetWeightKg:state.settings.targetWeightKg||'',targetLossKg:'',targetRatePctPerWeek:nextMode==='Normal / moderate deficit'?state.settings.coachingTargetRatePctPerWeek:'',calorieTargetAtStart:state.settings.normalCalorieTarget||'',proteinTargetAtStart:state.settings.normalProteinTarget||'',status:'Active',refeedPlan:'',notes:'Created when ending RFL.',updatedAt:nowISO()});
  } else state.settings.dietMode='Maintenance / transition';
  if(rflFormChecked('rflRestoreProgram')){const restore=state.programs.find(program=>program.id===profile.previousProgramId)||state.programs.find(program=>program.id==='UL4');if(restore){state.settings.activeProgram=restore.id;state.settings.lastSession=sessionKey(restore.id,restore.sessions?.[0]?.id||'');}}
  state.settings.dietView='coach';saveState();closeModal();render();showToast('RFL phase completed');
}

function renderRflDashboardCard(){
  const phase=activeRflPhase();
  if(!phase)return `<div class="card rfl-dashboard-card"><div class="card-title"><span>RFL mode</span><span class="pill gray">Inactive</span></div><div class="small muted">Guided category/protein setup, low-volume training, daily checklist and a planned exit.</div><button class="secondary" style="margin-top:10px" onclick="openRflPage()">Open RFL workspace</button></div>`;
  const profile=rflProfileForPhase(phase.id),day=Math.max(1,daysBetween(phase.startDate,localDateISO())+1),total=Math.max(1,daysBetween(phase.startDate,phase.plannedEndDate)+1),totals=foodTotals(localDateISO());
  return `<div class="card rfl-dashboard-card active"><div class="card-title"><span>RFL · Day ${Math.min(day,total)}/${total}</span><span class="pill warn">Category ${profile?.category||'—'}</span></div><div class="rfl-mini-grid"><div><span>Protein</span><strong>${Math.round(totals.protein)}/${Math.round(profile?.proteinTargetG||0)}g</strong></div><div><span>Next event</span><strong>${esc(rflNextEventText(phase.id))}</strong></div></div><button class="secondary" onclick="openRflPage()">Open RFL mode</button></div>`;
}

// Extend the existing Diet navigation and renderer.
const lcRflOriginalSetDietView=setDietView;
setDietView=function(value){if(value==='rfl')return setDietViewRfl();return lcRflOriginalSetDietView(value);};
const lcRflOriginalDietNav=renderDietSectionNav;
renderDietSectionNav=function(active='diary'){return `<div class="segmented-control diet-segmented three-way" role="tablist" aria-label="Diet sections"><button type="button" class="${active==='diary'?'active':''}" onclick="setDietView('diary')">Diary & recipes</button><button type="button" class="${active==='coach'?'active':''}" onclick="setDietView('coach')">Weight-loss coach</button><button type="button" class="${active==='rfl'?'active':''}" onclick="setDietView('rfl')">RFL mode</button></div>`;};
const lcRflOriginalRenderDiet=renderDiet;
renderDiet=function(){rflEnsureState();if(state.settings.dietView==='rfl')return renderRflModePage();return lcRflOriginalRenderDiet();};

// Program selection no longer silently starts or ends an RFL diet phase.
setActiveProgram=function(value){const program=state.programs.find(row=>row.id===value);if(!program)return;if(activeRflPhase()&&value!=='RFL2'&&!confirm('An RFL phase is active. Use this program while keeping RFL diet mode?'))return;state.settings.activeProgram=value;state.settings.lastSession=sessionKey(value,program.sessions?.[0]?.id||'');saveState();workoutDraft=null;saveDraft();render();};
setDietMode=function(value){if(value==='RFL / PSMF'&&!activeRflPhase()){render();setTimeout(()=>openRflSetup(),0);return;}if(value!=='RFL / PSMF'&&activeRflPhase()){render();return showToast('End the active RFL phase from Diet → RFL mode first',5000);}state.settings.dietMode=value;saveState();render();};

// Migrate the already-loaded phone state and support the manifest shortcut.
rflEnsureState(DEFAULT_STATE);rflEnsureState(state);localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
const lcRflQuery=new URLSearchParams(location.search);
if(lcRflQuery.get('rfl')==='1'){state.settings.dietView='rfl';page='diet';localStorage.setItem(PAGE_KEY,page);}
render();
