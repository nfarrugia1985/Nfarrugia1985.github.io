'use strict';

/* Lift & Cut 2.6.5 — fast meal and nutrition logging.
 * Everyday search is local-first. USDA FoodData Central and Open Food Facts
 * are optional fallbacks and successful results are saved for instant reuse.
 */

const LC_NUTRITION_V260 = Object.freeze({
  VERSION:'2.6.5',
  SCHEMA:7,
  CACHE_KEY:'liftCut.foodSearchCache.v260',
  CACHE_MAX:100,
  CACHE_DAYS:30,
  ONLINE_TIMEOUT:22000,
  MEALS:['Breakfast','Lunch','Dinner','Snack','Post-workout']
});

let foodLogger260={date:'',meal:'',query:'',tab:'recent'};
let foodPortion260=null;
let onlineFoods260=[];
let onlineBusy260=false;
let barcodeStream260=null;
let barcodeTimer260=null;
let nutritionLibraryTab260='foods';

function n260Clone(v){return v===undefined?undefined:JSON.parse(JSON.stringify(v));}
function n260Norm(v){return String(v||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();}
function n260Unique(values){return [...new Set((values||[]).filter(Boolean))];}
function n260MealOrder(meal){const i=LC_NUTRITION_V260.MEALS.indexOf(meal);return i<0?99:i;}
function n260GuessMeal(){const h=new Date().getHours();return h<10?'Breakfast':h<15?'Lunch':h<20?'Dinner':'Snack';}
function n260DateOffset(date,days){const d=parseDate(date)||new Date();d.setDate(d.getDate()+days);return localDateISO(d);}
function n260MacroText(x){return `${round(toNum(x?.kcal),0)||0} kcal · ${round(toNum(x?.protein),1)||0}P · ${round(toNum(x?.carbs),1)||0}C · ${round(toNum(x?.fat),1)||0}F`;}
function n260PortionText(row){
  if(toNum(row?.grams)>0)return `${round(row.grams,0)} g`;
  const amount=row?.amount!==undefined&&row?.amount!==''?row.amount:(row?.servings||1);
  const unit=row?.unit||'serving';return `${round(toNum(amount)||1,2)} ${unit}${toNum(amount)===1?'':'s'}`;
}
function n260Modified(row){return String(row?.updatedAt||row?.lastUsedAt||row?.date||'');}

function n260NormaliseFoodRow(row){
  const r=row&&typeof row==='object'?row:{};
  r.id ||= uid('food');r.date ||= localDateISO();r.meal ||= 'Snack';
  r.itemName=String(r.itemName||r.recipeName||'Food');r.recipeId=String(r.recipeId||'');r.recipeName=String(r.recipeName||'');
  r.savedFoodId=String(r.savedFoodId||'');r.templateId=String(r.templateId||'');r.sourceType=String(r.sourceType||(r.recipeId?'recipe':'manual'));r.sourceId=String(r.sourceId||'');
  if(r.amount===undefined||r.amount===null||r.amount==='')r.amount=toNum(r.servings)||1;
  if(r.servings===undefined||r.servings===null||r.servings==='')r.servings=toNum(r.amount)||1;
  r.unit=String(r.unit||'serving');r.grams=numOrBlank(r.grams);
  ['kcal','protein','carbs','fat','fibre','sodiumMg'].forEach(k=>r[k]=toNum(r[k]));
  r.notes=String(r.notes||'');r.updatedAt=String(r.updatedAt||nowISO());return r;
}
function n260NormaliseSavedFood(row){
  const r=row&&typeof row==='object'?row:{};
  r.id ||= uid('savedfood');r.name=String(r.name||r.itemName||'Saved food');r.brand=String(r.brand||'');
  r.servingDescription=String(r.servingDescription||`${toNum(r.baseAmount)||100} ${r.baseUnit||'g'}`);
  r.baseAmount=Math.max(.0001,toNum(r.baseAmount)||100);r.baseUnit=String(r.baseUnit||'g');r.gramsPerServing=numOrBlank(r.gramsPerServing);
  ['kcal','protein','carbs','fat','fibre','sodiumMg'].forEach(k=>r[k]=toNum(r[k]));
  r.commonMeasures=r.commonMeasures&&typeof r.commonMeasures==='object'&&!Array.isArray(r.commonMeasures)?r.commonMeasures:{};
  r.aliases=Array.isArray(r.aliases)?r.aliases:[];r.favourite=Boolean(r.favourite);r.useCount=toNum(r.useCount);r.lastUsedAt=String(r.lastUsedAt||'');
  r.barcode=String(r.barcode||'');r.source=String(r.source||r.sourceType||'Manual');r.sourceType=String(r.sourceType||'Manual');r.sourceId=String(r.sourceId||'');r.sourceUrl=String(r.sourceUrl||'');r.notes=String(r.notes||'');r.updatedAt=String(r.updatedAt||nowISO());return r;
}
function n260NormaliseTemplate(row){
  const r=row&&typeof row==='object'?row:{};r.id ||= uid('meal');r.name=String(r.name||'Meal template');r.meal=String(r.meal||r.defaultMeal||'Meal');
  r.items=Array.isArray(r.items)?r.items:[];r.items.forEach(n260NormaliseFoodRow);r.favourite=Boolean(r.favourite);r.useCount=toNum(r.useCount);r.lastUsedAt=String(r.lastUsedAt||'');r.notes=String(r.notes||'');r.updatedAt=String(r.updatedAt||nowISO());return r;
}
function n260EnsureState(next){
  next.savedFoods=Array.isArray(next.savedFoods)?next.savedFoods:[];next.mealTemplates=Array.isArray(next.mealTemplates)?next.mealTemplates:[];
  next.savedFoods.forEach(n260NormaliseSavedFood);next.mealTemplates.forEach(n260NormaliseTemplate);(next.foodLog||[]).forEach(n260NormaliseFoodRow);
  (next.ingredientCache||[]).forEach(x=>{x.favourite=Boolean(x.favourite);x.useCount=toNum(x.useCount);x.lastUsedAt=String(x.lastUsedAt||'');});
  next.settings=next.settings||{};
  const defaults={defaultMeal:'',nutritionLoggerTab:'recent',nutritionQuickLogKeepOpen:true,nutritionShowWeeklySummary:true,nutritionSearchCacheDays:LC_NUTRITION_V260.CACHE_DAYS,nutritionDefaultRecipeUnit:'serving',normalFibreTarget:30,rflFibreTarget:''};
  Object.keys(defaults).forEach(k=>{if(next.settings[k]===undefined)next.settings[k]=defaults[k];});
  next.schemaVersion=LC_NUTRITION_V260.SCHEMA;next.meta=next.meta||{};next.meta.appVersion=LC_NUTRITION_V260.VERSION;return next;
}

DEFAULT_STATE.schemaVersion=LC_NUTRITION_V260.SCHEMA;DEFAULT_STATE.meta.appVersion=LC_NUTRITION_V260.VERSION;
DEFAULT_STATE.savedFoods=Array.isArray(DEFAULT_STATE.savedFoods)?DEFAULT_STATE.savedFoods:[];DEFAULT_STATE.mealTemplates=Array.isArray(DEFAULT_STATE.mealTemplates)?DEFAULT_STATE.mealTemplates:[];
Object.assign(DEFAULT_STATE.settings,{defaultMeal:'',nutritionLoggerTab:'recent',nutritionQuickLogKeepOpen:true,nutritionShowWeeklySummary:true,nutritionSearchCacheDays:LC_NUTRITION_V260.CACHE_DAYS,nutritionDefaultRecipeUnit:'serving',normalFibreTarget:30,rflFibreTarget:''});
const n260BaseMigrate=migrateState;migrateState=function(input){return n260EnsureState(n260BaseMigrate(input));};

const n260BaseTargets=targets;targets=function(){const t=n260BaseTargets();const rfl=state.settings.dietMode==='RFL / PSMF';t.fibre=toNum(state.settings[rfl?'rflFibreTarget':'normalFibreTarget']);return t;};
foodTotals=function(date=selectedDietDate){return (state.foodLog||[]).filter(x=>x.date===date).reduce((a,x)=>{for(const k of ['kcal','protein','carbs','fat','fibre','sodiumMg'])a[k]+=toNum(x[k]);return a;},{kcal:0,protein:0,carbs:0,fat:0,fibre:0,sodiumMg:0});};

function n260SourceKey(row){return row.recipeId?`recipe:${row.recipeId}`:row.savedFoodId?`saved:${row.savedFoodId}`:row.sourceId?`${row.sourceType}:${row.sourceId}`:`manual:${n260Norm(row.itemName)}`;}
function n260RecentRows(limit=30){const rows=[...(state.foodLog||[])].sort((a,b)=>n260Modified(b).localeCompare(n260Modified(a))),seen=new Set(),out=[];for(const row of rows){const key=n260SourceKey(row);if(!key||seen.has(key))continue;seen.add(key);out.push(row);if(out.length>=limit)break;}return out;}
function n260LastRow(kind,id){return [...(state.foodLog||[])].filter(r=>(kind==='recipe'&&r.recipeId===id)||(kind==='saved'&&r.savedFoodId===id)||(kind==='ingredient'&&r.sourceType==='ingredient'&&r.sourceId===id)).sort((a,b)=>n260Modified(b).localeCompare(n260Modified(a)))[0]||null;}
function n260TemplateTotals(t){return (t.items||[]).reduce((a,x)=>{for(const k of ['kcal','protein','carbs','fat','fibre','sodiumMg'])a[k]+=toNum(x[k]);return a;},{kcal:0,protein:0,carbs:0,fat:0,fibre:0,sodiumMg:0});}
function n260Item(kind,row){
  if(kind==='recipe')return {kind,id:row.id,name:row.name,subtitle:`Recipe · ${round(perServing(row,'kcal'),0)} kcal per serving`,kcal:perServing(row,'kcal'),protein:perServing(row,'protein'),carbs:perServing(row,'carbs'),fat:perServing(row,'fat'),fibre:toNum(row.fibre)/Math.max(1,toNum(row.servings)),sodiumMg:toNum(row.sodiumMg)/Math.max(1,toNum(row.servings)),favourite:Boolean(row.favourite),raw:row};
  if(kind==='saved'||kind==='ingredient')return {kind,id:row.id,name:row.name,subtitle:`${row.brand?`${row.brand} · `:''}${row.servingDescription||`${row.baseAmount||100} ${row.baseUnit||'g'}`} · ${row.source||'Local'}`,kcal:toNum(row.kcal),protein:toNum(row.protein),carbs:toNum(row.carbs),fat:toNum(row.fat),fibre:toNum(row.fibre),sodiumMg:toNum(row.sodiumMg),favourite:Boolean(row.favourite),raw:row};
  if(kind==='template'){const total=n260TemplateTotals(row);return {kind,id:row.id,name:row.name,subtitle:`${row.meal||'Meal'} · ${(row.items||[]).length} items`,...total,favourite:Boolean(row.favourite),raw:row};}
  if(kind==='recent')return {kind,id:row.id,name:row.itemName||row.recipeName||'Food',subtitle:`Last used ${row.date} · ${n260PortionText(row)}`,kcal:toNum(row.kcal),protein:toNum(row.protein),carbs:toNum(row.carbs),fat:toNum(row.fat),fibre:toNum(row.fibre),sodiumMg:toNum(row.sodiumMg),favourite:false,raw:row};
  return null;
}
function n260AllItems(){const out=[];n260RecentRows().forEach(r=>out.push(n260Item('recent',r)));(state.mealTemplates||[]).forEach(r=>out.push(n260Item('template',r)));(state.recipes||[]).forEach(r=>out.push(n260Item('recipe',r)));(state.savedFoods||[]).forEach(r=>out.push(n260Item('saved',r)));(state.ingredientCache||[]).forEach(r=>out.push(n260Item('ingredient',r)));return out.filter(Boolean);}
function n260SearchText(item){return n260Norm(`${item.name} ${item.subtitle} ${(item.raw?.aliases||[]).join(' ')} ${item.raw?.notes||''}`);}
function n260LocalResults(query='',tab='recent',limit=60){
  const q=n260Norm(query),tokens=q.split(' ').filter(Boolean);let rows=n260AllItems();
  if(tab==='recent'&&!q)rows=rows.filter(x=>x.kind==='recent');else if(tab==='favourites')rows=rows.filter(x=>x.favourite);else if(tab==='recipes')rows=rows.filter(x=>x.kind==='recipe');else if(tab==='foods')rows=rows.filter(x=>['saved','ingredient'].includes(x.kind));else if(tab==='templates')rows=rows.filter(x=>x.kind==='template');
  const seen=new Set();rows=rows.filter(item=>{const key=item.kind==='recent'?`recent:${n260SourceKey(item.raw)}`:`${item.kind}:${item.id}`;if(seen.has(key))return false;seen.add(key);return true;});
  if(q)rows=rows.map(item=>{const text=n260SearchText(item);let score=text===q?300:text.startsWith(q)?220:text.includes(q)?150:0;tokens.forEach(t=>{if(text.split(' ').includes(t))score+=35;else if(text.includes(t))score+=12;});return {item,score};}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||n260Modified(b.item.raw).localeCompare(n260Modified(a.item.raw))).map(x=>x.item);
  else rows.sort((a,b)=>Number(b.favourite)-Number(a.favourite)||n260Modified(b.raw).localeCompare(n260Modified(a.raw))||a.name.localeCompare(b.name));
  return rows.slice(0,limit);
}
function n260GetItem(kind,id){if(kind==='recipe')return n260Item(kind,state.recipes.find(x=>x.id===id));if(kind==='saved')return n260Item(kind,state.savedFoods.find(x=>x.id===id));if(kind==='ingredient')return n260Item(kind,state.ingredientCache.find(x=>x.id===id));if(kind==='template')return n260Item(kind,state.mealTemplates.find(x=>x.id===id));if(kind==='recent')return n260Item(kind,state.foodLog.find(x=>x.id===id));return null;}
function n260FavouriteTarget(kind,id){if(kind==='recipe')return state.recipes.find(x=>x.id===id);if(kind==='saved')return state.savedFoods.find(x=>x.id===id);if(kind==='ingredient')return state.ingredientCache.find(x=>x.id===id);if(kind==='template')return state.mealTemplates.find(x=>x.id===id);return null;}
function n260ToggleFavourite(kind,id){const row=n260FavouriteTarget(kind,id);if(!row)return;row.favourite=!row.favourite;markUpdated(row);saveState();if(document.getElementById('foodLocalResults'))n260RenderLoggerResults();else n260OpenLibrary(nutritionLibraryTab260);}

function n260LoggerTabs(){return [['recent','Recent'],['favourites','Favourites'],['all','All'],['recipes','Recipes'],['foods','Foods'],['templates','Meals']];}
function n260LoggerShell(){
  const tabs=n260LoggerTabs().map(([id,label])=>`<button class="${foodLogger260.tab===id?'':'ghost'} compact" onclick="n260SetLoggerTab('${id}')">${label}</button>`).join('');
  return `<div class="fast-food-header"><div><div class="eyebrow">Fast nutrition log</div><h2>Add food</h2></div><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <div class="fast-food-context"><label>Date<input id="fastFoodDate" type="date" value="${esc(foodLogger260.date)}" onchange="foodLogger260.date=this.value"></label><label>Meal<select onchange="foodLogger260.meal=this.value;state.settings.defaultMeal=this.value;saveState({touch:false,autoSync:false})">${LC_NUTRITION_V260.MEALS.map(m=>`<option ${m===foodLogger260.meal?'selected':''}>${m}</option>`).join('')}</select></label></div>
    <label class="fast-food-search-label">Search saved foods, recipes and meals<input id="fastFoodSearch" type="search" value="${esc(foodLogger260.query)}" placeholder="Local results appear as you type" oninput="n260UpdateLoggerQuery(this.value)" autocomplete="off"></label>
    <div class="fast-food-tabs">${tabs}</div><div id="foodLocalResults"></div><div id="foodOnlineArea"></div>
    <div class="fast-food-actions"><button class="secondary" onclick="n260OpenQuickMacros()">＋ Quick calories / macros</button><button class="secondary" onclick="n260OpenBarcode()">▣ Barcode</button><button class="ghost" onclick="n260OpenLibrary()">Food library</button></div>`;
}
function openFastFoodLogger260(recipeId=''){
  foodLogger260={date:selectedDietDate||localDateISO(),meal:state.settings.defaultMeal||n260GuessMeal(),query:'',tab:state.settings.nutritionLoggerTab||'recent'};
  showModal(n260LoggerShell());document.getElementById('modal')?.classList.add('nutrition-logger-modal');n260RenderLoggerResults();
  if(recipeId)setTimeout(()=>n260OpenPortion('recipe',recipeId),0);else setTimeout(()=>document.getElementById('fastFoodSearch')?.focus(),100);
}
function n260SetLoggerTab(tab){foodLogger260.tab=tab;state.settings.nutritionLoggerTab=tab;saveState({touch:false,autoSync:false});n260RenderLoggerResults();}
function n260UpdateLoggerQuery(value){foodLogger260.query=value;n260RenderLoggerResults();}
function n260LoggerCard(item){
  const last=!['recent','template'].includes(item.kind)?n260LastRow(item.kind,item.id):null;const fav=n260FavouriteTarget(item.kind,item.id);
  const actions=item.kind==='recent'?`<button onclick="n260RepeatRecent('${esc(item.id)}')">Repeat</button><button class="secondary compact" onclick="n260EditEntry('${esc(item.id)}')">Edit copy</button>`:
    item.kind==='template'?`<button onclick="n260LogTemplate('${esc(item.id)}')">Log meal</button><button class="secondary compact" onclick="n260EditTemplate('${esc(item.id)}')">Edit</button>`:
    `<button onclick="n260OneTap('${esc(item.kind)}','${esc(item.id)}')">${last?'Add last portion':'Add'}</button><button class="secondary compact" onclick="n260OpenPortion('${esc(item.kind)}','${esc(item.id)}')">Portion</button>`;
  return `<div class="food-search-card"><div class="food-search-card-main"><div><strong>${esc(item.name)}</strong><div class="small muted">${esc(item.subtitle||'')}</div><div class="tiny">${n260MacroText(item)}</div></div>${fav?`<button class="ghost compact favourite-button" onclick="n260ToggleFavourite('${esc(item.kind)}','${esc(item.id)}')">${fav.favourite?'★':'☆'}</button>`:''}</div><div class="button-row">${actions}</div></div>`;
}
function n260RenderLoggerResults(){
  const holder=document.getElementById('foodLocalResults');if(!holder)return;const rows=n260LocalResults(foodLogger260.query,foodLogger260.tab),q=foodLogger260.query.trim();
  const usda=q.length>=2&&typeof lcUsda262RenderFast==='function'?lcUsda262RenderFast(q):'';
  holder.innerHTML=`<div class="card-title fast-result-heading"><span>${foodLogger260.query?'Your saved matches':'Your library'}</span><span class="pill gray">${rows.length}</span></div><div class="fast-food-result-list">${rows.length?rows.map(n260LoggerCard).join(''):(q?'<div class="empty">No saved match yet. The local USDA library is searched below.</div>':'<div class="empty">Your recent foods will appear here.</div>')}</div>${usda}`;
  const area=document.getElementById('foodOnlineArea');if(!area)return;
  area.innerHTML=q.length>=2?`<details class="online-food-search"><summary><span>Online fallback</span><span class="small muted">Usually unnecessary</span></summary><div class="notice">The bundled USDA library works offline. Use live USDA only for a newer record, or Open Food Facts for a branded/barcode product.</div><div class="button-row"><button class="secondary compact" onclick="n260SearchOnline('usda')">Live USDA</button><button class="secondary compact" onclick="n260SearchOnline('openfoodfacts')">Open Food Facts</button><button class="ghost compact" onclick="n260SearchOnline('all')">Search both online</button></div><div id="onlineFoodResults"></div></details>`:'';
}
function n260EnsureLoggerContext(){if(!foodLogger260.date)foodLogger260.date=selectedDietDate||localDateISO();if(!foodLogger260.meal)foodLogger260.meal=state.settings.defaultMeal||n260GuessMeal();if(!foodLogger260.tab)foodLogger260.tab=state.settings.nutritionLoggerTab||'recent';}
function n260ReturnToLogger(){n260EnsureLoggerContext();showModal(n260LoggerShell());document.getElementById('modal')?.classList.add('nutrition-logger-modal');n260RenderLoggerResults();}

function n260BaseGrams(raw){try{return ingredientBaseGrams(raw);}catch{return canonicalUnit(raw?.baseUnit)==='g'?toNum(raw?.baseAmount):'';}}
function n260UnitOptions(item){
  if(item.kind==='recipe'){const out=[['serving','serving']];if(toNum(item.raw.finishedWeightG)>0)out.push(['g','grams'],['percent','% of recipe']);return out;}
  const raw=item.raw||{},out=[['serving','saved serving'],['g','grams']],base=canonicalUnit(raw.baseUnit);if(base&&!['g','serving'].includes(base))out.push([base,base]);Object.keys(raw.commonMeasures||{}).slice(0,12).forEach(k=>out.push([k,k]));
  const seen=new Set();return out.filter(x=>{if(seen.has(x[0]))return false;seen.add(x[0]);return true;});
}
function n260CalcPortion(item,amount,unit){
  const a=Math.max(0,toNum(amount)),zero={kcal:0,protein:0,carbs:0,fat:0,fibre:0,sodiumMg:0,grams:'',servings:0,estimated:false,note:''};if(!item||!a)return zero;
  if(item.kind==='recipe'){
    const r=item.raw,total={kcal:toNum(r.totalKcal),protein:toNum(r.protein),carbs:toNum(r.carbs),fat:toNum(r.fat),fibre:toNum(r.fibre),sodiumMg:toNum(r.sodiumMg)};let ratio=0,grams='';
    if(unit==='g'&&toNum(r.finishedWeightG)>0){ratio=a/toNum(r.finishedWeightG);grams=a;}else if(unit==='percent'){ratio=a/100;grams=toNum(r.finishedWeightG)?toNum(r.finishedWeightG)*ratio:'';}else ratio=a/Math.max(1,toNum(r.servings));
    const out={...zero,grams,servings:ratio*Math.max(1,toNum(r.servings))};for(const k of Object.keys(total))out[k]=total[k]*ratio;return out;
  }
  const raw=item.raw||{},baseGrams=n260BaseGrams(raw);let ratio=0,grams='',estimated=false,note='';
  if(unit==='serving')ratio=a;else if(unit==='g'&&baseGrams){grams=a;ratio=a/baseGrams;}else if(canonicalUnit(unit)===canonicalUnit(raw.baseUnit))ratio=a/Math.max(.0001,toNum(raw.baseAmount)||1);else{
    const conversion=amountToGramsDetailed(a,unit,raw,{name:raw.name,sourceLine:raw.name,unit});grams=conversion.grams;estimated=Boolean(conversion.estimated);note=conversion.note||'';if(grams&&baseGrams)ratio=grams/baseGrams;
  }
  if(!ratio)return {...zero,note:'This unit needs a gram conversion before it can be logged.'};const out={...zero,grams,servings:ratio,estimated,note};for(const k of ['kcal','protein','carbs','fat','fibre','sodiumMg'])out[k]=toNum(raw[k])*ratio;return out;
}
function n260PortionDefaults(item){const last=item&&n260LastRow(item.kind,item.id);if(last)return {amount:toNum(last.amount)||toNum(last.servings)||1,unit:last.unit||'serving'};if(item?.kind==='recipe')return {amount:1,unit:state.settings.nutritionDefaultRecipeUnit||'serving'};const raw=item?.raw||{};return canonicalUnit(raw.baseUnit)==='g'?{amount:toNum(raw.baseAmount)||100,unit:'g'}:{amount:1,unit:'serving'};}
function n260OpenPortion(kind,id,editId=''){
  const item=n260GetItem(kind,id);if(!item)return showToast('Food is no longer available');const defaults=n260PortionDefaults(item);foodPortion260={kind,id,item,amount:defaults.amount,unit:defaults.unit,date:foodLogger260.date||selectedDietDate,meal:foodLogger260.meal||n260GuessMeal(),editId};n260RenderPortion();
}
function n260PortionPreview(calc){return `<div><strong>${round(calc.kcal,0)||0}</strong><span>kcal</span></div><div><strong>${round(calc.protein,1)||0}</strong><span>protein</span></div><div><strong>${round(calc.carbs,1)||0}</strong><span>carbs</span></div><div><strong>${round(calc.fat,1)||0}</strong><span>fat</span></div>${calc.note?`<div class="portion-note ${calc.kcal?'':'warn-text'}">${esc(calc.note)}</div>`:''}`;}
function n260RenderPortion(){
  const p=foodPortion260;if(!p)return;const units=n260UnitOptions(p.item),calc=n260CalcPortion(p.item,p.amount,p.unit);
  showModal(`<div class="fast-food-header"><div><div class="eyebrow">Portion</div><h2>${esc(p.item.name)}</h2></div><button class="ghost compact" onclick="n260ReturnToLogger()">Back</button></div><div class="notice"><strong>${esc(p.item.subtitle||'')}</strong><br>${n260MacroText(p.item)}</div><div class="fast-food-context"><label>Date<input type="date" value="${esc(p.date)}" onchange="foodPortion260.date=this.value"></label><label>Meal<select onchange="foodPortion260.meal=this.value">${LC_NUTRITION_V260.MEALS.map(m=>`<option ${m===p.meal?'selected':''}>${m}</option>`).join('')}</select></label></div><div class="split"><label>Amount<input id="portionAmount" type="number" min="0.01" step="0.01" inputmode="decimal" value="${esc(p.amount)}" oninput="n260UpdatePortion()"></label><label>Unit<select id="portionUnit" onchange="n260UpdatePortion()">${units.map(([id,label])=>`<option value="${esc(id)}" ${id===p.unit?'selected':''}>${esc(label)}</option>`).join('')}</select></label></div><div id="portionPreview" class="portion-preview">${n260PortionPreview(calc)}</div><label>Notes<input id="portionNotes" placeholder="Optional"></label><div class="button-row"><button onclick="n260CommitPortion(false)">${p.editId?'Update diary':'Add to diary'}</button><button class="secondary" onclick="n260CommitPortion(true)" ${p.editId?'hidden':''}>Add & keep logging</button></div>`);document.getElementById('modal')?.classList.add('nutrition-logger-modal');
}
function n260UpdatePortion(){const p=foodPortion260;if(!p)return;p.amount=toNum(document.getElementById('portionAmount')?.value);p.unit=document.getElementById('portionUnit')?.value||'serving';const box=document.getElementById('portionPreview');if(box)box.innerHTML=n260PortionPreview(n260CalcPortion(p.item,p.amount,p.unit));}
function n260Touch(item){const raw=item?.raw;if(!raw)return;raw.useCount=toNum(raw.useCount)+1;raw.lastUsedAt=nowISO();markUpdated(raw);}
function n260CommitPortion(keepOpen=false){
  const p=foodPortion260;if(!p)return;n260UpdatePortion();const calc=n260CalcPortion(p.item,p.amount,p.unit);if(!calc.kcal&&!calc.protein&&!calc.carbs&&!calc.fat)return showToast(calc.note||'Enter a usable portion');
  const row=p.editId?state.foodLog.find(x=>x.id===p.editId):{id:uid('food')};if(!row)return showToast('Diary entry not found');const item=p.item,raw=item.raw||{};
  Object.assign(row,{date:p.date||selectedDietDate,meal:p.meal||n260GuessMeal(),recipeId:item.kind==='recipe'?item.id:'',recipeName:item.kind==='recipe'?item.name:'',savedFoodId:item.kind==='saved'?item.id:'',itemName:item.name,sourceType:item.kind,sourceId:item.kind==='ingredient'?item.id:(raw.sourceId||''),servings:calc.servings||p.amount,amount:p.amount,unit:p.unit,grams:calc.grams,kcal:calc.kcal,protein:calc.protein,carbs:calc.carbs,fat:calc.fat,fibre:calc.fibre,sodiumMg:calc.sodiumMg,notes:document.getElementById('portionNotes')?.value?.trim()||row.notes||'',updatedAt:nowISO()});
  if(!p.editId)state.foodLog.push(row);n260Touch(item);selectedDietDate=row.date;saveState();showToast(p.editId?'Diary entry updated':'Food logged');
  if(p.editId){closeModal();render();return;}if(keepOpen||state.settings.nutritionQuickLogKeepOpen){foodLogger260.date=row.date;foodLogger260.meal=row.meal;n260ReturnToLogger();}else{closeModal();render();}
}
function n260RepeatRecent(id){const src=state.foodLog.find(x=>x.id===id);if(!src)return;const row={...n260Clone(src),id:uid('food'),date:foodLogger260.date||selectedDietDate,meal:foodLogger260.meal||src.meal,templateId:'',updatedAt:nowISO()};state.foodLog.push(row);selectedDietDate=row.date;saveState();showToast(`${row.itemName} added`);if(document.getElementById('foodLocalResults'))n260RenderLoggerResults();else render();}
function n260OneTap(kind,id){const last=n260LastRow(kind,id);if(last){const row={...n260Clone(last),id:uid('food'),date:foodLogger260.date||selectedDietDate,meal:foodLogger260.meal||last.meal,templateId:'',updatedAt:nowISO()};state.foodLog.push(row);n260Touch(n260GetItem(kind,id));selectedDietDate=row.date;saveState();showToast(`${row.itemName} added`);n260RenderLoggerResults();return;}n260OpenPortion(kind,id);}

function n260OpenQuickMacros(){n260EnsureLoggerContext();showModal(`<div class="fast-food-header"><div><div class="eyebrow">Quick entry</div><h2>Calories and macros</h2></div><button class="ghost compact" onclick="n260ReturnToLogger()">Back</button></div><form class="stack" onsubmit="n260CommitQuickMacros(event)"><div class="fast-food-context"><label>Date<input id="quickDate" type="date" value="${esc(foodLogger260.date||selectedDietDate)}"></label><label>Meal<select id="quickMeal">${LC_NUTRITION_V260.MEALS.map(m=>`<option ${m===foodLogger260.meal?'selected':''}>${m}</option>`).join('')}</select></label></div><label>Name<input id="quickName" required placeholder="Protein bar, restaurant meal…"></label><div class="split"><label>Calories<input id="quickKcal" type="number" min="0" step="1" required></label><label>Protein g<input id="quickProtein" type="number" min="0" step="0.1"></label><label>Carbs g<input id="quickCarbs" type="number" min="0" step="0.1"></label><label>Fat g<input id="quickFat" type="number" min="0" step="0.1"></label></div><details><summary>Optional fibre and sodium</summary><div class="split"><label>Fibre g<input id="quickFibre" type="number" min="0" step="0.1"></label><label>Sodium mg<input id="quickSodium" type="number" min="0" step="1"></label></div></details><label class="inline-check"><input id="quickSave" type="checkbox"> Save as a reusable food</label><label>Notes<input id="quickNotes"></label><button type="submit">Add to diary</button></form>`);document.getElementById('modal')?.classList.add('nutrition-logger-modal');}
function n260CommitQuickMacros(event){
  event.preventDefault();const name=document.getElementById('quickName').value.trim(),row=n260NormaliseFoodRow({id:uid('food'),date:document.getElementById('quickDate').value||selectedDietDate,meal:document.getElementById('quickMeal').value,itemName:name,sourceType:'manual',amount:1,unit:'entry',servings:1,kcal:toNum(document.getElementById('quickKcal').value),protein:toNum(document.getElementById('quickProtein').value),carbs:toNum(document.getElementById('quickCarbs').value),fat:toNum(document.getElementById('quickFat').value),fibre:toNum(document.getElementById('quickFibre').value),sodiumMg:toNum(document.getElementById('quickSodium').value),notes:document.getElementById('quickNotes').value.trim()});
  if(document.getElementById('quickSave').checked){const saved=n260NormaliseSavedFood({id:uid('savedfood'),name,servingDescription:'1 serving',baseAmount:1,baseUnit:'serving',kcal:row.kcal,protein:row.protein,carbs:row.carbs,fat:row.fat,fibre:row.fibre,sodiumMg:row.sodiumMg,source:'Manual / package label',sourceType:'Manual',notes:row.notes});state.savedFoods.push(saved);row.savedFoodId=saved.id;row.sourceType='saved';}
  state.foodLog.push(row);selectedDietDate=row.date;saveState();showToast('Food logged');state.settings.nutritionQuickLogKeepOpen?n260ReturnToLogger():(closeModal(),render());
}
function n260EditEntry(id){const row=state.foodLog.find(x=>x.id===id);if(!row)return;showModal(`<div class="card-title"><span>Edit diary entry</span><button class="ghost compact" onclick="closeModal()">Close</button></div><form class="stack" onsubmit="n260SaveEntry(event,'${esc(id)}')"><label>Name<input id="editFoodName" value="${esc(row.itemName)}" required></label><div class="fast-food-context"><label>Date<input id="editFoodDate" type="date" value="${esc(row.date)}"></label><label>Meal<select id="editFoodMeal">${LC_NUTRITION_V260.MEALS.map(m=>`<option ${m===row.meal?'selected':''}>${m}</option>`).join('')}</select></label></div><div class="split"><label>Calories<input id="editFoodKcal" type="number" step="0.1" value="${esc(row.kcal)}"></label><label>Protein<input id="editFoodProtein" type="number" step="0.1" value="${esc(row.protein)}"></label><label>Carbs<input id="editFoodCarbs" type="number" step="0.1" value="${esc(row.carbs)}"></label><label>Fat<input id="editFoodFat" type="number" step="0.1" value="${esc(row.fat)}"></label><label>Fibre<input id="editFoodFibre" type="number" step="0.1" value="${esc(row.fibre)}"></label><label>Sodium mg<input id="editFoodSodium" type="number" step="1" value="${esc(row.sodiumMg)}"></label></div><label>Notes<input id="editFoodNotes" value="${esc(row.notes||'')}"></label><div class="button-row"><button type="submit">Save</button><button type="button" class="secondary" onclick="n260DuplicateEntry('${esc(id)}')">Duplicate</button><button type="button" class="danger" onclick="n260DeleteEntry('${esc(id)}')">Delete</button></div></form>`);}
function n260SaveEntry(event,id){event.preventDefault();const row=state.foodLog.find(x=>x.id===id);if(!row)return;Object.assign(row,{itemName:document.getElementById('editFoodName').value.trim(),date:document.getElementById('editFoodDate').value,meal:document.getElementById('editFoodMeal').value,kcal:toNum(document.getElementById('editFoodKcal').value),protein:toNum(document.getElementById('editFoodProtein').value),carbs:toNum(document.getElementById('editFoodCarbs').value),fat:toNum(document.getElementById('editFoodFat').value),fibre:toNum(document.getElementById('editFoodFibre').value),sodiumMg:toNum(document.getElementById('editFoodSodium').value),notes:document.getElementById('editFoodNotes').value.trim(),updatedAt:nowISO()});saveState();closeModal();render();showToast('Diary entry saved');}
function n260DuplicateEntry(id){const src=state.foodLog.find(x=>x.id===id);if(!src)return;state.foodLog.push({...n260Clone(src),id:uid('food'),updatedAt:nowISO()});saveState();closeModal();render();showToast('Entry duplicated');}
function n260DeleteEntry(id){if(!confirm('Delete this diary entry?'))return;if(typeof recordDeletion==='function')recordDeletion('foodLog',id,'food diary entry deleted');state.foodLog=state.foodLog.filter(x=>x.id!==id);saveState();closeModal();render();}

function n260MealTotals(rows){return rows.reduce((a,x)=>{for(const k of ['kcal','protein','carbs','fat','fibre'])a[k]+=toNum(x[k]);return a;},{kcal:0,protein:0,carbs:0,fat:0,fibre:0});}
function n260EntryHtml(row){return `<div class="meal-entry"><button class="meal-entry-main" onclick="n260EditEntry('${esc(row.id)}')"><span><strong>${esc(row.itemName||row.recipeName)}</strong><small>${esc(n260PortionText(row))}${row.notes?` · ${esc(row.notes)}`:''}</small></span><span><strong>${round(row.kcal,0)} kcal</strong><small>${round(row.protein,1)}P · ${round(row.carbs,1)}C · ${round(row.fat,1)}F</small></span></button><button class="ghost compact" onclick="n260EditEntry('${esc(row.id)}')">Edit</button></div>`;}
function n260MealCard(meal,rows){const total=n260MealTotals(rows),yesterday=n260DateOffset(selectedDietDate,-1),hasPrior=(state.foodLog||[]).some(x=>x.date===yesterday&&x.meal===meal);return `<section class="meal-diary-card"><div class="meal-diary-head"><div><strong>${esc(meal)}</strong><div class="small muted">${rows.length?`${round(total.kcal,0)} kcal · ${round(total.protein,1)}P`:'No entries'}</div></div><div class="button-row">${hasPrior?`<button class="ghost compact" onclick="n260CopyMeal('${esc(meal)}')">Copy yesterday</button>`:''}${rows.length?`<button class="ghost compact" onclick="n260SaveMealTemplate('${esc(meal)}')">Save meal</button>`:''}<button class="secondary compact" onclick="n260OpenMealLogger('${esc(meal)}')">＋</button></div></div>${rows.length?`<div class="meal-entry-list">${rows.map(n260EntryHtml).join('')}</div>`:''}</section>`;}
function n260OpenMealLogger(meal){foodLogger260={date:selectedDietDate,meal,query:'',tab:state.settings.nutritionLoggerTab||'recent'};showModal(n260LoggerShell());document.getElementById('modal')?.classList.add('nutrition-logger-modal');n260RenderLoggerResults();}
function n260CopyMeal(meal){const sourceDate=n260DateOffset(selectedDietDate,-1),rows=state.foodLog.filter(x=>x.date===sourceDate&&x.meal===meal);if(!rows.length)return showToast('No matching meal yesterday');rows.forEach(x=>state.foodLog.push({...n260Clone(x),id:uid('food'),date:selectedDietDate,updatedAt:nowISO()}));saveState();render();showToast(`${meal} copied`);}
function n260SaveMealTemplate(meal){const rows=state.foodLog.filter(x=>x.date===selectedDietDate&&x.meal===meal);if(!rows.length)return;showModal(`<div class="card-title"><span>Save meal template</span><button class="ghost compact" onclick="closeModal()">Cancel</button></div><form class="stack" onsubmit="n260CommitMealTemplate(event,'${esc(meal)}')"><label>Name<input id="mealTemplateName" value="${esc(meal)}" required></label><div class="notice">${rows.length} items · ${n260MacroText(n260MealTotals(rows))}</div><label class="inline-check"><input id="mealTemplateFavourite" type="checkbox" checked> Favourite</label><label>Notes<input id="mealTemplateNotes"></label><button type="submit">Save template</button></form>`);}
function n260CommitMealTemplate(event,meal){event.preventDefault();const items=state.foodLog.filter(x=>x.date===selectedDietDate&&x.meal===meal).map(x=>{const row=n260Clone(x);delete row.id;delete row.date;row.templateId='';return row;});state.mealTemplates.push(n260NormaliseTemplate({id:uid('meal'),name:document.getElementById('mealTemplateName').value.trim(),meal,items,favourite:document.getElementById('mealTemplateFavourite').checked,notes:document.getElementById('mealTemplateNotes').value.trim()}));saveState();closeModal();render();showToast('Meal template saved');}
function n260LogTemplate(id){const t=state.mealTemplates.find(x=>x.id===id);if(!t)return;(t.items||[]).forEach(item=>state.foodLog.push(n260NormaliseFoodRow({...n260Clone(item),id:uid('food'),date:foodLogger260.date||selectedDietDate,meal:foodLogger260.meal||t.meal||'Meal',templateId:t.id,updatedAt:nowISO()})));t.useCount=toNum(t.useCount)+1;t.lastUsedAt=nowISO();markUpdated(t);selectedDietDate=foodLogger260.date||selectedDietDate;saveState();showToast(`${t.name} added`);document.getElementById('foodLocalResults')?n260RenderLoggerResults():render();}
function n260EditTemplate(id){const t=state.mealTemplates.find(x=>x.id===id);if(!t)return;showModal(`<div class="card-title"><span>Edit meal template</span><button class="ghost compact" onclick="n260OpenLibrary('templates')">Back</button></div><form class="stack" onsubmit="n260SaveTemplateEdit(event,'${esc(id)}')"><label>Name<input id="templateEditName" value="${esc(t.name)}" required></label><label>Default meal<select id="templateEditMeal">${LC_NUTRITION_V260.MEALS.map(m=>`<option ${m===t.meal?'selected':''}>${m}</option>`).join('')}</select></label><label class="inline-check"><input id="templateEditFav" type="checkbox" ${t.favourite?'checked':''}> Favourite</label><div class="list">${(t.items||[]).map((x,i)=>`<div class="row"><div><strong>${esc(x.itemName)}</strong><div class="small muted">${n260MacroText(x)}</div></div><button type="button" class="danger compact" onclick="n260RemoveTemplateItem('${esc(id)}',${i})">Remove</button></div>`).join('')}</div><label>Notes<input id="templateEditNotes" value="${esc(t.notes||'')}"></label><div class="button-row"><button type="submit">Save</button><button type="button" class="danger" onclick="n260DeleteTemplate('${esc(id)}')">Delete template</button></div></form>`);}
function n260RemoveTemplateItem(id,index){const t=state.mealTemplates.find(x=>x.id===id);if(!t)return;t.items.splice(index,1);markUpdated(t);saveState();n260EditTemplate(id);}
function n260SaveTemplateEdit(event,id){event.preventDefault();const t=state.mealTemplates.find(x=>x.id===id);if(!t)return;Object.assign(t,{name:document.getElementById('templateEditName').value.trim(),meal:document.getElementById('templateEditMeal').value,favourite:document.getElementById('templateEditFav').checked,notes:document.getElementById('templateEditNotes').value.trim(),updatedAt:nowISO()});saveState();n260OpenLibrary('templates');}
function n260DeleteTemplate(id){if(!confirm('Delete this meal template? Existing diary entries remain.'))return;if(typeof recordDeletion==='function')recordDeletion('mealTemplates',id,'meal template deleted');state.mealTemplates=state.mealTemplates.filter(x=>x.id!==id);saveState();n260OpenLibrary('templates');}

function n260CacheRead(){try{const parsed=JSON.parse(localStorage.getItem(LC_NUTRITION_V260.CACHE_KEY)||'{}');return parsed&&typeof parsed==='object'?parsed:{};}catch{return {};}}
function n260CacheKey(query,source){return `${source}:${n260Norm(query)}`;}
function n260GetCached(query,source){const all=n260CacheRead(),row=all[n260CacheKey(query,source)],days=Math.max(1,toNum(state.settings.nutritionSearchCacheDays)||LC_NUTRITION_V260.CACHE_DAYS);if(!row||Date.now()-toNum(row.savedAt)>days*86400000)return null;return row;}
function n260PutCached(query,source,foods){const all=n260CacheRead(),key=n260CacheKey(query,source);all[key]={savedAt:Date.now(),foods};const rows=Object.entries(all).sort((a,b)=>toNum(b[1].savedAt)-toNum(a[1].savedAt)).slice(0,LC_NUTRITION_V260.CACHE_MAX);localStorage.setItem(LC_NUTRITION_V260.CACHE_KEY,JSON.stringify(Object.fromEntries(rows)));}
function n260OnlineCard(item,index){return `<div class="food-search-card"><div><strong>${esc(item.name)}</strong>${item.brand?`<div class="small muted">${esc(item.brand)}</div>`:''}<div class="tiny">${n260MacroText(item)} per 100 g · ${esc(item.source||'Reference')}</div></div><div class="button-row"><button onclick="n260SaveOnline(${index},true)">Save & log</button><button class="secondary compact" onclick="n260SaveOnline(${index},false)">Save</button></div></div>`;}
function n260RenderOnline(meta={}){const box=document.getElementById('onlineFoodResults')||document.getElementById('barcodeResult');if(!box)return;box.innerHTML=onlineFoods260.length?`<div class="card-title"><span>Reference results</span><span class="pill ${meta.cached?'good':'gray'}">${meta.cached?'Cached':onlineFoods260.length}</span></div><div class="fast-food-result-list">${onlineFoods260.map(n260OnlineCard).join('')}</div>`:'<div class="empty">No reference match. Try a simpler food name or add it manually.</div>';}
async function n260SearchOnline(source='all'){
  const q=foodLogger260.query.trim(),box=document.getElementById('onlineFoodResults');if(q.length<2)return showToast('Enter at least two characters');if(!state.settings.syncUrl||!state.settings.syncKey)return showToast('Connect the updated Google Sheets backend first');if(onlineBusy260)return;
  const cached=n260GetCached(q,source);if(cached){onlineFoods260=cached.foods||[];n260RenderOnline({cached:true});}
  onlineBusy260=true;if(box&&!cached)box.innerHTML='<div class="empty">Searching reference data…</div>';
  try{const result=await jsonpRequest({action:'food-search',key:state.settings.syncKey,q,source},LC_NUTRITION_V260.ONLINE_TIMEOUT);if(!result?.ok)throw new Error(result?.error||'Search failed');onlineFoods260=(result.foods||[]).map(x=>({...x,kcal:toNum(x.kcal),protein:toNum(x.protein),carbs:toNum(x.carbs),fat:toNum(x.fat),fibre:toNum(x.fibre),sodiumMg:toNum(x.sodiumMg)}));n260PutCached(q,source,onlineFoods260);n260RenderOnline({cached:Boolean(result.cached)});}catch(error){if(!cached&&box)box.innerHTML=`<div class="notice warn">${esc(error.message||'Reference search failed')}<br><span class="small">Local logging remains available.</span></div>`;}finally{onlineBusy260=false;}
}
function n260OnlineToSaved(x){return n260NormaliseSavedFood({id:uid('savedfood'),name:x.name,brand:x.brand||'',servingDescription:x.servingSize||'100 g',baseAmount:100,baseUnit:'g',gramsPerServing:toNum(x.servingQuantity)||'',kcal:x.kcal,protein:x.protein,carbs:x.carbs,fat:x.fat,fibre:x.fibre,sodiumMg:x.sodiumMg,barcode:x.barcode||'',source:x.source||'Reference database',sourceType:x.source||'Reference database',sourceId:x.sourceId||'',sourceUrl:x.sourceUrl||'',notes:'Reference value saved locally. Verify branded products against the current package label.'});}
function n260SaveOnline(index,log=false){const x=onlineFoods260[index];if(!x)return;let food=state.savedFoods.find(f=>f.sourceId&&f.sourceId===x.sourceId&&f.source===x.source);if(!food){food=n260OnlineToSaved(x);state.savedFoods.push(food);saveState();}showToast('Food saved for instant reuse');if(log)n260OpenPortion('saved',food.id);else n260RenderLoggerResults();}

function n260OpenBarcode(){n260EnsureLoggerContext();showModal(`<div class="fast-food-header"><div><div class="eyebrow">Packaged food</div><h2>Barcode lookup</h2></div><button class="ghost compact" onclick="n260ReturnToLogger()">Back</button></div><div class="notice">Confirm community-sourced values against the package label before relying on them.</div><label>Barcode<input id="barcodeValue" inputmode="numeric" autocomplete="off" placeholder="EAN / UPC"></label><div class="button-row"><button onclick="n260LookupBarcode()">Look up product</button>${'BarcodeDetector' in window?'<button class="secondary" onclick="n260StartBarcodeCamera()">Use camera</button>':''}</div><div id="barcodeCamera"></div><div id="barcodeResult"></div>`);document.getElementById('modal')?.classList.add('nutrition-logger-modal');}
async function n260LookupBarcode(code=''){const value=String(code||document.getElementById('barcodeValue')?.value||'').replace(/\D/g,'');if(value.length<8)return showToast('Enter a valid barcode');if(!state.settings.syncUrl||!state.settings.syncKey)return showToast('Connect Google Sheets first');const box=document.getElementById('barcodeResult');if(box)box.innerHTML='<div class="empty">Looking up barcode…</div>';try{const result=await jsonpRequest({action:'food-barcode',key:state.settings.syncKey,code:value},LC_NUTRITION_V260.ONLINE_TIMEOUT);if(!result?.ok||!result.food)throw new Error(result?.error||'Product not found');onlineFoods260=[result.food];n260RenderOnline({cached:Boolean(result.cached)});}catch(error){if(box)box.innerHTML=`<div class="notice warn">${esc(error.message||'Product not found')}</div>`;}}
async function n260StartBarcodeCamera(){if(!navigator.mediaDevices?.getUserMedia||!('BarcodeDetector' in window))return showToast('Camera barcode detection is not supported here');try{n260StopBarcodeCamera();barcodeStream260=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});const holder=document.getElementById('barcodeCamera');if(!holder)return;holder.innerHTML='<video id="barcodeVideo" autoplay playsinline muted></video><div class="tiny muted">Point the camera at the barcode.</div>';const video=document.getElementById('barcodeVideo');video.srcObject=barcodeStream260;const detector=new BarcodeDetector({formats:['ean_13','ean_8','upc_a','upc_e']});barcodeTimer260=setInterval(async()=>{try{if(video.readyState<2)return;const codes=await detector.detect(video);if(codes[0]?.rawValue){document.getElementById('barcodeValue').value=codes[0].rawValue;n260StopBarcodeCamera();n260LookupBarcode(codes[0].rawValue);}}catch{}},650);}catch(error){showToast(`Camera unavailable: ${error.message||error}`);}}
function n260StopBarcodeCamera(){clearInterval(barcodeTimer260);barcodeTimer260=null;if(barcodeStream260){barcodeStream260.getTracks().forEach(t=>t.stop());barcodeStream260=null;}const video=document.getElementById('barcodeVideo');if(video)video.srcObject=null;}

