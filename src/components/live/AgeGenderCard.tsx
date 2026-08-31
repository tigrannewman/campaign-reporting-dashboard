import { TableCard } from "@/components/DataTable";
import AgeGenderPyramid from "@/components/charts/AgeGenderPyramid";
import LiveBadge from "@/components/LiveBadge";
import { getMetaAdsDemographics } from "@/lib/bigquery";
import { demographicsToAgeGender } from "@/lib/liveTransforms";
import type { Campaign } from "@/lib/data";

export default async function AgeGenderCard({ campaign }: { campaign: Campaign }) {
  let ageGender = campaign.demographicsCharts.ageGender;
  let isLive = false;

  if (campaign.bigQuery) {
    try {
      const rows = await getMetaAdsDemographics(campaign.bigQuery.projectIdeaId, campaign.bigQuery.versionIds);
      if (rows.length > 0) {
        ageGender = demographicsToAgeGender(rows);
        isLive = true;
      }
    } catch (err) {
      console.error("BigQuery demographics fetch failed, falling back to placeholder data:", err);
    }
  }

  return (
    <TableCard title="Age and Gender" badge={isLive ? <LiveBadge /> : undefined}>
      <div className="p-5">
        <AgeGenderPyramid rows={ageGender} />
      </div>
    </TableCard>
  );
}
