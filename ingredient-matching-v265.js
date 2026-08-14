'use strict';

/* Lift & Cut 2.6.5 — ingredient matching reliability.
 * This patch makes recipe matching local-first, live-updating and explicit.
 * It does not change the user-data schema or require an Apps Script update.
 */

const LC_IM265 = Object.freeze({
  VERSION: '2.6.5',
  INPUT_DELAY_MS: 180,
  MAX_LIVE_LOOKUPS: 10
});

let lcIM265SearchTimer = 0;
let lcIM265MatchBusy = false;
let lcIM265LastSummary = null;

const LC_IM265_PREP_WORDS = new Set([
  'fresh','freshly','finely','roughly','coarsely','thinly','thickly',
  'peeled','deveined','shelled','trimmed','washed','rinsed','drained','thawed',
  'chopped','diced','sliced','minced','grated','shredded','crushed','cracked',
  'halved','quartered','cubed','julienned','spiralized','spiralised','zested',
  'seeded','deseeded','cored','softened','melted','divided','optional',
  'small','medium','large','jumbo','giant','sized','size','approximately','about',
  'heaped','level','packed','prepared','ready'
]);
const LC_IM265_EDGE_FILLERS = new Set(['and','or','with','without','of','for','as','to','in','into','the','a','an']);

function lcIM265Decode(value){
  return String(value||'')
    .replace(/&amp;/gi,' and ')
    .replace(/\u00a0/g,' ')
    .replace(/[“”]/g,'"')
    .replace(/[’]/g,"'")
    .replace(/[–—]/g,'-')
    .replace(/\s+/g,' ')
    .trim();
}

function lcIM265StripBalancedNotes(text){
  let out=text, previous='';
  while(previous!==out){
    previous=out;
    out=out.replace(/\([^()]*\)|\[[^\[\]]*\]|\{[^{}]*\}/g,' ');
  }
  return out.replace(/[\(\[\{][^\)\]\}]*$/g,' ');
}

function lcIM265CleanFoodName(value){
  let text=lcIM265StripBalancedNotes(lcIM265Decode(value));
  if(!text)return '';

  // Remove clearly non-food claims and preparation phrases, while retaining
  // nutritionally meaningful states such as raw, cooked, low-fat and reduced sodium.
  text=text
    .replace(/\b(?:wheat|gluten)[-\s]?free\b/gi,' ')
    .replace(/\b(?:medium|small|large|jumbo|giant)[-\s]?sized\b/gi,' ')
    .replace(/\b(?:very\s+)?(?:finely|roughly|coarsely|thinly|thickly)\s+(?:chopped|diced|sliced|minced|grated|shredded|crushed|julienned)\b/gi,' ')
    .replace(/\bfreshly\s+(?:cracked|ground|grated|squeezed|chopped|minced)\b/gi,' ')
    .replace(/\b(?:cut|slice|sliced|chop|chopped|dice|diced|mince|minced|grate|grated|shred|shredded|crush|crushed|tear|torn)\s+(?:into|in)\b.*$/i,' ')
    .replace(/(?:,|;)\s*(?:cut|sliced?|chopped|diced|minced|grated|shredded|crushed|peeled|deveined|seeded|deseeded|cored|trimmed|washed|rinsed|drained|thawed|softened|melted|halved|quartered|cubed|julienned|spirali[sz]ed|zested|divided|optional|to\s+taste|for\s+garnish(?:ing)?|to\s+serve)\b.*$/i,' ')
    .replace(/\b(?:for\s+garnish(?:ing)?|for\s+serving|to\s+serve|to\s+taste|as\s+needed)\b.*$/i,' ')
    .replace(/[,:;!?]+/g,' ')
    .replace(/\s+/g,' ')
    .trim();

  const tokens=text.split(/\s+/).filter(Boolean);
  const kept=[];
  for(let i=0;i<tokens.length;i++){
    let raw=tokens[i];
    const token=raw.toLowerCase().replace(/^[^a-z0-9%]+|[^a-z0-9%]+$/g,'');
    if(!token)continue;
    if(LC_IM265_PREP_WORDS.has(token))continue;
    // Remove dangling hyphen pieces left by terms such as "wheat-free".
    if((token==='wheat'||token==='gluten')&&String(tokens[i+1]||'').toLowerCase().replace(/[^a-z]/g,'')==='free'){i++;continue;}
    kept.push(raw.replace(/^[\s/|,-]+|[\s/|,-]+$/g,''));
  }

  while(kept.length&&LC_IM265_EDGE_FILLERS.has(kept[0].toLowerCase()))kept.shift();
  while(kept.length&&LC_IM265_EDGE_FILLERS.has(kept[kept.length-1].toLowerCase()))kept.pop();

  // Remove connectors stranded by discarded preparation words: "peeled and grated
  // fresh ginger" should become "ginger", not "and fresh ginger".
  let result=kept.join(' ').replace(/\s+/g,' ').trim();
  result=result.replace(/^(?:and|or|with|as)\s+/i,'').replace(/\s+(?:and|or|with|as)$/i,'').trim();
  return result;
}

