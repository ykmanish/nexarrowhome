import Image from "next/image";
import { Building2 } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Expertise from "@/components/sections/Expertise";
import { CodeVisual, FlowVisual, Sky } from "@/components/site/visuals";
import { Button, Chip, Heading, Label, Section, Statement, cx } from "@/components/site/ui";
import { capabilities, company, companyFacts, principles } from "@/content/company";
import { paths } from "@/lib/routes";

export const metadata = {
  title: "About",
  description: `${company.name} is a software company in ${company.city} building custom software, SaaS platforms, AI solutions and cloud infrastructure for businesses worldwide.`,
  alternates: { canonical: paths.about },
};

export default function AboutPage() {
  const [entity, ...facts] = companyFacts;

  return (
    <>
      <PageHero
        crumbs={[{ label: "About" }]}
        label="About"
        lead="A software company"
        tail="built for real execution."
        intro={`${company.name} is based in ${company.city}. We help businesses turn ideas, workflows and operational challenges into dependable digital products.`}
        actions={
          <Button href={paths.contact} variant="lime">
            Work with us
          </Button>
        }
      />

      {/* Story */}
      <Section className="border-t border-line">
        <div className="grid gap-14 xl:grid-cols-[1fr_1.05fr] xl:items-center xl:gap-16">
          <div>
            <Label>Our story</Label>
            <Statement
              className="mt-6"
              lead="Every engagement starts with the business problem, not the technology."
              tail="So the system we build reflects how work actually happens inside your organisation."
            />
            <div className="prose-body mt-10 max-w-xl text-[16px] leading-relaxed text-muted">
              <p data-anim="rise">
                Our work spans custom software, SaaS product engineering, AI-powered tools and the cloud
                infrastructure that keeps them running.
              </p>
              <p data-anim="rise">
                We value clean architecture, practical user experiences, maintainable code and delivery decisions that
                still make sense long after launch day.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
            <figure data-anim="rise" className="overflow-hidden rounded-[22px] sm:mt-16">
              <Sky className="aspect-[4/5] sm:aspect-square xl:aspect-[4/5]">
                <div className="absolute inset-x-3.5 top-1/2 -translate-y-1/2">
                  <FlowVisual />
                </div>
              </Sky>
            </figure>
            <figure data-anim="rise" className="grid aspect-[4/5.4] place-items-center sm:aspect-[1/1.08] xl:aspect-[4/5.4] overflow-hidden rounded-[22px] bg-night p-3.5">
              <CodeVisual className="w-full" />
            </figure>
          </div>
        </div>
      </Section>

      {/* Principles */}
      <Section tone="mist" id="principles">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Label>Principles</Label>
            <Heading lead="What guides the work" tail="behind every project." className="mt-6" />
          </div>
          <p data-anim="rise" className="max-w-sm text-[14.5px] leading-relaxed text-muted">
            Five working rules we hold ourselves to, from the first scoping call to the hundredth release.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {principles.map(([title, copy], i) => (
            <article
              key={title}
              data-anim="rise"
              className={cx("flex min-h-[250px] flex-col rounded-3xl p-6", i === 0 ? "bg-lime text-lime-ink" : "bg-paper")}
            >
              <span className={cx("text-[11.5px] uppercase tracking-[0.18em]", i === 0 ? "text-lime-ink/55" : "text-muted")}>
                P-{String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-auto pt-10 font-display text-[24px] tracking-[-0.015em]">{title}</h3>
              <p className={cx("mt-2.5 text-[13.5px] leading-relaxed", i === 0 ? "text-lime-ink/70" : "text-muted")}>{copy}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Capabilities */}
      <Section id="capabilities">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Label>Capabilities</Label>
            <Heading lead="Core strengths" tail="across the stack." className="mt-6" />
            <p data-anim="rise" className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
              What we bring to an engagement, from interface work through backend systems to production
              infrastructure.
            </p>
          </div>
          <ul className="border-t border-line">
            {capabilities.map((c) => (
              <li
                key={c.area}
                data-anim="rise"
                className="grid gap-3 border-b border-line py-6 md:grid-cols-[110px_1fr_auto] md:items-center md:gap-8 md:py-7"
              >
                <span>
                  <Chip tone="lime">{c.area}</Chip>
                </span>
                <span className="font-display text-[21px] leading-snug tracking-[-0.015em] md:text-[24px]">{c.what}</span>
                <span className="text-[13px] text-muted md:text-right">{c.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Company */}
      <Section id="company" tone="night">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Label tone="night">Company</Label>
            <Heading lead="An Estonian company," tail="working worldwide." tone="night" className="mt-6" />
          </div>
          <p data-anim="rise" className="max-w-sm text-[14.5px] leading-relaxed text-white/55">
            Operating from Tallinn gives us an EU legal and tax footing while we deliver remotely to clients in any
            market.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <article data-anim="rise" className="relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl bg-lime p-7 text-lime-ink md:p-9">
            <span className="grid size-11 place-items-center rounded-full bg-lime-ink text-lime">
              <Building2 size={18} strokeWidth={1.7} />
            </span>
            <p className="mt-10 text-[11.5px] uppercase tracking-[0.18em] text-lime-ink/60">{entity.label}</p>
            <h3 className="mt-3 font-display text-[clamp(2rem,3.4vw,2.8rem)] leading-none tracking-[-0.02em]">{entity.value}</h3>
            <p className="mt-3 text-[14.5px] text-lime-ink/70">{entity.detail}</p>
            <div className="mt-auto flex items-center gap-3 pt-10 text-[13px] text-lime-ink/70">
              <Image src="/eu.jpg" alt="European Union flag" width={36} height={24} className="h-6 w-auto rounded-[3px]" />
              {company.region}
            </div>
          </article>

          <dl className="grid gap-4 sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} data-anim="rise" className="rounded-3xl border border-white/10 p-6 md:p-7">
                <dt className="text-[11.5px] uppercase tracking-[0.18em] text-white/40">{f.label}</dt>
                <dd className="mt-6 font-display text-[22px] leading-tight tracking-[-0.015em]">{f.value}</dd>
                <dd className="mt-1.5 text-[13px] text-white/50">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Expertise />
    </>
  );
}
