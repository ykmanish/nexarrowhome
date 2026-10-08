/**
 * The four service lines. Each entry carries both its summary (home, menus,
 * cards) and its full detail page, so a service is defined in one place.
 *
 * `code` is the short label used across the site, styled like a part number.
 * `visual` names the generated illustration in components/site/visuals.jsx.
 */

export const services = [
  {
    slug: "software-development",
    seo: {
      title: "Custom Software Development Services",
      description:
        "Custom and bespoke software development: web apps, internal tools, admin panels, APIs and integrations built around how your business works. Fixed price, weekly demos.",
      serviceType: "Custom software development",
      keywords: [
        "custom software development services",
        "bespoke software development",
        "web application development",
        "internal tools development",
        "API development and integration",
        "admin dashboard development",
        "business software development",
        "workflow automation software",
        "React and Node.js development",
      ],
    },
    code: "SWD-01",
    name: "Software Development",
    short: "Custom platforms and internal tools",
    copy: "Custom platforms, web apps, admin panels, APIs and internal tools built around real business workflows.",
    visual: "flow",
    tags: ["Web apps", "APIs", "Admin panels", "Integrations"],
    titleLines: ["Custom software", "for operational clarity."],
    subtitle:
      "We build software systems, platforms, dashboards and internal tools tailored to how your business actually works.",
    body: [
      "This service is for companies that need bespoke software built around their own workflows instead of being forced into generic tools that create friction.",
      "We handle product planning, frontend interfaces, backend systems, APIs, integrations and deployment, with a focus on maintainability and real-world usage.",
      "Whether the goal is streamlining operations, centralising data, improving reporting or enabling new digital services, the software is built for long-term business utility.",
    ],
    stack: [
      "React · Next.js · TypeScript",
      "Node.js · Express · NestJS",
      "PostgreSQL · MongoDB · Redis",
      "REST APIs · WebSockets · Integrations",
      "Auth · RBAC · Admin systems",
      "Docker · CI/CD · Cloud deployment",
    ],
    deliverables: [
      { title: "Discovery & scoping", copy: "Feature scope, technical direction, delivery plan and implementation priorities." },
      { title: "Production application", copy: "A working software product ready for real use and future expansion." },
      { title: "Backend architecture", copy: "APIs, services, data models, workflows and system logic." },
      { title: "Frontend experience", copy: "Usable, maintainable interfaces for business users, teams or customers." },
      { title: "Deployment setup", copy: "Configured environments, release process and operational readiness." },
      { title: "Handover support", copy: "Knowledge transfer, refinements and ongoing iteration support if needed." },
    ],
    process: [
      { t: "Discovery", c: "Understand the workflow, pain points, users and expected result." },
      { t: "Architecture", c: "Define structure, data flows, modules and delivery priorities." },
      { t: "Build foundation", c: "Set up the codebase, environments, core modules and scaffolding." },
      { t: "Implement", c: "Ship the main business flows, integrations and product interface." },
      { t: "Test & refine", c: "Improve usability, stability and production readiness." },
      { t: "Launch", c: "Deploy, observe, iterate and support the next stage of adoption." },
    ],
    outcome:
      "A tailored business platform that replaces fragmented manual workflows with one reliable operational system.",
  },
  {
    slug: "saas-platforms",
    seo: {
      title: "SaaS Development Services: MVP to Scale",
      description:
        "SaaS product development: multi-tenant architecture, subscription billing, dashboards, roles and onboarding, from a lean MVP to a platform that scales.",
      serviceType: "SaaS product development",
      keywords: [
        "SaaS development company",
        "SaaS product development",
        "SaaS MVP development",
        "multi-tenant SaaS architecture",
        "subscription billing integration",
        "B2B SaaS development",
        "SaaS dashboard development",
        "MVP development services",
      ],
    },
    code: "SAS-02",
    name: "SaaS Platforms",
    short: "Multi-tenant products that scale",
    copy: "Multi-tenant SaaS architecture, dashboards, user systems, billing flows and maintainable product foundations.",
    visual: "dashboard",
    tags: ["Multi-tenant", "Billing", "Dashboards", "Roles"],
    titleLines: ["SaaS platforms", "built for product growth."],
    subtitle:
      "We build SaaS products with strong product structure, maintainable interfaces, tenant-aware systems and room to grow.",
    body: [
      "This service suits founders and teams building subscription products, dashboards, customer portals or platform-based digital services.",
      "We treat SaaS as both a product and a system: user journeys, roles, onboarding, billing, permissions, analytics and maintainable architecture all matter together.",
      "The result is a product that is easier to release, easier to improve, and more stable as usage and feature depth increase.",
    ],
    stack: [
      "React · Next.js · TypeScript",
      "Design systems · Component libraries",
      "Billing flows · Tenant-aware logic",
      "Authentication · Roles · Permissions",
      "Analytics dashboards · Product UX",
      "Testing · CI/CD · Release workflows",
    ],
    deliverables: [
      { title: "Product architecture", copy: "A structured plan for modules, tenants, roles, billing and core workflows." },
      { title: "Frontend system", copy: "Reusable UI foundations for scalable feature development." },
      { title: "Dashboard experience", copy: "Clear product interfaces for users, admins and teams." },
      { title: "Account workflows", copy: "Onboarding, authentication, billing and settings foundations." },
      { title: "Admin capability", copy: "Management tools for support, operations and visibility." },
      { title: "Scale readiness", copy: "Code organisation and product structure for sustainable growth." },
    ],
    process: [
      { t: "Product mapping", c: "Clarify personas, product surface, permissions and core flows." },
      { t: "System planning", c: "Define the tenant model, feature boundaries and product layout." },
      { t: "Foundation setup", c: "Build reusable components and the product architecture." },
      { t: "Feature delivery", c: "Implement subscription, dashboard, settings and user workflows." },
      { t: "Stabilisation", c: "Refine UX, reliability and growth-related product concerns." },
      { t: "Release & support", c: "Launch the platform and improve it through real usage feedback." },
    ],
    outcome:
      "A scalable SaaS platform with structured billing, dashboards, user roles and maintainable product foundations.",
  },
  {
    slug: "cloud-infrastructure",
    seo: {
      title: "Cloud Infrastructure & DevOps Services",
      description:
        "Cloud infrastructure and DevOps: CI/CD pipelines, AWS and Cloudflare setup, environments, monitoring and scaling, with UK or EU hosting when your data must stay there.",
      serviceType: "Cloud infrastructure and DevOps",
      keywords: [
        "DevOps services",
        "cloud infrastructure services",
        "AWS consulting",
        "CI/CD pipeline setup",
        "cloud deployment services",
        "monitoring and observability",
        "Docker deployment",
        "GDPR-compliant cloud hosting",
      ],
    },
    code: "CLD-03",
    name: "Cloud Infrastructure",
    short: "Deployment, CI/CD and observability",
    copy: "Deployment, CI/CD, environments, scaling, observability and production support systems.",
    visual: "infra",
    tags: ["CI/CD", "Observability", "Scaling", "Environments"],
    titleLines: ["Cloud infrastructure", "built for reliability."],
    subtitle:
      "We design and implement cloud foundations that support performance, deployment confidence and operational visibility.",
    body: [
      "Infrastructure is not an afterthought. It directly affects release speed, uptime, observability, scaling and the day-to-day confidence of the product team.",
      "We define hosting strategy, environments, CI/CD, logging, monitoring and deployment processes: the practical setup stable production systems need.",
      "That covers custom software, SaaS products, APIs, AI services and internal business systems.",
    ],
    stack: [
      "AWS · Cloudflare · Vercel · Hetzner",
      "Docker · CI/CD · GitHub Actions",
      "Monitoring · Logging · Alerting",
      "Environment strategy · Secrets management",
      "Reverse proxies · Caching · CDN",
      "Scaling patterns · Reliability workflows",
    ],
    deliverables: [
      { title: "Cloud strategy", copy: "Recommended hosting and infrastructure setup based on the product’s needs." },
      { title: "Deployment pipelines", copy: "Automated release workflows for development, staging and production." },
      { title: "Operational setup", copy: "Monitoring, logs, health visibility and failure detection." },
      { title: "Environment management", copy: "Clear handling of secrets, configs, domains and dependencies." },
      { title: "Performance support", copy: "Caching, asset delivery, tuning and production optimisation." },
      { title: "Maintenance readiness", copy: "A setup that is easier to operate, support and extend over time." },
    ],
    process: [
      { t: "Assessment", c: "Review the application needs, risks and operational expectations." },
      { t: "Architecture", c: "Select providers, environments, networking and the deployment model." },
      { t: "Implementation", c: "Set up hosting, build pipelines, release flows and support tooling." },
      { t: "Visibility", c: "Add observability, logs, uptime checks and operational awareness." },
      { t: "Hardening", c: "Improve reliability, performance and deployment confidence." },
      { t: "Support", c: "Refine the setup as usage grows and product needs evolve." },
    ],
    outcome:
      "A production environment that supports repeatable releases, visibility into system health, and room for growth.",
  },
  {
    slug: "ai-solutions",
    seo: {
      title: "AI Development & Automation Services",
      description:
        "AI development and automation: AI assistants, RAG chatbots on your own documents, LLM integration and workflow automation, with guardrails and human review built in.",
      serviceType: "AI development and automation",
      keywords: [
        "AI development company",
        "AI automation services",
        "AI automation agency",
        "AI chatbot development",
        "RAG development",
        "LLM integration services",
        "generative AI development",
        "business process automation with AI",
        "AI consulting",
      ],
    },
    code: "AIS-04",
    name: "AI Solutions",
    short: "Assistants, retrieval and automation",
    copy: "Assistants, automation, retrieval systems and product features driven by practical AI implementation.",
    visual: "chat",
    tags: ["Assistants", "RAG", "Automation", "Guardrails"],
    titleLines: ["AI solutions that connect", "to real business workflows."],
    subtitle:
      "We build AI-enabled systems, assistants, automations and product features that reduce repetitive work and speed up decisions.",
    body: [
      "AI becomes useful when it fits into the work a business is already doing: summarisation, retrieval, internal assistants, workflow automation, content generation or support tooling.",
      "We focus on business-specific usefulness: what data the model should use, where it fits in the workflow, how accuracy is managed and how the experience is integrated into the product.",
      "It can be delivered as a standalone AI feature, an internal AI tool, or part of a larger software or SaaS platform.",
    ],
    stack: [
      "LLM APIs · Prompt workflows · RAG",
      "Embeddings · Vector search · Retrieval",
      "Chat interfaces · AI assistants",
      "Automation pipelines · Business workflows",
      "Node.js · Python · API integrations",
      "Monitoring · Guardrails · Human review",
    ],
    deliverables: [
      { title: "AI use-case design", copy: "A clear definition of where AI adds real value in the workflow." },
      { title: "Model integration", copy: "Connected AI behaviour inside your product, system or process." },
      { title: "Retrieval workflow", copy: "Context-aware responses using your own documents or data sources." },
      { title: "Automation logic", copy: "Task reduction through smart processing, routing and generation." },
      { title: "Interface layer", copy: "Usable AI experiences for teams, operators or end users." },
      { title: "Control framework", copy: "Review flows, prompt discipline and quality safeguards where needed." },
    ],
    process: [
      { t: "Use-case discovery", c: "Identify where AI can remove friction or improve throughput." },
      { t: "Data & context design", c: "Define knowledge sources, constraints and workflow boundaries." },
      { t: "Prototype", c: "Build a testable AI flow around the selected use-case." },
      { t: "Integration", c: "Embed the AI capability into the system, product or process." },
      { t: "Validation", c: "Review usefulness, reliability and user interaction patterns." },
      { t: "Iteration", c: "Improve prompts, retrieval, controls and production readiness." },
    ],
    outcome:
      "An AI-driven workflow that reduces repetitive effort while keeping business context and control intact.",
  },
];

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}

/** Typical builds — the kinds of systems we are asked for most. */
export const builds = [
  {
    title: "Workflow platforms",
    service: "software-development",
    sector: "Operations",
    summary: "Custom software that centralises approvals, records and team workflows in one place.",
    points: [
      "One system of record replacing spreadsheets and disconnected tools.",
      "Role-based approvals with a full history of who did what, and when.",
      "Integrations that keep finance, ERP and CRM data in sync.",
      "Reporting built on structured data instead of manual reconciliation.",
    ],
    tags: ["Software", "Cloud", "Integrations", "RBAC"],
  },
  {
    title: "SaaS products",
    service: "saas-platforms",
    sector: "Subscription product",
    summary: "Tenant-aware architecture, analytics and role-based access, ready to grow.",
  },
  {
    title: "AI assistants",
    service: "ai-solutions",
    sector: "Automation",
    summary: "Retrieval, summaries and smart actions that cut repetitive work.",
  },
  {
    title: "Cloud foundations",
    service: "cloud-infrastructure",
    sector: "Infrastructure",
    summary: "Pipelines, environments and observability your team can trust on release day.",
  },
];
