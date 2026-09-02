import Link from "next/link";
import { campaigns } from "@/lib/data";
import { fmtCurrency, fmtNumber, fmtPercent } from "@/lib/format";
import { TableCard, Th, Td } from "@/components/DataTable";
import ErrorDot from "@/components/ErrorDot";
import ConceptMetricChart from "@/components/ConceptMetricChart";
import { loadConceptMetrics } from "@/lib/liveMetrics";

export default async function ConceptsOverview() {
  const results = await Promise.all(
    campaigns.map(async (c) => ({
      id: c.id,
      name: c.name,
      result: await loadConceptMetrics(c.bigQuery.projectId, c.bigQuery.iterationId),
    }))
  );

  return (
    <div className="flex flex-col gap-6">
      <TableCard>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <Th sticky>Concept</Th>
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
              <Th>Save</Th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => {
              const m = r.result.status === "ok" ? r.result.metrics : null;
              return (
                <tr key={r.id} className="group border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <Td sticky>
                    <span className="flex items-center gap-2">
                      <Link
                        href={`/campaign/${r.id}`}
                        className="font-medium text-accent hover:text-teal-700 hover:underline"
                      >
                        {r.name}
                      </Link>
                      {r.result.status === "error" && <ErrorDot />}
                    </span>
                  </Td>
                  <Td>{m ? fmtCurrency(m.adSpend) : "—"}</Td>
                  <Td>{m ? fmtNumber(m.impressions) : "—"}</Td>
                  <Td>{m ? fmtNumber(m.uniqueVisitors) : "—"}</Td>
                  <Td>{m ? fmtNumber(m.subscriptions) : "—"}</Td>
                  <Td>{m ? fmtPercent(m.conversionRate) : "—"}</Td>
                  <Td>{m ? fmtCurrency(m.costPerLead) : "—"}</Td>
                  <Td>{m ? fmtCurrency(m.costPerClick) : "—"}</Td>
                  <Td>{m ? fmtPercent(m.ctr) : "—"}</Td>
                  <Td>{m ? fmtCurrency(m.cpm) : "—"}</Td>
                  <Td>{m ? fmtNumber(m.likes) : "—"}</Td>
                  <Td>{m ? fmtNumber(m.shares) : "—"}</Td>
                  <Td>{m ? fmtNumber(m.saves) : "—"}</Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableCard>

      <ConceptMetricChart
        concepts={results.map((r) => ({
          name: r.name,
          metrics: r.result.status === "ok" ? r.result.metrics : null,
        }))}
      />
    </div>
  );
}
