import { ArrowUpRight } from "lucide-react";
import { certifications, company, testimonials } from "@/content/company";
import { Section, SectionHead } from "@/components/site/ui";

/** Review profiles that have a link, with the label shown for each. */
const PROFILES = [
  ["Clutch", company.profiles.clutch],
  ["GoodFirms", company.profiles.goodfirms],
  ["Trustpilot", company.profiles.trustpilot],
].filter(([, href]) => href);

/**
 * What clients say, and where to check it: quotes from content/company.js
 * (testimonials), review profiles and certifications. Renders nothing until
 * at least one of them is real, so the page never shows an empty promise.
 */
export default function Testimonials() {
  if (!testimonials.length && !PROFILES.length && !certifications.length) return null;

  return (
    <Section id="proof">
      <SectionHead label="Client voices" lead="In their" tail="own words." />

      {testimonials.length > 0 && (
        <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.quote} data-anim="rise" className="flex flex-col bg-paper p-7 md:p-8">
              <blockquote className="font-serif text-[22px] italic leading-[1.3] text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
              <p className="mt-auto pt-8 text-[14px] text-ink">
                {t.href ? (
                  <a href={t.href} target="_blank" rel="noopener noreferrer" className="hover:text-eu">
                    {t.name}
                  </a>
                ) : (
                  t.name
                )}
              </p>
              <p className="text-[13px] text-muted">
                {t.role}, {t.company}
              </p>
            </li>
          ))}
        </ul>
      )}

      {(PROFILES.length > 0 || certifications.length > 0) && (
        <ul className="mt-8 flex flex-wrap gap-3">
          {PROFILES.map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-[14px] text-ink hover:border-ink"
              >
                Reviews on {label}
                <ArrowUpRight size={14} strokeWidth={1.8} className="transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </li>
          ))}
          {certifications.map((c) => (
            <li key={c.name}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md bg-eu px-4 py-2.5 text-[14px] text-eu-ink"
              >
                {c.name}
                {c.detail && <span className="text-eu-ink/70">· {c.detail}</span>}
                <ArrowUpRight size={14} strokeWidth={1.8} className="transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
