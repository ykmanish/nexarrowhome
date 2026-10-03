import { company, faqs } from "@/content/company";
import Accordion from "@/components/site/Accordion";
import { Heading, Label, Section, TextLink } from "@/components/site/ui";

export default function FAQ({ limit = 6, tone = "paper" }) {
  const items = faqs.slice(0, limit).map(([q, a]) => ({ title: q, body: a }));

  return (
    <Section id="faq" tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Label>FAQ</Label>
          <Heading lead="Questions," tail="answered." className="mt-6" />
          <p data-anim="rise" className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
            Still unsure whether your project is a fit? Send us the problem and we will tell you honestly.
          </p>
          <div data-anim="rise" className="mt-6">
            <TextLink href={`mailto:${company.email}`} external>
              Ask us directly
            </TextLink>
          </div>
        </div>
        <div data-anim="rise">
          <Accordion items={items} variant="cards" />
        </div>
      </div>
    </Section>
  );
}
