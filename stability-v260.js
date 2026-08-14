'use strict';

/* Lift & Cut 2.6.4 — stability, migration, sync and data protection.
 * Loaded after the v2.5 feature modules and before boot().
 */

const LC_V251 = Object.freeze({
  VERSION:'2.6.4',
  SCHEMA:7,
  DB_NAME:'liftCut.safety.v1',
  DB_VERSION:1,
  MIRROR_KEY:'latest',
  SHADOW_KEY:'cloud-shadow',
  MAX_SNAPSHOTS:12,
  SYNC_COLLECTIONS:['programs','exercises','alternatives','ingredientCache','recipes','workoutSessions','workoutLogs','foodLog','bodyMetrics','dailyCheckins','dietPhases','nutritionDays','targetAdjustments','weeklyReviews','rflProfiles','rflDailyLogs','rflEvents','cardioLogs','progressPhotos','savedFoods','mealTemplates'],
  DEVICE_LOCAL_SETTINGS:new Set(['syncUrl','syncKey','autoSync','theme','trainView','dietView','rflLastView'])
});

var localSaveError='';
var syncShadowState=null;
var pendingBackupImport=null;
var pendingCloudState=null;
var lastMergeReport=null;
var bootNotice='';
var safetyMirrorTimer=null;

function v251Clone(value){return value===undefined?undefined:JSON.parse(JSON.stringify(value));}
function v251Stable(value){
  if(value===null||typeof value!=='object')return JSON.stringify(value);
  if(Array.isArray(value))return `[${value.map(v251Stable).join(',')}]`;
  return `{${Object.keys(value).sort().map(k=>`${JSON.stringify(k)}:${v251Stable(value[k])}`).join(',')}}`;
}
function v251FastHash(text){
  let h1=0xdeadbeef^text.length,h2=0x41c6ce57^text.length;
  for(let i=0;i<text.length;i++){const ch=text.charCodeAt(i);h1=Math.imul(h1^ch,2654435761);h2=Math.imul(h2^ch,1597334677);}
  h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);
  h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);
  return (4294967296*(2097151&h2)+(h1>>>0)).toString(16).padStart(14,'0');
}
async function v251Sha256(text){
  if(globalThis.crypto?.subtle){
    const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));
    return [...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,'0')).join('');
  }
  return `fallback-${v251FastHash(text)}`;
}
function v251OpenDb(){
  return new Promise((resolve,reject)=>{
    if(!('indexedDB' in globalThis))return reject(new Error('IndexedDB unavailable'));
    const req=indexedDB.open(LC_V251.DB_NAME,LC_V251.DB_VERSION);
    req.onupgradeneeded=()=>{
      const db=req.result;
      if(!db.objectStoreNames.contains('mirror'))db.createObjectStore('mirror',{keyPath:'id'});
      if(!db.objectStoreNames.contains('snapshots')){const store=db.createObjectStore('snapshots',{keyPath:'id'});store.createIndex('createdAt','createdAt');}
      if(!db.objectStoreNames.contains('sync'))db.createObjectStore('sync',{keyPath:'id'});
      if(!db.objectStoreNames.contains('corrupt'))db.createObjectStore('corrupt',{keyPath:'id'});
    };
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||new Error('IndexedDB open failed'));
  });
}
async function v251Store(mode,storeName,operation){
  const db=await v251OpenDb();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(storeName,mode),store=tx.objectStore(storeName);let result;
    try{result=operation(store);}catch(error){db.close();return reject(error);}
    tx.oncomplete=()=>{db.close();resolve(result?.result);};tx.onerror=()=>{db.close();reject(tx.error||new Error('IndexedDB transaction failed'));};tx.onabort=()=>{db.close();reject(tx.error||new Error('IndexedDB transaction aborted'));};
  });
}
async function v251Put(store,row){await v251Store('readwrite',store,s=>s.put(row));return row;}
async function v251Get(store,id){return await v251Store('readonly',store,s=>s.get(id));}
async function v251Delete(store,id){return await v251Store('readwrite',store,s=>s.delete(id));}
async function v251All(store){return await v251Store('readonly',store,s=>s.getAll())||[];}

function v251StateSummary(value){
  const s=value||{},counts={};LC_V251.SYNC_COLLECTIONS.forEach(k=>counts[k]=Array.isArray(s[k])?s[k].length:0);
  return {schemaVersion:Number(s.schemaVersion||s.version||0),appVersion:String(s.meta?.appVersion||''),revision:Number(s.meta?.revision||0),lastModifiedAt:String(s.meta?.lastModifiedAt||''),counts};
}
function v251ValidateState(value,{maxSchema=LC_V251.SCHEMA}={}){
  const errors=[],warnings=[];
  if(!value||typeof value!=='object'||Array.isArray(value))errors.push('State is not an object.');
  const schema=Number(value?.schemaVersion||value?.version||0);
  if(!schema)warnings.push('Schema version is missing.');
  if(schema>maxSchema)errors.push(`Schema ${schema} is newer than this app supports.`);
  for(const key of LC_V251.SYNC_COLLECTIONS){
    if(!Array.isArray(value?.[key])){errors.push(`${key} is not an array.`);continue;}
    const ids=new Set();for(const row of value[key]){if(!row||typeof row!=='object'){errors.push(`${key} contains a non-object row.`);continue;}if(!row.id){warnings.push(`${key} contains a row without an ID.`);continue;}if(ids.has(row.id))errors.push(`${key} contains duplicate ID ${row.id}.`);ids.add(row.id);}
  }
  if(value?.deletedRecords!==undefined&&!Array.isArray(value.deletedRecords))errors.push('deletedRecords is not an array.');
  const programIds=new Set((value?.programs||[]).map(x=>x.id));
  if(value?.settings?.activeProgram&&!programIds.has(value.settings.activeProgram))warnings.push('The selected active program no longer exists.');
  const sessionIds=new Set((value?.workoutSessions||[]).map(x=>x.id));
  for(const row of value?.workoutLogs||[])if(row.sessionLogId&&!sessionIds.has(row.sessionLogId))warnings.push(`Workout set ${row.id} has no parent session.`);
  const phaseIds=new Set((value?.dietPhases||[]).map(x=>x.id));
  for(const key of ['rflProfiles','rflDailyLogs','rflEvents'])for(const row of value?.[key]||[])if(row.phaseId&&!phaseIds.has(row.phaseId))warnings.push(`${key} row ${row.id} has no parent phase.`);
  const score=Math.max(0,100-errors.length*20-Math.min(30,warnings.length*2));
  return {ok:errors.length===0,score,errors,warnings,summary:v251StateSummary(value)};
}

