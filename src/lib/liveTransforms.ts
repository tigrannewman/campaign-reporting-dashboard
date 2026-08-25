import type { MetaAdsAngleRow, MetaAdsDemographicsRow } from "./bigquery";
import type { AngleShare, AgeGenderRow } from "./data";
import type { TypeformField, TypeformResponseItem } from "./typeform";
import { formatAnswer } from "./typeform";

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

export type SurveyReportRow = {
  email: string;
  submittedAt: string;
  answers: Record<string, string>;
};

export type SurveyReport = {
  totalResponses: number;
  columns: { id: string; title: string }[];
  rows: SurveyReportRow[];
  numericField?: { id: string; title: string };
  numericStats?: { avg: number; median: number; min: number; max: number };
  priceDistribution?: { label: string; value: number }[];
};

export function buildSurveyReport(fields: TypeformField[], items: TypeformResponseItem[]): SurveyReport {
  const columns = fields.map((f) => ({ id: f.id, title: f.title }));
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

      const bucketSize = 10;
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
  };
}
