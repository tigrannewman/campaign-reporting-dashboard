import { TableCard, Th, Td } from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import HorizontalBars from "@/components/charts/HorizontalBars";
import LiveBadge from "@/components/LiveBadge";
import { fmtNumber } from "@/lib/format";
import type { SurveyReport as SurveyReportData } from "@/lib/liveTransforms";

export default function SurveyReport({ report }: { report: SurveyReportData }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Responses" value={fmtNumber(report.totalResponses)} />
        {report.numericStats && report.numericField && (
          <>
            <StatCard label={`Avg ${report.numericField.title}`} value={`$${report.numericStats.avg}`} />
            <StatCard label={`Median ${report.numericField.title}`} value={`$${report.numericStats.median}`} />
            <StatCard
              label={`Range`}
              value={`$${report.numericStats.min} – $${report.numericStats.max}`}
            />
          </>
        )}
      </div>

      {report.priceDistribution && report.numericField && (
        <TableCard
          title={`${report.numericField.title} — Distribution`}
          badge={<LiveBadge />}
        >
          <div className="p-5">
            <HorizontalBars rows={report.priceDistribution} unit="" />
          </div>
        </TableCard>
      )}

      <TableCard title="Survey Responses" badge={<LiveBadge />}>
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {report.columns.map((col) => (
                  <Th key={col.id}>{col.title}</Th>
                ))}
                <Th>Email</Th>
                <Th>Submitted</Th>
              </tr>
            </thead>
            <tbody>
              {report.rows.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  {report.columns.map((col) => (
                    <Td key={col.id}>{row.answers[col.id]}</Td>
                  ))}
                  <Td>{row.email}</Td>
                  <Td>{new Date(row.submittedAt).toLocaleDateString()}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableCard>
    </div>
  );
}
