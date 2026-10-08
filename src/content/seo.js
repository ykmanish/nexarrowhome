/**
 * Search copy: the titles, descriptions and keywords search engines and
 * share cards show, and the markets the site is written for. Pages read their
 * entry from `pageSeo`; services, playbooks and insights carry their own
 * `seo` next to the rest of their content.
 *
 * Titles stay under ~60 characters with the " | Nexarrow" suffix the root
 * layout adds, descriptions around 150–160. Keywords are a short, honest
 * list per page: Google ignores the keywords tag, so what ranks is the same
 * words appearing naturally in the titles, headings and copy.
 */

/**
 * Where our buyers are. `hreflang` marks the English the site is written for
 * in each market; there is one English site, so every variant points at the
 * same URL and `x-default` catches everyone else.
 */
export const markets = [
  { name: "United Kingdom", short: "UK", hreflang: "en-GB", schema: { "@type": "Country", name: "United Kingdom" } },
  { name: "European Union", short: "Europe", hreflang: "en-IE", schema: { "@type": "Place", name: "European Union" } },
  { name: "United States", short: "US", hreflang: "en-US", schema: { "@type": "Country", name: "United States" } },
  { name: "India", short: "India", hreflang: "en-IN", schema: { "@type": "Country", name: "India" } },
];

/** "the UK, Europe, the US and India", for running copy. */
export const marketsLine = "the UK, Europe, the US and India";

/**
 * Search console ownership codes. Paste the `content` value of each verification
 * meta tag (not the whole tag); empty ones are left off the site.
 * Google: search.google.com/search-console · Bing (also feeds DuckDuckGo,
 * Yahoo and ChatGPT search): bing.com/webmasters · Yandex: webmaster.yandex.com
 */
export const verification = {
  google: "",
  bing: "",
  yandex: "",
};

/** Open Graph locales: the primary one, then the rest of our markets. */
export const ogLocale = "en_GB";
export const ogAlternateLocales = ["en_US", "en_IN", "en_IE"];

/** The topics the company is known for, used in structured data. */
export const expertise = [
  "Custom software development",
  "Bespoke software development",
  "SaaS product development",
  "AI automation",
  "AI assistants and chatbots",
  "Retrieval-augmented generation (RAG)",
  "LLM integration",
  "Business process automation",
  "Workflow automation",
  "Web application development",
  "API development and integration",
  "Cloud infrastructure",
  "DevOps and CI/CD",
  "MVP development",
];

/** Added to every page's keywords, after the page's own. */
export const siteKeywords = [
  "Nexarrow",
  "custom software development company",
  "AI automation company",
  "software development company Europe",
  "software development company UK",
  "software development company USA",
  "software development company India",
  "EU software development company",
];

/**
 * The static pages. `og` is the short label over the title on the page's
 * share image.
 */
export const pageSeo = {
  home: {
    title: "Custom Software Development & AI Automation | Nexarrow",
    description:
      `EU-registered custom software and AI automation company for teams in ${marketsLine}. Fixed prices, weekly demos, and you own the code.`,
    og: "Software · SaaS · AI · Cloud",
    ogTitle: "Custom software and AI automation for growing teams.",
    keywords: [
      "custom software development",
      "bespoke software development",
      "AI automation agency",
      "AI development company",
      "SaaS development company",
      "business process automation",
      "MVP development company",
      "fixed price software development",
      "outsourced software development",
      "web application development",
    ],
  },
  services: {
    title: "Software, SaaS, Cloud & AI Development Services",
    description:
      `Custom software development, SaaS platforms, cloud infrastructure and AI solutions, delivered end to end by one team for clients in ${marketsLine}.`,
    og: "Services",
    ogTitle: "Software, SaaS, cloud and AI, delivered by one team.",
    keywords: [
      "software development services",
      "custom software development services",
      "SaaS development services",
      "AI development services",
      "cloud and DevOps services",
      "end-to-end software development",
      "full-stack development company",
    ],
  },
  approach: {
    title: "How We Work: Fixed-Price, Milestone-Based Delivery",
    description:
      "How Nexarrow builds software: ten principles, a six-stage path from discovery to launch, weekly demos, milestone payments and engagement models that fit your stage.",
    og: "Approach",
    ogTitle: "Fixed prices, weekly demos, milestone payments.",
    keywords: [
      "fixed price software development",
      "software development process",
      "milestone-based software development",
      "agile software development company",
      "dedicated development team",
      "software development engagement models",
    ],
  },
  about: {
    title: "About Us: EU-Registered Software Development Company",
    description:
      `Nexarrow OÜ is a software company registered in Tallinn, Estonia (EU), building custom software and AI automation for teams in ${marketsLine}.`,
    og: "About",
    ogTitle: "An EU-registered software company, working across borders.",
    keywords: [
      "EU-registered software company",
      "Estonian software development company",
      "software company Tallinn",
      "remote software development team",
      "software development partner",
    ],
  },
  work: {
    title: "Software & AI Project Playbooks",
    description:
      "How we approach approval workflows, AI assistants, SaaS MVPs, customer portals and cloud release pipelines: scope, build plan, timeline and payments, chapter by chapter.",
    og: "Playbooks",
    ogTitle: "How we build it, chapter by chapter.",
    keywords: [
      "software development playbooks",
      "workflow automation examples",
      "AI assistant implementation",
      "SaaS MVP development plan",
      "customer portal development",
    ],
  },
  insights: {
    title: "Insights on Custom Software, SaaS, AI & Cloud",
    description:
      "Notes on custom software, SaaS, AI automation and cloud infrastructure decisions, written from delivery experience rather than theory.",
    og: "Insights",
    ogTitle: "Notes from delivery, not theory.",
    keywords: [
      "custom software insights",
      "SaaS development blog",
      "AI automation articles",
      "cloud infrastructure best practices",
      "software engineering for business",
    ],
  },
  contact: {
    title: "Contact Us: Book an Intro Call",
    description:
      "Book an intro call or send a brief. We reply within 24 hours with a direction, scope and price. Calls in UK, Europe, US and India business hours.",
    og: "Contact",
    ogTitle: "Tell us the problem. We reply within 24 hours.",
    keywords: [
      "hire software developers",
      "software development quote",
      "contact software development company",
      "book a software consultation",
    ],
  },
  partners: {
    title: "Partner Network: White-Label Development for Agencies",
    description:
      "Freelance engineers and designers, and agencies that need a white-label development team: how to partner with Nexarrow on software, SaaS, cloud and AI projects.",
    og: "Partner network",
    ogTitle: "White-label development, and a network for freelancers.",
    keywords: [
      "white label development agency",
      "white label software development",
      "development partner for agencies",
      "freelance software developers network",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    description: "How Nexarrow OÜ collects, uses, stores and protects personal data under the EU and UK GDPR.",
    og: "Legal",
    ogTitle: "Privacy Policy",
    keywords: [],
  },
  terms: {
    title: "Terms & Conditions",
    description: "The terms that govern use of the Nexarrow website.",
    og: "Legal",
    ogTitle: "Terms & Conditions",
    keywords: [],
  },
};
