import { Check, Handshake } from "lucide-react";
import { engagementTiers } from "@/content/company";
import { paths } from "@/lib/routes";
import { Button, Chip, Heading, Label, Section, TextLink } from "@/components/site/ui";

/** Three ways to work together: one feature card in lime, two outlined beside it. */
export default function Engagement({ tone = "paper" }) {
  const [lead, ...rest] = engagementTiers;

  return (
    <Section id="engagement" tone={tone}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Label>Engagement</Label>
          <Heading lead="Work with us" tail="the way that fits." className="mt-6" />
        </div>
        <p data-anim="rise" className="max-w-sm text-[14.5px] leading-relaxed text-muted">
          A scoped build, ongoing capacity or advisory support. The shape of the engagement follows the problem.
        </p>
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <article
          data-anim="rise"
          className="relative flex min-h-[480px] flex-col overflow-hidden rounded-3xl bg-lime p-7 text-lime-ink md:p-10"
        >
          <div className="flex items-center justify-between">
            <span className="grid size-11 place-items-center rounded-full bg-lime-ink text-lime">
              <Handshake size={18} strokeWidth={1.7} />
            </span>
            <Chip tone="paper" className="!bg-white !text-[#0d0d0d]">
              {lead.price}
            </Chip>
          </div>
          <p className="mt-10 text-[11.5px] uppercase tracking-[0.18em] text-lime-ink/60">Model 01</p>
          <h3 className="mt-3 font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-none tracking-[-0.02em]">{lead.name}</h3>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-lime-ink/70">{lead.desc}</p>
          <ul className="mt-7 space-y-2.5">
            {lead.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[14.5px]">
                <Check size={15} strokeWidth={2.2} className="shrink-0" /> {p}
              </li>
            ))}
          </ul>
          <div className="relative z-10 mt-auto pt-10">
            <Button href={paths.contact} variant="ink" className="!bg-[#0d0d0d] !text-white">
              Discuss a build
            </Button>
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 right-4 select-none font-display text-[13rem] leading-none tracking-[-0.05em] text-lime-ink/[0.07]"
          >
            01
          </span>
        </article>

        <div className="grid gap-4">
          {rest.map((tier, i) => (
            <article key={tier.name} data-anim="rise" className="flex flex-col rounded-3xl border border-line p-7 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11.5px] uppercase tracking-[0.18em] text-muted">Model {String(i + 2).padStart(2, "0")}</p>
                <Chip tone="soft">{tier.price}</Chip>
              </div>
              <h3 className="mt-6 font-display text-[28px] leading-tight tracking-[-0.02em]">{tier.name}</h3>
              <p className="mt-2.5 max-w-md text-[14.5px] leading-relaxed text-muted">{tier.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tier.points.map((p) => (
                  <Chip key={p}>{p}</Chip>
                ))}
              </div>
              <div className="mt-auto pt-7">
                <TextLink href={paths.contact}>Discuss this</TextLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
