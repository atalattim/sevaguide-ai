import { NextResponse } from "next/server";
import { getService } from "@/lib/services";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[a-z0-9-]{1,100}$/.test(slug)) return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
  try {
    const data = await getService(slug);
    return data ? NextResponse.json({ data }) : NextResponse.json({ error: "Not found." }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Could not load service." }, { status: 500 });
  }
}
