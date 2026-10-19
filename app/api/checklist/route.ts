import { NextResponse } from "next/server";
import { getService } from "@/lib/services";
import { pick, t } from "@/lib/i18n";
import { clientIp, rateLimited, sameOrigin } from "@/lib/security";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (rateLimited(`cl:${clientIp(req)}`, 30)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const lang = body?.lang === "kn" ? "kn" : "en";
  if (typeof body?.slug !== "string" || !/^[a-z0-9-]{1,100}$/.test(body.slug)) return NextResponse.json({ error: "Invalid slug" }, { status: 400 });

  const svc = await getService(body.slug).catch(() => null);
  if (!svc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const s = t(lang);
  const docs = pick<string[]>(svc.documents, lang) ?? [];
  const items = [
    ...docs.map((label, i) => ({ id: `doc-${i}`, label })),
    { id: "details", label: s.clDetails }, { id: "verify", label: s.clVerify }, { id: "submit", label: s.clSubmit },
  ];
  return NextResponse.json({ items });
}
