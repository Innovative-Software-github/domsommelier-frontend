const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../src/app/checkout/components/CustomerInfo/validation.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const context = { exports: {} };
vm.runInNewContext(compiled, context);
const { validateCustomerName, normalizeCustomerName, validateCustomerPhone, normalizeCustomerPhone } = context.exports;

test('accepts full names, patronymics, hyphens, apostrophes and Unicode letters', () => {
  for (const value of ['Иван Иванов', 'Анна-Мария Петрова', 'Иван Иванович Иванов', "Sean O’Connor", "Jean D'Angelo", 'José García', '李 明', 'Jose\u0301 Garci\u0301a']) {
    assert.equal(validateCustomerName(value), undefined, value);
  }
});
test('rejects missing surname, digits, punctuation-only names and excessive length', () => {
  for (const value of ['', '   ', 'Иван', 'Иван 123', 'Иван @Иванов', '- -', 'Иван--Петр Иванов', 'А'.repeat(99) + ' Б']) {
    assert.ok(validateCustomerName(value), value);
  }
  assert.equal(validateCustomerName('А'.repeat(98) + ' Б'), undefined);
});
test('normalizes whitespace and combining accents without changing case', () => {
  assert.equal(normalizeCustomerName('  Анна-Мария   Петрова  '), 'Анна-Мария Петрова');
  assert.equal(normalizeCustomerName('Jose\u0301 García'), 'José García');
});
test('normalizes supported phone formats to the same number', () => {
  for (const value of ['+7 (912) 345-67-89', '8 (912) 345 67 89', '79123456789', '9123456789', '  +79123456789  ']) {
    assert.equal(validateCustomerPhone(value), undefined, value);
    assert.equal(normalizeCustomerPhone(value), '+79123456789');
  }
  assert.equal(validateCustomerPhone('+7 (342) 212-34-56'), undefined);
});
test('rejects incomplete numbers, foreign prefixes, malformed parentheses and pasted text', () => {
  for (const value of ['', ' ', '+7', '1234567890', '0000000000', '+7 (912 345-67-89', '+7 912) 345-67-89', '+7912345678', '+791234567890', '+19123456789', 'тел: +79123456789', '+79123456789 доб. 1', '++79123456789']) {
    assert.ok(validateCustomerPhone(value), value);
    assert.equal(normalizeCustomerPhone(value), value.trim());
  }
});
