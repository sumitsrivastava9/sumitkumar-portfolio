import Nav from "@/components/Nav";
import { PageRise } from "@/components/Sections";
import { accents } from "@/data/content";

export default function LearnerPage() {
  return (
    <main className="min-h-screen bg-ink">
      <Nav current="learner" />
      <PageRise>
        <section className="px-6 sm:px-8 pt-20 pb-24 text-center">
          <div
            className="text-[11px] tracking-[0.22em] uppercase mb-4 font-display"
            style={{ color: accents.learner }}
          >
            for learners
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-medium text-white tracking-tightest mb-4">
            Coming soon.
          </h1>
          <p className="text-base text-white/55 max-w-md mx-auto">
            This is where the blog and the frontend &rarr; full-stack journey will live.
            Building it out next.
          </p>
        </section>
      </PageRise>
    </main>
  );
}