function n260SavedFoodCard(food){return `<div class="row"><div class="row-head"><div><strong>${esc(food.name)}</strong><div class="small muted">${esc(food.brand||food.source)} · ${esc(food.servingDescription)}</div><div class="tiny">${n260MacroText(food)}</div></div><button class="ghost compact" onclick="n260ToggleFavourite('saved','${esc(food.id)}')">${food.favourite?'★':'☆'}</button></div><div class="button-row"><button class="secondary compact" onclick="n260OpenPortion('saved','${esc(food.id)}')">Log</button><button class="ghost compact" onclick="n260OpenSavedFood('${esc(food.id)}')">Edit</button><button class="danger compact" onclick="n260DeleteSavedFood('${esc(food.id)}')">Delete</button></div></div>`;}
function n260OpenLibrary(tab=nutritionLibraryTab260){n260EnsureLoggerContext();nutritionLibraryTab260=tab;const foods=[...(state.savedFoods||[])].sort((a,b)=>Number(b.favourite)-Number(a.favourite)||n260Modified(b).localeCompare(n260Modified(a))||a.name.localeCompare(b.name)),templates=[...(state.mealTemplates||[])].sort((a,b)=>Number(b.favourite)-Number(a.favourite)||a.name.localeCompare(b.name));showModal(`<div class="fast-food-header"><div><div class="eyebrow">Nutrition library</div><h2>Foods and meals</h2></div><button class="ghost compact" onclick="n260ReturnToLogger()">Back</button></div><div class="button-row"><button class="${tab==='foods'?'':'ghost'} compact" onclick="n260OpenLibrary('foods')">Saved foods (${foods.length})</button><button class="${tab==='templates'?'':'ghost'} compact" onclick="n260OpenLibrary('templates')">Meal templates (${templates.length})</button></div>${tab==='foods'?`<div class="button-row" style="margin:12px 0"><button class="secondary" onclick="n260OpenSavedFood()">＋ Add package-label food</button></div><div class="list">${foods.length?foods.map(n260SavedFoodCard).join(''):'<div class="empty">Foods saved from quick entries, barcodes and reference searches appear here.</div>'}</div>`:`<div class="list" style="margin-top:12px">${templates.length?templates.map(t=>`<div class="row"><div class="row-head"><div><strong>${esc(t.name)}</strong><div class="small muted">${esc(t.meal)} · ${t.items.length} items · ${n260MacroText(n260TemplateTotals(t))}</div></div><button class="ghost compact" onclick="n260ToggleFavourite('template','${esc(t.id)}')">${t.favourite?'★':'☆'}</button></div><div class="button-row"><button class="secondary compact" onclick="n260LogTemplate('${esc(t.id)}')">Log</button><button class="ghost compact" onclick="n260EditTemplate('${esc(t.id)}')">Edit</button></div></div>`).join(''):'<div class="empty">Save any logged meal as a reusable template.</div>'}</div>`}`);document.getElementById('modal')?.classList.add('nutrition-logger-modal');}
function n260OpenSavedFood(id=''){const food=id?state.savedFoods.find(x=>x.id===id):n260NormaliseSavedFood({id:'',name:'',servingDescription:'1 serving',baseAmount:1,baseUnit:'serving',source:'Package label'});if(!food)return;showModal(`<div class="card-title"><span>${id?'Edit':'Add'} saved food</span><button class="ghost compact" onclick="n260OpenLibrary('foods')">Back</button></div><form class="stack" onsubmit="n260SaveSavedFood(event,'${esc(id)}')"><label>Name<input id="savedFoodName" required value="${esc(food.name)}"></label><div class="split"><label>Brand<input id="savedFoodBrand" value="${esc(food.brand)}"></label><label>Barcode<input id="savedFoodBarcode" inputmode="numeric" value="${esc(food.barcode)}"></label></div><div class="triple"><label>Base amount<input id="savedFoodAmount" type="number" min="0.01" step="0.01" value="${esc(food.baseAmount)}"></label><label>Base unit<input id="savedFoodUnit" value="${esc(food.baseUnit)}"></label><label>Serving description<input id="savedFoodServing" value="${esc(food.servingDescription)}"></label></div><div class="split"><label>Calories<input id="savedFoodKcal" type="number" min="0" step="0.1" value="${esc(food.kcal)}"></label><label>Protein g<input id="savedFoodProtein" type="number" min="0" step="0.1" value="${esc(food.protein)}"></label><label>Carbs g<input id="savedFoodCarbs" type="number" min="0" step="0.1" value="${esc(food.carbs)}"></label><label>Fat g<input id="savedFoodFat" type="number" min="0" step="0.1" value="${esc(food.fat)}"></label><label>Fibre g<input id="savedFoodFibre" type="number" min="0" step="0.1" value="${esc(food.fibre)}"></label><label>Sodium mg<input id="savedFoodSodium" type="number" min="0" step="1" value="${esc(food.sodiumMg)}"></label></div><label class="inline-check"><input id="savedFoodFav" type="checkbox" ${food.favourite?'checked':''}> Favourite</label><label>Notes<input id="savedFoodNotes" value="${esc(food.notes)}"></label><button type="submit">Save food</button></form>`);}
function n260SaveSavedFood(event,id=''){event.preventDefault();let food=id?state.savedFoods.find(x=>x.id===id):null;if(!food){food={id:uid('savedfood')};state.savedFoods.push(food);}Object.assign(food,{name:document.getElementById('savedFoodName').value.trim(),brand:document.getElementById('savedFoodBrand').value.trim(),barcode:document.getElementById('savedFoodBarcode').value.replace(/\D/g,''),servingDescription:document.getElementById('savedFoodServing').value.trim(),baseAmount:toNum(document.getElementById('savedFoodAmount').value)||1,baseUnit:document.getElementById('savedFoodUnit').value.trim()||'serving',kcal:toNum(document.getElementById('savedFoodKcal').value),protein:toNum(document.getElementById('savedFoodProtein').value),carbs:toNum(document.getElementById('savedFoodCarbs').value),fat:toNum(document.getElementById('savedFoodFat').value),fibre:toNum(document.getElementById('savedFoodFibre').value),sodiumMg:toNum(document.getElementById('savedFoodSodium').value),favourite:document.getElementById('savedFoodFav').checked,notes:document.getElementById('savedFoodNotes').value.trim(),source:'Package label / user',sourceType:'Package label',updatedAt:nowISO()});n260NormaliseSavedFood(food);saveState();n260OpenLibrary('foods');showToast('Saved food updated');}
function n260DeleteSavedFood(id){if(!confirm('Delete this saved food? Existing diary entries remain.'))return;if(typeof recordDeletion==='function')recordDeletion('savedFoods',id,'saved food deleted');state.savedFoods=state.savedFoods.filter(x=>x.id!==id);saveState();n260OpenLibrary('foods');}

