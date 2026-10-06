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
  /** Where the engineering happens, said plainly everywhere location comes up. */
  engineering: "India",
  /** The company's public entry, so anyone can check it is real. */
  registerUrl: "https://ariregister.rik.ee/eng/company/17521430",
  /** How fast every enquiry gets an answer. */
  reply: "within 24 hours",

  /* ── Fill these in. Empty values are simply left off the site. ── */
  /** A 15-minute call link, e.g. "https://cal.com/your-name/15min". */
  booking: "",
  /** Company page, e.g. "https://www.linkedin.com/company/nexarrow". */
  linkedin: "",
  /** e.g. "https://github.com/nexarrow". */
  github: "",
};

/**
 * Where every "Book a call" goes: the calendar when one is set, otherwise the
 * booking block on the contact page.
 */
export const bookingHref = company.booking || "/contact#book";

/**
 * The founder, if named: added to the hero's last line ("engineering led
 * from India by …") and to the structured data search engines read. Empty
 * values are left off.
 */
export const founder = {
  name: "",
  /** e.g. "https://www.linkedin.com/in/your-name". */
  linkedin: "",
};

/** The trust strip under the home hero: facts a buyer can check or hold us to. */
export const trustPoints = [
  { label: "EU company", value: `Reg. ${company.registry}`, href: company.registerUrl },
  { label: "VAT", value: company.vat },
  { label: "Ownership", value: "You own 100% of the code" },
  { label: "Progress", value: "Weekly demos" },
  { label: "Payment", value: "Milestone payments" },
  { label: "Response", value: `Reply ${company.reply}` },
];

/** "How we keep you safe": one doubt each, removed before it comes up. */
export const safeguards = [
  {
    title: "A written contract",
    copy: "Scope, milestones and price agreed in writing before any work starts, signed digitally.",
  },
  {
    title: "NDA when you need it",
    copy: "We sign your NDA before you share anything sensitive. For agency work it is the default.",
  },
  {
    title: "Deposit and milestones",
    copy: "50% upfront on small projects, 40/40/20 on larger ones. You pay as working software arrives.",
  },
  {
    title: "Code in your repository",
    copy: "Work lands in your own GitHub from day one, and you own 100% of the code once it is paid for.",
  },
  {
    title: "Weekly demos",
    copy: "Every week you see working software on a staging link, not a status report.",
  },
  {
    title: `Replies ${company.reply}`,
    copy: "Every message answered within a day, and a short written summary after every call.",
  },
];

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

/**
 * The four offers. `price.key` points into content/pricing.js, which holds the
 * amount in each currency; list lines with a `price` show a range the same
 * way. The first offer is the small paid first step that makes saying yes
 * easy; its fee is credited to a full project.
 */
export const engagementTiers = [
  {
    name: "Technical Audit or Pilot",
    tag: "Start here",
    price: { key: "audit" },
    unit: "fixed price",
    desc: "3–5 days. A code, speed or AI-readiness review with a written plan, or one small feature built end to end.",
    points: ["Written plan you keep", "Delivered in 3–5 days", "Fully credited if you continue"],
    cta: "Book an audit",
  },
  {
    name: "Project Build",
    tag: "Main build",
    price: { key: "build", from: true },
    unit: "fixed scope",
    desc: "Fixed scope, milestone payments and a demo every week, from discovery to launch.",
    points: [
      { text: "Websites & automations", price: "buildWeb" },
      { text: "MVPs & SaaS", price: "buildMvp" },
      "Milestone payments",
    ],
    cta: "Discuss a build",
  },
  {
    name: "Dedicated Support",
    tag: "Ongoing",
    price: { key: "support", from: true },
    unit: "per month",
    desc: "Maintenance, monitoring and a set number of engineering hours each month. Offered at every handover.",
    points: ["Set hours every month", "Monitoring and fixes", "Paid monthly in advance"],
    cta: "Ask about support",
  },
  {
    name: "White-label Development",
    tag: "For agencies",
    price: { key: "whiteLabel", from: true },
    unit: "per hour",
    desc: "We build under your agency's brand, for your client, invoiced from our EU company.",
    points: ["Your brand, your client", "NDA by default", "A small first task to test us"],
    cta: "Talk partnership",
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
  { label: "Registered office", value: company.city, detail: company.address },
  { label: "Engineering", value: `Led from ${company.engineering}`, detail: "Remote-first delivery to clients worldwide" },
  { label: "Activity", value: "Computer programming", detail: `EMTAK ${company.activity}` },
];

export const faqs = [
  ["What does Nexarrow do?", "Nexarrow builds custom software, SaaS platforms, AI-powered products, cloud infrastructure, APIs, admin dashboards and workflow-driven business systems tailored to real operational needs."],
  ["How much does a project cost?", "Most work starts with a small paid Technical Audit or Pilot, credited in full if you continue. Starting prices for every offer are listed under Offers & prices, in euros, dollars, pounds or rupees."],
  ["Where is Nexarrow based?", `${company.name} is registered in ${company.city}, in the EU, and you contract and invoice with that company. Engineering is led from ${company.engineering}, and we work remotely with clients worldwide.`],
  ["Who owns the code?", "You do. Work lives in your own repository from day one, and you own 100% of the code once it is paid for."],
  ["How do payments work?", "50% upfront on small projects and 40/40/20 milestones on larger ones. Support is paid monthly in advance. We quote in euros, US dollars, pounds, or rupees for businesses in India."],
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
