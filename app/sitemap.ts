import type { MetadataRoute } from "next";
import { getAllServices } from "@/lib/services";

export const dynamic = "force-dynamic";
const site = process.env.SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/ai-assistant",
    "/assistant",
    "/resources",
    "/about",
    "/dashboard",
  ].map((p) => ({
    url: `${site}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1.0 : 0.8,
  }));

  try {
    const list = await getAllServices();
    const serviceRoutes = list.map((s) => ({
      url: `${site}/services/${s.slug}`,
      lastModified: s.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
    return [...staticRoutes, ...serviceRoutes];
  } catch {
    return staticRoutes;
  }
}
