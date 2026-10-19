"use client";
import { useEffect, useState } from "react";
import { track } from "@/lib/track";

type Item = { id: string; label: string };
type Strings = { title: string; saved: string; allDone: string; of: string; error: string };

export default function Checklist({ slug, lang, s }: { slug: string; lang: string; s: Strings }) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [failed, setFailed] = useState(false);
  const key = `checklist:${slug}`;

  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem(key) ?? "[]")); } catch { /* storage unavailable */ }
    fetch("/api/checklist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, lang }) })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setItems(d.items))
      .catch(() => setFailed(true));
  }, [slug, lang, key]);

  const toggle = (id: string) => {
    const next = done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
    if (done.length === 0 && next.length === 1) track("checklist_started", { slug, lang });
    if (items && next.length === items.length) track("checklist_completed", { slug, lang });
    setDone(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* ignore */ }
  };

  if (failed) return <p className="rounded-2xl bg-white p-5">{s.error}</p>;
  if (!items) return <div className="h-40 animate-pulse rounded-2xl bg-white" aria-busy="true" />;
  const count = items.filter((i) => done.includes(i.id)).length;

  return (
    <section className="rounded-2xl border border-brand/10 bg-white p-5" aria-labelledby="cl-title">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="cl-title" className="text-lg font-semibold text-brand-dark">{s.title}</h2>
        <span className="text-sm text-ink/70">{count} {s.of} {items.length}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-soft"><div className="h-full bg-brand" style={{ width: `${(count / items.length) * 100}%` }} /></div>
      <ul className="mt-3">
        {items.map((i) => (
          <li key={i.id}>
            <label className="flex min-h-12 cursor-pointer items-center gap-3 py-1">
              <input type="checkbox" checked={done.includes(i.id)} onChange={() => toggle(i.id)} className="h-6 w-6 accent-[#2b3990]" />
              <span className={done.includes(i.id) ? "text-ink/50 line-through" : ""}>{i.label}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-ink/70">{count === items.length ? s.allDone : s.saved}</p>
    </section>
  );
}
