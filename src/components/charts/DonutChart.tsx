type Segment = {
  label: string;
  value: number;
  color: string;
};

export default function DonutChart({ segments }: { segments: Segment[] }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = 70;
  const stroke = 34;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row">
      <svg viewBox="0 0 200 200" className="h-44 w-44 shrink-0 -rotate-90">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-black/5 dark:stroke-white/5"
        />
        {segments.map((s, i) => {
          const fraction = total > 0 ? s.value / total : 0;
          const dash = fraction * circumference;
          const gap = circumference - dash;
          const offset = (cumulative / total) * circumference;
          cumulative += s.value;
          return (
            <circle
              key={i}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
            />
          );
        })}
      </svg>
      <ul className="flex w-full flex-col gap-1.5 text-sm">
        {segments.map((s, i) => (
          <li key={i} className="flex items-center gap-2 text-black/70 dark:text-white/70">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="truncate">{s.label}</span>
            <span className="ml-auto shrink-0 text-black/40 dark:text-white/40">{s.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