function n260WeekSummary(endDate=selectedDietDate){const days=[];for(let i=6;i>=0;i--){const date=n260DateOffset(endDate,-i),total=foodTotals(date),status=(state.nutritionDays||[]).find(x=>x.date===date);days.push({date,...total,entries:state.foodLog.filter(x=>x.date===date).length,status:status?.status||''});}const logged=days.filter(x=>x.entries>0),avg=k=>logged.length?logged.reduce((s,x)=>s+toNum(x[k]),0)/logged.length:0;return {days,loggedDays:logged.length,completeDays:days.filter(x=>['Complete','Mostly complete'].includes(x.status)).length,avgKcal:avg('kcal'),avgProtein:avg('protein')};}
function n260WeeklyCard(){if(!state.settings.nutritionShowWeeklySummary)return'';const w=n260WeekSummary(),target=Math.max(1,targets().kcal);return `<details class="card"><summary class="card-title"><span>Seven-day nutrition</span><span class="pill gray">${w.loggedDays}/7 logged</span></summary><div class="weekly-nutrition-grid"><div><strong>${round(w.avgKcal,0)||0}</strong><span>avg kcal</span></div><div><strong>${round(w.avgProtein,0)||0} g</strong><span>avg protein</span></div><div><strong>${w.completeDays}/7</strong><span>reliable days</span></div></div><div class="mini-day-bars">${w.days.map(d=>`<div title="${esc(d.date)} · ${round(d.kcal,0)} kcal"><span style="height:${Math.max(3,Math.min(100,toNum(d.kcal)/target*100))}%"></span><small>${formatDate(d.date,{weekday:'narrow'})}</small></div>`).join('')}</div></details>`;}
const n260BaseRenderDiet=renderDiet;renderDiet=function(){
  if(state.settings.dietView!=='diary')return n260BaseRenderDiet();n260EnsureState(state);const totals=foodTotals(selectedDietDate),t=targets(),rows=state.foodLog.filter(x=>x.date===selectedDietDate).sort((a,b)=>n260MealOrder(a.meal)-n260MealOrder(b.meal)||n260Modified(a).localeCompare(n260Modified(b))),remaining=Math.max(0,t.kcal-totals.kcal),proteinRemaining=Math.max(0,t.protein-totals.protein);
  return `<div class="grid nutrition-v260-page">${renderDietSectionNav('diary')}<section class="card highlight nutrition-today-card"><div class="card-title"><span>Nutrition today</span><span class="pill ${state.settings.dietMode==='RFL / PSMF'?'warn':'gray'}">${esc(state.settings.dietMode)}</span></div><label>Date<input type="date" value="${esc(selectedDietDate)}" onchange="selectedDietDate=this.value;render()"></label><div class="nutrition-hero"><div><span>Remaining</span><strong>${round(remaining,0)} kcal</strong><small>${round(proteinRemaining,0)} g protein</small></div><div class="nutrition-hero-bars">${progressBar('Calories',totals.kcal,t.kcal,' kcal')}${progressBar('Protein',totals.protein,t.protein,' g')}</div></div><div class="macro-strip"><span><strong>${round(totals.carbs,0)}</strong> / ${round(t.carbs,0)} C</span><span><strong>${round(totals.fat,0)}</strong> / ${round(t.fat,0)} F</span><span><strong>${round(totals.fibre,0)}</strong>${t.fibre?` / ${round(t.fibre,0)}`:''} fibre</span></div>${renderNutritionDayStatusCard(selectedDietDate)}<button class="fast-log-primary" onclick="openFastFoodLogger260()">＋ Log food quickly</button><div class="button-row"><button class="ghost compact" onclick="copyPreviousDay()">Copy yesterday</button><button class="ghost compact" onclick="n260OpenQuickMacros()">Quick macros</button><button class="ghost compact" onclick="n260OpenLibrary()">Library</button></div></section><div class="meal-diary-list">${LC_NUTRITION_V260.MEALS.map(meal=>n260MealCard(meal,rows.filter(x=>x.meal===meal))).join('')}${rows.some(x=>!LC_NUTRITION_V260.MEALS.includes(x.meal))?n260MealCard('Other',rows.filter(x=>!LC_NUTRITION_V260.MEALS.includes(x.meal))):''}</div>${n260WeeklyCard()}<details class="card"><summary class="card-title"><span>Recipes and import</span><span class="pill gray">${state.recipes.length}</span></summary><div class="button-row"><button class="secondary" onclick="openRecipeBuilder()">＋ Add recipe</button><button class="secondary" onclick="openRecipeImportHub()">Import recipe</button></div><label style="margin-top:10px">Search recipes<input id="recipeSearch" type="search" placeholder="Recipe, source or tag" oninput="renderRecipeList()"></label><div id="recipeList" class="list" style="margin-top:10px">${recipeListHtml([...state.recipes].sort((a,b)=>Number(Boolean(b.favourite))-Number(Boolean(a.favourite))||a.name.localeCompare(b.name)))}</div></details></div>`;
};
openAddFood=openFastFoodLogger260;
const n260BaseQuickAdd=openQuickAdd;openQuickAdd=function(){showModal(`<div class="card-title"><span>Quick add</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="grid"><button onclick="closeModal();openFastFoodLogger260()">Log food quickly</button><button class="secondary" onclick="closeModal();setPage('train')">Log workout</button><button class="secondary" onclick="closeModal();n260OpenQuickMacros()">Quick calories / macros</button><button class="secondary" onclick="closeModal();openMetricModal()">Body measurement</button><button class="secondary" onclick="closeModal();openCheckinModal()">Daily check-in</button><button class="ghost" onclick="closeModal();openRecipeBuilder()">Add recipe</button><button class="ghost" onclick="closeModal();openRecipeImportHub()">Import recipe</button><button class="ghost" onclick="closeModal();openCardioModal()">Log cardio</button></div>`);};
const n260BaseCloseModal=closeModal;closeModal=function(){n260StopBarcodeCamera();n260BaseCloseModal();};

