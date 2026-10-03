import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import { Button, Chip, Heading, Label, Section, cx } from "@/components/site/ui";
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
    { title: "Responsibilities", items: job.responsibilities, tone: "lime" },
    { title: "Requirements", items: job.requirements, tone: "line" },
    { title: "Nice to have", items: job.niceToHave, tone: "mist" },
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
            <Button href={paths.apply(job.slug)} variant="lime">
              Apply for this role
            </Button>
            <Button href={paths.contact} variant="outline" arrow={false}>
              Ask a question
            </Button>
          </>
        }
        meta={
          <>
            <Chip tone="soft">{job.location}</Chip>
            <Chip tone="soft">{job.type}</Chip>
            <Chip tone="soft">{company.name}</Chip>
          </>
        }
      />

      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Label>The role</Label>
            <Heading lead="What you will" tail="be doing." className="mt-6" />
          </div>
          <p data-anim="rise" className="font-display text-[clamp(1.35rem,2.2vw,1.8rem)] leading-[1.35] tracking-[-0.01em] text-ink-soft">
            {job.overview}
          </p>
        </div>

        <div className="mt-16 grid gap-4 xl:grid-cols-3">
          {groups.map((g) => (
            <article
              key={g.title}
              data-anim="rise"
              className={cx(
                "rounded-3xl p-7 md:p-8",
                g.tone === "lime" && "bg-lime text-lime-ink",
                g.tone === "line" && "border border-line",
                g.tone === "mist" && "bg-mist",
              )}
            >
              <h3 className="font-display text-[26px] tracking-[-0.015em]">{g.title}</h3>
              <ul className="mt-6 space-y-3.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className={cx("flex gap-3 text-[14.5px] leading-relaxed", g.tone === "lime" ? "text-lime-ink/80" : "text-ink-soft")}
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
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Label tone="night">Role stack</Label>
            <Heading lead="The tools you will" tail="use most." tone="night" className="mt-6" />
            <div data-anim="rise" className="mt-10 flex flex-wrap gap-2.5">
              {job.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/15 px-4 py-2 text-[13.5px] text-white/80">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div data-anim="rise">
            <Button href={paths.apply(job.slug)} variant="lime">
              Apply for this role
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
