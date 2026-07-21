'use strict';

/* Lift & Cut 2.3.8 — independently validated recipe and EPUB import */
[
  'balls','ball','loaves','loaf','sheets','sheet','rashers','rasher','cobs','cob','portions','portion','blocks','block','boxes','box','sachets','sachet',
  'dashes','dash','drizzles','drizzle','glugs','glug','crunches','crunch','knobs','knob','spears','spear','steaks','steak','strips','strip','halves','half','quarters','quarter'
].forEach(unit=>{if(!RECIPE_UNITS.includes(unit))RECIPE_UNITS.push(unit);});
Object.assign(FRACTION_MAP,{'⅕':.2,'⅖':.4,'⅗':.6,'⅘':.8,'⅙':1/6,'⅚':5/6});
Object.assign(WORD_NUMBER_MAP,{half:.5,quarter:.25,eleven:11,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,several:''});
[
  [/\bcilantro\b/gi,'coriander'],[/\bgreen apple\b/gi,'apple'],[/\bhot honey\b/gi,'honey'],[/\bvanilla\b(?!\s+(?:bean|pod|ice|yogurt|yoghurt))/gi,'vanilla extract'],
  [/\btenderstem broccoli\b/gi,'broccoli'],[/\bbroccolini\b/gi,'broccoli'],[/\bhaloumi\b/gi,'halloumi'],[/\bpink salt\b/gi,'salt'],[/\brock salt\b/gi,'salt'],
  [/\bfull[-\s]?fat yoghurt\b/gi,'full fat yogurt'],[/\bfull[-\s]?fat yogurt\b/gi,'full fat yogurt'],[/\bcrumbled feta\b/gi,'feta'],[/\bgrated cheddar\b/gi,'cheddar'],
  [ /\bgelatine\b/gi,'gelatin' ],[ /\bchilli flakes?\b/gi,'chili flakes' ],[ /\bred pepper flakes?\b/gi,'chili flakes' ],
  [ /\bhimalayan salt\b/gi,'salt' ],[ /\bsea salt\b/gi,'salt' ],[ /\bground cinnamon\b/gi,'cinnamon' ],[ /\bground ginger\b/gi,'ginger ground' ],
  [ /\bdried oregano\b/gi,'oregano dried' ],[ /\bground coriander seeds?\b/gi,'coriander seed ground' ],[ /\bcoriander seeds?\b/gi,'coriander seed' ],
  [ /\bfrozen banana\b/gi,'banana' ],[ /\bfrozen raspberries?\b/gi,'raspberry' ],[ /\bhard[-\s]?boiled eggs?\b/gi,'egg boiled' ]
].forEach(pair=>FOOD_SYNONYM_REPLACEMENTS.push(pair));

const V238_GENERIC_AMBIGUOUS_FOODS=new Set(['oil','cheese','stock','broth','herbs','spices','flour','milk','cream','fish','meat']);
const V238_EPUB_TITLE_CLASSES=new Set(['head2','head5','head14','head15','head17','head19','caption','textbreak1p']);
const V238_EPUB_STOP_CLASSES=new Set(['head7','head10','head18','textbreak3','backhead1','index1','index2','index3','index4','index5','index6','index7','index8']);

