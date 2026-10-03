import { Check } from "lucide-react";
import { paths } from "@/lib/routes";
import EuropeMap from "@/components/home/EuropeMap";
import TallinnClock from "@/components/home/TallinnClock";
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
      className="inline-flex h-[13px] w-5 shrink-0 flex-col overflow-hidden rounded-[3px] ring-1 ring-line-strong"
    >
      <span className="flex-1 bg-[#0072ce]" />
      <span className="flex-1 bg-[#0d0d0d]" />
      <span className="flex-1 bg-white" />
    </span>
  );
}

/** Grounded in how we already work — see content/company.js. */
const PROOF = ["EU-registered company", "Milestone-based delivery", "Documented decisions", "Remote-first"];

/**
 * Full-bleed first screen: white in the light theme, near-black in the dark
 * one, with European blue as its accent. The dot field fills the whole hero;
 * --map-tx/--map-ty say where Tallinn sits, as fractions of its width and
 * height, and both the canvas and the Tallinn label read them.
 */
export default function Hero() {
  return (
    <section>
      <div className="relative isolate flex min-h-[calc(100svh-76px)] flex-col overflow-hidden bg-[var(--hero-bg)] text-ink lg:min-h-[max(620px,calc(100svh-76px))]">
        {/* Light */}
        <div
          aria-hidden="true"
          className="drift pointer-events-none absolute -right-[12%] -top-[30%] -z-10 aspect-square w-[80vw] max-w-[1200px] rounded-full bg-[radial-gradient(closest-side,rgba(var(--eu-rgb),.1),transparent)] dark:bg-[radial-gradient(closest-side,rgba(var(--eu-rgb),.2),transparent)]"
        />
        <div
          aria-hidden="true"
          className="drift pointer-events-none absolute -bottom-[45%] -left-[18%] -z-10 aspect-square w-[70vw] max-w-[1100px] rounded-full bg-[radial-gradient(closest-side,rgba(207,242,127,.32),transparent)] [animation-delay:-9s] dark:bg-[radial-gradient(closest-side,rgba(207,242,127,.1),transparent)]"
        />

        {/* Map */}
        <div className="pointer-events-none absolute inset-0 -z-10 [--map-tx:0.8] [--map-ty:0.15] sm:[--map-tx:0.76] lg:[--map-tx:0.71] lg:[--map-ty:0.22]">
          <EuropeMap className="absolute inset-0 size-full" />
          <p
            className="absolute hidden translate-x-6 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-paper/70 px-3 py-1.5 text-[12px] text-ink-soft backdrop-blur-md md:flex"
            style={{ left: "calc(var(--map-tx) * 100%)", top: "calc(var(--map-ty) * 100%)" }}
          >
            Tallinn, Estonia
            <span className="text-muted">·</span>
            <TallinnClock className="text-ink" />
          </p>
        </div>

        {/* Keeps the headline readable where it crosses the map. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_36%_at_50%_64%,rgba(var(--hero-veil),.75),transparent_80%)]"
        />
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-10 hidden dark:block" />

        <div className="gutter flex flex-1 flex-col items-center justify-end pb-14 pt-36 text-center sm:pt-44 lg:pb-[7vh] lg:pt-28">
          <p
            data-anim="fade"
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper/60 py-1.5 pl-2.5 pr-3.5 text-[13px] text-ink-soft backdrop-blur-md"
          >
            <EstonianFlag />
            Software studio in Tallinn, Estonia
          </p>

          <h1 className="mt-7 font-display text-[clamp(2.6rem,8.2vw,7.6rem)] leading-[0.92] tracking-[-0.035em]">
            <MaskLine delay={0.08}>Software that works,</MaskLine>
            <MaskLine delay={0.16}>
              built in{" "}
              <span className="font-serif text-[1.12em] italic leading-none tracking-[-0.01em] text-eu">Europe</span>.
            </MaskLine>
          </h1>

          <p
            data-anim="rise"
            data-anim-delay="0.3"
            className="mt-7 max-w-[54ch] text-balance text-[15px] leading-relaxed text-ink-soft md:text-[17px]"
          >
            We design, build and run custom software, SaaS platforms, AI workflows and cloud infrastructure for teams
            that need the thing to actually work.
          </p>

          <div data-anim="rise" data-anim-delay="0.38" className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <Button href={paths.contact} variant="lime">
              Start a project
            </Button>
            <TextLink href={paths.services}>See what we build</TextLink>
          </div>
        </div>

        {/* Trust bar */}
        <div data-anim="fade" data-anim-delay="0.5" className="border-t border-line">
          <div className="gutter flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-[13px] text-ink-soft lg:justify-between">
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
              {PROOF.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="grid size-4 place-items-center rounded-full bg-eu text-white dark:text-[#0b0c0b]">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-2">
              <span className="pulse-dot size-1.5 rounded-full bg-eu" />
              Studio time in Tallinn
              <TallinnClock className="text-ink" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
