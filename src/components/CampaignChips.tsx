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
                ? "bg-indigo-600 text-white"
                : "bg-black/5 text-black/70 hover:bg-black/10 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
