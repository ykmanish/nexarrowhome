import { Check, Handshake } from "lucide-react";
import { engagementTiers } from "@/content/company";
import { paths } from "@/lib/routes";
import { Button, Chip, Section, SectionHead, TextLink } from "@/components/site/ui";

/** Three ways to work together: one European-blue feature block, two hairline cells beside it. */
export default function Engagement({ tone = "paper" }) {
  const [lead, ...rest] = engagementTiers;

  return (
    <Section id="engagement" tone={tone}>
      <SectionHead
        label="Engagement"
        lead="Work with us"
        tail="the way that fits."
        intro="A scoped build, ongoing capacity or advisory support. The shape of the engagement follows the problem."
      />

      <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-2">
        <article
          data-anim="rise"
          className="relative flex min-h-[480px] flex-col overflow-hidden bg-eu p-7 text-eu-ink md:p-10"
        >
          <div className="flex items-center justify-between">
            <span className="grid size-11 place-items-center rounded-md bg-lime text-lime-ink">
              <Handshake size={18} strokeWidth={1.7} />
            </span>
            <Chip className="bg-white text-[#0d0d0d]">{lead.price}</Chip>
          </div>
          <p className="mt-10 text-[11.5px] uppercase tracking-[0.18em] text-eu-ink/60">Model 01</p>
          <h3 className="mt-3 font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-none tracking-[-0.02em]">{lead.name}</h3>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-eu-ink/75">{lead.desc}</p>
          <ul className="mt-7 border-t border-eu-ink/15">
            {lead.points.map((p) => (
              <li key={p} className="flex items-center gap-3 border-b border-eu-ink/15 py-3 text-[14.5px]">
                <Check size={15} strokeWidth={2.2} className="shrink-0" /> {p}
              </li>
            ))}
          </ul>
          <div className="relative z-10 mt-auto pt-10">
            <Button href={paths.contact} variant="lime">
              Discuss a build
            </Button>
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 right-4 select-none font-display text-[13rem] leading-none tracking-[-0.05em] text-eu-ink/[0.08]"
          >
            01
          </span>
        </article>

        <div className="grid gap-px bg-line">
          {rest.map((tier, i) => (
            <article key={tier.name} data-anim="rise" className="flex flex-col bg-paper p-7 md:p-8">
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