Object.assign(window,{openFastFoodLogger260,n260SetLoggerTab,n260UpdateLoggerQuery,n260RenderLoggerResults,n260ToggleFavourite,n260OpenPortion,n260UpdatePortion,n260CommitPortion,n260ReturnToLogger,n260RepeatRecent,n260OneTap,n260OpenQuickMacros,n260CommitQuickMacros,n260EditEntry,n260SaveEntry,n260DuplicateEntry,n260DeleteEntry,n260OpenMealLogger,n260CopyMeal,n260SaveMealTemplate,n260CommitMealTemplate,n260LogTemplate,n260EditTemplate,n260RemoveTemplateItem,n260SaveTemplateEdit,n260DeleteTemplate,n260SearchOnline,n260SaveOnline,n260OpenBarcode,n260LookupBarcode,n260StartBarcodeCamera,n260OpenLibrary,n260OpenSavedFood,n260SaveSavedFood,n260DeleteSavedFood,foodLogger260,foodPortion260});

/* Lift & Cut 2.6.5 — nutrition reliability + local USDA compatibility.
 * - repairs starter-food libraries on upgraded phones
 * - prevents one slow reference source from blocking the other
 * - reports Apps Script reachability separately from source timeouts
 */
const LC_NUTRITION_V261 = Object.freeze({
  VERSION:'2.6.5',
  SOURCE_TIMEOUT:16000,
  HEALTH_TIMEOUT:15000
});

