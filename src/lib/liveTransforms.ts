import type { MetaAdsAngleRow, MetaAdsDemographicsRow } from "./bigquery";
import type { TypeformField, TypeformResponseItem } from "./typeform";
import { formatAnswer } from "./typeform";

export type AngleShare = {
  label: string;
  value: number;
  color: string;
};

export type AgeGenderRow = {
  range: string;
  women: number;
  men: number;
  unknown?: number;
};

const ANGLE_COLORS = ["#3b82f6", "#f43f5e", "#14b8a6", "#f97316", "#8b5cf6", "#eab308"];

export function anglesToChartData(rows: MetaAdsAngleRow[]): AngleShare[] {
  return rows
    .map((r, i) => ({
      label: r.label.trim(),
      value: Math.round(r.percent * 10) / 10,
      color: ANGLE_COLORS[i % ANGLE_COLORS.length],
    }))
    .sort((a, b) => b.value - a.value);
}

const AGE_ORDER = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+", "Unknown"];

export function demographicsToAgeGender(rows: MetaAdsDemographicsRow[]): AgeGenderRow[] {
  const map = new Map<string, AgeGenderRow>(AGE_ORDER.map((age) => [age, { range: age, women: 0, men: 0, unknown: 0 }]));

  for (const row of rows) {
    const range = /^unknown$/i.test(row.age) ? "Unknown" : row.age;
    const entry = map.get(range) ?? { range, women: 0, men: 0, unknown: 0 };
    const value = Math.round(row.percent * 10) / 10;

    if (row.gender === "female") entry.women += value;
    else if (row.gender === "male") entry.men += value;
    else entry.unknown = (entry.unknown ?? 0) + value;

    map.set(range, entry);
  }

  return AGE_ORDER.map((age) => map.get(age)!);
}

export type SurveyTabResult = { status: "ok"; report: SurveyReport } | { status: "empty" } | { status: "error" };

// Picks a round bucket width (1/2/5 x 10^n) so a histogram always ends up
// with roughly `targetBuckets` bars regardless of the value range, instead
// of a fixed step that can produce hundreds of near-empty buckets.
function niceBucketSize(max: number, targetBuckets = 8) {
  if (max <= 0) return 1;
  const rawStep = max / targetBuckets;
  const exponent = Math.floor(Math.log10(rawStep));
  const magnitude = 10 ** exponent;
  const residual = rawStep / magnitude;
  const niceResidual = residual <= 1 ? 1 : residual <= 2 ? 2 : residual <= 5 ? 5 : 10;
  return niceResidual * magnitude;
}

export type SurveyReportRow = {
  email: string;
  submittedAt: string;
  answers: Record<string, string>;
};

export type ChoiceQuestion = {
  id: string;
  title: string;
  segments: { label: string; value: number; color: string }[];
};

export type OpenEndedResponse = {
  answer: string;
  email: string;
  submittedAt: string;
};

export type OpenEndedQuestion = {
  id: string;
  title: string;
  responses: OpenEndedResponse[];
};

export type SurveyReport = {
  totalResponses: number;
  columns: { id: string; title: string }[];
  rows: SurveyReportRow[];
  numericField?: { id: string; title: string };
  numericStats?: { avg: number; median: number; min: number; max: number };
  priceDistribution?: { label: string; value: number }[];
  choiceQuestions: ChoiceQuestion[];
  openEndedQuestions: OpenEndedQuestion[];
};

const OPEN_ENDED_TYPES = new Set(["short_text", "long_text"]);

function buildOpenEndedQuestions(fields: TypeformField[], items: TypeformResponseItem[]): OpenEndedQuestion[] {
  return fields
    .filter((f) => OPEN_ENDED_TYPES.has(f.type))
    .map((field) => ({
      id: field.id,
      title: field.title,
      responses: items.map((item) => ({
        answer: formatAnswer(item.answers.find((a) => a.field.id === field.id)),
        email: item.hidden?.email ?? "—",
        submittedAt: item.submitted_at,
      })),
    }));
}

const CHOICE_COLORS = ["#3b82f6", "#f43f5e", "#14b8a6", "#f97316", "#8b5cf6", "#eab308", "#ec4899", "#06b6d4"];

