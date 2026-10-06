import { Check } from "lucide-react";
import { engagementTiers } from "@/content/company";
import BookCall from "@/components/site/BookCall";
import { CurrencySwitch, PricePoint, PriceTag, PricingNote } from "@/components/site/Pricing";
import { Section, SectionHead, cx } from "@/components/site/ui";

/**
 * The four offers with their starting prices, in the visitor's currency. The
 * first, the paid audit or pilot, is set in European blue: it is the small
 * first step we lead with. Every card keeps the same rhythm (tag, name,
 * price over unit, description, list, button) so the rows line up.
 */
export default function Engagement({ tone = "paper" }) {
  return (
    <Section id="pricing" tone={tone}>
      <SectionHead
        label="Offers & prices"
        lead="Clear prices,"
        tail="a small first step."
        intro="Start with a paid audit or pilot. If you continue, its fee is credited to the project."
        action={<CurrencySwitch />}
      />

      <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
        {engagementTiers.map((t, i) => {
          const lead = i === 0;
          return (
            <article
              key={t.name}
              data-anim="rise"
              className={cx("flex flex-col p-7", lead ? "bg-eu text-eu-ink" : "bg-paper")}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cx(
                    "rounded-[4px] px-2.5 py-1 text-[11px] uppercase tracking-[0.14em]",
                    lead ? "bg-lime text-lime-ink" : "bg-mist text-ink-soft",
                  )}
                >
                  {t.tag}
                </span>
                <span className={cx("text-[12px]", lead ? "text-eu-ink/55" : "text-muted")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-10 font-display text-[24px] leading-tight tracking-[-0.015em]">{t.name}</h3>
              <div className="mt-5">
                <PriceTag price={t.price} unit={t.unit} tone={lead ? "eu" : "default"} />
              </div>
              <p className={cx("mt-5 min-h-[4.5em] text-[14px] leading-relaxed", lead ? "text-eu-ink/75" : "text-muted")}>
                {t.desc}
              </p>
              <ul className={cx("mt-6 border-t", lead ? "border-eu-ink/15" : "border-line")}>
                {t.points.map((p) => (
                  <li
                    key={typeof p === "string" ? p : p.text}
                    className={cx("flex items-start gap-2.5 border-b py-2.5 text-[13.5px]", lead ? "border-eu-ink/15" : "border-line")}
                  >
                    <Check size={14} strokeWidth={2.2} className="mt-0.5 shrink-0" />
                    <span>
                      <PricePoint point={p} />
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <BookCall variant={lead ? "lime" : "outline"}>{t.cta}</BookCall>
              </div>
            </article>
          );
        })}
      </div>
      <PricingNote className="mt-5 text-[12.5px] text-muted" />
    </Section>
  );
}
