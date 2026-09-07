"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import {
  hero as heroData,
  heroSnapshot,
  stats as statsData,
  flagship,
  moreWork,
  skills,
  profile,
  recruiterFacts,
  recruiterStats,
  recruiterCycle,
  recognition,
  type Shoutout,
} from "@/data/content";
import { notes } from "@/data/notes";
import Icon from "@/components/Icon";
import GradientMesh from "@/components/GradientMesh";

// Centres all body content in a fixed max-width column so wide desktop
// viewports don't leave the layout stretched and empty.
export function Container({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-[1080px] mx-auto px-6 sm:px-8">{children}</div>;
}

// Page content rises up after the gate transition. Doubles as the
// skip-to-content landing target (see the skip link in Nav/WorkNav).
export function PageRise({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      id="main-content"
      tabIndex={-1}
      className="outline-none"
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 mb-5">
      <span className="text-[11px] tracking-[0.18em] uppercase text-white/60 font-display">
        {children}
      </span>
      <span className="flex-1 h-px bg-white/10" />
    </div>
  );
}

// Shared scroll-reveal: content rises gently the first time it enters
// the viewport. Renders static under prefers-reduced-motion.
export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function TypewriterCycle({ lines, accent }: { lines: string[]; accent: string }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) { setText(lines[0]); return; }
    const target = lines[idx];
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text.length < target.length) {
        timer = setTimeout(() => setText(target.slice(0, text.length + 1)), 55);
      } else {
        timer = setTimeout(() => setPhase("pausing"), 2400);
      }
    } else if (phase === "pausing") {
      timer = setTimeout(() => setPhase("deleting"), 0);
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(target.slice(0, text.length - 1)), 28);
      } else {
        setIdx((i) => (i + 1) % lines.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, idx, lines, reduce]);

  return (
    <div className="mt-5 flex items-center gap-2.5 min-h-[22px]">
      <span className="text-[10px] tracking-[0.14em] text-white/55 font-display uppercase shrink-0">now</span>
      <span className="text-[13px] font-display" style={{ color: accent }}>
        {text}
        <motion.span
          className="inline-block w-[1.5px] h-[13px] ml-[2px] align-middle rounded-sm"
          style={{ background: accent }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        />
      </span>
    </div>
  );
}

// A hero call-to-action. The set is passed per view so each page gets
// working actions (the recruiter view has no #work section, so it must
// not reuse the manager's "See the work" anchor — that was a dead CTA).
export type HeroCta = {
  label: string;
  href: string;
  kind?: "primary" | "ghost";
  icon?: string;
  download?: boolean;
  external?: boolean;
};

const MANAGER_CTAS: HeroCta[] = [
  { label: "See the work", href: "#work", kind: "primary" },
  { label: "Résumé", href: profile.resumeUrl, kind: "ghost", icon: "download", download: true },
  { label: "Email me", href: `mailto:${profile.email}`, kind: "ghost" },
];

