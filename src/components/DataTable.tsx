import { ReactNode } from "react";

export function TableCard({
  title,
  titleDot,
  badge,
  children,
}: {
  title?: string;
  titleDot?: ReactNode;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            {title}
            {titleDot}
          </h2>
          {badge}
        </div>
      )}
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

// `border` doesn't reliably stay attached to a sticky table cell while
// scrolling under border-collapse, so the frozen edge is faked with an
// inset box-shadow (a solid line plus a soft drop shadow) instead.
const STICKY_EDGE = "shadow-[inset_-1px_0_0_0_#cbd5e1,3px_0_6px_-3px_rgba(0,0,0,0.12)]";

export function Th({ children, sticky }: { children: ReactNode; sticky?: boolean }) {
  return (
    <th
      className={`whitespace-nowrap bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400 ${
        sticky ? `sticky left-0 z-20 ${STICKY_EDGE}` : ""
      }`}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  sticky,
  wrap = false,
  stickyBg = "bg-white group-hover:bg-slate-50",
}: {
  children: ReactNode;
  sticky?: boolean;
  wrap?: boolean;
  stickyBg?: string;
}) {
  return (
    <td
      className={`px-4 py-3 text-sm text-slate-700 ${wrap ? "min-w-[280px] max-w-[480px] whitespace-normal" : "whitespace-nowrap"} ${
        sticky ? `sticky left-0 z-10 ${stickyBg} ${STICKY_EDGE}` : ""
      }`}
    >
      {children}
    </td>
  );
}
