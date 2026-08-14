'use strict';

/* Lift & Cut 2.6.4 — local USDA FoodData Central library.
 * Built from user-supplied official Foundation Foods (2026-04-30),
 * SR Legacy (2018-04), and Survey/FNDDS (2024-10-31) JSON downloads.
 * The compact static dataset stays outside the synced user state; only foods
 * explicitly saved/used by the user are copied into their private database.
 */

const LC_USDA_V262=Object.freeze({
  VERSION:'2.6.4',
  FILE:'./usda-core-v262.json',
  MAX_RESULTS:18,
  SOURCE_LABELS:{F:'USDA Foundation',S:'USDA SR Legacy',D:'USDA FNDDS / Survey'},
  SOURCE_BONUS:{F:260,S:70,D:55}
});

let lcUsdaRows262=[];
let lcUsdaLoading262=null;
let lcUsdaLoaded262=false;
let lcUsdaError262='';
let lcUsdaFastResults262=[];

function lcUsda262Token(value){const t=String(value||'');if(t.length>4&&t.endsWith('ies'))return t.slice(0,-3)+'y';if(t.length>4&&t.endsWith('oes'))return t.slice(0,-2);if(t.length>4&&t.endsWith('s')&&!t.endsWith('ss'))return t.slice(0,-1);return t;}
function lcUsda262Norm(value){
  return String(value||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'')
    .replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim().split(' ').filter(Boolean).map(lcUsda262Token).join(' ');
}
function lcUsda262Query(value){
  let q=lcUsda262Norm(value);
  const replacements=[
    [/\byoghurt\b/g,'yogurt'],[/\bprawn\b/g,'shrimp'],[/\bcapsicum\b/g,'bell pepper'],
    [/\b(?:persian|lebanese|english|mini|baby) cucumber\b/g,'cucumber'],[/\bcourgette\b/g,'zucchini'],[/\baubergine\b/g,'eggplant'],[/\bspring onion\b/g,'scallion'],
    [/\b(?:flat leaf|flatleaf|italian) parsley\b/g,'parsley'],[/\bbaby spinach leaves?\b/g,'baby spinach'],[/\bspinach leaves?\b/g,'spinach'],
    [/\bparsley leaves?\b/g,'parsley'],[/\b(?:coriander|cilantro) leaves?\b/g,'coriander'],[/\bbasil leaves?\b/g,'basil'],[/\bmint leaves?\b/g,'mint'],
    [/\b(?:wild caught|farm raised)\b/g,' '],
    [/\bsmoked paprika(?: powder)?\b/g,'paprika'],[/\bextra virgin olive oil\b/g,'olive oil'],
    [/\bfat free\b/g,'nonfat'],[/\bnon fat\b/g,'nonfat'],[/\blow fat\b/g,'lowfat'],[/\breduced fat\b/g,'lowfat'],[/\blow sodium\b/g,'reduced sodium'],
    [/\bkosher salt\b/g,'salt table'],
    [/\bminced beef\b/g,'ground beef'],[/\bminced meat\b/g,'ground meat'],[/\brocket\b/g,'arugula'],
    [/\bchickpeas?\b/g,'chickpea'],[/\bgarbanzo beans?\b/g,'chickpea'],[/\bicing sugar\b/g,'powdered sugar'],
    [/\bcastor sugar\b/g,'granulated sugar']
  ];
  replacements.forEach(([r,v])=>q=q.replace(r,v));
  return q.replace(/\s+/g,' ').trim();
}
const LC_USDA_V263_DESCRIPTORS=new Set([
  // Size, preparation and editorial wording that should not block a food-name match.
  // Nutritionally meaningful states such as raw/cooked/frozen/canned/lowfat are
  // intentionally NOT removed; the broader variants below can still fall back if needed.
  'small','medium','large','jumbo','giant','extra','sized','size','freshly','finely','roughly','coarsely','thinly','thickly',
  'peeled','deveined','shell','shelled','skinless','boneless','trimmed','washed','rinsed','chopped','diced','sliced','minced','grated',
  'shredded','crushed','cracked','halved','quartered','cubed','julienned','spiralized','spiralised','zested','seeded','deseeded','cored',
  'organic','packed','heaped','level','prepared','ready','serving','pieces','piece','approximately','about','divided','optional',
  'pound','pounds','lb','lbs','ounce','ounces','oz','gram','grams','kg','kilogram','kilograms','mg','milligram','milligrams','cup','cups',
  'tablespoon','tablespoons','tbsp','teaspoon','teaspoons','tsp','ml','milliliter','milliliters','litre','litres','liter','liters','fl','fluid'
]);

