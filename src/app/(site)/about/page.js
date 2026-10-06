import Image from "next/image";
import { Building2 } from "lucide-react";
import PageHero, { HeroFigure } from "@/components/sections/PageHero";
import CrossBorder from "@/components/sections/CrossBorder";
import Expertise from "@/components/sections/Expertise";
import { CodeVisual, FlowVisual, Sky } from "@/components/site/visuals";
import { Button, Chip, Frame, Label, Section, SectionHead, Statement, cx } from "@/components/site/ui";
import { capabilities, company, companyFacts, principles } from "@/content/company";
import BookCall from "@/components/site/BookCall";
import { paths } from "@/lib/routes";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "About",
  description:
    `${company.name} is a software company registered in ${company.city} (EU), building custom software and AI automation for growing teams worldwide.`,
  path: paths.about,
});

export default function AboutPage() {
  const [entity, ...facts] = companyFacts;

  return (
    <>
      <PageHero
        crumbs={[{ label: "About" }]}
        label="About"
        lead="A software company"
        tail="built for real execution."
        intro={`${company.name} is registered in ${company.city} (EU) and works remotely with clients worldwide. We help growing teams turn workflows and operational problems into dependable software.`}
        actions={<BookCall>Book a call</BookCall>}
        aside={<HeroFigure value="EU" caption={`Registered in ${company.city}, working worldwide`} />}
      />

      {/* Story */}
      <Section>
        <Frame className="grid gap-8 xl:gap-0">
          <div data-anim="fade" className="xl:border-r xl:border-line">
            <Label>Our story</Label>
          </div>
          <div className="xl:col-span-2">
            <Statement
              className="xl:-mt-1.5"
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
        </Frame>

        <Frame className="mt-14 grid gap-4 sm:grid-cols-2 xl:gap-0">
          <span aria-hidden="true" className="hidden xl:block" />
          <figure data-anim="rise" className="relative overflow-hidden">
            <Sky className="aspect-[4/3.4]">
              <div className="absolute inset-x-5 top-1/2 mx-auto max-w-sm -translate-y-1/2">
                <FlowVisual />
              </div>
            </Sky>
            <figcaption className="absolute bottom-0 left-0 bg-paper px-3.5 py-2 text-[11.5px] uppercase tracking-[0.14em]">
              Workflow-first
            </figcaption>
          </figure>
          <figure data-anim="rise" className="relative grid place-items-center overflow-hidden bg-night p-5 sm:p-8 xl:col-span-2">
            <CodeVisual className="w-full max-w-md" />
            <figcaption className="absolute bottom-0 left-0 bg-paper px-3.5 py-2 text-[11.5px] uppercase tracking-[0.14em] text-ink">
              Built to last
            </figcaption>
          </figure>
        </Frame>
      </Section>

      {/* Principles */}
      <Section tone="mist" id="principles">
        <SectionHead
          label="Principles"
          lead="What guides the work"
          tail="behind every project."
          intro="Five working rules we hold ourselves to, from the first scoping call to the hundredth release."
        />
        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-5">
          {principles.map(([title, copy], i) => (
            <article
              key={title}
              data-anim="rise"
              className={cx("flex min-h-[260px] flex-col p-6", i === 0 ? "bg-eu text-eu-ink" : "bg-paper")}
            >
              <span className={cx("text-[11.5px] uppercase tracking-[0.18em]", i === 0 ? "text-eu-ink/60" : "text-muted")}>
                P-{String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-auto pt-10 font-display text-[24px] tracking-[-0.015em]">{title}</h3>
              <p className={cx("mt-2.5 text-[13.5px] leading-relaxed", i === 0 ? "text-eu-ink/75" : "text-muted")}>{copy}</p>
            </article>
          ))}
        </div>
      </Section>

      <Expertise />

      {/* Capabilities */}
      <Section id="capabilities">
        <SectionHead
          label="Capabilities"
          lead="Core strengths"
          tail="across the stack."
          intro="What we bring to an engagement, from interface work through backend systems to production infrastructure."
        />
        <Frame className="mt-14">
          <ul className="border-t border-line xl:col-span-3 xl:col-start-2">
            {capabilities.map((c) => (
              <li
                key={c.area}
                data-anim="rise"
                className="grid gap-3 border-b border-line py-6 md:grid-cols-[110px_1fr_auto] md:items-center md:gap-8 md:py-7"
              >
                <span>
                  <Chip tone="eu">{c.area}</Chip>
                </span>
                <span className="font-display text-[21px] leading-snug tracking-[-0.015em] md:text-[24px]">{c.what}</span>
                <span className="text-[13px] text-muted md:text-right">{c.note}</span>
              </li>
            ))}
          </ul>
        </Frame>
      </Section>

      {/* Company */}
      <Section id="company" tone="night">
        <SectionHead
          tone="night"
          label="Company"
          lead="An Estonian company,"
          tail="working worldwide."
          intro="Registration in Estonia gives you an EU contract, EU invoicing and a company anyone can look up. The work is delivered remotely, for clients anywhere."
          action={
            <Button href={company.registerUrl} external variant="ghost" target="_blank" rel="noopener noreferrer">
              Verify in the e-Business Register
            </Button>
          }
        />

        <div className="mt-14 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-[1fr_1.4fr]">
          <article data-anim="rise" className="relative flex min-h-[300px] flex-col overflow-hidden bg-eu p-7 text-eu-ink md:p-9">
            <span className="grid size-11 place-items-center rounded-md bg-lime text-lime-ink">
              <Building2 size={18} strokeWidth={1.7} />
            </span>
            <p className="mt-10 text-[11.5px] uppercase tracking-[0.18em] text-eu-ink/60">{entity.label}</p>
            <h3 className="mt-3 font-display text-[clamp(2rem,3.4vw,2.8rem)] leading-none tracking-[-0.02em]">{entity.value}</h3>
            <p className="mt-3 text-[14.5px] text-eu-ink/75">{entity.detail}</p>
            <div className="mt-auto flex items-center gap-3 pt-10 text-[13px] text-eu-ink/75">
              <Image src="/eu.jpg" alt="European Union flag" width={36} height={24} className="h-6 w-auto rounded-[2px]" />
              {company.region}
            </div>
          </article>

          <dl className="grid gap-px bg-white/10 sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} data-anim="rise" className="bg-night p-6 md:p-7">
                <dt className="text-[11.5px] uppercase tracking-[0.18em] text-white/45">{f.label}</dt>
                <dd className="mt-6 font-display text-[22px] leading-tight tracking-[-0.015em]">{f.value}</dd>
                <dd className="mt-1.5 text-[13px] text-white/50">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <CrossBorder />
    </>
  );
}
