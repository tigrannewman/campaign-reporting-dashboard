"use client";

import { useState } from "react";
import SurveyReport from "@/components/SurveyReport";
import type { SurveyReport as SurveyReportData } from "@/lib/liveTransforms";

type Tab = "visitors" | "subscribers";

export default function SurveyInsightsTabs({
  visitors,
  subscribers,
  visitorsIsLive = false,
  subscribersIsLive = false,
}: {
  visitors: SurveyReportData;
  subscribers: SurveyReportData;
  visitorsIsLive?: boolean;
  subscribersIsLive?: boolean;
}) {
  const [tab, setTab] = useState<Tab>("visitors");

  const tabs: { id: Tab; label: string }[] = [
    { id: "visitors", label: "Visitors" },
    { id: "subscribers", label: "Subscribers" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              tab === t.id
                ? "bg-accent text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "visitors" ? (
        <SurveyReport report={visitors} isLive={visitorsIsLive} />
      ) : (
        <SurveyReport report={subscribers} isLive={subscribersIsLive} />
      )}
    </div>
  );
}
