import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { company, deliveryPath, engagementTiers, toolbelt } from "@/content/company";
import { insights } from "@/content/insights";
import { builds, services } from "@/content/services";
import { paths } from "@/lib/routes";
import InsightCard from "@/components/sections/InsightCard";
import { CodeVisual, DashboardVisual, DeployCard, FlowVisual, Sky } from "@/components/site/visuals";
import { Button, Chip, Dot, Heading, Label, Marquee, Section, Stat, Statement, cx } from "@/components/site/ui";

/* ─────────────────────────── toolbelt ─────────────────────────── */

export function Toolbelt() {
  return (
    <section className="gutter flex items-center gap-8 border-y border-line py-6">
      <p className="hidden shrink-0 text-[12px] leading-snug text-muted sm:block">
        Tools we
        <br />
        ship with
      </p>
      <Marquee
        items={toolbelt}
        duration={48}
        className="min-w-0 flex-1"
        renderItem={(tool) => (
          <span className="flex items-center gap-3 font-display text-[22px] tracking-[-0.01em] text-ink-soft md:text-[24px]">
            <Dot className="bg-lime-deep" />
            {tool}
          </span>
        )}
      />
    </section>
  );
}

/* ─────────────────────────── about ─────────────────────────── */

function Figure({ caption, className = "", children }) {
  return (
    <figure data-anim="rise" className={cx("relative overflow-hidden rounded-[22px]", className)}>
      {children}
      <figcaption className="absolute bottom-3.5 left-3.5 z-10 rounded-full bg-white px-3 py-1 text-[11.5px] text-[#0d0d0d] shadow-sm">
        {caption}
      </figcaption>
    </figure>
  );
}

export function AboutIntro() {
  return (
    <Section id="about" className="grid gap-14 xl:grid-cols-[1fr_1.05fr] xl:items-center xl:gap-16">
      <div>
        <Label>About</Label>
        <Statement
          className="mt-6"
          lead="We build software around how your business actually runs."
          tail="If your team is bending its workflow to fit a tool, that is exactly the problem we fix."
        />
        <a data-anim="rise" href={`mailto:${company.email}`} className="group mt-10 flex w-fit items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors group-hover:border-ink">
            <Mail size={15} strokeWidth={1.7} />
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] text-ink">Email us</span>
            <span className="block text-[13px] text-muted">{company.email}</span>
          </span>
        </a>
        <div data-anim="rise" className="mt-8">
          <Button href={paths.about}>About {company.short}</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
        <Figure caption="Workflow-first" className="sm:mt-20">
          <Sky className="aspect-[4/5] sm:aspect-square xl:aspect-[4/5]">
            <div className="absolute inset-x-3.5 top-1/2 -translate-y-1/2">
              <FlowVisual />
            </div>
          </Sky>
        </Figure>
        <Figure caption="Built to last" className="bg-night">
          <div className="grid aspect-[4/5.4] place-items-center sm:aspect-[1/1.08] xl:aspect-[4/5.4] p-3.5">
            <CodeVisual className="w-full" />
          </div>
        </Figure>
      </div>
    </Section>
  );
}

/* ─────────────────────────── night band ─────────────────────────── */