// Normalise attached vulgar fractions before the existing parser runs. Cookbook
// text often uses `1½ teaspoons` rather than `1 ½ teaspoons`; the old parser read
// `teaspoons` as part of the food name and lost the real unit.
if(typeof parseIngredientLine==='function'){
  const lcIM265OriginalParseIngredientLine=parseIngredientLine;
  parseIngredientLine=function(line){
    const original=String(line||'');
    const normalised=original.replace(/(\d)([¼½¾⅓⅔⅛⅜⅝⅞])/g,'$1 $2');
    const parsed=lcIM265OriginalParseIngredientLine(normalised);
    parsed.sourceLine=lcIM265Decode(original);
    return parsed;
  };
}

// Replace the old cleaner globally. Existing import, bulk-review and match functions
// resolve this global binding at call time, so all workflows receive the fix.
cleanIngredientSearchText = lcIM265CleanFoodName;

ingredientMatchQuery = function(ing){
  const chosen=ing?.selectedAlternative||ing?.name||ing?.sourceLine||'';
  const parsed=(typeof parseIngredientLine==='function'&&ing?.sourceLine&&!ing?.name)
    ? parseIngredientLine(ing.sourceLine)
    : null;
  return lcIM265CleanFoodName(parsed?.name||chosen);
};

// Extend USDA query aliases for generic cookbook language that does not appear
// verbatim in FoodData Central descriptions.
if(typeof lcUsda262Query==='function'){
  const lcIM265OriginalUsdaQuery=lcUsda262Query;
  lcUsda262Query=function(value){
    let q=lcIM265OriginalUsdaQuery(lcIM265CleanFoodName(value));
    q=q.replace(/\b(?:red pepper flakes?|crushed red pepper|chilli flakes?|chili flakes?)\b/g,'pepper red cayenne');
    if(/\btamari(?: sauce)?\b/.test(q)&&!/\bsoy sauce\b/.test(q))q=q.replace(/\btamari(?: sauce)?\b/g,'soy sauce tamari');
    q=q
      .replace(/\bfresh ginger(?: root)?\b/g,'ginger root')
      .replace(/\bginger root fresh\b/g,'ginger root');
    return q.replace(/\s+/g,' ').trim();
  };
}

