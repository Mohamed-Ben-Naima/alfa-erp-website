// Same rules as Alfa ERP's DocumentBody / WithholdingBlock (TN profile):
// - amounts in TND, 3 decimals, rounded half away from zero (Currency.Round)
// - VAT computed per line, then summed
// - withholding tax (retenue à la source) 1.5 % of the gross total when gross >= 1 000 TND
// Work in millimes (integers) so floating point never touches money.

export interface InvoiceLine {
  quantity: number;
  unitPrice: number; // TND HT
  vatRate: number; // percent: 19, 13, 7 or 0
}

export interface InvoiceTotals {
  net: number;
  vat: number;
  gross: number;
  withholding: number;
  payable: number;
  vatByRate: { rate: number; base: number; amount: number }[];
}

export const WITHHOLDING_RATE = 1.5;
export const WITHHOLDING_THRESHOLD = 1000;

function roundHalfAwayFromZero(value: number): number {
  // value is in millimes; guard against binary noise such as 2.4999999997
  const v = Math.round(value * 1e6) / 1e6;
  return Math.sign(v) * Math.round(Math.abs(v));
}

const toMillimes = (tnd: number) => roundHalfAwayFromZero(tnd * 1000);
const fromMillimes = (m: number) => m / 1000;

export function computeInvoice(lines: InvoiceLine[], withholding = true): InvoiceTotals {
  let net = 0;
  let vat = 0;
  const byRate = new Map<number, { base: number; amount: number }>();
  for (const l of lines) {
    const q = Number.isFinite(l.quantity) ? l.quantity : 0;
    const p = Number.isFinite(l.unitPrice) ? l.unitPrice : 0;
    const lineNet = roundHalfAwayFromZero(q * p * 1000);
    const lineVat = roundHalfAwayFromZero((lineNet * l.vatRate) / 100);
    net += lineNet;
    vat += lineVat;
    const r = byRate.get(l.vatRate) ?? { base: 0, amount: 0 };
    r.base += lineNet;
    r.amount += lineVat;
    byRate.set(l.vatRate, r);
  }
  const gross = net + vat;
  const applies = withholding && gross >= WITHHOLDING_THRESHOLD * 1000;
  const wh = applies ? roundHalfAwayFromZero((gross * WITHHOLDING_RATE) / 100) : 0;
  return {
    net: fromMillimes(net),
    vat: fromMillimes(vat),
    gross: fromMillimes(gross),
    withholding: fromMillimes(wh),
    payable: fromMillimes(gross - wh),
    vatByRate: [...byRate.entries()]
      .filter(([, v]) => v.base !== 0)
      .sort((a, b) => b[0] - a[0])
      .map(([rate, v]) => ({ rate, base: fromMillimes(v.base), amount: fromMillimes(v.amount) })),
  };
}

/** French Tunisian format: 1 234,567 (narrow no-break space for thousands). */
export function formatTnd(value: number): string {
  const neg = value < 0;
  const [int, dec] = Math.abs(value).toFixed(3).split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${neg ? '−' : ''}${grouped},${dec}`;
}

export { toMillimes };
