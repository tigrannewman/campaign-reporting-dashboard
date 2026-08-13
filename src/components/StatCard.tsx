export default function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-neutral-900">
      <p className="text-xs font-medium uppercase tracking-wide text-black/45 dark:text-white/45">{label}</p>
      <p className="mt-1.5 text-xl font-semibold text-black/90 dark:text-white/90">{value}</p>
    </div>
  );
}
