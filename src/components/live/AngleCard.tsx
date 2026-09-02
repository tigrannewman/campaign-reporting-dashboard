import { TableCard } from "@/components/DataTable";
import DonutChart from "@/components/charts/DonutChart";
import LiveBadge from "@/components/LiveBadge";
import ErrorDot from "@/components/ErrorDot";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { getMetaAdsAngles } from "@/lib/bigquery";
import { anglesToChartData } from "@/lib/liveTransforms";
import type { Campaign } from "@/lib/data";

export default async function AngleCard({ campaign }: { campaign: Campaign }) {
  try {
    const rows = await getMetaAdsAngles(campaign.bigQuery.projectId, [campaign.bigQuery.iterationId]);

    if (rows.length === 0) {
      return (
        <TableCard title="Angle">
          <EmptyState />
        </TableCard>
      );
    }

    return (
      <TableCard title="Angle" badge={<LiveBadge />}>
        <div className="p-5">
          <DonutChart segments={anglesToChartData(rows)} />
        </div>
      </TableCard>
    );
  } catch (err) {
    console.error("Failed to load angle data:", err);
    return (
      <TableCard title="Angle" titleDot={<ErrorDot />}>
        <ErrorState />
      </TableCard>
    );
  }
}
