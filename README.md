# Sumit — Portfolio

Next.js 14 + Tailwind + Framer Motion. Dark, audience-gated portfolio
with a Netflix-style "who's visiting?" gate that routes to tailored
profile pages.

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
No env vars needed.

## Project structure

```
app/
  page.tsx          The gate (home). Gradient mesh, 4 profiles, zoom transition.
  manager/          Hiring-manager page (full build).
  recruiter/        Recruiter page (facts-first).
  learner/          Stub — grows later.
  friend/           Stub — grows later.
  layout.tsx        Fonts + root shell.
  globals.css       Reset, tokens, reduced-motion + focus styles.
components/
  GradientMesh.tsx  Animated canvas background (freezes on reduced-motion).
  Nav.tsx           Top bar + profile switcher.
  Sections.tsx      Hero, ImpactStats, FlagshipProject, MoreWork, Skills, Contact.
  Icon.tsx          Inline icon set (no icon-library dependency).
data/
  content.ts        ALL TEXT LIVES HERE. Edit this one file.
public/
  resume.pdf        Placeholder — replace with your real resume.
```

## ⚠️ Before you go public — replace the placeholder content

Everything in `data/content.ts` marked PLACEHOLDER is mock copy written
to show the layout. The flagship-project Problem/Choice/Tradeoff/Impact
and the impact stats are INVENTED. Replace them with your real,
defensible content. Do not ship fabricated numbers — they fall apart
under interview questioning.

Checklist:
- [ ] `profile.email`, `profile.linkedin`
- [ ] Replace `public/resume.pdf` with your real resume
- [ ] `flagship.framework` — your real Problem / Choice / Tradeoff / Impact
- [ ] `stats` — only numbers you can defend; delete the rest
- [ ] `flagship.video.src` — add your walkthrough video (mp4 in /public)
- [ ] `moreWork` — your real secondary projects
- [ ] `recruiterFacts` — confirm location, availability
- [ ] Confirm every skill tag is something you can speak to

## What's deliberately deferred

- Learner + Friend profiles (stubbed)
- Blog / MDX (planned for the Learner profile)
- Cursor spotlight on the gate (dropped — the moving mesh is enough)

## Accessibility built in

- Keyboard-focusable gate, visible focus rings
- `prefers-reduced-motion` respected (mesh freezes, transitions snap)
- Profile switcher so no one is ever trapped in one view
