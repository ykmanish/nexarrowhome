import PageHero from "@/components/sections/PageHero";
import DeliveryTrail from "@/components/sections/DeliveryTrail";
import Engagement from "@/components/sections/Engagement";
import FAQ from "@/components/sections/FAQ";
import { ServiceVisual, Sky } from "@/components/site/visuals";
import { Button, Chip, Dot, Section, cx } from "@/components/site/ui";
import { services } from "@/content/services";
import { paths } from "@/lib/routes";

export const metadata = {
  title: "Services",
  description:
    "Software development, SaaS platforms, cloud infrastructure and AI solutions: four service lines delivered end to end by one team.",
  alternates: { canonical: paths.services },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services" }]}
        label="Services"
        lead="What we build"
        tail="and how we run it."
        intro="Four focused service lines covering the full path from product discovery to production operations, all run by the same team."
        actions={
          <Button href={paths.contact} variant="lime">
            Start a project
          </Button>
        }
        meta={services.map((s) => (
          <Chip key={s.slug} tone="soft">
            {s.code} · {s.name}
          </Chip>
        ))}
      />

      <Section className="space-y-4 pt-0 lg:pt-0">
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={s.slug}
              id={s.slug}
              data-anim="rise"
              className="grid scroll-mt-28 overflow-hidden rounded-[28px] border border-line lg:grid-cols-2"
            >
              <div className={cx("flex flex-col p-7 md:p-10 lg:p-12", flip && "lg:order-2")}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11.5px] uppercase tracking-[0.18em] text-muted">{s.code}</span>
                  <Chip tone="lime">{s.short}</Chip>
                </div>
                <h2 className="mt-10 font-display text-[clamp(2.1rem,3.6vw,3.1rem)] leading-none tracking-[-0.02em]">
                  {s.name}
                </h2>
                <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-ink-soft">{s.copy}</p>
                <ul className="mt-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {s.stack.slice(0, 4).map((line) => (
                    <li key={line} className="flex items-start gap-2.5 text-[13.5px] text-muted">
                      <Dot className="mt-1.5 bg-lime-deep" />
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
      </Section>

      <DeliveryTrail />
      <Engagement />
      <div className="border-t border-line">
        <FAQ />
      </div>
    </>
  );
}