export function Proof() {
  const stats = [
    { value: services.length, label: "Service lines, run by one team" },
    { value: deliveryPath.length, label: "Stages from first call to production" },
    { value: engagementTiers.length, label: "Ways to engage: build, support or consult" },
    { value: "EU", label: `Registered company in ${company.city}` },
  ];

  return (
    <Section tone="night">
      <p
        data-anim="rise"
        className="mx-auto max-w-3xl text-balance text-center font-display text-[clamp(1.55rem,2.8vw,2.25rem)] leading-[1.3] tracking-[-0.015em]"
      >
        <span className="text-white">We turn messy workflows into dependable systems,</span>{" "}
        <span className="text-white/45">shipped in milestones and supported long after launch.</span>
      </p>

      <div className="mt-16 grid gap-12 lg:grid-cols-[320px_1fr] lg:items-center lg:gap-14">
        <Link href={paths.approach} data-anim="rise" className="group relative block overflow-hidden rounded-[22px]">
          <Sky className="aspect-[16/11]">
            <div className="absolute inset-x-5 top-5 opacity-90 transition-transform duration-500 group-hover:scale-[1.03]">
              <DashboardVisual />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lime text-lime-ink shadow-lg transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={20} strokeWidth={1.8} />
            </span>
            <span className="absolute bottom-4 left-4 text-[13px] text-white">See how we work</span>
          </Sky>
        </Link>

        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} data-anim="rise" className="border-l border-white/15 pl-5 md:pl-6">
              <Stat value={s.value} label={s.label} tone="night" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────── what we build ─────────────────────────── */

export function Work() {
  const [featured, ...more] = builds;

  return (
    <Section id="work">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Label>What we build</Label>
          <Heading lead="Systems," tail="not screenshots." className="mt-6" />
        </div>
        <div data-anim="fade">
          <Button href={paths.services} variant="outline">
            All services
          </Button>
        </div>
      </div>

      <article data-anim="rise" className="mt-14 grid overflow-hidden rounded-[28px] bg-night text-white lg:grid-cols-[1.08fr_1fr]">
        <Sky className="min-h-[380px] lg:min-h-[560px]" sizes="(min-width: 1024px) 50vw, 100vw">
          <span className="absolute left-5 top-5 z-10 rounded-full bg-lime px-3 py-1 text-[11.5px] text-lime-ink">
            Typical build
          </span>
          <div className="absolute inset-x-6 top-1/2 mx-auto max-w-sm -translate-y-1/2 md:inset-x-10">
            <FlowVisual />
          </div>
          <DeployCard className="float absolute bottom-6 right-6 hidden sm:block" />
        </Sky>

        <div className="flex flex-col p-7 md:p-10 lg:p-12">
          <p className="text-[11.5px] uppercase tracking-[0.18em] text-white/40">{featured.sector}</p>
          <h3 className="mt-4 font-display text-[clamp(2rem,3.4vw,2.9rem)] leading-none tracking-[-0.02em]">
            {featured.title}
          </h3>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/55">{featured.summary}</p>
          <ul className="mt-8 space-y-3.5">
            {featured.points.map((p) => (
              <li key={p} className="flex gap-3 text-[14.5px] leading-relaxed text-white/80">
                <Dot className="mt-2 bg-lime" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2">
            {featured.tags.map((t) => (
              <Chip key={t} tone="night">
                {t}
              </Chip>
            ))}
          </div>
          <div className="mt-auto pt-10">
            <Button href={paths.service(featured.service)} variant="lime">
              Explore software development
            </Button>
          </div>
        </div>
      </article>

      <div className="mt-16 flex items-center gap-6">
        <h3 className="shrink-0 font-display text-[22px] tracking-[-0.015em]">More of what we build</h3>
        <span data-scrub="line" className="h-px flex-1 bg-line" />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {more.map((b, i) => (
          <Link
            key={b.title}
            href={paths.service(b.service)}
            data-anim="rise"
            className="group flex flex-col rounded-3xl border border-line p-6 transition-colors duration-300 hover:border-ink md:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11.5px] uppercase tracking-[0.16em] text-muted">B-{String(i + 2).padStart(2, "0")}</span>
              <Chip tone="lime">{b.sector}</Chip>
            </div>
            <h4 className="mt-10 font-display text-[24px] leading-tight tracking-[-0.015em]">{b.title}</h4>
            <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{b.summary}</p>
            <span className="mt-6 grid size-9 place-items-center rounded-full border border-line-strong text-ink transition-all duration-300 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
              <ArrowUpRight size={15} strokeWidth={1.8} />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────── insights ─────────────────────────── */

export function InsightsPreview() {
  return (
    <Section className="border-t border-line">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Label>Insights</Label>
          <Heading lead="Writing around" tail="the work." className="mt-6" />
        </div>
        <div data-anim="fade">
          <Button href={paths.insights} variant="outline">
            All insights
          </Button>
        </div>
      </div>
      <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-3">
        {insights.slice(0, 3).map((a) => (
          <InsightCard key={a.slug} article={a} />
        ))}
      </div>
    </Section>
  );
}
