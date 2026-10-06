/**
 * Playbooks, each with its own page under /work, told as a story: the
 * situation, the problem, how we would approach it, what we would build, how
 * it would ship, the outcome we design for, and what happens after launch.
 *
 * A playbook (`concept: true`) describes how a typical engagement runs for a
 * common problem, with a typical client and design-goal figures; the site
 * presents it as a playbook, never as past work. A real client project, once
 * it can be shown with permission, goes in with `concept: false`, the actual
 * client and measured figures, and is tagged "Client project".
 *
 * `visual` names the illustration in components/site/visuals.jsx; `photo` is
 * an optional stock photograph (Unsplash or Pexels licence; the credit is
 * kept here for the record).
 */

export const caseStudies = [
  {
    slug: "approval-workflow",
    photo: {
      src: "https://images.unsplash.com/photo-1762427354051-a9bdb181ae3b?auto=format&fit=crop&w=2000&q=80",
      alt: "Office desk with finance paperwork, printed charts, binders and a calculator",
      credit: "Cht Gsml",
      source: "Unsplash",
      href: "https://unsplash.com/photos/desk-with-calculator-charts-and-binders-FVwy7PBiSUo",
    },
    concept: true,
    sector: "Operations",
    client: "A wholesale distributor, about 60 staff across two warehouses",
    title: "Purchase approvals, out of email",
    summary: "One system for requests, approvals and the ERP, replacing an inbox and three spreadsheets.",
    offer: "Project Build",
    duration: "7 weeks",
    team: "Founder-led, two engineers",
    visual: "flow",
    service: "software-development",
    metric: { value: "3 days → same day", label: "Design goal for approval turnaround" },
    outcomes: [
      { value: "Same day", label: "Approval for an urgent request raised in the morning" },
      { value: "0", label: "Orders typed into the ERP twice" },
      { value: "100%", label: "Decisions with a named approver and a timestamp" },
    ],
    situation: [
      "Every purchase starts the same way. Someone in the warehouse fills in a spreadsheet and emails it to their manager. The manager forwards it to finance, finance checks the budget in another spreadsheet, and once it is approved someone types the order into the ERP by hand.",
      "It worked when the company had one warehouse and a short supplier list. With a second site and twice the volume, requests started getting lost in inboxes. Urgent orders were chased by phone, and finance spent the last days of every month reconciling what had actually been ordered.",
    ],
    problem: {
      lead: "The process had not failed. It had outgrown the tools it was built on.",
      points: [
        "No single place to see what is waiting, and on whom",
        "Approval limits live in people's heads, so they are applied unevenly",
        "Finance re-keys every approved order into the ERP",
        "No record of who approved what when a supplier dispute comes up",
      ],
    },
    approach: [
      {
        title: "Map the real workflow first",
        copy: "Two days with the people who raise, approve and pay for orders, mapping every step and every exception before any code is written.",
      },
      {
        title: "Rules as settings, not code",
        copy: "Approval limits by amount, category and site live on a settings screen finance can change themselves, without a developer.",
      },
      {
        title: "Integrate, do not replace",
        copy: "The ERP stays the system of record. The new tool feeds it through its API, so nobody has to change how they close the month.",
      },
      {
        title: "Ship the smallest useful loop first",
        copy: "Request, approve and sync for one site by week four. The second site and the reporting follow once the core loop is proven.",
      },
    ],
    build: [
      { title: "One request form", copy: "Supplier, items and amounts, with attachments and a required reason, from desktop or phone." },
      { title: "Approval chain by rule", copy: "Routes by amount, category and site, and delegates automatically when an approver is away." },
      { title: "A complete audit trail", copy: "Every view, comment and decision recorded with a name and a time." },
      { title: "Automatic ERP sync", copy: "Approved orders created in the ERP with the original request linked." },
      { title: "A waiting-on dashboard", copy: "What is waiting, for how long, and on whom, for every manager and for finance." },
    ],
    timeline: [
      { when: "Week 1", title: "Discovery and workflow map", copy: "Interviews, the current process on one page, and the exceptions that matter.", payment: "40% deposit" },
      { when: "Week 2", title: "Scope and architecture", copy: "Fixed scope, data model and the ERP integration plan, agreed in writing." },
      { when: "Weeks 3–4", title: "First working loop", copy: "Request, approve and sync for one site, demoed every Friday on staging." },
      { when: "Weeks 5–6", title: "Second site and reporting", copy: "Rules for both sites, delegation, and the waiting-on dashboard.", payment: "40% on milestone" },
      { when: "Week 7", title: "Test, train, launch", copy: "Real orders in parallel for a week, short training sessions, then go live.", payment: "20% at launch" },
    ],
    outcome: [
      "The goal is simple to state and easy to check: an urgent request raised in the morning is approved and in the ERP the same day, and nobody types an order twice.",
      "Just as valuable is what finance gets back: a month-end that starts from a complete record instead of a hunt through inboxes, and an answer to “who approved this?” in seconds.",
    ],
    after:
      "Dedicated Support covers ERP updates, new approval rules as the business changes, and a monthly look at where requests still wait the longest.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "ERP REST API", "Docker", "AWS eu-north-1"],
  },
  {
    slug: "clinic-assistant",
    photo: {
      src: "https://images.pexels.com/photos/4269274/pexels-photo-4269274.jpeg?auto=compress&cs=tinysrgb&w=2000",
      alt: "Two staff members in scrubs talking at the front desk of a modern clinic",
      credit: "Cedric Fauntleroy",
      source: "Pexels",
      href: "https://www.pexels.com/photo/a-receptionist-and-a-practitioner-at-the-reception-4269274/",
    },
    concept: true,
    sector: "AI automation",
    client: "A private physiotherapy clinic with three locations",
    title: "A front-desk assistant for a clinic",
    summary: "Answers routine patient questions from the clinic's own documents and hands everything else to staff.",
    offer: "Paid pilot, then Project Build",
    duration: "6 weeks",
    team: "Founder-led, one engineer",
    visual: "chat",
    service: "ai-solutions",
    metric: { value: "40%", label: "Design goal: routine questions answered without staff" },
    outcomes: [
      { value: "40%", label: "Routine questions answered without a person" },
      { value: "< 1 min", label: "First reply, evenings and weekends included" },
      { value: "0", label: "Medical advice given by the assistant" },
    ],
    situation: [
      "Reception answers the phone, checks people in and replies to messages, all at the same time. Most messages ask the same handful of things: opening hours, prices, what to bring, how to prepare for a first visit, whether insurance covers it.",
      "Booking requests sit in the shared inbox behind those questions. Messages that arrive on a Friday evening wait until Monday, and some of those people book somewhere else in the meantime.",
    ],
    problem: {
      lead: "The clinic did not need a chatbot. It needed its reception time back for the patients in front of them.",
      points: [
        "The same twenty questions take most of reception's day",
        "Booking requests wait behind routine messages",
        "Answers vary depending on who replies",
        "Evening and weekend messages wait days for a reply",
      ],
    },
    approach: [
      {
        title: "Start with a paid two-week pilot",
        copy: "One location, website chat only, using the clinic's existing FAQ and price list. Small, fixed-price, and credited if the clinic continues.",
      },
      {
        title: "Answer only from approved documents",
        copy: "The assistant retrieves answers from documents the clinic controls. When the answer is not there, it says so and passes the question to the team.",
      },
      {
        title: "Hard limits on medical topics",
        copy: "No diagnosis, no treatment advice. Anything clinical goes straight to a person, with the conversation attached so nobody asks twice.",
      },
      {
        title: "Measure before scaling",
        copy: "Track what it answered, what it handed over and what people asked next, then decide with real numbers whether to roll it out.",
      },
    ],
    build: [
      { title: "Website chat assistant", copy: "Answers hours, prices, preparation and insurance questions in plain language." },
      { title: "A document library staff edit", copy: "Update a price or a preparation note once, and the assistant uses it immediately." },
      { title: "Hand-off with context", copy: "Clinical or unclear questions go to staff with the full conversation attached." },
      { title: "One booking queue", copy: "Booking requests collected with the details reception needs to confirm in one step." },
      { title: "A weekly report", copy: "Questions answered, handed over and missing from the documents, so gaps get filled." },
    ],
    timeline: [
      { when: "Weeks 1–2", title: "Paid pilot, one location", copy: "Chat on the website, answering from the existing FAQ, with every hand-off reviewed.", payment: "Pilot fee" },
      { when: "Week 3", title: "Review and scope", copy: "Pilot numbers on the table, then a fixed scope for all three locations.", payment: "50% deposit" },
      { when: "Weeks 4–5", title: "Three locations and the queue", copy: "Location-aware answers, the booking queue and the staff hand-off." },
      { when: "Week 6", title: "Launch and training", copy: "A short session for reception at each site, then live.", payment: "50% at launch" },
    ],
    outcome: [
      "The design goal is that four in ten routine questions are answered well without anyone at reception touching them, and that every message gets a first reply within a minute, any time of day.",
      "Equally important is what the assistant never does: it gives no medical advice, and it never guesses. When it does not know, a person answers, with the context already there.",
    ],
    after:
      "Support covers keeping the documents current, a monthly review of hand-offs to find new questions worth answering, and tuning as the clinic adds services.",
    stack: ["Next.js", "LLM API", "Retrieval (pgvector)", "PostgreSQL", "Node.js", "EU hosting"],
  },
  {
    slug: "saas-mvp",
    photo: {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80",
      alt: "Small startup team working together around laptops at a shared table",
      credit: "Annie Spratt",
      source: "Unsplash",
      href: "https://unsplash.com/photos/group-of-people-using-laptop-computer-QckxruozjRg",
    },
    concept: true,
    sector: "SaaS MVP",
    client: "A first-time founder building software for small fitness studios",
    title: "A subscription product, idea to first users",
    summary: "Accounts, bookings and billing: the smallest product studio owners can sign up to, use and pay for.",
    offer: "Project Build (MVP)",
    duration: "8 weeks",
    team: "Founder-led, two engineers",
    visual: "dashboard",
    service: "saas-platforms",
    metric: { value: "8 weeks", label: "Planned path from agreed scope to first paying user" },
    outcomes: [
      { value: "8 weeks", label: "From agreed scope to the first paying studio" },
      { value: "1", label: "Core workflow done properly, not ten half-built" },
      { value: "100%", label: "Code in the founder's own repository from day one" },
    ],
    situation: [
      "The founder ran a studio for years, interviewed twenty other owners, and built a spreadsheet that half a dozen of them already used to manage classes and memberships. The demand was proven.",
      "The spreadsheet could not take payments, could not handle two studios, and could not be shown to an investor as a product. The next step needed to be real software, on a budget that left no room for building the wrong thing.",
    ],
    problem: {
      lead: "The risk was never the code. It was building too much before anyone paid.",
      points: [
        "A long wish list and pressure to launch with all of it",
        "Accounts and billing are hard to bolt on later",
        "A fixed budget with no room for a rebuild",
        "Investors want usage, not mock-ups",
      ],
    },
    approach: [
      {
        title: "Cut to one workflow",
        copy: "A member books a class and pays for it; the owner sees who is coming. Everything else goes on a list for after launch.",
      },
      {
        title: "Multi-tenant from day one",
        copy: "Every studio is a separate tenant with its own staff and members, so adding the hundredth studio needs no rework.",
      },
      {
        title: "Buy the commodity parts",
        copy: "Payments, subscriptions and invoices run on Stripe Billing. Budget goes into the booking experience, which is what makes the product different.",
      },
      {
        title: "Demo to real owners weekly",
        copy: "Three friendly studios see a working build every Friday, so feedback arrives while it is still cheap to act on.",
      },
    ],
    build: [
      { title: "Sign-up and studio setup", copy: "An owner creates a studio, adds rooms and instructors, and invites staff with roles." },
      { title: "Schedule and booking", copy: "Recurring classes, capacity limits, waitlists, and booking from a phone in two taps." },
      { title: "Memberships and payments", copy: "Plans, class packs and subscriptions, billed through Stripe with receipts sent automatically." },
      { title: "Owner dashboard", copy: "Today's classes, revenue this month, and members who have stopped coming." },
      { title: "Admin for the founder", copy: "Every studio, plan and payment, with support tools to help a studio without logging in as them." },
    ],
    timeline: [
      { when: "Week 1", title: "Discovery and the cut", copy: "The wish list, the one workflow, and a written scope the founder signs off.", payment: "40% deposit" },
      { when: "Weeks 2–3", title: "Foundation", copy: "Tenancy, accounts, roles and the billing skeleton, deployed to staging." },
      { when: "Weeks 4–6", title: "Booking and memberships", copy: "The core workflow, demoed to three studios every Friday.", payment: "40% on milestone" },
      { when: "Week 7", title: "Hardening", copy: "Edge cases, emails, performance and a short security review." },
      { when: "Week 8", title: "Launch", copy: "The first studio signs up and pays on the live product.", payment: "20% at launch" },
    ],
    outcome: [
      "The goal for week eight is one studio paying for the product on its own card, and a product that can take the next fifty studios without being rebuilt.",
      "The founder leaves with working software, real usage to show investors, and every line of code in their own repository, ready for whoever builds the next version.",
    ],
    after:
      "Dedicated Support turns the launch list into a roadmap: two-week cycles, a demo at the end of each, and monitoring so problems are found before studios report them.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe Billing", "AWS", "GitHub Actions"],
  },
  {
    slug: "logistics-portal",
    photo: {
      src: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=2000&q=80",
      alt: "Aerial view of rows of shipping containers in a logistics yard",
      credit: "CHUTTERSNAP",
      source: "Unsplash",
      href: "https://unsplash.com/photos/aerial-view-of-shipping-container-yard-9cCeS9Sg6nU",
    },
    concept: true,
    sector: "Logistics",
    client: "A regional freight forwarder with about 300 business customers",
    title: "A tracking portal that ends “where is my shipment?”",
    summary: "One customer portal with live shipment status, documents and delay alerts, pulled from three carrier systems.",
    offer: "Project Build",
    duration: "6 weeks",
    team: "Founder-led, two engineers",
    visual: "dashboard",
    service: "software-development",
    metric: { value: "−50%", label: "Design goal for status calls and emails" },
    outcomes: [
      { value: "−50%", label: "“Where is my shipment?” calls and emails" },
      { value: "24/7", label: "Status and documents without calling anyone" },
      { value: "3", label: "Carrier systems combined into one timeline" },
    ],
    situation: [
      "Customer service spends most of its day answering one question: where is my shipment? To answer it, someone checks the internal transport system, then one of three carrier portals, then emails the customer back.",
      "Customers also call for proof of delivery and invoices, documents the company already has but can only send by hand. When a shipment is late, the customer usually finds out first and calls, already annoyed.",
    ],
    problem: {
      lead: "The information existed. It was just in four places, and only staff could reach it.",
      points: [
        "Status scattered across the transport system and three carrier portals",
        "Staff time spent relaying information customers could read themselves",
        "Documents sent by hand, one email at a time",
        "Customers learn about delays before the company tells them",
      ],
    },
    approach: [
      {
        title: "Read-only first",
        copy: "The portal reads from the existing systems and adds no new data entry for staff. Nothing about how shipments are booked changes.",
      },
      {
        title: "One status language",
        copy: "Every carrier names its statuses differently. They are mapped once into a single, plain timeline customers understand.",
      },
      {
        title: "Tell them before they ask",
        copy: "When an estimated arrival slips, the customer gets an email with the new time, before they think to call.",
      },
      {
        title: "Pilot with ten customers",
        copy: "A small group of regular customers uses it for a week before everyone gets a login, so the rough edges are found early.",
      },
    ],
    build: [
      { title: "Company accounts", copy: "Each customer company gets logins for its own staff, with roles for operations and finance." },
      { title: "One shipment timeline", copy: "Every shipment, from booking to delivery, in one view, whichever carrier moves it." },
      { title: "Documents on demand", copy: "Proof of delivery, invoices and customs papers downloadable the moment they exist." },
      { title: "Delay alerts", copy: "Automatic emails when an estimated arrival changes, with the new time and the reason." },
      { title: "An internal view", copy: "Customer service sees exactly what the customer sees, so conversations start from the same page." },
    ],
    timeline: [
      { when: "Week 1", title: "Discovery and data mapping", copy: "The transport system, the three carrier APIs, and a map of every status.", payment: "40% deposit" },
      { when: "Week 2", title: "Integration spike", copy: "Live data from all four sources into one model, proven before the interface is built." },
      { when: "Weeks 3–4", title: "Portal and timeline", copy: "Accounts, the shipment list and the timeline, demoed weekly.", payment: "40% on milestone" },
      { when: "Week 5", title: "Documents and alerts", copy: "Document downloads and delay emails, tested against real late shipments." },
      { when: "Week 6", title: "Pilot, then roll-out", copy: "Ten customers for a week, fixes, then logins for everyone.", payment: "20% at launch" },
    ],
    outcome: [
      "The design goal is to halve the calls and emails asking for status, because customers can see it themselves, any time, in one place.",
      "The quieter win is trust: a customer who hears about a delay from you, with a new time, is far less likely to start looking for another forwarder.",
    ],
    after:
      "Support keeps the carrier integrations healthy as their APIs change, and adds what customers ask for next, usually quotes and booking.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Carrier & TMS APIs", "Redis queues", "AWS"],
  },
  {
    slug: "agency-cloud",
    photo: {
      src: "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?auto=format&fit=crop&w=2000&q=80",
      alt: "Two developers working on code at monitors in a bright office",
      credit: "Compagnons",
      source: "Unsplash",
      href: "https://unsplash.com/photos/people-coding-at-monitors-in-workspace-Im_cQ6hQo10",
    },
    concept: true,
    sector: "Cloud · White-label",
    client: "A 15-person design agency hosting about 40 client websites",
    title: "Calm releases for an agency's client sites",
    summary: "One release pipeline, staging and monitoring for forty client sites, delivered under the agency's own name.",
    offer: "Technical Audit, then White-label Development",
    duration: "4 weeks",
    team: "Founder-led, one engineer",
    visual: "infra",
    service: "cloud-infrastructure",
    metric: { value: "< 10 min", label: "Design goal: from approved change to live, with a rollback" },
    outcomes: [
      { value: "40", label: "Client sites on one release process" },
      { value: "< 10 min", label: "From approved change to live, with a one-click rollback" },
      { value: "0", label: "Releases done by hand over FTP" },
    ],
    situation: [
      "The agency's design work is excellent. Its hosting is a patchwork: some sites on shared hosting, some on a server one developer set up years ago, and releases done by uploading files over FTP.",
      "Friday releases regularly turn into weekend emergencies. Backups exist, but nobody has tried restoring one, and the only person who understands the old server is fully booked on client work.",
    ],
    problem: {
      lead: "The risk was invisible until a client's site went down.",
      points: [
        "Manual releases with no staging to check them first",
        "Backups that have never been restored",
        "Knowledge of the servers held by one person",
        "Outages found when a client calls, not before",
      ],
    },
    approach: [
      {
        title: "Audit before changing anything",
        copy: "A fixed-price technical audit inventories every site, where it is hosted, how it is released and what is most at risk, with a written plan the agency keeps.",
      },
      {
        title: "One pipeline, many sites",
        copy: "Every site deploys the same way from its repository, so a fix to the process fixes it for all forty.",
      },
      {
        title: "Staging for every site",
        copy: "Each change goes to a staging link the agency can show its client before it goes live.",
      },
      {
        title: "Invisible to their clients",
        copy: "We work under the agency's name with an NDA. Their clients deal with the agency; we are the team behind it.",
      },
    ],
    build: [
      { title: "Release pipelines", copy: "Merge an approved change and it builds, tests and deploys, with a one-click rollback." },
      { title: "Staging links", copy: "A preview of every change, ready to send to the client for sign-off." },
      { title: "Backups that are tested", copy: "Automatic backups, and a scheduled restore test that proves they work." },
      { title: "Monitoring and alerts", copy: "Uptime and error monitoring for every site, alerting the agency before the client notices." },
      { title: "Runbooks", copy: "How everything works, written down, so no single person is the only one who knows." },
    ],
    timeline: [
      { when: "Week 1", title: "Technical audit", copy: "Every site inventoried, risks ranked, and a migration plan the agency keeps.", payment: "Audit fee" },
      { when: "Week 2", title: "Pipeline and first five sites", copy: "The release process proven on five representative sites.", payment: "50% deposit" },
      { when: "Week 3", title: "Migrate in batches", copy: "The remaining sites moved in small groups, each checked on staging first." },
      { when: "Week 4", title: "Monitoring and handover", copy: "Alerts, backup restore tests and runbooks, walked through with the team.", payment: "50% at handover" },
    ],
    outcome: [
      "The goal is that releasing a change to any of the forty sites takes under ten minutes from approval to live, with a rollback a click away, and that no one ever uploads files by hand again.",
      "For the agency, it means releases on a Friday afternoon stop being a gamble, and the next developer they hire can understand the setup from the runbooks on day one.",
    ],
    after:
      "Dedicated Support under the agency's brand: monitoring, updates, monthly restore tests, and new sites added to the pipeline as the agency wins them.",
    stack: ["GitHub Actions", "Docker", "AWS eu-north-1", "Cloudflare", "Terraform", "Uptime monitoring"],
  },
];

export function getCaseStudy(slug) {
  return caseStudies.find((c) => c.slug === slug);
}
