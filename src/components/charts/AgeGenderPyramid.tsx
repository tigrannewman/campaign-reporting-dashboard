type Row = {
  range: string;
  women: number;
  men: number;
  unknown?: number;
};

function niceCeil(n: number) {
  if (n <= 0) return 5;
  const step = n <= 10 ? 5 : n <= 50 ? 10 : 25;
  return Math.ceil(n / step) * step;
}

export default function AgeGenderPyramid({ rows }: { rows: Row[] }) {
  const max = niceCeil(Math.max(...rows.flatMap((r) => [r.women, r.men]), 0));

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-[56px_minmax(0,1fr)] gap-3">
        <span />
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>{max}%</span>
          <span>0%</span>
          <span>{max}%</span>
        </div>
      </div>

      {rows.map((r) => (
        <div key={r.range} className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-3 text-sm">
          <span className="text-right text-slate-500">{r.range}</span>
          <div className="relative h-5">
            <div className="absolute inset-y-0 left-1/2 h-full w-px bg-slate-200" />
            <div className="absolute inset-y-0 left-0 flex h-full w-1/2 justify-end overflow-hidden">
              <div
                className="h-full rounded-l bg-rose-300"
                style={{ width: `${max > 0 ? (r.women / max) * 100 : 0}%` }}
              />
            </div>
            <div className="absolute inset-y-0 right-0 flex h-full w-1/2 justify-start overflow-hidden">
              <div
                className="h-full rounded-r bg-teal-500"
                style={{ width: `${max > 0 ? (r.men / max) * 100 : 0}%` }}
              />
            </div>
            {r.unknown ? (
              <div
                className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-slate-300"
                style={{ opacity: Math.min(1, r.unknown) }}
              />
            ) : null}
          </div>
        </div>
      ))}

      <div className="mt-2 flex items-center justify-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-rose-300" /> Women
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-slate-300" /> Unknown
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-teal-500" /> Man
        </span>
      </div>
    </div>
  );
}
