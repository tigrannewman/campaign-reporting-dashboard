import { TableCard } from "@/components/DataTable";
import HorizontalBars from "@/components/charts/HorizontalBars";
import LiveBadge from "@/components/LiveBadge";
import ErrorDot from "@/components/ErrorDot";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { getMetaAdsInterests } from "@/lib/bigquery";
import { interestsToChartData } from "@/lib/liveTransforms";
import type { Campaign } from "@/lib/data";

export default async function InterestsCard({ campaign }: { campaign: Campaign }) {
  try {
    const rows = await getMetaAdsInterests(campaign.bigQuery.projectId, [campaign.bigQuery.iterationId]);

    if (rows.length === 0) {
      return (
        <TableCard title="Interests">
          <EmptyState />
        </TableCard>
      );
    }

    return (
      <TableCard title="Interests" badge={<LiveBadge />}>
        <div className="p-5">
          <HorizontalBars rows={interestsToChartData(rows)} />
        </div>
      </TableCard>
    );
  } catch (err) {
    console.error("Failed to load interests data:", err);
    return (
      <TableCard title="Interests" titleDot={<ErrorDot />}>
        <ErrorState />
      </TableCard>
    );
  }
}