function buildChoiceQuestions(fields: TypeformField[], items: TypeformResponseItem[]): ChoiceQuestion[] {
  const choiceFields = fields.filter((f) => f.type === "multiple_choice");
  const questions: ChoiceQuestion[] = [];

  for (const field of choiceFields) {
    const counts = new Map<string, number>();
    let total = 0;

    for (const item of items) {
      const answer = item.answers.find((a) => a.field.id === field.id);
      if (answer?.type === "choice" && answer.choice?.label) {
        counts.set(answer.choice.label, (counts.get(answer.choice.label) ?? 0) + 1);
        total++;
      }
    }

    if (total === 0) continue;

    // Start from every option defined on the question (in Typeform's own
    // order) so choices nobody picked still show up at 0%, then append any
    // observed label that isn't in that list (e.g. a free-text "Other").
    const definedLabels = field.choices?.map((c) => c.label) ?? [];
    const observedLabels = Array.from(counts.keys());
    const labels =
      definedLabels.length > 0
        ? [...definedLabels, ...observedLabels.filter((l) => !definedLabels.includes(l))]
        : observedLabels;

    const segments = labels.map((label, i) => ({
      label,
      value: Math.round(((counts.get(label) ?? 0) / total) * 1000) / 10,
      color: CHOICE_COLORS[i % CHOICE_COLORS.length],
    }));

    questions.push({ id: field.id, title: field.title, segments });
  }

  return questions;
}

function normalizeTitle(title: string) {
  return title.trim().replace(/\s+/g, " ").toLowerCase();
}

// Reorders fields to match a client-provided question order (matched by
// normalized title). Anything not found in `order` keeps its original
// Typeform position, appended after the ordered ones.
function reorderFields(fields: TypeformField[], order?: string[]): TypeformField[] {
  if (!order || order.length === 0) return fields;
  const orderIndex = new Map(order.map((title, i) => [normalizeTitle(title), i]));
  return [...fields].sort((a, b) => {
    const ai = orderIndex.get(normalizeTitle(a.title));
    const bi = orderIndex.get(normalizeTitle(b.title));
    if (ai === undefined && bi === undefined) return 0;
    if (ai === undefined) return 1;
    if (bi === undefined) return -1;
    return ai - bi;
  });
}

export function buildSurveyReport(
  rawFields: TypeformField[],
  items: TypeformResponseItem[],
  questionOrder?: string[]
): SurveyReport {
  const fields = reorderFields(rawFields, questionOrder);
  // Open-ended (free-text) questions get their own stacked tables instead of
  // being crammed into the combined table alongside structured answers.
  const columns = fields.filter((f) => !OPEN_ENDED_TYPES.has(f.type)).map((f) => ({ id: f.id, title: f.title }));
  const numericField = fields.find((f) => f.type === "number");

  const rows: SurveyReportRow[] = items.map((item) => {
    const answers: Record<string, string> = {};
    for (const col of columns) {
      const answer = item.answers.find((a) => a.field.id === col.id);
      answers[col.id] = formatAnswer(answer);
    }
    return {
      email: item.hidden?.email ?? "—",
      submittedAt: item.submitted_at,
      answers,
    };
  });

  let numericStats: SurveyReport["numericStats"];
  let priceDistribution: SurveyReport["priceDistribution"];

  if (numericField) {
    const values = items
      .map((item) => item.answers.find((a) => a.field.id === numericField.id)?.number)
      .filter((n): n is number => typeof n === "number")
      .sort((a, b) => a - b);

    if (values.length > 0) {
      const sum = values.reduce((s, v) => s + v, 0);
      const mid = Math.floor(values.length / 2);
      const median = values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid];
      numericStats = {
        avg: Math.round((sum / values.length) * 100) / 100,
        median,
        min: values[0],
        max: values[values.length - 1],
      };

      const bucketSize = niceBucketSize(numericStats.max);
      const maxBucket = Math.max(bucketSize, Math.ceil(numericStats.max / bucketSize) * bucketSize);
      const buckets = new Map<string, number>();
      for (let b = 0; b < maxBucket; b += bucketSize) {
        buckets.set(`$${b}-${b + bucketSize - 1}`, 0);
      }
      for (const v of values) {
        const bucketStart = Math.floor(v / bucketSize) * bucketSize;
        const key = `$${bucketStart}-${bucketStart + bucketSize - 1}`;
        buckets.set(key, (buckets.get(key) ?? 0) + 1);
      }
      priceDistribution = Array.from(buckets.entries()).map(([label, value]) => ({ label, value }));
    }
  }

  return {
    totalResponses: items.length,
    columns,
    rows,
    numericField: numericField ? { id: numericField.id, title: numericField.title } : undefined,
    numericStats,
    priceDistribution,
    choiceQuestions: buildChoiceQuestions(fields, items),
    openEndedQuestions: buildOpenEndedQuestions(fields, items),
  };
}
