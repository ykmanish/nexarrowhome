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
  /** The company's public entry, so anyone can check it is real. */
  registerUrl: "https://ariregister.rik.ee/eng/company/17521430",
  /** How fast every enquiry gets an answer. */
  reply: "within 24 hours",

  /* ── Fill these in. Empty values are simply left off the site. ── */
  /** The intro-call booking page; "Book a call" opens it as a Calendly popup. */
  booking: "https://calendly.com/manish-nexarrow/intro-call-with-nexarrow",
  /** Company page, e.g. "https://www.linkedin.com/company/nexarrow". */
  linkedin: "",
  /** e.g. "https://github.com/nexarrow". */
  github: "",
  /** A UK number in international format, e.g. "+44 20 1234 5678". */
  phone: "",
  /** Review profiles; each shows under "Verify us" once it has a link. */
  profiles: {
    clutch: "",
    goodfirms: "",
    trustpilot: "",
  },
};

/**
 * Where every "Book a call" goes: the calendar when one is set, otherwise the
 * booking block on the contact page.
 */
export const bookingHref = company.booking || "/contact#book";

/**
 * The founder, if named: added to the structured data search engines read,
 * and the LinkedIn profile to "Verify us" in the footer. Empty values are
 * left off.
 */
export const founder = {
  name: "",
  /** e.g. "https://www.linkedin.com/in/your-name". */
  linkedin: "",
};

/**
 * Real proof only. Each list stays empty, and its section stays off the site,
 * until there is something true to show.
 *
 * testimonials: { quote, name, role, company, href? }. Use the client's own
 *   words with their written permission; never write or edit a quote for them.
 * certifications: { name, detail, href }, e.g. { name: "Cyber Essentials",
 *   detail: "Certificate no. …", href: "<IASME verification link>" }.
 */
export const testimonials = [];
export const certifications = [];

/** The trust strip under the home hero: facts a buyer can check or hold us to. */
export const trustPoints = [
  { label: "EU company", value: `Reg. ${company.registry}`, href: company.registerUrl },
  { label: "VAT", value: company.vat },
  { label: "Ownership", value: "You own 100% of the code" },
  { label: "Progress", value: "Weekly demos" },
  { label: "Payment", value: "Milestone payments" },
  { label: "Response", value: `Reply ${company.reply}` },
];

/**
 * Working with UK and EU clients as a remote team behind an EU company: the
 * questions a cautious buyer asks, answered as commitments. Keep every line
 * true; change it here if how you work changes.
 */
export const crossBorder = [
  {
    title: "UK and EU GDPR",
    copy: "We work under EU GDPR, and under UK GDPR for UK clients. A data processing agreement is signed before we handle personal data, and any transfer outside the UK or EU is covered by Standard Contractual Clauses or the UK Addendum.",
  },
  {
    title: "Data where it must stay",
    copy: "Hosting in the region your data needs: London (AWS eu-west-2 or Azure UK South) for UK data, Frankfurt or Stockholm for EU data.",
  },
  {
    title: "Your working day",
    copy: "Calls and demos are booked in your business hours, UK, EU or US, and what you raise in your morning is usually picked up the same day.",
  },
  {
    title: "One point of contact",
    copy: "The founder runs every engagement directly. Scope, progress and questions go to the same person, from the first call to handover.",
  },
  {
    title: "Pounds, euros or dollars",
    copy: "Quotes and invoices in GBP, EUR or USD from our EU company, paid by bank transfer against agreed milestones.",
  },
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

/** The tools we ship with most — running along the bottom of the home hero. */
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

/**
 * "From scattered work to one system" on the home page: where the work lives
 * before, the three things we do with it, and what it runs on after.
 * Illustrative labels, not client results. `before` comes in pairs, one pair
 * per stage.
 */
export const oneSystem = {
  before: [
    "orders_final_v7.xlsx",
    "invoice_0423.pdf",
    "Re: Fwd: who approved this?",
    "Chasing sign-off on chat",
    "Copy-paste between tools",
    "Re-typing into the CRM",
  ],
  stages: ["Capture", "Route", "Automate"],
  after: [
    "Approvals that route themselves",
    "Live numbers, one dashboard",
    "AI clearing the busywork",
    "A self-serve customer portal",
    "Synced with the tools you keep",
  ],
};

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
 * The three kinds of teams most work comes from, each in its own words, with
 * what we do for it and where to read more. Photos are free-licence stock
 * (Unsplash).
 */
export const audiences = [
  {
    label: "Founders & startups",
    situation: "We have a validated idea and need a product people can sign up to and pay for.",
    help: "A lean MVP with accounts, billing and the one workflow that matters, demoed every week, with every line of code in your own repository.",
    link: { href: "/work/saas-mvp", label: "Read the SaaS MVP playbook" },
    photo: {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
      alt: "A small startup team working together around laptops at a shared table",
    },
  },
  {
    label: "Growing businesses",
    situation: "Our team runs on spreadsheets, email and tools that no longer fit the way we work.",
    help: "Internal tools and AI automation built around how your people actually work, connected to the systems you already use.",
    link: { href: "/work/approval-workflow", label: "Read the approvals playbook" },
    photo: {
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
      alt: "An office team at their desks working on computers",
    },
  },
  {
    label: "Agencies",
    situation: "Our clients want more development than our team has time for.",
    help: "White-label development under your brand, with an NDA by default and invoices from our EU company. Your client never needs to know.",
    link: { href: "/partners#agencies", label: "Partner with us" },
    photo: {
      src: "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?auto=format&fit=crop&w=1400&q=80",
      alt: "Two developers working on code at monitors in a bright office",
    },
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
  { label: "Delivery", value: "Remote-first", detail: "Clients in the UK, EU, US and India" },
  { label: "Activity", value: "Computer programming", detail: `EMTAK ${company.activity}` },
];

export const faqs = [
  ["What does Nexarrow do?", "Nexarrow builds custom software, SaaS platforms, AI-powered products, cloud infrastructure, APIs, admin dashboards and workflow-driven business systems tailored to real operational needs."],
  ["How much does a project cost?", "Every project is quoted after a short call, as a fixed price for an agreed scope. Most start with a small paid audit or pilot, credited in full if you continue."],
  ["Where is Nexarrow based?", `${company.name} is registered in ${company.city}, in the EU, and you contract and invoice with that company. We work remotely with clients in the UK, the European Union, the United States and India.`],
  ["How do time zones work?", "We work remotely and book calls and demos in your business hours, whether you are in the UK, the EU, the US or India. Requests raised in your morning are usually picked up the same day."],
  ["Do you work under UK GDPR?", "Yes. For UK clients we work under UK GDPR, and under EU GDPR for EU clients. We sign a data processing agreement before handling personal data, and any transfer outside the UK or EU is covered by the UK Addendum or EU Standard Contractual Clauses. Data can be hosted in London or the EU when it must stay there."],
  ["Who owns the code?", "You do. Work lives in your own repository from day one, and you own 100% of the code once it is paid for."],
  ["How do payments work?", "50% upfront on small projects and 40/40/20 milestones on larger ones, by bank transfer, in GBP, EUR or USD. Support is paid monthly in advance."],
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
