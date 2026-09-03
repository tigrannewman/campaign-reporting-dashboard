"use client";

import { useState } from "react";

type Segment = {
  label: string;
  value: number;
  color: string;
};

type Hover = {
  label: string;
  value: number;
  x: number;
  y: number;
};

export default function DonutChart({ segments }: { segments: Segment[] }) {
  const [hover, setHover] = useState<Hover | null>(null);
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = 70;
  const stroke = 34;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  const showTooltip = (e: React.MouseEvent<SVGCircleElement>, s: Segment) => {
    const rect = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
    setHover({ label: s.label, value: s.value, x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="relative flex flex-col items-center gap-5 sm:flex-row" onMouseLeave={() => setHover(null)}>
      <svg viewBox="0 0 200 200" className="h-44 w-44 shrink-0 -rotate-90">
        <circle cx="100" cy="100" r={radius} fill="none" strokeWidth={stroke} className="stroke-slate-100" />
        {segments.map((s, i) => {
          const fraction = total > 0 ? s.value / total : 0;
          const dash = fraction * circumference;
          const gap = circumference - dash;
          const offset = (cumulative / total) * circumference;
          cumulative += s.value;
          return (
            <circle
              key={i}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              className="cursor-default"
              onMouseEnter={(e) => showTooltip(e, s)}
              onMouseMove={(e) => showTooltip(e, s)}
            />
          );
        })}
      </svg>

      {hover && (
        <div
          className="pointer-events-none absolute z-20 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg"
          style={{ left: hover.x, top: hover.y, transform: "translate(-50%, -130%)" }}
        >
          {hover.label}: {hover.value}%
        </div>
      )}

      <ul className="flex w-full flex-col gap-1.5 text-sm">
        {segments.map((s, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-slate-600"
            onMouseEnter={(e) => setHover({ label: s.label, value: s.value, x: e.currentTarget.offsetLeft, y: e.currentTarget.offsetTop })}
            onMouseLeave={() => setHover(null)}
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="truncate">{s.label}</span>
            <span className="ml-auto shrink-0 text-slate-400">{s.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
