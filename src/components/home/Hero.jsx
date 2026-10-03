import { Check } from "lucide-react";
import { paths } from "@/lib/routes";
import EuropeMap from "@/components/home/EuropeMap";
import TallinnClock from "@/components/home/TallinnClock";
import { EUROPE } from "@/components/home/europe-dots";
import { Button, TextLink } from "@/components/site/ui";

function MaskLine({ children, delay = 0 }) {
  return (
    <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
      <span data-anim="mask" data-anim-delay={delay} className="block">
        {children}
      </span>
    </span>
  );
}

/** Estonia's tricolour, small enough to sit in a line of text. */
function EstonianFlag() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-[13px] w-5 shrink-0 flex-col overflow-hidden rounded-[3px] ring-1 ring-white/25"
    >
      <span className="flex-1 bg-[#0072ce]" />
      <span className="flex-1 bg-[#0d0d0d]" />
      <span className="flex-1 bg-white" />
    </span>
  );
}

/** Tallinn's place on the map, as fractions of its width and height. */
const HOME_X = (EUROPE.home[0] + 0.5) / EUROPE.cols;
const HOME_Y = (EUROPE.home[1] + 0.5) / EUROPE.rows;
const MAP_RATIO = EUROPE.rows / EUROPE.cols;
const FOCUS = `radial-gradient(ellipse 80% 85% at ${HOME_X * 100}% ${HOME_Y * 100}%, #000 42%, transparent 100%)`;

/** Grounded in how we already work — see content/company.js. */
const PROOF = ["EU-registered company", "Milestone-based delivery", "Documented decisions", "Remote-first"];

/**
 * A dark stage inset from the page edges. The map is placed by Tallinn rather
 * than by its own corner: --tx/--ty say where on the stage Tallinn should sit
 * and --mw how wide the map is, and the offsets fall out of those. A radial
 * mask centred on Tallinn fades the rest of the continent into the dark.
 */
export default function Hero() {
  return (
    <section className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="relative isolate flex min-h-[calc(100svh-84px)] flex-col overflow-hidden rounded-[28px] bg-[#0b0c0b] text-white ring-1 ring-white/5 sm:rounded-[36px] lg:min-h-[max(640px,calc(100svh-88px))]">
        {/* Light */}
        <div
          aria-hidden="true"
          className="drift pointer-events-none absolute -right-[12%] -top-[30%] -z-10 aspect-square w-[80vw] max-w-[1200px] rounded-full bg-[radial-gradient(closest-side,rgba(207,242,127,.2),transparent)]"
        />
        <div
          aria-hidden="true"
          className="drift pointer-events-none absolute -bottom-[45%] -left-[18%] -z-10 aspect-square w-[70vw] max-w-[1100px] rounded-full bg-[radial-gradient(closest-side,rgba(70,104,255,.2),transparent)] [animation-delay:-9s]"
        />

        {/* Map */}
        <div
          className="pointer-events-none absolute -z-10 [--mw:max(820px,190vw)] [--tx:78%] [--ty:16%] sm:[--mw:max(980px,120vw)] lg:[--mw:min(1240px,84vw)] lg:[--tx:71%] lg:[--ty:22%]"
          style={{
            width: "var(--mw)",
            aspectRatio: `${EUROPE.cols} / ${EUROPE.rows}`,
            left: `calc(var(--tx) - var(--mw) * ${HOME_X.toFixed(4)})`,
            top: `calc(var(--ty) - var(--mw) * ${(MAP_RATIO * HOME_Y).toFixed(4)})`,
            maskImage: FOCUS,
            WebkitMaskImage: FOCUS,
          }}
        >
          <EuropeMap className="absolute inset-0 size-full" />
          <p
            className="absolute hidden translate-x-6 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[.06] px-3 py-1.5 text-[12px] text-white/80 backdrop-blur-md md:flex"
            style={{ left: `${HOME_X * 100}%`, top: `${HOME_Y * 100}%` }}
          >
            Tallinn, Estonia
            <span className="text-white/35">·</span>
            <TallinnClock className="text-white" />
          </p>
        </div>

        {/* Keeps the headline readable where it crosses the map. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_36%_at_50%_64%,rgba(11,12,11,.7),transparent_80%)]"
        />
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-10" />

        <div className="gutter flex flex-1 flex-col items-center justify-end pb-14 pt-36 text-center sm:pt-44 lg:pb-[7vh] lg:pt-28">
          <p
            data-anim="fade"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[.04] py-1.5 pl-2.5 pr-3.5 text-[13px] text-white/75 backdrop-blur-md"
          >
            <EstonianFlag />
            Software studio in Tallinn, Estonia
          </p>

          <h1 className="mt-7 font-display text-[clamp(2.6rem,8.2vw,7.6rem)] leading-[0.92] tracking-[-0.035em]">
            <MaskLine delay={0.08}>Software that works,</MaskLine>
            <MaskLine delay={0.16}>
              built in{" "}
              <span className="font-serif text-[1.12em] italic leading-none tracking-[-0.01em] text-lime">Europe</span>.
            </MaskLine>
          </h1>

          <p
            data-anim="rise"
            data-anim-delay="0.3"
            className="mt-7 max-w-[54ch] text-balance text-[15px] leading-relaxed text-white/60 md:text-[17px]"
          >
            We design, build and run custom software, SaaS platforms, AI workflows and cloud infrastructure for teams
            that need the thing to actually work.
          </p>

          <div data-anim="rise" data-anim-delay="0.38" className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <Button href={paths.contact} variant="lime">
              Start a project
            </Button>
            <TextLink href={paths.services} tone="night">
              See what we build
            </TextLink>
          </div>
        </div>

        {/* Trust bar */}
        <div data-anim="fade" data-anim-delay="0.5" className="border-t border-white/10">
          <div className="gutter flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-[13px] text-white/60 lg:justify-between">
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
              {PROOF.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="grid size-4 place-items-center rounded-full bg-lime text-lime-ink">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-2">
              <span className="pulse-dot size-1.5 rounded-full bg-lime" />
              Studio time in Tallinn
              <TallinnClock className="text-white" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