function n261FoodKeys(row){
  return n260Unique([row?.name,...(row?.aliases||[])]).map(n260Norm).filter(Boolean);
}
function n261RepairStarterIngredients(next=state){
  if(!next||!Array.isArray(next.ingredientCache)||!Array.isArray(DEFAULT_STATE.ingredientCache))return 0;
  let added=0;
  const idSet=new Set(next.ingredientCache.map(x=>String(x?.id||'')));
  const rows=()=>next.ingredientCache.map(row=>({row,keys:new Set(n261FoodKeys(row))}));
  let indexed=rows();
  for(const seed of DEFAULT_STATE.ingredientCache){
    const seedKeys=n261FoodKeys(seed);
    let match=indexed.find(x=>seedKeys.some(k=>x.keys.has(k)))?.row;
    if(!match){
      const copy=n260Clone(seed);
      if(idSet.has(String(copy.id||''))) copy.id=`${copy.id||'ING'}-seed261-${Math.random().toString(36).slice(2,7)}`;
      next.ingredientCache.push(copy);idSet.add(String(copy.id||''));added++;
      indexed.push({row:copy,keys:new Set(n261FoodKeys(copy))});
      continue;
    }
    match.aliases=n260Unique([...(seed.aliases||[]),...(match.aliases||[])]);
    match.commonMeasures={...(seed.commonMeasures||{}),...(match.commonMeasures||{})};
    if((match.densityGPerMl===''||match.densityGPerMl===undefined||match.densityGPerMl===null)&&seed.densityGPerMl!=='')match.densityGPerMl=seed.densityGPerMl;
    const generic=!match.confirmed && /generic reference/i.test(String(match.source||''));
    if(generic){for(const key of ['baseAmount','baseUnit','servingDescription','kcal','protein','carbs','fat','fibre','sodiumMg'])if(seed[key]!==undefined&&seed[key]!==null&&seed[key]!=='')match[key]=seed[key];}
  }
  return added;
}

