export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-slate-200/70 ${className}`} />;
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="mt-2.5 h-6 w-20" />
    </div>
  );
}

export function TableCardSkeleton({ title, rows = 4 }: { title?: string; rows?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
        {title ? (
          <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
        ) : (
          <Skeleton className="h-4 w-24" />
        )}
      </div>
      <div className="flex flex-col gap-3 p-5">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-full" />
        ))}
      </div>
    </div>
  );
}

export function ChartCardSkeleton({ title }: { title?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
        {title ? (
          <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
        ) : (
          <Skeleton className="h-4 w-24" />
        )}
      </div>
      <div className="flex items-center gap-5 p-5">
        <Skeleton className="h-36 w-36 shrink-0 rounded-full" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}
