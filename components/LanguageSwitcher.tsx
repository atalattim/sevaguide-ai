"use client";

import { useRouter } from "next/navigation";
import type { Lang } from "@/lib/i18n";
import { track } from "@/lib/track";
import { Languages } from "lucide-react";

export default function LanguageSwitcher({ lang }: { lang: Lang }) {
  const router = useRouter();

  const handleSelect = (selectedLang: Lang) => {
    if (selectedLang === lang) return;
    document.cookie = `lang=${selectedLang}; path=/; max-age=31536000; samesite=lax`;
    try {
      track("language_changed", { lang: selectedLang });
    } catch {
      // Ignore client track fail
    }
    try {
      window.location.reload();
    } catch {
      router.refresh();
    }
  };

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="flex items-center rounded-xl border border-slate-200/90 bg-slate-100/80 p-0.5 shadow-inner"
    >
      <button
        onClick={() => handleSelect("en")}
        aria-pressed={lang === "en"}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
          lang === "en"
            ? "bg-white text-brand shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <span>English</span>
      </button>

      <button
        onClick={() => handleSelect("kn")}
        aria-pressed={lang === "kn"}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
          lang === "kn"
            ? "bg-white text-brand shadow-sm font-bold"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <span>ಕನ್ನಡ</span>
      </button>
    </div>
  );
}
