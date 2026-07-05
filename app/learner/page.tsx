import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { PageRise, Container, SectionLabel, Contact } from "@/components/Sections";
import { accents, learner } from "@/data/content";

export const metadata: Metadata = {
  title: "Learning in public",
  description:
    "A frontend engineer's route to full-stack, documented as it happens: current builds, decisions and mistakes.",
};

export default function LearnerPage() {
  const accent = accents.learner;
  return (
    <main
      className="min-h-screen bg-ink"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <Nav current="learner" />
      <PageRise>
        <Container>
          <section className="pt-14 pb-12">
            <div
              className="text-[11px] tracking-[0.22em] uppercase mb-3.5 font-display"
              style={{ color: accent }}
            >
              {learner.eyebrow}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-medium text-white tracking-tightest mb-4">
              {learner.heading}
            </h1>
            <p className="text-base leading-relaxed text-white/60 max-w-[560px]">
              {learner.intro}
            </p>
          </section>
        </Container>

        <Container>
          <section className="pb-12">
            <SectionLabel>{learner.currentLabel}</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {learner.current.map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl p-5 bg-white/[0.03] border border-white/[0.06]"
                >
                  <div className="font-display text-[17px] font-medium text-white mb-2">
                    {c.title}
                  </div>
                  <p className="text-[13.5px] leading-[1.6] text-white/60 mb-4">
                    {c.detail}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-1 rounded-md"
                        style={{
                          color: "#cfcfd6",
                          background: `${accent}14`,
                          border: `1px solid ${accent}33`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Container>

        <Container>
          <section className="pb-12">
            <SectionLabel>{learner.planLabel}</SectionLabel>
            <ol className="space-y-3 max-w-[620px]">
              {learner.plan.map((step, i) => (
                <li key={step} className="flex gap-4 items-baseline">
                  <span
                    className="font-display text-[13px] tabular-nums shrink-0"
                    style={{ color: accent }}
                  >
                    0{i + 1}
                  </span>
                  <span className="text-[14.5px] leading-relaxed text-white/70">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <p className="text-[12px] text-white/40 mt-8">{learner.note}</p>
          </section>
        </Container>

        <Contact accent={accent} />
      </PageRise>
    </main>
  );
}
