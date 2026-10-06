import { Check } from "lucide-react";
import { company } from "@/content/company";
import BookCall, { CalendlyMark } from "@/components/site/BookCall";

const POINTS = ["No obligation", "An honest answer on fit and cost", `A written summary ${company.reply}`];

/**
 * The booking banner the header's "Book a call" lands on: the Calendly mark,
 * what the call is for, and a button that opens Calendly in a new tab.
 */
export default function CalendlyBanner({ id = "book" }) {
  return (
    <section id={id} className="gutter scroll-mt-24 border-t border-line py-14 lg:py-20">
      <div data-anim="rise" className="relative overflow-hidden bg-eu text-eu-ink">
        {/* A large, faint mark bleeding off the right edge. */}
        <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 hidden opacity-[0.08] lg:block">
          <CalendlyMark size="xl" />
        </span>

        <div className="relative grid gap-8 p-7 md:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-12 lg:p-12">
          <CalendlyMark size="lg" className="shadow-[0_18px_40px_-18px_rgba(0,0,0,.45)]" />

          <div>
            <p className="text-[12px] uppercase tracking-[0.18em] text-eu-ink/70">Scheduling by Calendly</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.02em]">
              Book your intro call
            </h2>
            <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-eu-ink/80">
              Pick a time that suits you. Calendly shows the slots in your own time zone and sends a calendar invite.
              It opens in a new tab.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
              {POINTS.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Check size={15} strokeWidth={2.2} className="shrink-0 text-lime" /> {p}
                </li>
              ))}
            </ul>
          </div>

          <BookCall variant="lime" className="w-fit py-4">
            Open Calendly
          </BookCall>
        </div>
      </div>
    </section>
  );
}
