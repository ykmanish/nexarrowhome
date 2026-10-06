import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company, deliveryPath, founder } from "@/content/company";
import { services } from "@/content/services";
import { paths } from "@/lib/routes";
import BookCall from "@/components/site/BookCall";
import { FrameLines, ROW_LINE, SkyBackdrop } from "@/components/site/frame";
import { DashboardVisual, DeployCard, FlowVisual } from "@/components/site/visuals";
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

/** One disc per discipline: the team in miniature. */
const DISCS = [
  { label: "WEB", className: "bg-[#0d0d0d] text-lime" },
  { label: "SaaS", className: "bg-white text-[#0d0d0d]" },
  { label: "AI", className: "bg-eu text-eu-ink" },
  { label: "OPS", className: "bg-lime text-lime-ink" },
];

const pad = (n) => String(n).padStart(2, "0");

/**
 * The sky photograph runs under the header, and from 1280px up a hairline
 * frame divides both into the same four columns (--frame-cols, shared with
 * the header and every section head): logo over the figures, nav over the
 * headline and the product, actions over the proof. The frame
 * sits 24px outside the page gutter and every cell is padded 24px, so content
 * still lines up with every other page. Below 1280px it is a plain stack.
 */
export default function Hero() {
  return (
    <section className="relative isolate -mt-[76px] overflow-hidden">
      <SkyBackdrop />

      <div className="gutter">
        <div className="relative flex min-h-svh flex-col pt-[76px] xl:-mx-6 xl:min-h-[max(760px,100svh)]">
          <FrameLines underNav />

          {/* Main row */}
          <div className="flex flex-1 flex-col gap-14 py-12 xl:grid xl:grid-cols-[var(--frame-cols)] xl:gap-0 xl:py-0">
            <div className="xl:col-start-2 xl:row-start-1 xl:flex xl:flex-col xl:justify-center xl:px-6 xl:py-6">
              <p
                data-anim="fade"
                className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/80 bg-white/55 py-1.5 pl-2.5 pr-3.5 text-[13px] text-ink-soft backdrop-blur-md dark:border-white/10 dark:bg-white/5"
              >
                <EstonianFlag />
                EU-registered software company
              </p>
              {/* One buyer, one result: the message the client plan leads with. */}
              <h1 className="mt-5 font-display text-[clamp(2.6rem,9.4vw,4.5rem)] leading-[0.95] tracking-[-0.035em] xl:text-[min(4.2vw,4.1rem)]">
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
              <p data-anim="rise" data-anim-delay="0.28" className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-ink-soft">
                Fixed prices, weekly demos, and you own the code. Contracts and invoices from our EU company; engineering
                led from {company.engineering}
                {founder.name ? ` by ${founder.name}` : ""}.
              </p>
              <div data-anim="rise" data-anim-delay="0.34" className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
                <BookCall className="py-4" />
                <TextLink href={paths.work}>See our work</TextLink>
              </div>
            </div>

            {/* The product, over the open sky of the two right-hand columns. */}
            <div
              data-anim="scale"
              data-anim-delay="0.15"
              className="relative mx-auto w-full max-w-[460px] xl:col-span-2 xl:col-start-3 xl:row-start-1 xl:flex xl:max-w-none xl:items-center xl:justify-center xl:px-12"
            >
              <div className="relative w-full max-w-[440px]">
                <DashboardVisual className="shadow-[0_40px_90px_-35px_rgba(0,40,110,.5)]" />
                <DeployCard className="float absolute -left-12 -top-10 hidden sm:block" />
              </div>
            </div>

            <div className="xl:col-start-1 xl:row-start-1 xl:flex xl:flex-col xl:justify-center xl:px-6 xl:pb-10">
              <p className="font-display text-[56px] leading-none tracking-[-0.03em]">{pad(services.length)}</p>
              <p className="mt-2 text-[13.5px] leading-snug text-ink-soft">
                Service lines,
                <br />
                one team
              </p>
              <div className="mt-5 flex">
                {DISCS.map((d, i) => (
                  <span
                    key={d.label}
                    className={cx(
                      "grid size-11 place-items-center rounded-full border-2 border-white text-[9.5px] tracking-wide dark:border-[#15161a]",
                      i > 0 && "-ml-2.5",
                      d.className,
                    )}
                  >
                    {d.label}
                  </span>
                ))}
              </div>
            </div>
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
              className="group relative flex min-h-[230px] overflow-hidden bg-mist p-6 xl:min-h-0"
            >
              <div className="relative z-10 flex flex-col justify-between gap-6 pr-16 sm:max-w-[52%] sm:pr-0">
                <p className="font-display text-[clamp(1.55rem,2vw,2rem)] leading-[1.05] tracking-[-0.02em] text-ink">
                  One team for software, SaaS, AI and cloud.
                </p>
                <p className="flex items-center gap-2 text-[12.5px] text-ink-soft">
                  <span className="pulse-dot size-1.5 rounded-full bg-eu" />
                  We reply {company.reply}
                </p>
              </div>
              <span className="absolute right-6 top-6 z-10 flex flex-col items-center gap-1.5 text-[11.5px] text-ink-soft">
                <span className="grid size-11 place-items-center rounded-full bg-[#0d0d0d] text-white transition-transform duration-300 group-hover:rotate-45 dark:bg-white dark:text-[#0d0d0d]">
                  <ArrowUpRight size={16} strokeWidth={1.8} />
                </span>
                Services
              </span>
              <div className="absolute right-6 top-[44%] hidden w-[44%] min-w-[220px] transition-transform duration-500 group-hover:-translate-y-2 sm:block">
                <FlowVisual />
              </div>
            </Link>

            <div className="flex flex-col justify-end gap-3 py-2 sm:col-span-2 xl:col-span-1 xl:col-start-4 xl:p-6">
              <EstonianFlag />
              <p className="text-[12.5px] uppercase leading-snug tracking-[0.08em] text-ink">
                Registered in Tallinn,
                <br />
                Estonia (EU).
                <br />
                Engineering led
                <br />
                from {company.engineering}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
