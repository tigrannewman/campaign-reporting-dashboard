export function fmtCurrency(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function fmtNumber(n: number) {
  return n.toLocaleString("en-US");
}

export function fmtPercent(n: number) {
  return `${n.toFixed(1)}%`;
}