const LC_USDA_V263_FILLERS=new Set(['a','an','the','of','for','with','without','and','or','into','in','to','as']);
const LC_USDA_V263_SINGLE_GENERIC=new Set(['food','ingredient','piece','pieces','serving','prepared','fresh','oil','sauce']);
function lcUsda263UniqueVariant(list,q,penalty,mode){q=lcUsda262Query(q);if(!q||list.some(x=>x.q===q))return;list.push({q,penalty,mode});}
function lcUsda263QueryVariants(value){
  const variants=[],base=lcUsda262Query(value);if(!base)return variants;
  lcUsda263UniqueVariant(variants,base,0,'full');
  const baseTokens=base.split(' ').filter(Boolean);
  const core=baseTokens.filter(t=>!LC_USDA_V263_DESCRIPTORS.has(t)&&!LC_USDA_V263_FILLERS.has(t)&&!/^\d+(?:\.\d+)?$/.test(t));
  if(core.length)lcUsda263UniqueVariant(variants,core.join(' '),55,'descriptors removed');
  // Try meaningful contiguous phrases before individual words. This lets descriptions
  // such as "large peeled shrimp" resolve to shrimp while preserving "chicken breast".
  for(let size=Math.min(3,core.length);size>=2;size--){
    for(let i=0;i<=core.length-size;i++)lcUsda263UniqueVariant(variants,core.slice(i,i+size).join(' '),130+(core.length-size)*700,'broader phrase');
  }
  // Finally try individual meaningful words. Single-word matches are display fallbacks,
  // not blind substitutions: a sizeable penalty keeps full/phrase matches ranked first.
  [...core].reverse().forEach((token,idx)=>{
    if(token.length<3||LC_USDA_V263_SINGLE_GENERIC.has(token)||/^\d+$/.test(token))return;
    lcUsda263UniqueVariant(variants,token,600+Math.max(0,core.length-1)*350+idx*20,'keyword fallback');
  });
  return variants;
}
function lcUsda263Score(row,query){
  const variants=lcUsda263QueryVariants(query);let best=-1,bestVariant=null;
  for(const variant of variants){const raw=lcUsda262Score(row,variant.q);const score=raw<0?raw:raw-variant.penalty;if(score>best){best=score;bestVariant=variant;}}
  return {score:best,variant:bestVariant};
}
function lcUsda262SourceLabel(code){return LC_USDA_V262.SOURCE_LABELS[code]||'USDA FoodData Central';}
function lcUsda262SourcePriority(code){return LC_USDA_V262.SOURCE_BONUS[code]||0;}
function lcUsda262BrandPenalty(name,q){
  const n=lcUsda262Norm(name);
  let p=0;
  const obvious=/\b(?:restaurant|mcdonald|burger king|wendy|applebee|denny|cracker barrel|t g i|pillsbury|kraft|oscar mayer|campbell|kellogg|general mills|quaker|nabisco|subway|pizza hut|domino|starbucks|chick fil a|popeyes)\b/;
  if(obvious.test(n)&&!obvious.test(q))p+=260;
  if(/\b(?:breaded|battered|fried|frozen dinner|fast food)\b/.test(n)&&!/(?:breaded|battered|fried|frozen|fast food)/.test(q))p+=100;
  // A generic ingredient query should not be hijacked by a prepared dish that merely
  // contains the same word. Dish results remain available when the user actually asks for them.
  const dish=/\b(?:meal|dinner|sandwich|salad|soup|gumbo|scampi|casserole|noodle|noodles|pasta|pizza|burrito|taco|stew|curry|chowder|dip|spread)\b/;
  if(dish.test(n)&&!dish.test(q))p+=500;
  return p;
}
function lcUsda262Score(row,query){
  const q=lcUsda262Query(query);if(!q)return -1;
  const n=lcUsda262Norm(row[1]);
  const qt=q.split(' ').filter(Boolean),nt=n.split(' ').filter(Boolean);if(!qt.length)return -1;
  const ns=new Set(nt);let score=0;
  const single=qt.length===1;
  if(n===q)score+=1200;
  else if(n===`${q} nfs`||n===`${q} ns`)score+=1050;
  else if(n.startsWith(q))score+=single?360:850;
  else if(n.includes(q))score+=single?260:650;
  const matched=qt.filter(t=>ns.has(t)).length;
  if(matched===qt.length)score+=420+qt.length*45+(qt.length>=2?420:0);
  else score+=matched*85;
  // substring token matches help terms such as yogurt/yoghurt variants while avoiding noise.
  qt.forEach(t=>{if(!ns.has(t)&&nt.some(x=>x.startsWith(t)||t.startsWith(x)))score+=28;});
  score+=lcUsda262SourcePriority(row[2]);
  score-=Math.max(0,nt.length-qt.length)*(single?22:5);
  if(single&&!/(?:flour|salad|pancake|chip|soup|sandwich|cake|toast|nugget|sauce|juice|breaded|fried|canned)/.test(q)&&/\b(?:flour|salad|pancake|chip|soup|sandwich|cake|toast|nugget|sauce|juice|breaded|fried|canned)\b/.test(n))score-=160;
  score-=lcUsda262BrandPenalty(row[1],q);
  if(/\braw\b/.test(q)&&/\braw\b/.test(n))score+=90;
  if(/\bcooked\b/.test(q)&&/\bcooked\b/.test(n))score+=90;
  if(!/\b(?:raw|cooked|fried|roasted|boiled|grilled|baked)\b/.test(q)&&/\braw\b/.test(n))score+=15;
  return score;
}
function lcUsda262MeasureUnit(label){
  const text=lcUsda262Norm(label);let amount=1;
  const m=text.match(/^(\d+(?:\.\d+)?)\s+/);if(m)amount=Number(m[1])||1;
  const rules=[
    ['tablespoon','tbsp'],['tbsp','tbsp'],['teaspoon','tsp'],['tsp','tsp'],['cup','cup'],
    ['fluid ounce','fl oz'],['fl oz','fl oz'],['ounce','oz'],[' oz ','oz'],['pound','lb'],[' lb ','lb'],
    ['slice','slice'],['scoop','scoop'],['can','can'],['jar','jar'],['bottle','bottle'],['packet','packet'],['pack','pack'],
    ['piece','each'],['medium','medium'],['large','large'],['small','small'],['clove','clove'],['bunch','bunch'],
    ['sprig','sprig'],['stalk','stalk'],['head','head'],['fillet','fillet'],['breast','breast'],['thigh','thigh'],
    ['wedge','wedge'],['serving','serving'],['cucumber','each'],['onion','each'],['egg','each'],['potato','each'],['tomato','each'],
    ['apple','each'],['banana','each'],['orange','each'],['lemon','lemon'],['lime','lime']
  ];
  for(const [needle,unit] of rules){if(text===needle||text.includes(` ${needle}`)||text.startsWith(needle+' '))return {unit,amount};}
  return null;
}
function lcUsda262Measures(row){
  const out={};for(const pair of (row[15]||[])){
    if(!Array.isArray(pair)||pair.length<2)continue;const label=String(pair[0]||''),grams=Number(pair[1]||0);if(!(grams>0))continue;
    const parsed=lcUsda262MeasureUnit(label);if(!parsed)continue;const per=grams/Math.max(.0001,parsed.amount);if(!(per>0))continue;
    if(!out[parsed.unit]||per<out[parsed.unit]*3)out[parsed.unit]=Math.round(per*100)/100;
    if(['small','medium','large'].includes(parsed.unit)&&!out.each)out.each=Math.round(per*100)/100;
  }return out;
}
function lcUsda262ToFood(row,score=0){
  return {
    fdcId:String(row[0]),name:row[1],sourceCode:row[2],category:row[3]||'',
    kcal:Number(row[4]||0),protein:Number(row[5]||0),carbs:Number(row[6]||0),fat:Number(row[7]||0),
    fibre:Number(row[8]||0),sodiumMg:Number(row[9]||0),sugar:Number(row[10]||0),satFat:Number(row[11]||0),
    potassiumMg:Number(row[12]||0),calciumMg:Number(row[13]||0),cholesterolMg:Number(row[14]||0),
    commonMeasures:lcUsda262Measures(row),source:lcUsda262SourceLabel(row[2]),sourceId:String(row[0]),
    sourceUrl:`https://fdc.nal.usda.gov/fdc-app.html#/food-details/${row[0]}/nutrients`,score
  };
}
async function lcUsda262Load(){
  if(lcUsdaLoaded262)return lcUsdaRows262;if(lcUsdaLoading262)return lcUsdaLoading262;
  lcUsdaLoading262=fetch(`${LC_USDA_V262.FILE}?v=${LC_USDA_V262.VERSION}`,{cache:'force-cache'}).then(async res=>{
    if(!res.ok)throw new Error(`Local USDA library failed to load (${res.status})`);const data=await res.json();
    lcUsdaRows262=Array.isArray(data?.foods)?data.foods:[];lcUsdaLoaded262=true;lcUsdaError262='';
    try{window.dispatchEvent(new CustomEvent('liftcut-usda-ready',{detail:{count:lcUsdaRows262.length}}));}catch{}
    return lcUsdaRows262;
  }).catch(error=>{lcUsdaError262=error?.message||'Local USDA library failed to load';console.warn(lcUsdaError262);return [];}).finally(()=>{lcUsdaLoading262=null;});
  return lcUsdaLoading262;
}
function lcUsda262Ready(){return lcUsdaLoaded262&&lcUsdaRows262.length>0;}
function lcUsda262Count(){return lcUsdaRows262.length;}
function lcUsda264VariantTokens(variant){return lcUsda262Query(variant?.q||'').split(' ').filter(Boolean);}
function lcUsda264RowHasVariant(row,variant){
  const qt=lcUsda264VariantTokens(variant),nt=new Set(lcUsda262Norm(row?.[1]||'').split(' ').filter(Boolean));
  if(!qt.length)return false;
  // A widened result must actually contain every token in that widened phrase.
  // This prevents `dry white wine` from returning foods that merely contain
  // `dry` + `white` while completely missing the food head `wine`.
  return qt.every(t=>nt.has(t));
}
function lcUsda264StageVariants(query){
  const variants=lcUsda263QueryVariants(query);if(!variants.length)return [];
  const cleaned=(variants.find(v=>v.mode==='descriptors removed')||variants[0]);
  const core=lcUsda264VariantTokens(cleaned),head=core[core.length-1]||'';
  const direct=variants.filter(v=>v.mode==='full'||v.mode==='descriptors removed').map(v=>({...v,stagePenalty:Number(v.penalty||0)}));
  // Head/suffix phrases are semantically stronger than arbitrary adjective phrases.
  // Once a richer stage has failed, treat a phrase containing the food-head token
  // as a credible match rather than carrying over the old global 800+ point penalty.
  const headPhrases=variants.filter(v=>v.mode==='broader phrase'&&lcUsda264VariantTokens(v).includes(head)).map(v=>({...v,stagePenalty:90}));
  const otherPhrases=variants.filter(v=>v.mode==='broader phrase'&&!lcUsda264VariantTokens(v).includes(head)).map(v=>({...v,stagePenalty:520}));
  // Keyword fallbacks are tried in generated order (right-most/head word first) and
  // keep a large confidence penalty so they are suggestions, not silent auto-matches.
  const keywords=variants.filter(v=>v.mode==='keyword fallback').map(v=>({...v,stagePenalty:Number(v.penalty||0)}));
  return [direct,headPhrases,otherPhrases,...keywords.map(v=>[v])].filter(stage=>stage.length);
}
function lcUsda264ScoreVariant(row,variant){
  if(!lcUsda264RowHasVariant(row,variant))return -1;
  const raw=lcUsda262Score(row,variant.q);return raw<0?raw:raw-Number(variant.stagePenalty??variant.penalty??0);
}
function lcUsda262Search(query,limit=LC_USDA_V262.MAX_RESULTS){
  if(!lcUsda262Ready())return [];
  const stages=lcUsda264StageVariants(query);if(!stages.length)return [];
  // Search progressively. As soon as a meaningful stage produces credible
  // candidates, do not pollute those results with weaker adjective/keyword hits.
  for(const stage of stages){
    const scored=[];
    for(const row of lcUsdaRows262){
      let best=-1,bestVariant=null;
      for(const variant of stage){const score=lcUsda264ScoreVariant(row,variant);if(score>best){best=score;bestVariant=variant;}}
      if(best>=145)scored.push([best,row,bestVariant]);
    }
    if(!scored.length)continue;
    scored.sort((a,b)=>b[0]-a[0]||String(a[1][1]).length-String(b[1][1]).length||Number(a[1][0])-Number(b[1][0]));
    const seen=new Set(),out=[];
    for(const [score,row,variant] of scored){
      const key=lcUsda262Norm(row[1]);if(seen.has(key))continue;seen.add(key);
      const food=lcUsda262ToFood(row,score);food.matchQuery=variant?.q||'';food.matchMode=variant?.mode||'full';out.push(food);
      if(out.length>=limit)break;
    }
    if(out.length)return out;
  }
  return [];
}
function lcUsda262SavedRecord(food,{ingredient=false,alias=''}={}){
  const common={...(food.commonMeasures||{})};
  const base={name:food.name,brand:'',servingDescription:'100 g',baseAmount:100,baseUnit:'g',gramsPerServing:100,
    densityGPerMl:'',kcal:food.kcal,protein:food.protein,carbs:food.carbs,fat:food.fat,fibre:food.fibre,sodiumMg:food.sodiumMg,
    sugar:food.sugar,satFat:food.satFat,potassiumMg:food.potassiumMg,calciumMg:food.calciumMg,cholesterolMg:food.cholesterolMg,
    aliases:[alias].filter(Boolean),commonMeasures:common,source:food.source,sourceType:'USDA local',sourceId:food.sourceId,
    sourceUrl:food.sourceUrl,confirmed:true,notes:`USDA FoodData Central ${food.source}. Generic reference value; use a package label when a specific branded product differs.`,updatedAt:typeof nowISO==='function'?nowISO():new Date().toISOString()};
  if(ingredient)return {id:typeof uid==='function'?uid('ingredient'):`ingredient-${Date.now()}`,foodState:'',favourite:false,useCount:0,lastUsedAt:'',...base};
  return {id:typeof uid==='function'?uid('savedfood'):`savedfood-${Date.now()}`,barcode:'',favourite:false,useCount:0,lastUsedAt:'',...base};
}
function lcUsda262FindSaved(food,collection='savedFoods'){
  const rows=state?.[collection]||[];return rows.find(x=>String(x.sourceId||'')===String(food.sourceId||'')&&String(x.source||'').startsWith('USDA'))||null;
}
function lcUsda262SaveFood(food,{log=false,ingredient=false,ingredientIndex=-1,returnView=''}={}){
  if(!food)return null;
  if(ingredient){
    let item=lcUsda262FindSaved(food,'ingredientCache');if(!item){item=lcUsda262SavedRecord(food,{ingredient:true,alias:ingredientIndex>=0&&recipeDraft?.ingredients?.[ingredientIndex]?ingredientMatchQuery(recipeDraft.ingredients[ingredientIndex]):''});state.ingredientCache.push(item);}
    if(ingredientIndex>=0&&recipeDraft?.ingredients?.[ingredientIndex]){const ing=recipeDraft.ingredients[ingredientIndex];applyIngredientMatch(ing,item,'confirmed',Math.min(100,Math.round(food.score||100)));saveState();if(returnView==='bulk'||ingredientMatchReturnView==='bulk')openBulkIngredientReview(ingredientIndex);else renderRecipeBuilderModal();}
    return item;
  }
  let item=lcUsda262FindSaved(food,'savedFoods');if(!item){item=lcUsda262SavedRecord(food);state.savedFoods.push(item);saveState();}
  if(log&&typeof n260OpenPortion==='function')n260OpenPortion('saved',item.id);else if(typeof n260RenderLoggerResults==='function')n260RenderLoggerResults();
  return item;
}
function lcUsda262FastCard(food,index){
  const measures=Object.keys(food.commonMeasures||{}).slice(0,3);const m=measures.length?` · ${measures.join(', ')}`:'';
  const broadened=food.matchMode&&food.matchMode!=='full'?`<div class="tiny muted">Matched from “${esc(food.matchQuery)}” after ignoring descriptive wording.</div>`:'';
  return `<div class="food-search-card"><div><strong>${esc(food.name)}</strong><div class="small muted">${esc(food.source)}${food.category?` · ${esc(food.category)}`:''}</div>${broadened}<div class="tiny">${round(food.kcal,0)} kcal · ${round(food.protein,1)}P · ${round(food.carbs,1)}C · ${round(food.fat,1)}F per 100 g${esc(m)}</div></div><div class="button-row"><button onclick="lcUsda262UseFast(${index},true)">Save & log</button><button class="secondary compact" onclick="lcUsda262UseFast(${index},false)">Save</button></div></div>`;
}
function lcUsda262UseFast(index,log=false){const food=lcUsdaFastResults262[index];if(!food)return;lcUsda262SaveFood(food,{log});if(!log)showToast('USDA food saved for instant reuse');}
function lcUsda262RenderFast(query){
  if(!query||String(query).trim().length<2)return '';
  if(!lcUsda262Ready())return `<div class="card-title fast-result-heading"><span>USDA local library</span><span class="pill gray">Loading</span></div><div class="empty">Loading the offline USDA food library…</div>`;
  lcUsdaFastResults262=lcUsda262Search(query,12);
  return `<div class="card-title fast-result-heading"><span>USDA local library</span><span class="pill good">${lcUsdaFastResults262.length}</span></div><div class="small muted usda-local-note">${lcUsda262Count().toLocaleString()} generic/reference foods available offline. Foundation foods are ranked first.</div><div class="fast-food-result-list">${lcUsdaFastResults262.length?lcUsdaFastResults262.map(lcUsda262FastCard).join(''):'<div class="empty">No USDA local match. Try a simpler food name or use the online fallback.</div>'}</div>`;
}
function lcUsda262RecipeResults(query,limit=10){return lcUsda262Search(query,limit);}
function lcUsda262UseRecipe(index,resultIndex,returnView=''){
  const q=document.getElementById('foodMatchQuery')?.value||ingredientMatchQuery(recipeDraft?.ingredients?.[index]||{});
  const results=lcUsda262Search(q,18),food=results[resultIndex];if(!food)return;lcUsda262SaveFood(food,{ingredient:true,ingredientIndex:index,returnView});showToast('USDA food saved and matched');
}
function lcUsda262RecipeHtml(index,query){
  if(!lcUsda262Ready())return '<div class="empty">Loading local USDA library…</div>';
  const rows=lcUsda262Search(query,12);window.lcUsdaRecipeResults262=rows;
  return `<div class="card-title" style="margin-top:14px"><span>USDA local results</span><span class="pill good">${rows.length}</span></div><div class="list">${rows.length?rows.map((item,i)=>{const widened=item.matchMode&&item.matchMode!=='full'?`<small>Matched using “${esc(item.matchQuery)}” · ${esc(item.matchMode)}</small>`:'';return `<button class="food-match-card" onclick="lcUsda262UseRecipe(${index},${i},'${ingredientMatchReturnView||''}')"><span><strong>${esc(item.name)}</strong><small>${round(item.kcal,0)} kcal · ${round(item.protein,1)}P · ${round(item.carbs,1)}C · ${round(item.fat,1)}F per 100 g</small><small>${esc(item.source)}</small>${widened}</span><span class="pill good">Use</span></button>`;}).join(''):'<div class="empty">No local USDA results. Try a simpler food name or use the optional live lookup.</div>'}</div>`;
}

