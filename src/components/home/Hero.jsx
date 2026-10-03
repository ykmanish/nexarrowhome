import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Check } from "lucide-react";
import { paths } from "@/lib/routes";
import TallinnClock from "@/components/home/TallinnClock";
import { CodeVisual } from "@/components/site/visuals";
import { BrandMark, Button, TextLink, cx } from "@/components/site/ui";

function MaskLine({ children, delay = 0 }) {
  return (
    <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
      <span data-anim="mask" data-anim-delay={delay} className="block whitespace-nowrap">
        {children}
      </span>
    </span>
  );
}

/** Five-point star path centred on (cx, cy). */
function starPath(cx, cy, r) {
  const points = Array.from({ length: 10 }, (_, i) => {
    const radius = i % 2 ? r * 0.382 : r;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    return `${(cx + radius * Math.cos(a)).toFixed(2)},${(cy + radius * Math.sin(a)).toFixed(2)}`;
  });
  return `M${points.join("L")}Z`;
}

/** Twelve stars in a ring — the European nod, drawn in our own colours. */
const STAR_RING = Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6 - Math.PI / 2;
  return starPath(38 * Math.cos(a), 38 * Math.sin(a), 6.4);
}).join("");

function StarRing({ className = "" }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true">
      <path d={STAR_RING} fill="#f2c94c" />
    </svg>
  );
}

/** Estonia's tricolour, small enough to sit in a line of text. */
function EstonianFlag() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-[13px] w-5 shrink-0 flex-col overflow-hidden rounded-[3px] ring-1 ring-line-strong"
    >
      <span className="flex-1 bg-[#0072ce]" />
      <span className="flex-1 bg-[#0d0d0d]" />
      <span className="flex-1 bg-white" />
    </span>
  );
}

/**
 * Concave corner in the page colour: fills the corner of a 26px box outside a
 * quarter circle centred on its far corner, so a paper edge flows into a tile
 * edge instead of meeting it at a hard angle.
 */
function Fillet({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute hidden size-[26px] bg-[radial-gradient(circle_at_100%_100%,transparent_25.5px,var(--paper)_26px)] xl:block",
        className,
      )}
    />
  );
}

const TILE = "relative overflow-hidden rounded-[28px]";

/** Grounded in how we already work — see content/company.js. */
const PROOF = ["EU-registered company", "Milestone delivery", "Documented decisions"];

/**
 * An editorial collage. From 1280px up three columns of pastel tiles frame the
 * headline: the narrow blue tile and the blush tile step down around it, and
 * the calls to action sit on a paper tab cut into the blush tile, joined by
 * concave fillets. Below that the tiles simply stack under the headline.
 */
