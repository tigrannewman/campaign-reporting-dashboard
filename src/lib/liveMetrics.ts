import { getIterationAdsBreakdown, getMetaAdsLikesSavesShares } from "./bigquery";

export type ConceptMetrics = {
  adSpend: number;
  impressions: number;
  uniqueVisitors: number;
  subscriptions: number;
  conversionRate: number;
  costPerLead: number;
  costPerClick: number;
  ctr: number;
  cpm: number;
  likes: number;
  shares: number;
  saves: number;
};

export type ConceptMetricsResult = { status: "ok"; metrics: ConceptMetrics } | { status: "error" };

export async function loadConceptMetrics(projectId: string, iterationId: string): Promise<ConceptMetricsResult> {
  try {
    const [breakdownRows, engagementRows] = await Promise.all([
      getIterationAdsBreakdown(projectId, [iterationId]),
      getMetaAdsLikesSavesShares(projectId, [iterationId]),
    ]);

    const b = breakdownRows[0];
    const engagement = engagementRows.reduce(
      (acc, r) => ({
        likes: acc.likes + (r.likes ?? 0),
        shares: acc.shares + (r.shares ?? 0),
        saves: acc.saves + (r.saves ?? 0),
      }),
      { likes: 0, shares: 0, saves: 0 }
    );

    return {
      status: "ok",
      metrics: {
        adSpend: b?.fbSpend ?? 0,
        impressions: b?.impressions ?? 0,
        uniqueVisitors: b?.visits ?? 0,
        subscriptions: b?.subscriptions ?? 0,
        conversionRate: b?.subscriptionRate ?? 0,
        costPerLead: b?.costPerSubscription ?? 0,
        costPerClick: b?.cpc ?? 0,
        ctr: b?.ctr ?? 0,
        cpm: b?.cpm ?? 0,
        likes: engagement.likes,
        shares: engagement.shares,
        saves: engagement.saves,
      },
    };
  } catch (err) {
    console.error(`Failed to load metrics for project ${projectId}:`, err);
    return { status: "error" };
  }
}
