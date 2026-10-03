import { notFound } from "next/navigation";
import { Check, Mail } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import { Button, Section } from "@/components/site/ui";
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
    title: `Apply: ${job.title}`,
    description: `How to apply for the ${job.title} role at ${company.short}.`,
    alternates: { canonical: paths.apply(job.slug) },
  };
}

const INCLUDE = [
  "Your resume or CV",
  "Relevant experience and projects",
  "Portfolio, GitHub or shipped-work links",
  "Availability and preferred way of working",
];

export default async function ApplyPage({ params }) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const mailto = `mailto:${company.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`;

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Careers", href: paths.careers },
          { label: job.title, href: paths.job(job.slug) },
          { label: "Apply" },
        ]}
        label="Apply"
        lead="Apply for"
        tail={job.title}
        size="section"
        intro="Send your resume and relevant profile links to our hiring email for review."
      />

      <Section>
        <div className="grid gap-px border border-line bg-line lg:grid-cols-[1.3fr_0.7fr]">
          <article data-anim="rise" className="relative flex min-h-[420px] flex-col overflow-hidden bg-eu p-7 text-eu-ink md:p-12">
            <span className="grid size-12 place-items-center rounded-md bg-lime text-lime-ink">
              <Mail size={19} strokeWidth={1.7} />
            </span>
            <p className="mt-12 text-[11.5px] uppercase tracking-[0.18em] text-eu-ink/60">Careers email</p>
            <p className="mt-3 font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight tracking-[-0.02em]">Send your resume to</p>
            <a href={mailto} className="mt-2 break-all font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-tight tracking-[-0.02em] underline decoration-1 underline-offset-[6px]">
              {company.email}
            </a>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-eu-ink/75">
              Include the role title in the subject, your resume, portfolio or GitHub links, and a short note about
              your most relevant experience.
            </p>
            <div className="mt-auto pt-10">
              <Button href={mailto} external variant="lime">
                Open email draft
              </Button>
            </div>
          </article>

          <div className="grid gap-px bg-line">
            <div data-anim="rise" className="bg-paper p-7">
              <p className="text-[11.5px] uppercase tracking-[0.18em] text-muted">Role details</p>
              <dl className="mt-5 space-y-3 text-[14px]">
                {[
                  ["Role", job.title],
                  ["Team", job.team],
                  ["Location", job.location],
                  ["Type", job.type],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div data-anim="rise" className="bg-mist p-7">
              <p className="text-[11.5px] uppercase tracking-[0.18em] text-muted">What to include</p>
              <ul className="mt-5 space-y-3">
                {INCLUDE.map((t) => (
                  <li key={t} className="flex gap-3 text-[14px] leading-relaxed text-ink-soft">
                    <Check size={15} strokeWidth={2.2} className="mt-1 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
