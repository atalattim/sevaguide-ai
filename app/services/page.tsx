import Link from "next/link";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { searchServices } from "@/lib/services";
import SearchForm from "@/components/SearchForm";
import ServiceCard from "@/components/ServiceCard";
import { TrackView } from "@/components/Track";
import { CATEGORIES_LIST } from "@/lib/data/servicesData";
import { Grid, Sparkles, Filter, Landmark } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Karnataka Government Services Directory — SevaGuide AI",
  description:
    "Explore 200+ Karnataka and Central government services. Step-by-step application guidance, required documents, fee details, and official portals.",
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; level?: string; category?: string }>;
}) {
  const sp = await searchParams;
  const lang = await getLang();
  const dict = t(lang);
  const activeCategory = sp.category || "all";
  const list = await searchServices(sp);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {sp.q && <TrackView name="service_search" lang={lang} />}

      {/* Header Section */}
      <div className="rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-slate-50 p-6 sm:p-10 border border-slate-200/80 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
            <Landmark className="h-3.5 w-3.5" />
            <span>State & Central Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-navy-900">
            {dict.servicesHeading}
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            {dict.servicesSubtitle}
          </p>
        </div>

        {/* Large Search Bar */}
        <div className="mt-8 max-w-2xl">
          <SearchForm lang={lang} q={sp.q} level={sp.level} category={sp.category} />
        </div>

        {/* Horizontal Category Filters */}
        <div className="mt-6 border-t border-slate-200/60 pt-5">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES_LIST.map((cat) => {
              const label = lang === "kn" ? cat.labelKn : cat.labelEn;
              const isActive = activeCategory === cat.id;

              const href =
                cat.id === "all"
                  ? sp.q
                    ? `/services?q=${encodeURIComponent(sp.q)}`
                    : "/services"
                  : `/services?category=${cat.id}${sp.q ? `&q=${encodeURIComponent(sp.q)}` : ""}`;

              return (
                <Link
                  key={cat.id}
                  href={href}
                  className={`rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-navy-900 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100 hover:text-navy-900 border border-slate-200/80"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <p className="text-sm font-semibold text-slate-600" aria-live="polite">
          Showing <span className="text-navy-900 font-bold">{list.length}</span> {dict.servicesResultsFound}
        </p>
        {sp.category && sp.category !== "all" && (
          <Link
            href="/services"
            className="text-xs font-semibold text-brand hover:underline"
          >
            Clear category filter
          </Link>
        )}
      </div>

      {/* Services Grid or Empty State */}
      {list.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Grid className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-navy-900">No Services Found</h3>
          <p className="mx-auto max-w-md text-sm text-slate-500">
            {dict.servicesNoMatch}
          </p>
          <div className="pt-2">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
            >
              Reset Filters
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((svc) => (
            <ServiceCard key={svc.id} svc={svc} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