const LiftCutSafety={
  stableStringify:v251Stable,sha256Text:v251Sha256,stateSummary:v251StateSummary,validateState:v251ValidateState,deepClone:v251Clone,
  async putMirror(value){const row={id:LC_V251.MIRROR_KEY,savedAt:nowISO(),hash:await v251Sha256(v251Stable(value)),state:v251Clone(value)};await v251Put('mirror',row);return row;},
  async getMirror(){return await v251Get('mirror',LC_V251.MIRROR_KEY);},
  async putCorruptPayload(raw,error){return await v251Put('corrupt',{id:`corrupt-${Date.now()}`,createdAt:nowISO(),error:String(error||''),raw:String(raw||'').slice(0,2000000)});},
  async createSnapshot(value,label='Safety snapshot',reason='manual',draft=null,cooking={}){const stateCopy=v251Clone(value),row={id:`snapshot-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,createdAt:nowISO(),label,reason,summary:v251StateSummary(stateCopy),hash:await v251Sha256(v251Stable(stateCopy)),state:stateCopy,draft:v251Clone(draft),cooking:v251Clone(cooking||{})};await v251Put('snapshots',row);const all=(await v251All('snapshots')).sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));for(const old of all.slice(LC_V251.MAX_SNAPSHOTS))await v251Delete('snapshots',old.id);return row;},
  async listSnapshots(){return (await v251All('snapshots')).sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt))).map(({state,draft,cooking,...row})=>row);},
  async getSnapshot(id){return await v251Get('snapshots',id);},
  async deleteSnapshot(id){return await v251Delete('snapshots',id);},
  async putSyncShadow(value,revision=0,stateHash=''){const row={id:LC_V251.SHADOW_KEY,savedAt:nowISO(),revision:Number(revision||0),stateHash:String(stateHash||''),state:v251Clone(value)};await v251Put('sync',row);return row;},
  async getSyncShadow(){return await v251Get('sync',LC_V251.SHADOW_KEY);},
  async clearSyncShadow(){return await v251Delete('sync',LC_V251.SHADOW_KEY);}
};
window.LiftCutSafety=LiftCutSafety;

const v251LegacyMigrate=migrateState;
function v251MetaDefaults(next){
  next.meta=next.meta||{};const m=next.meta;
  m.appVersion=APP_VERSION;m.revision=Number(m.revision||0);m.lastCloudRevision=Number(m.lastCloudRevision||0);m.lastCloudRevisionSeen=Number((m.lastCloudRevisionSeen ?? m.lastCloudRevision) || 0);
  m.lastCloudUpdatedAtSeen=String(m.lastCloudUpdatedAtSeen||'');m.lastCloudStateHash=String(m.lastCloudStateHash||'');m.lastSyncedStateHash=String(m.lastSyncedStateHash||'');m.syncStatus=String(m.syncStatus||((next.settings?.syncUrl&&next.settings?.syncKey)?'dirty':'local'));
  m.lastSyncError=String(m.lastSyncError||'');m.lastSuccessfulLocalSaveAt=String(m.lastSuccessfulLocalSaveAt||m.lastModifiedAt||'');m.lastMirrorSaveAt=String(m.lastMirrorSaveAt||'');m.migrationReport=m.migrationReport||null;
}
function normaliseDeletedRecords(rows){
  const map=new Map();for(const row of Array.isArray(rows)?rows:[]){const collection=String(row?.collection||''),recordId=String(row?.recordId||'');if(!collection||!recordId)continue;const key=`${collection}|${recordId}`,deletedAt=String(row.deletedAt||row.updatedAt||nowISO());const item={id:String(row.id||`${collection}:${recordId}`),collection,recordId,deletedAt,reason:String(row.reason||''),updatedAt:String(row.updatedAt||deletedAt)};const prior=map.get(key);if(!prior||item.deletedAt>=prior.deletedAt)map.set(key,item);}return [...map.values()];
}
function applyDeletedRecords(next){
  next.deletedRecords=normaliseDeletedRecords(next.deletedRecords);
  const groups=new Map();for(const t of next.deletedRecords){if(!groups.has(t.collection))groups.set(t.collection,new Map());groups.get(t.collection).set(t.recordId,t);}
  for(const key of LC_V251.SYNC_COLLECTIONS){const tombs=groups.get(key);if(!tombs||!Array.isArray(next[key]))continue;next[key]=next[key].filter(row=>{const t=tombs.get(String(row.id||''));if(!t)return true;if(key==='programs'&&(row.builtIn===true||['UL4','RFL2','GVS_EXTRA','MLM6_MOD'].includes(row.id)))return true;return String(row.updatedAt||'')>String(t.deletedAt||'');});}
  return next;
}
function recordDeletion(collection,recordId,reason='deleted'){
  if(!collection||!recordId||typeof state==='undefined'||!state)return;
  state.deletedRecords=normaliseDeletedRecords([...(state.deletedRecords||[]),{id:`${collection}:${recordId}`,collection,recordId:String(recordId),deletedAt:nowISO(),reason,updatedAt:nowISO()}]);
}
window.recordDeletion=recordDeletion;

migrateState=function(input){
  const source=input&&typeof input==='object'?v251Clone(input):{};const from=Number(source.schemaVersion||source.version||2);const steps=[];
  if(from<3)steps.push('2→3 equipment catalogue and structured requirements');
  if(from<4)steps.push('3→4 recipe import and ingredient cache');
  if(from<5)steps.push('4→5 trend-weight coaching and nutrition completeness');
  if(from<6)steps.push('5→6 guided RFL records and program provenance');
  if(from<7)steps.push('6→7 fast nutrition logging, saved foods and meal templates');
  let next=v251LegacyMigrate(source);next.deletedRecords=normaliseDeletedRecords(source.deletedRecords||next.deletedRecords||[]);v251MetaDefaults(next);next.schemaVersion=LC_V251.SCHEMA;next.meta.appVersion=APP_VERSION;
  next.meta.migrationReport={fromSchema:from,toSchema:LC_V251.SCHEMA,performedAt:nowISO(),steps,changed:steps.length>0};
  applyDeletedRecords(next);
  if(!next.programs.some(p=>p.id===next.settings.activeProgram)){const fallback=next.programs.find(p=>p.id==='RFL2'&&next.settings.dietMode==='RFL / PSMF')||next.programs.find(p=>p.id==='UL4')||next.programs[0];next.settings.activeProgram=fallback?.id||'';next.settings.lastSession=fallback?sessionKey(fallback.id,fallback.sessions?.[0]?.id||''):'';}
  return next;
};

async function createSafetySnapshot(label,reason='manual'){try{return await LiftCutSafety.createSnapshot(state,label,reason,workoutDraft,cookingProgress);}catch(error){console.warn('Safety snapshot failed',error);return null;}}
window.createSafetySnapshot=createSafetySnapshot;
function scheduleSafetyMirror(delay=500){clearTimeout(safetyMirrorTimer);safetyMirrorTimer=setTimeout(async()=>{try{const row=await LiftCutSafety.putMirror(state);state.meta.lastMirrorSaveAt=row.savedAt;}catch(error){console.warn('Mirror save failed',error);}},Math.max(0,delay));}
window.scheduleSafetyMirror=scheduleSafetyMirror;

loadState=async function(){
  let raw='',parsed=null,source='starter';
  try{raw=localStorage.getItem(STORAGE_KEY)||'';if(raw){parsed=JSON.parse(raw);source='phone';}}
  catch(error){console.error('Primary state is unreadable',error);try{await LiftCutSafety.putCorruptPayload(raw,error);}catch{}bootNotice='The primary phone record was unreadable. Lift & Cut attempted recovery from its redundant mirror.';}
  if(!parsed){try{const mirror=await LiftCutSafety.getMirror();if(mirror?.state){parsed=mirror.state;source='mirror';bootNotice='Recovered the phone database from the redundant local mirror.';}}catch(error){console.warn(error);}}
  const original=parsed||v251Clone(DEFAULT_STATE);const originalSchema=Number(original.schemaVersion||original.version||2);
  if(parsed&&originalSchema<LC_V251.SCHEMA){try{await LiftCutSafety.createSnapshot(original,`Before migration from schema ${originalSchema}`,'pre-migration',null,{});}catch(error){console.warn(error);}}
  const next=migrateState(original);const audit=LiftCutSafety.validateState(next,{maxSchema:LC_V251.SCHEMA});
  if(!audit.ok){bootNotice=`Loaded with ${audit.errors.length} integrity issue${audit.errors.length===1?'':'s'}. Open More → Safety centre.`;}
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(next));next.meta.lastSuccessfulLocalSaveAt=nowISO();localSaveError='';}catch(error){localSaveError=String(error.message||error);console.error('Primary save failed',error);}
  try{const mirror=await LiftCutSafety.putMirror(next);next.meta.lastMirrorSaveAt=mirror.savedAt;}catch(error){console.warn('Initial mirror save failed',error);}
  if(source==='starter'&&!bootNotice)bootNotice='Lift & Cut 2.6.4 data protection is active.';
  return next;
};

saveState=function({touch=true,autoSync=true}={}){
  if(!state?.meta)return;
  if(touch){state.meta.lastModifiedAt=nowISO();state.meta.revision=toNum(state.meta.revision)+1;}
  state.meta.appVersion=APP_VERSION;v251MetaDefaults(state);
  const configured=Boolean(state.settings.syncUrl&&state.settings.syncKey);
  if(touch){if(configured&&!['pending','conflict','cloud-newer','verification-needed','error'].includes(state.meta.syncStatus))state.meta.syncStatus='dirty';if(!configured)state.meta.syncStatus='local';}
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));state.meta.lastSuccessfulLocalSaveAt=nowISO();localSaveError='';}
  catch(error){localSaveError=String(error.message||error);state.meta.lastSyncError=`Local save failed: ${localSaveError}`;console.error('State save failed',error);}
  scheduleSafetyMirror();updateSyncIndicator();
  if(autoSync&&state.settings.autoSync&&configured&&!['pending','conflict','cloud-newer','verification-needed','error'].includes(state.meta.syncStatus)){
    clearTimeout(autoSyncTimer);autoSyncTimer=setTimeout(()=>pushCloud(false,true),5000);
  }
};

function syncStatusLabel(){const status=state?.meta?.syncStatus||'local';return ({synced:'Synced',dirty:'Waiting to sync',pending:'Syncing',conflict:'Conflict','cloud-newer':'Cloud newer','verification-needed':'Verify first',error:'Sync error',local:'Phone only'})[status]||status;}
window.syncStatusLabel=syncStatusLabel;

saveSyncSettings=function(silent=false){
  const url=(document.getElementById('syncUrlInput')?.value??state.settings.syncUrl??'').trim();const key=(document.getElementById('syncKeyInput')?.value??state.settings.syncKey??'').trim();
  if(url&&!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec(?:\?.*)?$/.test(url)){if(!silent)showToast('Use the deployed Apps Script /exec URL');return false;}
  const clean=url.replace(/\?.*$/,'');const changed=clean!==state.settings.syncUrl||key!==state.settings.syncKey;
  state.settings.syncUrl=clean;state.settings.syncKey=key;state.settings.autoSync=Boolean(document.getElementById('autoSyncInput')?.checked??state.settings.autoSync);
  if(changed){state.meta.lastCloudRevision=0;state.meta.lastCloudRevisionSeen=0;state.meta.lastCloudStateHash='';state.meta.lastSyncedStateHash='';state.meta.syncStatus=clean&&key?'verification-needed':'local';syncShadowState=null;LiftCutSafety.clearSyncShadow().catch(()=>{});}
  saveState({touch:false,autoSync:false});if(!silent){render();showToast('Sync settings saved');}return true;
};

openSyncPanel=function(){
  const linked=state.settings.syncUrl&&state.settings.syncKey,base=toNum(state.meta.lastCloudRevision),seen=toNum(state.meta.lastCloudRevisionSeen),status=state.meta.syncStatus||'local';
  showModal(`<div class="card-title"><span>Cloud sync</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <div class="notice ${['conflict','cloud-newer','verification-needed','error'].includes(status)?'warn':''}"><strong>${esc(syncStatusLabel())}</strong><br>${linked?'The phone remains the working copy. Cloud changes are merged by record and deletions are retained safely.':'No cloud connection is configured; data is phone-only.'}</div>
    <div class="stack" style="margin-top:10px"><div class="metric-line"><span>Phone revision</span><strong>${toNum(state.meta.revision)}</strong></div><div class="metric-line"><span>Cloud base revision</span><strong>${base}</strong></div><div class="metric-line"><span>Latest cloud revision seen</span><strong>${seen}</strong></div><div class="metric-line"><span>Last successful sync</span><strong>${esc(state.meta.lastCloudSyncAt||'Never')}</strong></div>
    ${state.meta.lastSyncError?`<div class="notice danger">${esc(state.meta.lastSyncError)}</div>`:''}
    ${linked?`<button onclick="testSync()">Test connection</button><button class="secondary" onclick="pushCloud()">Push to Sheets</button><button class="ghost" onclick="pullCloud(false)">Pull & merge</button><button class="danger" onclick="pushCloud(true)">Replace cloud copy…</button>`:''}<button class="ghost" onclick="closeModal();setPage('settings');setTimeout(()=>document.getElementById('syncSettingsCard')?.scrollIntoView({behavior:'smooth'}),100)">Open settings</button></div>`);
};

updateSyncIndicator=function(status=''){
  const dot=document.getElementById('syncDot');if(!dot)return;const effective=status||state?.meta?.syncStatus||'local';dot.className='status-dot ';
  if(effective==='pending')dot.classList.add('pending');else if(effective==='error')dot.classList.add('error');else if(['conflict','cloud-newer','verification-needed'].includes(effective))dot.classList.add('conflict');else if(effective==='dirty')dot.classList.add('dirty');else if(effective==='synced')dot.classList.add('synced');else dot.classList.add('local');
  const button=document.getElementById('syncStatusButton');if(button)button.title=`Cloud sync: ${syncStatusLabel()}`;
};

cloudStatus=async function({silent=false}={}){
  if(!state.settings.syncUrl||!state.settings.syncKey)throw new Error('Configure the sync URL and key first');if(!isOnline())throw new Error('The phone is offline');
  const result=await jsonpRequest({action:'status',key:state.settings.syncKey,clientId:state.meta.clientId});if(!result?.ok)throw new Error(result?.error||'Connection rejected');
  const seen=toNum(result.revision),base=toNum(state.meta.lastCloudRevision);state.meta.lastCloudRevisionSeen=seen;state.meta.lastCloudUpdatedAtSeen=String(result.updatedAt||'');state.meta.lastCloudStateHash=String(result.stateHash||'');
  if(seen>base)state.meta.syncStatus=state.meta.syncStatus==='dirty'?'conflict':'cloud-newer';else if(seen<base)state.meta.syncStatus='conflict';else if(!['dirty','verification-needed'].includes(state.meta.syncStatus))state.meta.syncStatus='synced';
  state.meta.lastSyncError='';saveState({touch:false,autoSync:false});if(!silent)showToast(`Cloud revision ${seen}`);return result;
};

testSync=async function(){
  try{if(!saveSyncSettings(true))return;state.meta.syncStatus='pending';updateSyncIndicator();const result=await cloudStatus({silent:true});
    if(toNum(result.revision)===0&&toNum(state.meta.lastCloudRevision)===0){state.meta.syncStatus='synced';syncShadowState=v251Clone(cloudSafeState());await LiftCutSafety.putSyncShadow(syncShadowState,0,String(result.stateHash||''));}
    saveState({touch:false,autoSync:false});closeModal();render();showToast(`Connection works · cloud revision ${toNum(result.revision)}`);
  }catch(error){console.error(error);state.meta.syncStatus='error';state.meta.lastSyncError=String(error.message||error);saveState({touch:false,autoSync:false});showToast(error.message||'Sync test failed',4500);}
};

cloudSafeState=function(){
  const copy=v251Clone(state);copy.settings.syncUrl='';copy.settings.syncKey='';copy.settings.autoSync=false;copy.progressPhotos=(copy.progressPhotos||[]).map(x=>({...x,localOnly:true}));
  copy.meta.clientId='';copy.meta.syncStatus='synced';copy.meta.lastSyncError='';copy.meta.lastCloudUpdatedAtSeen='';return copy;
};

function v251RecordEqual(a,b){return v251Stable(a??null)===v251Stable(b??null);}
function v251RecordTime(row){return String(row?.updatedAt||row?.deletedAt||'');}
function mergeTombstones(...lists){return normaliseDeletedRecords(lists.flatMap(x=>Array.isArray(x)?x:[]));}
function v251Map(rows){return new Map((rows||[]).filter(r=>r?.id).map(r=>[String(r.id),r]));}
function mergeCollectionThreeWay(localRows,remoteRows,baseRows,collection,report){
  const lm=v251Map(localRows),rm=v251Map(remoteRows),bm=v251Map(baseRows),ids=new Set([...lm.keys(),...rm.keys(),...bm.keys()]),out=[];
  for(const id of ids){const l=lm.get(id),r=rm.get(id),b=bm.get(id),lc=!v251RecordEqual(l,b),rc=!v251RecordEqual(r,b);let chosen;
    if(lc&&!rc)chosen=l;else if(rc&&!lc)chosen=r;else if(!lc&&!rc)chosen=l??r;else if(v251RecordEqual(l,r))chosen=l;else{chosen=v251RecordTime(r)>v251RecordTime(l)?r:l;report.conflicts.push({collection,id,winner:chosen===r?'cloud':'phone'});}if(chosen)out.push(v251Clone(chosen));
  }return out;
}
function mergeSettingsThreeWay(local,remote,base,report){
  const out={...(local||{})},keys=new Set([...Object.keys(local||{}),...Object.keys(remote||{}),...Object.keys(base||{})]);
  for(const key of keys){if(LC_V251.DEVICE_LOCAL_SETTINGS.has(key))continue;const l=local?.[key],r=remote?.[key],b=base?.[key],lc=!v251RecordEqual(l,b),rc=!v251RecordEqual(r,b);if(!lc&&rc)out[key]=v251Clone(r);else if(lc&&rc&&!v251RecordEqual(l,r))report.settingConflicts.push(key);}
  return out;
}
function mergeStatesDetailed(local,remote,base=null){
  const l=migrateState(local),r=migrateState(remote),b=base?migrateState(base):migrateState({});const report={conflicts:[],settingConflicts:[],collections:{}};const merged=v251Clone(l);
  merged.settings=mergeSettingsThreeWay(l.settings,r.settings,b.settings,report);const localConnection={syncUrl:l.settings.syncUrl,syncKey:l.settings.syncKey,autoSync:l.settings.autoSync,theme:l.settings.theme,trainView:l.settings.trainView,dietView:l.settings.dietView,rflLastView:l.settings.rflLastView};Object.assign(merged.settings,localConnection);
  for(const key of LC_V251.SYNC_COLLECTIONS){merged[key]=mergeCollectionThreeWay(l[key],r[key],b[key],key,report);report.collections[key]=merged[key].length;}
  merged.deletedRecords=mergeTombstones(l.deletedRecords,r.deletedRecords,b.deletedRecords);applyDeletedRecords(merged);
  merged.meta={...l.meta,appVersion:APP_VERSION,lastModifiedAt:[l.meta.lastModifiedAt,r.meta.lastModifiedAt].sort().pop(),clientId:l.meta.clientId};
  return {state:migrateState(merged),report};
}
window.mergeStatesDetailed=mergeStatesDetailed;
mergeCloudState=function(local,remote){return mergeStatesDetailed(local,remote,syncShadowState).state;};

async function v251Push(force=false,silent=false){
  if(!state.settings.syncUrl||!state.settings.syncKey){if(!silent)setPage('settings');showToast('Configure Google Sheets sync first');return false;}
  if(!isOnline()){if(!silent)showToast('The phone is offline');return false;}
  try{state.meta.syncStatus='pending';updateSyncIndicator();const statusBefore=await cloudStatus({silent:true});const cloudRevision=toNum(statusBefore.revision),base=toNum(state.meta.lastCloudRevision);
    if(!force&&cloudRevision!==base){state.meta.syncStatus='conflict';state.meta.lastSyncError=`Cloud revision ${cloudRevision} differs from the last merged revision ${base}.`;saveState({touch:false,autoSync:false});if(!silent)showModal(`<div class="card-title"><span>Cloud conflict</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="notice warn">The spreadsheet changed after this phone's last merge. Pull and merge before pushing.</div><div class="button-row" style="margin-top:10px"><button onclick="closeModal();pullCloud(false)">Pull & merge</button><button class="danger" onclick="openForcePushConfirmation()">Replace cloud copy…</button></div>`);return false;}
    if(!force&&!syncShadowState&&cloudRevision>0){state.meta.syncStatus='verification-needed';state.meta.lastSyncError='This installation has no verified sync base. Pull and merge once before pushing.';saveState({touch:false,autoSync:false});if(!silent)showToast('Pull & merge once before the first protected push',5000);return false;}
    const requestId=uid('request'),safe=cloudSafeState(),payload=JSON.stringify(safe),payloadHash=await LiftCutSafety.sha256Text(payload);
    await submitCloudForm({action:'push',key:state.settings.syncKey,payload,payloadHash,requestId,clientId:state.meta.clientId,baseRevision:base,force:force?'true':'false'});
    const confirmed=await waitForSyncRequest(requestId);if(confirmed.lastStatus==='conflict')throw new Error(`Cloud conflict at revision ${toNum(confirmed.revision)}`);if(!['success','success_warning'].includes(confirmed.lastStatus))throw new Error(confirmed.lastError||'Cloud rejected the push');
    const revision=toNum(confirmed.revision);state.meta.lastCloudRevision=revision;state.meta.lastCloudRevisionSeen=revision;state.meta.lastCloudSyncAt=nowISO();state.meta.lastCloudStateHash=String(confirmed.stateHash||'');state.meta.lastSyncedStateHash=String(confirmed.stateHash||payloadHash);state.meta.syncStatus='synced';state.meta.lastSyncError=String(confirmed.lastWarning||'');
    syncShadowState=v251Clone(safe);await LiftCutSafety.putSyncShadow(syncShadowState,revision,state.meta.lastSyncedStateHash);saveState({touch:false,autoSync:false});if(!silent){closeModal();showToast(confirmed.lastStatus==='success_warning'?'Cloud state saved; spreadsheet-table refresh reported a warning':'Phone data pushed safely to Google Sheets',5000);}return true;
  }catch(error){console.error(error);state.meta.syncStatus='error';state.meta.lastSyncError=String(error.message||error);saveState({touch:false,autoSync:false});if(!silent)showToast(error.message||'Push failed',5000);return false;}
}
pushCloud=function(force=false,silent=false){if(force&&!silent){openForcePushConfirmation();return Promise.resolve(false);}return v251Push(Boolean(force),Boolean(silent));};
function openForcePushConfirmation(){showModal(`<div class="card-title"><span>Replace cloud copy?</span><button class="ghost compact" onclick="closeModal()">Cancel</button></div><div class="notice danger">This bypasses revision protection and replaces the current cloud state. A previous verified cloud snapshot is retained by Apps Script.</div><label>Type REPLACE CLOUD<input id="forceCloudPhrase"></label><button class="danger" onclick="confirmForceCloudPush()">Replace cloud copy</button>`);}
async function confirmForceCloudPush(){if((document.getElementById('forceCloudPhrase')?.value||'').trim().toUpperCase()!=='REPLACE CLOUD')return showToast('Type REPLACE CLOUD exactly');closeModal();await v251Push(true,false);}
window.openForcePushConfirmation=openForcePushConfirmation;window.confirmForceCloudPush=confirmForceCloudPush;

async function v251ApplyCloud(remote,revision,stateHash,mode){
  await createSafetySnapshot(`Before cloud ${mode}`,'cloud-restore');const connection={syncUrl:state.settings.syncUrl,syncKey:state.settings.syncKey,autoSync:state.settings.autoSync,theme:state.settings.theme};const clientId=state.meta.clientId;
  if(mode==='replace')state=migrateState(remote);else{const result=mergeStatesDetailed(state,remote,syncShadowState);state=result.state;lastMergeReport=result.report;}
  Object.assign(state.settings,connection);state.meta.clientId=clientId;state.meta.lastCloudRevision=revision;state.meta.lastCloudRevisionSeen=revision;state.meta.lastCloudStateHash=stateHash;state.meta.lastCloudSyncAt=nowISO();state.meta.syncStatus=mode==='replace'?'synced':'dirty';state.meta.lastSyncError='';
  syncShadowState=migrateState(remote);await LiftCutSafety.putSyncShadow(syncShadowState,revision,stateHash);saveState({touch:false,autoSync:false});closeModal();render();showToast(mode==='replace'?'Cloud copy restored; rollback snapshot retained':'Cloud data merged; review then push the combined copy',5500);
}
pullCloud=async function(replace=false){
  if(!state.settings.syncUrl||!state.settings.syncKey){setPage('settings');return showToast('Configure Google Sheets sync first');}
  try{state.meta.syncStatus='pending';updateSyncIndicator();const result=await jsonpRequest({action:'pull',key:state.settings.syncKey,clientId:state.meta.clientId});if(!result?.ok||!result.state)throw new Error(result?.error||'No cloud state available');
    // Verify the exact cloud payload before changing it. Older Lift & Cut states can legitimately
    // predate newer array collections (for example nutritionDays), so migration must run BEFORE
    // structural validation. This preserves checksum protection while allowing safe legacy sync.
    const raw=JSON.stringify(result.state),hash=await LiftCutSafety.sha256Text(raw);if(result.stateHash&&hash!==result.stateHash)throw new Error('Cloud state checksum did not match. No phone data was changed.');
    const migratedRemote=migrateState(result.state);
    const audit=LiftCutSafety.validateState(migratedRemote,{maxSchema:LC_V251.SCHEMA});if(!audit.ok)throw new Error(`Cloud state failed validation after migration: ${audit.errors[0]}`);
    const revision=toNum(result.revision),stateHash=String(result.stateHash||hash);if(replace){pendingCloudState={state:migratedRemote,revision,stateHash,audit};const current=LiftCutSafety.stateSummary(state),cloud=LiftCutSafety.stateSummary(migratedRemote);showModal(`<div class="card-title"><span>Review cloud replacement</span><button class="ghost compact" onclick="cancelCloudReplacement()">Cancel</button></div><div class="compare-grid"><div><strong>Phone now</strong><div class="small">${esc(backupSummaryLine(current))}</div></div><div><strong>Cloud copy</strong><div class="small">${esc(backupSummaryLine(cloud))}</div></div></div><div class="notice danger">This replaces the phone database. A rollback snapshot is created first.</div><label>Type RESTORE CLOUD<input id="cloudReplacePhrase"></label><button class="danger" onclick="confirmCloudReplacement()">Replace phone copy</button>`);return;}
    await v251ApplyCloud(migratedRemote,revision,stateHash,'merge');
  }catch(error){console.error(error);state.meta.syncStatus='error';state.meta.lastSyncError=String(error.message||error);saveState({touch:false,autoSync:false});showToast(error.message||'Pull failed',5000);}
};
function cancelCloudReplacement(){pendingCloudState=null;closeModal();state.meta.syncStatus='dirty';saveState({touch:false,autoSync:false});}
async function confirmCloudReplacement(){if((document.getElementById('cloudReplacePhrase')?.value||'').trim().toUpperCase()!=='RESTORE CLOUD')return showToast('Type RESTORE CLOUD exactly');const pending=pendingCloudState;if(!pending)return showToast('Cloud preview expired');pendingCloudState=null;await v251ApplyCloud(pending.state,pending.revision,pending.stateHash,'replace');}
window.cancelCloudReplacement=cancelCloudReplacement;window.confirmCloudReplacement=confirmCloudReplacement;

function backupSafeState(){const copy=v251Clone(state);copy.settings.syncUrl='';copy.settings.syncKey='';copy.settings.autoSync=false;copy.meta.clientId='';return copy;}
async function clearAllPhotoBlobs(){try{const photos=await getAllPhotos();for(const p of photos)await deletePhotoBlob(p.id);}catch(error){console.warn(error);}}
exportFullBackup=async function(){
  try{showToast('Preparing verified backup…',6000);const photos=await getAllPhotos().catch(()=>[]),photoRows=[];for(const item of photos)photoRows.push({id:item.id,createdAt:item.createdAt,dataUrl:await blobToDataURL(item.blob)});const safeState=backupSafeState(),stateSha256=await LiftCutSafety.sha256Text(LiftCutSafety.stableStringify(safeState));const payload={format:'lift-cut-full-backup',formatVersion:2,appVersion:APP_VERSION,schemaVersion:state.schemaVersion,exportedAt:nowISO(),connectionExcluded:true,manifest:{summary:LiftCutSafety.stateSummary(safeState),photoCount:photoRows.length,hasWorkoutDraft:Boolean(workoutDraft),cookingRecipeCount:Object.keys(cookingProgress||{}).length},integrity:{algorithm:'SHA-256',stateSha256},state:safeState,draft:workoutDraft?v251Clone(workoutDraft):null,cookingProgress:v251Clone(cookingProgress||{}),photos:photoRows};downloadBlob(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),`lift-cut-full-backup-v${APP_VERSION}-${localDateISO()}.json`);state.meta.lastBackupAt=nowISO();saveState({touch:false,autoSync:false});showToast('Verified backup exported; sync key excluded');}catch(error){console.error(error);showToast(`Backup export failed: ${error.message||error}`,5000);}
};
function backupSummaryLine(summary){const c=summary.counts||{};return `${toNum(c.workoutSessions)} workouts · ${toNum(c.recipes)} recipes · ${toNum(c.foodLog)} food entries · ${toNum(c.bodyMetrics)} measurements · ${toNum(c.rflDailyLogs)} RFL logs`;}
window.backupSummaryLine=backupSummaryLine;
importBackup=async function(event){
  const file=event.target.files?.[0];if(!file)return;try{const parsed=JSON.parse(await file.text()),payload=parsed.snapshot&&typeof parsed.snapshot==='object'?parsed.snapshot:parsed,incoming=payload.state||parsed.state||parsed;if(!incoming||typeof incoming!=='object'||Array.isArray(incoming))throw new Error('Backup does not contain a valid state object');const audit=LiftCutSafety.validateState(incoming,{maxSchema:LC_V251.SCHEMA});if(!audit.ok)throw new Error(audit.errors[0]||'Backup failed integrity checks');let hashStatus='No checksum (legacy backup)';if(parsed.integrity?.stateSha256){const calculated=await LiftCutSafety.sha256Text(LiftCutSafety.stableStringify(incoming));if(calculated!==parsed.integrity.stateSha256)throw new Error('Backup checksum does not match. The file may be incomplete or altered.');hashStatus='Checksum verified';}pendingBackupImport={parsed,payload,incoming,audit,fileName:file.name,hashStatus};const current=LiftCutSafety.stateSummary(state),backup=LiftCutSafety.stateSummary(incoming);showModal(`<div class="card-title"><span>Review backup</span><button class="ghost compact" onclick="cancelBackupImport()">Cancel</button></div><div class="notice good"><strong>${esc(hashStatus)}</strong><br>${esc(file.name)}</div><div class="metric-line"><span>Exported</span><strong>${esc(parsed.exportedAt||'Not recorded')}</strong></div><div class="metric-line"><span>App / schema</span><strong>${esc(parsed.appVersion||backup.appVersion||'Legacy')} / ${backup.schemaVersion}</strong></div><div class="metric-line"><span>Photos</span><strong>${Array.isArray(payload.photos)?payload.photos.length:0}</strong></div><div class="compare-grid"><div><strong>Phone now</strong><div class="small">${esc(backupSummaryLine(current))}</div></div><div><strong>Selected backup</strong><div class="small">${esc(backupSummaryLine(backup))}</div></div></div>${audit.warnings.length?`<details><summary>${audit.warnings.length} warnings</summary><div class="small muted">${audit.warnings.slice(0,20).map(esc).join('<br>')}</div></details>`:''}<div class="notice">The current Google Sheets URL, private key and this phone's client ID are always preserved.</div><div class="button-row"><button onclick="applyBackupImport('merge')">Merge backup safely</button><button class="danger" onclick="openBackupReplaceConfirmation()">Replace phone copy…</button></div>`);}catch(error){console.error(error);showToast(`Import blocked: ${error.message||'invalid backup'}`,6000);}event.target.value='';
};
function cancelBackupImport(){pendingBackupImport=null;closeModal();}
function openBackupReplaceConfirmation(){if(!pendingBackupImport)return;showModal(`<div class="card-title"><span>Replace phone data?</span><button class="ghost compact" onclick="cancelBackupImport()">Cancel</button></div><div class="notice danger">The phone database and progress photos will be replaced. An automatic rollback snapshot is created first.</div><label>Type RESTORE BACKUP<input id="backupReplacePhrase"></label><button class="danger" onclick="confirmBackupReplacement()">Replace phone copy</button>`);}
function confirmBackupReplacement(){if((document.getElementById('backupReplacePhrase')?.value||'').trim().toUpperCase()!=='RESTORE BACKUP')return showToast('Type RESTORE BACKUP exactly');applyBackupImport('replace');}
async function applyBackupImport(mode='merge'){
  const pending=pendingBackupImport;if(!pending)return showToast('Backup preview expired; select the file again');const payload=pending.payload||pending.parsed;try{await createSafetySnapshot(`Before ${mode} backup restore`,'backup-restore');const connection={syncUrl:state.settings.syncUrl,syncKey:state.settings.syncKey,autoSync:state.settings.autoSync,theme:state.settings.theme},clientId=state.meta.clientId;if(mode==='replace')state=migrateState(pending.incoming);else{const merged=mergeStatesDetailed(state,pending.incoming,null);state=merged.state;lastMergeReport=merged.report;}Object.assign(state.settings,connection);state.meta.clientId=clientId;state.meta.syncStatus=connection.syncUrl&&connection.syncKey?'dirty':'local';state.meta.lastSyncError='';saveState({touch:false,autoSync:false});if(mode==='replace'){await clearAllPhotoBlobs();workoutDraft=payload.draft?migrateWorkoutDraft(payload.draft):null;cookingProgress=(payload.cookingProgress||payload.cooking)&&typeof(payload.cookingProgress||payload.cooking)==='object'?(payload.cookingProgress||payload.cooking):{};}else{if(!workoutDraft&&payload.draft)workoutDraft=migrateWorkoutDraft(payload.draft);cookingProgress={...(payload.cookingProgress||payload.cooking||{}),...(cookingProgress||{})};}saveDraft();saveCookingProgress();if(Array.isArray(payload.photos))for(const photo of payload.photos)if(photo.id&&photo.dataUrl)await putPhoto({id:photo.id,blob:dataURLToBlob(photo.dataUrl),createdAt:photo.createdAt||nowISO()});pendingBackupImport=null;closeModal();render();showToast(mode==='replace'?'Backup restored; rollback snapshot retained':'Backup merged; review and sync when ready',5500);}catch(error){console.error(error);showToast(`Restore failed: ${error.message||error}`,6000);}
}
Object.assign(window,{cancelBackupImport,openBackupReplaceConfirmation,confirmBackupReplacement,applyBackupImport});