export function Hero({
  accent,
  eyebrow: eyebrowProp,
  cycleLines,
  ctas,
}: {
  accent: string;
  eyebrow?: string;
  cycleLines?: string[];
  ctas?: HeroCta[];
}) {
  const reduce = useReducedMotion();
  const resolved = ctas ?? MANAGER_CTAS;

  // Blur-to-sharp staggered entrance, lifted from the learner hero so the
  // most-viewed frame carries the site's best motion craft.
  const blurIn = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22, filter: "blur(10px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] as const },
        };

  // Subtle cursor parallax on the mesh panel — motion values only, so no
  // React re-render fires per mouse move.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 120, damping: 20 });
  const py = useSpring(my, { stiffness: 120, damping: 20 });
  function onPanelMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 18);
  }
  function onPanelLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <Container>
      <section className="pt-14 pb-12 grid md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-12 items-center">
        <div>
          <motion.div
            {...blurIn(0)}
            className="text-[11px] tracking-[0.22em] uppercase text-white/60 mb-3.5 font-display"
          >
            {eyebrowProp ?? heroData.eyebrow}
          </motion.div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-[54px] leading-[0.98] font-medium tracking-tightest text-white mb-4">
            <motion.span className="block" {...blurIn(0.08)}>
              {heroData.lineTop}
            </motion.span>
            <motion.span className="block" {...blurIn(0.16)}>
              {heroData.lineBottomLead}
              <span style={{ color: accent }}>{heroData.lineBottomAccent}</span>
            </motion.span>
          </h1>
          <motion.p
            {...blurIn(0.24)}
            className="text-base leading-relaxed text-white/60 max-w-[470px] mb-6"
          >
            {heroData.subtitle}
          </motion.p>
          <motion.div {...blurIn(0.32)} className="flex flex-wrap gap-3">
            {resolved.map((c) => {
              const extra = {
                ...(c.download ? { download: true } : {}),
                ...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
              };
              const base =
                "text-[13px] font-medium px-5 py-2.5 rounded-full flex items-center gap-2 font-display";
              return c.kind === "primary" ? (
                <a
                  key={c.label}
                  href={c.href}
                  className={base}
                  style={{ background: accent, color: "#0d0d12" }}
                  {...extra}
                >
                  {c.icon && <Icon name={c.icon} size={15} />}
                  {c.label}
                </a>
              ) : (
                <a
                  key={c.label}
                  href={c.href}
                  className={`${base} border border-white/20 text-white`}
                  {...extra}
                >
                  {c.icon && <Icon name={c.icon} size={15} />}
                  {c.label}
                </a>
              );
            })}
          </motion.div>
          {cycleLines && <TypewriterCycle lines={cycleLines} accent={accent} />}
        </div>

        {/* Living gradient-mesh panel — echoes the gate, profile-tinted.
            Carries a frosted snapshot card so a hiring manager gets the
            facts above the fold. Hidden on mobile where it would only add
            scroll (the facts also live in the sections below). */}
        <motion.div
          onMouseMove={onPanelMove}
          onMouseLeave={onPanelLeave}
          className="relative hidden md:block aspect-[4/5] max-h-[440px] rounded-2xl overflow-hidden border border-white/[0.08] bg-ink-soft"
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.96 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.7, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] as const },
              })}
        >
          <motion.div className="absolute inset-[-8%]" style={{ x: px, y: py }}>
            <GradientMesh accent={accent} opacity={0.7} />
          </motion.div>
          <div
            className="absolute inset-0"
            style={{ boxShadow: `inset 0 0 120px 0 rgba(0,0,0,0.5)` }}
          />
          <HeroSnapshot accent={accent} />
        </motion.div>
      </section>
    </Container>
  );
}

