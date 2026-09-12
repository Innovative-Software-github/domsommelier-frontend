const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const base = 'src/app/product/[productId]/components/ProductInformationContainer/ProductInformation/';
function load(file) { const module = {exports:{}}; new Function('module','exports',ts.transpileModule(fs.readFileSync(base+file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(module,module.exports); return module.exports; }
const {extendedInformation, duration} = load('ExtendedInformation/data.ts');
const {getGeneralInformationData} = load('GeneralInformation/utils.ts');
const ref = label => ({code:'test',label});
const wine = details => ({productCategoryName:'wine',article:'W1',productCountry:'Россия',details});
const texts = data => data.sections.flatMap(s=>s.rows).map(r=>r.text).join(' | ');
test('legacy products omit placeholders and empty sections',()=>{
 const p=wine({grapes:[],producer:'',volume:null});
 assert.deepEqual(extendedInformation(p),{sections:[],ratings:[]});
 assert.deepEqual(getGeneralInformationData(p).map(r=>r.property),['Артикул','Страна']);
});
test('wine renders percentages, all five ratings and serving information',()=>{
 const d=extendedInformation(wine({region:ref('Крым'),grapeComposition:[{grape:ref('Рислинг'),percent:100}],sensoryProfile:Object.fromEntries(['sweetness','acidity','body','tannins','aromaticIntensity'].map(k=>[k,{value:3}])),servingTemperature:{min:8,max:10},cellaringPotential:{minYears:3,maxYears:5,reference:'vintage'},aerationRecommendation:'not_recommended'}));
 assert.equal(d.ratings.length,5);assert.match(texts(d),/Рислинг — 100%/);assert.match(texts(d),/8–10 °C/);assert.match(texts(d),/от года урожая/);
});
test('zero percentages and false packaging are preserved',()=>{
 const p=wine({grapeComposition:[{grape:ref('Мускат'),percent:0}]});p.packaging={giftBox:false};
 assert.match(texts(extendedInformation(p)),/0%/);assert.ok(getGeneralInformationData(p).some(r=>r.text==='Нет'||r.result==='Нет'));
});
test('duration retains exclusive and one-sided boundaries',()=>{
 assert.equal(duration({min:6,max:null,minInclusive:false,maxInclusive:true}),'более 6 мес.');
 assert.equal(duration({min:null,max:12,minInclusive:true,maxInclusive:false}),'менее 12 мес.');
});
test('spirit includes whisky, cognac, serving and ordered aging stages',()=>{
 const d=extendedInformation({productCategoryName:'spirit',details:{whiskyDetails:{whiskyType:ref('Солодовый'),ageStatementStatus:'nas'},cognacDetails:{ageClassification:ref('VSOP'),originArea:ref('Коньяк')},agingStages:[{order:2,purpose:'finish',wood:ref('Дуб')},{order:1,purpose:'primary',vessel:ref('Бочка')}],servingTags:[ref('Со льдом')],sensoryRatings:[{dimension:ref('Пряность'),rating:{value:5}}]}});
 assert.match(texts(d),/VSOP/);assert.match(texts(d),/NAS/);assert.match(texts(d),/Со льдом/);
 assert.deepEqual(d.sections.filter(s=>s.title.includes('этап')).map(s=>s.title),['Основная выдержка · этап 1','Финишная выдержка · этап 2']);assert.equal(d.ratings[0].value,5);
});
test('sparkling displays method and non-vintage status',()=>{
 const d=extendedInformation({productCategoryName:'champagne_and_sparkling',details:{vintageStatus:'non_vintage',sparklingMethod:ref('Шарма')}});
 assert.match(texts(d),/Невинтажное/);assert.match(texts(d),/Шарма/);
});
