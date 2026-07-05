import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { PageRise, Hero, RecruiterStats, RecruiterCard, Skills, MoreWork, Contact } from "@/components/Sections";
import { accents, recruiterCycle } from "@/data/content";

export const metadata: Metadata = {
  title: "For recruiters",
  description:
    "The facts, fast: 3 years of React, Next.js and TypeScript, based in Gurugram, open to frontend roles.",
};

export default function RecruiterPage() {
  const accent = accents.recruiter;
  return (
    <main
      className="min-h-screen bg-ink"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <Nav current="recruiter" />
      <PageRise>
        <Hero accent={accent} eyebrow="for recruiters" cycleLines={recruiterCycle} />
        <RecruiterStats accent={accent} />
        <RecruiterCard accent={accent} />
        <Skills />
        <MoreWork accent={accent} />
        <Contact accent={accent} />
      </PageRise>
    </main>
  );
}
