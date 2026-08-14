import Link from "next/link";
import { campaigns, aggregateMetrics } from "@/lib/data";
import { fmtCurrency, fmtNumber, fmtPercent } from "@/lib/format";
import { TableCard, Th, Td } from "@/components/DataTable";

export default function Home() {
  const totals = aggregateMetrics();

  return (
    <div className="flex flex-col gap-6 pt-2">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">All Concepts</h1>
        <p className="mt-1 text-sm text-black/50 dark:text-white/50">
          Performance overview across all active concepts.
        </p>
      </div>

      <TableCard>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <Th>Concept</Th>
              <Th>Spends</Th>
              <Th>Impressions</Th>
              <Th>Visitors</Th>
              <Th>Subscriptions</Th>
              <Th>Subscription Rate (%)</Th>
              <Th>Cost Per Subscription</Th>
              <Th>CPC</Th>
              <Th>CTR (%)</Th>
              <Th>CPM</Th>
              <Th>Likes</Th>
              <Th>Shares</Th>
              <Th>DMs</Th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr
                key={c.id}
                className="border-b border-black/5 last:border-0 hover:bg-black/[0.02] dark:border-white/5 dark:hover:bg-white/[0.03]"
              >
                <Td>
                  <Link href={`/campaign/${c.id}`} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                    {c.name}
                  </Link>
                </Td>
                <Td>{fmtCurrency(c.metrics.adSpend)}</Td>
                <Td>{fmtNumber(c.metrics.impressions)}</Td>
                <Td>{fmtNumber(c.metrics.uniqueVisitors)}</Td>
                <Td>{fmtNumber(c.metrics.subscriptions)}</Td>
                <Td>{fmtPercent(c.metrics.conversionRate)}</Td>
                <Td>{fmtCurrency(c.metrics.costPerLead)}</Td>
                <Td>{fmtCurrency(c.metrics.costPerClick)}</Td>
                <Td>{fmtPercent(c.metrics.ctr)}</Td>
                <Td>{fmtCurrency(c.metrics.cpm)}</Td>
                <Td>{fmtNumber(c.metrics.likes)}</Td>
                <Td>{fmtNumber(c.metrics.shares)}</Td>
                <Td>{fmtNumber(c.metrics.dms)}</Td>
              </tr>
            ))}
            <tr className="border-t-2 border-black/10 bg-black/[0.02] font-semibold dark:border-white/10 dark:bg-white/[0.04]">
              <Td>Total / Avg</Td>
              <Td>{fmtCurrency(totals.adSpend)}</Td>
              <Td>{fmtNumber(totals.impressions)}</Td>
              <Td>{fmtNumber(totals.uniqueVisitors)}</Td>
              <Td>{fmtNumber(totals.subscriptions)}</Td>
              <Td>{fmtPercent(totals.conversionRate)}</Td>
              <Td>{fmtCurrency(totals.costPerLead)}</Td>
              <Td>{fmtCurrency(totals.costPerClick)}</Td>
              <Td>{fmtPercent(totals.ctr)}</Td>
              <Td>{fmtCurrency(totals.cpm)}</Td>
              <Td>{fmtNumber(totals.likes)}</Td>
              <Td>{fmtNumber(totals.shares)}</Td>
              <Td>{fmtNumber(totals.dms)}</Td>
            </tr>
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}
