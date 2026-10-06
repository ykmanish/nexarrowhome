import { Check } from "lucide-react";
import PageHero, { HeroFigure } from "@/components/sections/PageHero";
import { ConceptTag } from "@/components/sections/CaseStudies";
import ContactSection from "@/components/sections/ContactSection";
import BookCall from "@/components/site/BookCall";
import { ServiceVisual, Sky } from "@/components/site/visuals";
import { Chip, Frame, Label, Section, TextLink } from "@/components/site/ui";
import { services } from "@/content/services";
import { caseStudies, conceptNote } from "@/content/work";
import { pageMeta } from "@/lib/meta";
import { paths } from "@/lib/routes";

export const metadata = pageMeta({
  title: "Case studies",
  description:
    "How Nexarrow approaches common problems: approval workflows, AI assistants and SaaS MVPs. The problem, what we would build and the goal we design for.",
  path: paths.work,
});

const serviceName = (slug) => services.find((s) => s.slug === slug)?.name;

export default function WorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Case studies" }]}
        label="Our work"
        lead="Case studies"
        tail="and how we think."
        intro="Three common problems: what we found, what we would build and the goal we design for. These are concept projects and say so; client projects are added here with the client's permission."
        actions={<BookCall>Book a call</BookCall>}
        aside={<HeroFigure value={String(caseStudies.length).padStart(2, "0")} caption="Concept projects, clearly labelled" />}
      />

      {caseStudies.map((cs, i) => (
        <Section key={cs.slug} id={cs.slug}>
          <Frame className="grid gap-8 xl:gap-0">
            <div className="xl:border-r xl:border-line">
              <p className="font-display text-[44px] leading-none tracking-[-0.03em] text-eu">
                {String(i + 1).padStart(2, "0")}
              </p>
              <ConceptTag concept={cs.concept} className="mt-5 inline-block" />
              <p className="mt-4 text-[11.5px] uppercase tracking-[0.16em] text-muted">{cs.sector}</p>
            </div>

            <div className="xl:col-span-2">
              <h2 className="font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.02em]">{cs.title}</h2>
              <div className="mt-10 grid gap-10 md:grid-cols-2">
                <div data-anim="rise">
                  <Label>The problem</Label>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">{cs.problem}</p>
                </div>
                <div data-anim="rise">
                  <Label>What we would build</Label>
                  <ul className="mt-4 border-t border-line">
                    {cs.built.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 border-b border-line py-3 text-[14.5px] text-ink-soft">
                        <Check size={15} strokeWidth={2.2} className="mt-0.5 shrink-0 text-eu" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {cs.stack.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>

            <div data-anim="rise" className="xl:flex xl:flex-col xl:justify-end">
              <p className="font-display text-[clamp(2rem,3vw,2.75rem)] leading-none tracking-[-0.03em] text-eu">
                {cs.metric.value}
              </p>
              <p className="mt-2 max-w-[24ch] text-[13px] leading-snug text-muted">{cs.metric.label}</p>
              <div className="mt-6">
                <TextLink href={paths.service(cs.service)}>{serviceName(cs.service)}</TextLink>
              </div>
            </div>
          </Frame>

          <div data-anim="rise" className="mt-12 overflow-hidden">
            <Sky className="h-[380px] lg:h-[500px]" sizes="100vw">
              <div className="absolute inset-x-6 top-1/2 mx-auto max-w-lg -translate-y-1/2">
                <ServiceVisual name={cs.visual} />
              </div>
            </Sky>
          </div>
        </Section>
      ))}

      <Section tone="mist">
        <p className="mx-auto max-w-2xl text-center text-[13.5px] leading-relaxed text-muted">{conceptNote}</p>
      </Section>

      <ContactSection />
    </>
  );
}
