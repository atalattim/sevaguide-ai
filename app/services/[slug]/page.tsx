import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pick, t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { getService } from "@/lib/services";
import ServiceDetailView from "@/components/service/ServiceDetailView";
import { TrackView } from "@/components/Track";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = await getService(slug);
  if (!svc) return { title: "Service Not Found — SevaGuide AI" };

  const desc = pick<string>(svc.description, "en") ?? "";
  const title = `${svc.name} Karnataka — Eligibility, Documents & Application | SevaGuide AI`;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = await getService(slug);
  if (!svc) notFound();

  const lang = await getLang();
  const dict = t(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: svc.name,
    serviceType: svc.category,
    provider: {
      "@type": "GovernmentOrganization",
      name: svc.department,
    },
    areaServed: {
      "@type": "State",
      name: svc.state,
    },
    url: svc.officialUrl || "https://sevasindhu.karnataka.gov.in",
    description: pick<string>(svc.description, "en"),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <TrackView name="service_view" slug={svc.slug} lang={lang} />
      
      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <ServiceDetailView svc={svc} lang={lang} dict={dict} />
    </div>
  );
}