// Keep exact, state-specific and percentage-specific queries ahead of stripped
// descriptor fallbacks. For example, 95% lean ground beef must not rank an 80%
// record above the exact 95% USDA entry.
if(typeof lcUsda263QueryVariants==='function'&&typeof lcUsda264VariantTokens==='function'){
  lcUsda264StageVariants=function(query){
    const variants=lcUsda263QueryVariants(query);if(!variants.length)return [];
    const full=variants.filter(v=>v.mode==='full').map(v=>({...v,stagePenalty:0}));
    const cleaned=(variants.find(v=>v.mode==='descriptors removed')||variants[0]);
    const core=lcUsda264VariantTokens(cleaned),head=core[core.length-1]||'';
    const stripped=variants.filter(v=>v.mode==='descriptors removed').map(v=>({...v,stagePenalty:Number(v.penalty||0)}));
    const headPhrases=variants.filter(v=>v.mode==='broader phrase'&&lcUsda264VariantTokens(v).includes(head)).map(v=>({...v,stagePenalty:90}));
    const otherPhrases=variants.filter(v=>v.mode==='broader phrase'&&!lcUsda264VariantTokens(v).includes(head)).map(v=>({...v,stagePenalty:520}));
    const keywords=variants.filter(v=>v.mode==='keyword fallback').map(v=>({...v,stagePenalty:Number(v.penalty||0)}));
    return [full,stripped,headPhrases,otherPhrases,...keywords.map(v=>[v])].filter(stage=>stage.length);
  };
}

function lcIM265PrepareIngredient(ing){
  if(!ing||ing.notes==='Section heading')return '';
  const parsed=typeof parseIngredientLine==='function'?parseIngredientLine(ing.sourceLine||ing.name||''):{name:ing.name||'',amount:'',unit:''};
  const cleaned=lcIM265CleanFoodName(parsed.name||ing.name||'');
  if(cleaned&&!ing.ingredientId)ing.name=cleaned;
  if((ing.amount===''||ing.amount===undefined)&&parsed.amount!=='')ing.amount=parsed.amount;
  if(!ing.unit&&parsed.unit)ing.unit=parsed.unit;
  if(typeof ingredientAlternativeNames==='function'){
    ing.alternativeOptions=ingredientAlternativeNames(ing.name||cleaned);
    if(ing.alternativeOptions.length<2)ing.selectedAlternative='';
  }
  if(!ing.ingredientId)ing.matchStatus=(ing.alternativeOptions?.length>1&&!ing.selectedAlternative)?'choose-alternative':'unmatched';
  return ingredientMatchQuery(ing);
}

function lcIM265SavedResultsHtml(index,query){
  const matches=query&&typeof localFoodMatches==='function'?localFoodMatches(query,10):[];
  if(!matches.length)return '<div class="empty">No saved-food match. USDA results update below as you type.</div>';
  return matches.map(({item,score})=>`<button class="food-match-card" onclick="selectLocalIngredientMatch(${index},'${esc(item.id)}',${score})"><span><strong>${esc(item.name)}</strong>${item.brand?`<small>${esc(item.brand)}</small>`:''}<small>${round(item.kcal,0)} kcal · ${round(item.protein,1)}P per ${esc(item.baseAmount)} ${esc(item.baseUnit)} · ${esc(item.source)}</small></span><span class="pill ${item.confirmed?'good':'warn'}">${item.confirmed?'Confirmed':score+'%'}</span></button>`).join('');
}

function lcIM265UsdaResultsHtml(index,query){
  if(!query)return '<div class="empty">Enter a food name.</div>';
  if(typeof lcUsda262Ready==='function'&&!lcUsda262Ready())return '<div class="empty">Loading the bundled USDA library…</div>';
  if(typeof lcUsda262RecipeHtml!=='function')return '<div class="empty">The bundled USDA library is unavailable.</div>';
  return lcUsda262RecipeHtml(index,query);
}

