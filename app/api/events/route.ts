import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clientIp, rateLimited, sameOrigin } from "@/lib/security";

const NAMES = new Set(["service_search", "service_view", "official_link_click", "language_changed", "ai_question", "checklist_started", "checklist_completed"]);

export async function POST(req: Request) {
  const ok = new NextResponse(null, { status: 204 });
  if (!sameOrigin(req) || rateLimited(`ev:${clientIp(req)}`, 60)) return ok; // drop silently
  const b = await req.json().catch(() => null);
  if (!b || typeof b.name !== "string" || !NAMES.has(b.name)) return ok;
  const slug = typeof b.slug === "string" && /^[a-z0-9-]{1,100}$/.test(b.slug) ? b.slug : null;
  const lang = b.lang === "kn" || b.lang === "en" ? b.lang : null;
  await db.analyticsEvent.create({ data: { name: b.name, slug, lang } }).catch(() => {}); // no IP or user id stored
  return ok;
}
