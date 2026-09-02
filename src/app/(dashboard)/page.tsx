import { Suspense } from "react";
import { TableCardSkeleton } from "@/components/Skeleton";
import ConceptsOverview from "@/components/live/ConceptsOverview";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 pt-2">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">All Concepts</h1>
        <p className="mt-1 text-sm text-slate-500">
          Performance overview across all active concepts.
        </p>
      </div>

      <Suspense fallback={<TableCardSkeleton rows={5} />}>
        <ConceptsOverview />
      </Suspense>
    </div>
  );
}
