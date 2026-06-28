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

export default function ManagerPage() {
  const accent = accents.manager;
  return (
    <main className="min-h-screen bg-ink">
      <Nav current="manager" />
      <PageRise>
        <Hero accent={accent} />
        <ImpactStats accent={accent} />
        <FlagshipProject accent={accent} />
        <MoreWork />
        <Skills />
        <Contact accent={accent} />
      </PageRise>
    </main>
  );
}
