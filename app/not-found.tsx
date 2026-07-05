import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink flex flex-col items-center justify-center px-6 text-center">
      <div className="text-[12px] tracking-[0.24em] uppercase text-white/45 mb-3 font-display">
        404
      </div>
      <h1 className="font-display text-4xl sm:text-5xl font-medium text-white tracking-tightest mb-3">
        This profile doesn&rsquo;t exist.
      </h1>
      <p className="text-base text-white/55 max-w-md mb-9">
        Nothing lives at this address. Head back to the gate and pick a
        profile, or skip straight to the work.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          href="/"
          className="text-[13px] font-medium px-5 py-2.5 rounded-full text-white font-display bg-coral"
        >
          Back to the gate
        </Link>
        <Link
          href="/manager"
          className="text-[13px] font-medium px-5 py-2.5 rounded-full border border-white/20 text-white font-display"
        >
          Show me everything
        </Link>
      </div>
    </main>
  );
}