function Avatar({ accent }: { accent: string }) {
  const src = heroSnapshot.avatar;
  // If the image is missing or fails to load, drop back to the monogram
  // automatically — so the config can point at a file before it exists.
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // The image can error before React attaches onError (SSR/hydration gap),
  // so also check the broken state directly on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  const initials = profile.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (src && !failed) {
    return (
      <div
        className="relative shrink-0 w-11 h-11 rounded-full overflow-hidden"
        style={{ border: `1.5px solid ${accent}` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt=""
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  // Monogram fallback — looks finished even before a photo is added.
  return (
    <div
      className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-display text-[15px] font-medium"
      style={{
        color: accent,
        background: `${accent}1f`,
        border: `1.5px solid ${accent}66`,
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function HeroSnapshot({ accent }: { accent: string }) {
  const s = heroSnapshot;
  return (
    <div className="absolute inset-0 flex items-end p-5">
      <div
        className="w-full rounded-xl p-5 backdrop-blur-md"
        style={{
          background: "rgba(18,18,22,0.55)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Avatar accent={accent} />
          <div className="min-w-0">
            <div className="font-display text-[15px] text-white font-medium leading-tight">
              {profile.name}
            </div>
            <div className="text-[11px] text-white/60 truncate">
              {s.company || profile.role}
            </div>
          </div>
        </div>
        <dl className="space-y-2.5">
          {s.rows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-4">
              <dt className="text-[11px] tracking-[0.08em] uppercase text-white/60 font-display">
                {r.label}
              </dt>
              <dd className="text-[13px] text-white/85 text-right font-display">{r.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.08]">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping"
              style={{ background: accent }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: accent }} />
          </span>
          <span className="text-[12px] text-white/70">{s.availability}</span>
        </div>
      </div>
    </div>
  );
}

function ImpactStat({
  value, unit, label, accent, inView, delay,
}: {
  value: string; unit: string; label: string; accent: string; inView: boolean; delay: number;
}) {
  const reduce = useReducedMotion();
  const target = parseInt(value, 10);
  const count = useCountUp(Number.isNaN(target) ? 0 : target, 900, inView);
  const display = Number.isNaN(target) ? value : String(count);
  return (
    <motion.div
      className="rounded-xl p-5 bg-white/[0.03]"
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="font-display text-3xl font-medium text-white tabular-nums">
        {display} <span className="text-lg" style={{ color: accent }}>{unit}</span>
      </div>
      <div className="text-xs text-white/60 mt-1">{label}</div>
    </motion.div>
  );
}

export function ImpactStats({ accent }: { accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <Container>
      <section ref={ref} className="pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {statsData.map((s, i) => (
          <ImpactStat key={s.label} {...s} accent={accent} inView={inView} delay={i * 0.1} />
        ))}
      </div>
      </section>
    </Container>
  );
}

function useCountUp(target: number, durationMs: number, inView: boolean) {
  // Starts at the real value so server-rendered HTML carries the true
  // number (crawlers, link previews and no-JS visitors all read it);
  // the 0 → target sweep only plays client-side once the stat scrolls
  // into view.
  const [val, setVal] = useState(target);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || reduce || target === 0) return;
    setVal(0);
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      setVal(Math.round((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, durationMs, reduce]);
  return val;
}

function StatCounter({
  num, suffix, label, accent, inView, delay,
}: {
  num: number; suffix: string; label: string; accent: string; inView: boolean; delay: number;
}) {
  const count = useCountUp(num, 1000, inView);
  return (
    <motion.div
      className="rounded-xl p-5 text-center"
      style={{ background: `${accent}0a`, border: `1px solid ${accent}30` }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ scale: 1.03, transition: { duration: 0.18 } }}
    >
      <div
        className="font-display text-[46px] font-medium leading-none mb-2 tabular-nums"
        style={{ color: accent }}
      >
        {count}{suffix}
      </div>
      <div className="text-[12px] text-white/60 leading-snug">{label}</div>
    </motion.div>
  );
}

export function RecruiterStats({ accent }: { accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <Container>
      <section ref={ref} className="pb-12">
        <div className="grid grid-cols-3 gap-4">
          {recruiterStats.map((s, i) => (
            <StatCounter key={s.label} {...s} accent={accent} inView={inView} delay={i * 0.12} />
          ))}
        </div>
      </section>
    </Container>
  );
}

// Cursor-tracked spotlight sheen + a gentle 3D tilt, reserved for the one
// card that most deserves to feel alive. Glow position is written to CSS
// vars (no re-render per move); tilt is spring-smoothed and off under
// reduced motion. Pointer events pass through, so the video still works.
function SpotlightPanel({
  accent,
  className = "",
  children,
}: {
  accent: string;
  className?: string;
  children: React.ReactNode;
}) {
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
    const mpx = (e.clientX - r.left) / r.width;
    const mpy = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${mpx * 100}%`);
    el.style.setProperty("--my", `${mpy * 100}%`);
    if (!reduce) {
      ry.set((mpx - 0.5) * 4);
      rx.set((0.5 - mpy) * 3);
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
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`group relative ${className}`}
    >
      {children}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(460px circle at var(--mx,50%) var(--my,50%), ${accent}20, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

export function FlagshipProject({ accent }: { accent: string }) {
  const f = flagship;
  return (
    <Container>
      <section id="work" className="pb-12">
      <SectionLabel>flagship project</SectionLabel>
      <Reveal>
      <SpotlightPanel accent={accent} className="rounded-2xl">
      <div className="rounded-2xl p-7 bg-white/[0.03] border border-white/[0.07]">
        <h2 className="font-display text-2xl font-medium text-white tracking-tight mb-1.5">
          {f.title}
        </h2>
        <p className="text-sm text-white/55 mb-5">{f.subtitle}</p>

        {/* Video slot. preload="metadata" + poster keep the multi-MB file
            off the wire until the visitor actually presses play. */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-ink-soft border border-white/[0.08] flex items-center justify-center mb-3">
          {f.video.src ? (
            <video
              src={f.video.src}
              poster={f.video.poster}
              controls
              preload="metadata"
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative text-center">
              <div
                className="w-[62px] h-[62px] rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: `${accent}28`, border: `1px solid ${accent}80` }}
              >
                <Icon name="play" size={27} style={{ color: accent }} />
              </div>
              <div className="text-[13px] text-white/80 font-display">Walkthrough · {f.video.durationLabel}</div>
              <div className="text-[11px] text-white/60 mt-1">{f.video.caption}</div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mb-5 text-[11px] text-white/60">
          <Icon name="lock" size={13} />
          {f.privacyNote}
        </div>

        {/* Problem / Choice / Tradeoff / Impact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Cell label="Problem" accent={accent} highlight text={f.framework.problem} />
          <Cell label="Choice" text={f.framework.choice} />
          <Cell label="Tradeoff" text={f.framework.tradeoff} />
          <Cell label="Impact" accent={accent} highlight text={f.framework.impact} />
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap mt-6">
          <div className="flex gap-2 flex-wrap">
            {f.tags.map((t) => (
              <span key={t} className="text-[11px] text-white/60 bg-white/5 px-2.5 py-1 rounded-md">
                {t}
              </span>
            ))}
          </div>
          <Link
            href="/work/pulse"
            className="inline-flex items-center gap-2 text-[13px] font-medium font-display px-5 py-2.5 rounded-full shrink-0"
            style={{ background: accent, color: "#0d0d12" }}
          >
            Read the full case study
            <Icon name="arrow-up-right" size={14} />
          </Link>
        </div>
      </div>
      </SpotlightPanel>
      </Reveal>
      </section>
    </Container>
  );
}

function Cell({
  label,
  text,
  accent,
  highlight,
}: {
  label: string;
  text: string;
  accent?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="pl-3.5"
      style={{ borderLeft: `2px solid ${highlight && accent ? accent : "rgba(255,255,255,0.2)"}` }}
    >
      <div
        className="text-[11px] tracking-[0.1em] uppercase mb-1.5"
        style={{ color: highlight && accent ? accent : "rgba(255,255,255,0.6)" }}
      >
        {label}
      </div>
      <p className="text-[13.5px] leading-[1.55] text-white/70">{text}</p>
    </div>
  );
}

export function MoreWork({ accent }: { accent: string }) {
  const rowClass =
    "group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 py-5 border-b border-white/[0.07]";
  return (
    <Container>
      <section className="pb-12">
        <SectionLabel>more work</SectionLabel>
        <div className="border-t border-white/[0.07]">
          {moreWork.map((m, i) => {
            const cardAccent = m.accent ?? accent;
            const body = (
              <>
                <div className="flex-1 min-w-0">
                  {m.eyebrow && (
                    <p className="text-[10px] font-display tracking-[0.16em] uppercase text-white/45 mb-1.5">
                      {m.eyebrow}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className="font-display text-lg text-white font-medium">{m.title}</span>
                    <span className="text-[11px] text-white/50">
                      {m.role} &middot; {m.status}
                    </span>
                    {m.liveUrl && (
                      <span
                        className="text-[10px] font-display tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border"
                        style={{ color: cardAccent, borderColor: `${cardAccent}44`, background: `${cardAccent}11` }}
                      >
                        live
                      </span>
                    )}
                  </div>
                  {m.description && (
                    <p className="text-[13px] leading-[1.55] text-white/60 max-w-[560px]">
                      {m.description}
                    </p>
                  )}
                  <p className="text-[11px] text-white/45 mt-2 tracking-wide">{m.descriptor}</p>
                </div>
                {(m.slug || m.liveUrl) && (
                  <span
                    className="inline-flex items-center gap-1 shrink-0 text-[13px] font-display mt-0.5 transition-transform group-hover:translate-x-0.5"
                    style={{ color: cardAccent }}
                  >
                    {m.slug ? "case study" : "view live"}
                    <Icon name="arrow-up-right" size={13} />
                  </span>
                )}
              </>
            );
            return (
              <Reveal key={m.title} delay={i * 0.08}>
                {m.slug ? (
                  <Link href={`/work/${m.slug}`} className={rowClass}>
                    {body}
                  </Link>
                ) : m.liveUrl ? (
                  <a href={m.liveUrl} target="_blank" rel="noopener noreferrer" className={rowClass}>
                    {body}
                  </a>
                ) : (
                  <div className={rowClass}>{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>
    </Container>
  );
}

// A single Nectar shoutout. `lead` renders the featured, full-width
// variant; the rest are compact grid cards.
function ShoutoutCard({
  s,
  accent,
  lead,
}: {
  s: Shoutout;
  accent: string;
  lead?: boolean;
}) {
  return (
    <article
      className={[
        "flex flex-col rounded-2xl border border-white/[0.07] h-full",
        lead ? "p-6 sm:p-7 bg-white/[0.035]" : "p-5 bg-white/[0.02]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <Icon
          name="quote"
          size={lead ? 26 : 20}
          style={{ color: accent, opacity: 0.9 }}
        />
        {s.points && (
          <span
            className="shrink-0 font-display font-medium tabular-nums text-[13px] px-2.5 py-1 rounded-full"
            style={{ color: accent, background: `${accent}14`, border: `1px solid ${accent}33` }}
          >
            {s.points}
          </span>
        )}
      </div>

      <p
        className={[
          "text-white/85 flex-1",
          lead ? "text-[16.5px] sm:text-[17.5px] leading-[1.6]" : "text-[13.5px] leading-[1.6]",
        ].join(" ")}
      >
        {s.quote}
      </p>

      <div className="mt-5 pt-4 border-t border-white/[0.07] flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
        <span className="font-display text-[14px] font-medium text-white">{s.name}</span>
        <span className="text-[12px] text-white/45">{s.role}</span>
        <span
          className="ml-auto text-[10px] font-display tracking-[0.1em] uppercase px-2 py-0.5 rounded-full border"
          style={{ color: accent, borderColor: `${accent}44`, background: `${accent}11` }}
        >
          {s.tag}
        </span>
        <span className="text-[11px] text-white/55 tabular-nums">{s.date}</span>
      </div>
    </article>
  );
}

function RecognitionStat({
  num,
  suffix,
  label,
  accent,
  inView,
  delay,
}: {
  num: number;
  suffix: string;
  label: string;
  accent: string;
  inView: boolean;
  delay: number;
}) {
  const count = useCountUp(num, 1000, inView);
  return (
    <motion.div
      className="flex items-baseline gap-2 sm:flex-col sm:items-start sm:gap-0"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="font-display text-[28px] sm:text-[34px] font-medium leading-none tabular-nums" style={{ color: accent }}>
        {count}
        <span className="text-[18px] sm:text-[20px]">{suffix}</span>
      </div>
      <div className="text-[12px] text-white/55 sm:mt-1.5">{label}</div>
    </motion.div>
  );
}

export function Recognition({ accent }: { accent: string }) {
  const r = recognition;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <Container>
      <section className="pb-12">
        <SectionLabel>recognition</SectionLabel>
        <Reveal>
          <h2 className="font-display text-2xl font-medium text-white tracking-tight mb-2 max-w-[22ch]">
            {r.heading}
          </h2>
          <p className="text-sm text-white/55 leading-relaxed max-w-[62ch] mb-7">{r.intro}</p>
        </Reveal>

        <div
          ref={ref}
          className="grid grid-cols-3 gap-4 sm:gap-8 py-5 mb-7 border-y border-white/[0.07]"
        >
          {r.stats.map((s, i) => (
            <RecognitionStat key={s.label} {...s} accent={accent} inView={inView} delay={i * 0.12} />
          ))}
        </div>

        <Reveal>
          <div className="mb-4">
            <ShoutoutCard s={r.lead} accent={accent} lead />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {r.entries.map((s, i) => (
            <Reveal key={s.name + s.date} delay={i * 0.08}>
              <ShoutoutCard s={s} accent={accent} />
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-[12px] leading-relaxed text-white/55 max-w-[64ch]">{r.footnote}</p>
      </section>
    </Container>
  );
}

export function Notes({ accent }: { accent: string }) {
  return (
    <Container>
      <section className="pb-12">
        <div className="flex items-baseline justify-between gap-4 mb-5">
          <span className="text-[11px] tracking-[0.18em] uppercase text-white/60 font-display">
            notes
          </span>
          <span className="flex-1 h-px bg-white/10" />
          <Link
            href="/notes"
            className="text-[11px] font-display shrink-0 transition-opacity hover:opacity-80"
            style={{ color: accent }}
          >
            all notes &rarr;
          </Link>
        </div>
        <div className="border-t border-white/[0.07]">
          {notes.map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.08}>
              <Link
                href={`/notes/${n.slug}`}
                className="group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 py-5 border-b border-white/[0.07]"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-display text-lg text-white font-medium mb-1">{n.title}</div>
                  <p className="text-[13px] leading-[1.55] text-white/60 max-w-[560px]">{n.dek}</p>
                </div>
                <span
                  className="inline-flex items-center gap-1 shrink-0 text-[13px] font-display mt-0.5 transition-transform group-hover:translate-x-0.5"
                  style={{ color: accent }}
                >
                  read
                  <Icon name="arrow-up-right" size={13} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </Container>
  );
}

export function Skills() {
  return (
    <Container>
      <section className="pb-12">
      <SectionLabel>skills</SectionLabel>
      <Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SkillCol data={skills.core} dot="#D85A30" filled />
          <SkillCol data={skills.growing} dot="#5DCAA5" />
        </div>
      </Reveal>
      </section>
    </Container>
  );
}

function SkillCol({
  data,
  dot,
  filled,
}: {
  data: { label: string; note: string; items: string[] };
  dot: string;
  filled?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="w-[7px] h-[7px] rounded-full" style={{ background: dot }} />
        <span className="font-display text-[15px] text-white font-medium">{data.label}</span>
      </div>
      <p className="text-xs text-white/60 mb-3.5">{data.note}</p>
      <div className="flex flex-wrap gap-2">
        {data.items.map((it) => (
          <span
            key={it}
            className="text-xs px-3 py-1.5 rounded-lg"
            style={
              filled
                ? { color: "#e0e0e6", background: `${dot}1f`, border: `1px solid ${dot}40` }
                : { color: "#cfcfd6", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }
            }
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

export function RecruiterCard({ accent }: { accent: string }) {
  const availability = recruiterFacts.find((f) => f.label === "Availability")?.value ?? "";
  const facts = recruiterFacts.filter((f) => f.label !== "Availability");
  return (
    <Container>
      <section id="brief" className="pb-12 scroll-mt-24">
        <SectionLabel>candidate brief</SectionLabel>
        <motion.div
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${accent}4d` }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {/* Shimmer availability banner */}
          <div
            className="relative flex items-center gap-2.5 px-6 py-3 overflow-hidden"
            style={{ background: `${accent}14`, borderBottom: `1px solid ${accent}2a` }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent 0%, ${accent}2a 50%, transparent 100%)` }}
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "linear", repeatDelay: 2 }}
            />
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping"
                style={{ background: accent }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accent }} />
            </span>
            <span className="text-[12px] font-display font-medium" style={{ color: accent }}>
              {availability}
            </span>
          </div>

          {/* Identity + facts */}
          <div className="p-6 sm:p-7">
            <motion.div
              className="flex items-center gap-3.5 mb-6"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Avatar accent={accent} />
              <div>
                <div className="font-display text-[17px] font-medium text-white leading-tight">
                  {profile.name}
                </div>
                <div className="text-[12px] text-white/60 mt-0.5">{profile.role}</div>
              </div>
            </motion.div>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {facts.map((f, i) => (
                <motion.div
                  key={f.label}
                  className="rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.09, ease: [0.2, 0.8, 0.2, 1] }}
                  whileHover={{ y: -3, background: "rgba(255,255,255,0.06)", transition: { duration: 0.18 } }}
                >
                  <dt className="text-[10px] tracking-[0.1em] uppercase text-white/55 font-display mb-1.5">
                    {f.label}
                  </dt>
                  <dd className="text-[13px] text-white/85 font-display">{f.value}</dd>
                </motion.div>
              ))}
            </dl>
          </div>

          {/* CTAs */}
          <div
            className="px-6 sm:px-7 py-4 flex flex-wrap gap-3 items-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <motion.a
              href={profile.resumeUrl}
              download
              className="text-[13px] font-medium px-4 py-2.5 rounded-full flex items-center gap-2 font-display"
              style={{ background: accent, color: "#0d0d12" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <Icon name="download" size={14} />
              Download Résumé
            </motion.a>
            <motion.a
              href={`mailto:${profile.email}`}
              className="text-[13px] font-medium px-4 py-2.5 rounded-full border border-white/20 text-white font-display"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Email me
            </motion.a>
            <motion.a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium px-4 py-2.5 rounded-full border border-white/20 text-white font-display"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              LinkedIn ↗
            </motion.a>
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium px-4 py-2.5 rounded-full border border-white/20 text-white font-display"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              GitHub ↗
            </motion.a>
          </div>
        </motion.div>
      </section>
    </Container>
  );
}

// The mailto CTA silently fails on machines without a mail client, so
// the address itself is shown and copyable as a fallback.
function CopyEmail({ accent }: { accent: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy my email:", profile.email);
    }
  }
  return (
    <button
      onClick={copy}
      className="mt-5 inline-flex items-center gap-2 text-[12px] text-white/60 hover:text-white/80 transition-colors bg-transparent border-0 cursor-pointer font-display"
      aria-live="polite"
    >
      <Icon
        name={copied ? "check" : "copy"}
        size={13}
        style={copied ? { color: accent } : undefined}
      />
      {copied ? "copied to clipboard" : profile.email}
    </button>
  );
}

export function Contact({ accent }: { accent: string }) {
  return (
    <Container>
      <section className="pb-14">
      <Reveal>
      <div className="rounded-2xl p-8 text-center" style={{ border: `1px solid ${accent}4d` }}>
        <h2 className="font-display text-2xl sm:text-[28px] font-medium text-white tracking-tight mb-2">
          Let&rsquo;s talk.
        </h2>
        <p className="text-sm text-white/55 mb-5">Open to frontend roles. Quick to respond.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href={`mailto:${profile.email}`}
            className="text-[13px] font-medium px-5 py-2.5 rounded-full font-display"
            style={{ background: accent, color: "#0d0d12" }}
          >
            Email me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium px-5 py-2.5 rounded-full border border-white/20 text-white font-display"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium px-5 py-2.5 rounded-full border border-white/20 text-white font-display"
          >
            GitHub
          </a>
        </div>
        <div>
          <CopyEmail accent={accent} />
        </div>
        <div className="mt-4">
          <Link
            href="/stats"
            className="text-[11px] text-white/45 hover:text-white/75 transition-colors font-display"
          >
            site stats &amp; colophon &rarr;
          </Link>
        </div>
      </div>
      </Reveal>
      </section>
    </Container>
  );
}
