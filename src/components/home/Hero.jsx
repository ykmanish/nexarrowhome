import Link from "next/link";
import { ArrowUpRight, Layers, Mail } from "lucide-react";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { paths } from "@/lib/routes";
import { AssistantCard, BarsCard, DeployCard, Sky } from "@/components/site/visuals";
import { Button, Dot, RotatingBadge, TextLink, cx } from "@/components/site/ui";

/** Overlapping discs, one per discipline: the "team" in miniature. */
const DISCS = [
  { label: "WEB", className: "bg-[#0d0d0d] text-lime" },
  { label: "SaaS", className: "bg-stone text-ink" },
  { label: "AI", className: "bg-[#0d0d0d] text-lime" },
  { label: "OPS", className: "bg-stone text-ink" },
];

function MaskLine({ children, delay = 0, className = "" }) {
  return (
    <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
      <span data-anim="mask" data-anim-delay={delay} className={cx("block", className)}>
        {children}
      </span>
    </span>
  );
}

const CARD_LINKS = [
  { href: `mailto:${company.email}`, label: `Email ${company.email}`, icon: Mail, external: true },
  { href: paths.services, label: "Our services", icon: Layers },
  { href: paths.contact, label: "Start a project", icon: ArrowUpRight },
];

/**
 * Three columns from 1280px up, built as one frame: the hero fills the first
 * screen, the card stretches to its full height, and both side columns pin
 * their first line to the card's top edge and their last to its bottom edge.
 * The left column hugs the logo's edge and the right column mirrors it
 * against the header's call to action. Laptops get two columns with the team
 * strip beneath; phones stack.
 */
export default function Hero() {
  return (
    <section className="gutter relative grid gap-14 pb-20 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-x-10 lg:gap-y-16 lg:pb-24 lg:pt-10 xl:h-[min(calc(100svh_-_76px),720px)] xl:min-h-[580px] xl:grid-cols-[1fr_minmax(0,400px)_1fr] xl:items-stretch xl:gap-x-12 xl:py-8">
      {/* Who */}
      <div className="xl:flex xl:flex-col xl:justify-between xl:py-2.5">
        <div>
          <p data-anim="fade" className="text-[17px] text-ink-soft md:text-[19px]">
            Hiya, we&rsquo;re {company.short}.
          </p>
          {/* Sized off the viewport so the word never outgrows its column. */}
          <h1 className="mt-3 font-display text-[clamp(3.3rem,5vw,5rem)] uppercase leading-[0.9] tracking-[-0.03em]">
            <MaskLine delay={0.05}>Software</MaskLine>
            <MaskLine delay={0.13} className="text-ink-soft">
              Studio
            </MaskLine>
          </h1>
        </div>
        <div>
          <p data-anim="rise" data-anim-delay="0.25" className="mt-7 max-w-[36ch] text-[15px] leading-relaxed text-muted xl:mt-0">
            We design, build and run custom software, SaaS platforms, AI workflows and cloud infrastructure for teams
            that need the thing to actually work.
          </p>
          <div data-anim="rise" data-anim-delay="0.32" className="mt-8 flex flex-wrap items-center gap-5">
            <Button href={paths.contact} variant="lime">
              Start a project
            </Button>
            <TextLink href={paths.services}>See what we build</TextLink>
          </div>
        </div>
      </div>

      {/* Product card */}
      <div data-anim="scale" data-anim-delay="0.12" className="relative mx-auto w-full max-w-[400px]">
        <div className="rounded-[30px] bg-paper p-2.5 shadow-[0_40px_90px_-45px_rgba(13,13,13,.55)] ring-1 ring-line xl:flex xl:h-full xl:flex-col">
          <Sky
            priority
            className="aspect-[4/5] rounded-[22px] xl:aspect-auto xl:min-h-0 xl:flex-1"
            sizes="(min-width: 1024px) 400px, 92vw"
          >
            <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
              {CARD_LINKS.map(({ href, label, icon: Icon, external }) => {
                const cls =
                  "grid size-10 place-items-center rounded-full border border-white/50 bg-white/55 text-[#0d0d0d] backdrop-blur-md transition-colors hover:bg-white dark:border-white/10 dark:bg-black/45 dark:text-white dark:hover:bg-black/70";
                const icon = <Icon size={15} strokeWidth={1.8} />;
                return external ? (
                  <a key={label} href={href} aria-label={label} className={cls}>
                    {icon}
                  </a>
                ) : (
                  <Link key={label} href={href} aria-label={label} className={cls}>
                    {icon}
                  </Link>
                );
              })}
            </div>
            <DeployCard className="float absolute left-4 top-5" />
            <BarsCard className="float absolute right-4 top-[45%] [animation-delay:-2s]" />
            <AssistantCard className="float absolute bottom-5 left-4 [animation-delay:-4s]" />
          </Sky>
          <p className="flex shrink-0 items-center justify-center gap-2 py-3.5 text-[13px] text-ink-soft">
            <Dot /> Software · SaaS · AI · Cloud
          </p>
        </div>
        {/* Lower right: the one spot clear of all three floating cards at any
            card height, and inside the card so the fold never cuts it off. */}
        <div className="absolute -right-12 bottom-16 hidden md:block">
          <RotatingBadge text="Built in Tallinn • Shipped worldwide • " />
        </div>
      </div>

      {/* What */}
      <div className="lg:col-span-2 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:border-t lg:border-line lg:pt-10 xl:col-span-1 xl:flex-col xl:items-end xl:gap-0 xl:border-0 xl:py-2.5 xl:text-right">
        <div
          data-anim="fade"
          data-anim-delay="0.2"
          className="border-l border-line-strong pl-4 text-[13.5px] leading-relaxed xl:border-l-0 xl:border-r xl:pl-0 xl:pr-4"
        >
          <p className="text-ink-soft">Registered in {company.city}</p>
          <p className="text-muted">EU VAT {company.vat} · Remote-first</p>
        </div>

        <div className="mt-10 lg:mt-0 xl:flex xl:flex-col xl:items-end">
          <p className="font-display text-[clamp(2.5rem,4vw,3.5rem)] uppercase leading-[0.92] tracking-[-0.025em]">
            <MaskLine delay={0.2}>One</MaskLine>
            <MaskLine delay={0.28} className="text-ink-soft">
              Team
            </MaskLine>
          </p>
          <div data-anim="rise" data-anim-delay="0.35" className="mt-7 flex items-center">
            {DISCS.map((d, i) => (
              <span
                key={d.label}
                className={cx(
                  "grid size-11 place-items-center rounded-full border-2 border-paper text-[9.5px] tracking-wide",
                  i > 0 && "-ml-2.5",
                  d.className,
                )}
              >
                {d.label}
              </span>
            ))}
            <span className="-ml-2.5 grid size-11 place-items-center rounded-full border-2 border-paper bg-lime text-[10px] text-lime-ink">
              +API
            </span>
          </div>
        </div>

        <div data-anim="rise" data-anim-delay="0.4" className="mt-8 lg:mt-0">
          <p className="flex items-baseline gap-2.5 xl:justify-end">
            <span className="font-display text-[34px] leading-none">{String(services.length).padStart(2, "0")}</span>
            <span className="text-[14px] text-ink-soft">service lines</span>
          </p>
          <p className="mt-1.5 max-w-[30ch] text-[13.5px] leading-relaxed text-muted xl:ml-auto">
            Strategy, build, AI and cloud, delivered end to end by one team.
          </p>
        </div>
      </div>
    </section>
  );
}
