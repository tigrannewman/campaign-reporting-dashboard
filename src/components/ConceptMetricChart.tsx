"use client";

import { useState } from "react";
import VerticalBars from "@/components/charts/VerticalBars";
import { TableCard } from "@/components/DataTable";
import type { Campaign, Metrics } from "@/lib/data";

type MetricKind = "currency" | "percent" | "number";

type MetricDef = {
  key: keyof Metrics;
  label: string;
  kind: MetricKind;
};

const METRICS: MetricDef[] = [
  { key: "adSpend", label: "Spends", kind: "currency" },
  { key: "impressions", label: "Impressions", kind: "number" },
  { key: "uniqueVisitors", label: "Visitors", kind: "number" },
  { key: "subscriptions", label: "Subscriptions", kind: "number" },
  { key: "conversionRate", label: "Subscription Rate (%)", kind: "percent" },
  { key: "costPerLead", label: "Cost Per Subscription", kind: "currency" },
  { key: "costPerClick", label: "CPC", kind: "currency" },
  { key: "ctr", label: "CTR (%)", kind: "percent" },
  { key: "cpm", label: "CPM", kind: "currency" },
  { key: "likes", label: "Likes", kind: "number" },
  { key: "shares", label: "Shares", kind: "number" },
  { key: "saves", label: "Save", kind: "number" },
];

function formatValue(kind: MetricKind, value: number) {
  if (kind === "currency") return `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  if (kind === "percent") return `${value.toFixed(1)}%`;
  return value.toLocaleString("en-US");
}

function formatTick(kind: MetricKind, value: number) {
  if (kind === "currency") return `$${Math.round(value).toLocaleString("en-US")}`;
  if (kind === "percent") return `${value}%`;
  return value.toLocaleString("en-US");
}

export default function ConceptMetricChart({ campaigns }: { campaigns: Campaign[] }) {
  const [metricKey, setMetricKey] = useState<keyof Metrics>("adSpend");
  const metric = METRICS.find((m) => m.key === metricKey) ?? METRICS[0];

  const rows = campaigns.map((c) => ({
    label: c.name,
    value: c.metrics[metric.key],
  }));

  return (
    <TableCard title="Metrics by Concept">
      <div className="flex flex-col gap-4 p-5">
        <select
          value={metric.key}
          onChange={(e) => setMetricKey(e.target.value as keyof Metrics)}
          className="w-full max-w-xs rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 sm:w-auto"
        >
          {METRICS.map((m) => (
            <option key={m.key} value={m.key}>
              {m.label}
            </option>
          ))}
        </select>

        <VerticalBars
          rows={rows}
          formatTick={(t) => formatTick(metric.kind, t)}
          formatValue={(v) => formatValue(metric.kind, v)}
        />
      </div>
    </TableCard>
  );
}