function v238NormaliseTypography(value){
  return String(value||'').replace(/&amp;/gi,' and ').replace(/\u00a0/g,' ').replace(/[“”]/g,'"').replace(/[’‘]/g,"'").replace(/[‐‑‒–—]/g,'–').replace(/\s+/g,' ').trim();
}
function v238FractionTokenPattern(){return '(?:\\d+\\s+)?(?:\\d+\\/\\d+|\\d+[¼½¾⅓⅔⅛⅜⅝⅞⅕⅖⅗⅘⅙⅚]|\\d+(?:[.,]\\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞⅕⅖⅗⅘⅙⅚]|a|an|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|half|quarter)';}
function v238SimpleNumber(value){
  let s=v238NormaliseTypography(value).toLowerCase().replace(/^about\s+|^approximately\s+/,'').trim();
  if(s in WORD_NUMBER_MAP&&WORD_NUMBER_MAP[s]!=='')return WORD_NUMBER_MAP[s];
  let total=0,found=false;
  s=s.replace(/(\d)([¼½¾⅓⅔⅛⅜⅝⅞⅕⅖⅗⅘⅙⅚])/g,'$1 $2');
  for(const token of s.split(/\s+/)){
    if(token in WORD_NUMBER_MAP&&WORD_NUMBER_MAP[token]!==''){total+=toNum(WORD_NUMBER_MAP[token]);found=true;continue;}
    if(token in FRACTION_MAP){total+=FRACTION_MAP[token];found=true;continue;}
    if(/^\d+\/\d+$/.test(token)){const [a,b]=token.split('/').map(Number);if(b){total+=a/b;found=true;}continue;}
    const n=Number(token.replace(',','.'));if(Number.isFinite(n)){total+=n;found=true;}
  }
  return found?total:'';
}
function parseNumericExpression(raw){
  const s=v238NormaliseTypography(raw).toLowerCase();if(!s)return'';
  const range=s.match(new RegExp(`^(${v238FractionTokenPattern()})\\s*(?:–|-|to)\\s*(${v238FractionTokenPattern()})$`,'i'));
  if(range){const a=v238SimpleNumber(range[1]),b=v238SimpleNumber(range[2]);return a!==''&&b!==''?(toNum(a)+toNum(b))/2:'';}
  return v238SimpleNumber(s);
}
function canonicalUnit(unit){
  const u=String(unit||'').toLowerCase().replace(/\./g,'').trim();
  const map={kilograms:'kg',kilogram:'kg',grams:'g',gram:'g',milligrams:'mg',milligram:'mg',litres:'l',litre:'l',liters:'l',liter:'l',millilitres:'ml',millilitre:'ml',milliliters:'ml',milliliter:'ml',cups:'cup',tablespoon:'tbsp',tablespoons:'tbsp',teaspoon:'tsp',teaspoons:'tsp','fluid ounce':'fl oz','fluid ounces':'fl oz',cloves:'clove',cans:'can',tins:'can',tin:'can',jars:'jar',bottles:'bottle',packets:'packet',packs:'pack',packages:'package',slices:'slice',scoops:'scoop',pounds:'lb',pound:'lb',lbs:'lb',ounces:'oz',ounce:'oz',pieces:'each',piece:'each',units:'each',unit:'each',bunches:'bunch',handfuls:'handful',pinches:'pinch',sticks:'stick',sprigs:'sprig',heads:'head',stalks:'stalk',bulbs:'bulb',fillets:'fillet',breasts:'breast',thighs:'thigh',cubes:'cube',wedges:'wedge',inches:'inch',limes:'lime',lemons:'lemon',balls:'ball',loaves:'loaf',sheets:'sheet',rashers:'rasher',cobs:'cob',portions:'portion',blocks:'block',boxes:'box',sachets:'sachet',dashes:'dash',drizzles:'drizzle',glugs:'glug',crunches:'crunch',knobs:'knob',spears:'spear',steaks:'steak',strips:'strip',halves:'half',quarters:'quarter'};
  return map[u]||u;
}
function v238UnitRegex(){return [...RECIPE_UNITS].sort((a,b)=>b.length-a.length).map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|');}
function v238MetricValue(amount,unit){
  const a=toNum(amount),u=canonicalUnit(unit);if(!a)return null;
  if(u==='kg')return {value:a*1000,unit:'g'};if(u==='g')return {value:a,unit:'g'};if(u==='mg')return {value:a/1000,unit:'g'};
  if(u==='lb')return {value:a*453.592,unit:'g'};if(u==='oz')return {value:a*28.3495,unit:'g'};
  if(u==='l')return {value:a*1000,unit:'ml'};if(u==='ml')return {value:a,unit:'ml'};
  if(u==='cup')return {value:a*240,unit:'ml'};if(u==='tbsp')return {value:a*15,unit:'ml'};if(u==='tsp')return {value:a*5,unit:'ml'};
  return null;
}
function v238LooksLikeMethodText(value){
  const t=v238NormaliseTypography(value).replace(/^["'‘’“”]+/,'').trim();
  if(!t)return false;
  if(/^(?:add|arrange|bake|beat|blend|blitz|bloom|boil|bring|brush|chill|chop|combine|cook|cover|cut|divide|drain|fold|freeze|fry|grill|heat|leave|marinate|mix|place|pour|preheat|process|reduce|remove|rinse|roast|season|serve|slice|soak|spread|stir|strain|transfer|wash|whisk)\b/i.test(t))return true;
  if(/^(?:finely|roughly|coarsely|thinly|thickly)\s+(?:chop|slice|dice|mince|grate|shred)\b/i.test(t))return true;
  if(/^(?:in|into)\s+(?:a|an|the)\b/i.test(t)||/^if\s+you\b/i.test(t)||/^to\s+(?:make|prepare|cook|serve|assemble)\b/i.test(t))return true;
  if(t.length>100&&/[.!?]\s+[A-Z]/.test(t)&&/\b(?:add|mix|stir|cook|bake|place|blend|boil|serve|strain|freeze|heat|pour|slice|chop)\b/i.test(t))return true;
  return false;
}
function v238ParentheticalEquivalentEligible(raw){
  if(v238LooksLikeMethodText(raw))return false;
  const before=v238NormaliseTypography(String(raw||'').split('(')[0]);
  if(!before||before.length>100)return false;
  const startsAmount=new RegExp(`^(?:about\\s+|approximately\\s+)?${v238FractionTokenPattern()}\\b`,'i').test(before);
  const shortFoodPhrase=/^[A-Za-zÀ-ž'’\-\s]{2,70}$/.test(before)&&before.split(/\s+/).length<=10;
  return startsAmount||shortFoodPhrase;
}
function v238EquivalentFromParentheses(raw){
  const groups=[...String(raw||'').matchAll(/\(([^()]*)\)/g)].map(m=>m[1].trim());
  for(const group of groups){
    if(/\b(?:if|use|optional|substitute|or\s+more|for\s+serving|divided)\b/i.test(group))continue;
    const np=v238FractionTokenPattern(),up=v238UnitRegex();
    const range=group.match(new RegExp(`(?:about\\s+|approximately\\s+)?(${np})\\s*(${up})\\s*(?:–|-|to)\\s*(${np})\\s*(${up})`,'i'));
    if(range){const a=v238MetricValue(parseNumericExpression(range[1]),range[2]),b=v238MetricValue(parseNumericExpression(range[3]),range[4]);if(a&&b&&a.unit===b.unit)return{amount:(a.value+b.value)/2,unit:a.unit,estimated:true,note:`Range midpoint from (${group})`};}
    const m=group.match(new RegExp(`^(?:about\\s+|approximately\\s+)?(${np})\\s*(?:(?:packed|heaped|level)\\s+)?(${up})\\b(?:\\s+of\\s+[^,;]+)?$`,'i'));
    if(m)return{amount:parseNumericExpression(m[1]),unit:canonicalUnit(m[2]),estimated:/about|approximately/i.test(group),note:`Equivalent from (${group})`};
  }
  return null;
}
function v238CleanFoodName(value){
  let text=v238NormaliseTypography(value),previous='';
  while(previous!==text){previous=text;text=text.replace(/\([^()]*\)|\[[^\[\]]*\]|\{[^{}]*\}/g,' ');}
  text=text.replace(/[\(\[\{][^\)\]\}]*$/g,' ')
    .replace(/\b(?:cut|slice|sliced|chop|chopped|dice|diced|mince|minced|grate|grated|shred|shredded|crush|crushed|tear|torn)\s+(?:into|in)\b.*$/i,' ')
    .replace(/(?:,|;)\s*(?:(?:very\s+)?(?:finely|roughly|coarsely|thinly|thickly|freshly)|(?:chopped|diced|sliced|minced|grated|shredded|crushed|peeled|seeded|deseeded|cored|trimmed|washed|rinsed|drained|thawed|softened|melted|halved|quartered|cubed|julienned|spiralized|spiralised|zested|juiced|pitted|divided|optional|to\s+taste|for\s+garnish(?:ing)?|to\s+serve)|(?:small|medium|large)\b|\d+(?:\.\d+)?\s*(?:mm|cm|m|inch|inches|\")\b).*$/i,' ')
    .replace(/\b(?:very\s+juicy|at\s+room\s+temperature|for\s+garnish(?:ing)?|for\s+serving|to\s+serve|to\s+taste|to\s+finish|as\s+needed)\b.*$/i,' ')
    .replace(/\b(?:very\s+)?(?:finely|roughly|coarsely|thinly|thickly)\s+(?:chopped|diced|sliced|minced|grated|shredded|crushed|julienned)\b/gi,' ')
    .replace(/\bfreshly\s+(?:cracked|ground|grated|squeezed|chopped|minced)\b/gi,' ')
    .replace(/\b(?:chopped|diced|sliced|minced|grated|shredded|crushed|peeled|pitted|seeded|deseeded|cored|trimmed|washed|rinsed|drained|thawed|softened|melted|halved|quartered|cubed|julienned|spiralized|spiralised|zested|juiced|torn)\b/gi,' ')
    .replace(/^[\s.,;:()\[\]{}\-]+|[\s.,;:()\[\]{}\-]+$/g,' ').replace(/\s+/g,' ').trim();
  return text;
}
function stripIngredientAnnotations(value){return v238CleanFoodName(value);}
function cleanIngredientSearchText(value){
  let text=v238CleanFoodName(value)
    .replace(/^\s*(?:full\s+)?(?:sheets?|balls?|loaves?|blocks?|boxes?|packs?|packets?|cans?|jars?|bottles?|rashers?|fillets?|portions?)\s+(?:of\s+)?/i,' ')
    .replace(/\b(?:about|approximately|heaped|level|packed)\b/gi,' ');
  return text.replace(/\s+/g,' ').trim();
}
function normaliseFoodName(value,{loose=false}={}){
  let text=cleanIngredientSearchText(value).toLowerCase().replace(/&amp;/g,' and ').replace(/\byoghurt\b/g,' yogurt ').replace(/\blow[-\s]?sodium\b/g,' ').replace(/\bjuice\s+of\b/g,' juice ');
  FOOD_SYNONYM_REPLACEMENTS.forEach(([pattern,replacement])=>{text=text.replace(pattern,replacement);});
  const irregular={tomatoes:'tomato',potatoes:'potato',leaves:'leaf',knives:'knife',halves:'half',loaves:'loaf',chillies:'chili',chilies:'chili',berries:'berry',strawberries:'strawberry',peaches:'peach',shallots:'shallot',olives:'olive',crackers:'cracker',tortillas:'tortilla',groaties:'groat'};
  const words=text.replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(Boolean).filter(w=>!PREP_WORDS.has(w));
  return words.filter(w=>!loose||!FOOD_DESCRIPTOR_WORDS.has(w)).map(w=>irregular[w]||(w.endsWith('ies')?w.slice(0,-3)+'y':w.endsWith('oes')?w.slice(0,-2):w.endsWith('ses')&&w.length>5?w.slice(0,-2):w.endsWith('s')&&!w.endsWith('ss')&&w.length>4?w.slice(0,-1):w)).join(' ').trim();
}
function v238IngredientObject(raw,amount='',unit='',name='',notes='',estimated=false){return{sourceLine:raw,amount:amount===''?'':toNum(amount),unit:canonicalUnit(unit),name:v238CleanFoodName(name||raw),notes,estimated:Boolean(estimated)};}
function parseIngredientLine(line){
  const raw=v238NormaliseTypography(String(line||'').replace(/^[\s•·▪◦*–—-]+/,''));
  if(!raw)return v238IngredientObject(raw);
  if(/^[A-Za-z'’][^:]{0,70}:$/.test(raw))return v238IngredientObject(raw,'','',raw.replace(/:$/,''),'Section heading');
  const np=v238FractionTokenPattern(),up=v238UnitRegex(),equivalent=v238ParentheticalEquivalentEligible(raw)?v238EquivalentFromParentheses(raw):null,withoutParens=raw.replace(/\([^()]*\)/g,' ').replace(/\s+/g,' ').trim();
  let m=withoutParens.match(new RegExp(`^(${np})\\s*(kg|g|mg|lb|oz|l|ml|cup|tbsp|tsp)\\s*(?:–|-|to)\\s*(${np})\\s*(kg|g|mg|lb|oz|l|ml|cup|tbsp|tsp)\\s+(.+)$`,'i'));
  if(m){const a=v238MetricValue(parseNumericExpression(m[1]),m[2]),b=v238MetricValue(parseNumericExpression(m[3]),m[4]);if(a&&b&&a.unit===b.unit)return v238IngredientObject(raw,(a.value+b.value)/2,a.unit,m[5],`Range midpoint: ${m[1]} ${m[2]}–${m[3]} ${m[4]}`,true);}
  m=withoutParens.match(new RegExp(`^(${np})[–\\-\\s]*(kg|kilograms?|g|grams?|mg|milligrams?|lb|lbs?|pounds?|oz|ounces?|l|litres?|liters?|ml|millilitres?|milliliters?)[–\\-\\s]+(?:cans?|tins?|jars?|bottles?|packets?|packs?|packages?|boxes?|blocks?)\\s+(?:of\\s+)?(.+)$`,'i'));
  if(m)return v238IngredientObject(raw,parseNumericExpression(m[1]),m[2],m[3]);
  m=withoutParens.match(new RegExp(`^(${np})\\s*[x×]\\s*(${np})\\s*(kg|g|mg|l|ml|oz|lb)\\b\\s*(?:cans?|tins?|packs?|packages?)?\\s*(?:of\\s+)?(.*)$`,'i'));
  if(m)return v238IngredientObject(raw,toNum(parseNumericExpression(m[1]))*toNum(parseNumericExpression(m[2])),m[3],m[4]);
  m=raw.match(new RegExp(`^(${np})\\s*\\(\\s*(${np})\\s*(kg|g|mg|l|ml|oz|lb)\\s*\\)\\s*(?:cans?|tins?|packs?|packets?|packages?|jars?|bottles?|boxes?|blocks?)?\\s*(?:of\\s+)?(.*)$`,'i'));
  if(m)return v238IngredientObject(raw,toNum(parseNumericExpression(m[1]))*toNum(parseNumericExpression(m[2])),m[3],m[4]);
  m=withoutParens.match(new RegExp(`^(${np})\\s*(?:cans?|tins?|packs?|packets?|packages?|jars?|bottles?|boxes?|blocks?)\\s*(${np})\\s*(kg|g|mg|l|ml|oz|lb)\\s*(?:of\\s+)?(.*)$`,'i'));
  if(m)return v238IngredientObject(raw,toNum(parseNumericExpression(m[1]))*toNum(parseNumericExpression(m[2])),m[3],m[4]);
  m=withoutParens.match(new RegExp(`^(juice|zest)\\s+of\\s+(${np})\\s+(?:an?\\s+)?(lime|lemon|orange)s?\\b(.*)$`,'i'));
  if(m)return v238IngredientObject(raw,parseNumericExpression(m[2]),m[3],`${m[3]} ${m[1]}`,m[4]);
  m=withoutParens.match(/^(half|quarter)\s+(?:of\s+)?(?:an?\s+)?(.+)$/i);
  if(m)return v238IngredientObject(raw,WORD_NUMBER_MAP[m[1].toLowerCase()],'each',m[2],'Fraction of one item',true);
  if(equivalent){
    let name=withoutParens.replace(new RegExp(`^${np}\\s*(?:(?:full|heaped|level|packed)\\s+)?(?:${up})?\\b\\s*(?:of\\s+)?`,'i'),'').trim();
    return v238IngredientObject(raw,equivalent.amount,equivalent.unit,name,equivalent.note,equivalent.estimated);
  }
  m=withoutParens.match(/^(?:a\s+)?(dash|drizzle|glug|crunch|knob|handful|pinch|several)\s+(?:of\s+)?(.+)$/i);
  if(m)return v238IngredientObject(raw,'',canonicalUnit(m[1]),m[2],`Quantity not precise: ${m[1]}`,true);
  if(/^(?:lots? of|plenty of|some)\s+/i.test(withoutParens))return v238IngredientObject(raw,'','',withoutParens.replace(/^(?:lots? of|plenty of|some)\s+/i,''),'Quantity not specified',true);
  m=withoutParens.match(new RegExp(`^(?:about\\s+|approximately\\s+)?(${np}(?:\\s*(?:–|-|to)\\s*${np})?)\\s*(${up})?\\b\\s*(.*)$`,'i'));
  if(m){
    const isRange=/(?:–|-|\bto\b)/i.test(m[1]),word=String(m[1]).toLowerCase().trim(),amount=WORD_NUMBER_MAP[word]!==undefined?WORD_NUMBER_MAP[word]:parseNumericExpression(m[1]);
    let unit=canonicalUnit(m[2]||'each'),name=String(m[3]||'').replace(/^of\s+/i,'').trim();
    if(!name&&unit==='clove')return v238IngredientObject(raw,amount,'each','cloves, whole','Whole clove spice; confirm this is not garlic',isRange);
    if(!name)name=withoutParens;
    const comma=name.match(/^([^,;]+)[,;]\s*(.+)$/);let notes='';if(comma){name=comma[1].trim();notes=comma[2].trim();}
    return v238IngredientObject(raw,amount,unit,name,[notes,isRange?'Range midpoint used':''].filter(Boolean).join('; '),isRange);
  }
  let name=withoutParens.replace(/^(?:optional(?:\s+for\s+garnishing)?|for\s+garnishing)\s*:\s*/i,'').replace(/\b(?:to taste|as needed|for garnish(?:ing)?|to serve)\b.*$/i,'').trim();
  return v238IngredientObject(raw,'','',name,'Quantity not specified',true);
}
function v238SplitEachLine(line){
  const raw=v238NormaliseTypography(line),np=v238FractionTokenPattern(),up=v238UnitRegex();
  const m=raw.match(new RegExp(`^(${np})\\s*(?:(?:big|good|generous)\\s+)?(${up})\\s+each(?:\\s+of)?\\s+(.+?)\\s+and\\s+(.+)$`,'i'));
  if(!m)return null;return [`${m[1]} ${m[2]} ${m[3]}`,`${m[1]} ${m[2]} ${m[4]}`];
}
function v238ExpandCompoundIngredientLine(line){
  const raw=v238NormaliseTypography(line);if(!raw)return[];
  const split=v238SplitEachLine(raw);if(split)return split;
  let m=raw.match(/^(.+?\bwater)\s+mixed\s+with\s+(.+)$/i);if(m)return[m[1],m[2]];
  m=raw.match(/^(?:zest\s+and\s+juice|juice\s+and\s+zest)\s+of\s+(.+)$/i);if(m)return[`juice of ${m[1]}`,`zest of ${m[1]}`];
  m=raw.match(/^((?:\d+\s+)?(?:\d+\/\d+|\d+(?:\.\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞]))\s+(lime|lemon|orange)s?\s*,?\s*juiced\s+and\s+zested(?:\s*\(([^)]*)\))?/i);
  if(m){
    const details=m[3]||'',amount=m[1],fruit=m[2];
    const juice=details.match(/((?:\d+\s+)?(?:\d+\/\d+|\d+(?:\.\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞]))\s*(tbsp|tablespoons?|tsp|teaspoons?|ml)\s+(?:of\s+)?juice/i);
    const zest=details.match(/((?:\d+\s+)?(?:\d+\/\d+|\d+(?:\.\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞]))\s*(tbsp|tablespoons?|tsp|teaspoons?|ml)\s+(?:of\s+)?zest/i);
    return[juice?`${juice[1]} ${juice[2]} ${fruit} juice`:`juice of ${amount} ${fruit}`,zest?`${zest[1]} ${zest[2]} ${fruit} zest`:`zest of ${amount} ${fruit}`];
  }
  const saltPepper=raw.match(/^(?:(sea|rock|pink|himalayan)\s+)?salt\s+and\s+(?:freshly\s+ground\s+)?(?:black\s+)?pepper(?:\s+to\s+taste)?$/i);
  if(saltPepper)return[`${saltPepper[1]||''} salt`.trim(), 'black pepper'];
  if(/^salt\s+and\s+(?:black\s+)?pepper\s+to\s+taste$/i.test(raw))return['salt to taste','black pepper to taste'];
  return[raw];
}
function expandImportedIngredientLines(lines){return(lines||[]).flatMap(v238ExpandCompoundIngredientLine).map(v238NormaliseTypography).filter(Boolean);}
function recipeFromImportedData(data,sourceType='Website'){
  const expanded=expandImportedIngredientLines(data.ingredients||[]);
  const recipe={id:'',name:data.name||'Imported recipe',category:'Imported',servings:toNum(data.servings)||1,totalKcal:0,protein:0,carbs:0,fat:0,fibre:0,sodiumMg:0,rflFriendly:'No',favourite:false,noBellPeppers:Boolean(state.settings.noBellPeppers),noShellfish:Boolean(state.settings.noShellfish),instructions:data.instructions||'',notes:'',ingredients:expanded.map(line=>{const parsed=parseIngredientLine(line),cleanName=cleanIngredientSearchText(parsed.name)||parsed.name,alternatives=ingredientAlternativeNames(cleanName);return{id:uid('ring'),ingredientId:'',name:cleanName,sourceLine:line,amount:parsed.amount,unit:parsed.unit||'',grams:'',matchStatus:alternatives.length>1?'choose-alternative':'unmatched',matchConfidence:0,alternativeOptions:alternatives,selectedAlternative:'',measureEstimated:Boolean(parsed.estimated),measureNote:parsed.estimated?parsed.notes||'Imported estimate':'',kcal:'',protein:'',carbs:'',fat:'',fibre:'',sodiumMg:'',notes:parsed.notes||'',updatedAt:nowISO()};}),calculateFromIngredients:true,sourceType,sourceName:data.sourceName||'',sourceUrl:data.sourceUrl||'',sourceAuthor:data.author||'',sourceBook:data.bookTitle||'',importedAt:nowISO(),prepTime:data.prepTime||'',cookTime:data.cookTime||'',totalTime:data.totalTime||'',yieldText:data.yieldText||'',finishedWeightG:'',nutritionConfidence:'Low',importStatus:data.extractionStatus==='method-only'?'Needs review':'Needs review',tags:Array.isArray(data.tags)?data.tags:[],imageUrl:data.imageUrl||'',sourceNutrition:data.nutrition||{},extractionStatus:data.extractionStatus||'',extractionWarnings:data.warnings||[],updatedAt:nowISO()};normaliseRecipeRecord(recipe);return recipe;
}
function referenceFoodQuery(value){
  let q=normaliseFoodName(value,{loose:true});const replacements=[[/\bsoy sauce\b.*/,'soy sauce'],[/\bcucumber\b.*/,'cucumber raw'],[/\bsalt\b.*/,'salt'],[/\brice vinegar\b.*/,'rice vinegar'],[/\bsesame oil\b.*/,'sesame oil'],[/\bchili paste\b.*/,'chili paste'],[/\bchilli paste\b.*/,'chili paste'],[/\blime juice\b.*/,'lime juice'],[/\blemon juice\b.*/,'lemon juice'],[/\bshrimp\b.*/,'shrimp cooked'],[/\bcoriander\b.*/,'coriander raw'],[/\bvanilla extract\b.*/,'vanilla extract']];
  replacements.forEach(([r,v])=>{if(r.test(q))q=v;});return q||cleanIngredientSearchText(value);
}
function autoMatchRecipeIngredients(recipe){
  normaliseRecipeRecord(recipe);recipe.ingredients.forEach(ing=>{
    if(ing.notes==='Section heading')return;if(ing.ingredientId){recalculateRecipeIngredient(ing);return;}
    const alternatives=ingredientChoiceOptions(ing);if(alternatives.length>1&&!ing.selectedAlternative){ing.matchStatus='choose-alternative';return;}
    const query=ingredientMatchQuery(ing),normal=normaliseFoodName(query,{loose:true});if(V238_GENERIC_AMBIGUOUS_FOODS.has(normal)){ing.matchStatus='unmatched';return;}
    const matches=localFoodMatches(query,4);if(matches[0]&&matches[0].score>=64){const lead=matches[0].score-(matches[1]?.score||0);if(matches[0].score<90&&lead<8){ing.matchStatus='unmatched';return;}applyIngredientMatch(ing,matches[0].item,matches[0].score>=92&&matches[0].item.confirmed?'confirmed':'likely',matches[0].score);}
  });return recipe;
}


function htmlTextLines(el){
  if(!el)return[];
  const clone=el.cloneNode(true),separator='\uE000';
  clone.querySelectorAll('br').forEach(br=>br.replaceWith(separator));
  return String(clone.textContent||'').split(separator).map(x=>x.replace(/\s+/g,' ').trim()).filter(Boolean);
}
function resolveZipTarget(base,relative){
  const raw=String(relative||''),hash=raw.indexOf('#'),pathPart=hash>=0?raw.slice(0,hash):raw,fragment=hash>=0?decodeURIComponent(raw.slice(hash+1)):'';
  const path=resolveZipPath(base,pathPart);return{path,fragment,key:fragment?`${path}#${fragment}`:path};
}
function v238IndexLabel(container){
  const clone=container.cloneNode(true);clone.querySelectorAll('a,sup').forEach(x=>x.remove());
  return cleanRecipeTitle(String(clone.textContent||'').replace(/\bref\d+\b/gi,'').replace(/\s*[,;]\s*$/,'').replace(/\s+/g,' ').trim());
}
async function extractEpubNavigationLabels(zip,opfPath,manifest){
  const labels=new Map();const add=(base,href,label)=>{const clean=cleanRecipeTitle(label);if(!href||!clean)return;const target=resolveZipTarget(base,href);labels.set(target.key,clean);if(!target.fragment&&!labels.has(target.path))labels.set(target.path,clean);};
  const navItem=Object.values(manifest).find(x=>String(x.properties||'').split(/\s+/).includes('nav'));
  if(navItem){const navPath=resolveZipPath(opfPath,navItem.href),entry=zip.file(navPath);if(entry){try{const doc=new DOMParser().parseFromString(await entry.async('text'),'text/html');doc.querySelectorAll('nav a[href],a[href]').forEach(a=>add(navPath,a.getAttribute('href'),a.textContent));}catch{}}}
  const ncxItem=Object.values(manifest).find(x=>/dtbncx/i.test(x.type||''));
  if(ncxItem){const ncxPath=resolveZipPath(opfPath,ncxItem.href),entry=zip.file(ncxPath);if(entry){try{const doc=new DOMParser().parseFromString(await entry.async('text'),'application/xml');[...doc.getElementsByTagNameNS('*','navPoint')].forEach(point=>{const href=[...point.getElementsByTagNameNS('*','content')][0]?.getAttribute('src'),label=[...point.getElementsByTagNameNS('*','text')][0]?.textContent;add(ncxPath,href,label);});}catch{}}}
  const htmlItems=Object.values(manifest).filter(x=>/xhtml|html/i.test(x.type||''));
  for(const item of htmlItems){
    const path=resolveZipPath(opfPath,item.href),entry=zip.file(path);if(!entry)continue;
    let html='';try{html=await entry.async('text');}catch{continue;}if(!/class=["'][^"']*index(?:3|7)/i.test(html))continue;
    const doc=new DOMParser().parseFromString(html,'text/html');doc.querySelectorAll('.index3,.index7').forEach(row=>{const label=v238IndexLabel(row);if(!label)return;row.querySelectorAll('a[href]').forEach(a=>add(path,a.getAttribute('href'),label));});
  }
  return labels;
}

function v238NonRecipeTitle(value){
  const t=v238NormaliseTypography(value).toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
  return [
    /^my 8 fad-free!! nutrition principles$/,/^start where you are$/,/^buy in bulk$/,/^sort and store$/,/^par-cook, freeze, preserve$/,
    /^things i like to do with my ice-cube tray$/,/^use your leftovers$/,/^first, use your leftover sugar$/,/^pack up your scraps as you go$/,/^regrow your butt$/,
    /^keep off the sugar, of course$/,/^get loose and break the rules$/,/^build your meals right$/,/^create your own flows$/,/^share, brag, connect$/,
    /^precooked eggs and bacon$/,/^a whole bunch of sauces, dressings and pestos$/,/^three winter spice breakfast ideas$/,
    /^pumpkin spice butter served here with porridge and nuts$/,/^four\s*[–-]\s*ingredient \(or less\) toasties:/,/^the new green ["']zmoothie["']$/,
    /^a week of lunchboxes:/,/^here's how i shape my bowls$/,/^know your leafy greens$/,/^cheat roast dinners$/,/^a page of soup toppers$/,
    /^four healing things to do with a cup of homemade stock$/,/^three clean digestive cocktails$/,/^my spectacular popstick cake$/,/^kombucha$/,/^gut-giving gummies$/,
    /^a tidy little shopping list$/,/^substitutions$/,/^quick fixes$/,/^your definitive guide to sugar and safe sweeteners$/,/^very frequently asked questions all in one spot$/,/^the last bit before we kick into cooking, i promise$/,/^embrace the sunday cook-up$/,/^substitutions and fixes$/,/^bonus step!?$/
  ].some(pattern=>pattern.test(t));
}
function cleanRecipeTitle(value,bookTitle=''){
  let title=v238NormaliseTypography(value).replace(/^(?:recipe|chapter)\s*\d*\s*[:.\-–—]?\s*/i,'').replace(/^\d+[.)]\s*/,'').trim();
  if(!title||title.length<3||title.length>150||v238NonRecipeTitle(title))return'';
  if(/^(?:contents?|table of contents|ingredients?|method|directions?|instructions?|preparation|recipe|serves?|yield|introduction|copyright|acknowledg(?:e)?ments?|general index|a mindful leftovers index)\s*:?$/i.test(title))return'';
  if(/^(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/i.test(title))return'';
  if(/^(?:make it|use the leftover|five ways|ten days|ayurveda|sourcing|why |tips?\b|the ayurvedic pov)/i.test(title))return'';
  if(bookTitle&&normaliseFoodName(title)===normaliseFoodName(bookTitle))return'';
  return title;
}
function v238BlockClass(el){return String(el?.className||'').toLowerCase().split(/\s+/).filter(Boolean)[0]||'';}
function v238IsRecipeTitleBlock(block){
  if(!block)return false;const cls=block.className||'';if(/^h[1-3]$/.test(block.tag))return Boolean(cleanRecipeTitle(block.text));
  if(V238_EPUB_TITLE_CLASSES.has(cls))return Boolean(cleanRecipeTitle(block.text));
  return /recipe[-_ ]?(?:title|name)/i.test(`${block.el?.className||''} ${block.el?.id||''}`)&&Boolean(cleanRecipeTitle(block.text));
}
function recipePageBlocks(doc){
  const nodes=[...doc.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,dt,dd,figcaption')],out=[];
  nodes.forEach(el=>{
    if(el.closest('nav,header,footer,[role="navigation"]'))return;
    const ownId=el.id||el.querySelector(':scope > a[id],:scope > span[id]')?.id||'',className=v238BlockClass(el),tag=el.tagName.toLowerCase();
    htmlTextLines(el).forEach(text=>{if(text.length>700)return;out.push({el,tag,className,anchorId:ownId,heading:/^h[1-6]$/.test(tag)||V238_EPUB_TITLE_CLASSES.has(className)||isIngredientHeading(text)||isInstructionHeading(text),text});});
  });return out;
}
function v238YieldText(text){return /^(?:serves?|servings?|yield|makes|makes about|feeds)\b/i.test(String(text||'').trim());}
function v238NutritionBadge(text){return /^\d+(?:\.\d+)?\s+(?:serve|serves?)\s+(?:veg|fruit|protein|goodness)|^(?:sugar|carb|protein|fat)\s*:/i.test(String(text||'').trim());}
function isLikelyIngredientText(text){
  const t=v238NormaliseTypography(text);if(!t||t.length>260||isIngredientHeading(t)||isInstructionHeading(t)||v238YieldText(t)||v238NutritionBadge(t)||v238LooksLikeMethodText(t))return false;
  const parsed=parseIngredientLine(t);if(parsed.notes==='Section heading')return true;
  const beginsLikeIngredient=new RegExp(`^(?:about\\s+|approximately\\s+)?(?:${v238FractionTokenPattern()}\\b|(?:a\\s+)?(?:dash|drizzle|glug|crunch|knob|handful|pinch|several)\\b|(?:juice|zest)\\s+of\\b)`,'i').test(t);
  if(parsed.amount!==''&&parsed.name&&normaliseFoodName(parsed.name)&&beginsLikeIngredient)return true;
  if(/\b(salt|pepper|water|oil|vinegar|herbs?|spices?|eggs?|stock|bones?|carcasses?|rinds?|whey|milk|cream|flour|sugar)\b/i.test(t)&&t.split(/\s+/).length<20&&!/[.!?]\s+[A-Z]/.test(t))return true;
  return /\b(to taste|as needed|for garnish|optional)\b/i.test(t)&&t.split(/\s+/).length<20;
}
function instructionTextScore(text){
  const t=v238NormaliseTypography(text);let score=0;if(/^\d+[.)]\s*/.test(t))score+=3;
  if(/\b(add|arrange|bake|beat|blend|blitz|bloom|boil|bring|brush|chill|chop|combine|cook|cover|cut|divide|drain|fold|freeze|fry|grill|heat|leave|marinate|mix|place|pour|preheat|process|reduce|remove|rinse|roast|season|serve|slice|soak|spread|stir|strain|store|top|toss|transfer|wash|whisk)\b/i.test(t))score+=2;
  if(t.length>45)score++;return score;
}
function v238RecipeStatus(ingredients,instructions){if(ingredients.length>=2&&instructions.length)return'ready';if(ingredients.length&&instructions.length)return'needs-review';if(instructions.length)return'method-only';return'incomplete';}
function v238SegmentRecipe(blocks,start,end,titleHint,bookTitle,navigationLabels=new Map(),path=''){
  const titleBlock=blocks[start],directTitle=cleanRecipeTitle(titleBlock.text,bookTitle),anchorTitle=titleBlock.anchorId?navigationLabels.get(`${path}#${titleBlock.anchorId}`)||'':'',name=directTitle||cleanRecipeTitle(anchorTitle,bookTitle)||cleanRecipeTitle(titleHint,bookTitle);if(!name)return null;
  const segment=blocks.slice(start+1,end),warnings=[];let yieldText='',servings=1;
  for(const b of segment){if(v238YieldText(b.text)){yieldText=b.text;servings=parseServingCount(b.text);break;}}
  let ingredients=[],ingredientStarted=false,methodStarted=false,instructions=[];
  for(const b of segment){
    if(v238YieldText(b.text)||v238NutritionBadge(b.text))continue;
    if(isIngredientHeading(b.text)){ingredientStarted=true;methodStarted=false;continue;}
    if(isInstructionHeading(b.text)){methodStarted=true;continue;}
    if(V238_EPUB_STOP_CLASSES.has(b.className)&&ingredients.length)break;
    const ingredientClass=/^(?:textbreak1|textbreak4|ingredient|ingredients)$/i.test(b.className);
    if(!methodStarted&&isLikelyIngredientText(b.text)&&(ingredientClass||ingredientStarted||b.text.split(/\s+/).length<22)){ingredientStarted=true;ingredients.push(b.text);continue;}
    if((methodStarted||ingredients.length)&&instructionTextScore(b.text)>0){methodStarted=true;instructions.push(b.text);continue;}
  }
  if(!ingredients.length)ingredients=segment.filter(b=>/^(?:textbreak1|textbreak4)$/i.test(b.className)&&isLikelyIngredientText(b.text)).map(b=>b.text);
  if(!instructions.length)instructions=segment.filter(b=>instructionTextScore(b.text)>1&&!v238YieldText(b.text)).map(b=>b.text).slice(0,40);
  ingredients=cleanRecipeLines(ingredients).filter(x=>!v238YieldText(x)&&!v238NutritionBadge(x));instructions=cleanRecipeLines(instructions);
  const status=v238RecipeStatus(ingredients,instructions);if(status==='incomplete')return null;
  if(status==='method-only')warnings.push('No conventional ingredient list was detected on this page.');
  if(status==='needs-review')warnings.push('Only one ingredient line was detected.');
  return{name,ingredients:[...new Set(ingredients)],instructions:[...new Set(instructions)].join('\n'),servings,yieldText,nutrition:{},extractionStatus:status,warnings};
}
function extractRecipesFromHtmlDocument(doc,titleHint='',bookTitle='',options={}){
  const structured=[];doc.querySelectorAll('script[type="application/ld+json"]').forEach(script=>{try{collectStructuredRecipeObjects(JSON.parse(script.textContent),structured);}catch{}});
  if(structured.length)return structured.map(structuredRecipeObjectToData);
  const blocks=recipePageBlocks(doc),titleIndexes=[];blocks.forEach((b,i)=>{if(v238IsRecipeTitleBlock(b))titleIndexes.push(i);});
  const out=[];
  for(let n=0;n<titleIndexes.length;n++){
    const start=titleIndexes[n],end=titleIndexes[n+1]??blocks.length,candidate=v238SegmentRecipe(blocks,start,end,titleHint,bookTitle,options.navigationLabels||new Map(),options.path||'');if(candidate)out.push(candidate);
  }
  if(!out.length){
    const semantic=extractSemanticRecipe(doc,titleHint,bookTitle);if(semantic)out.push({...semantic,extractionStatus:'ready',warnings:[]});
  }
  if(!out.length){
    const ingredientIndexes=[];blocks.forEach((b,i)=>{if(isIngredientHeading(b.text))ingredientIndexes.push(i);});
    ingredientIndexes.forEach((i,idx)=>{let method=-1;for(let j=i+1;j<blocks.length;j++){if(isInstructionHeading(blocks[j].text)){method=j;break;}if(idx+1<ingredientIndexes.length&&j>=ingredientIndexes[idx+1])break;}const end=method>0?method:(idx+1<ingredientIndexes.length?ingredientIndexes[idx+1]:Math.min(blocks.length,i+50)),ingredients=cleanRecipeLines(blocks.slice(i+1,end).map(b=>b.text)).filter(isLikelyIngredientText),instructions=cleanRecipeLines(blocks.slice(method>0?method+1:end,Math.min(blocks.length,(method>0?method:end)+45)).map(b=>b.text)).filter(x=>instructionTextScore(x)>0);if(ingredients.length&&instructions.length)out.push({name:bestRecipeTitleBefore(blocks,i,titleHint,bookTitle),ingredients,instructions:instructions.join('\n'),servings:parseEpubServing(doc),yieldText:'',nutrition:{},extractionStatus:ingredients.length>=2?'ready':'needs-review',warnings:[]});});
  }
  return dedupeRecipeData(out);
}
async function extractRecipesFromEpub(file){
  const zip=await JSZip.loadAsync(file);let opfPath='';const container=await zip.file('META-INF/container.xml')?.async('text').catch(()=>null);
  if(container){const doc=new DOMParser().parseFromString(container,'application/xml');opfPath=doc.querySelector('rootfile')?.getAttribute('full-path')||'';}
  if(!opfPath)opfPath=Object.keys(zip.files).find(x=>x.toLowerCase().endsWith('.opf'))||'';if(!opfPath)throw new Error('This file does not contain a readable EPUB package document.');
  const opfText=await zip.file(opfPath)?.async('text');if(!opfText)throw new Error('The EPUB package document could not be opened.');
  const opf=new DOMParser().parseFromString(opfText,'application/xml'),byTag=name=>[...opf.getElementsByTagNameNS('*',name)];
  const title=byTag('title')[0]?.textContent?.trim()||file.name.replace(/\.epub$/i,''),author=byTag('creator')[0]?.textContent?.trim()||'',manifest={};
  byTag('item').forEach(item=>manifest[item.getAttribute('id')]={id:item.getAttribute('id'),href:item.getAttribute('href'),type:item.getAttribute('media-type'),properties:item.getAttribute('properties')||''});
  const navigationLabels=await extractEpubNavigationLabels(zip,opfPath,manifest);
  let hrefs=byTag('itemref').map(x=>manifest[x.getAttribute('idref')]?.href).filter(Boolean);if(!hrefs.length)hrefs=Object.values(manifest).filter(x=>/xhtml|html/.test(x.type||'')).map(x=>x.href);hrefs=[...new Set(hrefs)].slice(0,1200);
  const recipes=[],seen=new Set();let readableChapters=0,scanned=0,methodOnly=0,needsReview=0;
  for(const href of hrefs){
    const path=resolveZipPath(opfPath,href),entry=zip.file(path)||zip.file(path.replace(/%20/g,' '));if(!entry)continue;scanned++;
    let html='';try{html=await entry.async('text');}catch{continue;}if(!html.trim())continue;
    const doc=new DOMParser().parseFromString(html,'text/html'),bodyText=String(doc.body?.textContent||'').replace(/\s+/g,' ').trim();if(bodyText.length>80)readableChapters++;
    const pathLabels=[...navigationLabels.entries()].filter(([key])=>key===path||key.startsWith(`${path}#`)).map(([,value])=>value),navLabel=navigationLabels.get(path)||pathLabels[0]||'',titleHint=epubTitleCandidate(doc,navLabel||path,title);
    for(const data of extractRecipesFromHtmlDocument(doc,titleHint,title,{navigationLabels,path})){
      const key=`${normaliseFoodName(data.name)}|${(data.ingredients||[]).slice(0,3).map(normaliseFoodName).join('|')}`;if(!data.name||seen.has(key))continue;seen.add(key);
      if(data.extractionStatus==='method-only')methodOnly++;if(data.extractionStatus==='needs-review')needsReview++;
      recipes.push({...data,sourceName:title,bookTitle:title,author,chapterTitle:navLabel||titleHint,sourcePath:path});if(recipes.length>=600)break;
    }
    if(recipes.length>=600)break;
  }
  if(!recipes.length)throw new Error(`No recipes were detected after scanning ${scanned} EPUB chapters (${readableChapters} contained readable text). This book may use image-only pages or an unusual layout; try another EPUB or paste a recipe chapter for review.`);
  const bestByNameAndPage=new Map();
  recipes.forEach(recipe=>{
    const key=`${recipe.sourcePath||''}|${normaliseFoodName(recipe.name)}`;
    const score=(recipe.extractionStatus==='ready'?1000:recipe.extractionStatus==='needs-review'?500:100)+(recipe.ingredients||[]).length*10+String(recipe.instructions||'').split(/\n/).filter(Boolean).length;
    const current=bestByNameAndPage.get(key);if(!current||score>current.score)bestByNameAndPage.set(key,{score,recipe});
  });
  const finalRecipes=[...bestByNameAndPage.values()].map(x=>x.recipe),finalMethodOnly=finalRecipes.filter(x=>x.extractionStatus==='method-only').length,finalNeedsReview=finalRecipes.filter(x=>x.extractionStatus==='needs-review').length;
  return{meta:{title,author,fileName:file.name,scannedChapters:scanned,readableChapters,methodOnly:finalMethodOnly,needsReview:finalNeedsReview},recipes:finalRecipes};
}
function epubTitleCandidate(doc,pathOrHint='',bookTitle=''){
  const selectors='[itemprop="name"],.recipe-title,.recipe_title,.recipetitle,[class*="recipe-name" i],[id*="recipe-title" i],h1,h2,h3,.head2,.head5,.head14,.head15,.head17,.head19,.textbreak1p,[role="heading"],[epub\\:type*="title"]';
  const candidates=[...doc.querySelectorAll(selectors)].map(x=>cleanRecipeTitle(x.textContent,bookTitle)).filter(Boolean),docTitle=cleanRecipeTitle(doc.title,bookTitle),hint=cleanRecipeTitle(String(pathOrHint).split('/').pop().replace(/\.[^.]+$/,'').replace(/[_-]+/g,' '),bookTitle);
  return candidates[0]||docTitle||hint||'Imported recipe';
}
function v238EpubStatusLabel(candidate){
  const status=candidate.extractionStatus||v238RecipeStatus(candidate.ingredients||[],String(candidate.instructions||'').split(/\n/).filter(Boolean));
  return status==='ready'?{text:'Ready',cls:'good'}:status==='method-only'?{text:'Method only',cls:'warn'}:{text:'Review',cls:'warn'};
}
function renderEpubCandidateList(){
  const box=document.getElementById('epubCandidateList');if(!box)return;const query=normaliseFoodName(document.getElementById('epubFilter')?.value||'',{loose:true}),duplicateNames=new Set(state.recipes.map(r=>normaliseFoodName(r.name))),sameNameCount=new Map();epubImportCandidates.forEach(r=>sameNameCount.set(normaliseFoodName(r.name),(sameNameCount.get(normaliseFoodName(r.name))||0)+1));
  box.innerHTML=epubImportCandidates.map((r,i)=>({r,i})).filter(({r})=>!query||normaliseFoodName(`${r.name} ${r.chapterTitle} ${(r.ingredients||[]).slice(0,3).join(' ')}`,{loose:true}).includes(query)).map(({r,i})=>{const duplicate=duplicateNames.has(normaliseFoodName(r.name)),repeated=(sameNameCount.get(normaliseFoodName(r.name))||0)>1,status=v238EpubStatusLabel(r),checked=!duplicate&&r.extractionStatus==='ready';return`<div class="epub-candidate" data-epub-card="${i}"><input type="checkbox" data-epub-index="${i}" ${checked?'checked':''}><span><input class="epub-name-input" data-epub-name="${i}" value="${esc(r.name)}" oninput="epubImportCandidates[${i}].name=this.value.trim()" aria-label="Recipe name"><small>${(r.ingredients||[]).length} ingredients · ${String(r.instructions||'').split(/\n/).filter(Boolean).length} steps${duplicate?' · already saved':''}${repeated?' · repeated title':''}</small><small>${esc(r.yieldText||r.chapterTitle||'')}${r.warnings?.length?` · ${esc(r.warnings.join(' '))}`:''}</small></span><span class="pill ${duplicate?'warn':status.cls}">${duplicate?'Duplicate?':status.text}</span></div>`;}).join('')||'<div class="empty">No recipes match this search.</div>';
}
function showEpubReview(){
  const ready=epubImportCandidates.filter(r=>r.extractionStatus==='ready').length,review=epubImportCandidates.filter(r=>r.extractionStatus==='needs-review').length,method=epubImportCandidates.filter(r=>r.extractionStatus==='method-only').length;
  showModal(`<div class="card-title"><span>EPUB recipes</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="notice"><strong>${esc(epubImportMeta?.title||'Cookbook')}</strong>${epubImportMeta?.author?` · ${esc(epubImportMeta.author)}`:''}<br>${epubImportCandidates.length} candidates from ${epubImportMeta?.readableChapters||'—'} readable chapters. Names remain editable before import.</div><div class="epub-review-summary"><span class="pill good">${ready} ready</span><span class="pill warn">${review} review</span><span class="pill gray">${method} method only</span></div><label class="epub-filter">Filter recipes<input id="epubFilter" type="search" placeholder="Search title or ingredient" oninput="renderEpubCandidateList()"></label><div class="button-row epub-review-toolbar"><button class="secondary compact" onclick="selectEpubRecipes('ready')">Select ready</button><button class="ghost compact" onclick="selectEpubRecipes('all')">Select all</button><button class="ghost compact" onclick="selectEpubRecipes('none')">Clear</button></div><div class="epub-review-list" id="epubCandidateList"></div><button style="margin-top:10px" onclick="commitEpubImport()">Import selected recipes</button>`);renderEpubCandidateList();
}
function selectEpubRecipes(mode){document.querySelectorAll('[data-epub-index]').forEach(x=>{const row=epubImportCandidates[toNum(x.dataset.epubIndex)];x.checked=mode==='all'||(mode==='ready'&&row?.extractionStatus==='ready');});}
function toggleAllEpubRecipes(value){selectEpubRecipes(value?'all':'none');}
function commitEpubImport(){
  const indexes=[...document.querySelectorAll('[data-epub-index]:checked')].map(x=>toNum(x.dataset.epubIndex));if(!indexes.length)return showToast('Select at least one recipe');let added=0,review=0;
  indexes.forEach(i=>{const data=epubImportCandidates[i];if(!data)return;const edited=document.querySelector(`[data-epub-name="${i}"]`)?.value?.trim();if(edited)data.name=edited;if(!data.name)data.name=`Recipe ${i+1}`;const recipe=recipeFromImportedData(data,'EPUB');autoMatchRecipeIngredients(recipe);const confidence=recipeNutritionConfidence(recipe);recipe.nutritionConfidence=confidence.label;recipe.importStatus=confidence.label==='Low'||data.extractionStatus!=='ready'?'Needs review':'Ready';recipe.id=uid('recipe');state.recipes.push(recipe);added++;if(recipe.importStatus==='Needs review')review++;});
  const recipeNames=new Map(state.recipes.map(r=>[normaliseFoodName(r.name),r]));state.recipes.slice(-added).forEach(recipe=>recipe.ingredients.forEach(ing=>{if(ing.ingredientId)return;const linked=recipeNames.get(normaliseFoodName(ing.name));if(linked&&linked.id!==recipe.id){ing.matchStatus='sub-recipe';ing.notes=[ing.notes,`Sub-recipe: ${linked.name}`].filter(Boolean).join('; ');}}));
  saveState();closeModal();setPage('diet');showToast(`${added} recipes imported${review?` · ${review} need review`:''}`,5000);
}
