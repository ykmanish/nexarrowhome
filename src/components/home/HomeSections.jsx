import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { company, deliveryPath, engagementTiers, toolbelt } from "@/content/company";
import { insights } from "@/content/insights";
import { builds, services } from "@/content/services";
import { paths } from "@/lib/routes";
import InsightCard from "@/components/sections/InsightCard";
import { CodeVisual, DeployCard, FlowVisual, Sky } from "@/components/site/visuals";
import { Button, Chip, Frame, Marquee, Section, SectionHead, Stat, cx } from "@/components/site/ui";

/* ─────────────────────────── toolbelt ─────────────────────────── */

/** The tool strip, on the frame: its label under the logo column, the strip across the rest. */
export function Toolbelt() {
  return (
    <section className="gutter border-y border-line">
      <Frame className="flex items-center gap-8 py-6 xl:py-0">
        <p className="hidden shrink-0 text-[12px] uppercase leading-snug tracking-[0.18em] text-muted sm:block xl:flex xl:h-full xl:items-center xl:border-r xl:border-line xl:py-7">
          Tools we
          <br className="xl:hidden" /> ship with
        </p>
        <Marquee
          items={toolbelt}
          duration={48}
          className="min-w-0 flex-1 xl:col-span-3 xl:py-7"
          renderItem={(tool) => (
            <span className="flex items-center gap-3 font-display text-[22px] tracking-[-0.01em] text-ink-soft md:text-[24px]">
              <span aria-hidden="true" className="size-1.5 bg-eu" />
              {tool}
            </span>
          )}
        />
      </Frame>
    </section>
  );
}

/* ─────────────────────────── about ─────────────────────────── */

function Figure({ caption, className = "", children }) {
  return (
    <figure data-anim="rise" className={cx("relative overflow-hidden", className)}>
      {children}
      <figcaption className="absolute bottom-0 left-0 z-10 bg-paper px-3.5 py-2 text-[11.5px] uppercase tracking-[0.14em] text-ink">
        {caption}
      </figcaption>
    </figure>
  );
}

export function AboutIntro() {
  return (
    <Section id="about">
      <SectionHead
        label="About"
        lead="We build software around"
        tail="how your business runs."
        intro="If your team is bending its workflow to fit a tool, that is exactly the problem we fix."
        action={<Button href={paths.about}>About {company.short}</Button>}
      />

      <Frame className="mt-14 grid gap-4 sm:grid-cols-2 xl:gap-0">
        <a
          data-anim="rise"
          href={`mailto:${company.email}`}
          className="group flex items-center gap-3 sm:col-span-2 xl:col-span-1 xl:flex-col xl:items-start xl:justify-end xl:gap-4"
        >
          <span className="grid size-10 place-items-center rounded-md border border-line text-ink transition-colors group-hover:border-ink">
            <Mail size={15} strokeWidth={1.7} />
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] text-ink">Email us</span>
            <span className="block text-[13px] text-muted">{company.email}</span>
          </span>
        </a>
        <Figure caption="Workflow-first">
          <Sky className="aspect-[4/3.4]">
            <div className="absolute inset-x-5 top-1/2 mx-auto max-w-sm -translate-y-1/2">
              <FlowVisual />
            </div>
          </Sky>
        </Figure>
        <Figure caption="Built to last" className="bg-night xl:col-span-2">
          <div className="grid aspect-[4/3.4] place-items-center p-5 sm:p-8 xl:aspect-auto xl:h-full">
            <CodeVisual className="w-full max-w-md" />
          </div>
        </Figure>
      </Frame>
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
      <SectionHead
        tone="night"
        label="In numbers"
        lead="Messy workflows in,"
        tail="dependable systems out."
        intro="Shipped in milestones and supported long after launch, by the same team that scoped it."
        action={
          <Button href={paths.approach} variant="ghost">
            See how we work
          </Button>
        }
      />

      <Frame className="mt-16 grid grid-cols-2 border-t border-white/10 xl:grid-cols-[var(--frame-cols)]">
        {stats.map((s, i) => (
          <div
            key={s.label}
            data-anim="rise"
            className={cx(
              "border-white/10 py-8 pr-4",
              i % 2 === 0 && "border-r pl-0 xl:pl-6",
              i % 2 === 1 && "pl-5 xl:pl-6",
              i < 3 && "xl:border-r",
            )}
          >
            <Stat value={s.value} label={s.label} tone="night" />
          </div>
        ))}
      </Frame>
    </Section>
  );
}

/* ─────────────────────────── what we build ─────────────────────────── */

export function Work() {
  const [featured, ...more] = builds;

  return (
    <Section id="work">
      <SectionHead
        label="What we build"
        lead="Systems,"
        tail="not screenshots."
        intro="The shape of work we take on most often, from internal platforms to the infrastructure under them."
        action={
          <Button href={paths.services} variant="outline">
            All services
          </Button>
        }
      />

      <article data-anim="rise" className="mt-14 grid overflow-hidden bg-night text-white lg:grid-cols-[1.08fr_1fr]">
        <Sky className="min-h-[380px] lg:min-h-[560px]" sizes="(min-width: 1024px) 50vw, 100vw">
          <span className="absolute left-0 top-0 z-10 bg-eu px-3.5 py-2 text-[11.5px] uppercase tracking-[0.14em] text-eu-ink">
            Typical build
          </span>
          <div className="absolute inset-x-6 top-1/2 mx-auto max-w-sm -translate-y-1/2 md:inset-x-10">
            <FlowVisual />
          </div>
          <DeployCard className="float absolute bottom-6 right-6 hidden sm:block" />
        </Sky>

        <div className="flex flex-col p-7 md:p-10 lg:p-12">
          <p className="text-[11.5px] uppercase tracking-[0.18em] text-white/45">{featured.sector}</p>
          <h3 className="mt-4 font-display text-[clamp(2rem,3.4vw,2.9rem)] leading-none tracking-[-0.02em]">
            {featured.title}
          </h3>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60">{featured.summary}</p>
          <ul className="mt-8 border-t border-white/10">
            {featured.points.map((p) => (
              <li key={p} className="flex gap-3 border-b border-white/10 py-3.5 text-[14.5px] leading-relaxed text-white/80">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-lime" />
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

      <div className="mt-px grid gap-px border border-line bg-line md:grid-cols-3">
        {more.map((b, i) => (
          <Link
            key={b.title}
            href={paths.service(b.service)}
            data-anim="rise"
            className="group flex flex-col bg-paper p-6 transition-colors duration-300 hover:bg-mist md:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11.5px] uppercase tracking-[0.16em] text-muted">B-{String(i + 2).padStart(2, "0")}</span>
              <Chip tone="soft">{b.sector}</Chip>
            </div>
            <h4 className="mt-12 font-display text-[26px] leading-tight tracking-[-0.015em]">{b.title}</h4>
            <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{b.summary}</p>
            <span className="mt-8 inline-flex items-center gap-2 text-[13.5px] text-ink">
              <span className="border-b border-ink/25 pb-0.5 group-hover:border-ink">Explore</span>
              <ArrowUpRight size={15} strokeWidth={1.8} className="transition-transform duration-300 group-hover:rotate-45" />
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
    <Section>
      <SectionHead
        label="Insights"
        lead="Writing around"
        tail="the work."
        intro="Notes on product, engineering, AI and infrastructure decisions, from delivery rather than theory."
        action={
          <Button href={paths.insights} variant="outline">
            All insights
          </Button>
        }
      />
      <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-3">
        {insights.slice(0, 3).map((a) => (
          <InsightCard key={a.slug} article={a} />
        ))}
      </div>
    </Section>
  );
}
