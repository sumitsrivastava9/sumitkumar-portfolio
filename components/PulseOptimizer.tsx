"use client";

// ---------------------------------------------------------------------
// PulseOptimizer — the "operate the optimisation" widget.
//
// A visitor flips one toggle between "before" and "after" and watches
// the redundant-API-call count fall and the component re-render heatmap
// cool, reproducing the mechanism described in the Pulse case study
// (short staleness + refetch-on-mount, then per-query staleness windows
// and split contexts).
//
// HONESTY (non-negotiable): this is an ILLUSTRATIVE RECONSTRUCTION on
// SYNTHETIC data, not live production telemetry. That is stated in the
// UI. The real, defensible result (~50% fewer redundant calls, ~45%
// fewer re-renders) is Sumit's and is cited alongside.
//
// It renders a meaningful static state on the server (so no-JS visitors
// see the "before" view), and eases values only client-side. The global
// prefers-reduced-motion rule in globals.css neutralises the CSS
// transitions, and the counter jumps instead of animating.
// ---------------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Mode = "before" | "after";

// Synthetic figures chosen to reflect the real ~50% / ~45% reductions.
const CALLS: Record<Mode, number> = { before: 94, after: 47 };
const RENDERS: Record<Mode, number> = { before: 30, after: 16 };

// Deterministic heatmaps (fixed arrays so server and client render the
// same thing). 30 cells = a 6-wide grid of components; each value is a
// render-intensity 0..1. "after" leaves far fewer cells hot.
const HEAT: Record<Mode, number[]> = {
  before: [
    0.9, 0.7, 1, 0.8, 0.6, 0.85,
    0.8, 1, 0.7, 0.9, 0.75, 0.7,
    0.7, 0.85, 0.6, 1, 0.8, 0.9,
    0.9, 0.7, 0.8, 0.65, 0.9, 0.8,
    0.8, 1, 0.7, 0.85, 0.7, 0.9,
  ],
  after: [
    0.15, 0, 0.55, 0.1, 0, 0,
    0, 0.5, 0, 0.2, 0, 0.1,
    0.1, 0, 0, 0.55, 0.1, 0,
    0, 0.2, 0, 0, 0.15, 0,
    0.5, 0, 0.1, 0, 0, 0.15,
  ],
};

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

// Eases the displayed number toward its target on each mode change.
// Jumps immediately under reduced motion.
function useEased(target: number, reduce: boolean): number {
  const [val, setVal] = useState(target);
  const from = useRef(target);
  const raf = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (reduce) {
      setVal(target);
      from.current = target;
      return;
    }
    const start = performance.now();
    const startVal = from.current;
    const dur = 700;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(startVal + (target - startVal) * e));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, reduce]);
  return val;
}

export default function PulseOptimizer({ accent = "#D85A30" }: { accent?: string }) {
  const reduce = useReducedMotion() ?? false;
  const [mode, setMode] = useState<Mode>("before");
  const calls = useEased(CALLS[mode], reduce);
  const renders = useEased(RENDERS[mode], reduce);
  const rgb = hexToRgb(accent);

  const callsPct = Math.round((1 - CALLS.after / CALLS.before) * 100);
  const renderPct = Math.round((1 - RENDERS.after / RENDERS.before) * 100);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      {/* Header + toggle */}
      <div className="flex items-center justify-between gap-4 flex-wrap px-5 sm:px-6 pt-5 pb-4 border-b border-white/[0.07]">
        <div>
          <div className="font-display text-[15px] font-medium text-white">
            Operate the optimisation
          </div>
          <div className="text-[12px] text-white/55 mt-0.5">
            Flip the fix and watch the cost move.
          </div>
        </div>
        <div
          role="group"
          aria-label="Toggle the optimisation"
          className="inline-flex rounded-full border border-white/15 p-0.5 text-[12px] font-display"
        >
          {(["before", "after"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className="px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              style={
                mode === m
                  ? { background: accent, color: "#0d0d12" }
                  : { color: "rgba(255,255,255,0.7)", background: "transparent" }
              }
            >
              {m === "before" ? "Before" : "After"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 p-5 sm:p-6">
        {/* Redundant API calls */}
        <div>
          <div className="text-[11px] tracking-[0.12em] uppercase text-white/55 font-display mb-2">
            Redundant API calls
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[40px] leading-none font-medium tabular-nums text-white">
              {calls}
            </span>
            <span className="text-[12px] text-white/55">per 10 navigations</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-out"
              style={{ width: `${(CALLS[mode] / CALLS.before) * 100}%`, background: accent }}
            />
          </div>
          <div
            className="mt-2 text-[12px] leading-snug min-h-[32px]"
            style={{ color: mode === "after" ? accent : "rgba(255,255,255,0.5)" }}
          >
            {mode === "after"
              ? `~${callsPct}% fewer — per-query staleness windows serve unchanged data from cache`
              : "short staleness + refetch-on-mount re-fires shared queries on almost every navigation"}
          </div>
        </div>

        {/* Component re-render heatmap */}
        <div>
          <div className="text-[11px] tracking-[0.12em] uppercase text-white/55 font-display mb-2">
            Components re-rendered
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-display text-[40px] leading-none font-medium tabular-nums text-white">
              {renders}
            </span>
            <span className="text-[12px] text-white/55">on one state change</span>
          </div>
          <div className="grid grid-cols-6 gap-1.5" aria-hidden="true">
            {HEAT[mode].map((v, i) => (
              <div
                key={i}
                className="aspect-square rounded-[3px] transition-colors duration-700"
                style={{
                  background:
                    v <= 0.02
                      ? "rgba(255,255,255,0.05)"
                      : `rgba(${rgb}, ${0.14 + v * 0.86})`,
                }}
              />
            ))}
          </div>
          <div
            className="mt-2 text-[12px] leading-snug min-h-[32px]"
            style={{ color: mode === "after" ? accent : "rgba(255,255,255,0.5)" }}
          >
            {mode === "after"
              ? `~${renderPct}% fewer — split contexts mean each view subscribes only to what it reads`
              : "state shared far wider than it is read, so one change repaints unrelated views"}
          </div>
        </div>
      </div>

      {/* Honesty label — non-negotiable */}
      <div className="px-5 sm:px-6 pb-5">
        <p className="text-[11px] leading-relaxed text-white/55">
          <span
            className="inline-block align-middle mr-2 mb-0.5 px-2 py-0.5 rounded-full text-[10px] font-display uppercase tracking-[0.1em]"
            style={{ color: accent, border: `1px solid ${accent}55` }}
          >
            Reconstruction
          </span>
          Illustrative recreation of the production fix on synthetic data, not live
          telemetry. The real, measured result: ~50% fewer redundant API calls and
          ~45% fewer re-renders, from profiling the dashboard before and after.
        </p>
      </div>
    </div>
  );
}
