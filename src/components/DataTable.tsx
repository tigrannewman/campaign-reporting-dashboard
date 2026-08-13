import { ReactNode } from "react";

export function TableCard({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900">
      {title && (
        <div className="border-b border-black/10 px-5 py-3 dark:border-white/10">
          <h2 className="text-sm font-semibold text-black/80 dark:text-white/80">{title}</h2>
        </div>
      )}
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

export function Th({ children }: { children: ReactNode }) {
  return (
    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
      {children}
    </th>
  );
}

export function Td({ children }: { children: ReactNode }) {
  return (
    <td className="whitespace-nowrap px-4 py-3 text-sm text-black/80 dark:text-white/80">
      {children}
    </td>
  );
}
