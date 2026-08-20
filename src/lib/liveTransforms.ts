import type { MetaAdsAngleRow, MetaAdsDemographicsRow } from "./bigquery";
import type { AngleShare, AgeGenderRow } from "./data";

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