function lcIM265RefreshIngredientMatch(index,value){
  const input=document.getElementById('foodMatchQuery');
  const raw=value!==undefined?value:(input?.value||'');
  const query=lcIM265CleanFoodName(raw);
  const cleaned=document.getElementById('foodMatchCleaned');
  if(cleaned)cleaned.textContent=query&&query!==raw.trim()?`Searching as: ${query}`:'Local results update as you type.';
  const saved=typeof localFoodMatches==='function'?localFoodMatches(query,10):[];
  const savedCount=document.getElementById('ingredientSavedCount');if(savedCount)savedCount.textContent=String(saved.length);
  const savedBox=document.getElementById('ingredientSavedResults');if(savedBox)savedBox.innerHTML=lcIM265SavedResultsHtml(index,query);
  const usdaBox=document.getElementById('ingredientUsdaResults');if(usdaBox)usdaBox.innerHTML=lcIM265UsdaResultsHtml(index,query);
}

function lcIM265ScheduleIngredientSearch(index,value){
  clearTimeout(lcIM265SearchTimer);
  lcIM265SearchTimer=setTimeout(()=>lcIM265RefreshIngredientMatch(index,value),LC_IM265.INPUT_DELAY_MS);
}

openIngredientMatch=function(index,preservePosition=true,returnView=''){
  const ing=recipeDraft?.ingredients?.[index];if(!ing)return;
  ingredientMatchActiveIndex=index;
  if(returnView)ingredientMatchReturnView=returnView;
  if(preservePosition&&ingredientMatchReturnView==='recipe')rememberRecipeEditorPosition(index);
  lcIM265PrepareIngredient(ing);
  const alternatives=ingredientChoiceOptions(ing),selected=ing.selectedAlternative||'',query=ingredientMatchQuery(ing);
  const matches=query?localFoodMatches(query,10):[];
  showModal(`<div class="card-title"><span>Match ingredient</span><button class="ghost compact" onclick="returnToRecipeBuilderFromMatch()">Back</button></div>
    <div class="notice"><strong>${esc(ing.sourceLine||ing.name)}</strong><br>${alternatives.length>1?'Choose which recipe alternative you are using, then select its nutrition match.':'Descriptions such as peeled, grated, fresh, small and wheat-free are ignored for matching.'}</div>
    ${alternatives.length>1?`<div class="ingredient-choice-grid">${alternatives.map((option,i)=>{const count=localFoodMatches(option,10).length;return `<button class="ingredient-choice-card ${option===selected?'selected':''}" onclick="selectIngredientAlternative(${index},${i})"><span><strong>${esc(option)}</strong><small>${count} saved match${count===1?'':'es'}</small></span><span class="pill ${option===selected?'good':'gray'}">${option===selected?'Selected':'Choose'}</span></button>`;}).join('')}</div>`:''}
    <label style="margin-top:10px">Search food name<input id="foodMatchQuery" value="${esc(query)}" placeholder="e.g. ginger" autocomplete="off" oninput="lcIM265ScheduleIngredientSearch(${index},this.value)" onkeydown="if(event.key==='Enter'){event.preventDefault();lcIM265RefreshIngredientMatch(${index},this.value)}"></label>
    <div id="foodMatchCleaned" class="tiny muted" style="margin-top:5px">Local results update as you type.</div>
    <div class="button-row" style="margin-top:8px"><button type="button" class="secondary" onclick="lcIM265RefreshIngredientMatch(${index})" ${alternatives.length>1&&!selected?'disabled':''}>Search local library</button><button type="button" class="ghost" onclick="searchReferenceFoods(${index})" ${alternatives.length>1&&!selected?'disabled':''}>Search live USDA</button><button type="button" class="ghost" onclick="openIngredientEditor('',${index})">Add manually</button></div>
    <div class="card-title" style="margin-top:14px"><span>Saved matches${selected?` for ${esc(selected)}`:''}</span><span id="ingredientSavedCount" class="pill gray">${matches.length}</span></div>
    <div id="ingredientSavedResults" class="list">${alternatives.length>1&&!selected?'<div class="empty">Choose one of the recipe alternatives above.</div>':lcIM265SavedResultsHtml(index,query)}</div>
    <div id="ingredientUsdaResults">${alternatives.length>1&&!selected?'':lcIM265UsdaResultsHtml(index,query)}</div>
    <div id="foodSearchResults"></div>`);
};

