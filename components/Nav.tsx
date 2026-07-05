"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gateProfiles, accents, profile, ProfileKey } from "@/data/content";
import Icon from "@/components/Icon";

export default function Nav({ current }: { current: ProfileKey }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const color = accents[current];
  const me = gateProfiles.find((p) => p.key === current)!;

  function switchTo(key: ProfileKey) {
    try {
      localStorage.setItem("profile", key);
    } catch {}
    setOpen(false);
    router.push(`/${key}`);
  }

  return (
    <nav className="border-b border-white/[0.06]">
      <div className="w-full max-w-[1080px] mx-auto px-6 sm:px-8 py-5 flex justify-between items-center">
      <button
        onClick={() => {
          try {
            localStorage.removeItem("profile");
          } catch {}
          router.push("/");
        }}
        className="text-sm text-white font-medium font-display bg-transparent border-0 cursor-pointer"
      >
        {profile.name.toLowerCase()}
        <span style={{ color }}>.</span>dev
      </button>

      <div className="relative">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] text-white/45">viewing as</span>
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

        {open && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-ink-soft border border-white/10 p-1 z-20">
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
          </div>
        )}
      </div>
      </div>
    </nav>
  );
}
