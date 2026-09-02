import { Suspense } from "react";
import { notFound } from "next/navigation";
import { campaigns, getCampaign } from "@/lib/data";
import { StatCardSkeleton, ChartCardSkeleton, TableCardSkeleton } from "@/components/Skeleton";
import MetricsCards from "@/components/live/MetricsCards";
import EngagementCards from "@/components/live/EngagementCards";
import AngleCard from "@/components/live/AngleCard";
import AgeGenderCard from "@/components/live/AgeGenderCard";
import CountryCard from "@/components/live/CountryCard";
import InterestsCard from "@/components/live/InterestsCard";
import SurveyInsightsSection from "@/components/live/SurveyInsightsSection";

export const revalidate = 60;

export function generateStaticParams() {
  return campaigns.map((c) => ({ id: c.id }));
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = getCampaign(id);
  if (!campaign) notFound();

  return (
    <div className="flex flex-col gap-8 pt-2">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{campaign.name}</h1>
        <p className="mt-1 text-sm text-slate-500">
          Individual performance metrics and reporting for this concept.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <MetricsCards campaign={campaign} />
      </Suspense>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Engagement Metrics
        </h2>
        <Suspense
          fallback={
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <StatCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <EngagementCards campaign={campaign} />
        </Suspense>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Demographics
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Suspense fallback={<ChartCardSkeleton title="Angle" />}>
            <AngleCard campaign={campaign} />
          </Suspense>
          <Suspense fallback={<ChartCardSkeleton title="Age and Gender" />}>
            <AgeGenderCard campaign={campaign} />
          </Suspense>
          <Suspense fallback={<TableCardSkeleton title="Country" rows={5} />}>
            <CountryCard campaign={campaign} />
          </Suspense>
          <Suspense fallback={<TableCardSkeleton title="Interests" rows={5} />}>
            <InterestsCard campaign={campaign} />
          </Suspense>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Survey Insights
        </h2>
        <Suspense fallback={<TableCardSkeleton title="Survey Responses" rows={6} />}>
          <SurveyInsightsSection campaign={campaign} />
        </Suspense>
      </div>
    </div>
  );
}
