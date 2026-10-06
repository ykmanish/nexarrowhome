/**
 * Case studies. Until client projects can be shown (with permission), these
 * are concept projects: how we would approach a common problem, what we would
 * build, and the goal we design for. Every one is labelled as concept work on
 * the site, and the figures are design goals, not reported results.
 *
 * When a real project is ready, add it here with `concept: false` and a
 * `metric` that describes the measured result.
 *
 * `visual` names the illustration in components/site/visuals.jsx.
 */

export const conceptNote =
  "Concept work: how we would approach the problem, not a past client project. Figures are design goals.";

export const caseStudies = [
  {
    slug: "approval-workflow",
    concept: true,
    sector: "Operations",
    title: "Purchase approvals, out of email",
    summary: "One system for requests, approvals and the ERP, replacing an inbox and three spreadsheets.",
    problem:
      "Purchase requests travelled by email and spreadsheet. Nobody could see what was waiting on whom, and finance re-keyed every approved order into the ERP by hand.",
    built: [
      "One request form with role-based approval steps",
      "A full history of who approved what, and when",
      "Approved orders pushed straight into the ERP",
    ],
    metric: { value: "3 days → same day", label: "Design goal for approval turnaround" },
    stack: ["Next.js", "NestJS", "PostgreSQL", "ERP API"],
    visual: "flow",
    service: "software-development",
  },
  {
    slug: "clinic-assistant",
    concept: true,
    sector: "AI automation",
    title: "A front-desk assistant for a clinic",
    summary: "Answers routine patient questions from the clinic's own documents and hands the rest to staff.",
    problem:
      "Reception answered the same questions about hours, prices and preparation all day, while booking requests waited in a shared inbox.",
    built: [
      "An assistant that answers only from the clinic's own documents",
      "A hand-off to staff with the conversation attached",
      "Booking requests collected into one queue",
    ],
    metric: { value: "40%", label: "Design goal: routine questions answered without staff" },
    stack: ["LLM API", "Retrieval (RAG)", "Next.js", "PostgreSQL"],
    visual: "chat",
    service: "ai-solutions",
  },
  {
    slug: "saas-mvp",
    concept: true,
    sector: "SaaS MVP",
    title: "A subscription product, idea to first users",
    summary: "Accounts, billing and an admin dashboard: the smallest product customers can log into and pay for.",
    problem:
      "A founder had a validated idea and a spreadsheet prototype, and needed a product customers could sign up to, use and pay for.",
    built: [
      "Multi-tenant accounts with roles and invites",
      "Subscription billing with plan limits",
      "An admin dashboard with the numbers that matter",
    ],
    metric: { value: "8 weeks", label: "Planned path from agreed scope to first paying user" },
    stack: ["Next.js", "Stripe", "PostgreSQL", "AWS"],
    visual: "dashboard",
    service: "saas-platforms",
  },
];
