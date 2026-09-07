// ============================================================
//  CONTENT: single source of truth for all on-page text.
//  Populated from Sumit's resume; every metric here is real and
//  defensible. Case-study page copy lives in data/caseStudies.ts.
// ============================================================

export const profile = {
  name: "Sumit",
  domainLabel: "sumit.dev",
  role: "Frontend Engineer",
  // TODO(sumit): move to a branded address once the domain resolves
  // (e.g. hi@sumit.dev). A numbered gmail under a "sumit.dev" wordmark
  // reads off-brand on a proof-first site.
  email: "sumkumar723@gmail.com",
  linkedin: "https://www.linkedin.com/in/sumit-frontend/",
  github: "https://github.com/sumitsrivastava9",
  resumeUrl: "/resume.pdf",
};

export type ProfileKey = "manager" | "recruiter" | "learner" | "friend";

export const accents: Record<ProfileKey, string> = {
  manager: "#D85A30",
  recruiter: "#5DCAA5",
  learner: "#7F77DD",
  friend: "#EF9F27",
};

export const gateProfiles: {
  key: ProfileKey;
  label: string;
  icon: string;
  ready: boolean;
}[] = [
  { key: "manager", label: "Hiring manager", icon: "briefcase", ready: true },
  { key: "recruiter", label: "Recruiter", icon: "user-search", ready: true },
  { key: "learner", label: "Learner", icon: "book", ready: true },
  // Friend stays unlisted (ready: false) until it has real content;
  // the gate and nav only show ready profiles. /friend still resolves.
  { key: "friend", label: "Friend", icon: "smile", ready: false },
];

// ---- Hero ----
// One ownable thesis, not a generic tagline: the specialism (data-heavy
// UI performance) sits in the headline; the defensible-AI half and the
// two real Pulse numbers sit in the subtitle. Phrased so every word is
// interview-defensible today. Shared verbatim by the manager and
// recruiter views so the positioning is identical wherever they land.
export const hero = {
  eyebrow: "for hiring managers",
  lineTop: "I make data-heavy",
  lineBottomLead: "products ",
  lineBottomAccent: "fast.",
  subtitle:
    "Frontend engineer at a product studio. On Pulse, an engineering-analytics platform, I cut redundant API calls by ~50% and re-renders by ~45%. I also ship AI features I can defend line by line, like a menu assistant that can't invent a dish.",
};

// ---- Hero snapshot card (HIRING MANAGER) ----
// Sits on the gradient panel beside the headline so the facts land
// above the fold. Every value here is pulled from the resume.
export const heroSnapshot = {
  company: "", // shown as the header subtitle if set; "" keeps the role
  // Headshot in /public. Falls back to a clean monogram if missing.
  avatar: "/avatar.webp",
  rows: [
    { label: "Experience", value: "3 yrs · React, Next.js, TS" },
    { label: "Currently", value: "Studio Graphene" },
    { label: "Based in", value: "Gurugram, IN" },
  ],
  availability: "Open to frontend roles", // shown with a live dot
};

// ---- Impact stats (HIRING MANAGER) ----
// Fewer real stats beat more fluffy ones. Two of these are absolute
// claims a skeptical reviewer will probe, so each is scoped to what is
// genuinely defensible.
// TODO(sumit) — before going public, make each counter fully defensible:
//   1. "40%": state the method + baseline you can produce in interview
//      (measured as X against Y), or replace with another real number.
//   2. "0 critical bugs": only keep the absolute if you can point to a
//      real tracked source (e.g. no P1 incidents attributable to your
//      frontend across N releases, tracked in Jira). Never swap in
//      credible-sounding phrasing without an actual source.
//   3. "10+ apps": the roster below should make this count inspectable;
//      if the honest count is lower, state the real number here.
export const stats = [
  { value: "40", unit: "%", label: "faster feature delivery via a 50+ component design system" },
  { value: "0", unit: "critical bugs", label: "in the client frontends I shipped to production" },
  { value: "10", unit: "+ apps", label: "shipped across SaaS, AI and analytics products" },
];

// ---- Flagship project ----
// Real write-up of the Pulse engineering-analytics platform, framed
// Problem / Choice / Tradeoff / Impact. Numbers match the resume.
export const flagship = {
  title: "Pulse: engineering analytics platform",
  subtitle: "Real-time dashboards plus a natural-language AI query layer over Jira and GitHub data",
  video: {
    src: "/walkthrough.mp4",
    poster: "/walkthrough-poster.jpg",
    durationLabel: "2:20",
    caption: "how I built it · behaviour only · data scrubbed",
  },
  privacyNote:
    "Built at Studio Graphene. Internal product, shown with permission and scrubbed data.",
  framework: {
    problem:
      "Pulse pulls engineering metrics from Jira and GitHub into one live dashboard. As the data and number of views grew, the frontend was firing redundant API calls and re-rendering heavily, so it felt sluggish exactly when teams leaned on it. Non-technical stakeholders also couldn't get an answer without asking an engineer to pull it.",
    choice:
      "I built a React Query caching layer with selective context splitting and targeted memoisation, so each view only fetches and re-renders what actually changed. On top of that I built Pulse AI, a natural-language query interface that lets anyone ask for a metric in plain English instead of navigating the dashboard.",
    tradeoff:
      "Caching and context splitting add real complexity: cache invalidation and a more fragmented state tree are harder to reason about than fetch-on-render. I accepted that overhead because the responsiveness gains were measurable and the dashboard is used every day.",
    impact:
      "Cut redundant API calls by ~50% and reduced re-renders by ~45%, making the dashboard noticeably more responsive at scale. Pulse AI gave non-technical stakeholders self-serve access to project and developer insights without writing a single query.",
  },
  tags: ["React", "Next.js", "TypeScript", "React Query", "Redux Toolkit"],
};

