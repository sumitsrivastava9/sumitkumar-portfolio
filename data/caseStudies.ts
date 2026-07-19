// ============================================================
//  CASE STUDIES: one entry per page under /work/<slug>.
//  Pulse is the full write-up (built from the resume + the
//  already-approved copy in content.ts, same abstraction level:
//  no internal endpoints, repo names or client specifics).
//
//  The other two are deliberately short "briefs" that only state
//  facts taken from the resume. TODO(sumit): expand them with the
//  real story (marked inline) and verify every sentence before
//  going public. Do not add claims you can't defend in interview.
// ============================================================

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  accent: string;
  readTime: string;
  facts: { label: string; value: string }[];
  metrics: { value: string; label: string }[];
  sections: { heading: string; paragraphs: string[] }[];
  tags: string[];
  video?: { src: string; poster: string; durationLabel: string; caption: string };
  privacyNote?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "pulse",
    title: "Pulse: engineering analytics platform",
    subtitle:
      "Real-time dashboards plus a natural-language AI query layer over Jira and GitHub data",
    accent: "#D85A30",
    readTime: "4 min",
    facts: [
      { label: "Role", value: "Sole frontend engineer" },
      { label: "Status", value: "In production, used daily" },
      { label: "Stack", value: "React · Next.js · TypeScript · React Query" },
    ],
    metrics: [
      { value: "~50%", label: "fewer redundant API calls" },
      { value: "~45%", label: "fewer re-renders" },
      { value: "Daily", label: "use by delivery teams" },
    ],
    video: {
      src: "/walkthrough.mp4",
      poster: "/walkthrough-poster.jpg",
      durationLabel: "2:20",
      caption: "how I built it · behaviour only · data scrubbed",
    },
    privacyNote:
      "Built at Studio Graphene. Internal product, shown with permission and scrubbed data.",
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "Pulse is an engineering-analytics platform built at Studio Graphene. It pulls Jira and GitHub activity into live dashboards: delivery metrics, review health, sprint progress and per-project breakdowns that delivery teams check every day. I am the sole frontend engineer on the product.",
        ],
      },
      {
        heading: "The problem",
        paragraphs: [
          "As the data volume and the number of views grew, the frontend got slower exactly where people used it most. Moving between a metric and its breakdown re-fired API calls for data the app already had, and broadly shared state meant a change in one place re-rendered components that had nothing to do with it.",
          "There was a second, quieter problem: non-technical stakeholders couldn't self-serve. Getting a number out of Pulse meant asking an engineer to pull it.",
        ],
      },
      {
        heading: "Diagnosis",
        paragraphs: [
          "Profiling pointed at the data layer before the components. The query cache was tuned aggressively for freshness: very short staleness windows plus refetch-on-mount meant shared queries re-fetched on almost every navigation, even though the cache already held the answer. Once that pattern was visible, the re-render problem turned out to have the same shape: state was shared far more widely than it was actually read.",
        ],
      },
      {
        heading: "What I changed",
        paragraphs: [
          "I introduced per-query staleness windows matched to how often each kind of data actually changes. Reference data that changes rarely is now served from cache for minutes rather than milliseconds, so navigating between views stopped re-firing the same requests.",
          "On the render side, I split the widest contexts so each view subscribes only to the state it reads, and added targeted memoisation to the heaviest components. The rule I held to: make the cheap path the default path, and write down every exception.",
        ],
      },
      {
        heading: "Pulse AI",
        paragraphs: [
          "On top of the faster dashboard I built Pulse AI, a natural-language query layer over the same metrics. A project manager can ask for a metric in plain English and get the answer directly, instead of learning where it lives in the dashboard.",
        ],
      },
      {
        heading: "Tradeoffs",
        paragraphs: [
          "Caching and context splitting add real complexity. A staleness window is a product decision as much as a technical one: you are choosing how out-of-date each kind of data is allowed to be. Cache invalidation and a more fragmented state tree are genuinely harder to reason about than fetch-on-render. I accepted that overhead because the responsiveness gains were measurable and the dashboard is used every day.",
        ],
      },
      {
        heading: "Impact",
        paragraphs: [
          "Redundant API calls dropped by roughly half and re-renders by around 45%, so the dashboard stays responsive at the data volumes that used to hurt it. Pulse AI gave non-technical stakeholders self-serve access to project and developer insights without writing a single query.",
        ],
      },
      {
        heading: "Still on the list",
        paragraphs: [
          "Prefetching the breakdown a user is most likely to open next, request deduplication at the route level, and performance budgets in CI so regressions get caught before anyone feels them.",
        ],
      },
    ],
    tags: ["React", "Next.js", "TypeScript", "React Query", "Redux Toolkit"],
  },

  {
    // TODO(sumit): expand this brief into a full case study. Add: what
    // the two NLP stages actually are, what the UI had to solve, and
    // what the +40-55% range depends on. Verify every sentence.
    slug: "autoorder-ai",
    title: "AutoOrder AI",
    subtitle: "Voice ordering built around a two-stage NLP flow",
    accent: "#EF9F27",
    readTime: "1 min",
    facts: [
      { label: "Role", value: "Frontend engineer" },
      { label: "Result", value: "+40-55% order completion" },
    ],
    metrics: [{ value: "+40-55%", label: "order completion" }],
    sections: [
      {
        heading: "The short version",
        paragraphs: [
          "AutoOrder AI takes orders by voice. I built the ordering interface around its two-stage NLP flow, and order completion improved by 40 to 55%.",
        ],
      },
      {
        heading: "The problem",
        paragraphs: [
          "Completion rate is the metric a voice product lives or dies on. Every moment a user is unsure whether they were understood is a moment they can abandon the order.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "The frontend of the ordering flow: the interface that carries a customer from spoken input through both NLP stages to a confirmed order, with UI states that keep them oriented about what the system heard and what happens next.",
        ],
      },
    ],
    tags: ["React", "TypeScript", "Voice UI", "NLP integration"],
  },

  {
    // TODO(sumit): expand this brief. Add the hard parts you actually
    // solved (scroll behaviour, partial formatting, reconnects, error
    // states) and confirm exactly what the 800ms/440ms figures measure.
    slug: "realtime-ai-chat",
    title: "Real-time AI chat",
    subtitle: "Streaming responses over Server-Sent Events",
    accent: "#7F77DD",
    readTime: "1 min",
    facts: [
      { label: "Role", value: "Frontend engineer" },
      // "Time to first token", not total latency: SSE doesn't make the
      // model finish sooner, it makes the answer start appearing sooner.
      { label: "Result", value: "Time to first token 800ms to 440ms" },
    ],
    metrics: [{ value: "~440ms", label: "time to first token, down from ~800ms" }],
    sections: [
      {
        heading: "The short version",
        paragraphs: [
          "An AI chat that streams its answers over Server-Sent Events instead of waiting for the full completion. Time to first token dropped from around 800ms to around 440ms.",
        ],
      },
      {
        heading: "The problem",
        paragraphs: [
          "A chat that shows nothing until the whole answer arrives feels broken at exactly the moment the user is paying the most attention. The fix is not a faster model; it is not waiting for the model to finish.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "Delivery over SSE with incremental rendering on the client: tokens appear as they arrive, so the answer starts appearing as soon as the model starts producing it.",
        ],
      },
    ],
    tags: ["React", "TypeScript", "SSE", "Streaming UI"],
  },
];
