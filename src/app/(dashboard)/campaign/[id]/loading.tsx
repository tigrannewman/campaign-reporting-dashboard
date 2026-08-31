import { Skeleton, StatCardSkeleton, ChartCardSkeleton, TableCardSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 pt-2">
      <div>
        <Skeleton className="h-7 w-56" />
        <Skeleton className="mt-2 h-4 w-80" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      <div>
        <Skeleton className="mb-3 h-3 w-40" />
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="mb-3 h-3 w-32" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartCardSkeleton title="Angle" />
          <ChartCardSkeleton title="Age and Gender" />
          <TableCardSkeleton title="Country" rows={5} />
          <TableCardSkeleton title="Interests" rows={5} />
        </div>
      </div>

      <TableCardSkeleton title="Survey Responses" rows={6} />
    </div>
  );
}
