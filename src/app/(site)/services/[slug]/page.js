import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import { ServiceVisual, Sky } from "@/components/site/visuals";
import { Button, Chip, Frame, Label, Section, SectionHead, cx } from "@/components/site/ui";
import { getService, services } from "@/content/services";
import { paths } from "@/lib/routes";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.name,
    description: s.subtitle,
    alternates: { canonical: paths.service(s.slug) },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: paths.services }, { label: s.name }]}
        label={s.code}
        lead={s.titleLines[0]}
        tail={s.titleLines[1]}
        intro={s.subtitle}
        actions={
          <>
            <Button href={paths.contact} variant="eu">
              Discuss this service
            </Button>
            <Button href={paths.services} variant="outline" arrow={false}>
              All services
            </Button>
          </>
        }
        meta={s.tags.map((t) => (
          <Chip key={t} tone="paper">
            {t}
          </Chip>
        ))}
      />

      {/* Showcase */}
      <Section>
        <div data-anim="rise" className="overflow-hidden">
          <Sky className="h-[420px] lg:h-[560px]" priority sizes="100vw">
            <span className="absolute left-0 top-0 z-10 bg-eu px-3.5 py-2 text-[11.5px] uppercase tracking-[0.14em] text-eu-ink">
              {s.code}
            </span>
            <div className="absolute inset-x-6 top-1/2 mx-auto max-w-lg -translate-y-1/2">
              <ServiceVisual name={s.visual} />
            </div>
          </Sky>
        </div>
      </Section>

      {/* Overview */}
      <Section>
        <SectionHead label="Overview" lead="What this service" tail="includes in practice." />
        <Frame className="mt-14 grid gap-12 xl:gap-0">
          <div className="xl:col-span-2 xl:col-start-2">
            <div className="prose-body max-w-2xl text-[17px] leading-relaxed text-ink-soft">
              {s.body.map((p) => (
                <p key={p} data-anim="rise">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div data-anim="rise" className="bg-night p-6 text-white xl:-mt-2 xl:!p-6">
            <Label tone="night">Tools &amp; stack</Label>
            <ul className="mt-5 border-t border-white/10">
              {s.stack.map((line) => (
                <li key={line} className="flex items-start gap-3 border-b border-white/10 py-3 text-[13.5px] text-white/80">
                  <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 bg-lime" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Frame>
      </Section>

      {/* Deliverables */}
      <Section tone="mist">
        <SectionHead label="Deliverables" lead="Practical outputs," tail="not vague promises." />
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {s.deliverables.map((d, i) => (
            <article
              key={d.title}
              data-anim="rise"
              className={cx("flex min-h-[230px] flex-col p-7", i === 0 ? "bg-eu text-eu-ink" : "bg-paper")}
            >
              <span className={cx("text-[11.5px] uppercase tracking-[0.18em]", i === 0 ? "text-eu-ink/60" : "text-muted")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-auto pt-10 font-display text-[24px] leading-tight tracking-[-0.015em]">{d.title}</h3>
              <p className={cx("mt-2.5 text-[14px] leading-relaxed", i === 0 ? "text-eu-ink/75" : "text-muted")}>{d.copy}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Flow */}
      <Section>
        <SectionHead
          label="Engagement flow"
          lead="A typical path"
          tail="from plan to release."
          intro="Six steps, each with a clear output. The order holds; the depth of each step follows the size of the problem."
        />
        <ol className="mt-14 border-t border-line xl:-mx-6">
          {s.process.map((p, i) => (
            <li
              key={p.t}
              data-anim="rise"
              className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-6 md:gap-10 md:py-7 xl:grid-cols-[var(--frame-cols)] xl:gap-0 xl:*:px-6"
            >
              <span className="pt-1 font-display text-[22px] leading-none text-eu">{String(i + 1).padStart(2, "0")}</span>
              <div className="xl:col-span-2">
                <h3 className="font-display text-[24px] leading-tight tracking-[-0.015em] md:text-[28px]">{p.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{p.c}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Outcome */}
      <Section tone="night">
        <Frame className="grid gap-8 xl:gap-0">
          <div data-anim="fade" className="xl:border-r xl:border-white/10">
            <Label tone="night">Typical outcome</Label>
          </div>
          <div className="xl:col-span-2">
            <blockquote
              data-anim="rise"
              className="text-balance font-display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.06] tracking-[-0.02em] xl:-mt-1.5"
            >
              {s.outcome}
            </blockquote>
            <p className="mt-6 text-[13px] text-white/45">{s.name} engagement</p>
          </div>
          <div className="flex flex-wrap gap-3 xl:flex-col xl:items-start xl:justify-end">
            <Button href={paths.contact} variant="lime">
              Start a project
            </Button>
            <Button href={paths.insights} variant="ghost">
              Related insights
            </Button>
          </div>
        </Frame>
      </Section>

      {/* Other services */}
      <Section>
        <SectionHead label="More services" lead="Explore" tail="other services." />
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={paths.service(o.slug)}
              data-anim="rise"
              className="group flex flex-col bg-paper p-6 transition-colors duration-300 hover:bg-mist md:p-8"
            >
              <span className="text-[11.5px] uppercase tracking-[0.16em] text-muted">{o.code}</span>
              <h3 className="mt-12 font-display text-[26px] leading-tight tracking-[-0.015em]">{o.name}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{o.short}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[13.5px] text-ink">
                <span className="border-b border-ink/25 pb-0.5 group-hover:border-ink">Explore</span>
                <ArrowUpRight size={15} strokeWidth={1.8} className="transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
