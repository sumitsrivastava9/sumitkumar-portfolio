# Sumit — Portfolio

Next.js 14 + Tailwind + Framer Motion. Dark, audience-gated portfolio
with a Netflix-style "who's visiting?" gate that routes to tailored
profile pages, plus per-project case-study pages under `/work`.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll land on the gate.

## Build / deploy

```bash
npm run build   # production build (verifies everything compiles)
npm start       # serve the production build
```

Deploy: push to GitHub, import the repo on Vercel (or any Node host).
Set one env var in production:

- `NEXT_PUBLIC_SITE_URL` — the canonical origin (e.g. `https://sumit.dev`).
  Used for Open Graph URLs, the sitemap and robots.txt. Falls back to
  the Vercel URL automatically if unset.

## Project structure

```
app/
  page.tsx            The gate (home). Gradient mesh, ready profiles, zoom transition.
  manager/            Hiring-manager page (full build).
  recruiter/          Recruiter page (facts-first).
  learner/            Learning-in-public page (current builds + plan).
  friend/             Unlisted personal page (not on the gate, noindex).
  work/[slug]/        Case-study pages (Pulse full write-up + two briefs).
  layout.tsx          Fonts (next/font), site metadata, JSON-LD.
  not-found.tsx       Netflix-voice 404.
  sitemap.ts          Sitemap (friend page deliberately excluded).
  robots.ts           Robots + sitemap pointer.
  icon.tsx            Generated favicon ("S." tile).
  opengraph-image.tsx Per-route OG cards (also in manager/recruiter/learner/work).
components/
  GradientMesh.tsx    Animated canvas background (freezes on reduced-motion).
  Nav.tsx             Top bar + profile switcher (ready profiles only).
  Sections.tsx        Hero, stats, flagship, more-work, skills, contact.
  CaseStudy.tsx       Case-study page layout + slim work nav.
  Icon.tsx            Inline icon set (no icon-library dependency).
data/
  content.ts          ALL page text lives here.
  caseStudies.ts      Case-study copy, one entry per /work/<slug>.
lib/
  site.ts             Canonical site URL helper.
  og.tsx              Shared Open Graph card template.
assets/fonts/         Space Grotesk TTFs for OG rendering (checked in).
media-src/            Raw media originals (gitignored, local only).
public/               Web-optimised assets (video 6.3MB, poster, avatar.webp).
```

## ⚠️ Before you go public

Most copy is real and resume-backed. What still needs your eyes:

- [ ] `data/caseStudies.ts` — the AutoOrder AI and real-time chat briefs
      are built ONLY from resume facts. Expand them (marked `TODO`) and
      verify every sentence; delete anything you can't defend in interview.
- [ ] `data/content.ts` learner section — confirm the two "currently
      building" descriptions match what you're actually building.
- [ ] Pulse walkthrough video — confirm Studio Graphene sign-off and that
      every frame is scrubbed before the site goes live.
- [ ] Buy the domain and set `NEXT_PUBLIC_SITE_URL`.
- [ ] Check `public/resume.pdf` is your latest resume.

## What's deliberately deferred (next phase)

- "Ask my portfolio" AI chat (mirrors Pulse AI)
- Analytics (profile picks, video plays, resume downloads) + /stats
- Contact form with a real backend (needs an email provider key)
- Blog / MDX write-ups on the Learner page
- Friend profile content (page exists, unlisted)

## Accessibility built in

- Keyboard-focusable gate, visible focus rings tinted per profile
- `prefers-reduced-motion` respected (mesh freezes, transitions snap)
- Profile switcher so no one is ever trapped in one view
