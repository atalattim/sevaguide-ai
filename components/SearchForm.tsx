"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Mic, MicOff, ArrowRight } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

interface SearchFormProps {
  lang: Lang;
  q?: string;
  level?: string;
  category?: string;
  filters?: boolean;
}

export default function SearchForm({
  lang,
  q = "",
  level = "",
  category = "",
  filters = false,
}: SearchFormProps) {
  const [query, setQuery] = useState(q);
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();
  const dict = t(lang);

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search is supported on Chrome, Edge, and modern mobile browsers.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === "kn" ? "kn-IN" : "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        router.push(`/services?q=${encodeURIComponent(transcript)}`);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const params = new URLSearchParams();
    params.set("q", query.trim());
    if (level) params.set("level", level);
    if (category) params.set("category", category);
    router.push(`/services?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <div className="relative flex items-center rounded-2xl bg-white p-2 shadow-card border border-slate-200/90 transition-all focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
        <div className="pl-3.5 pr-2 text-slate-400">
          <Search className="h-5 w-5" />
        </div>

        <input
          type="text"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.searchPlaceholder}
          aria-label={dict.searchPlaceholder}
          className="w-full bg-transparent px-2 py-2.5 text-base text-navy-900 placeholder-slate-400 focus:outline-none"
        />

        {/* Voice Search Button */}
        <button
          type="button"
          onClick={handleVoiceSearch}
          title={dict.voiceSearch}
          aria-label={dict.voiceSearch}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
            isListening
              ? "bg-red-500 text-white animate-pulse"
              : "text-slate-400 hover:bg-slate-100 hover:text-brand"
          }`}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>

        {/* Primary Search Submit Button */}
        <button
          type="submit"
          className="ml-1 hidden sm:flex shrink-0 items-center gap-1.5 rounded-xl bg-brand px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-brand-dark transition-all active:scale-98"
        >
          <span>{dict.searchBtn}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Optional Filter Row */}
      {filters && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <select
            name="level"
            defaultValue={level}
            onChange={(e) => {
              const params = new URLSearchParams(window.location.search);
              if (e.target.value) params.set("level", e.target.value);
              else params.delete("level");
              router.push(`/services?${params.toString()}`);
            }}
            aria-label="Filter by jurisdiction"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm focus:border-brand focus:outline-none"
          >
            <option value="">Jurisdiction: All</option>
            <option value="karnataka">Karnataka State</option>
            <option value="central">Central Government</option>
          </select>
        </div>
      )}
    </form>
  );
}
