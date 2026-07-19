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

// The hiring-manager view, shared verbatim by "/" (behind the gate
// overlay, so the homepage has real indexable content) and /manager
// (the nav switcher's destination, canonicalised to "/").
export default function ManagerView() {
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
