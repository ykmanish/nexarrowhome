import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { company } from "@/content/company";
import { paths } from "@/lib/routes";
import HeroShowcase from "@/components/home/HeroShowcase";
import { Button, RotatingBadge, TextLink } from "@/components/site/ui";

function MaskLine({ children, delay = 0 }) {
  return (
    <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
      <span data-anim="mask" data-anim-delay={delay} className="block">
        {children}
      </span>
    </span>
  );
}

/** One release, start to finish: what ticks past inside the sky pill. */
const TICKER = [
  ["Build", "42s"],
  ["Tests", "passed"],
  ["Deploy", "eu-north-1"],
];

/**
 * A slice of the sky set into the headline like a word. From laptop width a
 * release ticks through it; on narrower screens, where it is only a few
 * letters wide, it carries the arrow instead. The last ticker row repeats the
 * first so the loop never jumps.
 */
function SkyPill() {
  return (
    <span
      aria-hidden="true"
      className="relative mr-[0.2em] inline-block h-[0.72em] w-[1.75em] overflow-hidden rounded-full align-baseline shadow-[0_18px_40px_-22px_rgba(13,13,13,.6)] lg:w-[2.35em]"
    >
      <Image src="/hero-sky.jpg" alt="" fill priority sizes="(min-width: 1024px) 340px, 120px" className="object-cover" />
      <span className="absolute inset-0 bg-gradient-to-b from-white/0 to-[#0d0d0d]/20 dark:from-black/30 dark:to-black/55" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid size-[0.44em] place-items-center rounded-full bg-lime text-lime-ink lg:hidden">
          <ArrowUpRight className="size-[0.26em]" strokeWidth={2} />
        </span>
        <span className="hidden h-9 overflow-hidden rounded-full border border-white/60 bg-white/80 px-3.5 font-sans text-[13.5px] leading-none tracking-normal text-[#0d0d0d] shadow-[0_10px_30px_-14px_rgba(13,13,13,.5)] backdrop-blur-md dark:border-white/10 dark:bg-[#141414]/75 dark:text-white lg:block xl:h-11 xl:px-4 xl:text-[15px]">
          <span className="ticker block">
            {[...TICKER, TICKER[0]].map(([name, meta], i) => (
              <span key={i} className="flex h-9 items-center gap-2 whitespace-nowrap xl:h-11 xl:gap-2.5">
                <span className="grid size-4 place-items-center rounded-full bg-[#0d0d0d] text-[var(--lime)] dark:bg-[var(--lime)] dark:text-[#0d0d0d] xl:size-5">
                  <Check size={11} strokeWidth={3} />
                </span>
                {name}
                <span className="opacity-55">{meta}</span>
              </span>
            ))}
          </span>
        </span>
      </span>
    </span>
  );
}

/**
 * An editorial headline across the full width, with the sky set into it as a
 * word and the last word marked in lime. From 1280px up the intro and calls
 * to action sit in the space the short last line leaves free; below that they
 * follow the headline. The live showcase underneath peeks over the fold.
 */
export default function Hero() {
  return (
    <section className="gutter relative pb-20 pt-8 lg:pb-28 lg:pt-10">
      <div
        data-anim="fade"
        className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2 border-b border-line pb-5"
      >
        <p className="text-[17px] text-ink-soft md:text-[19px]">Hiya, we&rsquo;re {company.short}.</p>
        <p className="text-[13px] text-muted">
          Registered in {company.city} · EU VAT {company.vat} · Remote-first
        </p>
      </div>

      <div className="relative mt-8 lg:mt-10">
        <h1 className="font-display text-[clamp(3rem,8.6vw,9rem)] leading-[0.9] tracking-[-0.035em]">
          <MaskLine delay={0.05}>Software that</MaskLine>
          <MaskLine delay={0.13}>
            <SkyPill />
            actually
          </MaskLine>
          <MaskLine delay={0.21}>
            <span className="-ml-[0.1em] inline-block rounded-[0.16em] bg-lime px-[0.1em] text-lime-ink">works.</span>
          </MaskLine>
        </h1>

        <div className="absolute right-0 top-0 hidden origin-top-right scale-[0.8] xl:block min-[1440px]:scale-100">
          <RotatingBadge text="Built in Tallinn • Shipped worldwide • " />
        </div>

        <div className="mt-9 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12 xl:absolute xl:bottom-[0.15em] xl:right-0 xl:mt-0 xl:w-[400px] xl:flex-col xl:items-start xl:gap-7">
          <p data-anim="rise" data-anim-delay="0.25" className="max-w-[42ch] text-[15px] leading-relaxed text-muted">
            We design, build and run custom software, SaaS platforms, AI workflows and cloud infrastructure. One
            team, from first call to production.
          </p>
          <div data-anim="rise" data-anim-delay="0.32" className="flex shrink-0 flex-wrap items-center gap-5">
            <Button href={paths.contact} variant="lime">
              Start a project
            </Button>
            <TextLink href={paths.services}>See what we build</TextLink>
          </div>
        </div>
      </div>

      <HeroShowcase />
    </section>
  );
}
