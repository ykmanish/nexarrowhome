import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero, { HeroFigure } from "@/components/sections/PageHero";
import { ConceptTag } from "@/components/sections/CaseStudies";
import ContactSection from "@/components/sections/ContactSection";
import BookCall from "@/components/site/BookCall";
import { ServiceVisual, Sky } from "@/components/site/visuals";
import { Chip, Section } from "@/components/site/ui";
import { caseStudies } from "@/content/work";
import { pageMeta } from "@/lib/meta";
import { paths } from "@/lib/routes";

export const metadata = pageMeta({
  title: "Case studies",
  description:
    "Approval workflows, an AI front-desk assistant, a SaaS MVP, a logistics portal and agency cloud releases: how Nexarrow approaches each, chapter by chapter.",
  path: paths.work,
});

/** The case study index: one row per story, figure and picture beside it. */
export default function WorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Case studies" }]}
        label="Our work"
        lead="Case studies"
        tail="told start to finish."
        intro="Five common problems, each followed from the first conversation to life after launch: the situation, the approach, what gets built, and how it ships week by week."
        actions={<BookCall>Book a call</BookCall>}
        aside={<HeroFigure value={String(caseStudies.length).padStart(2, "0")} caption="In-depth stories, concept work clearly labelled" />}
      />

      <Section>
        <ol className="border-t border-line xl:-mx-6">
          {caseStudies.map((cs, i) => (
            <li key={cs.slug} data-anim="rise" className="border-b border-line">
              <Link
                href={paths.caseStudy(cs.slug)}
                className="group grid gap-8 py-10 transition-colors duration-300 hover:bg-mist md:grid-cols-2 xl:grid-cols-[var(--frame-cols)] xl:gap-0 xl:py-0 xl:*:px-6"
              >
                <div className="flex items-center gap-4 md:col-span-2 xl:col-span-1 xl:flex-col xl:items-start xl:py-10">
                  <span className="font-display text-[40px] leading-none tracking-[-0.03em] text-eu">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ConceptTag concept={cs.concept} />
                </div>

                <div className="flex flex-col xl:py-10">
                  <p className="text-[11.5px] uppercase tracking-[0.16em] text-muted">{cs.sector}</p>
                  <h2 className="mt-3 font-display text-[clamp(1.8rem,2.8vw,2.5rem)] leading-[1.05] tracking-[-0.02em] transition-colors group-hover:text-eu">
                    {cs.title}
                  </h2>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{cs.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Chip tone="soft">{cs.duration}</Chip>
                    <Chip tone="soft">{cs.offer}</Chip>
                  </div>
                  <div className="mt-auto flex items-end justify-between gap-6 pt-8">
                    <div>
                      <p className="font-display text-[clamp(1.6rem,2.2vw,2rem)] leading-none tracking-[-0.02em] text-eu">
                        {cs.metric.value}
                      </p>
                      <p className="mt-2 max-w-[30ch] text-[12.5px] leading-snug text-muted">{cs.metric.label}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 text-[14px] text-ink">
                      <span className="border-b border-ink/25 pb-0.5 group-hover:border-ink">Read the story</span>
                      <ArrowUpRight size={15} strokeWidth={1.8} className="transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </div>
                </div>

                <div className="relative overflow-hidden xl:col-span-2 xl:py-10">
                  {cs.photo ? (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={cs.photo.src}
                        alt={cs.photo.alt}
                        fill
                        sizes="(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : (
                    <Sky className="aspect-[16/10]" sizes="(min-width: 1280px) 40vw, 100vw">
                      <div className="absolute inset-x-6 top-8 transition-transform duration-500 group-hover:-translate-y-2">
                        <ServiceVisual name={cs.visual} />
                      </div>
                    </Sky>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <ContactSection />
    </>
  );
}
