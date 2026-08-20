"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { campaigns } from "@/lib/data";

export default function CampaignChips() {
  const pathname = usePathname();

  const items = [
    { href: "/", label: "All" },
    ...campaigns.map((c) => ({ href: `/campaign/${c.id}`, label: c.name })),
  ];

  return (
    <div className="flex flex-wrap gap-2 px-4 py-4 sm:px-6">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              active
                ? "bg-accent text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
