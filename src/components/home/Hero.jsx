import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { deliveryPath } from "@/content/company";
import { paths } from "@/lib/routes";
import BookCall from "@/components/site/BookCall";
import { FrameLines, ROW_LINE, SkyBackdrop } from "@/components/site/frame";
import { TextLink, cx } from "@/components/site/ui";

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

const pad = (n) => String(n).padStart(2, "0");

/**
 * The side cards, two to a column: what a client gets out of working with
 * us, each a short headline and one line under it. Text only, and no figures
 * we cannot back up.
 */
const CARD = "relative flex min-h-[200px] flex-col justify-between gap-8 p-5 sm:p-6 xl:min-h-0";

const CARDS = [
  {
    id: "manual-work",
    title: "Less manual work",
    copy: "AI and automation take repetitive tasks off your team.",
    tone: "bg-eu text-eu-ink",
    titleTone: "text-lime dark:text-eu-ink",
    place: "xl:col-start-1 xl:row-start-1",
  },
  {
    id: "launch",
    title: "Launch sooner",
    copy: "Start lean, go live early, then grow it one milestone at a time.",
    tone: "bg-white/60 text-ink backdrop-blur-md dark:bg-white/[.06]",
    titleTone: "text-ink",
    place: "xl:col-start-1 xl:row-start-2",
  },
  {
    id: "grow",
    title: "Built to grow",
    copy: "Software that keeps up as your volume and your needs change.",
    tone: "bg-white/60 text-ink backdrop-blur-md dark:bg-white/[.06]",
    titleTone: "text-ink",
    place: "xl:col-start-4 xl:row-start-1",
  },
  {
    id: "lock-in",
    title: "No lock-in",
    copy: "You own the code, so you are never tied to one supplier.",
    tone: "bg-[#0d0d0d] text-white dark:ring-1 dark:ring-inset dark:ring-white/10",
    titleTone: "text-lime",
    place: "xl:col-start-4 xl:row-start-2",
  },
];

function SideCard({ card, index, delay }) {
  return (
    <div data-anim="fade" data-anim-delay={delay} className={cx(CARD, card.tone, card.place)}>
      <span className="text-[12px] tabular-nums opacity-60">{pad(index + 1)}</span>
      <div>
        <p className={cx("font-display text-[clamp(1.6rem,2.1vw,2.2rem)] leading-[1.02] tracking-[-0.025em]", card.titleTone)}>
          {card.title}
        </p>
        <p className="mt-3 max-w-[30ch] text-[13.5px] leading-snug opacity-75">{card.copy}</p>
      </div>
    </div>
  );
}

/**
 * The sky photograph runs under the header, and from 1280px up a hairline
 * frame divides both into the same four columns (--frame-cols, shared with
 * the header and every section head). The headline sits centred across the
 * two middle columns, and each side column carries two cards on what a
 * client gains, the dark ones corner to corner. The frame sits 24px outside
 * the page gutter and every cell is padded 24px, so content still lines up
 * with every other page. Below 1280px it is a plain stack.
 */
