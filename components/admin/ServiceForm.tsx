"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ServiceForm as F } from "@/lib/validation/service";
import { ShieldCheck, Trash2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

const CATS = [
  "certificates",
  "education",
  "schemes",
  "revenue",
  "transport",
  "health",
  "employment",
  "identity",
  "agriculture",
];

const inp = "min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-navy-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10 transition-all";

export default function ServiceForm({ id, initial }: { id?: string; initial: F }) {
  const router = useRouter();
  const [f, setF] = useState<F>(initial);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof F) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setF({ ...f, [k]: e.target.value });

  const text = (k: keyof F, label: string, hint?: string) => (
    <label className="block space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-navy-900">{label}</span>
        {hint && <span className="text-[10px] text-slate-400">{hint}</span>}
      </div>
      <input value={f[k]} onChange={set(k)} className={inp} />
    </label>
  );

  const area = (k: keyof F, label: string, rows = 4) => (
    <label className="block space-y-1">
      <span className="text-xs font-bold text-navy-900">{label}</span>
      <textarea value={f[k]} onChange={set(k)} rows={rows} className={`${inp} py-2.5 resize-y`} />
    </label>
  );

  async function save() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(id ? `/api/admin/services/${id}` : "/api/admin/services", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const d = await res.json().catch(() => ({}));
      setBusy(false);
      if (!res.ok) return setErr(d.error ?? "Could not save service");
      router.push("/admin");
      router.refresh();
    } catch {
      setBusy(false);
      setErr("Failed to communicate with service API");
    }
  }

  async function remove() {
    if (!id || !confirm("Delete this government service? This action cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setErr("Could not delete service");
      }
    } catch {
      setErr("Failed to delete service");
    }
  }

  const markVerified = () =>
    setF({
      ...f,
      status: "VERIFIED",
      lastVerifiedAt: new Date().toISOString().slice(0, 10),
    });

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <Link href="/admin" className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline">
            <ArrowLeft className="h-3 w-3" />
            <span>Back to Services</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-900">
            {id ? `Edit: ${f.name || "Service"}` : "Create New Government Service"}
          </h1>
        </div>

        <button
          type="button"
          onClick={markVerified}
          className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-sm"
        >
          <ShieldCheck className="h-4 w-4 text-govgreen" />
          <span>Mark Verified Today</span>
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {text("name", "Service Name (English)", "e.g. Income Certificate")}
        {text("nameKn", "Service Name (Kannada)", "e.g. ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ")}
        {text("slug", "URL Slug", "unique identifier (e.g. income-certificate)")}
        {text("department", "Government Department", "e.g. Revenue Department")}

        <label className="block space-y-1">
          <span className="text-xs font-bold text-navy-900">Jurisdiction Level</span>
          <select value={f.state} onChange={set("state")} className={inp}>
            <option>Karnataka</option>
            <option>Central</option>
          </select>
        </label>

        <label className="block space-y-1">
          <span className="text-xs font-bold text-navy-900">Category</span>
          <select value={f.category} onChange={set("category")} className={inp}>
            {CATS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        {text("officialUrl", "Official Portal Link (https only)")}
        {text("sourceUrl", "Verification Source URL")}

        <label className="block space-y-1">
          <span className="text-xs font-bold text-navy-900">Verification Status</span>
          <select value={f.status} onChange={set("status")} className={inp}>
            <option>VERIFIED</option>
            <option>NEEDS_VERIFICATION</option>
            <option>DEMO</option>
          </select>
        </label>

        <label className="block space-y-1">
          <span className="text-xs font-bold text-navy-900">Last Verified Date</span>
          <input
            type="date"
            value={f.lastVerifiedAt}
            onChange={set("lastVerifiedAt")}
            className={inp}
          />
        </label>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Detailed Criteria & Bilingual Translations (One item per line for lists)
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {area("descEn", "Description (English)", 3)}
          {area("descKn", "Description (Kannada)", 3)}
          {area("eligEn", "Eligibility Criteria (English)")}
          {area("eligKn", "Eligibility Criteria (Kannada)")}
          {area("docsEn", "Required Documents (English)")}
          {area("docsKn", "Required Documents (Kannada)")}
          {area("stepsEn", "Step-by-Step Process (English)")}
          {area("stepsKn", "Step-by-Step Process (Kannada)")}
          {area("mistEn", "Common Mistakes (English)", 3)}
          {area("mistKn", "Common Mistakes (Kannada)", 3)}
          {area("feesEn", "Fees Breakdown (English)", 2)}
          {area("feesKn", "Fees Breakdown (Kannada)", 2)}
          {area("procEn", "Processing Time (English)", 2)}
          {area("procKn", "Processing Time (Kannada)", 2)}
        </div>
      </div>

      {err && (
        <div role="alert" className="rounded-2xl bg-red-50 p-4 text-xs font-bold text-red-900 border border-red-200">
          {err}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <button
          onClick={save}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-brand-dark transition-all disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>{busy ? "Saving Service..." : "Save Service"}</span>
        </button>

        {id && (
          <button
            onClick={remove}
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-700 hover:bg-red-100 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </button>
        )}
      </div>
    </div>
  );
}
