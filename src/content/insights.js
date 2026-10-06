/**
 * Insight articles. `photo` is the cover photograph (free-licence stock, credited
 * on the page); `hero` picks the generated cover art used if a photo is absent.
 */

export const insights = [
  {
    slug: "custom-software-vs-forced-tools",
    photo: {
      src: "https://images.unsplash.com/photo-1783115259399-3a5a3e0e4592?auto=format&fit=crop&w=2000&q=80",
      alt: "Hands typing on a laptop showing an inventory spreadsheet at an office desk",
      credit: "Gorilla ROI Data Connector",
      source: "Unsplash",
      href: "https://unsplash.com/photos/hands-typing-on-a-laptop-displaying-a-data-spreadsheet-9fZuqBYlV1w",
    },
    tag: "Insight",
    date: "May 2026",
    read: "6 min",
    title: "When custom software is a better investment than forcing tools to fit.",
    excerpt:
      "A practical look at the moment when spreadsheets, disconnected SaaS tools, and manual workarounds begin costing more than building the right internal system.",
    accent: "lime",
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
    photo: {
      src: "https://images.pexels.com/photos/4483942/pexels-photo-4483942.jpeg?auto=compress&cs=tinysrgb&w=2000",
      alt: "Warehouse worker scanning stock with a handheld barcode scanner",
      credit: "Tiger Lily",
      source: "Pexels",
      href: "https://www.pexels.com/photo/photo-of-a-man-scanning-products-in-a-warehouse-4483942/",
    },
    tag: "AI",
    date: "Apr 2026",
    read: "5 min",
    title: "How AI features become valuable only when connected to actual operations.",
    excerpt:
      "Why AI is most useful when it is embedded into business workflows, context, approvals, and action paths instead of staying as an isolated demo feature.",
    accent: "mist",
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
    photo: {
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80",
      alt: "Data centre server rack with neatly bundled network cables",
      credit: "Taylor Vick",
      source: "Unsplash",
      href: "https://unsplash.com/photos/cable-network-M5tzZtFCOfs",
    },
    tag: "Cloud",
    date: "Mar 2026",
    read: "7 min",
    title: "Infrastructure decisions that reduce friction later in the product lifecycle.",
    excerpt:
      "Deployment, observability, environment structure, and release discipline often decide whether a growing product becomes easier or harder to operate.",
    accent: "sand",
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
    photo: {
      src: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&w=2000&q=80",
      alt: "Developer at a desk writing code, the editor visible on the monitor",
      credit: "Mohammad Rahmani",
      source: "Unsplash",
      href: "https://unsplash.com/photos/man-in-black-long-sleeve-shirt-using-computer-_Fx34KeqIEw",
    },
    tag: "SaaS",
    date: "Feb 2026",
    read: "5 min",
    title: "Building SaaS products that stay maintainable after feature growth.",
    excerpt:
      "A strong SaaS foundation depends on product structure, consistent interface systems, and architecture that remains understandable as the roadmap expands.",
    accent: "sky",
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
    photo: {
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2000&q=80",
      alt: "Office team at their desks working on computers",
      credit: "Tim van der Kuip",
      source: "Unsplash",
      href: "https://unsplash.com/photos/man-sitting-on-chair-wearing-gray-crew-neck-long-sleeved-shirt-using-apple-magic-keyboard-CPs2X8JYmS8",
    },
    tag: "Product",
    date: "Jan 2026",
    read: "4 min",
    title: "Why internal tools often deserve better engineering than they receive.",
    excerpt:
      "Internal systems influence speed, accuracy, approvals, reporting, and coordination more directly than many businesses realize.",
    accent: "ice",
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
    photo: {
      src: "https://images.unsplash.com/photo-1677506050775-18ac86b9c2c0?auto=format&fit=crop&w=2000&q=80",
      alt: "Two colleagues mapping a plan with sticky notes on a whiteboard",
      credit: "Paymo",
      source: "Unsplash",
      href: "https://unsplash.com/photos/two-women-standing-in-front-of-a-white-board-cD6KxGylYo4",
    },
    tag: "Engineering",
    date: "Dec 2025",
    read: "8 min",
    title: "The difference between shipping features and improving a business process.",
    excerpt:
      "Feature output is not the same as operational improvement. Strong product work connects delivery to changed behaviour, reduced friction, or better decisions.",
    accent: "slate",
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

export function getInsight(slug) {
  return insights.find((a) => a.slug === slug);
}
