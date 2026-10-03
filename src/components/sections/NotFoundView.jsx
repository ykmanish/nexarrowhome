import { Button, Heading, Label, Section, TextLink } from "@/components/site/ui";
import { paths } from "@/lib/routes";

export default function NotFoundView() {
  return (
    <Section className="flex min-h-[70vh] flex-col justify-center">
      <Label>404</Label>
      <Heading as="h1" lead="This page took" tail="a wrong turn." size="page" className="mt-6" />
      <p data-anim="rise" className="mt-8 max-w-md text-[16px] leading-relaxed text-ink-soft">
        The link may be old or the page may have moved. Everything we do is still one click away.
      </p>
      <div data-anim="rise" className="mt-9 flex flex-wrap items-center gap-5">
        <Button href={paths.home} variant="lime">
          Back to home
        </Button>
        <TextLink href={paths.services}>Browse services</TextLink>
        <TextLink href={paths.contact}>Contact us</TextLink>
      </div>
    </Section>
  );
}
