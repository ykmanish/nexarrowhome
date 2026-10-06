import { Banknote, Clock, Lock, Server, UserRound } from "lucide-react";
import { crossBorder } from "@/content/company";
import { Section, SectionHead } from "@/components/site/ui";

const ICONS = [Lock, Server, Clock, UserRound, Banknote];

/**
 * For UK and EU buyers: an EU-registered company working remotely, and how
 * data protection, hosting, time zones, contact and invoicing work as a
 * result. Plain cells; the facts do the persuading.
 */
export default function CrossBorder() {
  return (
    <Section id="uk-eu" tone="mist">
      <SectionHead
        label="UK & EU clients"
        lead="Across borders,"
        tail="without the friction."
        intro="Contract with an EU company, work with one remote team, and keep your data and your working day where they belong."
      />
      <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-5">
        {crossBorder.map((c, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li key={c.title} data-anim="rise" className="flex flex-col bg-paper p-6 md:p-7">
              <span className="grid size-10 place-items-center rounded-md bg-eu text-eu-ink">
                <Icon size={17} strokeWidth={1.7} />
              </span>
              <h3 className="mt-8 font-display text-[21px] leading-tight tracking-[-0.015em]">{c.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{c.copy}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
