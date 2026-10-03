import Image from "next/image";
import { Mail } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import FAQ from "@/components/sections/FAQ";
import ContactBrief from "@/components/site/ContactBrief";
import { Button, Label, Section } from "@/components/site/ui";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { paths } from "@/lib/routes";

export const metadata = {
  title: "Contact",
  description: `Tell ${company.short} what you are trying to build or fix. We reply with a practical technical direction, scope and delivery plan.`,
  alternates: { canonical: paths.contact },
};

const NEXT_STEPS = [
  ["Share the problem", "What you are building or fixing, who it affects, and why now."],
  ["Get a direction", "We come back with questions or a practical technical direction."],
  ["Agree a plan", "Scope, phases and a delivery plan you can hold us to."],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        label="Contact"
        lead="Tell us what"
        tail="needs to work."
        intro="Describe what you are trying to build or fix. We will reply with a practical technical direction, scope and delivery plan."
        aside={
          <a href={`mailto:${company.email}`} className="group block">
            <span className="text-[12px] uppercase tracking-[0.18em] text-ink-soft">Email</span>
            <span className="mt-2 block break-all font-display text-[22px] leading-tight tracking-[-0.015em] text-ink group-hover:text-eu">
              {company.email}
            </span>
          </a>
        }
      />

      <Section>
        <div className="grid gap-px border border-line bg-line lg:grid-cols-[1.25fr_0.75fr]">
          <div data-anim="rise" className="bg-mist p-6 md:p-10">
            <Label>Project brief</Label>
            <p className="mt-5 font-display text-[clamp(1.7rem,2.6vw,2.2rem)] leading-tight tracking-[-0.02em]">
              A few lines is <span className="font-serif text-[1.08em] italic text-eu">plenty.</span>
            </p>
            <div className="mt-8">
              <ContactBrief email={company.email} topics={services.map((s) => s.name)} />
            </div>
          </div>

          <div className="grid content-start gap-px bg-line">
            <div data-anim="rise" className="bg-eu p-7 text-eu-ink">
              <span className="grid size-11 place-items-center rounded-md bg-lime text-lime-ink">
                <Mail size={17} strokeWidth={1.7} />
              </span>
              <p className="mt-8 text-[11.5px] uppercase tracking-[0.18em] text-eu-ink/60">Email</p>
              <a href={`mailto:${company.email}`} className="mt-2 block break-all font-display text-[28px] leading-tight tracking-[-0.02em]">
                {company.email}
              </a>
              <Button href={`mailto:${company.email}`} external variant="lime" className="mt-7">
                Send an email
              </Button>
            </div>

            <div data-anim="rise" className="bg-paper p-7">
              <p className="text-[11.5px] uppercase tracking-[0.18em] text-muted">Company</p>
              <p className="mt-4 font-display text-[22px] tracking-[-0.015em]">{company.name}</p>
              <address className="mt-2 space-y-1 text-[14px] not-italic leading-relaxed text-muted">
                <span className="block">{company.address}</span>
                <span className="block">Registry code {company.registry}</span>
                <span className="block">VAT {company.vat}</span>
              </address>
              <div className="mt-5 flex items-center gap-3 text-[12.5px] text-muted">
                <Image src="/eu.jpg" alt="European Union flag" width={36} height={24} className="h-6 w-auto rounded-[2px]" />
                {company.region}
              </div>
            </div>

            <div data-anim="rise" className="bg-paper p-7">
              <p className="text-[11.5px] uppercase tracking-[0.18em] text-muted">What happens next</p>
              <ol className="mt-5 space-y-5">
                {NEXT_STEPS.map(([title, copy], i) => (
                  <li key={title} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-md bg-eu text-[11px] text-eu-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[15px] text-ink">{title}</span>
                      <span className="mt-0.5 block text-[13.5px] leading-relaxed text-muted">{copy}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Section>

      <FAQ />
    </>
  );
}
