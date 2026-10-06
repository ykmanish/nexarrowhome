import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import PageHero, { HeroFigure } from "@/components/sections/PageHero";
import CalendlyBanner from "@/components/sections/CalendlyBanner";
import ContactSection from "@/components/sections/ContactSection";
import FAQ from "@/components/sections/FAQ";
import { Section, SectionHead } from "@/components/site/ui";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/meta";
import { paths } from "@/lib/routes";

export const metadata = pageMeta({
  title: "Contact",
  description: `Book an intro call or send a brief. ${company.short} replies ${company.reply} with a practical direction, scope and price.`,
  path: paths.contact,
});

const NEXT_STEPS = [
  ["Share the problem", "A call or a brief: what you are building or fixing, who it affects, and why now."],
  ["Get a direction", `We reply ${company.reply} with questions, a practical direction and a rough price.`],
  ["Start small", "A paid audit or pilot, or a fixed-scope plan with milestones, a contract and a deposit."],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        label="Contact"
        lead="Tell us what"
        tail="needs to work."
        intro="Book a short call or send a brief. Either way you get a straight answer on fit, approach and cost."
        aside={<HeroFigure value="24h" caption="Every enquiry answered within 24 hours" />}
      />

      <CalendlyBanner />
      <ContactSection id="brief" head={false} booking={false} />

      <Section>
        <SectionHead label="What happens next" lead="Three steps," tail="all written down." />
        <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-4">
          {NEXT_STEPS.map(([title, copy], i) => (
            <div key={title} data-anim="rise" className="bg-paper p-7">
              <span className="grid size-9 place-items-center rounded-md bg-eu text-[12px] text-eu-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 font-display text-[22px] tracking-[-0.015em]">{title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{copy}</p>
            </div>
          ))}
          <div data-anim="rise" className="bg-mist p-7">
            <p className="text-[11.5px] uppercase tracking-[0.18em] text-muted">The company</p>
            <p className="mt-4 font-display text-[22px] tracking-[-0.015em]">{company.name}</p>
            <address className="mt-2 space-y-1 text-[13.5px] not-italic leading-relaxed text-muted">
              <span className="block">{company.address}</span>
              <span className="block">Registry code {company.registry}</span>
              <span className="block">VAT {company.vat}</span>
              <span className="block">Engineering led from {company.engineering}</span>
              {company.phone && <span className="block">{company.phone}</span>}
            </address>
            <div className="mt-5 flex items-center gap-3 text-[12.5px] text-muted">
              <Image src="/eu.jpg" alt="European Union flag" width={36} height={24} className="h-6 w-auto rounded-[2px]" />
              {company.region}
            </div>
            <a
              href={company.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-1.5 text-[13.5px] text-ink"
            >
              <span className="border-b border-ink/25 pb-0.5 group-hover:border-ink">Verify us</span>
              <ArrowUpRight size={14} strokeWidth={1.8} className="transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>
        </div>
      </Section>

      <FAQ />
    </>
  );
}
