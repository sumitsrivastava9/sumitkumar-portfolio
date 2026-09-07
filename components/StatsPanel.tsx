"use client";

// Live Core Web Vitals for THIS site, measured in the visitor's own
// browser via Next's built-in reporter (no third-party script, no extra
// dependency). Turning performance into an on-page, inspectable feature
// is the one thing a frontend site can honestly prove about itself.

import { useState } from "react";
import { useReportWebVitals } from "next/web-vitals";

type Metric = { name: string; value: number; rating?: string; id: string };

const META: Record<string, { label: string; unit: string; hint: string }> = {
  LCP: { label: "Largest Contentful Paint", unit: "ms", hint: "when the main content appears" },
  INP: { label: "Interaction to Next Paint", unit: "ms", hint: "how fast it responds to input" },
  CLS: { label: "Cumulative Layout Shift", unit: "", hint: "how much the layout jumps" },
  FCP: { label: "First Contentful Paint", unit: "ms", hint: "first pixels painted" },
  TTFB: { label: "Time to First Byte", unit: "ms", hint: "server response latency" },
};
const ORDER = ["LCP", "INP", "CLS", "FCP", "TTFB"];

const RATING_COLOR: Record<string, string> = {
  good: "#5DCAA5",
  "needs-improvement": "#EF9F27",
  poor: "#E24B4A",
};

function format(name: string, value: number): string {
  if (name === "CLS") return value.toFixed(3);
  return `${Math.round(value)}`;
}

export default function StatsPanel() {
  const [metrics, setMetrics] = useState<Record<string, Metric>>({});
  useReportWebVitals((m) => {
    setMetrics((prev) => ({ ...prev, [m.name]: m as Metric }));
  });

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ORDER.map((key) => {
          const m = metrics[key];
          const meta = META[key];
          const color = m?.rating ? RATING_COLOR[m.rating] ?? "#A79F92" : "#A79F92";
          return (
            <div
              key={key}
              className="rounded-xl p-5 bg-white/[0.03] border border-white/[0.06]"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[11px] tracking-[0.12em] uppercase text-white/55 font-display">
                  {key}
                </span>
                {m?.rating && (
                  <span
                    className="text-[10px] font-display uppercase tracking-[0.1em] px-2 py-0.5 rounded-full"
                    style={{ color, border: `1px solid ${color}55` }}
                  >
                    {m.rating.replace("-", " ")}
                  </span>
                )}
              </div>
              <div className="mt-2 font-display text-3xl font-medium tabular-nums" style={{ color }}>
                {m ? format(key, m.value) : "…"}
                {m && meta.unit && (
                  <span className="text-base text-white/45 ml-1">{meta.unit}</span>
                )}
              </div>
              <div className="mt-1.5 text-[12px] text-white/55">{meta.label}</div>
              <div className="text-[11px] text-white/45 mt-0.5">{meta.hint}</div>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-[12px] leading-relaxed text-white/55 max-w-[62ch]">
        Measured live, in your browser, as you load this page. Values settle after
        a moment and after you interact (INP needs a click or key press). These are
        real field metrics for this site, not a lab score screenshot.
      </p>
    </div>
  );
}