export default function Hero() {
  return (
    <section className="relative isolate -mt-[76px] overflow-hidden">
      <SkyBackdrop />

      <div className="gutter">
        <div className="relative flex min-h-svh flex-col pt-[76px] xl:-mx-6 xl:min-h-[max(760px,100svh)]">
          {/* No break between the middle columns: the headline spans both. */}
          <FrameLines lines={[0, 18, 80, 100]} />

          {/* Main row */}
          <div className="grid flex-1 grid-cols-2 py-12 xl:grid-cols-[var(--frame-cols)] xl:grid-rows-2 xl:py-0">
            {/* Centred on the page, not the cell: the left column is 2% narrower
                than the right, so the left padding takes up the difference. */}
            <div className="col-span-2 mb-12 flex flex-col items-center justify-center text-center xl:col-span-2 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:mb-0 xl:py-6 xl:pl-[calc(1.5rem+3.226%)] xl:pr-6">
              <p
                data-anim="fade"
                className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/80 bg-white/55 py-1.5 pl-2.5 pr-3.5 text-[13px] text-ink-soft backdrop-blur-md dark:border-white/10 dark:bg-white/5"
              >
                <EstonianFlag />
                EU-registered software company
              </p>
              {/* One buyer, one result: the message the client plan leads with. */}
              <h1 className="mt-6 font-display text-[clamp(2.4rem,9.4vw,4.5rem)] leading-[0.95] tracking-[-0.035em] xl:text-[min(5vw,10.5svh,5.5rem)]">
                <MaskLine delay={0.05}>Custom software</MaskLine>
                <MaskLine delay={0.12}>and AI automation</MaskLine>
                <MaskLine delay={0.19}>
                  for{" "}
                  <span className="font-serif text-[1.12em] italic leading-none tracking-[-0.01em] text-eu">
                    growing teams
                  </span>
                  .
                </MaskLine>
              </h1>
              <p data-anim="rise" data-anim-delay="0.28" className="mx-auto mt-6 max-w-[48ch] text-[15.5px] leading-relaxed text-ink-soft">
                Fixed prices, weekly demos, and you own the code. Contracts and invoices from our EU-registered company.
              </p>
              <div data-anim="rise" data-anim-delay="0.34" className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
                <BookCall className="py-4" />
                <TextLink href={paths.work}>See how we build</TextLink>
              </div>
            </div>

            {CARDS.map((card, i) => (
              <SideCard key={card.id} card={card} index={i} delay={0.15 + i * 0.08} />
            ))}
          </div>

          {/* Bottom row */}
          <div
            className={cx(
              "grid gap-3 pb-6 sm:grid-cols-2 xl:h-[clamp(210px,28svh,260px)] xl:grid-cols-[var(--frame-cols)] xl:gap-0 xl:pb-0",
              ROW_LINE,
            )}
          >
            <div
              data-anim="rise"
              data-anim-delay="0.4"
              className="flex min-h-[170px] flex-col justify-between bg-[#0d0d0d] p-6 text-white xl:min-h-0"
            >
              <p className="self-end font-display text-[clamp(2.75rem,3.6vw,3.5rem)] leading-none tracking-[-0.03em] text-lime">
                {pad(deliveryPath.length)}
              </p>
              <p className="text-[12.5px] uppercase leading-snug tracking-[0.08em] text-white/80">
                Stages from first
                <br />
                call to production
              </p>
            </div>

            <Link
              href={paths.services}
              data-anim="rise"
              data-anim-delay="0.46"
              className="group relative flex min-h-[170px] flex-col justify-end overflow-hidden bg-mist p-6 xl:col-span-2 xl:min-h-0"
            >
              <p className="relative z-10 max-w-[22ch] pr-16 font-display text-[clamp(1.55rem,2.2vw,2.25rem)] leading-[1.05] tracking-[-0.02em] text-ink sm:pr-0">
                One team for software, SaaS, AI and cloud.
              </p>
              <span className="absolute right-6 top-6 z-10 flex flex-col items-center gap-1.5 text-[11.5px] text-ink-soft">
                <span className="grid size-11 place-items-center rounded-full bg-[#0d0d0d] text-white transition-transform duration-300 group-hover:rotate-45 dark:bg-white dark:text-[#0d0d0d]">
                  <ArrowUpRight size={16} strokeWidth={1.8} />
                </span>
                Services
              </span>
            </Link>

            {/* European blue, set like the "06" block: the figure top right, the caption below. */}
            <div
              data-anim="rise"
              data-anim-delay="0.52"
              className="flex min-h-[170px] flex-col justify-between bg-eu p-6 text-eu-ink sm:col-span-2 xl:col-span-1 xl:col-start-4 xl:min-h-0"
            >
              <p className="self-end font-display text-[clamp(2.75rem,3.6vw,3.5rem)] leading-none tracking-[-0.03em] text-lime dark:text-eu-ink">
                EU
              </p>
              <div className="flex flex-col gap-3">
                <EstonianFlag />
                <p className="text-[12.5px] uppercase leading-snug tracking-[0.08em] opacity-85">
                  Registered in Tallinn,
                  <br />
                  Estonia. Working with
                  <br />
                  teams worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