// Load in the background; the app remains usable while the compact file is fetched/cached.
setTimeout(()=>lcUsda262Load(),50);
window.addEventListener('liftcut-usda-ready',()=>{
  try{if(document.getElementById('foodLocalResults')&&typeof n260RenderLoggerResults==='function')n260RenderLoggerResults();}catch{}
  try{if(document.getElementById('foodMatchQuery')&&typeof openIngredientMatch==='function'&&Number.isFinite(Number(ingredientMatchActiveIndex)))openIngredientMatch(Number(ingredientMatchActiveIndex),false,ingredientMatchReturnView||'');}catch{}
});

function lcUsda262UseBulk(index,resultIndex=0){
  const ing=recipeDraft?.ingredients?.[index];if(!ing)return;const q=ingredientMatchQuery(ing),rows=lcUsda262Search(q,8),food=rows[resultIndex];if(!food)return;
  lcUsda262SaveFood(food,{ingredient:true,ingredientIndex:index,returnView:'bulk'});showToast('USDA food saved and matched');
}
function lcUsda262BestBulkHtml(ing,index){
  if(!ing||!lcUsda262Ready())return '';
  const q=ingredientMatchQuery(ing);if(!q)return '';
  const top=lcUsda262Search(q,1)[0];if(!top)return '';
  return `<div class="ingredient-suggestion usda-suggestion"><div><span class="tiny muted">Best USDA local suggestion</span><strong>${esc(top.name)}</strong><small>${round(top.kcal,0)} kcal · ${round(top.protein,1)}P per 100 g · ${esc(top.source)}</small></div><div class="button-row"><button type="button" class="secondary compact" onclick="lcUsda262UseBulk(${index},0)">Use</button><button type="button" class="ghost compact" onclick="openIngredientMatch(${index},false,'bulk')">More</button></div></div>`;
}

function lcUsda262MatchUnresolved(){
  if(!recipeDraft)return;if(!lcUsda262Ready()){lcUsda262Load().then(()=>lcUsda262MatchUnresolved());return showToast('Loading local USDA library…');}
  let matched=0,review=0;
  for(const ing of recipeDraft.ingredients||[]){
    if(ing.ingredientId||ing.notes==='Section heading'||(ingredientChoiceOptions(ing).length>1&&!ing.selectedAlternative))continue;
    const q=ingredientMatchQuery(ing),food=lcUsda262Search(q,1)[0];if(!food)continue;
    // Only apply strong results automatically. Lower-confidence results remain visible as suggestions.
    if(food.score>=720){let item=lcUsda262FindSaved(food,'ingredientCache');if(!item){item=lcUsda262SavedRecord(food,{ingredient:true,alias:q});state.ingredientCache.push(item);}applyIngredientMatch(ing,item,'likely',Math.min(99,Math.round(food.score/12)));matched++;}
    else review++;
  }
  saveState();openBulkIngredientReview();showToast(`${matched} USDA match${matched===1?'':'es'} applied${review?` · ${review} left for review`:''}`,4500);
}
