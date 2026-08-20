import { notFound } from "next/navigation";
import { campaigns, getCampaign } from "@/lib/data";
import { fmtCurrency, fmtNumber, fmtPercent } from "@/lib/format";
import { TableCard, Th, Td } from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import DonutChart from "@/components/charts/DonutChart";
import AgeGenderPyramid from "@/components/charts/AgeGenderPyramid";
import HorizontalBars from "@/components/charts/HorizontalBars";
import LiveBadge from "@/components/LiveBadge";
import { getMetaAdsAngles, getMetaAdsDemographics } from "@/lib/bigquery";
import { anglesToChartData, demographicsToAgeGender } from "@/lib/liveTransforms";

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

  let angles = campaign.demographicsCharts.angles;
  let ageGender = campaign.demographicsCharts.ageGender;
  let anglesIsLive = false;
  let ageGenderIsLive = false;

  if (campaign.bigQuery) {
    const { projectIdeaId, versionIds } = campaign.bigQuery;
    try {
      const [angleRows, demoRows] = await Promise.all([
        getMetaAdsAngles(projectIdeaId, versionIds),
        getMetaAdsDemographics(projectIdeaId, versionIds),
      ]);
      if (angleRows.length > 0) {
        angles = anglesToChartData(angleRows);
        anglesIsLive = true;
      }
      if (demoRows.length > 0) {
        ageGender = demographicsToAgeGender(demoRows);
        ageGenderIsLive = true;
      }
    } catch (err) {
      console.error("BigQuery live fetch failed, falling back to placeholder data:", err);
    }
  }

  return (
    <div className="flex flex-col gap-8 pt-2">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{campaign.name}</h1>
        <p className="mt-1 text-sm text-black/50 dark:text-white/50">
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
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
          Engagement Metrics
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Likes" value={fmtNumber(metrics.likes)} />
          <StatCard label="Shares" value={fmtNumber(metrics.shares)} />
          <StatCard label="DMs" value={fmtNumber(metrics.dms)} />
        </div>
      </div>

      <TableCard title="Ad Angles">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <Th>Ad Angle</Th>
              <Th>Spends</Th>
              <Th>Impressions</Th>
              <Th>Clicks</Th>
              <Th>CTR (%)</Th>
              <Th>Visitors</Th>
              <Th>Subscriptions</Th>
            </tr>
          </thead>
          <tbody>
            {campaign.adSets.map((row) => (
              <tr
                key={row.adAngle}
                className="border-b border-black/5 last:border-0 hover:bg-black/[0.02] dark:border-white/5 dark:hover:bg-white/[0.03]"
              >
                <Td>{row.adAngle}</Td>
                <Td>{fmtCurrency(row.spend)}</Td>
                <Td>{fmtNumber(row.impressions)}</Td>
                <Td>{fmtNumber(row.clicks)}</Td>
                <Td>{fmtPercent(row.ctr)}</Td>
                <Td>{fmtNumber(row.visitors)}</Td>
                <Td>{fmtNumber(row.subscriptions)}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
          Demographics
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TableCard title="Angle" badge={anglesIsLive ? <LiveBadge /> : undefined}>
            <div className="p-5">
              <DonutChart segments={angles} />
            </div>
          </TableCard>
          <TableCard title="Age and Gender" badge={ageGenderIsLive ? <LiveBadge /> : undefined}>
            <div className="p-5">
              <AgeGenderPyramid rows={ageGender} />
            </div>
          </TableCard>
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

      <TableCard title="Survey Responses">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <Th>Question</Th>
              <Th>Answer</Th>
              <Th>Respondents</Th>
              <Th>%</Th>
            </tr>
          </thead>
          <tbody>
            {campaign.surveyResponses.map((row, i) => (
              <tr
                key={i}
                className="border-b border-black/5 last:border-0 hover:bg-black/[0.02] dark:border-white/5 dark:hover:bg-white/[0.03]"
              >
                <Td>{row.question}</Td>
                <Td>{row.answer}</Td>
                <Td>{fmtNumber(row.respondents)}</Td>
                <Td>{fmtPercent(row.percentage)}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}