selectLocalIngredientMatch=function(index,id,score=100){
  const ing=recipeDraft?.ingredients?.[index],item=state.ingredientCache.find(x=>x.id===id);if(!ing||!item)return;
  const query=lcIM265CleanFoodName(document.getElementById('foodMatchQuery')?.value||ingredientMatchQuery(ing));
  if(query){ing.name=query;if(!Array.isArray(item.aliases))item.aliases=[];if(!item.aliases.some(a=>normaliseFoodName(a,{loose:true})===normaliseFoodName(query,{loose:true})))item.aliases.push(query);}
  applyIngredientMatch(ing,item,item.confirmed?'confirmed':'likely',score);saveState();
  ingredientMatchReturnView==='bulk'?openBulkIngredientReview(index):renderRecipeBuilderModal();
};

if(typeof lcUsda262UseRecipe==='function'){
  lcUsda262UseRecipe=function(index,resultIndex,returnView=''){
    const ing=recipeDraft?.ingredients?.[index];if(!ing)return;
    const query=lcIM265CleanFoodName(document.getElementById('foodMatchQuery')?.value||ingredientMatchQuery(ing));
    const results=lcUsda262Search(query,18),food=results[resultIndex];if(!food)return;
    if(query)ing.name=query;
    lcUsda262SaveFood(food,{ingredient:true,ingredientIndex:index,returnView});
    showToast('USDA food saved and matched');
  };
}

if(typeof selectReferenceFood==='function'){
  selectReferenceFood=function(index,resultIndex){
    const ing=recipeDraft?.ingredients?.[index],result=foodSearchResults[resultIndex];if(!ing||!result)return;
    const query=lcIM265CleanFoodName(document.getElementById('foodMatchQuery')?.value||ingredientMatchQuery(ing));
    const item={id:uid('ingredient'),name:result.name,brand:result.brand||'',foodState:result.foodState||'',servingDescription:'100 g',baseAmount:100,baseUnit:'g',densityGPerMl:'',kcal:toNum(result.kcal),protein:toNum(result.protein),carbs:toNum(result.carbs),fat:toNum(result.fat),fibre:toNum(result.fibre),sodiumMg:toNum(result.sodiumMg),aliases:[query].filter(Boolean),commonMeasures:result.commonMeasures&&typeof result.commonMeasures==='object'?result.commonMeasures:{},source:result.source||'Reference database',sourceId:result.sourceId||'',sourceUrl:result.sourceUrl||'',confirmed:true,notes:'Imported from reference search; verify branded values against the current label.',updatedAt:nowISO()};
    state.ingredientCache.push(item);if(query)ing.name=query;applyIngredientMatch(ing,item,'confirmed',100);saveState();
    ingredientMatchReturnView==='bulk'?openBulkIngredientReview(index):renderRecipeBuilderModal();showToast('Reference food saved and matched');
  };
}

function lcIM265SavedTrusted(item){
  if(!item)return false;
  const source=String(item.source||'').toLowerCase();
  return Boolean(item.confirmed)||source.includes('package label')||source.startsWith('usda')||source.includes('user confirmed');
}

function lcIM265UsdaStrongEnough(food,second=null){
  if(!food)return false;
  const mode=String(food.matchMode||'full');
  if(mode==='keyword fallback')return false;
  const score=Number(food.score||0),gap=score-Number(second?.score||0);
  if(mode==='full'&&score>=650)return true;
  if(mode==='descriptors removed'&&score>=620)return true;
  if(mode==='broader phrase'&&score>=700&&gap>=45)return true;
  return false;
}

function lcIM265EnsureUsdaIngredient(food,query){
  let item=typeof lcUsda262FindSaved==='function'?lcUsda262FindSaved(food,'ingredientCache'):null;
  if(!item&&typeof lcUsda262SavedRecord==='function'){
    item=lcUsda262SavedRecord(food,{ingredient:true,alias:query});
    state.ingredientCache.push(item);
  }
  return item;
}

