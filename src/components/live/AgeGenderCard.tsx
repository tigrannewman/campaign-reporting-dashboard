import { TableCard } from "@/components/DataTable";
import AgeGenderPyramid from "@/components/charts/AgeGenderPyramid";
import LiveBadge from "@/components/LiveBadge";
import ErrorDot from "@/components/ErrorDot";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { getMetaAdsDemographics } from "@/lib/bigquery";
import { demographicsToAgeGender } from "@/lib/liveTransforms";
import type { Campaign } from "@/lib/data";

export default async function AgeGenderCard({ campaign }: { campaign: Campaign }) {
  try {
    const rows = await getMetaAdsDemographics(campaign.bigQuery.projectId, [campaign.bigQuery.iterationId]);

    if (rows.length === 0) {
      return (
        <TableCard title="Age and Gender">
          <EmptyState />
        </TableCard>
      );
    }

    return (
      <TableCard title="Age and Gender" badge={<LiveBadge />}>
        <div className="p-5">
          <AgeGenderPyramid rows={demographicsToAgeGender(rows)} />
        </div>
      </TableCard>
    );
  } catch (err) {
    console.error("Failed to load age/gender data:", err);
    return (
      <TableCard title="Age and Gender" titleDot={<ErrorDot />}>
        <ErrorState />
      </TableCard>
    );
  }
}
