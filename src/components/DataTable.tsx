import { ReactNode } from "react";

export function TableCard({
  title,
  badge,
  children,
}: {
  title?: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
          <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
          {badge}
        </div>
      )}
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

export function Th({ children }: { children: ReactNode }) {
  return (
    <th className="whitespace-nowrap bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
      {children}
    </th>
  );
}

export function Td({ children }: { children: ReactNode }) {
  return (
    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
      {children}
    </td>
  );
}
