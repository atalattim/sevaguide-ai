import { Prisma, type GovernmentService } from "@prisma/client";

export const CATEGORIES = ["certificates", "student", "education", "schemes", "revenue", "transport", "health", "employment", "identity", "agriculture", "welfare", "property", "business"];
const STATUSES = ["DEMO", "NEEDS_VERIFICATION", "VERIFIED"] as const;

export type ServiceForm = Record<
  "name" | "nameKn" | "slug" | "state" | "department" | "category" | "status" | "officialUrl" | "sourceUrl" | "lastVerifiedAt" |
  "descEn" | "descKn" | "eligEn" | "eligKn" | "docsEn" | "docsKn" | "stepsEn" | "stepsKn" | "mistEn" | "mistKn" | "feesEn" | "feesKn" | "procEn" | "procKn", string>;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "");
const lines = (v: unknown) => str(v, 6000).split("\n").map((l) => l.trim().slice(0, 300)).filter(Boolean).slice(0, 20);
const loc = <T,>(en: T, kn: T, empty: (x: T) => boolean) => (empty(kn) ? { en } : { en, kn });
const isEmpty = (x: string | string[]) => x.length === 0;

export function parseService(b: Partial<ServiceForm>): { ok: true; data: Prisma.GovernmentServiceCreateInput } | { ok: false; error: string } {
  const name = str(b.name, 120), slug = str(b.slug, 100), department = str(b.department, 150);
  if (!name) return { ok: false, error: "Name is required" };
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return { ok: false, error: "Slug must be lowercase letters, numbers and hyphens" };
  if (!department) return { ok: false, error: "Department is required" };
  const state = str(b.state, 20);
  if (state !== "Karnataka" && state !== "Central") return { ok: false, error: "State must be Karnataka or Central" };
  const category = str(b.category, 30);
  if (!CATEGORIES.includes(category)) return { ok: false, error: "Invalid category" };
  const status = str(b.status, 30) as (typeof STATUSES)[number];
  if (!STATUSES.includes(status)) return { ok: false, error: "Invalid status" };

  const url = (v: unknown, label: string): string | null | Error => {
    const s = str(v, 500);
    if (!s) return null;
    try { return new URL(s).protocol === "https:" ? s : new Error(`${label} must start with https://`); } catch { return new Error(`${label} is not a valid URL`); }
  };
  const officialUrl = url(b.officialUrl, "Official URL"), sourceUrl = url(b.sourceUrl, "Source URL");
  if (officialUrl instanceof Error) return { ok: false, error: officialUrl.message };
  if (sourceUrl instanceof Error) return { ok: false, error: sourceUrl.message };

  const descEn = str(b.descEn, 1500);
  if (!descEn) return { ok: false, error: "English description is required" };
  const eligEn = lines(b.eligEn), docsEn = lines(b.docsEn), stepsEn = lines(b.stepsEn);
  if (!eligEn.length || !docsEn.length || !stepsEn.length) return { ok: false, error: "English eligibility, documents and steps need at least one line each" };

  let lastVerifiedAt: Date | null = null;
  if (str(b.lastVerifiedAt, 30)) {
    lastVerifiedAt = new Date(str(b.lastVerifiedAt, 30));
    if (isNaN(lastVerifiedAt.getTime())) return { ok: false, error: "Invalid verification date" };
  }
  if (status === "VERIFIED") {
    if (!officialUrl || !sourceUrl) return { ok: false, error: "A VERIFIED service needs both an official URL and a source URL" };
    lastVerifiedAt ??= new Date();
  }

  const optList = (en: unknown, kn: unknown) => { const e = lines(en); return e.length ? loc(e, lines(kn), isEmpty) : Prisma.DbNull; };
  const optText = (en: unknown, kn: unknown) => { const e = str(en, 500); return e ? loc(e, str(kn, 500), isEmpty) : Prisma.DbNull; };

  return {
    ok: true,
    data: {
      name, slug, department, state, category, status, officialUrl, sourceUrl, lastVerifiedAt,
      nameKn: str(b.nameKn, 120) || null,
      description: loc(descEn, str(b.descKn, 1500), isEmpty),
      eligibility: loc(eligEn, lines(b.eligKn), isEmpty),
      documents: loc(docsEn, lines(b.docsKn), isEmpty),
      applicationSteps: loc(stepsEn, lines(b.stepsKn), isEmpty),
      commonMistakes: optList(b.mistEn, b.mistKn),
      fees: optText(b.feesEn, b.feesKn),
      processingInfo: optText(b.procEn, b.procKn),
    },
  };
}

const L = (v: unknown, k: "en" | "kn") => (v as Record<string, unknown> | null)?.[k];
const txt = (v: unknown, k: "en" | "kn") => (typeof L(v, k) === "string" ? (L(v, k) as string) : "");
const list = (v: unknown, k: "en" | "kn") => (Array.isArray(L(v, k)) ? (L(v, k) as string[]).join("\n") : "");

export function toForm(s?: GovernmentService | null): ServiceForm {
  return {
    name: s?.name ?? "", nameKn: s?.nameKn ?? "", slug: s?.slug ?? "", state: s?.state ?? "Karnataka", department: s?.department ?? "",
    category: s?.category ?? "certificates", status: s?.status ?? "NEEDS_VERIFICATION",
    officialUrl: s?.officialUrl ?? "", sourceUrl: s?.sourceUrl ?? "", lastVerifiedAt: s?.lastVerifiedAt ? s.lastVerifiedAt.toISOString().slice(0, 10) : "",
    descEn: txt(s?.description, "en"), descKn: txt(s?.description, "kn"),
    eligEn: list(s?.eligibility, "en"), eligKn: list(s?.eligibility, "kn"),
    docsEn: list(s?.documents, "en"), docsKn: list(s?.documents, "kn"),
    stepsEn: list(s?.applicationSteps, "en"), stepsKn: list(s?.applicationSteps, "kn"),
    mistEn: list(s?.commonMistakes, "en"), mistKn: list(s?.commonMistakes, "kn"),
    feesEn: txt(s?.fees, "en"), feesKn: txt(s?.fees, "kn"), procEn: txt(s?.processingInfo, "en"), procKn: txt(s?.processingInfo, "kn"),
  };
}
