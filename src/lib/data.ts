export type Metrics = {
  adSpend: number;
  impressions: number;
  uniqueVisitors: number;
  subscriptions: number;
  ctr: number; // %
  conversionRate: number; // % (Subscription Rate)
  costPerLead: number; // $ (Cost Per Subscription)
  cpm: number; // $
  costPerClick: number; // $ (CPC)
  likes: number;
  shares: number;
  dms: number;
};

export type AdSetRow = {
  adAngle: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  visitors: number;
  subscriptions: number;
};

export type AngleShare = {
  label: string;
  value: number; // %
  color: string;
};

export type AgeGenderRow = {
  range: string;
  women: number; // %
  men: number; // %
  unknown?: number; // %
};

export type CountryShare = {
  country: string;
  value: number; // %
};

export type InterestShare = {
  label: string;
  value: number; // %
};

export type DemographicsCharts = {
  angles: AngleShare[];
  ageGender: AgeGenderRow[];
  countries: CountryShare[];
  interests: InterestShare[];
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
  demographicsCharts: DemographicsCharts;
  surveyResponses: SurveyResponseRow[];
  bigQuery?: {
    projectIdeaId: string;
    versionIds: string[];
  };
};

const ANGLE_COLORS = ["#3b82f6", "#f43f5e", "#14b8a6"];

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
      { adAngle: "Problem/Solution", spend: 1420, impressions: 178000, clicks: 4120, ctr: 2.3, visitors: 3710, subscriptions: 115 },
      { adAngle: "Social Proof", spend: 1680, impressions: 195000, clicks: 4980, ctr: 2.55, visitors: 4480, subscriptions: 139 },
      { adAngle: "Urgency/Scarcity", spend: 1150, impressions: 139000, clicks: 3260, ctr: 2.35, visitors: 2930, subscriptions: 91 },
    ],
    demographicsCharts: {
      angles: [
        { label: "Problem/Solution", value: 33, color: ANGLE_COLORS[0] },
        { label: "Social Proof", value: 40, color: ANGLE_COLORS[1] },
        { label: "Urgency/Scarcity", value: 27, color: ANGLE_COLORS[2] },
      ],
      ageGender: [
        { range: "18-24", women: 0.3, men: 0.4, unknown: 0.1 },
        { range: "25-34", women: 5.8, men: 10.2 },
        { range: "35-44", women: 9.1, men: 14.6 },
        { range: "45-54", women: 8.4, men: 12.9 },
        { range: "55-64", women: 8.7, men: 12.4 },
        { range: "65+", women: 7.3, men: 9.8 },
        { range: "Unknown", women: 0, men: 0 },
      ],
      countries: [
        { country: "United States", value: 61 },
        { country: "United Kingdom", value: 4.5 },
        { country: "Canada", value: 3.8 },
        { country: "Australia", value: 2.1 },
        { country: "Germany", value: 1.4 },
        { country: "Italy", value: 1.2 },
        { country: "France", value: 0.9 },
        { country: "Spain", value: 0.6 },
      ],
      interests: [
        { label: "HomeAutomation", value: 28 },
        { label: "FrequentTravelers", value: 11 },
        { label: "DoorSecurity", value: 10.5 },
        { label: "Anti-theftSystem", value: 8 },
        { label: "WorkingParents", value: 7.2 },
        { label: "EarlyTechAdopters", value: 5.3 },
        { label: "SmartLock", value: 4.1 },
        { label: "Professionals", value: 3.6 },
        { label: "Homeowners", value: 2.4 },
        { label: "EU", value: 1.0 },
      ],
    },
    surveyResponses: [
      { question: "How did you hear about us?", answer: "Instagram Ad", respondents: 210, percentage: 42 },
      { question: "How did you hear about us?", answer: "Friend/Referral", respondents: 95, percentage: 19 },
      { question: "What made you sign up?", answer: "Pricing", respondents: 160, percentage: 32 },
      { question: "What made you sign up?", answer: "Product Features", respondents: 140, percentage: 28 },
    ],
    bigQuery: {
      projectIdeaId: "e6843bbb-e6b8-4d97-bb59-9c6bedefec9d",
      versionIds: ["8cd76909-f3d4-4a8f-82dc-209a469bb0a6"],
    },
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
      { adAngle: "Testimonial", spend: 1210, impressions: 152000, clicks: 3040, ctr: 2.0, visitors: 2736, subscriptions: 71 },
      { adAngle: "Before/After", spend: 1340, impressions: 168000, clicks: 3610, ctr: 2.15, visitors: 3249, subscriptions: 84 },
      { adAngle: "Limited Offer", spend: 1130, impressions: 147000, clicks: 3120, ctr: 2.12, visitors: 2808, subscriptions: 73 },
    ],
    demographicsCharts: {
      angles: [
        { label: "Testimonial", value: 33, color: ANGLE_COLORS[0] },
        { label: "Before/After", value: 36, color: ANGLE_COLORS[1] },
        { label: "Limited Offer", value: 31, color: ANGLE_COLORS[2] },
      ],
      ageGender: [
        { range: "18-24", women: 1.2, men: 1.6, unknown: 0.2 },
        { range: "25-34", women: 9.5, men: 14.2 },
        { range: "35-44", women: 10.8, men: 15.1 },
        { range: "45-54", women: 7.2, men: 10.5 },
        { range: "55-64", women: 6.1, men: 8.4 },
        { range: "65+", women: 4.5, men: 6.9 },
        { range: "Unknown", women: 0, men: 0 },
      ],
      countries: [
        { country: "United States", value: 58 },
        { country: "United Kingdom", value: 5.1 },
        { country: "Canada", value: 4.2 },
        { country: "Australia", value: 3.0 },
        { country: "Germany", value: 1.6 },
        { country: "Italy", value: 1.0 },
        { country: "France", value: 0.7 },
        { country: "Spain", value: 0.5 },
      ],
      interests: [
        { label: "HomeAutomation", value: 22 },
        { label: "FrequentTravelers", value: 14 },
        { label: "WorkingParents", value: 8.8 },
        { label: "DoorSecurity", value: 9 },
        { label: "Anti-theftSystem", value: 7.5 },
        { label: "EarlyTechAdopters", value: 6.0 },
        { label: "Professionals", value: 4.2 },
        { label: "SmartLock", value: 3.5 },
        { label: "Homeowners", value: 3.0 },
        { label: "EU", value: 1.3 },
      ],
    },
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
      { adAngle: "Educational", spend: 1780, impressions: 210000, clicks: 5460, ctr: 2.6, visitors: 4914, subscriptions: 167 },
      { adAngle: "Social Proof", spend: 1920, impressions: 224000, clicks: 6270, ctr: 2.8, visitors: 5643, subscriptions: 192 },
      { adAngle: "Founder Story", spend: 1420, impressions: 167000, clicks: 4510, ctr: 2.7, visitors: 4059, subscriptions: 138 },
    ],
    demographicsCharts: {
      angles: [
        { label: "Educational", value: 35, color: ANGLE_COLORS[0] },
        { label: "Social Proof", value: 37, color: ANGLE_COLORS[1] },
        { label: "Founder Story", value: 28, color: ANGLE_COLORS[2] },
      ],
      ageGender: [
        { range: "18-24", women: 0.6, men: 0.7, unknown: 0.1 },
        { range: "25-34", women: 7.0, men: 11.5 },
        { range: "35-44", women: 9.8, men: 14.0 },
        { range: "45-54", women: 8.9, men: 13.2 },
        { range: "55-64", women: 7.9, men: 11.6 },
        { range: "65+", women: 6.4, men: 9.1 },
        { range: "Unknown", women: 0, men: 0 },
      ],
      countries: [
        { country: "United States", value: 63 },
        { country: "United Kingdom", value: 4.0 },
        { country: "Canada", value: 3.5 },
        { country: "Australia", value: 2.4 },
        { country: "Germany", value: 2.0 },
        { country: "Italy", value: 0.9 },
        { country: "France", value: 0.8 },
        { country: "Spain", value: 0.4 },
      ],
      interests: [
        { label: "HomeAutomation", value: 30 },
        { label: "DoorSecurity", value: 12 },
        { label: "FrequentTravelers", value: 9.5 },
        { label: "Anti-theftSystem", value: 8.8 },
        { label: "WorkingParents", value: 6.5 },
        { label: "SmartLock", value: 4.6 },
        { label: "EarlyTechAdopters", value: 4.8 },
        { label: "Professionals", value: 3.1 },
        { label: "Homeowners", value: 2.8 },
        { label: "EU", value: 0.9 },
      ],
    },
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
      { adAngle: "Urgency/Scarcity", spend: 980, impressions: 128000, clicks: 2380, ctr: 1.86, visitors: 2142, subscriptions: 47 },
      { adAngle: "Testimonial", spend: 1050, impressions: 135000, clicks: 2610, ctr: 1.93, visitors: 2349, subscriptions: 52 },
      { adAngle: "Comparison", spend: 950, impressions: 126000, clicks: 2390, ctr: 1.9, visitors: 2151, subscriptions: 47 },
    ],
    demographicsCharts: {
      angles: [
        { label: "Urgency/Scarcity", value: 33, color: ANGLE_COLORS[0] },
        { label: "Testimonial", value: 35, color: ANGLE_COLORS[1] },
        { label: "Comparison", value: 32, color: ANGLE_COLORS[2] },
      ],
      ageGender: [
        { range: "18-24", women: 0.2, men: 0.3 },
        { range: "25-34", women: 4.1, men: 7.8 },
        { range: "35-44", women: 7.5, men: 11.9 },
        { range: "45-54", women: 8.8, men: 13.5 },
        { range: "55-64", women: 9.6, men: 13.9 },
        { range: "65+", women: 8.9, men: 12.1 },
        { range: "Unknown", women: 0, men: 0 },
      ],
      countries: [
        { country: "United States", value: 55 },
        { country: "United Kingdom", value: 4.8 },
        { country: "Canada", value: 4.6 },
        { country: "Australia", value: 3.3 },
        { country: "Germany", value: 1.3 },
        { country: "Italy", value: 1.1 },
        { country: "France", value: 0.9 },
        { country: "Spain", value: 0.6 },
      ],
      interests: [
        { label: "HomeAutomation", value: 19 },
        { label: "FrequentTravelers", value: 13 },
        { label: "WorkingParents", value: 9.4 },
        { label: "DoorSecurity", value: 8 },
        { label: "Anti-theftSystem", value: 6.9 },
        { label: "EarlyTechAdopters", value: 5.5 },
        { label: "Professionals", value: 4.8 },
        { label: "Homeowners", value: 3.6 },
        { label: "SmartLock", value: 3.0 },
        { label: "EU", value: 1.5 },
      ],
    },
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
      { adAngle: "Social Proof", spend: 2140, impressions: 245000, clicks: 7420, ctr: 3.03, visitors: 6678, subscriptions: 254 },
      { adAngle: "Founder Story", spend: 2280, impressions: 258000, clicks: 7940, ctr: 3.08, visitors: 7146, subscriptions: 272 },
      { adAngle: "Before/After", spend: 1920, impressions: 212000, clicks: 6180, ctr: 2.92, visitors: 5562, subscriptions: 211 },
    ],
    demographicsCharts: {
      angles: [
        { label: "Social Proof", value: 34, color: ANGLE_COLORS[0] },
        { label: "Founder Story", value: 36, color: ANGLE_COLORS[1] },
        { label: "Before/After", value: 30, color: ANGLE_COLORS[2] },
      ],
      ageGender: [
        { range: "18-24", women: 0.3, men: 0.4, unknown: 0.1 },
        { range: "25-34", women: 6.0, men: 10.5 },
        { range: "35-44", women: 9.3, men: 14.9 },
        { range: "45-54", women: 8.6, men: 13.0 },
        { range: "55-64", women: 8.9, men: 12.7 },
        { range: "65+", women: 7.5, men: 10.2 },
        { range: "Unknown", women: 0, men: 0 },
      ],
      countries: [
        { country: "United States", value: 64 },
        { country: "United Kingdom", value: 4.3 },
        { country: "Canada", value: 3.2 },
        { country: "Australia", value: 2.0 },
        { country: "Germany", value: 1.9 },
        { country: "Italy", value: 0.8 },
        { country: "France", value: 0.7 },
        { country: "Spain", value: 0.5 },
      ],
      interests: [
        { label: "HomeAutomation", value: 33 },
        { label: "DoorSecurity", value: 11.5 },
        { label: "Anti-theftSystem", value: 9.2 },
        { label: "FrequentTravelers", value: 10 },
        { label: "WorkingParents", value: 6.0 },
        { label: "EarlyTechAdopters", value: 5.9 },
        { label: "SmartLock", value: 4.4 },
        { label: "Professionals", value: 3.3 },
        { label: "Homeowners", value: 2.6 },
        { label: "EU", value: 0.8 },
      ],
    },
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
