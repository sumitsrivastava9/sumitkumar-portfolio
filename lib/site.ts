// Canonical site origin, used for metadata, sitemap and robots.
// Set NEXT_PUBLIC_SITE_URL in production (e.g. https://sumit.dev).
// Falls back to the Vercel deployment URL, then localhost in dev.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
