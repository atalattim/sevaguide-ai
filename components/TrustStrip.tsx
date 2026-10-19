import { CheckCircle2, FileText, Users, MessageSquareQuote, Sparkles } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

interface TrustStripProps {
  lang: Lang;
}

export default function TrustStrip({ lang }: TrustStripProps) {
  const dict = t(lang);

  const trustBadges = [
    { text: dict.trustReliable },
    { text: dict.trustKarnataka },
    { text: dict.trustMultilingual },
    { text: dict.trustStepByStep },
  ];

  const stats = [
    {
      count: dict.statServicesCount,
      label: dict.statServicesLabel,
      icon: FileText,
      color: "text-brand",
      bgColor: "bg-blue-50",
    },
    {
      count: dict.statCitizensCount,
      label: dict.statCitizensLabel,
      icon: Users,
      color: "text-govgreen",
      bgColor: "bg-emerald-50",
    },
    {
      count: dict.statQueriesCount,
      label: dict.statQueriesLabel,
      icon: MessageSquareQuote,
      color: "text-govorange",
      bgColor: "bg-amber-50",
    },
    {
      count: dict.statFreeCount,
      label: dict.statFreeLabel,
      icon: Sparkles,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <section className="w-full space-y-8">
      {/* Horizontal Trust Checkmarks Banner */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 text-center">
          {trustBadges.map((badge, idx) => (
            <div key={idx} className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-navy-900">
              <CheckCircle2 className="h-4 w-4 text-govgreen shrink-0" />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center rounded-3xl bg-white p-6 text-center shadow-card border border-slate-100 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${s.bgColor} ${s.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-navy-900">
                {s.count}
              </span>
              <span className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
