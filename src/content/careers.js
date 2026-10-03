/** Open roles. Each role has a detail page and an apply page under /careers. */

export const jobs = [
  {
    slug: "senior-frontend-engineer",
    team: "Engineering",
    title: "Senior Frontend Engineer",
    type: "Full-time / Contract",
    location: "Remote / India-friendly",
    accent: "lime",
    summary:
      "Build performant product interfaces, frontend architecture, and polished user experiences for SaaS and custom software products.",
    overview:
      "We are looking for a frontend engineer who can own interfaces end-to-end, from architecture and reusable components to UX detail and production readiness. You should be comfortable working with modern React stacks, product surfaces, API-connected systems, and collaborative delivery.",
    responsibilities: [
      "Build scalable frontend applications using React, Next.js, and TypeScript.",
      "Create reusable UI systems, component patterns, and maintainable frontend architecture.",
      "Work closely with backend, product, and design to turn requirements into production-ready flows.",
      "Improve performance, responsiveness, accessibility, and engineering quality across the interface layer.",
      "Review code, shape technical direction, and help maintain a strong delivery standard.",
    ],
    requirements: [
      "Strong experience with React, Next.js, TypeScript, and modern frontend tooling.",
      "Ability to structure larger codebases and build reusable component systems.",
      "Good understanding of API integration, state management, performance, and responsive UI.",
      "Experience shipping production applications and collaborating across teams.",
      "Clear communication and ownership mindset.",
    ],
    niceToHave: [
      "Experience with Tailwind CSS, Framer Motion, or animation systems.",
      "Experience in SaaS products, dashboards, or internal tools.",
      "Backend familiarity with Node.js or cloud deployment workflows.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "Frontend architecture"],
  },
  {
    slug: "backend-nodejs-engineer",
    team: "Engineering",
    title: "Backend Node.js Engineer",
    type: "Full-time / Contract",
    location: "Remote",
    accent: "sky",
    summary:
      "Design APIs, backend services, auth systems, business logic, and scalable application architecture for modern products.",
    overview:
      "This role is for engineers who can design backend foundations that stay understandable as features grow. You should be comfortable building APIs, working with databases, handling integrations, and supporting production systems.",
    responsibilities: [
      "Build backend services, APIs, and business logic using Node.js and TypeScript.",
      "Model data flows, authentication, permissions, and operational workflows.",
      "Integrate third-party services and maintain strong reliability in production.",
      "Support deployment, observability, and system quality with the broader engineering team.",
      "Document important technical decisions and improve maintainability over time.",
    ],
    requirements: [
      "Strong experience with Node.js, Express or NestJS, TypeScript, and backend architecture.",
      "Good understanding of databases, authentication, APIs, and integrations.",
      "Experience with production systems, debugging, and scalable backend design.",
      "Ability to work independently and reason clearly about trade-offs.",
    ],
    niceToHave: [
      "Experience with PostgreSQL, MongoDB, Redis, queues, or event-driven systems.",
      "Cloud experience with AWS, Docker, CI/CD, or monitoring tools.",
      "SaaS product or internal platform experience.",
    ],
    stack: ["Node.js", "TypeScript", "Express / NestJS", "PostgreSQL", "MongoDB", "Cloud APIs"],
  },
  {
    slug: "ai-integration-engineer",
    team: "AI",
    title: "AI Integration Engineer",
    type: "Full-time / Contract",
    location: "Remote",
    accent: "mist",
    summary:
      "Build AI-driven features, assistants, retrieval systems, automation workflows, and product integrations that solve actual business problems.",
    overview:
      "This role focuses on practical AI implementation inside products and internal systems. We are looking for someone who understands how to connect model capabilities to workflows, data, interfaces, and user experience in a responsible and useful way.",
    responsibilities: [
      "Design and implement AI-powered workflows, assistants, and product features.",
      "Work with retrieval systems, prompts, data context, and model-backed logic.",
      "Integrate LLM APIs into web products, internal platforms, or automation systems.",
      "Collaborate with product and engineering to define useful and controllable AI behavior.",
      "Help evaluate quality, safety, reliability, and business relevance of AI features.",
    ],
    requirements: [
      "Experience building with LLM APIs, retrieval systems, or workflow automation.",
      "Comfort with Node.js or Python for AI-related backend logic.",
      "Ability to evaluate AI usefulness in product or operational contexts.",
      "Strong problem-solving ability and practical implementation mindset.",
    ],
    niceToHave: [
      "Experience with vector search, embeddings, RAG pipelines, or agentic workflows.",
      "Experience building chat interfaces or internal AI tools.",
      "Experience with product analytics or human-in-the-loop systems.",
    ],
    stack: ["LLM APIs", "RAG", "Embeddings", "Node.js / Python", "Automation", "Product integration"],
  },
  {
    slug: "cloud-devops-engineer",
    team: "Cloud",
    title: "Cloud / DevOps Engineer",
    type: "Full-time / Contract",
    location: "Remote",
    accent: "sand",
    summary:
      "Own deployment, CI/CD, environments, reliability, observability, and cloud foundations for product teams shipping to production.",
    overview:
      "We are looking for an engineer who can design and improve deployment systems, cloud environments, monitoring, and production workflows. This role is important for delivery quality across software, SaaS, and AI-enabled products.",
    responsibilities: [
      "Build and maintain CI/CD pipelines and deployment workflows.",
      "Manage cloud environments, containers, infrastructure configuration, and release systems.",
      "Improve observability, uptime visibility, logging, and production support readiness.",
      "Work with application teams to improve scaling, stability, and environment clarity.",
      "Contribute to infrastructure decisions that reduce operational friction over time.",
    ],
    requirements: [
      "Hands-on experience with cloud deployment, DevOps, and production support.",
      "Strong understanding of Docker, CI/CD, environments, and release automation.",
      "Familiarity with observability, monitoring, and runtime troubleshooting.",
      "Ability to work across application and infrastructure concerns.",
    ],
    niceToHave: [
      "Experience with AWS, Cloudflare, Vercel, Hetzner, or similar platforms.",
      "Security awareness and experience hardening real production systems.",
      "Infrastructure-as-code experience.",
    ],
    stack: ["AWS / Cloudflare / Vercel", "Docker", "CI/CD", "Monitoring", "Infra setup", "Release systems"],
  },
];

export function getJob(slug) {
  return jobs.find((j) => j.slug === slug);
}
