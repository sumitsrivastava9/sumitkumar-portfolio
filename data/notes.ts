// ============================================================
//  BUILD NOTES: short, decision-first write-ups of real work.
//  Every claim here is drawn from work already documented in
//  data/caseStudies.ts (Pulse, MealPilot) and is defensible in an
//  interview. TODO(sumit): these are grounded starting drafts in a
//  neutral voice — pass over them in your own voice, and add a third
//  note (the light-theme-into-a-dark-first-design-system story) once
//  you want it. Do not add specifics you can't defend.
// ============================================================

export type Note = {
  slug: string;
  title: string;
  dek: string;
  readTime: string;
  tags: string[];
  accent: string;
  sections: { heading: string; paragraphs: string[] }[];
  relatedCaseStudy?: { slug: string; label: string };
};

export const notes: Note[] = [
  {
    slug: "killing-redundant-api-calls",
    title: "Killing redundant API calls in a live dashboard",
    dek: "The same navigation kept re-fetching data the app already had. The fix was a product decision disguised as a caching one.",
    readTime: "4 min",
    accent: "#D85A30",
    tags: ["React Query", "Performance", "Caching"],
    relatedCaseStudy: { slug: "pulse", label: "Read the Pulse case study" },
    sections: [
      {
        heading: "The symptom",
        paragraphs: [
          "On Pulse, our engineering-analytics dashboard, moving between a metric and its breakdown felt slow exactly where people used it most. The data had not changed, the view had, and yet the app went back to the network every time.",
        ],
      },
      {
        heading: "The root cause",
        paragraphs: [
          "Profiling pointed at the data layer before the components. The query cache was tuned aggressively for freshness: very short staleness windows plus refetch-on-mount meant shared queries re-fetched on almost every navigation, even though the cache already held a perfectly good answer.",
          "The lesson I took: \"stale\" is not a technical default, it is a product decision. Tuning everything for maximum freshness quietly means tuning everything for maximum cost.",
        ],
      },
      {
        heading: "The fix",
        paragraphs: [
          "I gave each kind of data a staleness window matched to how often it actually changes. Reference data that changes rarely is now served from cache for minutes rather than milliseconds, so navigating between views stopped re-firing the same requests. Redundant calls dropped by roughly half.",
          "The rule I held to: make the cheap path the default path, and write down every exception.",
        ],
      },
      {
        heading: "The trade-off",
        paragraphs: [
          "Caching moves you from \"always right, always slow\" to \"deliberately, briefly out of date.\" Cache invalidation is genuinely harder to reason about than fetch-on-render, so this only paid off because the dashboard is used every day and the staleness windows were chosen, not guessed.",
        ],
      },
      {
        heading: "What I would do differently",
        paragraphs: [
          "Add request deduplication at the route level and prefetch the breakdown a user is most likely to open next, so the first navigation is fast too, not just the repeats. And put a performance budget in CI, so a regression gets caught before anyone feels it.",
        ],
      },
    ],
  },
  {
    slug: "grounding-an-llm",
    title: "Grounding an LLM so it can't invent a menu item",
    dek: "A model that hallucinates a dish is worse than no assistant at all. The guardrail is boring on purpose.",
    readTime: "4 min",
    accent: "#FF6B35",
    tags: ["Claude API", "LLMs", "Validation"],
    relatedCaseStudy: { slug: "mealpilot", label: "Read the MealPilot case study" },
    sections: [
      {
        heading: "The failure mode",
        paragraphs: [
          "MealPilot lets you describe what you feel like eating and suggests real dishes from the restaurant's live menu. The obvious risk with any LLM feature here is not latency or cost, it is confidence: a model that invents a dish that isn't on the menu is worse than no assistant at all, because it breaks trust at the exact moment the user is about to act.",
        ],
      },
      {
        heading: "The guardrail",
        paragraphs: [
          "The browser sends the message and the current menu to a Next.js server route, which asks Claude to suggest dishes and return their IDs in a structured JSON shape. The route then validates every ID against the real menu before anything reaches the screen. A dish the model invented simply cannot enter the cart, because the ID does not exist.",
          "The interesting part is where the trust boundary sits: I do not trust the model's output, I trust the menu. The model proposes; the data disposes.",
        ],
      },
      {
        heading: "Why no vector database",
        paragraphs: [
          "For a single restaurant's menu, the whole menu goes straight into the prompt rather than into a vector store. The context window is large enough, the menu is small, and retrieval would add latency and complexity to solve a problem this app does not have. Reaching for embeddings here would have been the right answer to the wrong question.",
        ],
      },
      {
        heading: "Measuring it, not vibing it",
        paragraphs: [
          "I wrote a small evaluation script: about a dozen labelled requests, each with a verifiable rule (a price ceiling, veg-only, a cuisine), that checks whether the suggestions satisfy the stated constraint and prints an accuracy score. It gives me a repeatable way to test a prompt change instead of eyeballing a few examples and hoping.",
        ],
      },
      {
        heading: "What I would do differently",
        paragraphs: [
          "Stream the reply token by token so it feels instant, and grow the eval set as real phrasings surface. And when a menu eventually outgrows the prompt, that is the moment retrieval earns its place, not before.",
        ],
      },
    ],
  },
];
