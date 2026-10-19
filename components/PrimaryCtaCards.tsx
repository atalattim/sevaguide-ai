import Link from "next/link";
import { Search, Bot, ArrowRight, Sparkles } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

interface PrimaryCtaCardsProps {
  lang: Lang;
}

export default function PrimaryCtaCards({ lang }: PrimaryCtaCardsProps) {
  const dict = t(lang);

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {/* CTA 1: Find a Service */}
      <Link
        href="/services"
        className="group relative flex items-center justify-between overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/90 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl"
      >
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand group-hover:bg-brand group-hover:text-white transition-all shadow-inner">
            <Search className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-navy-900 group-hover:text-brand transition-colors">
              {dict.ctaFindTitle}
            </h3>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              {dict.ctaFindSub}
            </p>
          </div>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-brand group-hover:text-white group-hover:translate-x-1 transition-all">
          <ArrowRight className="h-5 w-5" />
        </div>
      </Link>

      {/* CTA 2: Ask SevaGuide AI (with subtle animated glow) */}
      <Link
        href="/ai-assistant"
        className="group relative flex items-center justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-brand-dark p-6 sm:p-8 text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
      >
        {/* Subtle decorative glow orb */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/30 blur-2xl group-hover:bg-brand/50 transition-all" />

        <div className="relative z-10 flex items-center gap-5">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand to-blue-400 text-white shadow-md animate-pulse-glow">
            <Bot className="h-8 w-8" />
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                {dict.ctaAITitle}
              </h3>
              <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-400/30">
                GROQ AI
              </span>
            </div>
            <p className="mt-1 text-sm text-blue-100/80 font-medium">
              {dict.ctaAISub}
            </p>
          </div>
        </div>

        <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white group-hover:bg-white group-hover:text-navy-900 group-hover:translate-x-1 transition-all">
          <ArrowRight className="h-5 w-5" />
        </div>
      </Link>
    </section>
  );
}
