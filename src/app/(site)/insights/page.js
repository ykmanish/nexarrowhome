import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero, { HeroFigure } from "@/components/sections/PageHero";
import InsightCard from "@/components/sections/InsightCard";
import { Cover } from "@/components/site/visuals";
import { Chip, Section, TextLink } from "@/components/site/ui";
import { insights } from "@/content/insights";
import { paths } from "@/lib/routes";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Insights",
  description:
    "Notes on product, engineering, AI and infrastructure decisions, written from delivery experience rather than theory.",
  path: paths.insights,
});

export default function InsightsPage() {
  const [lead, ...rest] = insights;
  const tags = [...new Set(insights.map((a) => a.tag))];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Insights" }]}
        label="Insights"
        lead="Writing around"
        tail="the work."
        intro="Notes on product, engineering, AI and infrastructure decisions, written from delivery experience rather than theory."
        aside={<HeroFigure value={String(insights.length).padStart(2, "0")} caption="Articles written from delivery work" />}
        meta={tags.map((t) => (
          <Chip key={t} tone="paper">
            {t}
          </Chip>
        ))}
      />

      <Section>
        <Link
          href={paths.article(lead.slug)}
          data-anim="rise"
          className="group grid border border-line transition-colors duration-300 hover:border-ink lg:grid-cols-2"
        >
          <Cover
            photo={lead.photo}
            art={lead.hero}
            priority
            className="aspect-[16/11] lg:aspect-auto lg:min-h-[440px]"
            imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="flex flex-col p-7 md:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="eu">Latest</Chip>
              <Chip>{lead.tag}</Chip>
              <Chip tone="soft">
                {lead.date} · {lead.read} read
              </Chip>
            </div>
            <h2 className="mt-8 font-display text-[clamp(1.9rem,3.2vw,2.7rem)] leading-[1.05] tracking-[-0.02em]">
              {lead.title}
            </h2>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-muted">{lead.excerpt}</p>
            <div className="mt-auto pt-10">
              <span className="inline-flex items-center gap-1.5 text-[14px]">
                <span className="border-b border-ink/25 pb-0.5 group-hover:border-ink">Read article</span>
                <ArrowUpRight size={15} strokeWidth={1.8} className="transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </div>
          </div>
        </Link>

        <div className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((a) => (
            <InsightCard key={a.slug} article={a} />
          ))}
        </div>

        <div className="mt-16 flex justify-center border-t border-line pt-10">
          <TextLink href={paths.contact}>Have a problem we should write about? Tell us</TextLink>
        </div>
      </Section>
    </>
  );
}
