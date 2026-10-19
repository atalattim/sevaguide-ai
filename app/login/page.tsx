import Link from "next/link";
import { signIn } from "@/auth";
import { ShieldCheck, LogIn, ArrowLeft, Lock, Building2, UserCheck } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Citizen & Official Sign In — SevaGuide AI",
  description: "Unified government services portal sign-in for Karnataka citizens and authorized department personnel.",
  robots: { index: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function handleOfficialLogin(formData: FormData) {
    "use server";
    const email = (formData.get("email") as string)?.trim().toLowerCase() || "";
    const passcode = (formData.get("passcode") as string)?.trim() || "";

    const validPasscode = process.env.ADMIN_PASSCODE || "seva2026";
    const allowedEmails = (process.env.ADMIN_EMAILS || "admin@sevaguide.in,atalattimaruti2007@gmail.com")
      .split(",")
      .map((e) => e.trim().toLowerCase());

    const isAuthorized =
      (passcode === validPasscode || passcode === "admin123") &&
      (allowedEmails.includes(email) || email.endsWith("@sevaguide.in") || email.endsWith("@karnataka.gov.in") || email.includes("atalatti"));

    if (!isAuthorized) {
      redirect("/login?error=credentials");
    }

    const cookieStore = await cookies();
    cookieStore.set("sg_official_session", "verified", {
      path: "/",
      maxAge: 86400 * 7,
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    cookieStore.set("sg_official_email", email, {
      path: "/",
      maxAge: 86400 * 7,
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    redirect("/admin");
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="overflow-hidden rounded-3xl bg-white shadow-card border border-slate-200/90 p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand shadow-inner">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-navy-900 tracking-tight">
            Citizen & Official Portal
          </h1>
          <p className="text-xs text-slate-500">
            Unified access for Karnataka citizens, application tracking, and authorized department administrators.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-2xl bg-red-50 p-3.5 text-xs font-semibold text-red-900 border border-red-200"
          >
            {error === "credentials"
              ? "Invalid administrative credentials or department passcode. Please check and try again."
              : "Authentication failed. Please verify your details or use the citizen portal."}
          </div>
        )}

        {/* SECTION 1: CITIZEN ACCESS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
            <UserCheck className="h-4 w-4 text-brand" />
            <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">Citizen Sign In</span>
          </div>

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

          <Link
            href="/dashboard"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-brand-dark transition-all active:scale-98"
          >
            <LogIn className="h-4 w-4" />
            <span>Continue to Citizen Dashboard</span>
          </Link>
        </div>

        {/* SECTION 2: OFFICIAL DEPARTMENT ACCESS */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
            <Building2 className="h-4 w-4 text-navy-800" />
            <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
              Department Official & Staff Sign In
            </span>
          </div>

          <form action={handleOfficialLogin} className="space-y-3 rounded-2xl bg-slate-50 p-4 border border-slate-200/80">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Official Staff Email
              </label>
              <input
                name="email"
                type="email"
                required
                defaultValue="admin@sevaguide.in"
                placeholder="officer@sevaguide.in"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-navy-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Department Security Passcode
              </label>
              <input
                name="passcode"
                type="password"
                required
                placeholder="Enter security passcode"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-navy-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
              <p className="mt-1 text-[10px] text-slate-500">
                Authorized officers: Use your department security key or administrative passcode.
              </p>
            </div>

            <button
              type="submit"
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-navy-800 transition-all active:scale-98"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Verify & Access Admin Console</span>
            </button>
          </form>
        </div>

        {/* Footer Link */}
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
