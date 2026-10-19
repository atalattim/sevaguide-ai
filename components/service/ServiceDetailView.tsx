"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  ExternalLink, 
  Printer, 
  Share2, 
  Download, 
  Sparkles, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  AlertCircle, 
  ChevronRight,
  FileText,
  Landmark,
  Building,
  HelpCircle,
  CalendarCheck
} from "lucide-react";
import type { GovernmentService } from "@prisma/client";
import { pick, type Lang } from "@/lib/i18n";

interface ServiceDetailViewProps {
  svc: GovernmentService;
  lang: Lang;
  dict: any;
}

export default function ServiceDetailView({ svc, lang, dict }: ServiceDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "eligibility" | "documents" | "process" | "fees" | "faqs">("overview");
  const [checkedDocs, setCheckedDocs] = useState<string[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const title = lang === "kn" && svc.nameKn ? svc.nameKn : svc.name;
  const description = pick<string>(svc.description, lang) ?? "";
  const eligibility = pick<string[]>(svc.eligibility, lang) ?? [];
  const documents = pick<string[]>(svc.documents, lang) ?? [];
  const steps = pick<string[]>(svc.applicationSteps, lang) ?? [];
  const mistakes = pick<string[]>(svc.commonMistakes, lang) ?? [];
  const feesText = svc.fees 
    ? (typeof svc.fees === "string" ? svc.fees : pick<string>(svc.fees, lang) ?? "Statutory portal fee")
    : "Nominal Government Fee (Verify on portal)";
  const processingText = svc.processingInfo 
    ? (typeof svc.processingInfo === "string" ? svc.processingInfo : pick<string>(svc.processingInfo, lang) ?? "7 - 14 Days")
    : "7 - 14 Days";

  const storageKey = `checklist_${svc.slug}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCheckedDocs(JSON.parse(saved));
      }
    } catch {
      // Storage unavailable
    }
  }, [storageKey]);

  const toggleDoc = (doc: string) => {
    const updated = checkedDocs.includes(doc)
      ? checkedDocs.filter((d) => d !== doc)
      : [...checkedDocs, doc];
    setCheckedDocs(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // Storage unavailable
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = `SEVAGUIDE AI - DOCUMENT CHECKLIST
Service: ${title}
Department: ${svc.department}
Official Portal: ${svc.officialUrl || "https://sevasindhu.karnataka.gov.in"}

REQUIRED DOCUMENTS:
${documents.map((d, i) => `[${checkedDocs.includes(d) ? "X" : " "}] ${i + 1}. ${d}`).join("\n")}

APPLICATION PROCESS:
${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Note: Generated via SevaGuide AI. Independent citizen assistance portal.`;
    
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${svc.slug}-checklist.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} - SevaGuide AI`,
          text: `Check eligibility and documents for ${title} on SevaGuide AI`,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  const progressPercent = documents.length > 0 
    ? Math.round((checkedDocs.length / documents.length) * 100)
    : 0;

  const tabs = [
    { id: "overview", label: dict.tabOverview },
    { id: "eligibility", label: dict.tabEligibility },
    { id: "documents", label: dict.tabDocuments },
    { id: "process", label: dict.tabProcess },
    { id: "fees", label: dict.tabFees },
    { id: "faqs", label: dict.tabFAQs },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-brand transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/services" className="hover:text-brand transition-colors">
          Services
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy-900 font-semibold">{title}</span>
      </nav>

      {/* Main Title Header Card */}
      <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-card border border-slate-200/80 space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand border border-blue-200/60">
                {dict.cat[svc.category] ?? svc.category}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/60">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified Government Service</span>
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {svc.state}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Quick Actions (AI Ask & Official Portal) */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <Link
              href={`/ai-assistant?service=${svc.slug}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-blue-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-brand-dark transition-all"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Ask AI About This Service</span>
            </Link>

            {svc.officialUrl && (
              <a
                href={svc.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl border-2 border-brand bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-brand hover:bg-brand-soft transition-all"
              >
                <span>{dict.openOfficialPortal}</span>
              </a>
            )}
          </div>
        </div>

        {/* Key Information Strip */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 border-t border-slate-100 pt-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {dict.keyDept}
            </span>
            <p className="text-xs sm:text-sm font-semibold text-navy-900 line-clamp-2">
              {svc.department}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {dict.keyMode}
            </span>
            <p className="text-xs sm:text-sm font-semibold text-navy-900">
              Online / CSC / Citizen Center
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {dict.keyTime}
            </span>
            <p className="text-xs sm:text-sm font-semibold text-navy-900">
              {processingText}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {dict.keyFee}
            </span>
            <p className="text-xs sm:text-sm font-semibold text-navy-900">
              {feesText}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {dict.keyValidity}
            </span>
            <p className="text-xs sm:text-sm font-semibold text-navy-900">
              5 Years / Permanent
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-4 text-sm font-semibold transition-all border-b-2 shrink-0 ${
                isActive
                  ? "border-brand text-brand font-bold"
                  : "border-transparent text-slate-500 hover:text-navy-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-4">
            <h3 className="text-xl font-bold text-navy-900">About {title}</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {description}
            </p>

            <div className="rounded-2xl bg-blue-50/70 p-4 border border-blue-200/60 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-brand text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>Notice on Statutory Compliance</span>
              </div>
              <p className="text-xs text-slate-600">
                This service is provided under the Karnataka Right to Services Act (Sakala). Citizens have a legal right to receive the approved certificate or a reasoned rejection within the stipulated statutory timeline.
              </p>
            </div>
          </div>

          {/* Common Mistakes Warning Card */}
          {mistakes.length > 0 && (
            <div className="rounded-3xl bg-amber-50/80 p-6 sm:p-8 border border-amber-200/80 space-y-4">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-base">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <span>Common Mistakes to Avoid During Application</span>
              </div>
              <ul className="space-y-2">
                {mistakes.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-amber-900">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ELIGIBILITY */}
      {activeTab === "eligibility" && (
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-6">
          <h3 className="text-xl font-bold text-navy-900">Who Can Apply? (Eligibility Criteria)</h3>
          <div className="space-y-3">
            {eligibility.map((criterion, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <CheckCircle2 className="h-5 w-5 text-govgreen shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700 leading-relaxed">
                  {criterion}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DOCUMENTS CHECKLIST */}
      {activeTab === "documents" && (
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h3 className="text-xl font-bold text-navy-900">{dict.reqDocsTitle}</h3>
              <p className="mt-1 text-xs text-slate-500">{dict.checklistStoredLocal}</p>
            </div>

            {/* Checklist action bar */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>{dict.printChecklist}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{dict.downloadChecklist}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>{copySuccess ? "Copied!" : dict.shareChecklist}</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-navy-900">
              <span>{checkedDocs.length} / {documents.length} {dict.docsReady}</span>
              <span className="text-brand">{progressPercent}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full bg-gradient-to-r from-brand to-govgreen transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {checkedDocs.length === documents.length && (
              <p className="text-xs font-semibold text-govgreen">
                ✓ {dict.allDocsReadyNotice}
              </p>
            )}
          </div>

          {/* Interactive Document Checklist List */}
          <div className="space-y-3 pt-2">
            {documents.map((doc, idx) => {
              const isChecked = checkedDocs.includes(doc);
              return (
                <label
                  key={idx}
                  className={`flex cursor-pointer items-center gap-3.5 rounded-2xl p-4 transition-all border ${
                    isChecked
                      ? "bg-emerald-50/50 border-emerald-200 text-slate-800"
                      : "bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100/60"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleDoc(doc)}
                    className="h-5 w-5 rounded border-slate-300 text-brand focus:ring-brand accent-[#2563EB]"
                  />
                  <span className={`text-sm font-medium ${isChecked ? "line-through text-slate-400" : ""}`}>
                    {doc}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: APPLICATION PROCESS (Timeline 1 to 7 steps) */}
      {activeTab === "process" && (
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-6">
          <h3 className="text-xl font-bold text-navy-900">{dict.applicationTimelineTitle}</h3>
          
          <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <div className="absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-extrabold text-white ring-4 ring-white shadow">
                  {idx + 1}
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 w-full space-y-1">
                  <h4 className="text-sm font-bold text-navy-900">Step {idx + 1}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Guidance vs Official Portal Warning */}
          <div className="rounded-2xl border border-blue-200 bg-brand-soft p-5 space-y-3">
            <h4 className="text-sm font-bold text-brand-dark flex items-center gap-2">
              <Landmark className="h-4 w-4 text-brand" />
              <span>{dict.guidanceVsOfficialTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700">
              {dict.guidanceVsOfficialText}
            </p>
            {svc.officialUrl && (
              <a
                href={svc.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-dark transition-all"
              >
                <span>{dict.openOfficialPortal}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: FEES */}
      {activeTab === "fees" && (
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-6">
          <h3 className="text-xl font-bold text-navy-900">Government Fees & Mode of Payment</h3>
          <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-govgreen font-bold text-lg">
                ₹
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Statutory Fee</span>
                <h4 className="text-xl font-extrabold text-navy-900">{feesText}</h4>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Official charges cover portal facilitation, SMS acknowledgment, and digital signing. Never pay more than the printed receipt amount at citizen service centers.
            </p>
          </div>
        </div>
      )}

      {/* TAB 6: FAQS */}
      {activeTab === "faqs" && (
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-6">
          <h3 className="text-xl font-bold text-navy-900">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-1.5">
              <h4 className="text-sm font-bold text-navy-900">How do I track my application status?</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When you submit an application on Nadakacheri or Seva Sindhu, you receive a 15-digit GSC acknowledgment number. Enter this number under 'Check Status' on the portal or visit any Grama One center to check real-time progress.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-1.5">
              <h4 className="text-sm font-bold text-navy-900">What if my certificate is rejected?</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Under the Sakala Act, the revenue officer must issue a formal rejection endorsement citing specific missing documents. You can re-apply by uploading the corrected proofs without any penalty.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-1.5">
              <h4 className="text-sm font-bold text-navy-900">Can I download the digitally signed certificate online?</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Yes! Once approved by the Tahsildar / RI, you can download the digitally signed PDF certificate anytime by entering your application number. It is legally valid everywhere with QR-code verification.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
