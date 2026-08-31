type Row = {
  label: string;
  value: number;
};

function niceCeil(n: number) {
  if (n <= 0) return 1;
  const exponent = Math.floor(Math.log10(n));
  const magnitude = 10 ** exponent;
  const residual = n / magnitude;
  const niceResidual = residual <= 1 ? 1 : residual <= 2 ? 2 : residual <= 5 ? 5 : 10;
  return niceResidual * magnitude;
}

export default function HorizontalBars({
  rows,
  color = "#0d9488",
  unit = "%",
  formatTick,
  formatValue,
}: {
  rows: Row[];
  color?: string;
  unit?: string;
  formatTick?: (n: number) => string;
  formatValue?: (n: number) => string;
}) {
  const max = niceCeil(Math.max(...rows.map((r) => r.value), 0));
  const tickCount = 6;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => Math.round((max / tickCount) * i));
  const tickLabel = formatTick ?? ((t: number) => `${t}${unit}`);

  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] items-center gap-3 text-sm">
          <span className="truncate text-slate-600">{r.label}</span>
          <div className="relative h-5 rounded bg-slate-100">
            <div
              className="h-full rounded"
              style={{ width: `${max > 0 ? (r.value / max) * 100 : 0}%`, backgroundColor: color }}
            />
            {formatValue && (
              <span className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-slate-500">
                {formatValue(r.value)}
              </span>
            )}
          </div>
        </div>
      ))}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] gap-3 pt-1">
        <span />
        <div className="flex justify-between text-[11px] text-slate-400">
          {ticks.map((t, i) => (
            <span key={i}>{tickLabel(t)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
