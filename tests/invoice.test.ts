import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeInvoice, formatTnd } from '../src/lib/invoice.ts';

test('1 000,000 HT at 19 % gives 1 190,000 TTC and a 1,5 % withholding', () => {
  const t = computeInvoice([{ quantity: 1, unitPrice: 1000, vatRate: 19 }]);
  assert.equal(t.net, 1000);
  assert.equal(t.vat, 190);
  assert.equal(t.gross, 1190);
  assert.equal(t.withholding, 17.85);
  assert.equal(t.payable, 1172.15);
});

test('no withholding below 1 000 TND TTC', () => {
  const t = computeInvoice([{ quantity: 2, unitPrice: 400, vatRate: 19 }]); // 952 TTC
  assert.equal(t.gross, 952);
  assert.equal(t.withholding, 0);
  assert.equal(t.payable, 952);
});

test('withholding applies exactly at the threshold', () => {
  const t = computeInvoice([{ quantity: 1, unitPrice: 1000, vatRate: 0 }]);
  assert.equal(t.withholding, 15);
});

test('withholding can be switched off (customer not subject)', () => {
  const t = computeInvoice([{ quantity: 1, unitPrice: 5000, vatRate: 19 }], false);
  assert.equal(t.withholding, 0);
  assert.equal(t.payable, 5950);
});

test('VAT per line, rounded half away from zero to the millime', () => {
  // 0,0025 * 19 % = 0,000475 -> line net 0,003 (rounded), vat 0,001
  const t = computeInvoice([{ quantity: 1, unitPrice: 0.0025, vatRate: 19 }]);
  assert.equal(t.net, 0.003);
  assert.equal(t.vat, 0.001);
});

test('mixed rates are broken down highest first', () => {
  const t = computeInvoice([
    { quantity: 3, unitPrice: 12.5, vatRate: 7 },
    { quantity: 10, unitPrice: 8.75, vatRate: 19 },
    { quantity: 1, unitPrice: 100, vatRate: 13 },
  ]);
  assert.deepEqual(t.vatByRate.map((r) => r.rate), [19, 13, 7]);
  assert.equal(t.net, 37.5 + 87.5 + 100);
  assert.equal(t.vat, 2.625 + 16.625 + 13);
});

test('formatTnd uses three decimals and grouped thousands', () => {
  assert.equal(formatTnd(1172.15), '1 172,150');
  assert.equal(formatTnd(0), '0,000');
  assert.equal(formatTnd(1234567.891), '1 234 567,891');
});
