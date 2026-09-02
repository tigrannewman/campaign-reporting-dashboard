import StatCard from "@/components/StatCard";
import { getIterationAdsBreakdown } from "@/lib/bigquery";
import { fmtCurrency, fmtNumber, fmtPercent } from "@/lib/format";
import type { Campaign } from "@/lib/data";

export default async function MetricsCards({ campaign }: { campaign: Campaign }) {
  let error = false;
  let b: Awaited<ReturnType<typeof getIterationAdsBreakdown>>[number] | undefined;

  try {
    const rows = await getIterationAdsBreakdown(campaign.bigQuery.projectId, [campaign.bigQuery.iterationId]);
    b = rows[0];
  } catch (err) {
    console.error("Failed to load ads breakdown:", err);
    error = true;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard label="Spends" value={fmtCurrency(b?.fbSpend ?? 0)} error={error} />
      <StatCard label="Impressions" value={fmtNumber(b?.impressions ?? 0)} error={error} />
      <StatCard label="Visitors" value={fmtNumber(b?.visits ?? 0)} error={error} />
      <StatCard label="Subscriptions" value={fmtNumber(b?.subscriptions ?? 0)} error={error} />
      <StatCard label="Subscription Rate" value={fmtPercent(b?.subscriptionRate ?? 0)} error={error} />
      <StatCard label="Cost Per Subscription" value={fmtCurrency(b?.costPerSubscription ?? 0)} error={error} />
      <StatCard label="CPC" value={fmtCurrency(b?.cpc ?? 0)} error={error} />
      <StatCard label="Click Through Rate" value={fmtPercent(b?.ctr ?? 0)} error={error} />
      <StatCard label="CPM" value={fmtCurrency(b?.cpm ?? 0)} error={error} />
    </div>
  );
}
