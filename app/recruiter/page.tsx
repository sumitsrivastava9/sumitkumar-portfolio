import Nav from "@/components/Nav";
import { PageRise, Hero, RecruiterStats, RecruiterCard, Skills, MoreWork, Contact } from "@/components/Sections";
import { accents, recruiterCycle } from "@/data/content";

export default function RecruiterPage() {
  const accent = accents.recruiter;
  return (
    <main className="min-h-screen bg-ink">
      <Nav current="recruiter" />
      <PageRise>
        <Hero accent={accent} eyebrow="for recruiters" cycleLines={recruiterCycle} />
        <RecruiterStats accent={accent} />
        <RecruiterCard accent={accent} />
        <Skills />
        <MoreWork />
        <Contact accent={accent} />
      </PageRise>
    </main>
  );
}
