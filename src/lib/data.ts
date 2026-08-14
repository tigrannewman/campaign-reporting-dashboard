export type Metrics = {
  adSpend: number;
  impressions: number;
  uniqueVisitors: number;
  subscriptions: number;
  ctr: number; // %
  conversionRate: number; // % (Subscription Rate)
  costPerLead: number; // $
  cpm: number; // $
  costPerClick: number; // $
  likes: number;
  shares: number;
  dms: number;
};

export type AdSetRow = {
  adAngle: string;
  adSetName: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
};

export type DemographicRow = {
  country: string;
  region: string;
  gender: string;
  percentage: number;
};

export type SurveyResponseRow = {
  question: string;
  answer: string;
  respondents: number;
  percentage: number;
};

export type Campaign = {
  id: string;
  name: string;
  metrics: Metrics;
  adSets: AdSetRow[];
  demographics: DemographicRow[];
  surveyResponses: SurveyResponseRow[];
};

export const campaigns: Campaign[] = [
  {
    id: "campaign-1",
    name: "Concept 1",
    metrics: {
      adSpend: 4250,
      impressions: 512000,
      uniqueVisitors: 8930,
      subscriptions: 277,
      ctr: 2.4,
      conversionRate: 3.1,
      costPerLead: 12.45,
      cpm: 8.3,
      costPerClick: 0.48,
      likes: 1240,
      shares: 312,
      dms: 89,
    },
    adSets: [
      { adAngle: "Problem/Solution", adSetName: "AS-1 Broad", spend: 1420, impressions: 178000, clicks: 4120, ctr: 2.3 },
      { adAngle: "Social Proof", adSetName: "AS-2 Lookalike", spend: 1680, impressions: 195000, clicks: 4980, ctr: 2.55 },
      { adAngle: "Urgency/Scarcity", adSetName: "AS-3 Retarget", spend: 1150, impressions: 139000, clicks: 3260, ctr: 2.35 },
    ],
    demographics: [
      { country: "United States", region: "California", gender: "Female", percentage: 28 },
      { country: "United States", region: "Texas", gender: "Male", percentage: 19 },
      { country: "United States", region: "New York", gender: "Female", percentage: 15 },
      { country: "Canada", region: "Ontario", gender: "Male", percentage: 11 },
      { country: "United Kingdom", region: "London", gender: "Female", percentage: 9 },
    ],
    surveyResponses: [
      { question: "How did you hear about us?", answer: "Instagram Ad", respondents: 210, percentage: 42 },
      { question: "How did you hear about us?", answer: "Friend/Referral", respondents: 95, percentage: 19 },
      { question: "What made you sign up?", answer: "Pricing", respondents: 160, percentage: 32 },
      { question: "What made you sign up?", answer: "Product Features", respondents: 140, percentage: 28 },
    ],
  },
  {
    id: "campaign-2",
    name: "Concept 2",
    metrics: {
      adSpend: 3680,
      impressions: 467000,
      uniqueVisitors: 7420,
      subscriptions: 193,
      ctr: 2.1,
      conversionRate: 2.6,
      costPerLead: 14.2,
      cpm: 7.9,
      costPerClick: 0.52,
      likes: 980,
      shares: 245,
      dms: 61,
    },
    adSets: [
      { adAngle: "Testimonial", adSetName: "AS-1 Broad", spend: 1210, impressions: 152000, clicks: 3040, ctr: 2.0 },
      { adAngle: "Before/After", adSetName: "AS-2 Interest", spend: 1340, impressions: 168000, clicks: 3610, ctr: 2.15 },
      { adAngle: "Limited Offer", adSetName: "AS-3 Retarget", spend: 1130, impressions: 147000, clicks: 3120, ctr: 2.12 },
    ],
    demographics: [
      { country: "United States", region: "Florida", gender: "Female", percentage: 24 },
      { country: "United States", region: "Illinois", gender: "Male", percentage: 20 },
      { country: "Australia", region: "New South Wales", gender: "Female", percentage: 14 },
      { country: "Canada", region: "British Columbia", gender: "Female", percentage: 12 },
      { country: "United Kingdom", region: "Manchester", gender: "Male", percentage: 10 },
    ],
    surveyResponses: [
      { question: "How did you hear about us?", answer: "Facebook Ad", respondents: 175, percentage: 38 },
      { question: "How did you hear about us?", answer: "Google Search", respondents: 120, percentage: 26 },
      { question: "What made you sign up?", answer: "Reviews/Testimonials", respondents: 130, percentage: 30 },
      { question: "What made you sign up?", answer: "Limited-Time Offer", respondents: 110, percentage: 24 },
    ],
  },
  {
    id: "campaign-3",
    name: "Concept 3",
    metrics: {
      adSpend: 5120,
      impressions: 601000,
      uniqueVisitors: 10250,
      subscriptions: 349,
      ctr: 2.7,
      conversionRate: 3.4,
      costPerLead: 11.1,
      cpm: 8.5,
      costPerClick: 0.44,
      likes: 1540,
      shares: 402,
      dms: 122,
    },
    adSets: [
      { adAngle: "Educational", adSetName: "AS-1 Broad", spend: 1780, impressions: 210000, clicks: 5460, ctr: 2.6 },
      { adAngle: "Social Proof", adSetName: "AS-2 Lookalike", spend: 1920, impressions: 224000, clicks: 6270, ctr: 2.8 },
      { adAngle: "Founder Story", adSetName: "AS-3 Retarget", spend: 1420, impressions: 167000, clicks: 4510, ctr: 2.7 },
    ],
    demographics: [
      { country: "United States", region: "California", gender: "Male", percentage: 26 },
      { country: "United States", region: "Washington", gender: "Female", percentage: 21 },
      { country: "Germany", region: "Berlin", gender: "Male", percentage: 13 },
      { country: "Canada", region: "Ontario", gender: "Female", percentage: 12 },
      { country: "United Kingdom", region: "London", gender: "Male", percentage: 9 },
    ],
    surveyResponses: [
      { question: "How did you hear about us?", answer: "TikTok Ad", respondents: 260, percentage: 45 },
      { question: "How did you hear about us?", answer: "Instagram Ad", respondents: 150, percentage: 26 },
      { question: "What made you sign up?", answer: "Product Features", respondents: 200, percentage: 35 },
      { question: "What made you sign up?", answer: "Pricing", respondents: 170, percentage: 30 },
    ],
  },
  {
    id: "campaign-4",
    name: "Concept 4",
    metrics: {
      adSpend: 2980,
      impressions: 389000,
      uniqueVisitors: 6110,
      subscriptions: 134,
      ctr: 1.9,
      conversionRate: 2.2,
      costPerLead: 15.8,
      cpm: 7.6,
      costPerClick: 0.56,
      likes: 740,
      shares: 168,
      dms: 44,
    },
    adSets: [
      { adAngle: "Urgency/Scarcity", adSetName: "AS-1 Broad", spend: 980, impressions: 128000, clicks: 2380, ctr: 1.86 },
      { adAngle: "Testimonial", adSetName: "AS-2 Interest", spend: 1050, impressions: 135000, clicks: 2610, ctr: 1.93 },
      { adAngle: "Comparison", adSetName: "AS-3 Retarget", spend: 950, impressions: 126000, clicks: 2390, ctr: 1.9 },
    ],
    demographics: [
      { country: "United States", region: "Ohio", gender: "Female", percentage: 22 },
      { country: "United States", region: "Georgia", gender: "Male", percentage: 18 },
      { country: "Canada", region: "Quebec", gender: "Female", percentage: 15 },
      { country: "Australia", region: "Victoria", gender: "Male", percentage: 13 },
      { country: "United Kingdom", region: "Birmingham", gender: "Female", percentage: 10 },
    ],
    surveyResponses: [
      { question: "How did you hear about us?", answer: "Google Search", respondents: 105, percentage: 33 },
      { question: "How did you hear about us?", answer: "Friend/Referral", respondents: 90, percentage: 28 },
      { question: "What made you sign up?", answer: "Limited-Time Offer", respondents: 88, percentage: 27 },
      { question: "What made you sign up?", answer: "Reviews/Testimonials", respondents: 80, percentage: 25 },
    ],
  },
  {
    id: "campaign-5",
    name: "Concept 5",
    metrics: {
      adSpend: 6340,
      impressions: 715000,
      uniqueVisitors: 12480,
      subscriptions: 474,
      ctr: 3.0,
      conversionRate: 3.8,
      costPerLead: 9.9,
      cpm: 8.9,
      costPerClick: 0.41,
      likes: 2010,
      shares: 587,
      dms: 176,
    },
    adSets: [
      { adAngle: "Social Proof", adSetName: "AS-1 Broad", spend: 2140, impressions: 245000, clicks: 7420, ctr: 3.03 },
      { adAngle: "Founder Story", adSetName: "AS-2 Lookalike", spend: 2280, impressions: 258000, clicks: 7940, ctr: 3.08 },
      { adAngle: "Before/After", adSetName: "AS-3 Retarget", spend: 1920, impressions: 212000, clicks: 6180, ctr: 2.92 },
    ],
    demographics: [
      { country: "United States", region: "California", gender: "Female", percentage: 27 },
      { country: "United States", region: "New York", gender: "Male", percentage: 20 },
      { country: "United Kingdom", region: "London", gender: "Female", percentage: 14 },
      { country: "Canada", region: "Ontario", gender: "Male", percentage: 12 },
      { country: "Germany", region: "Munich", gender: "Female", percentage: 9 },
    ],
    surveyResponses: [
      { question: "How did you hear about us?", answer: "Instagram Ad", respondents: 340, percentage: 44 },
      { question: "How did you hear about us?", answer: "TikTok Ad", respondents: 220, percentage: 28 },
      { question: "What made you sign up?", answer: "Product Features", respondents: 260, percentage: 34 },
      { question: "What made you sign up?", answer: "Reviews/Testimonials", respondents: 210, percentage: 27 },
    ],
  },
];