const n261BaseEnsureState=n260EnsureState;
n260EnsureState=function(next){
  next=n261BaseEnsureState(next);
  const added=n261RepairStarterIngredients(next);
  if(added&&next?.meta)next.meta.starterFoodRepair261=added;
  next.meta=next.meta||{};next.meta.appVersion=LC_NUTRITION_V261.VERSION;
  return next;
};

const n261BaseLocalFoodMatches=localFoodMatches;
localFoodMatches=function(query,limit=8){
  let hits=n261BaseLocalFoodMatches(query,limit);
  if(!hits.length){
    const added=n261RepairStarterIngredients(state);
    if(added){try{saveState({touch:false,autoSync:false});}catch{}hits=n261BaseLocalFoodMatches(query,limit);}
  }
  return hits;
};

function n261DedupeFoods(rows){
  const seen=new Set(),out=[];
  for(const row of rows||[]){
    const key=`${n260Norm(row?.source)}|${String(row?.sourceId||row?.barcode||'')}|${n260Norm(row?.name)}|${n260Norm(row?.brand)}`;
    if(!row?.name||seen.has(key))continue;seen.add(key);out.push(row);
  }
  return out;
}
function n261FriendlySource(source){return source==='usda'?'USDA':'Open Food Facts';}
async function n261SourceRequest(q,source,timeout=LC_NUTRITION_V261.SOURCE_TIMEOUT){
  const cached=n260GetCached(q,source);
  if(cached?.foods?.length)return {source,ok:true,foods:cached.foods,cached:true};
  try{
    const result=await jsonpRequest({action:'food-search',key:state.settings.syncKey,q,source},timeout);
    if(!result?.ok)throw new Error(result?.error||`${n261FriendlySource(source)} search failed`);
    const foods=(result.foods||[]).map(x=>({...x,kcal:toNum(x.kcal),protein:toNum(x.protein),carbs:toNum(x.carbs),fat:toNum(x.fat),fibre:toNum(x.fibre),sodiumMg:toNum(x.sodiumMg)}));
    n260PutCached(q,source,foods);
    return {source,ok:true,foods,cached:Boolean(result.cached)};
  }catch(error){
    const message=String(error?.message||error||'Search failed').replace(/^Sync timed out$/i,`${n261FriendlySource(source)} search timed out`).replace(/^Could not reach Apps Script$/i,'Apps Script could not be reached');
    return {source,ok:false,foods:[],error:message};
  }
}
async function n261BackendHealth(){
  try{const r=await jsonpRequest({action:'health'},LC_NUTRITION_V261.HEALTH_TIMEOUT);return {ok:Boolean(r?.ok),version:r?.appVersion||'',error:r?.ok?'':'Health check rejected'};}
  catch(error){return {ok:false,version:'',error:String(error?.message||error||'Apps Script unavailable')};}
}
async function n261ProgressiveReferenceSearch(q,sources=['usda','openfoodfacts'],onUpdate=()=>{}){
  const results=[],errors=[];let completed=0;
  const tasks=sources.map(source=>n261SourceRequest(q,source).then(res=>{
    completed++;
    if(res.ok)results.push(...res.foods);else errors.push(res);
    onUpdate(n261DedupeFoods(results),{completed,total:sources.length,last:res,errors:[...errors]});
    return res;
  }));
  await Promise.all(tasks);
  const foods=n261DedupeFoods(results);
  let health=null;if(!foods.length&&errors.length===sources.length)health=await n261BackendHealth();
  return {foods,errors,health};
}
function n261FailureMessage(result){
  if(result?.health&&!result.health.ok)return `Live lookup could not reach Apps Script within the timeout. The bundled USDA library above still works offline. If More → Cloud sync → Test also fails, check or redeploy the Apps Script web app. (${result.health.error})`;
  if(result?.health?.ok)return `Apps Script is reachable${result.health.version?` (${result.health.version})`:''}, but the external food source request timed out or failed. The bundled USDA library still works offline.`;
  const errors=(result?.errors||[]).map(x=>x.error).filter(Boolean);return errors.join(' · ')||'Live reference search failed. Local USDA results are unaffected.';
}
function n261ReferenceResultHtml(rows,index=null){
  return `<div class="card-title" style="margin-top:14px"><span>Reference results</span><span class="pill gray">${rows.length}</span></div><div class="list">${rows.length?rows.map((item,i)=>`<button class="food-match-card" onclick="${index===null?`saveStandaloneReferenceFood(${i})`:`selectReferenceFood(${index},${i})`}"><span><strong>${esc(item.name)}</strong>${item.brand?`<small>${esc(item.brand)}</small>`:''}<small>${round(item.kcal,0)} kcal · ${round(item.protein,1)}P · ${round(item.carbs,1)}C · ${round(item.fat,1)}F per 100 g</small><small>${esc(item.source)}</small></span><span class="pill gray">Use</span></button>`).join(''):'<div class="empty">No results. Try a simpler name or add it manually.</div>'}</div>`;
}

