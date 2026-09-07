import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Sections";
import { notes } from "@/data/notes";
import { profile } from "@/data/content";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Short, decision-first build notes on real work: performance, LLMs, and the trade-offs behind the choices.",
};

const ACCENT = "#D85A30";

export default function NotesPage() {
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
        <div className="pt-14 pb-10">
          <div
            className="text-[11px] tracking-[0.22em] uppercase mb-3.5 font-display"
            style={{ color: ACCENT }}
          >
            notes
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tightest text-white mb-3">
            Build notes
          </h1>
          <p className="text-base leading-relaxed text-white/60 max-w-[620px]">
            Short write-ups of decisions I actually made: the symptom, the root
            cause, the fix, and what I&rsquo;d do differently. The proof that I can
            explain the why, not just ship the what.
          </p>
        </div>
        <section className="pb-16 border-t border-white/[0.07]">
          {notes.map((n) => (
            <Link
              key={n.slug}
              href={`/notes/${n.slug}`}
              className="group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 py-6 border-b border-white/[0.07]"
            >
              <div className="flex-1 min-w-0">
                <div className="font-display text-xl text-white font-medium mb-1.5">
                  {n.title}
                </div>
                <p className="text-[13.5px] leading-[1.55] text-white/60 max-w-[620px]">
                  {n.dek}
                </p>
                <div className="flex gap-2 flex-wrap mt-3">
                  {n.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] text-white/60 bg-white/5 px-2.5 py-1 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span
                className="inline-flex items-center gap-1 shrink-0 text-[13px] font-display mt-0.5 transition-transform group-hover:translate-x-0.5"
                style={{ color: n.accent }}
              >
                {n.readTime} read &rarr;
              </span>
            </Link>
          ))}
        </section>
      </Container>
    </main>
  );
}
