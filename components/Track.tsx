"use client";
import { useEffect } from "react";
import { track } from "@/lib/track";

export function TrackView({ name, slug, lang }: { name: string; slug?: string; lang?: string }) {
  useEffect(() => { track(name, { slug, lang }); }, [name, slug, lang]);
  return null;
}

export function TrackedLink({ href, slug, lang, className, children }: { href: string; slug: string; lang: string; className?: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => track("official_link_click", { slug, lang })}>{children}</a>;
}