export function getCampaign(id: string) {
  return campaigns.find((c) => c.id === id);
}

export function aggregateMetrics(): Metrics {
  const n = campaigns.length;
  const sum = campaigns.reduce(
    (acc, c) => {
      acc.adSpend += c.metrics.adSpend;
      acc.impressions += c.metrics.impressions;
      acc.uniqueVisitors += c.metrics.uniqueVisitors;
      acc.subscriptions += c.metrics.subscriptions;
      acc.ctr += c.metrics.ctr;
      acc.conversionRate += c.metrics.conversionRate;
      acc.costPerLead += c.metrics.costPerLead;
      acc.cpm += c.metrics.cpm;
      acc.costPerClick += c.metrics.costPerClick;
      acc.likes += c.metrics.likes;
      acc.shares += c.metrics.shares;
      acc.dms += c.metrics.dms;
      return acc;
    },
    {
      adSpend: 0,
      impressions: 0,
      uniqueVisitors: 0,
      subscriptions: 0,
      ctr: 0,
      conversionRate: 0,
      costPerLead: 0,
      cpm: 0,
      costPerClick: 0,
      likes: 0,
      shares: 0,
      dms: 0,
    }
  );
  return {
    ...sum,
    ctr: sum.ctr / n,
    conversionRate: sum.conversionRate / n,
    costPerLead: sum.costPerLead / n,
    cpm: sum.cpm / n,
    costPerClick: sum.costPerClick / n,
  };
}
