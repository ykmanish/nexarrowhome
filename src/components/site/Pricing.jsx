"use client";

import { CURRENCIES, PRICES, pricingNote } from "@/content/pricing";
import { setCurrency, useCurrency } from "@/lib/currency";
import { cx } from "./ui";

/** Segmented control for the pricing currency. */
export function CurrencySwitch({ tone = "default", className = "" }) {
  const code = useCurrency();
  const night = tone === "night";
  return (
    <div
      role="group"
      aria-label="Currency"
      className={cx("inline-flex rounded-md border p-0.5", night ? "border-white/15" : "border-line", className)}
    >
      {CURRENCIES.map((c) => {
        const on = c.code === code;
        return (
          <button
            key={c.code}
            type="button"
            aria-pressed={on}
            title={`${c.symbol} ${c.name}`}
            onClick={() => setCurrency(c.code)}
            className={cx(
              "whitespace-nowrap rounded-[5px] px-2.5 py-1.5 text-[12.5px] tabular-nums transition-colors",
              on ? "bg-eu text-eu-ink" : night ? "text-white/65 hover:text-white" : "text-ink-soft hover:text-ink",
            )}
          >
            {c.code}
          </button>
        );
      })}
    </div>
  );
}

/**
 * A starting price and its unit, always on two lines so cards line up. Where
 * a currency has no price for an offer, it reads as quoted after a call.
 */
export function PriceTag({ price, unit, tone = "default" }) {
  const code = useCurrency();
  const amount = PRICES[price.key]?.[code];
  const soft = tone === "eu" ? "text-eu-ink/65" : "text-muted";
  return (
    <div>
      <p className="flex items-baseline gap-2 font-display leading-none tracking-[-0.03em]">
        {amount && price.from && <span className="text-[15px] tracking-normal">from</span>}
        <span className="text-[clamp(2.1rem,2.8vw,2.6rem)]">{amount || "Quoted in ₹"}</span>
      </p>
      <p className={cx("mt-2 text-[13px]", soft)}>{amount ? unit : "after a short call"}</p>
    </div>
  );
}

/** A list line that may carry a price range, e.g. "MVPs & SaaS €2,500–6,000". */
export function PricePoint({ point }) {
  const code = useCurrency();
  if (typeof point === "string") return point;
  const amount = PRICES[point.price]?.[code];
  if (!amount) return point.text;
  return (
    <>
      {point.text} <span className="whitespace-nowrap">{amount}</span>
    </>
  );
}

/** The terms line under the prices, in the visitor's currency. */
export function PricingNote({ className = "" }) {
  const code = useCurrency();
  return <p className={className}>{pricingNote(code)}</p>;
}