async function createManualSafetySnapshot(){const snapshot=await createSafetySnapshot('Manual safety snapshot','manual');showToast(snapshot?'Safety snapshot created':'Could not create snapshot');if(snapshot)openDataSafetyCenter();}
async function openDataSafetyCenter(){
  showModal(`<div class="card-title"><span>Data safety</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="empty">Checking local copies…</div>`);const audit=LiftCutSafety.validateState(state,{maxSchema:LC_V251.SCHEMA});let snapshots=[],mirror=null,persisted=false,estimate=null;try{[snapshots,mirror,persisted,estimate]=await Promise.all([LiftCutSafety.listSnapshots(),LiftCutSafety.getMirror(),navigator.storage?.persisted?.()||false,navigator.storage?.estimate?.()||null]);}catch(error){console.warn(error);}const modal=document.getElementById('modal');if(!modal)return;modal.innerHTML=`<div class="card-title"><span>Data safety</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="safety-status-grid"><div class="safety-tile"><span>Primary phone copy</span><strong class="${localSaveError?'danger-text':'good-text'}">${localSaveError?'Save warning':'Healthy'}</strong><small>${esc(state.meta.lastSuccessfulLocalSaveAt||'Not recorded')}</small></div><div class="safety-tile"><span>Redundant mirror</span><strong class="${mirror?'good-text':'warn-text'}">${mirror?'Available':'Unavailable'}</strong><small>${esc(mirror?.savedAt||state.meta.lastMirrorSaveAt||'Not recorded')}</small></div><div class="safety-tile"><span>Integrity audit</span><strong class="${audit.ok?'good-text':'danger-text'}">${audit.score}/100</strong><small>${audit.errors.length} errors · ${audit.warnings.length} warnings</small></div><div class="safety-tile"><span>Persistent storage</span><strong class="${persisted?'good-text':'warn-text'}">${persisted?'Granted':'Best effort'}</strong><small>${estimate?.usage!==undefined?`${formatBytes(estimate.usage)} used`:''}</small></div></div>${audit.errors.length||audit.warnings.length?`<details open><summary>Integrity findings</summary><div class="small muted">${[...audit.errors,...audit.warnings].slice(0,30).map(esc).join('<br>')}</div></details>`:'<div class="notice good">Record IDs, active-program links and core collections passed the integrity scan.</div>'}<div class="button-row"><button onclick="createManualSafetySnapshot()">Create snapshot</button><button class="secondary" onclick="repairAndVerifyState()">Repair & verify</button><button class="ghost" onclick="exportDiagnostics()">Export diagnostics</button></div><hr class="divider"><div class="notice">Rollback snapshots protect app records, the active workout draft and cooking progress. Progress-photo files are included only in a full JSON backup.</div><div class="card-title"><span>Rollback snapshots</span><span class="pill gray">${snapshots.length}</span></div><div class="snapshot-list">${snapshots.length?snapshots.map(row=>`<div class="row snapshot-row"><div><strong>${esc(row.label)}</strong><div class="tiny muted">${esc(row.createdAt)} · ${esc(row.reason)} · ${esc(backupSummaryLine(row.summary||{}))}</div></div><div class="button-row"><button class="ghost compact" onclick="previewSafetySnapshot('${esc(row.id)}')">Review</button><button class="ghost compact" onclick="exportSafetySnapshot('${esc(row.id)}')">Export</button><button class="danger compact" onclick="removeSafetySnapshot('${esc(row.id)}')">Delete</button></div></div>`).join(''):'<div class="empty">No rollback snapshots yet.</div>'}</div>`;
}
function formatBytes(value){const n=Number(value)||0;if(n<1024)return `${n} B`;if(n<1048576)return `${round(n/1024,1)} KB`;return `${round(n/1048576,1)} MB`;}
async function previewSafetySnapshot(id){const snapshot=await LiftCutSafety.getSnapshot(id);if(!snapshot)return showToast('Snapshot not found');const current=LiftCutSafety.stateSummary(state),saved=snapshot.summary||LiftCutSafety.stateSummary(snapshot.state);showModal(`<div class="card-title"><span>Review rollback snapshot</span><button class="ghost compact" onclick="openDataSafetyCenter()">Back</button></div><div class="notice">${esc(snapshot.label)}<br><span class="small">${esc(snapshot.createdAt)} · ${esc(snapshot.reason)}</span></div><div class="compare-grid"><div><strong>Phone now</strong><div class="small">${esc(backupSummaryLine(current))}</div></div><div><strong>Snapshot</strong><div class="small">${esc(backupSummaryLine(saved))}</div></div></div><div class="button-row"><button onclick="restoreSafetySnapshot('${esc(id)}','merge')">Merge snapshot</button><button class="danger" onclick="confirmSafetySnapshotReplace('${esc(id)}')">Replace phone…</button></div>`);}
function confirmSafetySnapshotReplace(id){showModal(`<div class="card-title"><span>Restore rollback snapshot?</span><button class="ghost compact" onclick="openDataSafetyCenter()">Cancel</button></div><div class="notice danger">A new snapshot of the current phone copy will be created first.</div><label>Type RESTORE SNAPSHOT<input id="snapshotRestorePhrase"></label><button class="danger" onclick="restoreSafetySnapshot('${esc(id)}','replace')">Restore snapshot</button>`);}
async function restoreSafetySnapshot(id,mode='merge'){if(mode==='replace'&&(document.getElementById('snapshotRestorePhrase')?.value||'').trim().toUpperCase()!=='RESTORE SNAPSHOT')return showToast('Type RESTORE SNAPSHOT exactly');const snapshot=await LiftCutSafety.getSnapshot(id);if(!snapshot)return showToast('Snapshot not found');await createSafetySnapshot('Before rollback snapshot restore','snapshot-restore');const connection={syncUrl:state.settings.syncUrl,syncKey:state.settings.syncKey,autoSync:state.settings.autoSync,theme:state.settings.theme},clientId=state.meta.clientId;state=mode==='replace'?migrateState(snapshot.state):mergeStatesDetailed(state,snapshot.state,null).state;Object.assign(state.settings,connection);state.meta.clientId=clientId;state.meta.syncStatus=connection.syncUrl&&connection.syncKey?'dirty':'local';saveState({touch:false,autoSync:false});if(mode==='replace'){workoutDraft=snapshot.draft?migrateWorkoutDraft(snapshot.draft):null;cookingProgress=snapshot.cooking||{};saveDraft();saveCookingProgress();}closeModal();render();showToast('Rollback snapshot restored');}
async function exportSafetySnapshot(id){const snapshot=await LiftCutSafety.getSnapshot(id);if(!snapshot)return showToast('Snapshot not found');const safeState=v251Clone(snapshot.state);safeState.settings=safeState.settings||{};safeState.settings.syncUrl='';safeState.settings.syncKey='';safeState.settings.autoSync=false;safeState.meta=safeState.meta||{};safeState.meta.clientId='';const hash=await LiftCutSafety.sha256Text(LiftCutSafety.stableStringify(safeState)),payload={format:'lift-cut-safety-snapshot',formatVersion:1,exportedAt:nowISO(),connectionExcluded:true,snapshot:{...snapshot,state:safeState},integrity:{algorithm:'SHA-256',stateSha256:hash}};downloadBlob(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),`lift-cut-snapshot-${String(snapshot.createdAt).slice(0,10)}.json`);}
async function removeSafetySnapshot(id){if(!confirm('Delete this rollback snapshot?'))return;await LiftCutSafety.deleteSnapshot(id);openDataSafetyCenter();}
async function repairAndVerifyState(){await createSafetySnapshot('Before integrity repair','integrity-repair');state=migrateState(state);const audit=LiftCutSafety.validateState(state,{maxSchema:LC_V251.SCHEMA});saveState({touch:false,autoSync:false});render();showModal(`<div class="card-title"><span>Integrity repair complete</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="notice ${audit.ok?'good':'danger'}">Score ${audit.score}/100 · ${audit.errors.length} errors · ${audit.warnings.length} warnings</div>${[...audit.errors,...audit.warnings].length?`<div class="small muted">${[...audit.errors,...audit.warnings].slice(0,30).map(esc).join('<br>')}</div>`:'<p>No structural issues remain.</p>'}`);}
async function exportDiagnostics(){let estimate=null,persisted=false,mirror=null,snapshots=[];try{[estimate,persisted,mirror,snapshots]=await Promise.all([navigator.storage?.estimate?.()||null,navigator.storage?.persisted?.()||false,LiftCutSafety.getMirror(),LiftCutSafety.listSnapshots()]);}catch{}const diagnostic={format:'lift-cut-diagnostics',generatedAt:nowISO(),appVersion:APP_VERSION,schemaVersion:state.schemaVersion,browser:{userAgent:navigator.userAgent,language:navigator.language,online:isOnline(),standalone:isStandalone()},storage:{persisted,usage:estimate?.usage||null,quota:estimate?.quota||null,primarySaveError:localSaveError||'',mirrorSavedAt:mirror?.savedAt||'',snapshotCount:snapshots.length},sync:{configured:Boolean(state.settings.syncUrl&&state.settings.syncKey),status:state.meta.syncStatus,localRevision:state.meta.revision,cloudBaseRevision:state.meta.lastCloudRevision,cloudRevisionSeen:state.meta.lastCloudRevisionSeen,lastCloudSyncAt:state.meta.lastCloudSyncAt,lastError:state.meta.lastSyncError||''},migration:state.meta.migrationReport||null,summary:LiftCutSafety.stateSummary(state),audit:LiftCutSafety.validateState(state,{maxSchema:LC_V251.SCHEMA})};downloadBlob(new Blob([JSON.stringify(diagnostic,null,2)],{type:'application/json'}),`lift-cut-diagnostics-${localDateISO()}.json`);showToast('Diagnostics exported without private keys or record contents');}
Object.assign(window,{createManualSafetySnapshot,openDataSafetyCenter,formatBytes,previewSafetySnapshot,confirmSafetySnapshotReplace,restoreSafetySnapshot,exportSafetySnapshot,removeSafetySnapshot,repairAndVerifyState,exportDiagnostics});

