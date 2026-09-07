import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Sections";
import { notes } from "@/data/notes";
import { profile } from "@/data/content";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const note = notes.find((n) => n.slug === params.slug);
  if (!note) return { title: "Note not found" };
  return { title: note.title, description: note.dek };
}

export default function NotePage({ params }: { params: { slug: string } }) {
  const note = notes.find((n) => n.slug === params.slug);
  if (!note) notFound();
  const accent = note.accent;

  return (
    <main
      className="min-h-screen bg-ink"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <nav className="border-b border-white/[0.06]">
        <div className="w-full max-w-[1080px] mx-auto px-6 sm:px-8 py-5 flex justify-between items-center">
          <Link href="/" className="text-sm text-white font-medium font-display">
            {profile.name.toLowerCase()}
            <span style={{ color: accent }}>.</span>dev
          </Link>
          <Link
            href="/notes"
            className="text-[12px] text-white/60 hover:text-white transition-colors font-display"
          >
            all notes
          </Link>
        </div>
      </nav>
      <Container>
        <article className="pt-14 pb-16">
          <div
            className="text-[11px] tracking-[0.22em] uppercase mb-3.5 font-display"
            style={{ color: accent }}
          >
            build note &middot; {note.readTime} read
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tightest text-white mb-3 max-w-[760px]">
            {note.title}
          </h1>
          <p className="text-base leading-relaxed text-white/60 max-w-[620px]">
            {note.dek}
          </p>

          <div className="mt-10 space-y-10">
            {note.sections.map((s) => (
              <div key={s.heading} className="max-w-[680px]">
                <h2 className="font-display text-[19px] font-medium text-white mb-3">
                  {s.heading}
                </h2>
                <div className="space-y-3.5">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-[14.5px] leading-[1.7] text-white/70">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            {note.relatedCaseStudy && (
              <Link
                href={`/work/${note.relatedCaseStudy.slug}`}
                className="inline-flex items-center gap-2 text-[13px] font-display font-medium px-5 py-2.5 rounded-full"
                style={{ background: accent, color: "#0d0d12" }}
              >
                {note.relatedCaseStudy.label} &rarr;
              </Link>
            )}
            <Link
              href="/notes"
              className="text-[13px] font-display text-white/60 hover:text-white transition-colors"
            >
              all notes
            </Link>
          </div>
        </article>
      </Container>
    </main>
  );
}
