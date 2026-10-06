import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, conceptNote } from "@/content/work";
import { paths } from "@/lib/routes";
import { ServiceVisual, Sky } from "@/components/site/visuals";
import { Button, Section, SectionHead } from "@/components/site/ui";

/** The "Concept" tag every concept project carries, so nobody mistakes it for client work. */
export function ConceptTag({ concept, className = "" }) {
  if (!concept) return null;
  return (
    <span className={`bg-ink px-3 py-1.5 text-[10.5px] uppercase tracking-[0.16em] text-paper ${className}`}>
      Concept project
    </span>
  );
}

/** Three case-study cards for the home page, each with its headline figure. */
export default function CaseStudies() {
  return (
    <Section id="work">
      <SectionHead
        label="Case studies"
        lead="Proof,"
        tail="not promises."
        intro={conceptNote}
        action={
          <Button href={paths.work} variant="outline">
            See our work
          </Button>
        }
      />

      <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-3">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            href={paths.caseStudy(cs.slug)}
            data-anim="rise"
            className="group flex flex-col bg-paper transition-colors duration-300 hover:bg-mist"
          >
            <Sky className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, 100vw">
              <ConceptTag concept={cs.concept} className="absolute left-0 top-0 z-10" />
              <div className="absolute inset-x-6 top-12 transition-transform duration-500 group-hover:-translate-y-2">
                <ServiceVisual name={cs.visual} />
              </div>
            </Sky>
            <div className="flex flex-1 flex-col p-6 md:p-7">
              <p className="text-[11.5px] uppercase tracking-[0.16em] text-muted">{cs.sector}</p>
              <h3 className="mt-3 font-display text-[24px] leading-tight tracking-[-0.015em]">{cs.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{cs.summary}</p>
              <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-6">
                <div>
                  <p className="font-display text-[clamp(1.7rem,2.4vw,2.2rem)] leading-none tracking-[-0.02em] text-eu">
                    {cs.metric.value}
                  </p>
                  <p className="mt-2 max-w-[26ch] text-[12.5px] leading-snug text-muted">{cs.metric.label}</p>
                </div>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.7}
                  className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
