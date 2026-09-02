import SurveyInsightsTabs from "@/components/SurveyInsightsTabs";
import { getTypeformFields, getTypeformResponses } from "@/lib/typeform";
import { buildSurveyReport, type SurveyTabResult } from "@/lib/liveTransforms";
import type { Campaign } from "@/lib/data";

async function loadSurveyTab(formId: string): Promise<SurveyTabResult> {
  try {
    const [fields, { items }] = await Promise.all([getTypeformFields(formId), getTypeformResponses(formId)]);
    if (items.length === 0) return { status: "empty" };
    return { status: "ok", report: buildSurveyReport(fields, items) };
  } catch (err) {
    console.error(`Typeform fetch failed for form ${formId}:`, err);
    return { status: "error" };
  }
}

export default async function SurveyInsightsSection({ campaign }: { campaign: Campaign }) {
  const [visitors, subscribers] = await Promise.all([
    loadSurveyTab(campaign.typeform.visitorsFormId),
    loadSurveyTab(campaign.typeform.subscribersFormId),
  ]);

  return <SurveyInsightsTabs visitors={visitors} subscribers={subscribers} />;
}
