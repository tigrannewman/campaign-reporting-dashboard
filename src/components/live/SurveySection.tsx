import { TableCard, Th, Td } from "@/components/DataTable";
import SurveyReport from "@/components/SurveyReport";
import { fmtNumber, fmtPercent } from "@/lib/format";
import { getTypeformFields, getTypeformResponses } from "@/lib/typeform";
import { buildSurveyReport } from "@/lib/liveTransforms";
import type { Campaign } from "@/lib/data";

export default async function SurveySection({ campaign }: { campaign: Campaign }) {
  if (campaign.typeform) {
    try {
      const [fields, { items }] = await Promise.all([
        getTypeformFields(campaign.typeform.formId),
        getTypeformResponses(campaign.typeform.formId),
      ]);
      return <SurveyReport report={buildSurveyReport(fields, items)} />;
    } catch (err) {
      console.error("Typeform live fetch failed, falling back to placeholder data:", err);
    }
  }

  return (
    <TableCard title="Survey Responses">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <Th>Question</Th>
            <Th>Answer</Th>
            <Th>Respondents</Th>
            <Th>%</Th>
          </tr>
        </thead>
        <tbody>
          {campaign.surveyResponses.map((row, i) => (
            <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
              <Td>{row.question}</Td>
              <Td>{row.answer}</Td>
              <Td>{fmtNumber(row.respondents)}</Td>
              <Td>{fmtPercent(row.percentage)}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableCard>
  );
}
