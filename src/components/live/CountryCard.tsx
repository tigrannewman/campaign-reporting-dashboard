import { TableCard } from "@/components/DataTable";
import HorizontalBars from "@/components/charts/HorizontalBars";
import LiveBadge from "@/components/LiveBadge";
import ErrorDot from "@/components/ErrorDot";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { getMetaAdsGeographics } from "@/lib/bigquery";
import { geographicsToChartData } from "@/lib/liveTransforms";
import type { Campaign } from "@/lib/data";

export default async function CountryCard({ campaign }: { campaign: Campaign }) {
  try {
    const rows = await getMetaAdsGeographics(campaign.bigQuery.projectId, [campaign.bigQuery.iterationId]);

    if (rows.length === 0) {
      return (
        <TableCard title="Country">
          <EmptyState />
        </TableCard>
      );
    }

    const chartRows = geographicsToChartData(rows).map((r) => ({ label: r.country, value: r.value }));

    return (
      <TableCard title="Country" badge={<LiveBadge />}>
        <div className="p-5">
          <HorizontalBars rows={chartRows} />
        </div>
      </TableCard>
    );
  } catch (err) {
    console.error("Failed to load country data:", err);
    return (
      <TableCard title="Country" titleDot={<ErrorDot />}>
        <ErrorState />
      </TableCard>
    );
  }
}
