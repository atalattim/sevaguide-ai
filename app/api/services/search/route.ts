import { NextResponse } from "next/server";
import { searchServices } from "@/lib/services";

export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  try {
    const data = await searchServices({ q: p.get("q") ?? undefined, level: p.get("level") ?? undefined, category: p.get("category") ?? undefined });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "Search failed." }, { status: 500 });
  }
}
