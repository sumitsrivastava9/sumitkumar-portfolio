"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import type { CaseStudy } from "@/data/caseStudies";
import { caseStudies } from "@/data/caseStudies";
import { profile } from "@/data/content";
import { exitToGate } from "@/lib/profile";
import Icon from "./Icon";
import PulseOptimizer from "./PulseOptimizer";
import { Container, PageRise, SectionLabel, Contact } from "./Sections";

// Slim header for /work pages: same silhouette as Nav, but instead of
// the profile switcher it offers a way back to wherever the visitor
// came from (their remembered profile, defaulting to the manager view).
function WorkNav() {
  const [backHref, setBackHref] = useState("/manager");
  useEffect(() => {
    try {
      const p = localStorage.getItem("profile");
      if (p === "manager" || p === "recruiter") setBackHref(`/${p}`);
    } catch {}
  }, []);

  return (
    <nav className="relative border-b border-white/[0.06]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-black focus:text-[13px] focus:font-medium focus:font-display"
      >
        Skip to content
      </a>
      <div className="w-full max-w-[1080px] mx-auto px-6 sm:px-8 py-5 flex justify-between items-center">
        <button
          onClick={exitToGate}
          className="text-sm text-white font-medium font-display bg-transparent border-0 cursor-pointer"
        >
          {profile.name.toLowerCase()}
          <span style={{ color: "var(--accent)" }}>.</span>dev
        </button>
        <Link
          href={backHref}
          className="flex items-center gap-2 text-[12px] text-white/60 hover:text-white transition-colors font-display"
        >
          <Icon name="arrow-left" size={14} />
          all work
        </Link>
      </div>
    </nav>
  );
}

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  const accent = study.accent;
  const idx = caseStudies.findIndex((s) => s.slug === study.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  // Reading progress. Scroll-linked (not autonomous), so it tracks the
  // user's own movement and stays acceptable under reduced motion.
  const { scrollYProgress } = useScroll();

  return (
    <main
      className="min-h-screen bg-ink"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <motion.div
        aria-hidden="true"
        className="fixed top-0 inset-x-0 h-[2px] origin-left z-50"
        style={{ scaleX: scrollYProgress, background: accent }}
      />
      <WorkNav />
      <PageRise>
        <Container>
          <header className="pt-14 pb-10">
            <div
              className="text-[11px] tracking-[0.22em] uppercase mb-3.5 font-display"
              style={{ color: accent }}
            >
              case study · {study.readTime} read
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tightest text-white mb-3 max-w-[760px]">
              {study.title}
            </h1>
            <p className="text-base leading-relaxed text-white/60 max-w-[620px]">
              {study.subtitle}
            </p>
            <dl className="flex flex-wrap gap-x-10 gap-y-3 mt-7">
              {study.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[10px] tracking-[0.1em] uppercase text-white/60 font-display">
                    {f.label}
                  </dt>
                  <dd className="text-[13px] text-white/85 font-display mt-1">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>

            {study.liveUrl && (
              <div className="mt-6">
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-display font-medium transition-opacity hover:opacity-80"
                  style={{ background: `${study.accent}22`, color: study.accent, border: `1px solid ${study.accent}44` }}
                >
                  <Icon name="arrow-up-right" size={14} />
                  View live
                </a>
              </div>
            )}
          </header>

          {study.image && (
            <section className="pb-10">
              <div className="relative w-full rounded-xl overflow-hidden border border-white/[0.08]">
                <Image
                  src={study.image.src}
                  alt={study.image.alt}
                  width={1280}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              {study.image.caption && (
                <p className="mt-3 text-[11px] text-white/60">{study.image.caption}</p>
              )}
            </section>
          )}

          {study.images && study.images.length > 0 && (
            <section className="pb-10">
              <div className={`grid gap-3 ${study.images.length >= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                {study.images.map((img, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="rounded-xl overflow-hidden border border-white/[0.08]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={1280}
                        height={706}
                        className="w-full h-auto"
                        priority={i === 0}
                      />
                    </div>
                    {img.label && (
                      <p className="text-[11px] font-display tracking-[0.12em] uppercase text-center" style={{ color: accent }}>
                        {img.label}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-white/55 text-center">
                Live demo · no API key required · AI runs in rule-based demo mode
              </p>
            </section>
          )}

          {study.video && (
            <section className="pb-10">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-ink-soft border border-white/[0.08]">
                <video
                  src={study.video.src}
                  poster={study.video.poster}
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mt-3 text-[11px] text-white/60">
                <Icon name="lock" size={13} />
                {study.privacyNote ?? study.video.caption}
              </div>
            </section>
          )}

          <section className="pb-10">
            <div className="flex flex-wrap gap-3.5">
              {study.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl p-5 bg-white/[0.03] flex-1 min-w-[200px] max-w-[330px]"
                >
                  <div
                    className="font-display text-3xl font-medium"
                    style={{ color: accent }}
                  >
                    {m.value}
                  </div>
                  <div className="text-xs text-white/60 mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </section>

          {study.widget === "pulse-optimizer" && (
            <section className="pb-12">
              <SectionLabel>see it move</SectionLabel>
              <PulseOptimizer accent={accent} />
            </section>
          )}

          {study.widget === "mealpilot-embed" && study.liveUrl && (
            <section className="pb-12">
              <SectionLabel>try it live</SectionLabel>
              <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-ink-soft">
                <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-white/[0.08]">
                  <span className="text-[12px] text-white/60 font-display">
                    Live app · AI in key-free demo mode
                  </span>
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-display inline-flex items-center gap-1"
                    style={{ color: accent }}
                  >
                    Open full screen
                    <Icon name="arrow-up-right" size={12} />
                  </a>
                </div>
                <iframe
                  src={study.liveUrl}
                  title="MealPilot live demo"
                  loading="lazy"
                  className="w-full h-[560px] bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
              <p className="mt-3 text-[12px] text-white/55">
                Embedded live. Describe what you feel like eating and the assistant
                suggests real dishes from the menu; it cannot surface a dish that
                does not exist.
              </p>
            </section>
          )}

          <section className="pb-12 space-y-10">
            {study.sections.map((s) => (
              <div key={s.heading} className="max-w-[720px]">
                <h2 className="font-display text-[19px] font-medium text-white mb-3">
                  {s.heading}
                </h2>
                <div className="space-y-3.5">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-[14.5px] leading-[1.65] text-white/70">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="pb-12">
            <div className="flex gap-2 flex-wrap">
              {study.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] text-white/60 bg-white/5 px-2.5 py-1 rounded-md"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {next && next.slug !== study.slug && (
            <section className="pb-12">
              <SectionLabel>next case study</SectionLabel>
              <Link
                href={`/work/${next.slug}`}
                className="group flex items-center justify-between gap-4 py-2"
              >
                <div>
                  <div className="font-display text-2xl font-medium text-white group-hover:text-white/80 transition-colors">
                    {next.title}
                  </div>
                  <div className="text-[13px] text-white/60 mt-1">{next.subtitle}</div>
                </div>
                <span
                  className="shrink-0 group-hover:translate-x-1 transition-transform"
                  style={{ color: next.accent }}
                >
                  <Icon name="arrow-up-right" size={22} />
                </span>
              </Link>
            </section>
          )}
        </Container>
        <Contact accent={accent} />
      </PageRise>
    </main>
  );
}
