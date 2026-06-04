'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────── themes ─────────────────────────── */

const themes = {
  light: {
    paper: "#FAF8F3",
    paperAlt: "#F3EEE6",
    card: "#FFFFFF",
    cardSoft: "#F7F2EA",
    ink: "#0E0E0E",
    inkSoft: "#2A2A2A",
    muted: "#6B6B66",
    line: "rgba(17,16,16,0.08)",
    lineStrong: "rgba(17,16,16,0.14)",
    surfaceDark: "#0E0E0E",
    surfaceDarkSoft: "#171717",
    white: "#FFFFFF",
  },
  dark: {
    paper: "#050505",
    paperAlt: "#0A0A0A",
    card: "#101010",
    cardSoft: "#161616",
    ink: "#F5F5F2",
    inkSoft: "#E7E3DA",
    muted: "#A2A2A2",
    line: "rgba(255,255,255,0.07)",
    lineStrong: "rgba(255,255,255,0.12)",
    surfaceDark: "#000000",
    surfaceDarkSoft: "#0B0B0B",
    white: "#FFFFFF",
  },
};

const ui = {
  sans: { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" },
  display: { fontFamily: "'Inter Tight', system-ui, sans-serif" },
  serif: { fontFamily: "'Instrument Serif', Georgia, serif" },
  mono: { fontFamily: "'JetBrains Mono', ui-monospace, monospace" },
};

const accents = {
  mint: "#B9F0DC",
  ink: "#111111",
  lilac: "#D9B8F7",
  lemon: "#E9F58A",
  blush: "#F7C8C3",
  sky: "#BBD8F2",
  peach: "#F3D4AF",
};

/* ─────────────────────────── data ─────────────────────────── */

const jobs = [
  {
    slug: "senior-frontend-engineer",
    team: "Engineering",
    title: "Senior Frontend Engineer",
    type: "Full-time / Contract",
    location: "Remote / India-friendly",
    accent: accents.mint,
    summary:
      "Build performant product interfaces, frontend architecture, and polished user experiences for SaaS and custom software products.",
    overview:
      "We are looking for a frontend engineer who can own interfaces end-to-end — from architecture and reusable components to UX detail and production readiness. You should be comfortable working with modern React stacks, product surfaces, API-connected systems, and collaborative delivery.",
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
    accent: accents.sky,
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
    accent: accents.lilac,
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
    accent: accents.lemon,
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

const insights = [
  {
    slug: "custom-software-vs-forced-tools",
    tag: "Insight",
    date: "May 2026",
    read: "6 min",
    title: "When custom software is a better investment than forcing tools to fit.",
    excerpt:
      "A practical look at the moment when spreadsheets, disconnected SaaS tools, and manual workarounds begin costing more than building the right internal system.",
    accent: accents.mint,
    hero: "grid",
    content: [
      {
        h: "The problem usually starts as operational friction",
        p: [
          "Many businesses do not decide to build software because they want software. They decide to build because existing tools no longer fit the way work actually happens.",
          "The friction often appears quietly at first: duplicated entries, repeated approvals, broken handoffs, scattered reporting, and growing dependence on manual coordination.",
          "At a certain point, the cost is no longer the monthly tool subscription. The cost becomes delay, inconsistency, and lost visibility."
        ],
      },
      {
        h: "A patchwork stack hides the real cost",
        p: [
          "Teams often keep adding tools as each new problem appears. One system handles records, another handles support, another manages approvals, and a spreadsheet bridges the gaps.",
          "That stack can look affordable on paper, but the hidden cost appears in workarounds, training complexity, fragmented data, and manager time spent reconciling information.",
          "Custom software becomes a rational option when those hidden costs start affecting revenue, service quality, or execution speed."
        ],
      },
      {
        h: "Good custom software is workflow-specific",
        p: [
          "The best internal software is not a generic dashboard with labels changed. It is designed around the exact sequence of decisions, users, exceptions, and dependencies inside the business.",
          "That means the value is not just in having a prettier interface. The value comes from removing repeated effort, reducing ambiguity, and creating a clearer operational system.",
          "When built well, custom software becomes infrastructure for how the business runs."
        ],
      },
    ],
  },
  {
    slug: "ai-features-connected-to-operations",
    tag: "AI",
    date: "Apr 2026",
    read: "5 min",
    title: "How AI features become valuable only when connected to actual operations.",
    excerpt:
      "Why AI is most useful when it is embedded into business workflows, context, approvals, and action paths instead of staying as an isolated demo feature.",
    accent: accents.lilac,
    hero: "orbits",
    content: [
      {
        h: "Novelty is easy, usefulness is harder",
        p: [
          "It is relatively easy to add an AI box to a product. It is much harder to make that AI useful inside the real work people are trying to complete.",
          "A generic chatbot may look impressive in a demo, but if it does not connect to documents, records, systems, and actions, it remains separate from operations.",
          "The strongest AI features shorten work, improve context, and help users move to the next action with less friction."
        ],
      },
      {
        h: "Context is the difference",
        p: [
          "An AI feature becomes more valuable when it understands the user’s environment: relevant documents, role permissions, workflow state, customer history, or product data.",
          "That context does not appear automatically. It has to be designed through retrieval, system integration, careful prompts, and boundaries around what the model should do.",
          "Without that work, the AI may answer fluently but remain operationally weak."
        ],
      },
      {
        h: "Integration matters more than theatrics",
        p: [
          "Useful AI is often quiet. It drafts, summarizes, recommends, routes, or retrieves in ways that save time without demanding attention.",
          "The best implementations reduce repetitive effort while still preserving review, control, and accountability where needed.",
          "That is why AI should be treated as part of product design and systems architecture, not only as a surface-level feature."
        ],
      },
    ],
  },
  {
    slug: "infrastructure-decisions-reduce-friction",
    tag: "Cloud",
    date: "Mar 2026",
    read: "7 min",
    title: "Infrastructure decisions that reduce friction later in the product lifecycle.",
    excerpt:
      "Deployment, observability, environment structure, and release discipline often decide whether a growing product becomes easier or harder to operate.",
    accent: accents.lemon,
    hero: "steps",
    content: [
      {
        h: "Infrastructure is part of product quality",
        p: [
          "Teams sometimes treat infrastructure as a later-stage concern, but release confidence, debugging speed, uptime visibility, and environment clarity all shape product quality from the start.",
          "When those systems are weak, even strong application code becomes harder to trust and harder to maintain.",
          "A product that cannot be released cleanly or monitored properly will eventually slow down its own roadmap."
        ],
      },
      {
        h: "Operational clarity compounds over time",
        p: [
          "A clear deployment pipeline, reliable staging environment, structured logs, and visible runtime alerts save time every week, not just during incidents.",
          "They also reduce the mental load on developers because the path from code change to production result becomes easier to understand.",
          "That operational clarity tends to compound as products grow in complexity."
        ],
      },
      {
        h: "Good infrastructure lowers business risk",
        p: [
          "Better infrastructure is not only a technical preference. It lowers delivery risk, shortens issue resolution time, and improves trust in the product.",
          "Businesses feel that impact in missed deadlines, incident handling, and customer experience.",
          "That is why cloud and DevOps choices should be made as part of product planning, not treated as maintenance tasks alone."
        ],
      },
    ],
  },
  {
    slug: "building-saas-for-maintainability",
    tag: "SaaS",
    date: "Feb 2026",
    read: "5 min",
    title: "Building SaaS products that stay maintainable after feature growth.",
    excerpt:
      "A strong SaaS foundation depends on product structure, consistent interface systems, and architecture that remains understandable as the roadmap expands.",
    accent: accents.sky,
    hero: "columns",
    content: [
      {
        h: "Growth reveals structural weaknesses",
        p: [
          "Many SaaS products feel manageable in their first version because the number of users, modules, and exceptions is still small.",
          "As billing cases, tenant complexity, permissions, reporting needs, and support tools increase, weak structure becomes harder to ignore.",
          "What seemed fast at the beginning can become expensive to evolve later."
        ],
      },
      {
        h: "System thinking matters early",
        p: [
          "Maintainability comes from choices made before the product is crowded with edge cases: component discipline, route structure, data modeling, permissions, and clear feature boundaries.",
          "That does not mean over-engineering. It means creating enough order so the product can absorb growth without becoming confusing to build or operate.",
          "A well-structured SaaS system makes future features easier, not riskier."
        ],
      },
      {
        h: "Consistency supports scale",
        p: [
          "Consistent UI patterns, reusable states, predictable navigation, and aligned backend conventions all reduce product entropy.",
          "This helps users learn the product faster and helps teams ship improvements with less hesitation.",
          "The result is not only cleaner code. It is a more durable product organization."
        ],
      },
    ],
  },
  {
    slug: "internal-tools-deserve-better-engineering",
    tag: "Product",
    date: "Jan 2026",
    read: "4 min",
    title: "Why internal tools often deserve better engineering than they receive.",
    excerpt:
      "Internal systems influence speed, accuracy, approvals, reporting, and coordination more directly than many businesses realize.",
    accent: accents.blush,
    hero: "nodes",
    content: [
      {
        h: "Internal tools shape daily work",
        p: [
          "A customer-facing product may get most of the attention, but many businesses rely every day on internal systems for approvals, operations, support, finance, and coordination.",
          "If those systems are difficult to use or poorly connected, the organisation loses time repeatedly in places that rarely appear in public roadmaps.",
          "The effect is operational drag."
        ],
      },
      {
        h: "Underbuilt systems create hidden waste",
        p: [
          "Teams often tolerate weak internal tooling because it feels less urgent than external product work. Over time that creates repeated context switching, duplicate tasks, and avoidable ambiguity.",
          "The waste is hidden because it is spread across teams and routine actions rather than one visible outage.",
          "That is exactly why the impact is easy to underestimate."
        ],
      },
      {
        h: "Better internal software improves leverage",
        p: [
          "Good internal tools increase control, consistency, and throughput. They also improve reporting quality because the underlying workflow becomes more structured.",
          "For many companies, this creates more leverage than another surface-level feature in the customer product.",
          "Internal software is often where operational efficiency becomes visible."
        ],
      },
    ],
  },
  {
    slug: "shipping-features-vs-improving-process",
    tag: "Engineering",
    date: "Dec 2025",
    read: "8 min",
    title: "The difference between shipping features and improving a business process.",
    excerpt:
      "Feature output is not the same as operational improvement. Strong product work connects delivery to changed behaviour, reduced friction, or better decisions.",
    accent: accents.peach,
    hero: "flow",
    content: [
      {
        h: "Output can hide weak outcomes",
        p: [
          "Teams often measure movement through shipped features, but features alone do not prove that the workflow or decision process actually improved.",
          "A new screen, report, or integration can still leave the underlying business problem unresolved.",
          "That is why product delivery should begin with the process being changed, not just the interface being added."
        ],
      },
      {
        h: "A process lens changes scoping",
        p: [
          "When teams focus on process improvement, requirements become clearer. The discussion shifts toward bottlenecks, handoffs, data clarity, approvals, and who needs to act next.",
          "That leads to more precise software because the product is being shaped around operational movement rather than a feature wishlist.",
          "It also makes prioritisation easier because the value is tied to a specific business effect."
        ],
      },
      {
        h: "Software should support the work",
        p: [
          "Well-scoped software changes how work happens. It reduces delay, lowers repetition, creates better visibility, or enables better decisions with less effort.",
          "That kind of product work often looks simpler from the outside because it is solving the right thing.",
          "Shipping less but improving more is often the better outcome."
        ],
      },
    ],
  },
];

/* ─────────────────────────── hooks ─────────────────────────── */

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const id = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
}

function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById("nexarrow-fonts")) return;
    const l1 = document.createElement("link");
    l1.rel = "preconnect";
    l1.href = "https://fonts.googleapis.com";

    const l2 = document.createElement("link");
    l2.rel = "preconnect";
    l2.href = "https://fonts.gstatic.com";
    l2.crossOrigin = "anonymous";

    const l3 = document.createElement("link");
    l3.id = "nexarrow-fonts";
    l3.rel = "stylesheet";
    l3.href =
      "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap";

    document.head.append(l1, l2, l3);
  }, []);
}

