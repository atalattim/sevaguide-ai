import Link from "next/link";
import { signIn } from "@/auth";
import { ShieldCheck, LogIn, ArrowLeft, Lock } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Citizen & Admin Sign In — SevaGuide AI",
  robots: { index: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function handleDemoAdminLogin() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.set("sg_admin_session", "authorized_demo_admin", {
      path: "/",
      maxAge: 86400 * 7,
      sameSite: "lax",
      httpOnly: true,
    });
    redirect("/admin");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="overflow-hidden rounded-3xl bg-white shadow-card border border-slate-200/90 p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand shadow-inner">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-navy-900 tracking-tight">
            Sign In to SevaGuide AI
          </h1>
          <p className="text-xs text-slate-500">
            Access your personalized applications dashboard, saved checklists, and administrator controls.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-2xl bg-red-50 p-3.5 text-xs font-semibold text-red-900 border border-red-200"
          >
            Authentication failed or your Google account is not on the authorized list.
          </div>
        )}

        <div className="space-y-3">
          {/* Google OAuth Form */}
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-98"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>

          {/* Citizen Direct Entry */}
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-navy-900 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-navy-800 transition-all active:scale-98"
            >
              <LogIn className="h-4 w-4" />
              <span>Enter Citizen Dashboard</span>
            </Link>
          </div>

          {/* Direct Administrator Login */}
          <div className="pt-1">
            <form action={handleDemoAdminLogin}>
              <button
                type="submit"
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-brand/30 bg-brand-soft px-4 py-2.5 text-xs font-bold text-brand hover:bg-brand/10 transition-all active:scale-98"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Enter Admin Console (Staff Demo Access)</span>
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
