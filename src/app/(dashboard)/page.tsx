import { Suspense } from "react";
import { TableCardSkeleton } from "@/components/Skeleton";
import ConceptsOverview from "@/components/live/ConceptsOverview";
import SurveyResponsesChart from "@/components/live/SurveyResponsesChart";

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

      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TableCardSkeleton title="Visitors Survey Responses" rows={5} />
            <TableCardSkeleton title="Subscribers Survey Responses" rows={5} />
          </div>
        }
      >
        <SurveyResponsesChart />
      </Suspense>
    </div>
  );
}
