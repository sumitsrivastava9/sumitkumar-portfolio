import type { Metadata } from "next";
import Link from "next/link";
import StatsPanel from "@/components/StatsPanel";
import { Container } from "@/components/Sections";
import { profile } from "@/data/content";

export const metadata: Metadata = {
  title: "Site stats",
  description:
    "Live Core Web Vitals for this site, measured in your own browser. A frontend engineer's site should prove its own performance.",
};

const ACCENT = "#5DCAA5";

export default function StatsPage() {
  return (
    <main
      className="min-h-screen bg-ink"
      style={{ "--accent": ACCENT } as React.CSSProperties}
    >
      <nav className="border-b border-white/[0.06]">
        <div className="w-full max-w-[1080px] mx-auto px-6 sm:px-8 py-5 flex justify-between items-center">
          <Link href="/" className="text-sm text-white font-medium font-display">
            {profile.name.toLowerCase()}
            <span style={{ color: ACCENT }}>.</span>dev
          </Link>
          <Link
            href="/"
            className="text-[12px] text-white/60 hover:text-white transition-colors font-display"
          >
            home
          </Link>
        </div>
      </nav>
      <Container>
        <div className="pt-14 pb-8">
          <div
            className="text-[11px] tracking-[0.22em] uppercase mb-3.5 font-display"
            style={{ color: ACCENT }}
          >
            colophon
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tightest text-white mb-3">
            This site, measured.
          </h1>
          <p className="text-base leading-relaxed text-white/60 max-w-[620px]">
            A frontend engineer&rsquo;s site should be able to prove its own
            performance, not just claim it. These are this page&rsquo;s Core Web
            Vitals, measured live in your browser as you read.
          </p>
        </div>
        <section className="pb-16">
          <StatsPanel />
        </section>
      </Container>
    </main>
  );
}
