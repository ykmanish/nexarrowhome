import Link from "next/link";
import { ArrowUpRight, Globe, KeyRound, Wrench } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import { Chip, Dot, Heading, Label, Section } from "@/components/site/ui";
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
        meta={
          <>
            <Chip tone="lime">
              <Dot className="pulse-dot bg-lime-ink" /> {jobs.length} open roles
            </Chip>
            <Chip tone="soft">Remote</Chip>
            <Chip tone="soft">Full-time / Contract</Chip>
          </>
        }
      />

      <Section className="pt-0 lg:pt-0">
        <ul className="border-t border-line">
          {jobs.map((job, i) => (
            <li key={job.slug} data-anim="rise" className="border-b border-line">
              <Link
                href={paths.job(job.slug)}
                className="group grid gap-6 py-8 md:grid-cols-[3rem_1fr_auto] md:items-center md:gap-10 md:py-10"
              >
                <span className="text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                <div>
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
                <div className="flex items-center gap-4 md:flex-col md:items-end">
                  <span className="text-[13px] text-ink-soft">{job.location}</span>
                  <span className="grid size-11 place-items-center rounded-full border border-line-strong transition-all duration-300 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                    <ArrowUpRight size={17} strokeWidth={1.7} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist">
        <Label>Working here</Label>
        <Heading lead="How we work" tail="together." className="mt-6" />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {WAYS.map(({ icon: Icon, title, copy }, i) => (
            <article key={title} data-anim="rise" className={i === 0 ? "rounded-3xl bg-lime p-7 text-lime-ink" : "rounded-3xl bg-paper p-7"}>
              <span className={i === 0 ? "grid size-11 place-items-center rounded-full bg-lime-ink text-lime" : "grid size-11 place-items-center rounded-full bg-ink text-paper"}>
                <Icon size={17} strokeWidth={1.7} />
              </span>
              <h3 className="mt-10 font-display text-[26px] tracking-[-0.015em]">{title}</h3>
              <p className={i === 0 ? "mt-2.5 text-[14px] leading-relaxed text-lime-ink/70" : "mt-2.5 text-[14px] leading-relaxed text-muted"}>
                {copy}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
