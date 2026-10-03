import { services } from "@/content/services";
import { paths } from "@/lib/routes";
import Accordion from "@/components/site/Accordion";
import { Button, Chip, Frame, Section, SectionHead, TextLink } from "@/components/site/ui";

/** Services as a coded disclosure list, set on the frame under a section head. */
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
      <SectionHead
        label="Expertise"
        lead="Four disciplines,"
        tail="one team."
        intro="Strategy, build, AI and cloud are run by the same people, so decisions in one layer never quietly break another."
        action={
          <Button href={paths.services} variant="outline">
            All services
          </Button>
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