n260SearchOnline=async function(source='all'){
  const q=(document.getElementById('fastFoodSearch')?.value||foodLogger260.query||'').trim();if(q.length<2)return showToast('Type at least two characters');
  if(!state.settings.syncUrl||!state.settings.syncKey)return showToast('Connect Google Sheets first');
  if(onlineBusy260)return;const box=document.getElementById('onlineFoodResults');onlineBusy260=true;onlineFoods260=[];
  const sources=source==='all'?['usda','openfoodfacts']:[source];
  if(box)box.innerHTML=`<div class="empty">Searching ${sources.map(n261FriendlySource).join(' + ')} separately…</div>`;
  try{
    const result=await n261ProgressiveReferenceSearch(q,sources,(foods,meta)=>{onlineFoods260=foods;if(box&&foods.length)n260RenderOnline({cached:false});if(box&&!foods.length&&meta.completed<meta.total)box.innerHTML=`<div class="empty">${n261FriendlySource(meta.last.source)} finished. Waiting for the other source…</div>`;});
    onlineFoods260=result.foods;
    if(onlineFoods260.length)n260RenderOnline({cached:false});else if(box)box.innerHTML=`<div class="notice warn">${esc(n261FailureMessage(result))}<br><span class="small">Try USDA alone for generic foods or Open Food Facts alone for branded products.</span></div>`;
  }finally{onlineBusy260=false;}
};

