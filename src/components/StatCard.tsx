export default function StatCard({
  label,
  value,
  error = false,
}: {
  label: string;
  value: string;
  error?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
        {error && <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" title="Failed to load" />}
      </p>
      <p className={`mt-1.5 text-xl font-semibold ${error ? "text-slate-300" : "text-slate-900"}`}>
        {error ? "—" : value}
      </p>
    </div>
  );
}
