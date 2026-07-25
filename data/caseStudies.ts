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
  liveUrl?: string;
  image?: { src: string; alt: string; caption?: string };
  images?: { src: string; alt: string; label?: string }[];
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
    slug: "mealpilot",
    title: "MealPilot: food ordering with an AI assistant",
    subtitle:
      "A full food-ordering app with a natural-language dish assistant grounded in the live menu",
    accent: "#FF6B35",
    readTime: "4 min",
    facts: [
      { label: "Role", value: "Sole engineer (personal project)" },
      { label: "Status", value: "Live · demo at mealpilot-murex.vercel.app" },
      { label: "Stack", value: "Next.js · TypeScript · Redux Toolkit · Claude API" },
    ],
    metrics: [
      { value: "0", label: "hallucinated dishes reach the cart" },
      { value: "£0", label: "API cost on the public demo" },
      { value: "Live", label: "deployed on Vercel" },
    ],
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "MealPilot is a personal project: a food-ordering web app with a built-in AI ordering assistant. You browse restaurants pulled from Swiggy's live API, add dishes to a cart, and — instead of scrolling — you can describe what you feel like eating in plain English and the assistant suggests real dishes from that restaurant's menu. One click adds them to the cart.",
          "I built it to demonstrate two things together: a polished, production-quality frontend and an AI feature integrated in a way I can fully explain and defend. The backend and AI layer are deliberately small — chosen for clarity, not for show.",
        ],
      },
      {
        heading: "The problem",
        paragraphs: [
          "Classic food-delivery apps require users to scroll through long menus to find something that fits their mood. That friction is a dead end for indecisive or time-poor users.",
          "The second problem is reliability. Swiggy's API is unofficial and throttles aggressively. An app that depends on it entirely goes blank in a demo. The AI adds its own failure mode: a model that invents dishes is worse than no assistant at all.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "The full ordering flow: a home page that lists restaurants with shimmer loading while the API responds, a menu page with veg/non-veg markers and tags, and a cart where the ADD button turns into a quantity stepper (minus, number, plus) and a drawer shows the running total. Redux Toolkit holds the cart in one shared place so the menu, the header badge, the drawer, and the AI suggestions all read the same state.",
          "On top of that, the AI assistant: a text input where you describe what you want. The browser sends the message and the current menu to a Next.js server route, which asks Claude to suggest dishes and return their IDs in a structured JSON shape. The route validates every ID against the real menu before anything reaches the screen. A dish the model invented cannot enter the cart.",
        ],
      },
      {
        heading: "Key technical decisions",
        paragraphs: [
          "The menu goes directly into the prompt rather than into a vector database. For a single restaurant's menu that is not over-engineering avoidance — it is the right fit. The context window is large enough, the menu is small, and retrieval would add latency and complexity with no real benefit at this scale.",
          "The API key lives only inside the Next.js server route, read from an environment variable. It is never sent to the browser. That single route is the only reason a server exists in this app.",
          "Swiggy's API is proxied through a Next.js rewrite so the browser never hits it directly and CORS is bypassed at the server layer. A local fallback dataset means the app keeps working in a demo if Swiggy throttles the request — the real restaurant name is preserved and a matching sample menu is shown instead.",
          "The public Vercel deploy runs a free rule-based fallback in place of the real AI: it reads signals from the request (veg or non-veg, a price ceiling, words like spicy or bestseller) and filters the menu directly. No API key is needed, no one can run up a bill, and the feature is clearly labelled as demo mode in the UI.",
        ],
      },
      {
        heading: "Tradeoffs",
        paragraphs: [
          "Putting the menu in the prompt is simple but has a ceiling. If the menu grew large — many categories, hundreds of dishes — the prompt would get expensive and the model's attention would spread thin. At that point the right move is retrieval: embed the menu, store it in a vector index, and retrieve the relevant slice per query. I chose not to build that here because it would be the right answer to a problem this app does not have.",
          "Demo mode is genuinely less capable than the real assistant. It catches structured signals well but misses free-form phrasing. I accepted that gap because the alternative — shipping a key that anyone can exhaust — is worse.",
        ],
      },
      {
        heading: "Impact",
        paragraphs: [
          "The app is live, the AI assistant never surfaces a dish that does not exist, and the public demo costs nothing to run. I also wrote a small evaluation script — about a dozen labelled requests, each with a verifiable rule — that checks whether the suggestions satisfy the stated constraint and prints an accuracy score. That gives me a repeatable way to test prompt changes without guessing.",
        ],
      },
      {
        heading: "What I would do next",
        paragraphs: [
          "User accounts and a real database for orders, real payment integration in test mode, streaming the AI reply token by token instead of waiting for the full response, voice input, and — when the menu outgrows the prompt — a proper retrieval layer with embeddings and vector search.",
        ],
      },
    ],
    tags: ["Next.js", "TypeScript", "Redux Toolkit", "Claude API", "Tailwind CSS"],
    liveUrl: "https://mealpilot-murex.vercel.app/",
    images: [
      {
        src: "/1stmealpilot.png",
        alt: "MealPilot — restaurant listing with search",
        label: "Restaurant listing",
      },
      {
        src: "/2ndMealPilot.png",
        alt: "MealPilot — menu page with AI ordering assistant",
        label: "AI ordering assistant",
      },
    ],
  },

];
