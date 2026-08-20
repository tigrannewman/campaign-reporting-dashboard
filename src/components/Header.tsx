"use client";

import { useEffect, useRef, useState } from "react";
import PrelaunchLogo from "./PrelaunchLogo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <PrelaunchLogo className="h-7 w-auto text-slate-900" />

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-medium text-slate-900">Tigran</p>
                <p className="truncate text-xs text-slate-500">tigran@prelaunch.com</p>
              </div>
              <button className="w-full px-4 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50">
                Profile
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-red-600 transition hover:bg-red-50">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
