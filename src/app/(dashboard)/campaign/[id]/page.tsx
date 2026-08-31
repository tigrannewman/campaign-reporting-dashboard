import { Suspense } from "react";
import { notFound } from "next/navigation";
import { campaigns, getCampaign } from "@/lib/data";
import { fmtCurrency, fmtNumber, fmtPercent } from "@/lib/format";
import { TableCard } from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import HorizontalBars from "@/components/charts/HorizontalBars";
import { ChartCardSkeleton, TableCardSkeleton } from "@/components/Skeleton";
import AngleCard from "@/components/live/AngleCard";
import AgeGenderCard from "@/components/live/AgeGenderCard";
import SurveySection from "@/components/live/SurveySection";

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

  const { metrics } = campaign;

  return (
    <div className="flex flex-col gap-8 pt-2">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{campaign.name}</h1>
        <p className="mt-1 text-sm text-slate-500">
          Individual performance metrics and reporting for this concept.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Spends" value={fmtCurrency(metrics.adSpend)} />
        <StatCard label="Impressions" value={fmtNumber(metrics.impressions)} />
        <StatCard label="Visitors" value={fmtNumber(metrics.uniqueVisitors)} />
        <StatCard label="Subscriptions" value={fmtNumber(metrics.subscriptions)} />
        <StatCard label="Subscription Rate" value={fmtPercent(metrics.conversionRate)} />
        <StatCard label="Cost Per Subscription" value={fmtCurrency(metrics.costPerLead)} />
        <StatCard label="CPC" value={fmtCurrency(metrics.costPerClick)} />
        <StatCard label="Click Through Rate" value={fmtPercent(metrics.ctr)} />
        <StatCard label="CPM" value={fmtCurrency(metrics.cpm)} />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Engagement Metrics
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Likes" value={fmtNumber(metrics.likes)} />
          <StatCard label="Shares" value={fmtNumber(metrics.shares)} />
          <StatCard label="Save" value={fmtNumber(metrics.saves)} />
        </div>
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
          <TableCard title="Country">
            <div className="p-5">
              <HorizontalBars rows={campaign.demographicsCharts.countries.map((c) => ({ label: c.country, value: c.value }))} />
            </div>
          </TableCard>
          <TableCard title="Interests">
            <div className="p-5">
              <HorizontalBars rows={campaign.demographicsCharts.interests} />
            </div>
          </TableCard>
        </div>
      </div>

      <Suspense fallback={<TableCardSkeleton title="Survey Responses" rows={6} />}>
        <SurveySection campaign={campaign} />
      </Suspense>
    </div>
  );
}
