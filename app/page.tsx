"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { gateProfiles, accents, profile, ProfileKey } from "@/data/content";
import Icon from "@/components/Icon";
import GradientMesh from "@/components/GradientMesh";

export default function Gate() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<ProfileKey | null>(null);
  const [chosen, setChosen] = useState<ProfileKey | null>(null);

  // If the visitor picked before, send them straight in.
  useEffect(() => {
    const last =
      typeof window !== "undefined"
        ? (localStorage.getItem("profile") as ProfileKey | null)
        : null;
    if (last) router.replace(`/${last}`);
  }, [router]);

  function choose(key: ProfileKey) {
    try {
      localStorage.setItem("profile", key);
    } catch {}
    setChosen(key);
    const delay = reduce ? 0 : 760;
    setTimeout(() => router.push(`/${key}`), delay);
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
    <main className="relative min-h-screen overflow-hidden bg-ink flex flex-col items-center justify-center px-6">
      <GradientMesh />
      <div className="absolute inset-0 bg-ink/40 pointer-events-none" />

      <motion.div
        className="relative text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-[12px] tracking-[0.24em] uppercase text-white/45 mb-2.5 font-display">
          {profile.name} · {profile.role}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-white tracking-tightest mb-1">
          who&rsquo;s visiting<span className="text-coral">?</span>
        </h1>
        <div className="font-display text-[13px] text-white/40 mb-10">
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
          const isHover = hovered === p.key;
          const dim = hovered !== null && !isHover;
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
              style={{ opacity: dim ? 0.45 : 1, transition: "opacity .2s ease" }}
              aria-label={`Enter as ${p.label}`}
            >
              <div
                className="aspect-square rounded-2xl flex items-center justify-center"
                style={{
                  background: isHover ? "#1c1c22" : "rgba(28,28,34,0.7)",
                  backdropFilter: "blur(8px)",
                  border: `2px solid ${isHover ? color : "rgba(255,255,255,0.06)"}`,
                  transform: isHover ? "scale(1.08) translateY(-4px)" : "none",
                  transition:
                    "transform .25s cubic-bezier(.2,.8,.2,1), border-color .2s ease, background .2s ease",
                }}
              >
                <Icon name={p.icon} size={34} className="" />
                <span style={{ color }} className="sr-only">
                  {p.label}
                </span>
              </div>
              <div
                className="font-display text-[13px] mt-3"
                style={{ color: isHover ? "#fff" : "rgba(255,255,255,0.6)", transition: "color .2s" }}
              >
                {p.label}
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.button
        onClick={() => choose("manager")}
        className="relative font-display text-[12px] text-white/35 mt-10 bg-transparent border-0 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        or <span className="text-white/60 border-b border-white/20">show me everything</span>
      </motion.button>

      {/* Cinematic zoom: color wash radiates from center, then route changes */}
      <AnimatePresence>
        {chosen && !reduce && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-full"
              style={{ background: accents[chosen], width: 120, height: 120 }}
              initial={{ scale: 0 }}
              animate={{ scale: 24 }}
              transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
