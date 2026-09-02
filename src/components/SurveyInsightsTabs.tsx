"use client";

import { useState } from "react";
import SurveyReport from "@/components/SurveyReport";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import ErrorDot from "@/components/ErrorDot";
import type { SurveyTabResult } from "@/lib/liveTransforms";

type Tab = "visitors" | "subscribers";

export default function SurveyInsightsTabs({
  visitors,
  subscribers,
}: {
  visitors: SurveyTabResult;
  subscribers: SurveyTabResult;
}) {
  const [tab, setTab] = useState<Tab>("visitors");

  const tabs: { id: Tab; label: string; result: SurveyTabResult }[] = [
    { id: "visitors", label: "Visitors", result: visitors },
    { id: "subscribers", label: "Subscribers", result: subscribers },
  ];

  const active = tabs.find((t) => t.id === tab)!;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition ${
              tab === t.id
                ? "bg-accent text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {t.label}
            {t.result.status === "error" && <ErrorDot />}
          </button>
        ))}
      </div>

      {active.result.status === "ok" && <SurveyReport report={active.result.report} />}
      {active.result.status === "empty" && <EmptyState message="No survey responses yet" />}
      {active.result.status === "error" && <ErrorState message="Failed to load survey responses" />}
    </div>
  );
}
