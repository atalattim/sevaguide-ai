import { NextResponse } from "next/server";
import { answerQuestion } from "@/lib/ai/sevaguide";
import { clean, clientIp, rateLimited, sameOrigin } from "@/lib/security";
import type { ChatTurn } from "@/types/ai";

export const maxDuration = 30;

const fail = (error: string, code: string, status: number) =>
  NextResponse.json({ error, code }, { status });

export async function POST(req: Request) {
  // Allow same-origin requests; allow local development requests
  if (!sameOrigin(req) && process.env.NODE_ENV === "production") {
    return fail("Forbidden", "FORBIDDEN", 403);
  }

  // Rate limiting (30 requests per minute per IP for responsive experience)
  if (rateLimited(`chat:${clientIp(req)}`, 30)) {
    return fail("Too many requests. Please wait a moment before asking again.", "RATE_LIMIT", 429);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid JSON payload", "BAD_REQUEST", 400);
  }

  const message = typeof body?.message === "string" ? clean(body.message, 600) : "";
  if (!message) {
    return fail("Message cannot be empty", "BAD_REQUEST", 400);
  }

  const lang = body?.lang === "kn" ? "kn" : "en";
  const serviceSlug =
    typeof body?.serviceSlug === "string" && /^[a-z0-9-]{1,100}$/.test(body.serviceSlug)
      ? body.serviceSlug
      : undefined;

  const history: ChatTurn[] = Array.isArray(body?.history)
    ? body.history
        .slice(-8)
        .filter(
          (h: any) =>
            (h?.role === "user" || h?.role === "assistant") &&
            typeof h?.content === "string"
        )
        .map((h: any) => ({ role: h.role, content: clean(h.content, 1200) }))
    : [];

  try {
    const answer = await answerQuestion({ message, lang, history, serviceSlug });
    return NextResponse.json(answer);
  } catch (e) {
    console.error("[api/chat error]", (e as Error).message);
    return fail("Unable to process request right now. Please try again.", "SERVER_ERROR", 500);
  }
}
