import { ogImage, OG_SIZE } from "@/lib/og";
import { caseStudies } from "@/data/caseStudies";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Case study preview card";

export default async function Image({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug);
  return ogImage({
    eyebrow: "case study",
    title: study?.title ?? "Case study",
    subtitle: study?.subtitle,
    accent: study?.accent ?? "#D85A30",
  });
}
