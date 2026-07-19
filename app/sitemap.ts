import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/caseStudies";
import { siteUrl } from "@/lib/site";

// /friend is intentionally left out: it's an unlisted, personal page.
// /manager is left out too: it canonicalises to "/", which serves the
// same view.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified, priority: 1 },
    { url: `${siteUrl}/recruiter`, lastModified, priority: 0.9 },
    { url: `${siteUrl}/learner`, lastModified, priority: 0.6 },
    ...caseStudies.map((s) => ({
      url: `${siteUrl}/work/${s.slug}`,
      lastModified,
      priority: 0.8,
    })),
  ];
}
