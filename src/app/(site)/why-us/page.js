import PageHero, { HeroFigure } from "@/components/sections/PageHero";
import DeliveryTrail from "@/components/sections/DeliveryTrail";
import Engagement from "@/components/sections/Engagement";
import FAQ from "@/components/sections/FAQ";
import Safeguards from "@/components/sections/Safeguards";
import { Section, SectionHead } from "@/components/site/ui";
import { faqs, manifesto, problems } from "@/content/company";
import { paths } from "@/lib/routes";
import { pageMeta } from "@/lib/meta";
import BookCall from "@/components/site/BookCall";

export const metadata = pageMeta({
  title: "Approach",
  description:
    "How Nexarrow works: ten principles behind every build, a six-stage delivery path, and engagement models that fit your stage.",
  path: paths.approach,
});

export default function ApproachPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Approach" }]}
        label="Approach"
        lead="How we work,"
        tail="and why it works."
        intro="The working beliefs and delivery habits that shape scoping, architecture and delivery decisions on every engagement."
        actions={<BookCall>Book a call</BookCall>}
        aside={<HeroFigure value={String(manifesto.length).padStart(2, "0")} caption="Principles behind every build" />}
      />

      {/* Why teams come to us */}
      <Section>
        <SectionHead label="Why teams come to us" lead="The problems" tail="worth solving." />
        <ol className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {problems.map((p, i) => (
            <li key={p.title} data-anim="rise" className="flex flex-col bg-paper p-7 md:p-8">
              <span className="grid size-11 place-items-center rounded-md bg-eu text-[13px] text-eu-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-10 font-display text-[22px] leading-[1.2] tracking-[-0.015em]">{p.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{p.note}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Manifesto */}
      <Section tone="night">
        <SectionHead tone="night" label="Ten principles" lead="What we believe" tail="about building software." />
        <ol className="mt-16 border-t border-white/10 xl:-mx-6">
          {manifesto.map((line, i) => (
            <li
              key={line}
              className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b border-white/10 py-6 md:grid-cols-[5rem_1fr] md:py-8 xl:grid-cols-[var(--frame-cols)] xl:gap-0 xl:*:px-6"
            >
              <span className="text-[13px] text-[#8aa4ff]">{String(i + 1).padStart(2, "0")}</span>
              <span
                data-scrub="text"
                className="font-display text-[clamp(1.5rem,3.4vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-white xl:col-span-3"
              >
                {line}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <DeliveryTrail />
      <Safeguards />
      <Engagement />
      <FAQ limit={faqs.length} />
    </>
  );
}
