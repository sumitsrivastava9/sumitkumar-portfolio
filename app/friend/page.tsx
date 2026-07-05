import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { PageRise } from "@/components/Sections";
import { accents } from "@/data/content";

// Unlisted page: not on the gate, not in the nav switcher, not in the
// sitemap. Reachable only by the direct link shared with friends.
export const metadata: Metadata = {
  title: "For friends",
  robots: { index: false },
};

export default function FriendPage() {
  const accent = accents.friend;
  return (
    <main
      className="min-h-screen bg-ink"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <Nav current="friend" />
      <PageRise>
        <section className="px-6 sm:px-8 pt-20 pb-24 text-center">
          <div
            className="text-[11px] tracking-[0.22em] uppercase mb-4 font-display"
            style={{ color: accent }}
          >
            for friends
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-medium text-white tracking-tightest mb-4">
            Hey, you found it.
          </h1>
          <p className="text-base text-white/55 max-w-md mx-auto mb-8">
            The personal corner isn&rsquo;t written yet; some stories are
            better told in person. Meanwhile, the work lives here:
          </p>
          <Link
            href="/manager"
            className="inline-block text-[13px] font-medium px-5 py-2.5 rounded-full text-white font-display"
            style={{ background: accent }}
          >
            Show me everything
          </Link>
        </section>
      </PageRise>
    </main>
  );
}
