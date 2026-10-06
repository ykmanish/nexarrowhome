import Image from "next/image";
import { company, founder } from "@/content/company";
import { Button, Frame, Label, Section } from "@/components/site/ui";

/**
 * Meet the founder: name, role, a short story and a LinkedIn link, beside a
 * photo. Until `founder.name` is filled in (content/company.js) the section
 * renders only in development, as a marked placeholder, and is left off the
 * live site, so a blank founder is never published.
 */
export default function Founder({ tone = "paper" }) {
  const ready = Boolean(founder.name);
  if (!ready && process.env.NODE_ENV === "production") return null;

  const name = founder.name || "Your name";
  const first = name.split(" ")[0];
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Section id="founder" tone={tone}>
      <Frame className="grid gap-10 xl:gap-0">
        <div data-anim="fade" className="xl:border-r xl:border-line">
          <Label>Meet the founder</Label>
        </div>

        <div className="xl:flex xl:flex-col">
          <h2
            data-anim="rise"
            className="font-display text-[clamp(2.4rem,4.4vw,3.8rem)] leading-[0.98] tracking-[-0.03em] xl:-mt-1.5"
          >
            {name}
          </h2>
          <p data-anim="rise" className="mt-3 font-serif text-[clamp(1.25rem,1.8vw,1.6rem)] italic text-eu">
            {founder.role}, {company.short}
          </p>
          <div className="prose-body mt-8 max-w-[46ch] text-[16px] leading-relaxed text-ink-soft">
            {founder.story.map((line) => (
              <p key={line} data-anim="rise">
                {line}
              </p>
            ))}
          </div>
          <div data-anim="rise" className="mt-9 flex flex-wrap items-center gap-3">
            {founder.linkedin && (
              <Button href={founder.linkedin} external variant="eu" target="_blank" rel="noopener noreferrer">
                {first} on LinkedIn
              </Button>
            )}
            <Button href={`mailto:${company.email}`} external variant="outline">
              Email {ready ? first : "us"}
            </Button>
          </div>
          {!ready && (
            <p className="mt-8 border border-dashed border-eu p-4 text-[13px] leading-relaxed text-eu">
              Placeholder, visible in development only. Add your name, photo and LinkedIn in{" "}
              <code className="font-mono text-[12px]">src/content/company.js</code> (founder). Until then this section
              is left off the live site.
            </p>
          )}
        </div>

        <figure data-anim="rise" className="relative xl:col-span-2">
          <div className="relative aspect-[5/4] overflow-hidden bg-mist">
            {founder.photo ? (
              <Image
                src={founder.photo}
                alt={`${name}, ${founder.role} of ${company.short}`}
                fill
                sizes="(min-width: 1280px) 40vw, 100vw"
                className="object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="absolute inset-0 grid place-items-center font-display text-[clamp(5rem,12vw,10rem)] tracking-[-0.04em] text-eu/25"
              >
                {initials}
              </span>
            )}
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3 text-[12.5px] text-muted">
            <span>
              {name} · {founder.role}
            </span>
            <span>
              Registered in {company.city} · Engineering led from {company.engineering}
            </span>
          </figcaption>
        </figure>
      </Frame>
    </Section>
  );
}