const v251RestoreSeedLibraries=restoreSeedLibraries;
restoreSeedLibraries=async function(){if(!confirm('Restore seeded programs, exercises, alternatives, ingredients, and example recipes? Your logs and measurements remain.'))return;await createSafetySnapshot('Before restoring seed libraries','seed-restore');['programs','exercises','alternatives','ingredientCache','recipes'].forEach(key=>state[key]=v251Clone(DEFAULT_STATE[key]));state.settings.activeProgram='UL4';state.settings.lastSession='UL4|lower-a';saveState();render();showToast('Seed libraries restored; rollback snapshot retained');};
factoryReset=async function(){if(!confirm('Delete all local workouts, food, recipes, metrics, phases, photos, and settings on this phone? A rollback snapshot of app records will be retained.'))return;await createSafetySnapshot('Before factory reset','factory-reset');await clearAllPhotoBlobs();localStorage.removeItem(STORAGE_KEY);localStorage.removeItem(DRAFT_KEY);localStorage.removeItem(COOKING_KEY);await LiftCutSafety.clearSyncShadow().catch(()=>{});syncShadowState=null;state=migrateState(v251Clone(DEFAULT_STATE));workoutDraft=null;cookingProgress={};saveDraft();saveCookingProgress();saveState({touch:false,autoSync:false});render();showToast('Phone data reset; rollback snapshot retained');};

