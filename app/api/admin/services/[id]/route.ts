import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { parseService } from "@/lib/validation/service";
import { clientIp, rateLimited, sameOrigin } from "@/lib/security";

type Ctx = { params: Promise<{ id: string }> };
async function guard(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (rateLimited(`admin:${clientIp(req)}`, 60)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  return null;
}

export async function PUT(req: Request, { params }: Ctx) {
  const denied = await guard(req); if (denied) return denied;
  const { id } = await params;
  const r = parseService((await req.json().catch(() => null)) ?? {});
  if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
  try {
    return NextResponse.json({ data: await db.governmentService.update({ where: { id }, data: r.data }) });
  } catch (e: any) {
    if (e?.code === "P2002") return NextResponse.json({ error: "That slug already exists" }, { status: 409 });
    if (e?.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const denied = await guard(req); if (denied) return denied;
  const { id } = await params;
  try {
    await db.governmentService.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.code === "P2025" ? "Not found" : "Could not delete" }, { status: e?.code === "P2025" ? 404 : 500 });
  }
}