async function lcIM265RunAutoMatch({returnView='recipe',showProgress=true}={}){
  if(!recipeDraft||lcIM265MatchBusy)return null;
  lcIM265MatchBusy=true;
  const originalReturn=ingredientMatchReturnView;
  const stats={cleaned:0,saved:0,usda:0,alternatives:0,unresolved:0,unitReview:0,total:0};
  try{
    const rows=(recipeDraft.ingredients||[]).filter(ing=>ing.notes!=='Section heading');stats.total=rows.length;
    if(showProgress)showModal(`<div class="card-title"><span>Matching ingredients</span></div><div class="import-progress"><div class="spinner"></div><div id="ingredientAutoMatchProgress">Cleaning ingredient names…</div></div><div class="notice">Lift & Cut is checking saved foods first, then the bundled USDA library. Nothing online is required.</div>`);
    if(typeof lcUsda262Ready==='function'&&!lcUsda262Ready()&&typeof lcUsda262Load==='function')await lcUsda262Load();
    for(let i=0;i<rows.length;i++){
      const ing=rows[i],before=ing.name||'';const query=lcIM265PrepareIngredient(ing);if(query&&query!==before)stats.cleaned++;
      const progress=document.getElementById('ingredientAutoMatchProgress');if(progress)progress.textContent=`Checking ${i+1} of ${rows.length}: ${query||ing.sourceLine||'ingredient'}`;
      if(ing.ingredientId){recalculateRecipeIngredient(ing);if(['needs-measure','missing-amount'].includes(ing.matchStatus))stats.unitReview++;continue;}
      if(ingredientChoiceOptions(ing).length>1&&!ing.selectedAlternative){stats.alternatives++;continue;}
      if(!query){stats.unresolved++;continue;}

      const saved=localFoodMatches(query,3),topSaved=saved[0],nextSaved=saved[1];
      const clearSaved=topSaved&&topSaved.score>=86&&(topSaved.score>=96||!nextSaved||topSaved.score-nextSaved.score>=8);
      let applied=false;
      if(clearSaved&&lcIM265SavedTrusted(topSaved.item)){
        applyIngredientMatch(ing,topSaved.item,topSaved.item.confirmed?'confirmed':'likely',topSaved.score);stats.saved++;applied=true;
      }
      if(!applied&&typeof lcUsda262Search==='function'&&lcUsda262Ready()){
        const foods=lcUsda262Search(query,3),top=foods[0];
        if(lcIM265UsdaStrongEnough(top,foods[1])){
          const item=lcIM265EnsureUsdaIngredient(top,query);
          if(item){applyIngredientMatch(ing,item,'likely',Math.min(99,Math.max(70,Math.round(Number(top.score||0)/12))));stats.usda++;applied=true;}
        }
      }
      if(!applied&&clearSaved){applyIngredientMatch(ing,topSaved.item,topSaved.item.confirmed?'confirmed':'likely',topSaved.score);stats.saved++;}
      if(!ing.ingredientId)stats.unresolved++;
      else if(['needs-measure','missing-amount'].includes(ing.matchStatus))stats.unitReview++;
      if(i%2===1)await new Promise(resolve=>setTimeout(resolve,0));
    }
    saveState();lcIM265LastSummary=stats;
    ingredientMatchReturnView=returnView||originalReturn||'recipe';
    if(ingredientMatchReturnView==='bulk')openBulkIngredientReview();else renderRecipeBuilderModal();
    showToast(`${stats.saved+stats.usda} matched (${stats.saved} saved, ${stats.usda} USDA)${stats.alternatives?` · ${stats.alternatives} choices`:''}${stats.unresolved?` · ${stats.unresolved} need review`:''}`,6500);
    return stats;
  }catch(error){
    ingredientMatchReturnView=returnView||originalReturn||'recipe';
    if(ingredientMatchReturnView==='bulk')openBulkIngredientReview();else renderRecipeBuilderModal();
    showToast(`Auto-match stopped: ${error.message||error}`,6000);return null;
  }finally{lcIM265MatchBusy=false;}
}

