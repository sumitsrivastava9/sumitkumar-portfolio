"use client";

import { useEffect, useRef } from "react";

// Parse a #rrggbb hex string into an [r,g,b] tuple.
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

// Lighten/darken an rgb tuple toward white (amt > 0) or black (amt < 0).
function shade([r, g, b]: number[], amt: number): [number, number, number] {
  const t = amt > 0 ? 255 : 0;
  const p = Math.abs(amt);
  return [
    Math.round(r + (t - r) * p),
    Math.round(g + (t - g) * p),
    Math.round(b + (t - b) * p),
  ];
}

export default function GradientMesh({
  accent,
  opacity = 0.55,
}: {
  // When given, the mesh becomes a monochromatic glow in this profile colour.
  // When omitted, it falls back to the multi-colour gate palette.
  accent?: string;
  opacity?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const c = ctx;
    const canvas = cv;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0,
      H = 0,
      raf = 0;
    function size() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    size();
    window.addEventListener("resize", size);

    // Profile pages pass an accent → three tints of one colour for a cohesive
    // glow. The gate passes nothing → the original tri-colour palette.
    const base = accent ? hexToRgb(accent) : null;
    const blobs = base
      ? [
          { x: 0.32, y: 0.28, r: 0.55, col: shade(base, 0.18), px: 0.00007, py: 0.00005, t: 0 },
          { x: 0.7, y: 0.45, r: 0.6, col: base, px: -0.00005, py: 0.00006, t: 2 },
          { x: 0.45, y: 0.78, r: 0.55, col: shade(base, -0.25), px: 0.00006, py: -0.00004, t: 4 },
        ]
      : [
          { x: 0.25, y: 0.3, r: 0.5, col: [216, 90, 48], px: 0.00007, py: 0.00005, t: 0 },
          { x: 0.75, y: 0.4, r: 0.55, col: [127, 119, 221], px: -0.00005, py: 0.00006, t: 2 },
          { x: 0.5, y: 0.75, r: 0.5, col: [93, 202, 165], px: 0.00006, py: -0.00004, t: 4 },
        ];

    function frame(now: number) {
      c.clearRect(0, 0, W, H);
      c.globalCompositeOperation = "lighter";
      blobs.forEach((b) => {
        const cx = (b.x + (reduce ? 0 : Math.sin(now * b.px + b.t) * 0.12)) * W;
        const cy = (b.y + (reduce ? 0 : Math.cos(now * b.py + b.t) * 0.12)) * H;
        const rad = b.r * Math.max(W, H);
        const g = c.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${b.col[0]},${b.col[1]},${b.col[2]},0.5)`);
        g.addColorStop(1, `rgba(${b.col[0]},${b.col[1]},${b.col[2]},0)`);
        c.fillStyle = g;
        c.beginPath();
        c.arc(cx, cy, rad, 0, Math.PI * 2);
        c.fill();
      });
      if (!reduce) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, [accent]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
