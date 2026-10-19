import "server-only";

export type GroqCode = "MISSING_KEY" | "RATE_LIMIT" | "TIMEOUT" | "INVALID_MODEL" | "EMPTY" | "API";

export class GroqError extends Error {
  constructor(public code: GroqCode, message: string) {
    super(message);
  }
}

type Msg = { role: "system" | "user" | "assistant"; content: string };

export async function groqChat(
  messages: Msg[],
  opts: { json?: boolean; timeoutMs?: number } = {}
): Promise<string> {
  const key = process.env.GROQ_API_KEY?.trim();
  const model = process.env.GROQ_MODEL?.trim() || "llama-3.3-70b-versatile";

  // If no Groq API key is configured, indicate this so the caller can provide a helpful offline fallback or error
  if (!key) {
    throw new GroqError("MISSING_KEY", "GROQ_API_KEY is not set in environment");
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), opts.timeoutMs ?? 25_000);

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.2,
        max_tokens: 1500,
        ...(opts.json ? { response_format: { type: "json_object" } } : {}),
      }),
      signal: ctrl.signal,
      cache: "no-store",
    });

    if (res.status === 429) {
      throw new GroqError("RATE_LIMIT", "Groq rate limit reached");
    }

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      if (res.status === 404 || /model/i.test(body)) {
        throw new GroqError("INVALID_MODEL", `Model ${model} is not available on Groq`);
      }
      throw new GroqError("API", `Groq API error ${res.status}: ${body.slice(0, 100)}`);
    }

    const data = await res.json();
    const text: string | undefined = data?.choices?.[0]?.message?.content;
    if (!text?.trim()) {
      throw new GroqError("EMPTY", "Empty response from Groq model");
    }
    return text;
  } catch (e) {
    if (e instanceof GroqError) throw e;
    if ((e as Error)?.name === "AbortError") {
      throw new GroqError("TIMEOUT", "Groq request timed out");
    }
    throw new GroqError("API", "Could not reach Groq servers");
  } finally {
    clearTimeout(timer);
  }
}
