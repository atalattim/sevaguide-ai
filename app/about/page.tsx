import Link from "next/link";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { 
  ShieldCheck, 
  HelpCircle, 
  HeartHandshake, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Landmark,
  ArrowRight
} from "lucide-react";

export const metadata = {
  title: "About SevaGuide AI — Independent Citizen Service Platform",
  description:
    "Learn about our mission to make government services transparent, simple, and accessible for Karnataka citizens.",
};

export default async function AboutPage() {
  const lang = await getLang();
  const dict = t(lang);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-slate-50 p-6 sm:p-12 border border-slate-200/80 shadow-sm text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Independent Civic-Tech Initiative</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-navy-900">
          About SevaGuide AI
        </h1>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
          {dict.tagline} — Empowering Indian citizens with plain-language explanations of government eligibility, document requirements, and step-by-step application procedures.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-card border border-slate-200/80 space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-brand">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-navy-900">AI-Powered Simplicity</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Bureaucratic legalese is translated into simple, digestible steps in English and Kannada with verified criteria.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-card border border-slate-200/80 space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-govgreen">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-navy-900">100% Free for Citizens</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            SevaGuide AI does not charge any citizen fees, commission, or service markup. Guidance is open and accessible to all.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-card border border-slate-200/80 space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-govorange">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-navy-900">Zero Middlemen</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Directing citizens exclusively to authorized government portals (Nadakacheri, Seva Sindhu, Bhoomi) to eliminate fraud.
          </p>
        </div>
      </div>

      {/* Mandatory Official Independence Disclaimer */}
      <div className="rounded-3xl bg-amber-50/90 p-8 border border-amber-200/90 space-y-4">
        <div className="flex items-center gap-2.5 font-bold text-amber-900 text-lg">
          <AlertTriangle className="h-6 w-6 text-govorange" />
          <span>Statutory Clarification & Transparency Notice</span>
        </div>
        <div className="space-y-3 text-xs sm:text-sm text-amber-950 leading-relaxed">
          <p>
            <strong>1. Not a Government Agency:</strong> SevaGuide AI is an independent, non-governmental civic technology platform developed to simplify public access to government information. It is not affiliated with, authorized by, or endorsed by the Government of Karnataka, the Government of India, or any statutory department.
          </p>
          <p>
            <strong>2. Application Submissions:</strong> SevaGuide AI does NOT collect statutory fees, process official applications, or issue government certificates. All actual applications must be submitted directly through official government portals such as <a className="underline font-semibold" href="https://sevasindhu.karnataka.gov.in" target="_blank" rel="noreferrer">sevasindhu.karnataka.gov.in</a> or authorized physical centers (Grama One / Bangalore One / Karnataka One).
          </p>
          <p>
            <strong>3. Rule Changes:</strong> Government schemes, eligibility criteria, and fee schedules are subject to periodic administrative amendments. While our team continuously verifies information against official notifications, citizens are advised to verify critical deadlines and fee amounts on the official government portal before final submission.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-navy-900">Ready to explore government services?</h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/services"
            className="rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-brand-dark transition-all"
          >
            Browse Services
          </Link>
          <Link
            href="/ai-assistant"
            className="rounded-xl border border-brand px-6 py-3 text-sm font-bold text-brand hover:bg-brand-soft transition-all"
          >
            Ask SevaGuide AI
          </Link>
        </div>
      </div>
    </div>
  );
}