export default function Hero() {
  return (
    <section className="gutter pb-20 pt-4 lg:pb-28 xl:pt-5">
      <div className="grid gap-3.5 xl:h-[clamp(620px,calc(100svh-112px),760px)] xl:grid-cols-[12.5%_minmax(0,1fr)_41%] xl:grid-rows-1">
        {/* Headline, calls to action and the blush tile */}
        <div className="flex flex-col xl:col-start-2 xl:row-start-1 xl:min-h-0">
          <div className="xl:pt-[3%]">
            <p data-anim="fade" className="flex items-center gap-2.5 text-[14px] text-ink-soft md:text-[15px]">
              <EstonianFlag />
              Software studio in Tallinn, Estonia
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.75rem,10.5vw,6.25rem)] leading-[0.95] tracking-[-0.035em] xl:text-[min(6.1vw,5.5rem)]">
              <MaskLine delay={0.05}>A software and</MaskLine>
              <MaskLine delay={0.12}>AI studio built</MaskLine>
              <MaskLine delay={0.19}>
                in{" "}
                <span className="font-serif text-[1.14em] italic leading-none tracking-[-0.01em]">Europe</span>.
              </MaskLine>
            </h1>
          </div>

          <div className="relative mt-8 flex flex-col xl:mt-7 xl:min-h-0 xl:flex-1">
            <div
              data-anim="rise"
              data-anim-delay="0.28"
              className="relative z-10 flex w-fit flex-wrap items-center gap-x-6 gap-y-4 xl:absolute xl:left-0 xl:top-0 xl:rounded-br-[26px] xl:bg-paper xl:pb-[30px] xl:pr-7"
            >
              <Button href={paths.contact}>Start a project</Button>
              <TextLink href={paths.services}>See what we build</TextLink>
              <Fillet className="left-full top-6" />
              <Fillet className="left-0 top-full" />
            </div>

            <div
              data-anim="rise"
              data-anim-delay="0.34"
              className={cx(
                TILE,
                "mt-10 flex flex-col justify-end gap-6 bg-[image:var(--tile-blush)] p-6 sm:p-8 xl:absolute xl:inset-x-0 xl:bottom-0 xl:top-6 xl:mt-0 xl:justify-between xl:p-7 xl:pt-[84px]",
              )}
            >
              <p className="max-w-[24ch] font-serif text-[clamp(1.75rem,2.35vw,2.35rem)] leading-[1.02] tracking-[-0.01em] text-ink">
                We don&rsquo;t just ship software. <span className="italic text-ink-soft">We stay to keep it running.</span>
              </p>
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
                <p className="max-w-[38ch] text-[13px] leading-relaxed text-ink-soft">
                  Custom software, SaaS platforms, AI workflows and cloud infrastructure, designed, built and run by one
                  team.
                </p>
                <Link
                  href={paths.services}
                  className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-dashed border-ink/40 px-4 py-2 text-[13px] text-ink transition-colors hover:border-solid hover:border-ink hover:bg-paper/60"
                >
                  Explore services
                  <ArrowDownRight
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:-rotate-90"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dusk tile: the editorial card, proof points and the intro call */}
        <div
          data-anim="scale"
          data-anim-delay="0.1"
          className={cx(TILE, "h-[500px] bg-[image:var(--tile-dusk)] sm:h-[540px] xl:col-start-3 xl:row-start-1 xl:h-auto")}
        >
          <article className="absolute bottom-0 left-[6%] top-[9%] w-[76%] rounded-t-[20px] bg-paper p-5 shadow-[0_30px_70px_-35px_rgba(13,13,13,.55)] sm:w-[56%] xl:left-[8%] xl:top-[12%] xl:w-[52%]">
            <span className="inline-block rounded-full border border-line-strong px-2.5 py-0.5 text-[10.5px] text-ink-soft">
              Studio notes
            </span>
            <p className="mt-3 font-serif text-[clamp(1.45rem,1.9vw,1.85rem)] leading-[1.02] tracking-[-0.005em]">
              Engineering software the European way: <span className="italic">clear, careful and built to last.</span>
            </p>
            <span className="mt-6 inline-block rounded-full border border-line-strong px-2.5 py-0.5 text-[10.5px] text-ink-soft">
              How we work
            </span>
            <p className="mt-3 font-serif text-[clamp(1.25rem,1.5vw,1.5rem)] leading-[1.05]">
              Milestones you can click, not slide decks.
            </p>
            <CodeVisual className="mt-5" />
          </article>

          <ul className="absolute right-[5%] top-[9%] hidden space-y-1.5 rounded-2xl border border-white/60 bg-white/55 p-2 text-[12px] text-[#0d0d0d] shadow-[0_14px_40px_-18px_rgba(13,13,13,.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#141414]/55 dark:text-white sm:block xl:top-[12%]">
            {PROOF.map((item) => (
              <li key={item} className="flex items-center gap-2 whitespace-nowrap rounded-xl px-2 py-1.5">
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-[#0d0d0d] text-[var(--lime)] dark:bg-[var(--lime)] dark:text-[#0d0d0d]">
                  <Check size={10} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Link
            href={paths.contact}
            className="group absolute bottom-[7%] left-[6%] right-[6%] flex items-center gap-3.5 rounded-full bg-paper p-2 pr-3 shadow-[0_24px_50px_-20px_rgba(13,13,13,.55)] ring-1 ring-line transition-transform duration-300 hover:-translate-y-0.5 sm:left-auto sm:right-[5%] sm:w-[300px]"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#0d0d0d]">
              <BrandMark className="size-7" />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[15px] text-ink">Book an intro call</span>
              <span className="block truncate text-[12.5px] text-muted">Talk directly to the builders</span>
            </span>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-lime text-lime-ink transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={15} strokeWidth={1.8} />
            </span>
          </Link>
        </div>

        {/* Blue tile: twelve stars and the studio clock. On wide screens it
            starts lower than its neighbours, leaving paper beside the headline. */}
        <div className="flex flex-col xl:relative xl:col-start-1 xl:row-start-1">
          <div
            data-anim="rise"
            data-anim-delay="0.22"
            className={cx(
              TILE,
              "flex flex-1 items-center gap-5 bg-[image:var(--tile-blue)] p-5 sm:gap-8 sm:p-6 xl:absolute xl:inset-x-0 xl:bottom-0 xl:top-[42%] xl:flex-col xl:items-start xl:justify-between xl:gap-5 xl:p-4",
            )}
          >
            <StarRing className="spin-slow size-16 shrink-0 [animation-duration:60s] sm:size-20 xl:mx-auto xl:mt-2 xl:size-[min(100%,104px)]" />
            <div className="flex flex-1 items-end justify-between gap-6 xl:flex-none xl:flex-col xl:items-start xl:justify-start xl:gap-4">
              <p className="hidden text-[12px] leading-snug text-ink-soft sm:block">
                Made in the EU,
                <br />
                working worldwide.
              </p>
              <TallinnClock />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
