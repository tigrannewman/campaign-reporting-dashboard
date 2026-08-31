import SurveyInsightsTabs from "@/components/SurveyInsightsTabs";
import { getTypeformFields, getTypeformResponses } from "@/lib/typeform";
import { buildSurveyReport, type SurveyReport } from "@/lib/liveTransforms";
import { MOCK_VISITORS_SURVEY, MOCK_SUBSCRIBERS_SURVEY } from "@/lib/mockSurveyInsights";
import type { Campaign } from "@/lib/data";

async function loadReport(formId: string | undefined, mock: SurveyReport): Promise<{ report: SurveyReport; isLive: boolean }> {
  if (!formId) return { report: mock, isLive: false };

  try {
    const [fields, { items }] = await Promise.all([getTypeformFields(formId), getTypeformResponses(formId)]);
    return { report: buildSurveyReport(fields, items), isLive: true };
  } catch (err) {
    console.error(`Typeform live fetch failed for form ${formId}, falling back to mock data:`, err);
    return { report: mock, isLive: false };
  }
}

export default async function SurveyInsightsSection({ campaign }: { campaign: Campaign }) {
  const [visitors, subscribers] = await Promise.all([
    loadReport(campaign.typeform?.visitorsFormId, MOCK_VISITORS_SURVEY),
    loadReport(campaign.typeform?.subscribersFormId, MOCK_SUBSCRIBERS_SURVEY),
  ]);

  return (
    <SurveyInsightsTabs
      visitors={visitors.report}
      subscribers={subscribers.report}
      visitorsIsLive={visitors.isLive}
      subscribersIsLive={subscribers.isLive}
    />
  );
}
