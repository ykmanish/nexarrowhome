import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import InsightCard from "@/components/sections/InsightCard";
import { CoverArt } from "@/components/site/visuals";
import { Chip, Section, SectionHead } from "@/components/site/ui";
import { company } from "@/content/company";
import { getInsight, insights } from "@/content/insights";
import { pageMeta } from "@/lib/meta";
import { paths } from "@/lib/routes";
import BookCall from "@/components/site/BookCall";

export function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) return {};
  return pageMeta({ title: a.title, description: a.excerpt, path: paths.article(a.slug), type: "article" });
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();

  const related = insights.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Insights", href: paths.insights }, { label: article.tag }]}
        label={article.tag}
        lead={article.title}
        size="section"
        intro={article.excerpt}
        meta={
          <>
            <Chip tone="paper">{article.date}</Chip>
            <Chip tone="paper">{article.read} read</Chip>
            <Chip tone="eu">{company.short} Insights</Chip>
          </>
        }
      />

      <Section>
        <CoverArt type={article.hero} className="aspect-[16/9] md:aspect-[21/8]" />

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_300px] lg:gap-20">
          <article className="max-w-[68ch] space-y-14">
            {article.content.map((sec, i) => (
              <section key={sec.h} id={`part-${i + 1}`} data-anim="rise" className="scroll-mt-28">
                <p className="font-display text-[22px] leading-none text-eu">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.1] tracking-[-0.02em]">
                  {sec.h}
                </h2>
                <div className="prose-body mt-5 text-[17px] leading-[1.75] text-ink-soft">
                  {sec.p.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="In this article" className="border border-t-2 border-line border-t-eu p-6">
              <p className="text-[11.5px] uppercase tracking-[0.18em] text-muted">In this article</p>
              <ol className="mt-4 space-y-3">
                {article.content.map((sec, i) => (
                  <li key={sec.h}>
                    <a href={`#part-${i + 1}`} className="flex gap-3 text-[13.5px] leading-snug text-ink-soft transition-colors hover:text-ink">
                      <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {sec.h}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="bg-eu p-6 text-eu-ink">
              <p className="font-display text-[22px] leading-tight tracking-[-0.015em]">Sound familiar?</p>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-eu-ink/75">
                The next useful step is usually discovery, workflow mapping or technical scoping.
              </p>
              <BookCall variant="lime" className="mt-6">
                Book a call
              </BookCall>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead label="More reading" lead="Related articles" tail="worth reading next." />
        <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-3">
          {related.map((a) => (
            <InsightCard key={a.slug} article={a} surface="paper" />
          ))}
        </div>
      </Section>
    </>
  );
}
