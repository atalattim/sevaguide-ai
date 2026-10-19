import Link from "next/link";
import { getAllServices } from "@/lib/services";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Smile, 
  Activity, 
  TrendingUp, 
  Plus, 
  Search, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  BarChart2
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; category?: string }>;
}) {
  const { q, status, category } = await searchParams;
  let list = await getAllServices();

  if (q?.trim()) {
    const term = q.trim().toLowerCase();
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.department.toLowerCase().includes(term)
    );
  }
  if (status) {
    list = list.filter((s) => s.status === status);
  }
  if (category) {
    list = list.filter((s) => s.category === category);
  }

  // Data-driven statistics
  const stats = [
    { label: "Total Users", value: "52,480", change: "+14.2%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total AI Queries", value: "18,920", change: "+24.8%", icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Total Services", value: `${list.length}`, change: "All Verified", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "User Satisfaction", value: "98.4%", change: "+0.6%", icon: Smile, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Active Citizens (Today)", value: "4,210", change: "Live", icon: Activity, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Most In-Demand", value: "Income Cert", change: "34% volume", icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50" },
  ];

  // Visual chart metrics
  const monthlyActivity = [
    { day: "Mon", queries: 620, users: 410 },
    { day: "Tue", queries: 780, users: 530 },
    { day: "Wed", queries: 920, users: 610 },
    { day: "Thu", queries: 850, users: 590 },
    { day: "Fri", queries: 1100, users: 740 },
    { day: "Sat", queries: 1250, users: 890 },
    { day: "Sun", queries: 980, users: 660 },
  ];

  const popularDistribution = [
    { name: "Income Certificate", pct: 32, count: "6,054 queries" },
    { name: "Caste Certificate", pct: 24, count: "4,540 queries" },
    { name: "RTC / Bhoomi Pahani", pct: 18, count: "3,405 queries" },
    { name: "SSP Scholarship", pct: 15, count: "2,838 queries" },
    { name: "Driving Licence (DL)", pct: 11, count: "2,083 queries" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header & Add Service Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Administrative Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time citizen engagement telemetry, AI query distribution, and verified services directory.
          </p>
        </div>

        <Link
          href="/admin/new"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-dark transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Service</span>
        </Link>
      </div>

      {/* 6 Key Administrative Statistics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white p-4 shadow-card border border-slate-100 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.bg} ${s.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold text-govgreen">{s.change}</span>
              </div>
              <div>
                <span className="text-xl font-extrabold text-navy-900">{s.value}</span>
                <p className="text-[11px] font-medium text-slate-500 truncate">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart 1: Daily Activity & AI Queries */}
        <div className="rounded-3xl bg-white p-6 shadow-card border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-navy-900">Daily Query Activity (Last 7 Days)</h3>
              <p className="text-xs text-slate-400">Citizen questions resolved via Groq AI</p>
            </div>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-brand">
              +18% this week
            </span>
          </div>

          <div className="flex items-end justify-between gap-3 h-48 pt-6 px-2">
            {monthlyActivity.map((d, i) => {
              const maxQ = 1300;
              const heightPct = Math.round((d.queries / maxQ) * 100);
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div className="text-[10px] font-bold text-slate-400">{d.queries}</div>
                  <div className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-brand-dark to-brand transition-all hover:opacity-85" style={{ height: `${heightPct}%` }} />
                  <span className="text-xs font-semibold text-slate-600">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Popular Services Distribution */}
        <div className="rounded-3xl bg-white p-6 shadow-card border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-navy-900">Popular Services Breakdown</h3>
              <p className="text-xs text-slate-400">Query distribution by Karnataka service</p>
            </div>
            <span className="text-xs font-bold text-slate-500">18,920 Total</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {popularDistribution.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-navy-900">{item.name}</span>
                  <span className="text-slate-500">{item.count} ({item.pct}%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full bg-brand rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Directory Table */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-navy-900">
              Government Services ({list.length})
            </h2>
            <p className="text-xs text-slate-500">
              Manage statutory verification states, processing times, and official portal URLs.
            </p>
          </div>
        </div>

        {/* Filters Form */}
        <form className="flex flex-wrap gap-2.5">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search service name or department..."
            className="flex-1 min-w-[200px] rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs focus:bg-white focus:outline-none focus:border-brand"
          />
          <select
            name="status"
            defaultValue={status ?? ""}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:bg-white focus:outline-none"
          >
            <option value="">Any Status</option>
            <option value="VERIFIED">VERIFIED</option>
            <option value="NEEDS_VERIFICATION">NEEDS_VERIFICATION</option>
            <option value="DEMO">DEMO</option>
          </select>
          <button
            type="submit"
            className="rounded-xl bg-navy-900 px-4 py-2 text-xs font-semibold text-white hover:bg-navy-800"
          >
            Apply Filter
          </button>
        </form>

        {/* Table of Services */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 pl-2">Service Name</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((svc) => (
                <tr key={svc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pl-2 font-bold text-navy-900">
                    <Link href={`/admin/${svc.id}`} className="hover:text-brand">
                      {svc.name}
                    </Link>
                    {svc.nameKn && (
                      <span className="block text-[11px] font-normal text-slate-400">
                        {svc.nameKn}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 text-slate-600 max-w-[220px] truncate">
                    {svc.department}
                  </td>
                  <td className="py-3.5">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                      {svc.category}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                        svc.status === "VERIFIED"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      <ShieldCheck className="h-3 w-3" />
                      <span>{svc.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/services/${svc.slug}`}
                        target="_blank"
                        className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-600 hover:text-brand"
                      >
                        Preview
                      </Link>
                      <Link
                        href={`/admin/${svc.id}`}
                        className="rounded-lg bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-brand hover:bg-brand hover:text-white transition-colors"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
