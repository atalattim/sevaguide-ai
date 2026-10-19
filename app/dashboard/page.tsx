import Link from "next/link";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { auth } from "@/auth";
import { 
  FileText, 
  Bookmark, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  Bell, 
  User, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Search,
  Landmark
} from "lucide-react";
import { searchServices } from "@/lib/services";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Citizen Dashboard — SevaGuide AI",
  description: "Track your government applications, view saved service checklists, and review AI queries.",
};

export default async function DashboardPage() {
  const lang = await getLang();
  const dict = t(lang);
  let userEmail = "citizen@karnataka.gov.in";

  try {
    const session = await auth();
    if (session?.user?.email) {
      userEmail = session.user.email;
    }
  } catch {}

  const allServices = await searchServices({});
  const savedServices = allServices.slice(0, 3);
  const recommendedServices = allServices.slice(3, 6);

  const stats = [
    { label: "Active Applications", count: "2", icon: FileText, color: "text-brand", bg: "bg-blue-50" },
    { label: "Saved Services", count: "4", icon: Bookmark, color: "text-govgreen", bg: "bg-emerald-50" },
    { label: "AI Queries", count: "12", icon: MessageSquare, color: "text-govorange", bg: "bg-amber-50" },
    { label: "Checklists Ready", count: "5", icon: CheckCircle, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  const recentApplications = [
    {
      id: "GSC-2026-981245",
      service: "Income Certificate (ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ)",
      dept: "Revenue Department Karnataka",
      appliedDate: "Sep 28, 2026",
      status: "Under Field Verification",
      statusColor: "bg-amber-50 text-amber-800 border-amber-200",
      officialUrl: "https://nadakacheri.karnataka.gov.in",
    },
    {
      id: "SSP-2026-440192",
      service: "State Post-Matric Scholarship",
      dept: "Social Welfare Department",
      appliedDate: "Sep 15, 2026",
      status: "College E-Attested",
      statusColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      officialUrl: "https://ssp.postmatric.karnataka.gov.in",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 p-6 sm:p-10 text-white shadow-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-200 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-govgreen" />
            <span>Verified Citizen Profile</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Namaskara, Citizen
          </h1>
          <p className="text-sm text-slate-300">
            Signed in as: <span className="font-semibold text-white">{userEmail}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/services"
            className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition-all border border-white/20"
          >
            <Search className="h-4 w-4" />
            <span>Browse Services</span>
          </Link>
          <Link
            href="/ai-assistant"
            className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-white shadow-glow hover:bg-brand-dark transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>Ask AI</span>
          </Link>
        </div>
      </div>

      {/* 4 Key Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={i}
              className="rounded-3xl bg-white p-5 sm:p-6 shadow-card border border-slate-100 flex flex-col justify-between"
            >
              <div className={`h-11 w-11 rounded-2xl ${st.bg} ${st.color} flex items-center justify-center mb-3`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-navy-900">{st.count}</span>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">{st.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Applications Tracking Section */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-brand" />
            <h2 className="text-lg sm:text-xl font-bold text-navy-900">Recent Applications Tracking</h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">Sakala Right to Services Guaranteed</span>
        </div>

        <div className="space-y-4">
          {recentApplications.map((app) => (
            <div
              key={app.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-slate-50 p-5 border border-slate-200/80 hover:bg-slate-100/60 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-brand uppercase tracking-wider">{app.id}</span>
                  <span className="text-xs text-slate-400">• Applied {app.appliedDate}</span>
                </div>
                <h3 className="text-base font-bold text-navy-900">{app.service}</h3>
                <p className="text-xs text-slate-500">{app.dept}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-bold border ${app.statusColor}`}>
                  {app.status}
                </span>
                <a
                  href={app.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-700 border border-slate-200 hover:border-brand hover:text-brand transition-colors"
                >
                  <span>Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Saved Services & Recommended Services */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Saved Services */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-govgreen" />
              <h2 className="text-lg font-bold text-navy-900">Saved Services</h2>
            </div>
            <Link href="/services" className="text-xs font-semibold text-brand hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {savedServices.map((svc) => (
              <Link
                key={svc.id}
                href={`/services/${svc.slug}`}
                className="group flex items-center justify-between rounded-2xl p-3.5 border border-slate-100 hover:border-brand/40 hover:bg-slate-50 transition-all"
              >
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-navy-900 group-hover:text-brand transition-colors">
                    {lang === "kn" && svc.nameKn ? svc.nameKn : svc.name}
                  </h4>
                  <p className="text-xs text-slate-500">{svc.department}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 group-hover:text-brand transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recommended Schemes */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-govorange" />
              <h2 className="text-lg font-bold text-navy-900">Recommended for You</h2>
            </div>
            <span className="text-xs font-semibold text-slate-400">Based on Karnataka Residence</span>
          </div>

          <div className="space-y-3">
            {recommendedServices.map((svc) => (
              <Link
                key={svc.id}
                href={`/services/${svc.slug}`}
                className="group flex items-center justify-between rounded-2xl p-3.5 border border-slate-100 hover:border-brand/40 hover:bg-slate-50 transition-all"
              >
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-navy-900 group-hover:text-brand transition-colors">
                    {lang === "kn" && svc.nameKn ? svc.nameKn : svc.name}
                  </h4>
                  <p className="text-xs text-slate-500">{svc.department}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 group-hover:text-brand transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications & Alert Feed */}
      <div className="rounded-3xl bg-blue-50/70 p-6 border border-blue-200/80 space-y-3">
        <div className="flex items-center gap-2 font-bold text-brand-dark text-sm">
          <Bell className="h-4 w-4 text-brand" />
          <span>Government Notifications & Intake Windows</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          State Scholarship Portal (SSP) post-matric e-attestation window is currently open for the current academic session. Make sure your Aadhaar is seeded with your bank account for seamless DBT credits.
        </p>
      </div>
    </div>
  );
}
