import Link from "next/link";
import { ArrowUpRight, Globe, KeyRound, Wrench } from "lucide-react";
import PageHero, { HeroFigure } from "@/components/sections/PageHero";
import { Chip, Section, SectionHead, cx } from "@/components/site/ui";
import { jobs } from "@/content/careers";
import { paths } from "@/lib/routes";

export const metadata = {
  title: "Careers",
  description:
    "Open engineering roles at Nexarrow across frontend, backend, AI integration and cloud. Remote-first, ownership-driven product work.",
  alternates: { canonical: paths.careers },
};

const WAYS = [
  {
    icon: KeyRound,
    title: "Ownership",
    copy: "You own work end to end, from scoping and architecture through to production and what happens after.",
  },
  {
    icon: Globe,
    title: "Remote-first",
    copy: "Roles are remote, with clear written communication and documented decisions at the centre of the work.",
  },
  {
    icon: Wrench,
    title: "Real problems",
    copy: "Systems businesses depend on every day: internal platforms, SaaS products, AI workflows and infrastructure.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Careers" }]}
        label="Careers"
        lead="Build useful products"
        tail="with us."
        intro="We look for engineers who care about ownership, maintainability, delivery quality and solving real business problems."
        aside={<HeroFigure value={String(jobs.length).padStart(2, "0")} caption="Open roles, remote" />}
        meta={
          <>
            <Chip tone="eu">
              <span aria-hidden="true" className="pulse-dot size-1.5 bg-lime" /> {jobs.length} open roles
            </Chip>
            <Chip tone="paper">Remote</Chip>
            <Chip tone="paper">Full-time / Contract</Chip>
          </>
        }
      />

      <Section>
        <SectionHead label="Open roles" lead="Where you" tail="could fit in." />
        <ul className="mt-14 border-t border-line xl:-mx-6">
          {jobs.map((job, i) => (
            <li key={job.slug} data-anim="rise" className="border-b border-line">
              <Link
                href={paths.job(job.slug)}
                className="group grid gap-6 py-8 transition-colors duration-300 hover:bg-mist md:grid-cols-[3rem_1fr_auto] md:items-center md:gap-10 md:py-10 xl:grid-cols-[var(--frame-cols)] xl:gap-0 xl:*:px-6"
              >
                <span className="font-display text-[22px] leading-none text-eu">{String(i + 1).padStart(2, "0")}</span>
                <div className="xl:col-span-2">
                  <p className="text-[11.5px] uppercase tracking-[0.18em] text-muted">{job.team}</p>
                  <h2 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-none tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1.5">
                    {job.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted">{job.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.stack.slice(0, 4).map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 md:flex-col md:items-end xl:items-start xl:justify-center">
                  <span className="text-[13px] text-ink-soft">{job.location}</span>
                  <span className="grid size-11 place-items-center rounded-md border border-line-strong transition-all duration-300 group-hover:border-eu group-hover:bg-eu group-hover:text-eu-ink">
                    <ArrowUpRight size={17} strokeWidth={1.7} className="transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist">
        <SectionHead label="Working here" lead="How we work" tail="together." />
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {WAYS.map(({ icon: Icon, title, copy }, i) => (
            <article key={title} data-anim="rise" className={cx("p-7 md:p-8", i === 0 ? "bg-eu text-eu-ink" : "bg-paper")}>
              <span
                className={cx(
                  "grid size-11 place-items-center rounded-md",
                  i === 0 ? "bg-lime text-lime-ink" : "bg-ink text-paper",
                )}
              >
                <Icon size={17} strokeWidth={1.7} />
              </span>
              <h3 className="mt-10 font-display text-[26px] tracking-[-0.015em]">{title}</h3>
              <p className={cx("mt-2.5 text-[14px] leading-relaxed", i === 0 ? "text-eu-ink/75" : "text-muted")}>{copy}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
