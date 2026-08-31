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

export default function VerticalBars({
  rows,
  color = "#0d9488",
  formatTick,
  formatValue,
}: {
  rows: Row[];
  color?: string;
  formatTick?: (n: number) => string;
  formatValue?: (n: number) => string;
}) {
  const max = niceCeil(Math.max(...rows.map((r) => r.value), 0));
  const tickCount = 5;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => Math.round((max / tickCount) * i)).reverse();
  const tickLabel = formatTick ?? ((t: number) => `${t}`);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-3">
        <div className="flex h-56 w-14 shrink-0 flex-col justify-between text-right text-[11px] text-slate-400">
          {ticks.map((t, i) => (
            <span key={i}>{tickLabel(t)}</span>
          ))}
        </div>
        <div className="flex h-56 min-w-0 flex-1 items-end gap-2 sm:gap-4">
          {rows.map((r) => (
            <div key={r.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
              {formatValue && (
                <span className="whitespace-nowrap text-xs font-medium text-slate-600">{formatValue(r.value)}</span>
              )}
              <div
                className="w-full rounded-t"
                style={{
                  height: `${max > 0 ? Math.max((r.value / max) * 100, 1) : 1}%`,
                  backgroundColor: color,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 pl-[68px] sm:gap-4">
        {rows.map((r) => (
          <div key={r.label} className="min-w-0 flex-1 text-center text-xs leading-tight text-slate-600">
            {r.label}
          </div>
        ))}
      </div>
    </div>
  );
}
