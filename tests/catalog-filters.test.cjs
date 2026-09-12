const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  const module = { exports: {} }; cache.set(file, module.exports);
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  new Function('module', 'exports', 'require', compiled)(module, module.exports, name => load(path.resolve(path.dirname(file), name + '.ts')));
  return module.exports;
}
const base = path.join(__dirname, '../src/app/catalog/[type]/utils');
const { normalizeAttributeFilters, isFilterVisible, optionValue, canonicalSelection } = load(path.join(base, 'catalogAttributeFilters.ts'));
const { parseFilterStateFromUrl } = load(path.join(base, 'parseFilterStateFromUrl.ts'));
const { stringifySearchParams } = load(path.join(__dirname, '../src/utils/stringifySearchParams.ts'));

test('switching subtype clears incompatible child conditions and retains common filters', () => {
  assert.deepEqual(normalizeAttributeFilters({ subcategory: ['Коньяк'], whiskyAge: [10, 15], cognacClassification: ['vsop'], region: ['cognac'] }), {
    subcategory: ['Коньяк'], cognacClassification: ['vsop'], region: ['cognac'],
  });
  assert.deepEqual(normalizeAttributeFilters({ subcategory: ['Виски', 'Коньяк'], whiskyType: ['single_malt'], cognacAge: [3, 5] }), { subcategory: ['Виски', 'Коньяк'] });
  assert.deepEqual(normalizeAttributeFilters({ whiskyAge: [10, 15] }), {});
});
test('only the selected single subtype exposes its dependent fields', () => {
  assert.equal(isFilterVisible({ subtype: 'whisky' }, { subcategory: ['Виски'] }), true);
  assert.equal(isFilterVisible({ subtype: 'whisky' }, { subcategory: ['Коньяк'] }), false);
  assert.equal(isFilterVisible({ subtype: 'cognac' }, { subcategory: [] }), false);
  assert.equal(isFilterVisible({}, {}), true);
});
test('new references send stable codes while legacy filters retain labels', () => {
  const option = { value: 'single_malt', label: 'Односолодовый' };
  assert.equal(optionValue({ selectionMode: 'value' }, option), 'single_malt');
  assert.equal(optionValue({}, option), 'Односолодовый');
});
test('URL roundtrip preserves open bounds, zero, reference codes and active subtype', () => {
  const filters = { subcategory: ['Виски'], whiskyAge: [null, 15], strength: [0, null], brand: ['001'], whiskyType: ['single_malt'] };
  assert.deepEqual(parseFilterStateFromUrl(new URLSearchParams(stringifySearchParams(filters))), filters);
});
test('URL reload discards hidden subtype conditions and malformed ranges', () => {
  assert.deepEqual(parseFilterStateFromUrl(new URLSearchParams('subcategory=Коньяк&whiskyAge=10&whiskyAge=20&year=nope&year=2025&sort=price_asc&page=2')), { subcategory: ['Коньяк'] });
});

test('old bookmarked grape labels remain selected under the new code-based config', () => {
  assert.deepEqual(canonicalSelection({ selectionMode: 'value', options: [{ value: 'chardonnay', label: 'Шардоне' }] }, ['Шардоне']), ['chardonnay']);
  assert.deepEqual(parseFilterStateFromUrl(new URLSearchParams('grape=001')), { grape: ['001'] });
});
