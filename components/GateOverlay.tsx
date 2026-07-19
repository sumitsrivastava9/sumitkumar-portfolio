"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { gateProfiles, accents, profile, ProfileKey } from "@/data/content";
import { readProfileCookie, rememberProfile } from "@/lib/profile";
import Icon from "@/components/Icon";
import GradientMesh from "@/components/GradientMesh";

// The gate, reframed as an overlay. It used to be the entire homepage,
// which left "/" with no indexable content (its h1 was "who's
// visiting?"). The manager view now renders underneath; this overlay
// carries the same choice moment for first-time visitors. Returning
// visitors are redirected by middleware before this ever renders — the
// cookie check below only covers client-side back-navigation, which
// skips middleware.
export default function GateOverlay() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<ProfileKey | null>(null);
  const [chosen, setChosen] = useState<ProfileKey | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (readProfileCookie()) {
      setDismissed(true);
      return;
    }
    // Visitors from before the cookie existed stored their pick in
    // localStorage; migrate them so middleware can take over.
    let last: ProfileKey | null = null;
    try {
      last = localStorage.getItem("profile") as ProfileKey | null;
    } catch {}
    if (last && gateProfiles.some((p) => p.key === last)) {
      rememberProfile(last);
      router.replace(`/${last}`);
    }
  }, [router]);

  // The manager view underneath shouldn't scroll while the gate is up.
  useEffect(() => {
    if (dismissed) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [dismissed]);

  function choose(key: ProfileKey) {
    if (chosen) return; // ignore clicks mid-transition
    rememberProfile(key);
    setChosen(key);
    // One beat for the focus animation (non-chosen UI falls away, the
    // chosen tile glows), then act.
    const delay = reduce ? 0 : 260;
    setTimeout(() => {
      // The manager view is already rendered underneath: dismissing
      // plays the zoom-dissolve exit and the page is simply there.
      // Deliberately no extra choreography on the content — a reveal
      // synchronised across two component trees proved fragile in
      // testing, and a stuck overlay is worse than a plain dissolve.
      if (key === "manager") setDismissed(true);
      else router.push(`/${key}`);
    }, delay);
  }

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.11, delayChildren: 0.35 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          id="gate-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Choose how to view this portfolio"
          className="fixed inset-0 z-50 overflow-hidden bg-ink flex flex-col items-center justify-center px-6"
          // Exit is a zoom-dissolve: the gate grows slightly toward the
          // viewer while fading, as if stepping through it into the
          // page. (An iris wipe was tried first and reads as a glitch
          // here: both surfaces are near-black, so a moving clip edge
          // is invisible.)
          exit={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
          transition={{ duration: reduce ? 0 : 0.4, ease: "easeOut" }}
        >
          <GradientMesh />
          <div className="absolute inset-0 bg-ink/40 pointer-events-none" />

          <motion.div
            className="relative text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={chosen ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
            transition={chosen ? { duration: 0.25 } : { duration: 0.6 }}
          >
            <div className="text-[12px] tracking-[0.24em] uppercase text-white/60 mb-2.5 font-display">
              {profile.name} · {profile.role}
            </div>
            {/* Deliberately not an h1: the page's h1 is the manager
                hero underneath. */}
            <div className="font-display text-4xl sm:text-5xl font-medium text-white tracking-tightest mb-1">
              who&rsquo;s visiting<span className="text-coral">?</span>
            </div>
            <div className="font-display text-[13px] text-white/60 mb-10">
              pick one, I&rsquo;ll show you what matters to you
            </div>
          </motion.div>

          <motion.div
            className="relative grid grid-cols-3 gap-4 sm:gap-5 w-full max-w-[440px]"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {gateProfiles.filter((p) => p.ready).map((p) => {
              const color = accents[p.key];
              const isChosen = chosen === p.key;
              const isHover = hovered === p.key && !chosen;
              // While transitioning, everything except the chosen tile
              // falls away entirely; before that, hover just dims peers.
              const faded = chosen ? !isChosen : hovered !== null && !isHover;
              return (
                <motion.button
                  key={p.key}
                  variants={item}
                  onClick={() => choose(p.key)}
                  onMouseEnter={() => setHovered(p.key)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(p.key)}
                  onBlur={() => setHovered(null)}
                  className="text-center cursor-pointer bg-transparent border-0 p-0"
                  style={{
                    opacity: faded ? (chosen ? 0 : 0.45) : 1,
                    transition: "opacity .25s ease",
                  }}
                  aria-label={`Enter as ${p.label}`}
                >
                  <div
                    className="aspect-square rounded-2xl flex items-center justify-center"
                    style={{
                      background: isHover || isChosen ? "#1c1c22" : "rgba(28,28,34,0.7)",
                      backdropFilter: "blur(8px)",
                      border: `2px solid ${isHover || isChosen ? color : "rgba(255,255,255,0.06)"}`,
                      // The focus beat: the chosen tile settles slightly
                      // lifted with a soft accent glow — the persona
                      // colour registers without a full-screen wash.
                      boxShadow: isChosen
                        ? `0 0 0 1px ${color}aa, 0 0 52px ${color}66`
                        : "none",
                      transform: isChosen
                        ? "scale(1.06)"
                        : isHover
                          ? "scale(1.08) translateY(-4px)"
                          : "none",
                      transition:
                        "transform .25s cubic-bezier(.2,.8,.2,1), border-color .2s ease, background .2s ease, box-shadow .25s ease",
                    }}
                  >
                    <Icon name={p.icon} size={34} className="" />
                    <span style={{ color }} className="sr-only">
                      {p.label}
                    </span>
                  </div>
                  <div
                    className="font-display text-[13px] mt-3"
                    style={{
                      color: isChosen ? color : isHover ? "#fff" : "rgba(255,255,255,0.6)",
                      transition: "color .2s",
                    }}
                  >
                    {p.label}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.button
            onClick={() => choose("manager")}
            className="relative font-display text-[12px] text-white/55 mt-10 bg-transparent border-0 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: chosen ? 0 : 1 }}
            transition={chosen ? { duration: 0.2 } : { delay: 0.9, duration: 0.6 }}
          >
            or <span className="text-white/75 border-b border-white/20">show me everything</span>
          </motion.button>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
