import { ArrowUpRight, Check, Mail, Phone } from "lucide-react";
import { company } from "@/content/company";
import { services } from "@/content/services";
import BookCall, { CalendlyMark } from "@/components/site/BookCall";
import ContactBrief from "@/components/site/ContactBrief";
import { Button, Label, Section, SectionHead } from "@/components/site/ui";

const CALL_POINTS = ["No obligation", "An honest answer on fit and cost", `A written summary ${company.reply}`];

function VerifyLink({ className = "" }) {
  return (
    <a
      href={company.registerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex w-fit items-center gap-1.5 text-[13px] ${className}`}
    >
      Verify {company.name} in the e-Business Register
      <ArrowUpRight size={14} strokeWidth={1.8} className="transition-transform duration-300 group-hover:rotate-45" />
    </a>
  );
}

/**
 * How to start: book a short call, or send a brief. The call block opens the
 * Calendly booking page in a new tab (or asks for a call by email when no
 * calendar is set); the brief is a real form that lands in the inbox. Where a
 * booking banner already sits above (the contact page), pass `booking={false}`
 * and the call block gives way to the ways to write to us.
 */
export default function ContactSection({ id = "book", head = true, booking = true }) {
  return (
    <Section id={id}>
      {head && (
        <SectionHead
          label="Book a call"
          lead="A short call,"
          tail="no obligation."
          intro={`Pick a time for a short call, or send a brief and we reply ${company.reply}.`}
        />
      )}

      <div className={`${head ? "mt-14 " : ""}grid gap-px border border-line bg-line lg:grid-cols-[0.8fr_1.2fr]`}>
        {booking ? (
          <div data-anim="rise" className="flex flex-col bg-eu p-7 text-eu-ink md:p-10">
            <CalendlyMark size="md" />
            <h3 className="mt-10 font-display text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[1.02] tracking-[-0.02em]">
              Book an intro call
            </h3>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-eu-ink/75">
              A short call to understand the problem, and to tell you honestly whether we are a fit and roughly what it
              would cost.
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
                <BookCall variant="lime">Pick a time on Calendly</BookCall>
              ) : (
                <Button
                  href={`mailto:${company.email}?subject=${encodeURIComponent("Intro call")}&body=${encodeURIComponent("Hi Nexarrow,\n\nI'd like to book an intro call. Times that suit me:\n\n")}`}
                  external
                  variant="lime"
                >
                  Request a call
                </Button>
              )}
              <VerifyLink className="mt-6 text-eu-ink/75 hover:text-eu-ink" />
            </div>
          </div>
        ) : (
          <div data-anim="rise" className="flex flex-col bg-paper p-7 md:p-10">
            <Label>Prefer to write?</Label>
            <h3 className="mt-6 font-display text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[1.02] tracking-[-0.02em]">
              Send a brief, <span className="font-serif text-[1.08em] italic text-eu">or just email.</span>
            </h3>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
              Tell us what you are building or fixing. Every enquiry gets a reply {company.reply}.
            </p>
            <ul className="mt-8 border-t border-line">
              <li className="border-b border-line py-3.5">
                <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-[15px] text-ink hover:text-eu">
                  <Mail size={16} strokeWidth={1.7} className="shrink-0 text-eu" /> {company.email}
                </a>
              </li>
              {company.phone && (
                <li className="border-b border-line py-3.5">
                  <a
                    href={`tel:${company.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-[15px] text-ink hover:text-eu"
                  >
                    <Phone size={16} strokeWidth={1.7} className="shrink-0 text-eu" /> {company.phone}
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-auto pt-10">
              <VerifyLink className="text-muted hover:text-ink" />
            </div>
          </div>
        )}

        <div data-anim="rise" className="bg-mist p-6 md:p-10">
          <Label>{booking ? "Or send a brief" : "Project brief"}</Label>
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