autoMatchRecipeIngredients=function(recipe){
  if(!recipe)return recipe;normaliseRecipeRecord(recipe);
  for(const ing of recipe.ingredients||[]){
    if(ing.notes==='Section heading')continue;
    const query=lcIM265PrepareIngredient(ing);
    if(ing.ingredientId){recalculateRecipeIngredient(ing);continue;}
    if(ingredientChoiceOptions(ing).length>1&&!ing.selectedAlternative)continue;
    const saved=localFoodMatches(query,3),top=saved[0];let applied=false;
    if(top&&top.score>=90&&lcIM265SavedTrusted(top.item)){applyIngredientMatch(ing,top.item,top.item.confirmed?'confirmed':'likely',top.score);applied=true;}
    if(!applied&&typeof lcUsda262Ready==='function'&&lcUsda262Ready()&&typeof lcUsda262Search==='function'){
      const foods=lcUsda262Search(query,3);
      if(lcIM265UsdaStrongEnough(foods[0],foods[1])){
        const item=lcIM265EnsureUsdaIngredient(foods[0],query);if(item){applyIngredientMatch(ing,item,'likely',Math.min(99,Math.round(Number(foods[0].score||0)/12)));applied=true;}
      }
    }
    if(!applied&&top&&top.score>=90)applyIngredientMatch(ing,top.item,top.item.confirmed?'confirmed':'likely',top.score);
  }
  return recipe;
};

autoMatchRecipeDraft=function(){return lcIM265RunAutoMatch({returnView:'recipe',showProgress:true});};
autoMatchBulkIngredients=function(){return lcIM265RunAutoMatch({returnView:'bulk',showProgress:true});};
if(typeof lcUsda262MatchUnresolved==='function')lcUsda262MatchUnresolved=function(){return lcIM265RunAutoMatch({returnView:'bulk',showProgress:true});};

findUnmatchedIngredientsOnline=async function(){
  if(!recipeDraft||lcIM265MatchBusy)return;
  // Always run the reliable offline matcher first. The live service is a fallback,
  // not a prerequisite for ordinary recipe matching.
  await lcIM265RunAutoMatch({returnView:'recipe',showProgress:true});
  const targets=(recipeDraft.ingredients||[]).map((ing,index)=>({ing,index})).filter(({ing})=>!ing.ingredientId&&ing.notes!=='Section heading'&&!(ingredientChoiceOptions(ing).length>1&&!ing.selectedAlternative));
  if(!targets.length)return showToast('All eligible ingredients are matched');
  if(!state.settings.syncUrl||!state.settings.syncKey)return showToast(`${targets.length} ingredient${targets.length===1?'':'s'} still need review. Live lookup is not configured; local matching completed.`,6500);
  if(lcIM265MatchBusy)return;lcIM265MatchBusy=true;
  let matched=0,checked=0,endpointError='';
  try{
    showModal(`<div class="card-title"><span>Live lookup remaining</span></div><div class="import-progress"><div class="spinner"></div><div id="ingredientLiveProgress">Preparing…</div></div><div class="notice">Only unresolved ingredients are sent to your private Apps Script. The bundled USDA library has already been checked.</div>`);
    for(const {ing} of targets.slice(0,LC_IM265.MAX_LIVE_LOOKUPS)){
      const query=referenceFoodQuery(lcIM265PrepareIngredient(ing));if(!query)continue;checked++;
      const progress=document.getElementById('ingredientLiveProgress');if(progress)progress.textContent=`Searching ${checked} of ${Math.min(targets.length,LC_IM265.MAX_LIVE_LOOKUPS)}: ${query}`;
      let result;
      try{result=await jsonpRequest({action:'food-search',key:state.settings.syncKey,q:query,source:'usda'},15000);}catch(error){endpointError=error.message||String(error);break;}
      const foods=result?.foods||[];if(!foods.length)continue;
      const ranked=foods.map(food=>({food,score:foodMatchScore(query,{name:food.name,aliases:[]})})).sort((a,b)=>b.score-a.score);
      if(!ranked[0]||ranked[0].score<60)continue;
      const best=ranked[0].food,item={id:uid('ingredient'),name:best.name,brand:best.brand||'',foodState:best.foodState||'',servingDescription:'100 g',baseAmount:100,baseUnit:'g',densityGPerMl:'',kcal:toNum(best.kcal),protein:toNum(best.protein),carbs:toNum(best.carbs),fat:toNum(best.fat),fibre:toNum(best.fibre),sodiumMg:toNum(best.sodiumMg),aliases:[query],commonMeasures:best.commonMeasures&&typeof best.commonMeasures==='object'?best.commonMeasures:{},source:best.source||'USDA live',sourceId:best.sourceId||'',sourceUrl:best.sourceUrl||'',confirmed:false,notes:'Suggested from live USDA search; verify the food and household measure.',updatedAt:nowISO()};
      state.ingredientCache.push(item);applyIngredientMatch(ing,item,'likely',Math.min(90,ranked[0].score));matched++;
    }
    saveState();renderRecipeBuilderModal();
    if(endpointError)showToast(`${matched} live match${matched===1?'':'es'} added before the live service stopped: ${endpointError}`,7500);
    else showToast(`${matched} live match${matched===1?'':'es'} added · ${checked} checked`,6000);
  }finally{lcIM265MatchBusy=false;}
};

