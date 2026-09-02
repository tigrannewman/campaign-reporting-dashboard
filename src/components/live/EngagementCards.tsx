import StatCard from "@/components/StatCard";
import { getMetaAdsLikesSavesShares } from "@/lib/bigquery";
import { fmtNumber } from "@/lib/format";
import type { Campaign } from "@/lib/data";

export default async function EngagementCards({ campaign }: { campaign: Campaign }) {
  let error = false;
  let likes = 0;
  let shares = 0;
  let saves = 0;

  try {
    const rows = await getMetaAdsLikesSavesShares(campaign.bigQuery.projectId, [campaign.bigQuery.iterationId]);
    for (const r of rows) {
      likes += r.likes ?? 0;
      shares += r.shares ?? 0;
      saves += r.saves ?? 0;
    }
  } catch (err) {
    console.error("Failed to load likes/saves/shares:", err);
    error = true;
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard label="Likes" value={fmtNumber(likes)} error={error} />
      <StatCard label="Shares" value={fmtNumber(shares)} error={error} />
      <StatCard label="Save" value={fmtNumber(saves)} error={error} />
    </div>
  );
}