// ---- Apps roster ----
// Makes the "10+ apps" claim inspectable: each entry names the app, the
// role Sumit actually held, its status, and (where known) the stack. A
// `slug` links to a full case study; without one it renders as a static
// roster row. Typed so no `as` casts are needed at the call site.
// TODO(sumit): fill the stack for Form1/Mimentor and add any other apps
// you genuinely owned (with real role + status). Do not pad this list —
// if the honest total is under ten, change the "10+" stat accordingly.
export type MoreWorkItem = {
  title: string;
  role: string;
  status: string;
  descriptor: string; // stack or a short context line
  description?: string;
  eyebrow?: string;
  slug?: string; // links to /work/<slug> when a full case study exists
  liveUrl?: string;
  accent?: string;
};

export const moreWork: MoreWorkItem[] = [
  {
    eyebrow: "Personal project · 2026",
    title: "MealPilot",
    role: "Sole engineer",
    status: "Live",
    description:
      "Food-ordering app with an AI assistant that suggests real dishes from the live menu. You describe what you feel like; it picks from what's actually available, and it cannot surface a dish that does not exist.",
    descriptor: "Next.js · Redux Toolkit · Claude API",
    slug: "mealpilot",
    liveUrl: "https://mealpilot-murex.vercel.app/",
    accent: "#FF6B35",
  },
  {
    eyebrow: "Studio Graphene",
    title: "Form1",
    role: "Frontend engineer",
    status: "Shipped",
    description:
      "Frontend work across the platform, including a complex update-search fix that both a project lead and the CTO called out (see Recognition below).",
    descriptor: "Client platform · Studio Graphene",
  },
  {
    eyebrow: "Studio Graphene · first project",
    title: "Mimentor",
    role: "Frontend engineer",
    status: "Shipped",
    description:
      "My first project at Studio Graphene. The project lead reported it shipped flawlessly, with no issues encountered in production.",
    descriptor: "Client platform · Studio Graphene",
  },
];

// ---- Skills ----
export const skills = {
  core: {
    label: "Core · Frontend",
    note: "3 years, production scale",
    items: ["React", "Next.js", "TypeScript", "Redux Toolkit", "React Query", "Tailwind CSS", "Jest"],
  },
  growing: {
    // De-hedged: for a targeted frontend role the backend is a supporting
    // strength, not a competing second track. Framed as "enough to be a
    // strong frontend partner" so it never dilutes the core claim.
    label: "Also · Backend",
    note: "enough Node, Express and Postgres to be a strong frontend partner",
    // Backed by the builds listed on the learner page. Claude API is
    // backed by MealPilot's server route (live, with a case study).
    items: ["Node.js", "Express", "PostgreSQL", "REST APIs", "Claude API"],
  },
};

// ---- Learner page ----
// Honest framing: this is the in-progress journey, not a claim of
// backend seniority. TODO(sumit): keep journey states in sync with
// what you're actually building; write-ups land here later as a blog.
export type JourneyStep = {
  // done = shipped and defensible · now = on the bench today ·
  // next = committed, not started
  state: "done" | "now" | "next";
  title: string;
  detail: string;
  tags?: string[];
};

