import { TableCard } from "@/components/DataTable";
import DonutChart from "@/components/charts/DonutChart";
import LiveBadge from "@/components/LiveBadge";
import { getMetaAdsAngles } from "@/lib/bigquery";
import { anglesToChartData } from "@/lib/liveTransforms";
import type { Campaign } from "@/lib/data";

export default async function AngleCard({ campaign }: { campaign: Campaign }) {
  let angles = campaign.demographicsCharts.angles;
  let isLive = false;

  if (campaign.bigQuery) {
    try {
      const rows = await getMetaAdsAngles(campaign.bigQuery.projectIdeaId, campaign.bigQuery.versionIds);
      if (rows.length > 0) {
        angles = anglesToChartData(rows);
        isLive = true;
      }
    } catch (err) {
      console.error("BigQuery angle fetch failed, falling back to placeholder data:", err);
    }
  }

  return (
    <TableCard title="Angle" badge={isLive ? <LiveBadge /> : undefined}>
      <div className="p-5">
        <DonutChart segments={angles} />
      </div>
    </TableCard>
  );
}
