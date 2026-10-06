import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { paths } from "@/lib/routes";
import { ServiceVisual, Sky } from "@/components/site/visuals";
import { Button, Chip, Section, SectionHead } from "@/components/site/ui";

/** Where each discipline's branch drops onto its card, as % of the row. */
const DROPS = [12.5, 37.5, 62.5, 87.5];

/**
 * The claim the whole site rests on, drawn rather than listed: one team at
 * the top, a line branching to the four disciplines, and a card for each with
 * what it builds. Set on night so it stands apart from the sections around it.
 */
export default function Expertise({ id = "expertise" }) {
  return (
    <Section id={id} tone="night">
      <SectionHead
        tone="night"
        size="page"
        label="What we do"
        lead="Four disciplines,"
        tail="one team."
        intro="Strategy, build, AI and cloud are run by the same people, so a decision in one layer never quietly breaks another."
        action={
          <Button href={paths.services} variant="lime">
            All services
          </Button>
        }
      />

      {/* One team, branching to the four cards below (wide screens). */}
      <div aria-hidden="true" className="relative mt-16 hidden h-20 xl:block">
        <span className="absolute left-1/2 top-0 h-1/2 w-px bg-white/20" />
        <span className="absolute left-[12.5%] right-[12.5%] top-1/2 h-px bg-white/20" />
        {DROPS.map((x) => (
          <span key={x} className="absolute bottom-0 top-1/2 w-px bg-white/20" style={{ left: `${x}%` }}>
            <span className="absolute -left-[3px] bottom-0 size-[7px] bg-lime" />
          </span>
        ))}
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-[4px] bg-lime px-3.5 py-1.5 text-[11.5px] uppercase tracking-[0.16em] text-lime-ink">
          One team · one contract · one point of contact
        </span>
      </div>
      <p className="mt-12 w-fit rounded-[4px] bg-lime px-3.5 py-1.5 text-[11.5px] uppercase tracking-[0.16em] text-lime-ink xl:hidden">
        One team · one contract · one point of contact
      </p>

      <div className="mt-6 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 xl:mt-0 xl:grid-cols-4">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={paths.service(s.slug)}
            data-anim="rise"
            className="group flex flex-col bg-night transition-colors duration-300 hover:bg-night-2"
          >
            <Sky className="aspect-[4/3]" sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw">
              <span className="absolute left-0 top-0 z-10 bg-eu px-3 py-1.5 text-[10.5px] uppercase tracking-[0.16em] text-eu-ink">
                {s.code}
              </span>
              <div className="absolute inset-x-5 top-12 transition-transform duration-500 group-hover:-translate-y-2">
                <ServiceVisual name={s.visual} />
              </div>
            </Sky>
            <div className="flex flex-1 flex-col p-6 md:p-7">
              <h3 className="font-display text-[26px] leading-tight tracking-[-0.015em] text-white">{s.name}</h3>
              <p className="mt-1 font-serif text-[18px] italic text-[#8aa4ff]">{s.short}</p>
              <p className="mt-4 text-[14px] leading-relaxed text-white/60">{s.copy}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <Chip key={t} tone="night">
                    {t}
                  </Chip>
                ))}
              </div>
              <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[14px] text-white">
                <span className="border-b border-white/25 pb-0.5 group-hover:border-white">Explore {s.name}</span>
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.8}
                  className="text-lime transition-transform duration-300 group-hover:rotate-45"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
