"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/lib/actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
          Email address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
