import type { Prisma, GovernmentService } from "@prisma/client";
import { db } from "./db";
import { ALL_SERVICES, type ServiceData } from "./data/servicesData";

export type ServiceQuery = { q?: string; level?: string; category?: string };

// Helper to convert in-memory service format to GovernmentService model interface
function toGovernmentService(s: ServiceData): GovernmentService {
  return {
    id: s.id,
    name: s.name,
    nameKn: s.nameKn,
    slug: s.slug,
    description: s.description as any,
    state: s.state,
    department: s.department,
    category: s.category,
    eligibility: s.eligibility as any,
    documents: s.documents as any,
    applicationSteps: s.applicationSteps as any,
    commonMistakes: s.commonMistakes as any,
    fees: s.fees as any,
    processingInfo: s.processingInfo as any,
    officialUrl: s.officialUrl,
    sourceUrl: s.sourceUrl,
    language: s.language,
    lastVerifiedAt: s.lastVerifiedAt ? new Date(s.lastVerifiedAt) : null,
    status: s.status as any,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function searchServices({ q, level, category }: ServiceQuery): Promise<GovernmentService[]> {
  try {
    const where: Prisma.GovernmentServiceWhereInput = {};
    const term = q?.trim().slice(0, 80);
    if (term) {
      where.OR = [
        { name: { contains: term, mode: "insensitive" } },
        { nameKn: { contains: term, mode: "insensitive" } },
        { department: { contains: term, mode: "insensitive" } },
        { category: { contains: term, mode: "insensitive" } },
      ];
    }
    if (level === "karnataka") where.state = "Karnataka";
    if (level === "central") where.state = "Central";
    if (category && category !== "all" && /^[a-z-]{3,30}$/.test(category)) where.category = category;
    
    const dbResults = await db.governmentService.findMany({ where, orderBy: { name: "asc" }, take: 50 });
    if (dbResults && dbResults.length > 0) {
      return dbResults;
    }
  } catch (err) {
    // Database connection or table unavailable in offline dev; fall back gracefully to enriched dataset
  }

  // Filter in-memory verified services
  let filtered = ALL_SERVICES;
  const term = q?.trim().toLowerCase();
  if (term) {
    filtered = filtered.filter(s => 
      s.name.toLowerCase().includes(term) ||
      (s.nameKn && s.nameKn.toLowerCase().includes(term)) ||
      s.department.toLowerCase().includes(term) ||
      s.category.toLowerCase().includes(term) ||
      s.slug.toLowerCase().includes(term)
    );
  }
  if (level === "karnataka") filtered = filtered.filter(s => s.state === "Karnataka");
  if (level === "central") filtered = filtered.filter(s => s.state === "Central");
  if (category && category !== "all") {
    filtered = filtered.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }

  return filtered.map(toGovernmentService);
}

export async function getService(slug: string): Promise<GovernmentService | null> {
  try {
    const found = await db.governmentService.findUnique({ where: { slug } });
    if (found) return found;
  } catch (err) {
    // Database fallback
  }

  const inMemory = ALL_SERVICES.find(s => s.slug === slug);
  return inMemory ? toGovernmentService(inMemory) : null;
}

export async function getAllServices(): Promise<GovernmentService[]> {
  try {
    const dbResults = await db.governmentService.findMany({ orderBy: { name: "asc" } });
    if (dbResults && dbResults.length > 0) return dbResults;
  } catch (err) {
    // Fallback
  }
  return ALL_SERVICES.map(toGovernmentService);
}
