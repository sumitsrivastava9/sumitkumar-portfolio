// ============================================================
//  CONTENT: single source of truth for all on-page text.
//  Populated from Sumit's resume; every metric here is real and
//  defensible. Remaining TODOs: the flagship walkthrough video
//  (flagship.video.src) and confirming the "Growing" backend list.
// ============================================================

export const profile = {
  name: "Sumit",
  domainLabel: "sumit.dev",
  role: "Frontend Engineer",
  email: "sumkumar723@gmail.com",
  linkedin: "https://www.linkedin.com/in/sumit-frontend/",
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
  { key: "learner", label: "Learner", icon: "book", ready: false },
  { key: "friend", label: "Friend", icon: "smile", ready: false },
];

// ---- Hero ----
export const hero = {
  eyebrow: "for hiring managers",
  lineTop: "I build interfaces",
  lineBottomLead: "that ",
  lineBottomAccent: "ship.",
  subtitle:
    "Sole frontend engineer at a product studio. Three years shipping React, Next.js and TypeScript across 10+ live SaaS apps. Here's the proof, fast.",
};

// ---- Hero snapshot card (HIRING MANAGER) ----
// Sits on the gradient panel beside the headline so the facts land
// above the fold. Every value here is pulled from the resume.
export const heroSnapshot = {
  company: "", // shown as the header subtitle if set; "" keeps the role
  // Headshot in /public. Falls back to a clean monogram if missing.
  avatar: "/avatar.png",
  rows: [
    { label: "Experience", value: "3 yrs · React, Next.js, TS" },
    { label: "Currently", value: "Studio Graphene" },
    { label: "Based in", value: "Gurugram, IN" },
  ],
  availability: "Open to frontend roles", // shown with a live dot
};

// ---- Impact stats (HIRING MANAGER) ----
// All three are drawn straight from the resume and defensible in an
// interview. Keep it that way; fewer real stats beat more fluffy ones.
export const stats = [
  { value: "40", unit: "%", label: "faster feature delivery via a 50+ component design system" },
  { value: "0", unit: "critical bugs", label: "across every client production deployment" },
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

// ---- Secondary projects ----
export const moreWork = [
  { title: "AutoOrder AI", descriptor: "voice ordering · two-stage NLP · +40-55% completion →" },
  { title: "Real-time AI chat (SSE)", descriptor: "streaming · latency 800ms to 440ms →" },
];

// ---- Skills ----
export const skills = {
  core: {
    label: "Core · Frontend",
    note: "3 years, production scale",
    items: ["React", "Next.js", "TypeScript", "Redux Toolkit", "React Query", "Tailwind CSS", "Jest"],
  },
  growing: {
    label: "Growing · Backend & full-stack",
    note: "actively upskilling toward full stack",
    // NOTE: these specific backend techs are not on the resume. Confirm
    // you are genuinely learning them, or swap for what you actually use.
    items: ["Node.js", "Express", "PostgreSQL", "REST APIs"],
  },
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