searchReferenceFoods=async function(index){
  const entered=(document.getElementById('foodMatchQuery')?.value||'').trim(),q=referenceFoodQuery(entered),box=document.getElementById('foodSearchResults');if(q.length<2)return showToast('Enter at least two characters');
  if(!state.settings.syncUrl||!state.settings.syncKey)return showToast('Live USDA fallback needs the Google Sheets backend',4500);
  if(box)box.innerHTML='<div class="empty">Searching live USDA…</div>';
  const res=await n261SourceRequest(q,'usda',16000);foodSearchResults=res.foods||[];
  if(foodSearchResults.length){if(box)box.innerHTML=n261ReferenceResultHtml(foodSearchResults,index);}
  else {const health=await n261BackendHealth();if(box)box.innerHTML=`<div class="notice warn">${esc(n261FailureMessage({foods:[],errors:[res],health}))}</div>`;}
};


searchStandaloneReferenceFoods=async function(){
  const q=(document.getElementById('standaloneFoodQuery')?.value||'').trim(),box=document.getElementById('standaloneFoodResults');if(q.length<2)return showToast('Enter a food name');
  if(typeof lcUsda262Ready==='function'&&lcUsda262Ready()&&typeof lcUsda262Search==='function'){
    foodSearchResults=lcUsda262Search(q,18);if(foodSearchResults.length){if(box)box.innerHTML=n261ReferenceResultHtml(foodSearchResults,null);return;}
  }
  if(!state.settings.syncUrl||!state.settings.syncKey){if(box)box.innerHTML='<div class="notice warn">No local USDA match. Connect the Google Sheets backend only if you want a live reference fallback.</div>';return;}
  if(box)box.innerHTML='<div class="empty">No local match. Searching live USDA and Open Food Facts…</div>';
  const result=await n261ProgressiveReferenceSearch(q,['usda','openfoodfacts'],foods=>{foodSearchResults=foods;if(box&&foods.length)box.innerHTML=n261ReferenceResultHtml(foods,null);});
  foodSearchResults=result.foods;if(foodSearchResults.length){if(box)box.innerHTML=n261ReferenceResultHtml(foodSearchResults,null);}else if(box)box.innerHTML=`<div class="notice warn">${esc(n261FailureMessage(result))}</div>`;
};


findUnmatchedIngredientsOnline=async function(){
  if(!recipeDraft)return;const targets=recipeDraft.ingredients.map((ing,index)=>({ing,index})).filter(x=>!x.ing.ingredientId&&x.ing.notes!=='Section heading'&&!(ingredientChoiceOptions(x.ing).length>1&&!x.ing.selectedAlternative));
  if(!targets.length)return showToast('All ingredients already have a match');if(!state.settings.syncUrl||!state.settings.syncKey)return showToast('Online food matching needs the Google Sheets backend',4500);if(recipeImportBusy)return;
  recipeImportBusy=true;let matched=0;const batch=targets.slice(0,15),queue=[...batch];
  try{
    const worker=async()=>{while(queue.length){const {ing}=queue.shift();const q=referenceFoodQuery(ingredientMatchQuery(ing));let res=await n261SourceRequest(q,'usda',14000);if(!res.foods.length)res=await n261SourceRequest(q,'openfoodfacts',14000);if(!res.foods.length)continue;const ranked=res.foods.map(food=>({food,score:Math.max(foodMatchScore(q,{name:food.name,aliases:[]}),foodMatchScore(ing.name,{name:food.name,aliases:[]}))})).sort((a,b)=>b.score-a.score);if(!ranked[0]||ranked[0].score<64)continue;const r=ranked[0].food,item={id:uid('ingredient'),name:r.name,brand:r.brand||'',foodState:r.foodState||'',servingDescription:'100 g',baseAmount:100,baseUnit:'g',densityGPerMl:'',kcal:toNum(r.kcal),protein:toNum(r.protein),carbs:toNum(r.carbs),fat:toNum(r.fat),fibre:toNum(r.fibre),sodiumMg:toNum(r.sodiumMg),aliases:[q,ing.name].filter(Boolean),commonMeasures:{},source:r.source||'Reference database',sourceId:r.sourceId||'',sourceUrl:r.sourceUrl||'',confirmed:false,notes:'Automatically matched from reference search; review before relying on it.',updatedAt:nowISO()};state.ingredientCache.push(item);applyIngredientMatch(ing,item,'likely',ranked[0].score);matched++;}};
    await Promise.all([worker(),worker(),worker()]);saveState();openBulkIngredientReview();showToast(`${matched} online match${matched===1?'':'es'} applied · review before saving`,4500);
  }finally{recipeImportBusy=false;}
};

try{if(typeof state==='object'&&state){const added=n261RepairStarterIngredients(state);if(added){state.meta=state.meta||{};state.meta.appVersion=LC_NUTRITION_V261.VERSION;saveState({touch:false,autoSync:false});}}}catch(error){console.warn('Starter food repair deferred',error);}

Object.assign(window,{n261RepairStarterIngredients,n261BackendHealth});
