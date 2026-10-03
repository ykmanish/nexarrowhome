import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import { Button, Chip, Frame, Section, SectionHead, cx } from "@/components/site/ui";
import { getJob, jobs } from "@/content/careers";
import { company } from "@/content/company";
import { paths } from "@/lib/routes";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  return {
    title: `${job.title} | Careers`,
    description: job.summary,
    alternates: { canonical: paths.job(job.slug) },
  };
}

export default async function JobPage({ params }) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const groups = [
    { title: "Responsibilities", items: job.responsibilities, feature: true },
    { title: "Requirements", items: job.requirements },
    { title: "Nice to have", items: job.niceToHave },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Careers", href: paths.careers }, { label: job.title }]}
        label={job.team}
        lead={job.title}
        intro={job.summary}
        actions={
          <>
            <Button href={paths.apply(job.slug)} variant="eu">
              Apply for this role
            </Button>
            <Button href={paths.contact} variant="outline" arrow={false}>
              Ask a question
            </Button>
          </>
        }
        meta={
          <>
            <Chip tone="paper">{job.location}</Chip>
            <Chip tone="paper">{job.type}</Chip>
            <Chip tone="paper">{company.name}</Chip>
          </>
        }
      />

      <Section>
        <SectionHead label="The role" lead="What you will" tail="be doing." />
        <Frame className="mt-10">
          <p
            data-anim="rise"
            className="font-display text-[clamp(1.35rem,2.2vw,1.8rem)] leading-[1.35] tracking-[-0.01em] text-ink-soft xl:col-span-2 xl:col-start-2"
          >
            {job.overview}
          </p>
        </Frame>

        <div className="mt-16 grid gap-px border border-line bg-line xl:grid-cols-3">
          {groups.map((g) => (
            <article
              key={g.title}
              data-anim="rise"
              className={cx("p-7 md:p-8", g.feature ? "bg-eu text-eu-ink" : "bg-paper")}
            >
              <h3 className="font-display text-[26px] tracking-[-0.015em]">{g.title}</h3>
              <ul className={cx("mt-6 border-t", g.feature ? "border-eu-ink/15" : "border-line")}>
                {g.items.map((item) => (
                  <li
                    key={item}
                    className={cx(
                      "flex gap-3 border-b py-3 text-[14.5px] leading-relaxed",
                      g.feature ? "border-eu-ink/15 text-eu-ink/85" : "border-line text-ink-soft",
                    )}
                  >
                    <Check size={15} strokeWidth={2.2} className="mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="night">
        <SectionHead
          tone="night"
          label="Role stack"
          lead="The tools you will"
          tail="use most."
          action={
            <Button href={paths.apply(job.slug)} variant="lime">
              Apply for this role
            </Button>
          }
        />
        <Frame className="mt-10">
          <div data-anim="rise" className="flex flex-wrap gap-2.5 xl:col-span-3 xl:col-start-2">
            {job.stack.map((s) => (
              <span key={s} className="rounded-md border border-white/15 px-4 py-2 text-[13.5px] text-white/80">
                {s}
              </span>
            ))}
          </div>
        </Frame>
      </Section>
    </>
  );
}
