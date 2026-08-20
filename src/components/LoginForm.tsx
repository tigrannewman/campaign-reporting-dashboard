"use client";

import { useActionState } from "react";
import { loginAction, completeNewPasswordAction, type LoginState, type NewPasswordState } from "@/lib/actions";

const inputClass =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";
const labelClass = "mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, undefined);

  if (state?.challenge === "NEW_PASSWORD_REQUIRED") {
    return <NewPasswordForm email={state.email} session={state.session} />;
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className={labelClass}>
          Email address
        </label>
        <input id="email" type="email" name="email" required autoComplete="email" className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      {state?.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>}

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

function NewPasswordForm({ email, session }: { email: string; session: string }) {
  const [state, formAction, pending] = useActionState<NewPasswordState, FormData>(
    completeNewPasswordAction,
    undefined
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="session" value={session} />

      <p className="text-sm text-slate-600">
        Set a new password for <span className="font-medium text-slate-900">{email}</span> to finish signing in.
      </p>

      <div>
        <label htmlFor="newPassword" className={labelClass}>
          New password
        </label>
        <input
          id="newPassword"
          type="password"
          name="newPassword"
          required
          autoComplete="new-password"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className={labelClass}>
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          required
          autoComplete="new-password"
          className={inputClass}
        />
      </div>

      {state?.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700 disabled:opacity-60"
      >
        {pending ? "Setting password…" : "Set password & sign in"}
      </button>
    </form>
  );
}
