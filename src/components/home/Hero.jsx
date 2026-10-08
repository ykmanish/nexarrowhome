import { CalendarCheck, Check, GitBranch, Workflow } from "lucide-react";
import { paths } from "@/lib/routes";
import BookCall from "@/components/site/BookCall";
import { FrameLines, SkyBackdrop } from "@/components/site/frame";
import { TextLink, cx } from "@/components/site/ui";
import { DeployCard, Glass } from "@/components/site/visuals";

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
      className="inline-flex h-[13px] w-5 shrink-0 flex-col overflow-hidden rounded-[3px] ring-1 ring-black/10"
    >
      <span className="flex-1 bg-[#0072ce]" />
      <span className="flex-1 bg-[#0d0d0d]" />
      <span className="flex-1 bg-white" />
    </span>
  );
}

/* ─────────────── side cards ───────────────
   Small frosted mocks of what a client gets, one per corner: less manual
   work, launching sooner, weekly progress and owning the code. Illustrative
   interface only, no figures we report. */

function AutomationCard() {
  return (
    <Glass className="w-[218px]">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 opacity-70">
          <Workflow size={12} strokeWidth={1.8} /> Invoice intake
        </span>
        <span aria-hidden="true" className="flex h-4 w-7 items-center justify-end rounded-full bg-eu p-0.5">
          <span className="size-3 rounded-full bg-white" />
        </span>
      </div>
      <p className="mt-1.5 text-[11.5px] leading-snug">Read, matched and posted to the ledger. No retyping.</p>
    </Glass>
  );
}

function RepoCard() {
  return (
    <Glass className="w-[206px]">
      <div className="flex items-center gap-1.5 opacity-70">
        <GitBranch size={12} strokeWidth={1.8} /> your-company/platform
      </div>
      <div className="mt-2 flex items-center justify-between rounded-lg bg-black/[.04] px-2 py-1.5 dark:bg-white/[.06]">
        <span className="opacity-55">Owner</span>
        <span className="flex items-center gap-1">
          <span className="grid size-3.5 place-items-center rounded-full bg-[#0d0d0d] text-[var(--lime)] dark:bg-[var(--lime)] dark:text-[#0d0d0d]">
            <Check size={9} strokeWidth={3} />
          </span>
          You
        </span>
      </div>
    </Glass>
  );
}

function DemoCard() {
  const milestones = 5;
  const done = 3;
  return (
    <Glass className="w-[218px]">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 opacity-70">
          <CalendarCheck size={12} strokeWidth={1.8} /> Weekly demo
        </span>
        <span className="opacity-55">Fri</span>
      </div>
      <p className="mt-1.5 text-[11.5px] leading-snug">Milestone 3 is ready to review.</p>
      <div className="mt-2.5 flex gap-1">
        {Array.from({ length: milestones }, (_, i) => (
          <span
            key={i}
            className={cx("h-1.5 flex-1 rounded-full", i < done ? "bg-eu" : "bg-[#0d0d0d]/10 dark:bg-white/15")}
          />
        ))}
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[10px] opacity-55">
        <span>
          {done} of {milestones} milestones
        </span>
        <span>On plan</span>
      </div>
    </Glass>
  );
}

/**
 * Where each card sits in the frame, from 1280px up. The top pair stays in
 * the band between the nav and the headline, the bottom pair beside the
 * intro and actions, so none of them crosses the headline. Each floats on
 * its own beat.
 */
const SIDE_CARDS = [
  { id: "automation", Card: AutomationCard, place: "left-[7%] top-[calc(76px+2.25rem)]", float: "0s" },
  { id: "deploy", Card: DeployCard, place: "left-[3.5%] bottom-[clamp(2rem,6svh,3.5rem)]", float: "-2s" },
  { id: "repo", Card: RepoCard, place: "right-[6%] top-[calc(76px+3.25rem)]", float: "-4s" },
  { id: "demo", Card: DemoCard, place: "right-[3.5%] bottom-[clamp(2.75rem,8svh,4.5rem)]", float: "-1s" },
];

function SideCards() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden select-none xl:block">
      {SIDE_CARDS.map(({ id, Card, place, float }, i) => (
        <div key={id} data-anim="fade" data-anim-delay={0.35 + i * 0.08} className={cx("absolute", place)}>
          <div className="float" style={{ animationDelay: float }}>
            <Card />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * One message over the sky: the badge, the headline, one line on the
 * outcome and the two actions, with a small frosted card in each corner
 * from 1280px up. Everything else (the terms, the registry, services, the
 * process, the EU set-up) has a section of its own further down, starting
 * with the trust strip right under this one, so the hero stays short enough
 * for that strip to show on the first screen. The frame's outer edges run
 * the full height; its inner column lines stay in the nav row so they never
 * cross the headline.
 */
export default function Hero() {
  return (
    <section className="relative isolate -mt-[76px] overflow-hidden">
      <SkyBackdrop />

      <div className="gutter">
        <div className="relative pt-[76px] xl:-mx-6">
          <FrameLines lines={[0, 100]} />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[76px]">
            <FrameLines lines={[18, 80]} />
          </div>
          <SideCards />

          <div className="flex flex-col items-center py-20 text-center sm:py-24 xl:py-[clamp(6rem,15svh,9rem)]">
            <p
              data-anim="fade"
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/80 bg-white/55 py-1.5 pl-2.5 pr-3.5 text-[13px] text-ink-soft backdrop-blur-md dark:border-white/10 dark:bg-white/5"
            >
              <EstonianFlag />
              EU-registered software company
            </p>

            <h1 className="mt-7 font-display text-[clamp(2.4rem,7.5vw,3.5rem)] leading-[1] tracking-[-0.03em] lg:text-[clamp(3.25rem,4.4vw,4.25rem)]">
              <MaskLine delay={0.05}>Custom software and AI automation</MaskLine>
              <MaskLine delay={0.12}>
                for{" "}
                <span className="font-serif text-[1.1em] italic leading-none tracking-[-0.01em] text-eu">
                  growing teams
                </span>
                .
              </MaskLine>
            </h1>

            <p
              data-anim="rise"
              data-anim-delay="0.2"
              className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-ink-soft md:text-[17px]"
            >
              Fixed-price projects that take repetitive work off your team and grow with you, one milestone at a time.
            </p>

            <div data-anim="rise" data-anim-delay="0.26" className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
              <BookCall />
              <TextLink href={paths.work}>See how we build</TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
