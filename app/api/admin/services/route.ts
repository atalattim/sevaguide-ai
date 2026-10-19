import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { parseService } from "@/lib/validation/service";
import { clientIp, rateLimited, sameOrigin } from "@/lib/security";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (rateLimited(`admin:${clientIp(req)}`, 60)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  const body = await req.json().catch(() => null);
  const r = parseService(body ?? {});
  if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
  try {
    const created = await db.governmentService.create({ data: r.data });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (e: any) {
    if (e?.code === "P2002") return NextResponse.json({ error: "That slug already exists" }, { status: 409 });
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }
}
