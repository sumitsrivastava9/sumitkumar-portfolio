import type { Metadata } from "next";
import Nav from "@/components/Nav";
import {
  PageRise,
  Hero,
  ImpactStats,
  FlagshipProject,
  MoreWork,
  Skills,
  Contact,
} from "@/components/Sections";
import { accents } from "@/data/content";

export const metadata: Metadata = {
  title: "For hiring managers",
  description:
    "Proof over promises: a flagship case study with real numbers, a 2-minute walkthrough, and the tradeoffs behind the choices.",
};

export default function ManagerPage() {
  const accent = accents.manager;
  return (
    <main
      className="min-h-screen bg-ink"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <Nav current="manager" />
      <PageRise>
        <Hero accent={accent} />
        <ImpactStats accent={accent} />
        <FlagshipProject accent={accent} />
        <MoreWork accent={accent} />
        <Skills />
        <Contact accent={accent} />
      </PageRise>
    </main>
  );
}
