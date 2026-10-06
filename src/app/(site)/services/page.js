import PageHero, { HeroFigure } from "@/components/sections/PageHero";
import DeliveryTrail from "@/components/sections/DeliveryTrail";
import Engagement from "@/components/sections/Engagement";
import FAQ from "@/components/sections/FAQ";
import { ServiceVisual, Sky } from "@/components/site/visuals";
import { Button, Chip, Section, cx } from "@/components/site/ui";
import { services } from "@/content/services";
import { paths } from "@/lib/routes";
import { pageMeta } from "@/lib/meta";
import BookCall from "@/components/site/BookCall";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Software development, SaaS platforms, cloud infrastructure and AI solutions: four service lines delivered end to end by one team.",
  path: paths.services,
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services" }]}
        label="Services"
        lead="What we build"
        tail="and how we run it."
        intro="Four focused service lines covering the full path from product discovery to production operations, all run by the same team."
        actions={<BookCall>Book a call</BookCall>}
        aside={<HeroFigure value={String(services.length).padStart(2, "0")} caption="Service lines, run by one team" />}
        meta={services.map((s) => (
          <Chip key={s.slug} tone="paper">
            {s.code} · {s.name}
          </Chip>
        ))}
      />

      <Section>
        <div className="grid gap-px border border-line bg-line">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={s.slug} id={s.slug} data-anim="rise" className="grid scroll-mt-28 bg-paper lg:grid-cols-2">
                <div className={cx("flex flex-col p-7 md:p-10 lg:p-12", flip && "lg:order-2")}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11.5px] uppercase tracking-[0.18em] text-muted">{s.code}</span>
                    <Chip tone="eu">{s.short}</Chip>
                  </div>
                  <h2 className="mt-10 font-display text-[clamp(2.1rem,3.6vw,3.1rem)] leading-none tracking-[-0.02em]">
                    {s.name}
                  </h2>
                  <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-ink-soft">{s.copy}</p>
                  <ul className="mt-8 grid gap-x-6 border-t border-line sm:grid-cols-2">
                    {s.stack.slice(0, 4).map((line) => (
                      <li key={line} className="flex items-start gap-2.5 border-b border-line py-3 text-[13.5px] text-muted">
                        <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 bg-eu" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-10">
                    <Button href={paths.service(s.slug)}>Explore {s.name}</Button>
                  </div>
                </div>
                <Sky className={cx("min-h-[340px] lg:min-h-[480px]", flip && "lg:order-1")} sizes="(min-width: 1024px) 50vw, 100vw">
                  <div className="absolute inset-x-6 top-1/2 mx-auto max-w-md -translate-y-1/2 md:inset-x-12">
                    <ServiceVisual name={s.visual} />
                  </div>
                </Sky>
              </article>
            );
          })}
        </div>
      </Section>

      <DeliveryTrail />
      <Engagement />
      <FAQ />
    </>
  );
}
