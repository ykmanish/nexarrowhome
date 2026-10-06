import { ArrowUpRight, CalendarDays, Check } from "lucide-react";
import { company } from "@/content/company";
import { services } from "@/content/services";
import BookCall from "@/components/site/BookCall";
import ContactBrief from "@/components/site/ContactBrief";
import { Button, Label, Section, SectionHead } from "@/components/site/ui";

const CALL_POINTS = ["No obligation", "An honest answer on fit and cost", `A written summary ${company.reply}`];

/**
 * How to start: book a short call, or send a brief. The call block uses the
 * calendar link when one is set and otherwise asks for a call by email; the
 * brief is a real form that lands in the inbox.
 */
export default function ContactSection({ id = "book", head = true }) {
  return (
    <Section id={id}>
      {head && (
        <SectionHead
          label="Book a call"
          lead="Fifteen minutes,"
          tail="no obligation."
          intro={`Pick a time for a short call, or send a brief and we reply ${company.reply}.`}
        />
      )}

      <div className={`${head ? "mt-14 " : ""}grid gap-px border border-line bg-line lg:grid-cols-[0.8fr_1.2fr]`}>
        <div data-anim="rise" className="flex flex-col bg-eu p-7 text-eu-ink md:p-10">
          <span className="grid size-11 place-items-center rounded-md bg-lime text-lime-ink">
            <CalendarDays size={18} strokeWidth={1.7} />
          </span>
          <h3 className="mt-10 font-display text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[1.02] tracking-[-0.02em]">
            Book a 15-minute call
          </h3>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-eu-ink/75">
            A short video call to understand the problem, and to tell you honestly whether we are a fit and roughly
            what it would cost.
          </p>
          <ul className="mt-7 border-t border-eu-ink/15">
            {CALL_POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3 border-b border-eu-ink/15 py-3 text-[14px]">
                <Check size={15} strokeWidth={2.2} className="shrink-0" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            {company.booking ? (
              <BookCall variant="lime">Pick a time</BookCall>
            ) : (
              <Button
                href={`mailto:${company.email}?subject=${encodeURIComponent("15-minute call")}&body=${encodeURIComponent("Hi Nexarrow,\n\nI'd like to book a 15-minute call. Times that suit me:\n\n")}`}
                external
                variant="lime"
              >
                Request a call
              </Button>
            )}
            <a
              href={company.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex w-fit items-center gap-1.5 text-[13px] text-eu-ink/75 hover:text-eu-ink"
            >
              Verify {company.name} in the e-Business Register
              <ArrowUpRight size={14} strokeWidth={1.8} className="transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>
        </div>

        <div data-anim="rise" className="bg-mist p-6 md:p-10">
          <Label>Or send a brief</Label>
          <p className="mt-5 font-display text-[clamp(1.7rem,2.6vw,2.2rem)] leading-tight tracking-[-0.02em]">
            A few lines is <span className="font-serif text-[1.08em] italic text-eu">plenty.</span>
          </p>
          <div className="relative mt-8">
            <ContactBrief email={company.email} topics={services.map((s) => s.name)} reply={company.reply} />
          </div>
        </div>
      </div>
    </Section>
  );
}
