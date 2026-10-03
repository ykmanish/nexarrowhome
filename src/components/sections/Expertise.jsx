import { services } from "@/content/services";
import { paths } from "@/lib/routes";
import Accordion from "@/components/site/Accordion";
import { Button, Chip, Heading, Label, Section, TextLink } from "@/components/site/ui";

/** Services as a coded disclosure list beside a sticky two-tone heading. */
export default function Expertise({ id = "expertise", tone = "paper" }) {
  const items = services.map((s) => ({
    code: s.code,
    title: s.name,
    body: (
      <>
        <p className="max-w-xl">{s.copy}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <Chip key={t} tone="soft">
              {t}
            </Chip>
          ))}
        </div>
        <div className="mt-6">
          <TextLink href={paths.service(s.slug)}>Explore {s.name}</TextLink>
        </div>
      </>
    ),
  }));

  return (
    <Section id={id} tone={tone}>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Label>Expertise</Label>
          <Heading lead="Four disciplines," tail="one team." className="mt-6" />
          <p data-anim="rise" className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
            Strategy, build, AI and cloud are run by the same people, so decisions in one layer never quietly break
            another. Open one to see what is inside.
          </p>
          <div data-anim="rise" className="mt-8">
            <Button href={paths.services} variant="outline">
              All services
            </Button>
          </div>
        </div>
        <div data-anim="rise">
          <Accordion items={items} />
        </div>
      </div>
    </Section>
  );
}
