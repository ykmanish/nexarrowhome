import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import { ServiceVisual, Sky } from "@/components/site/visuals";
import { Button, Dot, Heading, Label, Section, cx } from "@/components/site/ui";
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
            <Button href={paths.contact} variant="lime">
              Discuss this service
            </Button>
            <Button href={paths.services} variant="outline" arrow={false}>
              All services
            </Button>
          </>
        }
      />

      {/* Showcase */}
      <Section className="pt-0 lg:pt-0">
        <div data-anim="rise" className="overflow-hidden rounded-[28px]">
          <Sky className="h-[420px] lg:h-[560px]" priority sizes="100vw">
            <div className="absolute inset-x-6 top-1/2 mx-auto max-w-lg -translate-y-1/2">
              <ServiceVisual name={s.visual} />
            </div>
            <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="rounded-full bg-white/85 px-3 py-1 text-[11.5px] text-[#0d0d0d] backdrop-blur">
                  {t}
                </span>
              ))}
            </div>
          </Sky>
        </div>
      </Section>

      {/* Overview */}
      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Label>Overview</Label>
            <Heading lead="What this service" tail="includes in practice." className="mt-6" />
          </div>
          <div>
            <div className="prose-body max-w-2xl text-[17px] leading-relaxed text-ink-soft">
              {s.body.map((p) => (
                <p key={p} data-anim="rise">
                  {p}
                </p>
              ))}
            </div>
            <div data-anim="rise" className="mt-12 rounded-3xl bg-night p-7 text-white md:p-9">
              <Label tone="night">Tools &amp; stack</Label>
              <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {s.stack.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-[14.5px] text-white/80">
                    <Dot className="mt-1.5 bg-lime" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Deliverables */}
      <Section tone="mist">
        <Label>Deliverables</Label>
        <Heading lead="Practical outputs," tail="not vague promises." className="mt-6" />
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {s.deliverables.map((d, i) => (
            <article
              key={d.title}
              data-anim="rise"
              className={cx("flex min-h-[220px] flex-col rounded-3xl p-7", i === 0 ? "bg-lime text-lime-ink" : "bg-paper")}
            >
              <span className={cx("text-[11.5px] uppercase tracking-[0.18em]", i === 0 ? "text-lime-ink/55" : "text-muted")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-auto pt-10 font-display text-[24px] leading-tight tracking-[-0.015em]">{d.title}</h3>
              <p className={cx("mt-2.5 text-[14px] leading-relaxed", i === 0 ? "text-lime-ink/70" : "text-muted")}>{d.copy}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Flow */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Label>Engagement flow</Label>
            <Heading lead="A typical path" tail="from plan to release." className="mt-6" />
            <p data-anim="rise" className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
              Six steps, each with a clear output. The order holds; the depth of each step follows the size of the
              problem.
            </p>
          </div>
          <ol className="border-t border-line">
            {s.process.map((p, i) => (
              <li key={p.t} data-anim="rise" className="flex gap-6 border-b border-line py-6 md:gap-10 md:py-7">
                <span className="w-8 shrink-0 pt-1 text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-[24px] leading-tight tracking-[-0.015em] md:text-[28px]">{p.t}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{p.c}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Outcome */}
      <Section tone="night">
        <Label tone="night">Typical outcome</Label>
        <blockquote
          data-anim="rise"
          className="mt-8 max-w-4xl text-balance font-display text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.06] tracking-[-0.02em]"
        >
          {s.outcome}
        </blockquote>
        <p className="mt-6 text-[13px] text-white/45">{s.name} engagement</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={paths.contact} variant="lime">
            Start a project
          </Button>
          <Button href={paths.insights} variant="ghost">
            Read related insights
          </Button>
        </div>
      </Section>

      {/* Other services */}
      <Section>
        <div className="flex items-center gap-6">
          <h2 className="shrink-0 font-display text-[24px] tracking-[-0.015em]">Explore other services</h2>
          <span data-scrub="line" className="h-px flex-1 bg-line" />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={paths.service(o.slug)}
              data-anim="rise"
              className="group flex flex-col rounded-3xl border border-line p-6 transition-colors duration-300 hover:border-ink md:p-7"
            >
              <span className="text-[11.5px] uppercase tracking-[0.16em] text-muted">{o.code}</span>
              <h3 className="mt-10 font-display text-[24px] leading-tight tracking-[-0.015em]">{o.name}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{o.short}</p>
              <span className="mt-6 grid size-9 place-items-center rounded-full border border-line-strong transition-all duration-300 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                <ArrowUpRight size={15} strokeWidth={1.8} />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