const v251OriginalBoot=boot;
boot=async function(){
  state=await loadState();try{const shadow=await LiftCutSafety.getSyncShadow();syncShadowState=shadow?.state?migrateState(shadow.state):null;}catch(error){console.warn(error);}if(state.settings.syncUrl&&state.settings.syncKey&&toNum(state.meta.lastCloudRevision)>0&&!syncShadowState)state.meta.syncStatus='verification-needed';ensureCoachingState();if(typeof rflEnsureState==='function')rflEnsureState(state);upgradeStoredRecipeConversions();workoutDraft=loadDraft();const query=new URLSearchParams(location.search),requested=query.get('page');page=requested||localStorage.getItem(PAGE_KEY)||'dashboard';if(query.get('rfl')==='1'){state.settings.dietView='rfl';page='diet';localStorage.setItem(PAGE_KEY,page);}if(!['dashboard','program','train','diet','progress','settings'].includes(page))page='dashboard';applyTheme();render();registerServiceWorker();openPhotoDb().catch(()=>{});
  window.addEventListener('online',()=>{updateSyncIndicator();if(state.settings.autoSync)cloudStatus({silent:true}).then(()=>render()).catch(error=>{state.meta.syncStatus='error';state.meta.lastSyncError=String(error.message||error);saveState({touch:false,autoSync:false});});});window.addEventListener('offline',()=>{state.meta.syncStatus=state.settings.syncUrl&&state.settings.syncKey?'dirty':'local';updateSyncIndicator();});setTimeout(refreshStorageStatus,250);setTimeout(handleSharedRecipeTarget,350);if(bootNotice)setTimeout(()=>showToast(bootNotice,6500),500);clearInterval(workoutClockInterval);workoutClockInterval=setInterval(()=>{refreshWorkoutClock();updateDraftSaveStatus();},1000);if(state.settings.syncUrl&&state.settings.syncKey)cloudStatus({silent:true}).then(()=>{render();updateSyncIndicator();}).catch(error=>{state.meta.syncStatus='error';state.meta.lastSyncError=String(error.message||error);saveState({touch:false,autoSync:false});updateSyncIndicator('error');});
};

boot();
