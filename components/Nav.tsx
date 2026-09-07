"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gateProfiles, accents, profile, ProfileKey } from "@/data/content";
import { exitToGate, rememberProfile } from "@/lib/profile";
import Icon from "@/components/Icon";

export default function Nav({ current }: { current: ProfileKey }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const color = accents[current];
  const me = gateProfiles.find((p) => p.key === current)!;

  function switchTo(key: ProfileKey) {
    rememberProfile(key);
    setOpen(false);
    router.push(`/${key}`);
  }

  return (
    <nav className="relative border-b border-white/[0.06]">
      {/* Keyboard users can jump straight past the nav to the content. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-black focus:text-[13px] focus:font-medium focus:font-display"
      >
        Skip to content
      </a>
      <div className="w-full max-w-[1080px] mx-auto px-6 sm:px-8 py-5 flex justify-between items-center gap-3">
      <button
        onClick={exitToGate}
        className="text-sm text-white font-medium font-display bg-transparent border-0 cursor-pointer shrink-0"
      >
        {profile.name.toLowerCase()}
        <span style={{ color }}>.</span>dev
      </button>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Persistent conversion actions, on every long-scroll view. */}
        <a
          href={profile.resumeUrl}
          download
          className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-display text-white/80 hover:text-white px-3 py-1.5 rounded-full border border-white/15 transition-colors"
        >
          <Icon name="download" size={13} />
          Résumé
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="hidden sm:inline-flex items-center text-[12px] font-display text-white/80 hover:text-white px-3 py-1.5 rounded-full border border-white/15 transition-colors"
        >
          Email
        </a>
        <div className="relative">
        <div className="flex items-center gap-2.5">
          <span className="hidden sm:inline text-[11px] text-white/45">viewing as</span>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 text-xs text-white px-3 py-1.5 rounded-full cursor-pointer"
            style={{ background: `${color}24`, border: `1px solid ${color}66` }}
            aria-haspopup="true"
            aria-expanded={open}
          >
            <Icon name={me.icon} size={14} />
            <span style={{ color: "#fff" }}>{me.label}</span>
            <Icon name="chevron-down" size={13} className="text-white/45" />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute right-0 mt-2 w-48 rounded-xl bg-ink-soft border border-white/10 p-1 z-20 origin-top-right"
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {gateProfiles
                .filter((p) => p.ready)
                .map((p) => (
                  <button
                    key={p.key}
                    onClick={() => switchTo(p.key)}
                    className="flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-[13px] text-white/80 hover:bg-white/5 bg-transparent border-0 cursor-pointer"
                  >
                    <Icon name={p.icon} size={15} style={{ color: accents[p.key] }} />
                    {p.label}
                  </button>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
      </div>
    </nav>
  );
}
