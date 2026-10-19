import Link from "next/link";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import SearchForm from "@/components/SearchForm";
import PrimaryCtaCards from "@/components/PrimaryCtaCards";
import TrustStrip from "@/components/TrustStrip";
import ServiceCard from "@/components/ServiceCard";
import { searchServices } from "@/lib/services";
import { Sparkles, ArrowRight, CheckCircle2, Shield, Landmark } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const lang = await getLang();
  const dict = t(lang);
  const featuredServices = await searchServices({});

  const popularChips = [
    { en: "Income Certificate", kn: "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ", slug: "income-certificate" },
    { en: "Caste Certificate", kn: "ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ", slug: "caste-certificate" },
    { en: "Residence Certificate", kn: "ವಾಸಸ್ಥಳ ಪ್ರಮಾಣಪತ್ರ", slug: "residence-certificate" },
    { en: "Scholarship", kn: "ವಿದ್ಯಾರ್ಥಿವೇತನ", slug: "scholarship" },
    { en: "RTC (Pahani)", kn: "ಆರ್‌ಟಿಸಿ (ಪಹಣಿ)", slug: "rtc" },
    { en: "Driving Licence", kn: "ಚಾಲನಾ ಪರವಾನಗಿ", slug: "driving-licence" },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-mist to-mist pt-8 pb-12 sm:pt-14 sm:pb-20">
        {/* Subtle decorative civic background accents */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <svg className="h-[700px] w-[700px]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Government Services Made Simple Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs sm:text-sm font-semibold text-brand-dark shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-govgreen" />
              <span>{dict.badgeGovSimple}</span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-navy-900 leading-[1.12]">
              {dict.heroTitle1}{" "}
              <br className="hidden sm:inline" />
              <span className="text-gradient-blue">{dict.heroTitle2}</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {dict.heroSubtitle}
            </p>

            {/* Large Search Bar */}
            <div className="mx-auto mt-8 max-w-2xl">
              <SearchForm lang={lang} />
            </div>

            {/* Popular Services Chips */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="mr-1 text-xs font-semibold text-slate-400">
                {dict.popularServices}:
              </span>
              {popularChips.map((chip) => {
                const label = lang === "kn" ? chip.kn : chip.en;
                return (
                  <Link
                    key={chip.slug}
                    href={`/services/${chip.slug}`}
                    className="rounded-full border border-slate-200/90 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-all hover:border-brand hover:text-brand hover:shadow"
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PRIMARY CTA & TRUST METRICS CONTAINER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Two Large Primary CTA Cards */}
        <PrimaryCtaCards lang={lang} />

        {/* Trust Strip & Configurable Statistics */}
        <TrustStrip lang={lang} />
      </section>

      {/* POPULAR GOVERNMENT SERVICES SHOWCASE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
              <Landmark className="h-4 w-4" />
              <span>Karnataka Civic Directory</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-navy-900">
              {dict.popularServices}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Verified prerequisites, required documents, and direct official application links.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-dark transition-colors"
          >
            <span>{dict.ctaFindTitle}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Responsive Grid of Service Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.slice(0, 6).map((svc) => (
            <ServiceCard key={svc.id} svc={svc} lang={lang} />
          ))}
        </div>
      </section>

      {/* WHY SEVAGUIDE AI CIVIC BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-8 sm:p-14 text-white shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-blue-200 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>Next-Generation Civic Intelligence</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                No More Middlemen. <br />
                <span className="text-blue-400">Direct Citizen Empowerment.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Government processes shouldn't be confusing. SevaGuide AI decodes statutory criteria, formats personalized document checklists, and points you directly to official government portals like Nadakacheri, Seva Sindhu, and Bhoomi.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/ai-assistant"
                  className="inline-flex items-center gap-2 rounded-2xl bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-glow hover:bg-brand-dark transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{dict.ctaAITitle}</span>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all"
                >
                  <span>{dict.ctaFindTitle}</span>
                </Link>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <h3 className="text-base font-bold text-white">How SevaGuide AI Helps:</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-govgreen shrink-0 mt-0.5" />
                  <span><strong>Eligibility Checks:</strong> Instantly check family income limits, land criteria, and caste categories.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-govgreen shrink-0 mt-0.5" />
                  <span><strong>Document Checklists:</strong> Verify that Aadhaar, bank NPCI mapping, and ration card details match before submitting.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-govgreen shrink-0 mt-0.5" />
                  <span><strong>Zero Fraud Protection:</strong> Distinguish real statutory ₹15-₹40 government fees from private tout extortion.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
