// Defines the display order of survey questions per concept + survey type,
// sourced from the client's survey export CSVs (question titles only — the
// actual response data always comes live from Typeform). Any question
// missing from a list here just falls back to Typeform's own field order
// and is appended after the ordered ones.
export const QUESTION_ORDER: Record<string, { visitors?: string[]; subscribers?: string[] }> = {
  "campaign-2": {
    subscribers: [
      "What made you decide to subscribe to Fusion Axis?",
      "Which modules would you actually buy or use?",
      "What do you like about Fusion Axis?",
      "What do you dislike about Fusion Axis?",
      "What would make Fusion Axis even better?",
      "How would you describe your current setup?",
      "Which brand is your current keyboard?",
      "How do you identify?",
      "What is your age?",
      "What is your current occupation?",
      "What is your income range?",
      "I am typically the first person to buy the latest products/innovations in this category.",
      "Who are the top 3 people/channels you follow on social media?",
      "What social media platform do you use the most ?",
    ],
  },
};

export function getQuestionOrder(campaignId: string, tab: "visitors" | "subscribers"): string[] | undefined {
  return QUESTION_ORDER[campaignId]?.[tab];
}