export const learner = {
  eyebrow: "for learners",
  heading: "Learning in public",
  intro:
    "I'm a frontend engineer deepening into the backend so I can own features end to end. This page tracks that as it happens: what I'm building, what I got wrong, and what I'd tell past-me.",
  // Typewriter under the intro. Only things actually on the bench.
  cycle: [
    "Node, Express, PostgreSQL, REST",
    "now building full-stack, end to end",
    "Namaste AI from 15 August",
    "writing up every mistake",
  ],
  journeyLabel: "the journey",
  journey: [
    {
      state: "done",
      title: "Frontend at production scale",
      detail:
        "Three years of React, Next.js and TypeScript across 10+ live apps. The foundation the rest builds on.",
    },
    {
      state: "done",
      title: "Backend fundamentals",
      detail:
        "Worked through the server side properly: Node and Express for routing and middleware, PostgreSQL for schema design and queries, and REST API design end to end. The fundamentals are in place. What I build with them is the proof.",
      tags: ["Node.js", "Express", "PostgreSQL", "REST APIs"],
    },
    {
      state: "now",
      title: "Building full-stack",
      detail:
        "Turning those fundamentals into shipped products: apps I own end to end, from the Postgres schema through the API to the React frontend. Hand-rolling the pieces frameworks usually hide.",
      tags: ["Node.js", "Express", "PostgreSQL", "React", "Next.js"],
    },
    {
      state: "next",
      title: "AI engineering",
      detail:
        "Namaste AI (Akshay Saini), starting 15 August 2026. MealPilot already ships a Claude-backed feature I can defend line by line; the goal is to make that a repeatable skill rather than a one-off, and fold it into the full-stack work.",
      tags: ["LLM APIs", "Prompt design", "Retrieval"],
    },
    {
      state: "next",
      title: "Write-ups, in public",
      detail:
        "Every build documented: the decisions, the mistakes, the fixes. They land on this page as a blog.",
    },
    {
      state: "next",
      title: "Full-stack in production",
      detail:
        "Fold the backend and AI work back into client projects and ship end to end, not just in side projects.",
    },
  ] as JourneyStep[],
  topicsLabel: "on the bench right now",
  // Ticker content: topics being learned, not skill claims.
  topics: [
    "REST API design",
    "PostgreSQL schemas",
    "Express middleware",
    "auth flows",
    "input validation",
    "error handling",
    "DB migrations",
    "query performance",
    "deploying a Node API",
    "wiring React to my own API",
  ],
};

// ---- Recruiter facts ----
export const recruiterFacts = [
  { label: "Experience", value: "3 years, frontend" },
  { label: "Core stack", value: "React, Next.js, TypeScript" },
  { label: "Location", value: "Gurugram, IN" },
  { label: "Availability", value: "Open to frontend roles" },
];

// ---- Recruiter stat counters ----
export const recruiterStats = [
  { num: 3, suffix: "", label: "Years of frontend experience" },
  { num: 10, suffix: "+", label: "Production apps shipped" },
  { num: 0, suffix: "", label: "Critical bugs in production" },
];

// ---- Typewriter cycle lines (hero, recruiter view) ----
export const recruiterCycle = [
  "3 yrs · React, Next.js, TypeScript",
  "10+ production apps shipped",
  "Open to new roles",
];

// ---- Recognition ----
// Real Nectar shoutouts from colleagues at Studio Graphene. Same ethos
// as the rest of the site: named people, real quotes, defensible.
// NOTE(sumit): the three aggregate numbers below (recognitions,
// colleagues, span) must match what your Nectar profile actually shows.
// Confirm them before this ships, or swap them for numbers you can point
// to in the interview. The quotes themselves are verbatim.
export type Shoutout = {
  quote: string;
  name: string;
  role: string;
  tag: string;
  date: string;
  points?: string; // Nectar points awarded, e.g. "+50"
};

export const recognition = {
  eyebrow: "recognition",
  heading: "The people I've shipped with, on the record.",
  intro:
    "Studio Graphene runs peer recognition through Nectar: colleagues post public shoutouts and award points. A selection below, from leadership to project leads, 2024 to 2026.",
  // Accent count-up strip. Keep these honest — see NOTE above.
  stats: [
    { num: 80, suffix: "+", label: "recognitions on Nectar" },
    { num: 25, suffix: "+", label: "colleagues who've recognised me" },
    { num: 3, suffix: " yrs", label: "a 2024–26 track record" },
  ],
  // The featured shoutout: manager-level, sets the tone.
  lead: {
    quote:
      "Constantly pushing yourself to upskill and dive into the unknown. Your relentless curiosity and willingness to take smart risks to expand your knowledge inspire the whole team.",
    name: "Joao",
    role: "Manager, Studio Graphene",
    tag: "Upskilling",
    date: "Jul 2026",
    points: "+50",
  } as Shoutout,
  // Supporting shoutouts across CTO, leads and a PM.
  entries: [
    {
      quote:
        "Really commendable work. Thank you for turning things around so quickly and showing agility along the way. It's a pleasure working alongside you.",
      name: "Atul Sharma",
      role: "CTO, Studio Graphene",
      tag: "Form1",
      date: "Sep 2025",
    },
    {
      quote:
        "Thank you for helping fix the update-search frontend issue. It was a complex piece of logic, and I appreciate you stepping up to understand and resolve it so quickly.",
      name: "Harish",
      role: "Lead, Form1",
      tag: "Form1",
      date: "Aug 2025",
      points: "+14",
    },
    {
      quote:
        "His work on Mimentor, which was also his first project, has been flawless. We haven't encountered any issues so far. Thank you for your outstanding work.",
      name: "Anand",
      role: "Lead, Mimentor",
      tag: "Mimentor",
      date: "May 2024",
      points: "+10",
    },
    {
      quote:
        "Making the Pulse platform responsive in addition to the current sprint plan. Balancing this alongside ongoing work takes extra effort.",
      name: "Arpit Arora",
      role: "PM, Pulse",
      tag: "Pulse",
      date: "Apr 2026",
      points: "+20",
    },
  ] as Shoutout[],
  footnote:
    "Every quote is a real Nectar shoutout from a colleague at Studio Graphene. Points are the recognition the platform awarded.",
};
