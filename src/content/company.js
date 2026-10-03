/**
 * Company-wide content. Pages and sections stay layout-only; every sentence a
 * visitor reads lives in src/content so copy changes never touch markup.
 */

export const company = {
  name: "Nexarrow OÜ",
  short: "Nexarrow",
  email: "hello@nexarrow.eu",
  registry: "17521430",
  vat: "EE102992676",
  city: "Tallinn, Estonia",
  region: "European Union",
  address: "Tornimäe tn 5, 10145 Tallinn, Estonia",
  activity: "62101 Computer programming activities",
  url: "https://nexarrow.eu",
};

/** The tools we ship with most — shown in the strip under the home hero. */
export const toolbelt = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Python",
  "LLM APIs",
  "RAG pipelines",
  "AWS",
  "Cloudflare",
  "Docker",
  "GitHub Actions",
];

export const problems = [
  {
    title: "Off-the-shelf tools rarely fit the way a team actually works",
    note: "Workflows get bent around the software instead of the other way round.",
  },
  {
    title: "Spreadsheets and manual steps quietly break as volume grows",
    note: "What held together at ten records a day stops holding at a thousand.",
  },
  {
    title: "Growing businesses need systems that keep adapting",
    note: "Requirements move, and the software has to move with them without a rewrite.",
  },
];

/**
 * The delivery path every engagement follows. `artifact` is what exists at the
 * end of the stage — the thing you can hold us to.
 */
export const deliveryPath = [
  {
    title: "Discovery",
    artifact: "Workflow map",
    copy: "We map the business model, the users, the constraints and the problem actually worth solving.",
  },
  {
    title: "Scope & plan",
    artifact: "Scope document",
    copy: "Scope, architecture direction, phases and measurable outcomes, all agreed before heavy build starts.",
  },
  {
    title: "Foundation",
    artifact: "Repo + CI",
    copy: "Codebase, environments and pipelines set up first, so every change is testable and deployable.",
  },
  {
    title: "Build in milestones",
    artifact: "Working demos",
    copy: "Progress shows up in the product, not in status reports. Each milestone is something you can use.",
  },
  {
    title: "Test & refine",
    artifact: "QA pass",
    copy: "Usability, stability and performance hardened against real data and real usage.",
  },
  {
    title: "Launch & improve",
    artifact: "Go-live",
    copy: "Deploy, observe, then keep iterating with fixes, optimisation, infrastructure and new features.",
  },
];

export const engagementTiers = [
  {
    name: "Project Build",
    price: "Custom",
    desc: "Fixed-scope or milestone-based delivery for software, SaaS, AI and cloud projects.",
    points: ["Defined scope and milestones", "Architecture and delivery plan", "Production-ready handover"],
  },
  {
    name: "Dedicated Support",
    price: "Monthly",
    desc: "Ongoing engineering capacity for feature development, maintenance and product iteration.",
    points: ["Continuous feature delivery", "Maintenance and monitoring", "Predictable monthly capacity"],
  },
  {
    name: "Technical Consulting",
    price: "Flexible",
    desc: "Architecture reviews, product discovery, AI strategy and infrastructure planning.",
    points: ["Architecture and code review", "AI and cloud strategy", "Roadmap and scoping support"],
  },
];

export const principles = [
  ["Clarity", "Clear requirements, transparent communication and practical execution."],
  ["Scalability", "Systems should stay understandable and extensible as the business grows."],
  ["Reliability", "Delivery is not complete until the product is stable in real usage."],
  ["Maintainability", "Code should be easy to improve, hand over and operate over time."],
  ["Relevance", "We build what supports the business, not what only impresses in demos."],
];

export const manifesto = [
  "We build for usefulness before vanity.",
  "We care about maintainability, not just launch speed.",
  "We prefer clear architecture over unnecessary complexity.",
  "We think AI should solve work, not just decorate interfaces.",
  "We treat cloud infrastructure as part of product quality.",
  "We value software that teams can actually operate.",
  "We focus on business outcomes, not feature volume alone.",
  "We document important decisions so products stay understandable.",
  "We work globally, but build with long-term responsibility.",
  "We believe good software should stay valuable after release.",
];

export const capabilities = [
  { area: "Software", what: "Custom business systems and operational platforms", note: "Built around real workflows" },
  { area: "SaaS", what: "Multi-tenant products and dashboard experiences", note: "Scalable product thinking" },
  { area: "AI", what: "Assistants, automation and model-backed product features", note: "Integrated into real use-cases" },
  { area: "Cloud", what: "Deployment, monitoring, scaling and platform setup", note: "Production-first infrastructure" },
  { area: "Frontend", what: "Fast, maintainable interfaces for product teams", note: "Usable systems at scale" },
  { area: "Backend", what: "APIs, services, data flows and internal platform logic", note: "Reliable operational layers" },
];

export const companyFacts = [
  { label: "Legal entity", value: company.name, detail: `Registry code ${company.registry}` },
  { label: "Tax", value: "EU VAT registered", detail: `VAT no. ${company.vat}` },
  { label: "Base", value: company.city, detail: company.address },
  { label: "Service area", value: "Worldwide clients", detail: "Remote-first delivery" },
  { label: "Activity", value: "Computer programming", detail: `EMTAK ${company.activity}` },
];

export const faqs = [
  ["What does Nexarrow do?", "Nexarrow builds custom software, SaaS platforms, AI-powered products, cloud infrastructure, APIs, admin dashboards and workflow-driven business systems tailored to real operational needs."],
  ["Who do you work with?", "Startups, SMEs, agencies, product teams and growing businesses that need dependable software execution or technical delivery support."],
  ["Can you work with our existing team?", "Yes. We can work as an extension of your in-house team, support founders directly, or take ownership of a specific product stream or feature set."],
  ["Do you handle deployment and infrastructure?", "Yes. CI/CD pipelines, cloud setup, environment management, observability and post-launch support, depending on the engagement."],
  ["Do you offer AI development services?", "Yes. Practical AI features such as assistants, automation workflows, retrieval systems, summarisation tools, chat interfaces and model-integrated business processes."],
  ["Can you take a project from idea to launch?", "Yes. We can take it from early discovery and architecture through development, testing, deployment and launch support."],
  ["Do you build MVPs?", "Yes. Lean, production-ready MVPs that validate an idea quickly without compromising on quality or the ability to scale."],
  ["Can you improve or rebuild an existing product?", "Often. Legacy modernisation, performance work, UI/UX refinement, architecture cleanup and feature expansion for existing systems."],
  ["How do you approach a new project?", "We start with the business goal, scope, users and technical constraints, then recommend the most effective product and delivery approach."],
  ["Do you provide support after launch?", "Yes. We offer maintenance, enhancements, bug fixes, monitoring and iterative development after launch."],
  ["How do you communicate during a project?", "Regular updates, milestone reviews and direct collaboration, so you always know progress, priorities and next steps."],
];
