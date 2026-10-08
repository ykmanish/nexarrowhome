import { company, faqs } from "@/content/company";
import Accordion from "@/components/site/Accordion";
import JsonLd from "@/components/site/JsonLd";
import { Frame, Section, SectionHead, TextLink } from "@/components/site/ui";
import { faqPage } from "@/lib/schema";

/** The questions, with the same ones (and only those) marked up as an FAQ page for search. */
export default function FAQ({ limit = 6, tone = "paper" }) {
  const shown = faqs.slice(0, limit);
  const items = shown.map(([q, a]) => ({ title: q, body: a }));

  return (
    <Section id="faq" tone={tone}>
      <JsonLd data={faqPage(shown)} />
      <SectionHead
        label="FAQ"
        lead="Questions,"
        tail="answered."
        intro="Still unsure whether your project is a fit? Send us the problem and we will tell you honestly."
        action={
          <TextLink href={`mailto:${company.email}`} external>
            Ask us directly
          </TextLink>
        }
      />
      <Frame className="mt-14">
        <div data-anim="rise" className="xl:col-span-3 xl:col-start-2">
          <Accordion items={items} />
        </div>
      </Frame>
    </Section>
  );
}