function useThemeMode() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  return { theme, setTheme };
}

function useScrollReveals(deps = []) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, deps);
}

/* ─────────────────────────── router ─────────────────────────── */

const RouterCtx = createContext({
  route: "home",
  go: () => {},
  theme: "light",
  setTheme: () => {},
});

const useRoute = () => useContext(RouterCtx);

/* ─────────────────────────── atoms ─────────────────────────── */

function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 md:px-8 xl:px-10 ${className}`}>
      {children}
    </div>
  );
}

function Pill({ children, tone = "ink" }) {
  const { theme } = useRoute();
  const c = themes[theme];

  const map = {
    ink: {
      background: c.ink,
      color: theme === "dark" ? "#050505" : c.white,
      border: `1px solid ${c.lineStrong}`,
    },
    paper: {
      background: c.card,
      color: c.ink,
      border: `1px solid ${c.lineStrong}`,
    },
    soft: {
      background: c.cardSoft,
      color: c.ink,
      border: `1px solid ${c.lineStrong}`,
    },
  };

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.16em]"
      style={{ ...ui.mono, ...map[tone] }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}

function Btn({ children, variant = "ink", onClick, as = "button", href, type = "button" }) {
  const { theme } = useRoute();
  const c = themes[theme];

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 h-11 text-[14px] font-medium transition-all";

  const styles = {
    ink: {
      background: c.ink,
      color: theme === "dark" ? "#050505" : c.white,
      border: `1px solid ${c.ink}`,
    },
    paper: {
      background: c.card,
      color: c.ink,
      border: `1px solid ${c.lineStrong}`,
    },
    ghost: {
      background: "transparent",
      color: c.ink,
      border: `1px solid transparent`,
    },
    mint: {
      background: accents.mint,
      color: "#10241D",
      border: "1px solid rgba(0,0,0,0.08)",
    },
  };

  const Cmp = as;

  return (
    <Cmp
      href={href}
      onClick={onClick}
      type={Cmp === "button" ? type : undefined}
      className={base}
      style={{ ...ui.sans, ...styles[variant] }}
    >
      {children}
    </Cmp>
  );
}

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useRoute();
  const c = themes[theme];
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-10 w-10 place-items-center rounded-full"
      style={{
        background: c.card,
        color: c.ink,
        border: `1px solid ${c.lineStrong}`,
      }}
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.6A9 9 0 1 1 11.4 3a7.2 7.2 0 0 0 9.6 9.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function SurfaceCard({ children, className = "", accent }) {
  const { theme } = useRoute();
  const c = themes[theme];

  return (
    <div
      className={`rounded-3xl ${className}`}
      style={{
        background: accent || c.card,
        color: c.ink,
      }}
    >
      {children}
    </div>
  );
}

function Section({ id, label, title, kicker, children, dark = false, tone = "default" }) {
  const { theme } = useRoute();
  const c = themes[theme];

  const bgMap = {
    default: c.paper,
    soft: c.paperAlt,
    card: c.cardSoft,
    dark: c.surfaceDark,
    mint: theme === "dark" ? "#090909" : "#EAF8F1",
    lilac: theme === "dark" ? "#0C0A10" : "#F3EAFB",
    lemon: theme === "dark" ? "#0D0D08" : "#FBFCE3",
    sky: theme === "dark" ? "#090B0D" : "#EAF4FC",
    blush: theme === "dark" ? "#0D0A0A" : "#FCEEEF",
  };

  const background = dark ? c.surfaceDark : bgMap[tone] || c.paper;
  const color = dark ? c.white : c.ink;

  return (
    <section
      id={id}
      style={{
        background,
        color,
      }}
    >
      <Container className="py-20 md:py-28">
        {label && (
          <div className="mb-8 flex items-center justify-between">
            <Pill tone={dark ? "paper" : "ink"}>{label}</Pill>
            {kicker && (
              <span
                className="hidden text-[12px] uppercase tracking-[0.2em] md:inline"
                style={{ ...ui.mono, color: dark ? "rgba(255,255,255,.55)" : c.muted }}
              >
                {kicker}
              </span>
            )}
          </div>
        )}
        {title && (
          <h2
            data-reveal
            className="max-w-5xl text-[40px] leading-[1.05] tracking-[-0.02em] md:text-[64px]"
            style={ui.display}
          >
            {title}
          </h2>
        )}
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}

/* ─────────────────────────── illustrations ─────────────────────────── */

function InsightArt({ type, accent }) {
  const { theme } = useRoute();
  const darkBase = theme === "dark" ? "#060606" : "#111111";

  const common = {
    background:
      theme === "dark"
        ? "linear-gradient(180deg, #0A0A0A 0%, #050505 100%)"
        : "linear-gradient(180deg, rgba(255,255,255,.75) 0%, rgba(255,255,255,.35) 100%)",
    borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)"}`,
  };

  if (type === "grid") {
    return (
      <div className="relative h-52 overflow-hidden" style={common}>
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-14 w-14 rounded-xl"
                style={{
                  background: i % 2 === 0 ? accent : darkBase,
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "orbits") {
    return (
      <div className="relative h-52 overflow-hidden" style={common}>
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative h-36 w-36 rounded-full border border-white/10">
            <div className="absolute inset-[-20px] rounded-full border border-white/10" />
            <div className="absolute inset-[-40px] rounded-full border border-white/10" />
            <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: accent }} />
            <span className="absolute left-[-10px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full" style={{ background: "#fff" }} />
            <span className="absolute right-[10px] top-[8px] h-3.5 w-3.5 rounded-full" style={{ background: accent }} />
            <span className="absolute bottom-[-14px] left-[56px] h-3.5 w-3.5 rounded-full bg-white/80" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "steps") {
    return (
      <div className="relative h-52 overflow-hidden" style={common}>
        <div className="absolute bottom-8 left-8 right-8 flex items-end gap-4">
          {[44, 72, 104, 136].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-2xl"
              style={{
                height: h,
                background: i % 2 === 0 ? accent : darkBase,
                border: "1px solid rgba(255,255,255,.08)",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === "columns") {
    return (
      <div className="relative h-52 overflow-hidden" style={common}>
        <div className="absolute inset-0 flex items-end justify-center gap-3 px-8 pb-8">
          {[80, 120, 96, 144, 68].map((h, i) => (
            <div
              key={i}
              className="w-12 rounded-t-2xl"
              style={{
                height: h,
                background: i === 2 ? accent : i % 2 === 0 ? "#ffffff" : darkBase,
                opacity: 0.95,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === "nodes") {
    return (
      <div className="relative h-52 overflow-hidden" style={common}>
        <svg viewBox="0 0 400 208" className="absolute inset-0 h-full w-full">
          <path d="M58 60C110 90 130 80 180 108C230 136 260 120 330 150" stroke="rgba(255,255,255,.22)" strokeWidth="2" fill="none" />
          <circle cx="58" cy="60" r="14" fill={accent} />
          <circle cx="140" cy="82" r="10" fill="#fff" />
          <circle cx="220" cy="112" r="14" fill={accent} />
          <circle cx="330" cy="150" r="18" fill="#fff" opacity=".9" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative h-52 overflow-hidden" style={common}>
      <svg viewBox="0 0 400 208" className="absolute inset-0 h-full w-full">
        <path d="M24 154C84 98 122 178 178 126C236 72 286 140 376 82" stroke="rgba(255,255,255,.22)" strokeWidth="3" fill="none" />
        <path d="M24 176C96 130 128 188 204 144C280 100 314 148 376 124" stroke={accent} strokeWidth="3" fill="none" />
      </svg>
    </div>
  );
}

/* ─────────────────────────── header/footer ─────────────────────────── */

function Header() {
  const { route, go, theme } = useRoute();
  const c = themes[theme];
  const [open, setOpen] = useState(false);

  const nav = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "services", label: "Services" },
    { key: "manifesto", label: "Why Us" },
    { key: "journal", label: "Insights" },
    { key: "studios", label: "Company" },
    { key: "careers", label: "Careers" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <header
      style={{
        background: theme === "dark" ? "rgba(5,5,5,.9)" : "rgba(250,248,243,.88)",
        borderBottom: `1px solid ${c.line}`,
        backdropFilter: "blur(14px)",
      }}
      className="sticky top-0 z-50"
    >
      <Container className="flex h-16 items-center justify-between">
        <button onClick={() => go("home")} className="flex items-center gap-2" style={ui.display}>
          <span
            className="  flex justify-center  place-items-center rounded-full"
           
          >
            <img src="/logo.svg" alt="Nexarrow Logo" className="h-12 w-12" />
          </span>
          <span className="text-[20px] font-semibold tracking-tight" style={{ color: c.ink }}>
            Nexarrow
          </span>
         
        </button>

        <nav className="hidden items-center gap-6 lg:flex" style={ui.sans}>
          {nav.map((n) => (
            <button
              key={n.key}
              onClick={() => go(n.key)}
              className="text-[14px]"
              style={{
                color:
                  route === n.key ||
                  (n.key === "services" && route.startsWith("service")) ||
                  route.startsWith("job.") ||
                  route.startsWith("article.")
                    ? c.ink
                    : c.muted,
              }}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Btn variant="ink" onClick={() => go("contact")}>
            Start a Project <Arrow />
          </Btn>
          <button
            onClick={() => setOpen((s) => !s)}
            className="ml-1 grid h-10 w-10 place-items-center rounded-full lg:hidden"
            style={{ border: `1px solid ${c.lineStrong}`, color: c.ink }}
            aria-label="Menu"
          >
            <div className="space-y-1">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </div>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            style={{ borderTop: `1px solid ${c.line}` }}
            className="overflow-hidden lg:hidden"
          >
            <Container className="grid gap-2 py-4">
              {nav.map((n) => (
                <button
                  key={n.key}
                  onClick={() => {
                    go(n.key);
                    setOpen(false);
                  }}
                  className="rounded-md px-2 py-2 text-left text-[15px]"
                  style={{ ...ui.sans, color: c.ink }}
                >
                  {n.label}
                </button>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  const { go, theme } = useRoute();
  const c = themes[theme];

  const navItems = [
    { label: "About", key: "about" },
    { label: "Why Us", key: "manifesto" },
    { label: "Insights", key: "journal" },
    { label: "Company", key: "studios" },
    { label: "Careers", key: "careers" },
    { label: "Contact", key: "contact" },
  ];

  const serviceItems = [
    { label: "Software Development", key: "service.web" },
    { label: "SaaS Platforms", key: "service.ui" },
    { label: "AI Solutions", key: "service.app" },
    { label: "Cloud Infrastructure", key: "service.cloud" },
  ];

  const legalItems = [
    { label: "Privacy Policy", key: "privacy" },
    { label: "Terms & Conditions", key: "terms" },
  ];

  return (
    <footer
      style={{
        background: c.surfaceDark,
        color: c.white,
        borderTop: `1px solid rgba(255,255,255,0.08)`,
      }}
    >
      <Container className="pt-16 pb-6 md:pt-20 md:pb-8">
        {/* Brand + description row */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2" style={ui.display}>
              <span
            className="  flex justify-center  place-items-center rounded-full"
           
          >
            <img src="/logo.svg" alt="Nexarrow Logo" className="h-12 w-12" />
          </span>
              <span className="text-[18px] font-semibold">Nexarrow</span>
            </div>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/65" style={ui.sans}>
              We build software, SaaS platforms, AI solutions, and cloud infrastructure
              for businesses worldwide.
            </p>
          </div>
          <div className="text-right text-[12px] uppercase tracking-[0.18em] text-white/40" style={ui.mono}>
            <p>Nexarrow OÜ · Tallinn, Estonia</p>
            <p className="mt-1">Registry Code: 17521430</p>
          </div>
        </div>

        {/* Navigation rows - all horizontal */}
        <div className="mt-10 space-y-8">
          {/* Company menu */}
          <div>
            <h4 className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white/40" style={ui.mono}>
              Company
            </h4>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => go(item.key)}
                  className="text-[15px] text-white/85 transition-colors hover:text-white"
                  style={ui.sans}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services menu */}
          <div>
            <h4 className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white/40" style={ui.mono}>
              Services
            </h4>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {serviceItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => go(item.key)}
                  className="text-[15px] text-white/85 transition-colors hover:text-white"
                  style={ui.sans}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: legal links + copyright */}
        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          
          <p className="text-[12px] text-white/50" style={ui.mono}>
            © {new Date().getFullYear()} Nexarrow OÜ. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[12px] text-white/50" style={ui.mono}>
            {legalItems.map((item) => (
              <React.Fragment key={item.key}>
                <button
                  onClick={() => go(item.key)}
                  className="hover:text-white/80 transition-colors"
                >
                  {item.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* ─────────────────────────── home ─────────────────────────── */

function HeroSignup() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { theme } = useRoute();
  const c = themes[theme];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setSent(true);
      }}
      className="mx-auto mt-10 flex w-full max-w-[580px] items-center gap-2 rounded-full p-1.5"
      style={{ background: c.card, border: `1px solid ${c.lineStrong}` }}
    >
      <div className="pl-3" style={{ color: c.muted }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M3 7l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
        placeholder={sent ? "Thanks — we’ll contact you shortly." : "Your work email"}
        className="h-10 flex-1 bg-transparent px-2 text-[14px] outline-none"
        style={{ ...ui.sans, color: c.ink }}
      />
      <button
        type="submit"
        className="inline-flex h-10 items-center gap-2 rounded-full px-5 text-[14px] font-medium"
        style={{ ...ui.sans, background: accents.mint, color: "#0E2A22" }}
      >
        {sent ? "Sent" : "Get in touch"} <Arrow />
      </button>
    </form>
  );
}

function Hero() {
  const ref = useRef(null);
  const { theme } = useRoute();
  const c = themes[theme];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-word]", {
        y: "1.1em",
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.06,
      });
      gsap.from("[data-hero-sub]", { y: 20, opacity: 0, delay: 0.4, duration: 0.8, ease: "power2.out" });
      gsap.from("[data-hero-tag]", { opacity: 0, y: -10, duration: 0.6 });

      gsap.to("[data-hero-meta]", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const line1 = ["Building", "scalable", "software"];
  const line2 = ["for", "modern", "business", "growth."];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background:
          theme === "dark"
            ? `linear-gradient(180deg, #090909 0%, #050505 100%)`
            : `linear-gradient(180deg, #F8F5EE 0%, #FAF8F3 100%)`,
      }}
    >
      <Container className="pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="flex items-center justify-between" data-hero-tag>
          <Pill>Global delivery</Pill>
          <span className="hidden text-[12px] uppercase tracking-[0.2em] md:inline" style={{ ...ui.mono, color: c.muted }}>
            / software · saas · ai · cloud
          </span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr,.85fr] lg:items-end">
          <div>
            <h1
              className="max-w-5xl text-[44px] font-semibold leading-[1.02] tracking-[-0.025em] md:text-[88px]"
              style={{ ...ui.display, color: c.ink }}
            >
              <span className="block overflow-hidden">
                {line1.map((w, i) => (
                  <span key={i} data-hero-word className="mr-3 inline-block">
                    {i === 1 ? (
                      <em className="not-italic" style={{ ...ui.serif, fontStyle: "italic" }}>{w}</em>
                    ) : (
                      w
                    )}
                  </span>
                ))}
              </span>
              <span className="block overflow-hidden">
                {line2.map((w, i) => (
                  <span key={i} data-hero-word className="mr-3 inline-block">{w}</span>
                ))}
              </span>
            </h1>

            <p
              data-hero-sub
              className="mt-6 max-w-2xl text-[16px] leading-relaxed md:text-[17px]"
              style={{ ...ui.sans, color: c.muted }}
            >
              Nexarrow helps companies design, build, and scale custom software,
              SaaS platforms, AI-powered products, and cloud infrastructure that
              are dependable in production and practical to grow over time.
            </p>

            {/* <HeroSignup /> */}
          </div>

          <SurfaceCard accent={theme === "dark" ? "#101010" : accents.blush} className="p-7 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.2em]" style={ui.mono}>What we do</div>
            <h3 className="mt-4 text-[30px] leading-[1.05] tracking-[-0.02em] md:text-[44px]" style={ui.display}>
              Build technology that supports the business, not just the roadmap.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed" style={ui.sans}>
              From internal platforms and SaaS systems to AI workflows and cloud-ready deployment,
              we focus on solutions that improve operations, delivery, and growth.
            </p>
          </SurfaceCard>
        </div>

        <div data-hero-meta className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["Custom", "Software delivery", accents.mint],
            ["SaaS", "Product platforms", accents.sky],
            ["AI", "Automation & intelligence", accents.lilac],
            ["Cloud", "Infra & deployment", accents.lemon],
          ].map(([k, v, bg]) => (
            <SurfaceCard key={v} accent={theme === "dark" ? "#101010" : bg} className="p-6">
              <div className="text-[26px] tracking-[-0.02em]" style={ui.display}>{k}</div>
              <div className="mt-1 text-[12px] uppercase tracking-[0.18em]" style={{ ...ui.mono, color: theme === "dark" ? c.muted : "#4F4B43" }}>
                {v}
              </div>
            </SurfaceCard>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ScrollTypePinned() {
  const ref = useRef(null);
  const { theme } = useRoute();
  const c = themes[theme];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wordsEl = ref.current.querySelector("[data-pin-words]");
      gsap.to(wordsEl, {
        xPercent: -60,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=120%",
          scrub: 0.6,
          pin: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}`, background: theme === "dark" ? "#080808" : c.paper }}>
      <div className="h-screen flex items-center overflow-hidden">
        <div
          data-pin-words
          className="whitespace-nowrap pl-[8vw] text-[17vw] leading-none tracking-[-0.04em]"
          style={{ ...ui.display, color: c.ink }}
        >
          software · saas · <em className="not-italic" style={{ ...ui.serif, fontStyle: "italic" }}>ai</em> · cloud · product engineering ·
        </div>
      </div>
    </section>
  );
}

function HorizontalCities() {
  const ref = useRef(null);

  const items = [
    { name: "Strategy", note: "Discovery, architecture planning, and technical direction", bg: accents.mint },
    { name: "Build", note: "Apps, APIs, dashboards, business systems, and product modules", bg: accents.sky },
    { name: "AI", note: "Assistants, retrieval, automation, and useful AI workflows", bg: accents.lilac },
    { name: "Cloud", note: "CI/CD, deployment, observability, reliability, and environments", bg: accents.lemon },
    { name: "Scale", note: "Iteration, support, performance, and long-term maintainability", bg: accents.blush },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = ref.current.querySelector("[data-track]");
      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute top-6 left-0 right-0 z-10 px-5 md:px-8 xl:px-10">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Pill>Delivery model</Pill>
          <span className="hidden text-[12px] uppercase tracking-[0.2em] md:inline" style={ui.mono}>
            scroll →
          </span>
        </div>
      </div>

      <div data-track className="flex h-screen w-max items-center gap-6 pl-[6vw] pr-[18vw]">
        {items.map((c) => (
          <article
            key={c.name}
            className="flex h-[72vh] w-[74vw] flex-col justify-between rounded-3xl p-10 md:w-[44vw]"
            style={{ backgroundColor: c.bg, color: "#0E0E0E" }}
          >
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em]" style={ui.mono}>
              <span>Nexarrow</span>
              <span>{c.name}</span>
            </div>
            <div>
              <h3 className="text-[60px] leading-[0.95] tracking-[-0.03em] md:text-[118px]" style={ui.display}>
                {c.name}
              </h3>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed opacity-80" style={ui.sans}>
                {c.note}
              </p>
            </div>
            <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.2em]" style={ui.mono}>
              <span>Practical execution</span>
              <span className="grid h-9 w-9 place-items-center rounded-md bg-white">
                <Arrow />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedServicesCards() {
  const { go } = useRoute();

  const items = [
    {
      tag: "SERVICE",
      title: "Software Development",
      route: "service.web",
      copy: "Custom platforms, web apps, admin panels, APIs, and internal tools built around real business workflows.",
      meta: "Custom build",
      foot: "web · backend · api",
      bg: accents.mint,
      fg: "#0E2A22",
    },
    {
      tag: "SERVICE",
      title: "SaaS Platforms",
      route: "service.ui",
      copy: "Multi-tenant SaaS architecture, dashboards, user systems, billing flows, and maintainable product foundations.",
      meta: "Product-ready",
      foot: "saas · ui · scale",
      bg: accents.sky,
      fg: "#0D2231",
    },
    {
      tag: "SERVICE",
      title: "Cloud Infrastructure",
      route: "service.cloud",
      copy: "Deployment, CI/CD, environments, scaling, observability, and production support systems.",
      meta: "Cloud-first",
      foot: "devops · infra · uptime",
      bg: accents.lilac,
      fg: "#240E3A",
    },
    {
      tag: "SERVICE",
      title: "AI Solutions",
      route: "service.app",
      copy: "Assistants, automation, retrieval systems, and product features driven by practical AI implementation.",
      meta: "AI-enabled",
      foot: "llm · automation · workflows",
      bg: accents.lemon,
      fg: "#2A2A0E",
    },
  ];

  return (
    <Section label="Services" kicker="04 / core offerings" title={<>Four focused services.<br />Built around business outcomes.</>} tone="soft">
      <div className="mb-6 flex items-center justify-between">
        <p className="max-w-md text-[15px]" style={ui.sans}>
          We partner with startups, SMEs, and growing companies that need dependable
          technical execution and product clarity.
        </p>
        <button onClick={() => go("services")} className="inline-flex items-center gap-2 text-[14px]" style={ui.sans}>
          Explore all <Arrow />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((it) => (
          <button
            key={it.title}
            data-reveal
            onClick={() => go(it.route)}
            className="group relative flex h-[340px] flex-col justify-between rounded-3xl p-5 text-left"
            style={{ backgroundColor: it.bg, color: it.fg }}
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] opacity-70" style={ui.mono}>{it.tag}</div>
              <h3 className="mt-3 text-[24px] leading-[1.1] tracking-[-0.01em]" style={ui.display}>{it.title}</h3>
              <p className="mt-3 text-[13px] leading-relaxed opacity-80" style={ui.sans}>{it.copy}</p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] opacity-70" style={ui.mono}>{it.foot}</div>
                <div className="mt-1 text-[22px] tracking-[-0.01em]" style={ui.display}>{it.meta}</div>
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#111] transition-transform group-hover:translate-x-1">
                <Arrow />
              </span>
            </div>
          </button>
        ))}
      </div>
    </Section>
  );
}

function Marquee() {
  const ref = useRef(null);
  const { theme } = useRoute();
  const c = themes[theme];

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
    });
    return () => ctx.revert();
  }, []);

  const names = [
    "Custom Software",
    "Product Engineering",
    "SaaS Architecture",
    "AI Automation",
    "Cloud Deployment",
    "API Integration",
    "Internal Tools",
    "Scalable Platforms",
  ];

  const row = (
    <div className="flex shrink-0 items-center gap-12 px-6">
      {names.map((n) => (
        <span key={n} className="whitespace-nowrap text-[22px]" style={{ ...ui.serif, color: theme === "dark" ? "rgba(245,245,242,0.72)" : "rgba(14,14,14,0.7)" }}>
          {n}
          <span className="ml-12 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: theme === "dark" ? "rgba(255,255,255,.3)" : "rgba(0,0,0,.3)" }} />
        </span>
      ))}
    </div>
  );

  return (
    <section style={{ borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}`, background: theme === "dark" ? "#080808" : c.paper }} className="py-6 overflow-hidden">
      <div ref={ref} className="flex w-max">{row}{row}</div>
    </section>
  );
}

function Approach() {
  const { theme } = useRoute();

  const steps = [
    ["01", "Understand", "We begin by understanding the business model, users, constraints, and the actual problem worth solving."],
    ["02", "Plan", "We define scope, architecture direction, delivery phases, and measurable outcomes before heavy implementation starts."],
    ["03", "Build", "We ship in milestones, communicate clearly, and keep the product usable, testable, and deployable throughout the build."],
    ["04", "Improve", "After launch, we help with iteration, fixes, optimization, infrastructure, and feature evolution as the product grows."],
  ];

  const colors = [accents.mint, accents.sky, accents.lilac, accents.lemon];

  return (
    <Section label="Process" kicker="how we deliver" title={<>A practical process,<br />built for shipping.</>} tone="card">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {steps.map(([n, t, cText], i) => (
          <div
            key={n}
            data-reveal
            className="rounded-3xl p-8"
            style={{
              background: theme === "dark" ? (i % 2 === 0 ? "#101010" : "#161616") : colors[i],
            }}
          >
            <div className="text-[11px] uppercase tracking-[0.22em]" style={ui.mono}>{n}</div>
            <h4 className="mt-6 text-[26px] tracking-[-0.01em]" style={ui.display}>{t}</h4>
            <p className="mt-3 text-[14px] leading-relaxed" style={ui.sans}>{cText}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function CaseStudies() {
  const { theme } = useRoute();

  const items = [
    {
      title: "Custom software to centralize approvals, records, and team workflows in one place.",
      sector: "Workflow automation",
      tag: "Software · Cloud",
      bg: theme === "dark" ? "#101010" : accents.mint,
    },
    {
      title: "A scalable SaaS interface with tenant-aware architecture, analytics, and role-based access.",
      sector: "Subscription product",
      tag: "SaaS · UI",
      bg: theme === "dark" ? "#141414" : accents.sky,
    },
    {
      title: "An AI-powered assistant that reduces repetitive work through retrieval, summaries, and smart actions.",
      sector: "Automation",
      tag: "AI · Product",
      bg: theme === "dark" ? "#1A1A1A" : accents.lilac,
    },
  ];

  return (
    <Section label="Solutions" kicker="what we build" title={<>Business-focused products<br />with real utility.</>} tone="default">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {items.map((c) => (
          <article key={c.title} data-reveal className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
            <div className="h-48" style={{ backgroundColor: c.bg }} />
            <div className="p-6">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em]" style={ui.mono}>
                <span>{c.sector}</span>
                <span>{c.tag}</span>
              </div>
              <h3 className="mt-4 text-[22px] leading-[1.15] tracking-[-0.01em]" style={ui.display}>{c.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Testimonial() {
  return (
    <Section label="Approach" kicker="what matters to us" title={<>We focus on building products<br />that stay useful after launch.</>} dark>
      <div className="grid gap-6 lg:grid-cols-[1.2fr,.8fr]">
        <blockquote
          data-reveal
          className="text-[34px] leading-[1.15] tracking-[-0.015em] md:text-[56px]"
          style={ui.display}
        >
          “We care about systems that solve operational and commercial problems
          not just interfaces that look good in screenshots.”
        </blockquote>
        <div className="rounded-2xl bg-white/5 p-6">
          <div className="text-[12px] uppercase tracking-[0.18em] text-white/45" style={ui.mono}>
            What that means
          </div>
          <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-white/75" style={ui.sans}>
            <li>Clear requirements and practical scope.</li>
            <li>Maintainable engineering decisions.</li>
            <li>Deployment-ready delivery.</li>
            <li>Longer-term support and iteration.</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

function PricingGlance() {
  const { theme } = useRoute();

  const tiers = [
    { name: "Project Build", price: "Custom", desc: "Fixed-scope or milestone-based delivery for software, SaaS, AI, and cloud projects.", bg: theme === "dark" ? "#101010" : accents.mint },
    { name: "Dedicated Support", price: "Monthly", desc: "Ongoing engineering support for feature development, maintenance, and product iteration.", bg: theme === "dark" ? "#151515" : accents.sky },
    { name: "Technical Consulting", price: "Flexible", desc: "Architecture reviews, product discovery, AI strategy, and infrastructure planning.", bg: theme === "dark" ? "#1A1A1A" : accents.lemon },
  ];

  return (
    <Section label="Engagement" kicker="how we work together" title={<>Flexible engagement models<br />for growing companies.</>} tone="soft">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.name} data-reveal className="rounded-3xl p-8" style={{ background: t.bg }}>
            <div className="flex items-baseline justify-between">
              <h4 className="text-[24px] tracking-[-0.01em]" style={ui.display}>{t.name}</h4>
              <div className="text-[28px] tracking-[-0.02em]" style={ui.display}>{t.price}</div>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed" style={ui.sans}>{t.desc}</p>
            <div className="mt-8"><Btn variant="paper">Discuss this <Arrow /></Btn></div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  const { theme } = useRoute();
  const c = themes[theme];

  const items = [
  [
    "What does Nexarrow do?",
    "Nexarrow builds custom software solutions, SaaS platforms, AI-powered products, cloud infrastructure, APIs, admin dashboards, and workflow-driven business systems tailored to real operational needs.",
  ],
  [
    "Who do you work with?",
    "We work with startups, SMEs, agencies, product teams, and growing businesses that need dependable software execution or technical delivery support.",
  ],
  [
    "Can you work with our existing team?",
    "Yes. We can collaborate as an extension of your in-house team, support founders directly, or take ownership of a specific product stream or feature set.",
  ],
  [
    "Do you handle deployment and infrastructure?",
    "Yes. We can support CI/CD pipelines, cloud setup, environment management, observability, and post-launch technical support depending on the engagement.",
  ],
  [
    "Do you offer AI development services?",
    "Yes. We build practical AI features such as assistants, automation workflows, retrieval systems, summarization tools, chat interfaces, and model-integrated business processes.",
  ],
  [
    "Can you take a project from idea to launch?",
    "Yes. We can help from early product discovery and architecture through development, testing, deployment, and launch support.",
  ],
  [
    "Do you build MVPs?",
    "Yes. We design and develop lean, production-ready MVPs that help validate ideas quickly without compromising on quality or scalability.",
  ],
  [
    "Can you improve or rebuild an existing product?",
    "Yes. We often work on legacy modernization, performance improvements, UI/UX refinement, architecture cleanup, and feature expansion for existing systems.",
  ],
  [
    "Do you work with startups?",
    "Yes. We regularly support startups that need a reliable technical partner for building new products, iterating quickly, and moving from concept to market.",
  ],
  [
    "How do you approach a new project?",
    "We begin by understanding the business goal, scope, users, and technical constraints, then recommend the most effective product and delivery approach.",
  ],
  [
    "Do you provide ongoing support after launch?",
    "Yes. We can continue with maintenance, enhancements, bug fixes, monitoring, and iterative product development after launch.",
  ],
  [
    "How do you communicate during a project?",
    "We keep communication clear and structured through regular updates, milestone reviews, and direct collaboration so you always know progress, priorities, and next steps.",
  ],
];

  return (
    <Section label="FAQ" kicker="common questions" title={<>Answers for teams<br />planning their next build.</>} tone="default">
      <div className="overflow-hidden rounded-2xl" style={{ background: c.card, border: `1px solid ${c.lineStrong}` }}>
        {items.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={q} style={i > 0 ? { borderTop: `1px solid ${c.line}` } : undefined}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-6 p-6 text-left">
                <span className="text-[18px] tracking-[-0.01em] md:text-[22px]" style={ui.display}>{q}</span>
                <span
                  className="grid h-9 w-9 place-items-center rounded-full transition-transform"
                  style={{ border: `1px solid ${c.lineStrong}`, transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-6 pb-6 text-[15px] leading-relaxed" style={{ ...ui.sans, color: c.muted }}>{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function CTA() {
  const { go, theme } = useRoute();
  return (
    <Section tone="blush">
      <div
        className="rounded-3xl p-10 md:p-16"
        style={{
          background: theme === "dark" ? "#101010" : accents.blush,
        }}
      >
        <Pill tone="soft">Start a project</Pill>
        <h2 data-reveal className="mt-8 max-w-4xl text-[40px] leading-[1.05] tracking-[-0.02em] md:text-[72px]" style={ui.display}>
          Build something useful,<br />
          scalable, and <em className="not-italic" style={{ ...ui.serif, fontStyle: "italic" }}>ready</em> for production.
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Btn variant="ink" onClick={() => go("contact")}>Talk to Nexarrow <Arrow /></Btn>
          <Btn variant="paper" onClick={() => go("services")}>Explore services</Btn>
        </div>
      </div>
    </Section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ScrollTypePinned />
      <FeaturedServicesCards />
      <HorizontalCities />
      <Approach />
      <CaseStudies />
      <Testimonial />
      <PricingGlance />
      <FAQ />
      <CTA />
    </>
  );
}

/* ─────────────────────────── insights ─────────────────────────── */

function JournalPage() {
  const { go, theme } = useRoute();

  return (
    <>
      <Section label="Insights" kicker="product · ai · cloud · software" title={<>Writing around the work<br />that powers modern products.</>} tone="soft">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {insights.map((p) => (
            <article
              key={p.slug}
              data-reveal
              className="overflow-hidden rounded-3xl border-black/10 dark:border-white/10"
              style={{ background: theme === "dark" ? "#101010" : "#fff" }}
            >
              <InsightArt type={p.hero} accent={p.accent} />
              <div className="p-6">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em]" style={ui.mono}>
                  <span>{p.tag} · {p.date}</span>
                  <span>{p.read}</span>
                </div>
                <h3 className="mt-4 text-[22px] leading-[1.15] tracking-[-0.01em]" style={ui.display}>{p.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed" style={ui.sans}>{p.excerpt}</p>
                <button onClick={() => go(`article.${p.slug}`)} className="mt-6 inline-flex items-center gap-2 text-[13px]" style={ui.sans}>
                  Read more <Arrow />
                </button>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <CTA />
    </>
  );
}

function ArticleDetailPage({ article }) {
  const { go, theme } = useRoute();
  if (!article) return <HomePage />;

  return (
    <>
      <section
        className="overflow-hidden border-t border-black/10 dark:border-white/10"
        style={{ background: theme === "dark" ? "#070707" : article.accent, color: theme === "dark" ? themes.dark.ink : "#111" }}
      >
        <Container className="py-20 md:py-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Pill tone="soft">{article.tag}</Pill>
            <button onClick={() => go("journal")} className="text-[12px] uppercase tracking-[0.2em]" style={ui.mono}>
              ← Back to insights
            </button>
          </div>
          <h1 data-reveal className="mt-8 max-w-5xl text-[44px] leading-[1.02] tracking-[-0.025em] md:text-[82px]" style={ui.display}>
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-3 text-[12px]" style={ui.mono}>
            <span className="rounded-full bg-white/70 px-3 py-1 text-[#111]">{article.date}</span>
            <span className="rounded-full bg-white/70 px-3 py-1 text-[#111]">{article.read}</span>
            <span className="rounded-full bg-white/70 px-3 py-1 text-[#111]">Nexarrow Insights</span>
          </div>
        </Container>
      </section>

      <Section label="Article" kicker="full content" title={<>The full perspective<br />behind the headline.</>} tone="default">
        <div className="grid gap-10 xl:grid-cols-[1.25fr,.75fr]">
          <article className="space-y-12">
            {article.content.map((sec) => (
              <section key={sec.h} data-reveal>
                <h2 className="text-[28px] leading-[1.1] tracking-[-0.015em] md:text-[40px]" style={ui.display}>
                  {sec.h}
                </h2>
                <div className="mt-5 space-y-5 text-[17px] leading-relaxed" style={ui.sans}>
                  {sec.p.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <div className="space-y-4 xl:sticky xl:top-24 xl:self-start">
            <SurfaceCard className="overflow-hidden">
              <InsightArt type={article.hero} accent={article.accent} />
              <div className="p-6">
                <div className="text-[12px] uppercase tracking-[0.18em]" style={ui.mono}>Visual summary</div>
                <p className="mt-3 text-[14px] leading-relaxed" style={ui.sans}>
                  This article focuses on product and system decisions that improve clarity, usability, and long-term software value.
                </p>
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-6" accent={theme === "dark" ? "#101010" : article.accent}>
              <div className="text-[12px] uppercase tracking-[0.18em]" style={ui.mono}>Related next step</div>
              <p className="mt-3 text-[15px] leading-relaxed" style={ui.sans}>
                If this kind of problem sounds familiar, the next useful step is usually discovery, workflow mapping, or technical scoping.
              </p>
              <div className="mt-6">
                <Btn variant="ink" onClick={() => go("contact")}>Discuss a project <Arrow /></Btn>
              </div>
            </SurfaceCard>
          </div>
        </div>
      </Section>

      <Section label="More reading" kicker="other insights" title={<>Related articles<br />worth exploring next.</>} tone="soft">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {insights.filter((i) => i.slug !== article.slug).slice(0, 3).map((item) => (
            <button
              key={item.slug}
              onClick={() => go(`article.${item.slug}`)}
              className="overflow-hidden rounded-2xl border border-black/10 text-left dark:border-white/10"
              style={{ background: theme === "dark" ? "#101010" : "#fff" }}
            >
              <InsightArt type={item.hero} accent={item.accent} />
              <div className="p-5">
                <div className="text-[11px] uppercase tracking-[0.18em]" style={ui.mono}>
                  {item.tag} · {item.read}
                </div>
                <h3 className="mt-3 text-[20px] leading-[1.15]" style={ui.display}>{item.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}

/* ─────────────────────────── about / manifesto / studios / awards ─────────────────────────── */

function AboutPage() {
  return (
    <>
      <Section label="About" kicker="company overview" title={<>A software company focused on<br />real business execution.</>} tone="mint">
        <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-6 text-[17px] leading-relaxed" style={ui.sans}>
            <p data-reveal>
              Nexarrow OÜ is a software company based in Tallinn, Estonia. We help businesses
              turn ideas, workflows, and operational challenges into dependable digital products.
            </p>
            <p data-reveal>
              Our work includes custom software development, SaaS product engineering,
              AI-powered tools, and cloud infrastructure that support business operations
              and long-term growth.
            </p>
            <p data-reveal>
              We value clean architecture, practical user experiences, maintainable code,
              and delivery decisions that make sense beyond launch day.
            </p>
          </div>

          <SurfaceCard className="p-8" accent={accents.sky}>
            <h3 className="text-[20px] tracking-[-0.01em]" style={ui.display}>Company snapshot</h3>
            <dl className="mt-6 grid grid-cols-2 gap-y-5 text-[14px]" style={ui.sans}>
              {[
                ["Company", "Nexarrow OÜ"],
                ["Registry", "17521430"],
                ["VAT", "EE102992676"],
                ["Base", "Tallinn, Estonia"],
                ["Focus", "Software · SaaS · AI · Cloud"],
                ["Clients", "Worldwide"],
              ].map(([k, v]) => (
                <React.Fragment key={k}>
                  <dt style={ui.mono}>{k}</dt>
                  <dd>{v}</dd>
                </React.Fragment>
              ))}
            </dl>
          </SurfaceCard>
        </div>
      </Section>

      <Section label="Principles" kicker="how we work" title={<>What guides the work<br />behind every project.</>} tone="soft">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["Clarity", "We focus on clear requirements, transparent communication, and practical execution.", accents.mint],
            ["Scalability", "Systems should remain understandable and extensible as the business grows.", accents.sky],
            ["Reliability", "Delivery is not complete until the product is stable in real usage.", accents.lilac],
            ["Maintainability", "Code should be easy to improve, hand over, and operate over time.", accents.lemon],
            ["Relevance", "We build what supports the business, not what only looks impressive in demos.", accents.blush],
          ].map(([t, c, bg]) => (
            <div key={t} data-reveal className="rounded-3xl p-6" style={{ background: bg}}>
              <h4 className="text-[22px] tracking-[-0.01em]" style={ui.display}>{t}</h4>
              <p className="mt-3 text-[14px] leading-relaxed" style={ui.sans}>{c}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}

function ManifestoPage() {
  const lines = [
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
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-manifesto-line]").forEach((el) => {
        gsap.from(el, {
          opacity: 0.15,
          x: -40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", end: "top 40%", scrub: 0.6 },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="border-t border-black/10 dark:border-white/10">
      <Container className="py-24 md:py-32">
        <Pill>Why Nexarrow</Pill>
        <h1 data-reveal className="mt-10 max-w-5xl text-[44px] leading-[1.02] tracking-[-0.025em] md:text-[96px]" style={ui.display}>
          Ten principles behind how we build.
        </h1>
        <ol className="mt-20 space-y-10 md:space-y-16">
          {lines.map((l, i) => (
            <li key={i} className="grid grid-cols-[auto,1fr] items-baseline gap-6 md:gap-12">
              <span className="text-[14px] md:text-[16px]" style={ui.mono}>{String(i + 1).padStart(2, "0")}</span>
              <span data-manifesto-line className="text-[28px] leading-[1.15] tracking-[-0.015em] md:text-[56px]" style={ui.display}>
                {l}
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function StudiosPage() {
  const items = [
    { city: "Legal Entity", addr: "Nexarrow OÜ", lat: "Registry", lon: "17521430", people: "Estonia", est: "OÜ", bg: accents.mint },
    { city: "Tax", addr: "VAT Registration", lat: "VAT No", lon: "EE102992676", people: "EU-ready", est: "VAT", bg: accents.sky },
    { city: "Location", addr: "Tallinn, Estonia", lat: "Region", lon: "Europe", people: "Remote delivery", est: "Base", bg: accents.lilac },
    { city: "Service Area", addr: "Worldwide business clients", lat: "Model", lon: "Remote-first", people: "Global", est: "Clients", bg: accents.lemon },
    { city: "Specialization", addr: "Software · SaaS · AI · Cloud", lat: "Focus", lon: "B2B delivery", people: "Product engineering", est: "Core", bg: accents.blush },
  ];

  return (
    <>
      <Section label="Company" kicker="who we are" title={<>Structured for product delivery,<br />built for global work.</>} tone="sky">
        <p data-reveal className="mb-10 max-w-2xl text-[17px] leading-relaxed" style={ui.sans}>
          Nexarrow operates as an Estonia-based company serving businesses that need
          custom digital systems, platform engineering, AI capabilities, and cloud-backed delivery.
        </p>
        <div className="space-y-3">
          {items.map((s) => (
            <article
              key={s.city}
              data-reveal
              className="grid grid-cols-1 items-center gap-6 rounded-3xl p-6 md:grid-cols-[1fr,1.5fr,1fr,auto] md:p-8"
              style={{ backgroundColor: s.bg }}
            >
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] opacity-70" style={ui.mono}>est. {s.est}</div>
                <h3 className="mt-1 text-[36px] tracking-[-0.02em] text-[#111] md:text-[48px]" style={ui.display}>{s.city}</h3>
              </div>
              <div className="text-[15px] text-[#111]" style={ui.sans}>{s.addr}</div>
              <div className="text-[13px] text-[#111]/70" style={ui.mono}>{s.lat} · {s.lon}</div>
              <div className="text-right text-[14px] text-[#111]" style={ui.mono}>{s.people}</div>
            </article>
          ))}
        </div>
      </Section>
      <HorizontalCities />
      <CTA />
    </>
  );
}

function AwardsPage() {
  const rows = [
    ["Software", "Custom business systems and operational platforms", "Built around real workflows"],
    ["SaaS", "Multi-tenant product development and dashboard experiences", "Scalable product thinking"],
    ["AI", "Assistants, automation, and model-backed product features", "Integrated into business use-cases"],
    ["Cloud", "Deployment, monitoring, scaling, and platform setup", "Production-first infrastructure"],
    ["Frontend", "Fast and maintainable interfaces for product teams", "Usable systems at scale"],
    ["Backend", "APIs, services, data flows, and internal platform logic", "Reliable operational layers"],
  ];

  return (
    <>
      <Section label="Capabilities" kicker="what we bring" title={<>Core technical strengths<br />across the delivery stack.</>} tone="lilac">
        <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5">
          {rows.map(([year, award, project], i) => (
            <div key={i} data-reveal className={`grid grid-cols-[90px,1fr,auto] items-center gap-6 p-6 md:grid-cols-[120px,1fr,auto] md:p-8 ${i > 0 ? "border-t border-black/10 dark:border-white/10" : ""}`}>
              <span className="text-[14px]" style={ui.mono}>{year}</span>
              <span className="text-[20px] tracking-[-0.01em] md:text-[26px]" style={ui.display}>{award}</span>
              <span className="text-[13px] uppercase tracking-[0.18em]" style={ui.mono}>{project}</span>
            </div>
          ))}
        </div>
      </Section>
      <Testimonial />
      <CTA />
    </>
  );
}

/* ─────────────────────────── careers ─────────────────────────── */

function CareersPage() {
  const { go, theme } = useRoute();

  return (
    <>
      <Section label="Careers" kicker="join the team" title={<>Build useful products with us —<br />not just more software.</>} tone="lemon">
        <p data-reveal className="mb-10 max-w-2xl text-[17px] leading-relaxed" style={ui.sans}>
          We look for engineers and collaborators who care about ownership,
          maintainability, delivery quality, and solving real business problems.
        </p>

        <div className="grid gap-5 xl:grid-cols-2">
          {jobs.map((job, idx) => (
            <div
              key={job.slug}
              data-reveal
              className="rounded-3xl p-7"
              style={{
                background: theme === "dark" ? (idx % 2 === 0 ? "#101010" : "#161616") : job.accent,
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] uppercase tracking-[0.18em]" style={ui.mono}>{job.team}</span>
                <span className="text-[12px]" style={ui.mono}>{job.location}</span>
              </div>
              <h3 className="mt-4 text-[28px] tracking-[-0.02em]" style={ui.display}>{job.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed" style={ui.sans}>{job.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {job.stack.slice(0, 4).map((item) => (
                  <span key={item} className="rounded-full bg-white/70 px-3 py-1 text-[12px] text-[#111]" style={ui.mono}>{item}</span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn variant="ink" onClick={() => go(`job.${job.slug}`)}>View details <Arrow /></Btn>
                <Btn variant="paper" onClick={() => go(`apply.${job.slug}`)}>Apply now</Btn>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section label="What candidates want to know" kicker="before they apply" title={<>A clear hiring page should explain<br />the role, the work, and the path.</>} tone="soft">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            ["Role clarity", "Candidates should be able to understand the role, expectations, and stack before applying."],
            ["Company context", "A careers page should explain what the company does and what kind of work the person will contribute to."],
            ["Straight path", "Role details and a direct application form reduce confusion and make the application flow more useful."],
          ].map(([t, d], i) => (
            <SurfaceCard key={t} className="p-6" accent={theme === "dark" ? ["#101010", "#151515", "#1A1A1A"][i] : [accents.mint, accents.sky, accents.blush][i]}>
              <h4 className="text-[22px]" style={ui.display}>{t}</h4>
              <p className="mt-3 text-[14px] leading-relaxed" style={ui.sans}>{d}</p>
            </SurfaceCard>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}

function JobDetailPage({ job }) {
  const { go, theme } = useRoute();
  if (!job) return <HomePage />;

  return (
    <>
      <section style={{ background: theme === "dark" ? "#070707" : job.accent, color: theme === "dark" ? themes.dark.ink : "#111" }} className="overflow-hidden border-t border-black/10">
        <Container className="py-20 md:py-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Pill tone="soft">{job.team}</Pill>
            <button onClick={() => go("careers")} className="text-[12px] uppercase tracking-[0.2em]" style={ui.mono}>
              ← Back to careers
            </button>
          </div>
          <h1 data-reveal className="mt-8 max-w-5xl text-[44px] leading-[1.02] tracking-[-0.025em] md:text-[82px]" style={ui.display}>
            {job.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-3 text-[13px]" style={ui.mono}>
            <span className="rounded-full bg-white/70 px-3 py-1 text-[#111]">{job.location}</span>
            <span className="rounded-full bg-white/70 px-3 py-1 text-[#111]">{job.type}</span>
            <span className="rounded-full bg-white/70 px-3 py-1 text-[#111]">Nexarrow OÜ</span>
          </div>
          <p data-reveal className="mt-8 max-w-2xl text-[18px] leading-relaxed" style={ui.sans}>
            {job.overview}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Btn variant="ink" onClick={() => go(`apply.${job.slug}`)}>Apply for this role <Arrow /></Btn>
            <Btn variant="paper" onClick={() => go("contact")}>Ask a question</Btn>
          </div>
        </Container>
      </section>

      <Section label="Role details" kicker="what this role includes" title={<>Responsibilities,<br />requirements, and fit.</>}>
        <div className="grid gap-6 xl:grid-cols-3">
          <SurfaceCard className="p-7" accent={theme === "dark" ? "#101010" : accents.mint}>
            <h3 className="text-[24px]" style={ui.display}>Responsibilities</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed" style={ui.sans}>
              {job.responsibilities.map((r) => <li key={r}>• {r}</li>)}
            </ul>
          </SurfaceCard>

          <SurfaceCard className="p-7" accent={theme === "dark" ? "#151515" : accents.sky}>
            <h3 className="text-[24px]" style={ui.display}>Requirements</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed" style={ui.sans}>
              {job.requirements.map((r) => <li key={r}>• {r}</li>)}
            </ul>
          </SurfaceCard>

          <SurfaceCard className="p-7" accent={theme === "dark" ? "#1A1A1A" : accents.lilac}>
            <h3 className="text-[24px]" style={ui.display}>Nice to have</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed" style={ui.sans}>
              {job.niceToHave.map((r) => <li key={r}>• {r}</li>)}
            </ul>
          </SurfaceCard>
        </div>
      </Section>

      <Section label="Role stack" kicker="tools and environment" title={<>The technologies most relevant<br />to this role.</>} tone="soft">
        <div className="flex flex-wrap gap-3">
          {job.stack.map((item, i) => (
            <span
              key={item}
              className="rounded-full px-4 py-2 text-[13px]"
              style={{
                ...ui.mono,
                background: theme === "dark"
                  ? ["#101010", "#151515", "#1A1A1A", "#0F0F0F", "#131313", "#171717"][i % 6]
                  : [accents.mint, accents.sky, accents.lilac, accents.lemon, accents.blush, accents.peach][i % 6],
                color: theme === "dark" ? themes.dark.ink : "#111",
                border: `1px solid ${theme === "dark" ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)"}`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}

function ApplyPage({ job }) {
  const { go, theme } = useRoute();
  if (!job) return <HomePage />;

  return (
    <>
      <section style={{ background: theme === "dark" ? "#070707" : job.accent, color: theme === "dark" ? themes.dark.ink : "#111" }} className="overflow-hidden border-t border-black/10">
        <Container className="py-20 md:py-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Pill tone="soft">Apply now</Pill>
            <button onClick={() => go(`job.${job.slug}`)} className="text-[12px] uppercase tracking-[0.2em]" style={ui.mono}>
              ← Back to role
            </button>
          </div>
          <h1 data-reveal className="mt-8 max-w-4xl text-[44px] leading-[1.02] tracking-[-0.025em] md:text-[78px]" style={ui.display}>
            Apply for {job.title}
          </h1>
          <p data-reveal className="mt-6 max-w-2xl text-[18px] leading-relaxed" style={ui.sans}>
            Send your resume and relevant profile links to our hiring email for review.
          </p>
        </Container>
      </section>

      <Section label="Application" kicker="how to apply" title={<>Send your resume directly<br />to our inbox.</>} tone="soft">
        <div className="grid gap-10 xl:grid-cols-[1.2fr,.8fr]">
          <SurfaceCard
            className="p-8 md:p-10"
            accent={theme === "dark" ? "#101010" : "#FFFFFF"}
          >
            <div className="text-[12px] uppercase tracking-[0.18em]" style={ui.mono}>
              Careers email
            </div>
            <h3 className="mt-4 text-[34px] tracking-[-0.02em] md:text-[44px]" style={ui.display}>
              Send your resume at
            </h3>
            <a
              href="mailto:thenexarrow@gmail.com"
              className="mt-5 inline-block text-[22px] underline underline-offset-4 md:text-[28px]"
              style={{ ...ui.display, color: theme === "dark" ? themes.dark.ink : "#111" }}
            >
              thenexarrow@gmail.com
            </a>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={ui.sans}>
              Please include the role title, your resume, portfolio or GitHub links, and a short note about your relevant experience.
            </p>
          </SurfaceCard>

          <div className="space-y-4">
            <SurfaceCard className="p-6" accent={theme === "dark" ? "#101010" : accents.mint}>
              <div className="text-[12px] uppercase tracking-[0.18em]" style={ui.mono}>Role</div>
              <h3 className="mt-3 text-[28px] leading-[1.05]" style={ui.display}>{job.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed" style={ui.sans}>{job.summary}</p>
            </SurfaceCard>

            <SurfaceCard className="p-6" accent={theme === "dark" ? "#151515" : accents.sky}>
              <div className="text-[12px] uppercase tracking-[0.18em]" style={ui.mono}>Details</div>
              <div className="mt-4 space-y-3 text-[14px]" style={ui.sans}>
                <p><strong>Team:</strong> {job.team}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p><strong>Company:</strong> Nexarrow OÜ</p>
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-6" accent={theme === "dark" ? "#1A1A1A" : accents.lilac}>
              <div className="text-[12px] uppercase tracking-[0.18em]" style={ui.mono}>What to include</div>
              <ul className="mt-4 space-y-3 text-[14px] leading-relaxed" style={ui.sans}>
                <li>• Resume or CV.</li>
                <li>• Relevant experience and projects.</li>
                <li>• Portfolio, GitHub, or shipped work links.</li>
                <li>• Availability and preferred way of working.</li>
              </ul>
            </SurfaceCard>
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}

/* ─────────────────────────── services ─────────────────────────── */

function ServicesPage() {
  return (
    <>
      <Section label="Services" kicker="what we build" title={<>Technology services aligned<br />with business execution.</>} tone="blush">
        <FeaturedServicesCards />
      </Section>
      <Approach />
      <PricingGlance />
      <CTA />
    </>
  );
}

function ServiceDetail({ bg, fg, tag, title, subtitle, body, deliverables, stack, process, caseTitle, caseClient }) {
  const { go, theme } = useRoute();

  return (
    <>
      <section style={{ backgroundColor: theme === "dark" ? "#070707" : bg, color: theme === "dark" ? themes.dark.ink : fg }} className="overflow-hidden border-t border-black/10">
        <Container className="py-20 md:py-28">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/30 px-3 py-1 text-[11px] uppercase tracking-[0.18em]" style={ui.mono}>{tag}</span>
            <button onClick={() => go("services")} className="text-[12px] uppercase tracking-[0.2em] opacity-80 hover:opacity-100" style={ui.mono}>← All services</button>
          </div>
          <h1 data-reveal className="mt-10 max-w-5xl text-[44px] leading-[1.02] tracking-[-0.025em] md:text-[88px]" style={ui.display}>{title}</h1>
          <p data-reveal className="mt-6 max-w-2xl text-[18px] leading-relaxed opacity-90" style={ui.sans}>{subtitle}</p>
        </Container>
      </section>

      <Section label="Overview" title={<>What this service<br />includes in practice.</>} tone="default">
        <div className="grid gap-12 lg:grid-cols-[1.4fr,1fr]">
          <div className="space-y-5 text-[17px] leading-relaxed" style={ui.sans}>
            {body.map((p, i) => (<p key={i} data-reveal>{p}</p>))}
          </div>
          <SurfaceCard className="p-8">
            <h4 className="text-[12px] uppercase tracking-[0.2em]" style={ui.mono}>Tools & stack</h4>
            <ul className="mt-6 space-y-3 text-[14px]" style={ui.sans}>
              {stack.map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />{s}
                </li>
              ))}
            </ul>
          </SurfaceCard>
        </div>
      </Section>

      <Section label="Deliverables" kicker="what you receive" title={<>Practical outputs,<br />not vague promises.</>} tone="soft">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {deliverables.map((d, i) => (
            <div key={d.title} data-reveal className="rounded-2xl p-6" style={{
              background: theme === "dark"
                ? ["#101010", "#151515", "#1A1A1A", "#0F0F0F", "#131313", "#171717"][i % 6]
                : [accents.mint, accents.sky, accents.lilac, accents.lemon, accents.blush, accents.peach][i % 6],
              border: `1px solid ${theme === "dark" ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)"}`
            }}>
              <h4 className="text-[20px] tracking-[-0.01em]" style={ui.display}>{d.title}</h4>
              <p className="mt-3 text-[14px] leading-relaxed" style={ui.sans}>{d.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Engagement flow" kicker="how delivery happens" title="A typical project path from planning to release." tone="default">
        <ol className="space-y-4">
          {process.map((p, i) => (
            <li key={p.t} data-reveal className="flex gap-6 rounded-2xl p-6 border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5">
              <div className="w-16 shrink-0 text-[12px] uppercase tracking-[0.18em]" style={ui.mono}>Step {i + 1}</div>
              <div>
                <div className="text-[20px] tracking-[-0.01em]" style={ui.display}>{p.t}</div>
                <p className="mt-2 text-[14px] leading-relaxed" style={ui.sans}>{p.c}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <section className="border-t border-white/10 bg-[#0E0E0E] text-white">
        <Container className="py-24">
          <Pill tone="paper">Typical outcome</Pill>
          <h3 data-reveal className="mt-6 max-w-4xl text-[34px] leading-[1.1] tracking-[-0.015em] md:text-[56px]" style={ui.display}>{caseTitle}</h3>
          <p className="mt-4 text-[14px] text-white/60" style={ui.mono}>— {caseClient}</p>
        </Container>
      </section>

      <CTA />
    </>
  );
}

function WebDevPage() {
  return (
    <ServiceDetail
      bg={accents.mint}
      fg="#0E2A22"
      tag="Service 01"
      title={<>Custom software development<br />for operational clarity.</>}
      subtitle="We build software systems, platforms, dashboards, and internal tools tailored to how your business actually works."
      body={[
        "This service is for companies that need software built around their own workflows instead of being forced into generic tools that create friction.",
        "We handle product planning, frontend interfaces, backend systems, APIs, integrations, and deployment with a focus on maintainability and real-world usage.",
        "Whether the goal is streamlining operations, centralizing data, improving reporting, or enabling new digital services, the software is built to support long-term business utility.",
      ]}
      stack={[
        "React · Next.js · TypeScript",
        "Node.js · Express · NestJS",
        "PostgreSQL · MongoDB · Redis",
        "REST APIs · WebSockets · Integrations",
        "Auth · RBAC · Admin systems",
        "Docker · CI/CD · Cloud deployment",
      ]}
      deliverables={[
        { title: "Discovery & scoping", copy: "Feature scope, technical direction, delivery plan, and implementation priorities." },
        { title: "Production application", copy: "A working software product ready for real use and future expansion." },
        { title: "Backend architecture", copy: "APIs, services, data models, workflows, and system logic." },
        { title: "Frontend experience", copy: "Usable and maintainable interfaces for business users, teams, or customers." },
        { title: "Deployment setup", copy: "Configured environments, release process, and operational readiness." },
        { title: "Handover support", copy: "Knowledge transfer, refinements, and ongoing iteration support if needed." },
      ]}
      process={[
        { t: "Discovery", c: "Understand the workflow, pain points, users, and expected result." },
        { t: "Architecture", c: "Define structure, data flows, modules, and delivery priorities." },
        { t: "Build foundation", c: "Set up the codebase, environments, core modules, and product scaffolding." },
        { t: "Implement", c: "Ship the main business flows, integrations, and product interface." },
        { t: "Test & refine", c: "Improve usability, stability, and production readiness." },
        { t: "Launch", c: "Deploy, observe, iterate, and support the next stage of adoption." },
      ]}
      caseTitle="A tailored business platform that replaces fragmented manual workflows with one reliable operational system."
      caseClient="Custom software engagement"
    />
  );
}

function UiDevPage() {
  return (
    <ServiceDetail
      bg={accents.sky}
      fg="#0D2231"
      tag="Service 02"
      title={<>SaaS platform development<br />for scalable product growth.</>}
      subtitle="We build SaaS products with strong product structure, maintainable interfaces, tenant-aware systems, and room to grow."
      body={[
        "This service is suited to founders and teams building subscription products, dashboards, customer portals, or platform-based digital services.",
        "We approach SaaS as both a product and a system: user journeys, roles, onboarding, billing, permissions, analytics, and maintainable architecture all matter together.",
        "The result is a product that is easier to release, easier to improve, and more stable as customer usage and feature depth increase.",
      ]}
      stack={[
        "React · Next.js · TypeScript",
        "Design systems · Component libraries",
        "Billing flows · Tenant-aware logic",
        "Authentication · Roles · Permissions",
        "Analytics dashboards · Product UX",
        "Testing · CI/CD · Release workflows",
      ]}
      deliverables={[
        { title: "Product architecture", copy: "A structured plan for modules, tenants, roles, billing, and core product workflows." },
        { title: "Frontend system", copy: "Reusable UI foundations for scalable feature development." },
        { title: "Dashboard experience", copy: "Clear product interfaces for users, admins, and teams." },
        { title: "Account workflows", copy: "Onboarding, authentication, billing, and settings foundations." },
        { title: "Admin capability", copy: "Management tools for support, operations, and visibility." },
        { title: "Scale readiness", copy: "Code organization and product structure for sustainable growth." },
      ]}
      process={[
        { t: "Product mapping", c: "Clarify personas, product surface, permissions, and core flows." },
        { t: "System planning", c: "Define the tenant model, feature boundaries, and product layout." },
        { t: "Foundation setup", c: "Build reusable components and product architecture." },
        { t: "Feature delivery", c: "Implement subscription, dashboard, settings, and user workflows." },
        { t: "Stabilization", c: "Refine UX, reliability, and growth-related product concerns." },
        { t: "Release & support", c: "Launch the platform and improve it through real usage feedback." },
      ]}
      caseTitle="A scalable SaaS platform with structured billing, dashboards, user roles, and maintainable product foundations."
      caseClient="SaaS product engagement"
    />
  );
}

function CloudPage() {
  return (
    <ServiceDetail
      bg={accents.lilac}
      fg="#240E3A"
      tag="Service 03"
      title={<>Cloud infrastructure and deployment<br />built for reliability.</>}
      subtitle="We design and implement cloud foundations that support performance, deployment confidence, and operational visibility."
      body={[
        "Infrastructure is not an afterthought. It directly affects release speed, uptime, observability, scaling, and the day-to-day confidence of the product team.",
        "We help define hosting strategy, environments, CI/CD, logging, monitoring, deployment processes, and the practical setup needed for stable production systems.",
        "This includes infrastructure planning for custom software, SaaS products, APIs, AI services, and internal business systems.",
      ]}
      stack={[
        "AWS · Cloudflare · Vercel · Hetzner",
        "Docker · CI/CD · GitHub Actions",
        "Monitoring · Logging · Alerting",
        "Environment strategy · Secrets management",
        "Reverse proxies · Caching · CDN",
        "Scaling patterns · Reliability workflows",
      ]}
      deliverables={[
        { title: "Cloud strategy", copy: "Recommended hosting and infrastructure setup based on the product’s needs." },
        { title: "Deployment pipelines", copy: "Automated release workflows for development, staging, and production." },
        { title: "Operational setup", copy: "Monitoring, logs, health visibility, and failure detection." },
        { title: "Environment management", copy: "Clear handling of secrets, configs, domains, and system dependencies." },
        { title: "Performance support", copy: "Caching, asset delivery, infrastructure tuning, and production optimization." },
        { title: "Maintenance readiness", copy: "A setup that is easier to operate, support, and extend over time." },
      ]}
      process={[
        { t: "Assessment", c: "Review the application needs, risks, and operational expectations." },
        { t: "Architecture", c: "Select providers, environments, networking patterns, and deployment model." },
        { t: "Implementation", c: "Set up hosting, build pipelines, release flows, and infrastructure support." },
        { t: "Visibility", c: "Add observability, logs, uptime checks, and operational awareness." },
        { t: "Hardening", c: "Improve reliability, performance, and deployment confidence." },
        { t: "Support", c: "Refine the setup as usage grows and product needs evolve." },
      ]}
      caseTitle="A production environment that supports repeatable releases, visibility into system health, and room for growth."
      caseClient="Cloud infrastructure engagement"
    />
  );
}

function AppDevPage() {
  return (
    <ServiceDetail
      bg={accents.lemon}
      fg="#2A2A0E"
      tag="Service 04"
      title={<>AI solutions that connect<br />to real business workflows.</>}
      subtitle="We build AI-enabled systems, assistants, automations, and product features that reduce repetitive work and improve decision speed."
      body={[
        "AI becomes useful when it fits into the real work a business is already doing. That may include summarization, retrieval, internal assistants, workflow automation, content generation, or support tooling.",
        "We focus on business-specific usefulness: what data the model should use, where it fits in the workflow, how accuracy is managed, and how the experience is integrated into the product.",
        "This service can be delivered as a standalone AI feature, an internal AI tool, or as part of a larger software or SaaS platform.",
      ]}
      stack={[
        "LLM APIs · Prompt workflows · RAG",
        "Embeddings · Vector search · Retrieval",
        "Chat interfaces · AI assistants",
        "Automation pipelines · Business workflows",
        "Node.js · Python · API integrations",
        "Monitoring · Guardrails · Human review flows",
      ]}
      deliverables={[
        { title: "AI use-case design", copy: "A clear definition of where AI adds actual value in the workflow." },
        { title: "Model integration", copy: "Connected AI behavior inside your product, system, or internal process." },
        { title: "Retrieval workflow", copy: "Context-aware responses using your own documents or data sources." },
        { title: "Automation logic", copy: "Task reduction through smart processing, routing, and generation." },
        { title: "Interface layer", copy: "Usable AI experiences for teams, operators, or end users." },
        { title: "Control framework", copy: "Review flows, prompt discipline, and quality safeguards where needed." },
      ]}
      process={[
        { t: "Use-case discovery", c: "Identify where AI can remove friction or improve throughput." },
        { t: "Data & context design", c: "Define knowledge sources, constraints, and workflow boundaries." },
        { t: "Prototype", c: "Build a testable AI flow around the selected use-case." },
        { t: "Integration", c: "Embed the AI capability into the system, product, or process." },
        { t: "Validation", c: "Review usefulness, reliability, and user interaction patterns." },
        { t: "Iteration", c: "Improve prompts, retrieval, controls, and production readiness." },
      ]}
      caseTitle="An AI-driven workflow that reduces repetitive effort while keeping business context and control intact."
      caseClient="AI solutions engagement"
    />
  );
}

/* ─────────────────────────── contact ─────────────────────────── */

function ContactPage() {
  const { theme } = useRoute();

  return (
    <Section label="Contact" kicker="company details" title={<>Get in touch<br />with Nexarrow.</>} tone="mint">
      <div className="grid gap-6 xl:grid-cols-3">
        <SurfaceCard className="p-8" accent={theme === "dark" ? "#101010" : "#FFFFFF"}>
          <div className="text-[12px] uppercase tracking-[0.18em]" style={ui.mono}>Email</div>
          <h3 className="mt-4 text-[20px] leading-[1.05] md:text-[27px]" style={ui.display}>
            thenexarrow@gmail.com
          </h3>
          <a
            href="mailto:thenexarrow@gmail.com"
            className="mt-5 inline-flex items-center gap-2 text-[15px] underline underline-offset-4"
            style={ui.sans}
          >
            Send email <Arrow />
          </a>
        </SurfaceCard>

        <SurfaceCard className="p-8" accent={theme === "dark" ? "#151515" : accents.sky}>
          <div className="text-[12px] uppercase tracking-[0.18em]" style={ui.mono}>Company</div>
          <div className="mt-4 space-y-2 text-[16px] leading-relaxed" style={ui.sans}>
            <p>Nexarrow OÜ</p>
            <p>Tallinn, Estonia</p>
            <p>Registry Code: 17521430</p>
            <p>VAT No: EE102992676</p>
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-8" accent={theme === "dark" ? "#1A1A1A" : accents.lilac}>
          <div className="text-[12px] uppercase tracking-[0.18em]" style={ui.mono}>Services</div>
          <p className="mt-4 text-[16px] leading-relaxed" style={ui.sans}>
            Software development, SaaS platforms, AI solutions, and cloud infrastructure for businesses worldwide.
          </p>
        </SurfaceCard>
      </div>
    </Section>
  );
}

/* ─────────────────────────── legal ─────────────────────────── */

function LegalPage({ title, intro, sections }) {
  const { theme } = useRoute();
  const c = themes[theme];

  return (
    <Section label="Legal" kicker="updated for website use" title={title} tone="default">
      <div className="grid gap-12 xl:grid-cols-[1fr,2.2fr]">
        {/* <aside className="xl:sticky xl:top-24 xl:self-start">
          <nav className="rounded-2xl p-6" style={{ background: c.card, border: `1px solid ${c.lineStrong}` }}>
            <h4 className="text-[12px] uppercase tracking-[0.2em]" style={ui.mono}>Contents</h4>
            <ol className="mt-4 space-y-2 text-[14px]" style={ui.sans}>
              {sections.map((s, i) => (
                <li key={s.h}><a href={`#sec-${i}`} className="hover:underline">{String(i + 1).padStart(2, "0")} · {s.h}</a></li>
              ))}
            </ol>
          </nav>
        </aside> */}

        <article className="space-y-12 text-[16px] leading-relaxed" style={ui.sans}>
          <p className="text-[18px] leading-relaxed">{intro}</p>
          {sections.map((s, i) => (
            <section key={s.h} id={`sec-${i}`} className="border-t border-black/10 pt-8 dark:border-white/10">
              <h3 data-reveal className="text-[26px] tracking-[-0.01em] md:text-[34px]" style={ui.display}>
                {String(i + 1).padStart(2, "0")}. {s.h}
              </h3>
              <div className="mt-4 space-y-4">{s.p.map((p, j) => (<p key={j}>{p}</p>))}</div>
            </section>
          ))}
        </article>
      </div>
    </Section>
  );
}

function PrivacyPage() {
  return (
    <LegalPage
      title={<>Privacy Policy.</>}
      intro="This Privacy Policy explains how Nexarrow OÜ collects, uses, stores, and protects personal data in connection with this website, enquiries, business communications, and service delivery."
      sections={[
        {
          h: "Data controller",
          p: [
            "The controller for personal data processed under this policy is Nexarrow OÜ, Harju maakond, Tallinn, Kesklinna linnaosa, Tornimäe tn 5, 10145, Estonia.",
            "Registry Code: 17521430. VAT No: EE102992676.",
            "Privacy-related questions and requests may be sent to thenexarrow@mail.com."
          ]
        },
        {
          h: "Company details",
          p: [
            "Nexarrow OÜ is registered in Tallinn, Estonia.",
            "Field of Activity: K TELECOMMUNICATION, COMPUTER PROGRAMMING, CONSULTING, COMPUTING INFRASTRUCTURE AND OTHER INFORMATION SERVICE ACTIVITIES.",
            "Activity Code: 62101 Computer programming activities."
          ]
        },
        {
          h: "What personal data we collect",
          p: [
            "We may collect contact and identification data such as name, email address, company name, job title, and any information you choose to submit through forms, email, or project enquiries.",
            "We may also collect limited technical and usage data such as IP address, device or browser information, log timestamps, and website interaction data where needed for security, analytics, or service improvement.",
            "If you become a client, contractor, or supplier, we may also process business, contractual, project, billing, and communications information needed to provide services and run our operations."
          ]
        },
        {
          h: "How we collect data",
          p: [
            "We collect personal data directly from you when you contact us, submit an enquiry, apply for a role, request a proposal, or otherwise communicate with us.",
            "Some technical data may also be collected automatically through website infrastructure, logs, hosting systems, security layers, or analytics tools used in connection with operating the site."
          ]
        },
        {
          h: "Purposes and legal bases",
          p: [
            "We process personal data to respond to enquiries, communicate with prospects, evaluate candidates, provide services, manage projects, maintain security, comply with legal obligations, and improve our website or delivery processes.",
            "Depending on context, the legal basis may include pre-contractual steps, performance of a contract, compliance with legal obligations, legitimate interests, or consent where consent is specifically required."
          ]
        },
        {
          h: "Recipients and processors",
          p: [
            "Personal data may be shared with service providers that support hosting, cloud infrastructure, communications, analytics, applicant handling, project delivery, security, payment, or professional advisory functions.",
            "Where required for operations, Nexarrow OÜ may use third-party providers such as hosting, infrastructure, analytics, communications, development, payment, AI, or support tools."
          ]
        },
        {
          h: "International transfers",
          p: [
            "Where personal data is transferred outside the European Economic Area, we will do so only where a lawful transfer mechanism applies, such as an adequacy decision or appropriate safeguards including Standard Contractual Clauses."
          ]
        },
        {
          h: "Data retention",
          p: [
            "We retain personal data only for as long as necessary for the purpose for which it was collected, including legal, accounting, tax, dispute, security, and contractual reasons.",
            "Retention periods may vary depending on the nature of the relationship, the category of data, and applicable legal obligations."
          ]
        },
        {
          h: "Your rights",
          p: [
            "Under the GDPR, data subjects may have rights including access, rectification, erasure, restriction, objection, and data portability, subject to applicable legal limits.",
            "Where processing is based on consent, consent may be withdrawn at any time without affecting prior lawful processing.",
            "Data subjects also have the right to lodge a complaint with a competent supervisory authority."
          ]
        },
        {
          h: "Security",
          p: [
            "We use reasonable technical and organisational measures designed to protect personal data against unauthorised access, misuse, alteration, loss, or disclosure."
          ]
        },
        {
          h: "Cookies and analytics",
          p: [
            "This website may use cookies, analytics, tracking technologies, session tools, or embedded services where necessary for website functionality, security, analytics, or performance improvement.",
            "Where non-essential cookies or similar technologies are used, they should be managed in accordance with applicable legal requirements."
          ]
        },
        {
          h: "Contact and updates",
          p: [
            "Questions or requests relating to this policy and personal data should be sent to thenexarrow@mail.com.",
            "We may update this policy from time to time to reflect legal, technical, or operational changes. The latest version should be available on this website with an effective date."
          ]
        },
      ]}
    />
  );
}
function TermsPage() {
  return (
    <LegalPage
      title={<>Terms & Conditions.</>}
      intro="These Terms & Conditions govern access to and use of this website and any general interaction with Nexarrow OÜ through the site. They do not replace any separate proposal, NDA, statement of work, master services agreement, or other signed commercial contract."
      sections={[
        {
          h: "Company information",
          p: [
            "This website is operated by Nexarrow OÜ, Harju maakond, Tallinn, Kesklinna linnaosa, Tornimäe tn 5, 10145, Estonia.",
            "Registry Code: 17521430. VAT No: EE102992676.",
            "General and legal contact: thenexarrow@mail.com.",
            "Field of Activity: K TELECOMMUNICATION, COMPUTER PROGRAMMING, CONSULTING, COMPUTING INFRASTRUCTURE AND OTHER INFORMATION SERVICE ACTIVITIES.",
            "Activity Code: 62101 Computer programming activities."
          ]
        },
        {
          h: "Acceptance of terms",
          p: [
            "By accessing or using this website, you agree to be bound by these Terms & Conditions and applicable laws. If you do not agree, you should not use the website."
          ]
        },
        {
          h: "Website purpose",
          p: [
            "This website is provided for general informational and business communication purposes. Content on the website does not by itself constitute professional, legal, financial, or technical advice and does not create a contractual relationship."
          ]
        },
        {
          h: "Service engagements",
          p: [
            "Any software development, SaaS, AI, cloud, consulting, or related services offered by Nexarrow OÜ are subject to separate commercial discussion and, where applicable, a signed agreement.",
            "No project will be considered accepted or binding solely because a user submits information through this website."
          ]
        },
        {
          h: "Intellectual property",
          p: [
            "Unless otherwise stated, website content, text, branding, design, code examples, graphics, and other materials are owned by or licensed to Nexarrow OÜ and protected by applicable intellectual property laws.",
            "You may not copy, reproduce, republish, distribute, modify, or exploit website materials except as permitted by law or with prior written permission."
          ]
        },
        {
          h: "Acceptable use",
          p: [
            "You agree not to misuse the website, interfere with its operation, attempt unauthorised access, test vulnerabilities without permission, upload harmful material, infringe rights, or use the website for unlawful, abusive, or fraudulent purposes."
          ]
        },
        {
          h: "Third-party services and links",
          p: [
            "This website may reference or link to third-party websites, tools, or platforms. Nexarrow OÜ is not responsible for the content, terms, or practices of third-party services."
          ]
        },
        {
          h: "Disclaimer",
          p: [
            "The website and its contents are provided on an 'as is' and 'as available' basis to the extent permitted by applicable law.",
            "We do not guarantee uninterrupted availability, complete accuracy, or error-free operation of the website."
          ]
        },
        {
          h: "Limitation of liability",
          p: [
            "To the fullest extent permitted by applicable law, Nexarrow OÜ shall not be liable for indirect, incidental, consequential, special, or punitive damages arising out of or related to the use of, or inability to use, this website.",
            "Nothing in these terms excludes liability where liability cannot lawfully be excluded or limited."
          ]
        },
        {
          h: "Privacy and data protection",
          p: [
            "Use of the website may involve the processing of personal data. Please also review the Privacy Policy for information about how personal data is handled in connection with the website and related communications."
          ]
        },
        {
          h: "Changes to the website or terms",
          p: [
            "We may modify, suspend, or discontinue any part of the website at any time.",
            "We may also update these Terms & Conditions from time to time by publishing a revised version on the website."
          ]
        },
        {
          h: "Governing law and jurisdiction",
          p: [
            "These Terms & Conditions shall be governed by and interpreted in accordance with the laws applicable to Nexarrow OÜ in Estonia, unless mandatory law requires otherwise.",
            "Any disputes relating to these terms shall be subject to the competent courts of Estonia unless another forum is required by mandatory law or by a separately signed agreement."
          ]
        },
      ]}
    />
  );
}

/* ─────────────────────────── helpers ─────────────────────────── */

function FieldTextarea({ label, value, onChange }) {
  const { theme } = useRoute();
  const c = themes[theme];

  return (
    <div>
      <label className="mb-2 block text-[12px] uppercase tracking-[0.2em]" style={ui.mono}>{label}</label>
      <textarea
        rows={6}
        value={value}
        onChange={onChange}
        className="w-full rounded-md bg-transparent p-3 text-[15px] outline-none"
        style={{ ...ui.sans, border: `1px solid ${c.lineStrong}`, color: c.ink }}
      />
    </div>
  );
}

/* ─────────────────────────── page switch ─────────────────────────── */

function PageSwitch({ route }) {
  useScrollReveals([route]);

  const jobSlug = route.startsWith("job.") ? route.replace("job.", "") : null;
  const applySlug = route.startsWith("apply.") ? route.replace("apply.", "") : null;
  const articleSlug = route.startsWith("article.") ? route.replace("article.", "") : null;

  const activeJob = jobs.find((j) => j.slug === jobSlug);
  const applyJob = jobs.find((j) => j.slug === applySlug);
  const activeArticle = insights.find((a) => a.slug === articleSlug);

  const pages = {
  home: <HomePage />,
  about: <AboutPage />,
  services: <ServicesPage />,
  "service.web": <WebDevPage />,
  "service.ui": <UiDevPage />,
  "service.cloud": <CloudPage />,
  "service.app": <AppDevPage />,
  manifesto: <ManifestoPage />,
  journal: <JournalPage />,
  studios: <StudiosPage />,
  awards: <AwardsPage />,
  careers: <CareersPage />,
  contact: <ContactPage />,
  privacy: <PrivacyPage />,
  terms: <TermsPage />,
};

let current = pages[route] || <HomePage />;

if (activeJob) current = <JobDetailPage job={activeJob} />;
if (applyJob) current = <ApplyPage job={applyJob} />;
if (activeArticle) current = <ArticleDetailPage article={activeArticle} />;

return (
  <AnimatePresence mode="wait">
    <motion.div
      key={route}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {current}
    </motion.div>
  </AnimatePresence>
);
}

/* ─────────────────────────── app root ─────────────────────────── */

export default function Nexarrow() {
  useGoogleFonts();
  useLenis();
  const { theme, setTheme } = useThemeMode();
  const [route, setRoute] = useState("home");

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      document.body.style.background = themes[theme].paper;
      document.body.style.color = themes[theme].ink;
    }
  }, [theme]);

  const go = useMemo(
    () => (key) => {
      setRoute(key);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" });
        setTimeout(() => ScrollTrigger.refresh(), 50);
      }
    },
    [],
  );

  return (
    <RouterCtx.Provider value={{ route, go, theme, setTheme }}>
      <div
        style={{ backgroundColor: themes[theme].paper, color: themes[theme].ink, ...ui.sans }}
        className="min-h-screen transition-colors"
      >
        <Header />
        <main>
          <PageSwitch route={route} />
        </main>
        <Footer />
      </div>
    </RouterCtx.Provider>
  );
}