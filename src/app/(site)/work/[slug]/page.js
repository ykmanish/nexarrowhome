import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, X } from "lucide-react";
import PageHero, { HeroFigure } from "@/components/sections/PageHero";
import ContactSection from "@/components/sections/ContactSection";
import BookCall from "@/components/site/BookCall";
import { ServiceVisual, Sky } from "@/components/site/visuals";
import { Chip, Frame, Section, SectionHead, TextLink, cx } from "@/components/site/ui";
import { services } from "@/content/services";
import { caseStudies, getCaseStudy } from "@/content/work";
import { pageMeta } from "@/lib/meta";
import { paths } from "@/lib/routes";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return pageMeta({ title: cs.title, description: cs.summary, path: paths.caseStudy(cs.slug), type: "article" });
}

const pad = (n) => String(n).padStart(2, "0");

/**
 * One playbook, told in chapters: the situation, the problem, the approach,
 * what gets built, how it ships week by week, the outcome it is designed for,
 * and what happens after launch. Each chapter opens on the site's frame with
 * its number under the logo column.
 */
export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const index = caseStudies.indexOf(cs);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const service = services.find((s) => s.slug === cs.service);
  const facts = [
    [cs.concept ? "Typical client" : "Client", cs.client],
    ["Engagement", cs.offer],
    ["Duration", cs.duration],
    ["Team", cs.team],
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Playbooks", href: paths.work }, { label: cs.title }]}
        label={cs.sector}
        lead={cs.title}
        size="section"
        intro={cs.summary}
        actions={<BookCall>Discuss a similar project</BookCall>}
        aside={<HeroFigure value={cs.metric.value} caption={cs.metric.label} />}
        meta={
          <>
            {!cs.concept && <Chip tone="lime">Client project</Chip>}
            <Chip tone="paper">{cs.duration}</Chip>
            <Chip tone="paper">{cs.offer}</Chip>
            {service && <Chip tone="paper">{service.name}</Chip>}
          </>
        }
      />

      {/* Opening image */}
      <Section className="pb-0 lg:pb-0">
        <figure data-anim="rise">
          {cs.photo ? (
            <div className="relative aspect-[16/9] overflow-hidden md:aspect-[21/9]">
              <Image src={cs.photo.src} alt={cs.photo.alt} fill sizes="100vw" className="object-cover" />
            </div>
          ) : (
            <Sky className="h-[360px] md:h-[460px]" sizes="100vw">
              <div className="absolute inset-x-6 top-1/2 mx-auto max-w-lg -translate-y-1/2">
                <ServiceVisual name={cs.visual} />
              </div>
            </Sky>
          )}
        </figure>
      </Section>

      {/* 01 Situation */}
      <Section>
        <SectionHead label="01 · The situation" lead="How work" tail="gets done today." />
        <Frame className="mt-12 grid gap-10 xl:gap-0">
          <div className="xl:col-span-2 xl:col-start-2">
            {cs.situation.map((p, i) => (
              <p
                key={p}
                data-anim="rise"
                className={cx(
                  i === 0
                    ? "font-display text-[clamp(1.35rem,2.1vw,1.75rem)] leading-[1.35] tracking-[-0.01em] text-ink"
                    : "mt-6 text-[16.5px] leading-relaxed text-ink-soft",
                )}
              >
                {p}
              </p>
            ))}
          </div>
          <dl data-anim="rise" className="border-t border-line xl:border-t-0">
            {facts.map(([k, v]) => (
              <div key={k} className="border-b border-line py-3.5">
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted">{k}</dt>
                <dd className="mt-1 text-[14px] leading-snug text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Frame>
      </Section>

      {/* 02 Problem */}
      <Section tone="mist">
        <SectionHead label="02 · The problem" lead="What is" tail="really going wrong." />
        <Frame className="mt-10">
          <p
            data-anim="rise"
            className="font-serif text-[clamp(1.6rem,2.6vw,2.3rem)] italic leading-[1.2] text-eu xl:col-span-3 xl:col-start-2"
          >
            {cs.problem.lead}
          </p>
        </Frame>
        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
          {cs.problem.points.map((p) => (
            <li key={p} data-anim="rise" className="flex flex-col gap-6 bg-paper p-6 md:p-7">
              <span className="grid size-9 place-items-center rounded-md border border-line-strong text-muted">
                <X size={15} strokeWidth={2} />
              </span>
              <span className="text-[15px] leading-relaxed text-ink">{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 03 Approach */}
      <Section>
        <SectionHead label="03 · Our approach" lead="How we would" tail="approach it." />
        <ol className="mt-12 border-t border-line xl:-mx-6">
          {cs.approach.map((a, i) => (
            <li
              key={a.title}
              data-anim="rise"
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 border-b border-line py-7 md:grid-cols-[3.5rem_1fr_1.4fr] md:gap-x-8 xl:grid-cols-[var(--frame-cols)] xl:gap-0 xl:*:px-6"
            >
              <span className="font-display text-[24px] leading-none text-eu">{pad(i + 1)}</span>
              <h3 className="font-display text-[22px] leading-tight tracking-[-0.015em] md:text-[26px]">{a.title}</h3>
              <p className="col-start-2 text-[15px] leading-relaxed text-muted md:col-start-auto xl:col-span-2">{a.copy}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 04 Build */}
      <Section>
        <SectionHead label="04 · What we'd build" lead="What we" tail="would build." />
        <div data-anim="rise" className="mt-12 overflow-hidden">
          <Sky className="h-[380px] md:h-[480px]" sizes="100vw">
            <div className="absolute inset-x-6 top-1/2 mx-auto max-w-lg -translate-y-1/2">
              <ServiceVisual name={cs.visual} />
            </div>
          </Sky>
        </div>
        <ul className="mt-px grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-5">
          {cs.build.map((b) => (
            <li key={b.title} data-anim="rise" className="bg-paper p-6">
              <span className="grid size-8 place-items-center rounded-md bg-eu text-eu-ink">
                <Check size={14} strokeWidth={2.4} />
              </span>
              <h3 className="mt-6 font-display text-[19px] leading-tight tracking-[-0.01em]">{b.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{b.copy}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 05 Timeline */}
      <Section tone="night">
        <SectionHead
          tone="night"
          label="05 · How it ships"
          lead="Week by week,"
          tail="paid by milestone."
          intro="A demo on staging at the end of every week, and payments tied to working software."
        />
        <ol
          className={cx(
            "mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2",
            cs.timeline.length >= 5 ? "xl:grid-cols-5" : "xl:grid-cols-4",
          )}
        >
          {cs.timeline.map((t) => (
            <li key={t.when} data-anim="rise" className="flex flex-col bg-night p-6">
              <span className="text-[12px] uppercase tracking-[0.16em] text-lime">{t.when}</span>
              <h3 className="mt-6 font-display text-[20px] leading-tight tracking-[-0.01em] text-white">{t.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/60">{t.copy}</p>
              {t.payment && (
                <span className="mt-auto w-fit pt-6">
                  <span className="block rounded-[4px] border border-white/15 px-2.5 py-1 text-[11.5px] text-white/75">
                    {t.payment}
                  </span>
                </span>
              )}
            </li>
          ))}
        </ol>
      </Section>

      {/* 06 Outcome */}
      <section className="gutter bg-eu py-20 text-eu-ink lg:py-28">
        <Frame className="grid gap-8 xl:gap-0">
          <p className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.18em] text-eu-ink/70 xl:border-r xl:border-eu-ink/15">
            <span aria-hidden="true" className="size-1.5 bg-lime" />
            06 · The outcome
          </p>
          <div className="xl:col-span-3">
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1] tracking-[-0.025em]">
              The outcome <span className="font-serif text-[1.08em] italic text-eu-ink/75">we design for.</span>
            </h2>
            <div className="prose-body mt-8 max-w-2xl text-[16.5px] leading-relaxed text-eu-ink/80">
              {cs.outcome.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </Frame>
        <ul className="mt-14 grid gap-px border border-eu-ink/15 bg-eu-ink/15 md:grid-cols-3">
          {cs.outcomes.map((o) => (
            <li key={o.label} data-anim="rise" className="bg-eu p-7">
              <p className="font-display text-[clamp(2.4rem,4vw,3.4rem)] leading-none tracking-[-0.03em]">{o.value}</p>
              <p className="mt-3 max-w-[28ch] text-[14px] leading-snug text-eu-ink/75">{o.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 07 After launch */}
      <Section>
        <SectionHead label="07 · After launch" lead="Launch is" tail="not the end." />
        <Frame className="mt-10 grid gap-10 xl:gap-0">
          <div className="xl:col-span-2 xl:col-start-2">
            <p data-anim="rise" className="text-[17px] leading-relaxed text-ink-soft">
              {cs.after}
            </p>
            <div data-anim="rise" className="mt-8 flex flex-wrap gap-2">
              {cs.stack.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </div>
          <div data-anim="rise" className="flex flex-col gap-4 xl:justify-end">
            {service && <TextLink href={paths.service(service.slug)}>About {service.name}</TextLink>}
            <TextLink href={paths.approach}>How we work</TextLink>
          </div>
        </Frame>
      </Section>

      {/* Next playbook */}
      <Section tone="mist">
        <Link
          href={paths.caseStudy(next.slug)}
          className="group grid gap-6 xl:-mx-6 xl:grid-cols-[var(--frame-cols)] xl:gap-0 xl:*:px-6"
        >
          <p className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.18em] text-muted">
            <span aria-hidden="true" className="size-1.5 bg-eu" />
            Next playbook
          </p>
          <div className="xl:col-span-2">
            <p className="text-[11.5px] uppercase tracking-[0.16em] text-muted">{next.sector}</p>
            <p className="mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] leading-[1.02] tracking-[-0.02em] transition-colors group-hover:text-eu">
              {next.title}
            </p>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">{next.summary}</p>
          </div>
          <span className="flex items-end xl:justify-end">
            <span className="grid size-14 place-items-center rounded-md bg-eu text-eu-ink transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={20} strokeWidth={1.7} />
            </span>
          </span>
        </Link>
      </Section>

      <ContactSection />
    </>
  );
}
