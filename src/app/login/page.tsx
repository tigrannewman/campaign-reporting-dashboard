import PrelaunchLogo from "@/components/PrelaunchLogo";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex justify-center">
          <PrelaunchLogo className="h-8 w-auto text-slate-900" />
        </div>
        <h1 className="mb-1 text-center text-lg font-semibold text-slate-900">Sign in</h1>
        <p className="mb-6 text-center text-sm text-slate-500">Sign in to your dashboard.</p>
        <LoginForm />
      </div>
    </div>
  );
}
