import PageHero from "@/components/sections/PageHero";
import DeliveryTrail from "@/components/sections/DeliveryTrail";
import Engagement from "@/components/sections/Engagement";
import FAQ from "@/components/sections/FAQ";
import { Button, Heading, Label, Section } from "@/components/site/ui";
import { faqs, manifesto, problems } from "@/content/company";
import { paths } from "@/lib/routes";

export const metadata = {
  title: "Approach",
  description:
    "How Nexarrow works: ten principles behind every build, a six-stage delivery path, and engagement models that fit your stage.",
  alternates: { canonical: paths.approach },
};

export default function ApproachPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Approach" }]}
        label="Approach"
        lead="How we work,"
        tail="and why it works."
        intro="The working beliefs and delivery habits that shape scoping, architecture and delivery decisions on every engagement."
        actions={
          <Button href={paths.contact} variant="lime">
            Start a project
          </Button>
        }
      />

      {/* Why teams come to us */}
      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Label>Why teams come to us</Label>
            <Heading lead="The problems" tail="worth solving." className="mt-6" />
          </div>
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {problems.map((p, i) => (
              <li key={p.title} data-anim="rise">
                <span className="grid size-11 place-items-center rounded-full border border-line-strong text-[13px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-[21px] leading-[1.2] tracking-[-0.015em]">{p.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{p.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Manifesto */}
      <Section tone="night">
        <Label tone="night">Ten principles</Label>
        <Heading lead="What we believe" tail="about building software." tone="night" className="mt-6" />
        <ol className="mt-16 border-t border-white/10">
          {manifesto.map((line, i) => (
            <li key={line} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b border-white/10 py-6 md:grid-cols-[5rem_1fr] md:py-8">
              <span className="text-[13px] text-lime">{String(i + 1).padStart(2, "0")}</span>
              <span
                data-scrub="text"
                className="font-display text-[clamp(1.5rem,3.4vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-white"
              >
                {line}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <DeliveryTrail />
      <Engagement />
      <div className="border-t border-line">
        <FAQ limit={faqs.length} />
      </div>
    </>
  );
}
