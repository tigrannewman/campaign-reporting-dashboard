type Row = {
  label: string;
  value: number;
};

function niceCeil(n: number) {
  if (n <= 0) return 5;
  const step = n <= 10 ? 5 : n <= 50 ? 10 : 25;
  return Math.ceil(n / step) * step;
}

export default function HorizontalBars({
  rows,
  color = "#0d9488",
}: {
  rows: Row[];
  color?: string;
}) {
  const max = niceCeil(Math.max(...rows.map((r) => r.value), 0));
  const tickCount = 6;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => Math.round((max / tickCount) * i));

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
          </div>
        </div>
      ))}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] gap-3 pt-1">
        <span />
        <div className="flex justify-between text-[11px] text-slate-400">
          {ticks.map((t, i) => (
            <span key={i}>{t}%</span>
          ))}
        </div>
      </div>
    </div>
  );
}
