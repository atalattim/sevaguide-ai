import { PrismaClient } from "@prisma/client";
import { ALL_SERVICES } from "../lib/data/servicesData";

const db = new PrismaClient();

async function main() {
  console.log(`Starting seeding for ${ALL_SERVICES.length} SevaGuide AI services...`);
  for (const s of ALL_SERVICES) {
    const data = {
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
      lastVerifiedAt: new Date(s.lastVerifiedAt),
      status: s.status as any,
    };
    await db.governmentService.upsert({
      where: { slug: s.slug },
      update: data,
      create: data,
    });
  }
  console.log(`Successfully seeded ${ALL_SERVICES.length} verified government services.`);
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
