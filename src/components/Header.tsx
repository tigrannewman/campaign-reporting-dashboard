"use client";

import { useEffect, useRef, useState } from "react";

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
    <header className="sticky top-0 z-20 border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white">
            P
          </div>
          <span className="text-lg font-semibold tracking-tight">Prelaunch</span>
        </div>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-black/10 text-foreground transition hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-black/10 bg-white shadow-lg dark:border-white/15 dark:bg-neutral-900">
              <div className="border-b border-black/10 px-4 py-3 dark:border-white/10">
                <p className="text-sm font-medium">Tigran</p>
                <p className="truncate text-xs text-black/50 dark:text-white/50">tigran@prelaunch.com</p>
              </div>
              <button className="w-full px-4 py-2 text-left text-sm text-black/70 transition hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10">
                Profile
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/40">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
