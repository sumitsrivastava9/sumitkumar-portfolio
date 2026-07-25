"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Nav from "@/components/Nav";
import Icon from "@/components/Icon";
import GradientMesh from "@/components/GradientMesh";
import {
  Container,
  PageRise,
  SectionLabel,
  Contact,
  TypewriterCycle,
} from "@/components/Sections";
import { accents, learner } from "@/data/content";
import type { JourneyStep } from "@/data/content";

const accent = accents.learner;

// ---------------------------------------------------------------
// Hero: blur-to-sharp staggered entrance over a masked accent glow.
// ---------------------------------------------------------------
function LearnerHero() {
  const reduce = useReducedMotion();
  const blurIn = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: "blur(10px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] },
        };
  return (
    <div className="relative overflow-hidden">
      {/* Faint violet mesh echoing the gate, masked so it dissolves
          before the journey starts. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "linear-gradient(180deg, black, transparent 92%)",
          WebkitMaskImage: "linear-gradient(180deg, black, transparent 92%)",
        }}
        aria-hidden="true"
      >
        <GradientMesh accent={accent} opacity={0.22} />
      </div>
      <Container>
        <section className="relative pt-16 pb-12">
          <motion.div
            {...blurIn(0)}
            className="text-[11px] tracking-[0.22em] uppercase mb-3.5 font-display"
            style={{ color: accent }}
          >
            {learner.eyebrow}
          </motion.div>
          <motion.h1
            {...blurIn(0.08)}
            className="font-display text-4xl sm:text-5xl md:text-[54px] leading-[1.02] font-medium text-white tracking-tightest mb-4"
          >
            {learner.heading}
            <span style={{ color: accent }}>.</span>
          </motion.h1>
          <motion.p
            {...blurIn(0.16)}
            className="text-base leading-relaxed text-white/60 max-w-[560px]"
          >
            {learner.intro}
          </motion.p>
          <motion.div {...blurIn(0.24)}>
            <TypewriterCycle lines={learner.cycle} accent={accent} />
          </motion.div>
        </section>
      </Container>
    </div>
  );
}

// ---------------------------------------------------------------
// Journey: a timeline whose progress line draws itself with scroll.
// ---------------------------------------------------------------
const stateLabel: Record<JourneyStep["state"], string> = {
  done: "shipped",
  now: "in progress",
  next: "up next",
};

function Marker({ state }: { state: JourneyStep["state"] }) {
  if (state === "done") {
    return (
      <span
        className="flex h-[23px] w-[23px] items-center justify-center rounded-full"
        style={{ background: accent }}
      >
        <Icon name="check" size={12} style={{ color: "#0b0b0d" }} />
      </span>
    );
  }
  if (state === "now") {
    return (
      <span className="relative flex h-[23px] w-[23px] items-center justify-center">
        <span
          className="absolute inline-flex h-3 w-3 rounded-full opacity-70 motion-safe:animate-ping"
          style={{ background: accent }}
        />
        <span
          className="relative inline-flex h-2.5 w-2.5 rounded-full"
          style={{ background: accent }}
        />
      </span>
    );
  }
  return (
    <span className="flex h-[23px] w-[23px] items-center justify-center">
      <span className="h-2.5 w-2.5 rounded-full border border-white/30 bg-ink" />
    </span>
  );
}

// Cursor-tracked spotlight + gentle 3D tilt for the active builds.
// The glow position is written straight to CSS variables (no re-render
// per mousemove); tilt is spring-smoothed and skipped under reduced
// motion.
function SpotlightCard({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 22 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (!reduce) {
      ry.set((px - 0.5) * 8);
      rx.set((0.5 - py) * 6);
    }
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative max-w-[560px] rounded-xl p-5 bg-white/[0.03] border border-white/[0.08] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), ${accent}1f, transparent 65%)`,
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

function JourneyItem({ step, index }: { step: JourneyStep; index: number }) {
  const reduce = useReducedMotion();
  const isNow = step.state === "now";
  return (
    <motion.li
      className="relative flex gap-5 sm:gap-6"
      initial={reduce ? false : { opacity: 0, y: 26, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="shrink-0 pt-0.5">
        <Marker state={step.state} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap mb-1.5">
          <span className="font-display text-[17px] sm:text-lg font-medium text-white">
            {step.title}
          </span>
          <span
            className="text-[10px] tracking-[0.14em] uppercase font-display"
            style={{ color: isNow ? accent : "rgba(255,255,255,0.55)" }}
          >
            {stateLabel[step.state]}
          </span>
        </div>
        {isNow ? (
          <SpotlightCard>
            <p className="text-[13.5px] leading-[1.6] text-white/70 mb-4">
              {step.detail}
            </p>
            {step.tags && (
              <div className="flex gap-2 flex-wrap">
                {step.tags.map((t) => (
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
            )}
          </SpotlightCard>
        ) : (
          <p className="text-[13.5px] leading-[1.6] text-white/60 max-w-[560px]">
            {step.detail}
          </p>
        )}
      </div>
    </motion.li>
  );
}

function Journey() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Scroll-linked rather than autonomous, so it tracks the reader's own
  // movement — the same precedent as the case-study progress bar.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.4,
  });
  return (
    <Container>
      <section className="pb-14">
        <SectionLabel>{learner.journeyLabel}</SectionLabel>
        <div ref={ref} className="relative">
          <div
            className="absolute left-[11px] top-1 bottom-1 w-px bg-white/10"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-[11px] top-1 bottom-1 w-px origin-top"
            style={{ background: accent, scaleY: reduce ? 1 : scaleY }}
            aria-hidden="true"
          />
          <ol className="space-y-10">
            {learner.journey.map((step, i) => (
              <JourneyItem key={step.title} step={step} index={i} />
            ))}
          </ol>
        </div>
      </section>
    </Container>
  );
}

// ---------------------------------------------------------------
// Topics ticker: seamless marquee of what's actually being studied.
// ---------------------------------------------------------------
function TopicsTicker() {
  const row = (hidden: boolean) => (
    <ul className="flex gap-2.5 pr-2.5 shrink-0" aria-hidden={hidden || undefined}>
      {learner.topics.map((t) => (
        <li
          key={t}
          className="text-[12px] whitespace-nowrap px-3 py-1.5 rounded-full font-display"
          style={{
            color: "rgba(255,255,255,0.65)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <Container>
      <section className="pb-14">
        <SectionLabel>{learner.topicsLabel}</SectionLabel>
        <div
          className="overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex w-max" style={{ animation: "marquee 30s linear infinite" }}>
            {row(false)}
            {row(true)}
          </div>
        </div>
      </section>
    </Container>
  );
}

export default function LearnerView() {
  return (
    <main
      className="min-h-screen bg-ink"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <Nav current="learner" />
      <PageRise>
        <LearnerHero />
        <Journey />
        <TopicsTicker />
        <Contact accent={accent} />
      </PageRise>
    </main>
  );
}
