import { campaigns } from "@/lib/data";
import { getTypeformResponseCount } from "@/lib/typeform";
import { TableCard } from "@/components/DataTable";
import VerticalBars from "@/components/charts/VerticalBars";

async function loadCount(formId: string): Promise<number> {
  try {
    return await getTypeformResponseCount(formId);
  } catch (err) {
    console.error(`Failed to load response count for form ${formId}:`, err);
    return 0;
  }
}

export default async function SurveyResponsesChart() {
  const results = await Promise.all(
    campaigns.map(async (c) => ({
      name: c.name,
      visitors: await loadCount(c.typeform.visitorsFormId),
      subscribers: await loadCount(c.typeform.subscribersFormId),
    }))
  );

  const visitorsRows = results.map((r) => ({ label: r.name, value: r.visitors }));
  const subscribersRows = results.map((r) => ({ label: r.name, value: r.subscribers }));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <TableCard title="Visitors Survey Responses">
        <div className="p-5">
          <VerticalBars rows={visitorsRows} formatValue={(v) => v.toLocaleString("en-US")} />
        </div>
      </TableCard>
      <TableCard title="Subscribers Survey Responses">
        <div className="p-5">
          <VerticalBars rows={subscribersRows} formatValue={(v) => v.toLocaleString("en-US")} />
        </div>
      </TableCard>
    </div>
  );
}
