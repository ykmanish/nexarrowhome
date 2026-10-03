import PageHero from "./PageHero";
import { Button, TextLink } from "@/components/site/ui";
import { paths } from "@/lib/routes";

export default function NotFoundView() {
  return (
    <PageHero
      label="404"
      lead="This page took"
      tail="a wrong turn."
      intro="The link may be old or the page may have moved. Everything we do is still one click away."
      actions={
        <>
          <Button href={paths.home} variant="eu">
            Back to home
          </Button>
          <span className="flex flex-wrap items-center gap-5 px-2">
            <TextLink href={paths.services}>Browse services</TextLink>
            <TextLink href={paths.contact}>Contact us</TextLink>
          </span>
        </>
      }
    >
      <div className="h-10 xl:h-24" aria-hidden="true" />
    </PageHero>
  );
}
