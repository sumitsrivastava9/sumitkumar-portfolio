import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/caseStudies";
import CaseStudyPage from "@/components/CaseStudy";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = caseStudies.find((s) => s.slug === params.slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.subtitle,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug);
  if (!study) notFound();
  return <CaseStudyPage study={study} />;
}
