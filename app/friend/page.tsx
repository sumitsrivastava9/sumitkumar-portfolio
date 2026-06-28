import Nav from "@/components/Nav";
import { PageRise } from "@/components/Sections";
import { accents } from "@/data/content";

export default function FriendPage() {
  return (
    <main className="min-h-screen bg-ink">
      <Nav current="friend" />
      <PageRise>
        <section className="px-6 sm:px-8 pt-20 pb-24 text-center">
          <div
            className="text-[11px] tracking-[0.22em] uppercase mb-4 font-display"
            style={{ color: accents.friend }}
          >
            for friends
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-medium text-white tracking-tightest mb-4">
            Hey there.
          </h1>
          <p className="text-base text-white/55 max-w-md mx-auto">
            The fun, personal corner of the site. Under construction &mdash; check back soon.
          </p>
        </section>
      </PageRise>
    </main>
  );
}