// Make bulk name cleaning use the same robust parser and preserve the user's place.
cleanAllRecipeIngredientNamesData=function(){
  recipeDraft?.ingredients?.forEach(ing=>{
    if(ing.notes==='Section heading')return;
    const parsed=parseIngredientLine(ing.sourceLine||ing.name||'');
    const cleaned=lcIM265CleanFoodName(parsed.name||ing.name||'');
    if(cleaned&&!ing.ingredientId)ing.name=cleaned;
    if((ing.amount===''||ing.amount===undefined)&&parsed.amount!=='')ing.amount=parsed.amount;
    if(!ing.unit&&parsed.unit)ing.unit=parsed.unit;
    ing.alternativeOptions=ingredientAlternativeNames(ing.name||cleaned);
    if(ing.alternativeOptions.length<2)ing.selectedAlternative='';
  });
};

cleanAllRecipeIngredientNames=function(){
  if(!recipeDraft)return;let changed=0;
  recipeDraft.ingredients.forEach(ing=>{
    if(ing.notes==='Section heading')return;
    const before=ing.name||'',parsed=parseIngredientLine(ing.sourceLine||ing.name||''),cleaned=lcIM265CleanFoodName(parsed.name||ing.name||'');
    if(cleaned&&cleaned!==before){if(ing.ingredientId)unlinkRecipeIngredientData(ing);ing.name=cleaned;changed++;}
    if((ing.amount===''||ing.amount===undefined)&&parsed.amount!=='')ing.amount=parsed.amount;
    if(!ing.unit&&parsed.unit)ing.unit=parsed.unit;
    ing.selectedAlternative='';ing.alternativeOptions=ingredientAlternativeNames(ing.name||cleaned);
  });
  openBulkIngredientReview();showToast(`${changed} ingredient name${changed===1?'':'s'} cleaned`);
};

// Refresh an open matching screen when the local library finishes loading.
window.addEventListener('liftcut-usda-ready',()=>{
  try{if(document.getElementById('foodMatchQuery')&&Number.isFinite(Number(ingredientMatchActiveIndex)))lcIM265RefreshIngredientMatch(Number(ingredientMatchActiveIndex));}catch{}
});
