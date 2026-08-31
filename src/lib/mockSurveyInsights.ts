import type { SurveyReport } from "./liveTransforms";

const VISITORS_COLUMNS = [
  { id: "q1", title: "What almost made you subscribe?" },
  { id: "q2", title: "What held you back?" },
  { id: "q3", title: "Any feedback for us?" },
];

const SUBSCRIBERS_COLUMNS = [
  { id: "q1", title: "What made you decide to subscribe?" },
  { id: "q2", title: "What do you like most so far?" },
  { id: "q3", title: "Any feedback to improve your experience?" },
];

export const MOCK_VISITORS_SURVEY: SurveyReport = {
  totalResponses: 6,
  columns: VISITORS_COLUMNS,
  numericField: { id: "price", title: "What would you be willing to pay? ($)" },
  numericStats: { avg: 34.2, median: 32.5, min: 15, max: 55 },
  priceDistribution: [
    { label: "$10-19", value: 1 },
    { label: "$20-29", value: 1 },
    { label: "$30-39", value: 2 },
    { label: "$40-49", value: 1 },
    { label: "$50-59", value: 1 },
  ],
  rows: [
    {
      email: "visitor1@example.com",
      submittedAt: "2026-07-02T10:15:00Z",
      answers: { q1: "The design", q2: "Price felt high", q3: "Would love a free trial" },
    },
    {
      email: "visitor2@example.com",
      submittedAt: "2026-07-04T14:32:00Z",
      answers: { q1: "Good reviews", q2: "Not sure it fits my setup", q3: "More product photos would help" },
    },
    {
      email: "visitor3@example.com",
      submittedAt: "2026-07-08T09:05:00Z",
      answers: { q1: "The features", q2: "Wanted to compare with alternatives", q3: "—" },
    },
    {
      email: "visitor4@example.com",
      submittedAt: "2026-07-11T18:47:00Z",
      answers: { q1: "Recommendation from a friend", q2: "Shipping timeline unclear", q3: "Clarify delivery estimates" },
    },
    {
      email: "visitor5@example.com",
      submittedAt: "2026-07-15T11:22:00Z",
      answers: { q1: "Overall look and feel", q2: "Price", q3: "A discount code would help" },
    },
    {
      email: "visitor6@example.com",
      submittedAt: "2026-07-19T16:03:00Z",
      answers: { q1: "The concept itself", q2: "Just browsing for now", q3: "Keep me posted on updates" },
    },
  ],
};

export const MOCK_SUBSCRIBERS_SURVEY: SurveyReport = {
  totalResponses: 6,
  columns: SUBSCRIBERS_COLUMNS,
  numericField: { id: "price", title: "What's a fair price for this? ($)" },
  numericStats: { avg: 41.7, median: 40, min: 25, max: 60 },
  priceDistribution: [
    { label: "$20-29", value: 1 },
    { label: "$30-39", value: 2 },
    { label: "$40-49", value: 2 },
    { label: "$50-59", value: 1 },
  ],
  rows: [
    {
      email: "subscriber1@example.com",
      submittedAt: "2026-07-03T08:40:00Z",
      answers: { q1: "The design won me over", q2: "Build quality", q3: "Faster shipping" },
    },
    {
      email: "subscriber2@example.com",
      submittedAt: "2026-07-06T13:12:00Z",
      answers: { q1: "Limited-time launch pricing", q2: "Ease of setup", q3: "—" },
    },
    {
      email: "subscriber3@example.com",
      submittedAt: "2026-07-09T17:55:00Z",
      answers: { q1: "Saw it on Instagram", q2: "Customer support", q3: "More color options" },
    },
    {
      email: "subscriber4@example.com",
      submittedAt: "2026-07-13T10:28:00Z",
      answers: { q1: "Recommended by a friend", q2: "Everything so far", q3: "A companion app would be great" },
    },
    {
      email: "subscriber5@example.com",
      submittedAt: "2026-07-17T15:04:00Z",
      answers: { q1: "The founder story", q2: "Attention to detail", q3: "Keep doing what you're doing" },
    },
    {
      email: "subscriber6@example.com",
      submittedAt: "2026-07-21T19:37:00Z",
      answers: { q1: "Needed a solution like this", q2: "Performance", q3: "A bit pricier than expected" },
    },
  ],
};
