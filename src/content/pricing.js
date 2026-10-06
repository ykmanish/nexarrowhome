/**
 * Starting prices in each currency we quote in. Visitors see the currency of
 * their region, worked out from their time zone (see lib/currency.js).
 *
 * The euro prices come from the client plan. Dollar and pound prices are set
 * as round, local-looking numbers near the same value, not live conversions,
 * so they do not change from one day to the next.
 *
 * Rupee prices are set separately for the Indian market rather than
 * converted: priced below typical Indian agency rates, in Indian digit
 * grouping. Only visitors in India's time zone see them by default.
 */

export const CURRENCIES = [
  { code: "EUR", symbol: "€", name: "euros" },
  { code: "USD", symbol: "$", name: "US dollars" },
  { code: "GBP", symbol: "£", name: "pounds sterling" },
  { code: "INR", symbol: "₹", name: "rupees" },
];

export const DEFAULT_CURRENCY = "EUR";

export const PRICES = {
  audit: { EUR: "€190–290", USD: "$200–300", GBP: "£160–250", INR: "₹4,999–9,999" },
  build: { EUR: "€1,500", USD: "$1,600", GBP: "£1,300", INR: "₹24,999" },
  buildWeb: { EUR: "€1,500–2,500", USD: "$1,600–2,700", GBP: "£1,300–2,150", INR: "₹24,999–59,999" },
  buildMvp: { EUR: "€2,500–6,000", USD: "$2,700–6,500", GBP: "£2,150–5,200", INR: "₹75,000–2,50,000" },
  support: { EUR: "€400", USD: "$450", GBP: "£350", INR: "₹7,999" },
  whiteLabel: { EUR: "€20", USD: "$22", GBP: "£18", INR: "₹599" },
};

/** The line under the prices, in the visitor's currency. */
export function pricingNote(code) {
  const terms = "50% upfront on small projects, 40/40/20 milestones on larger ones.";
  if (code === "INR") return `Prices in rupees for businesses in India, before applicable taxes. ${terms}`;
  const name = CURRENCIES.find((c) => c.code === code)?.name || "euros";
  return `Prices in ${name}, before VAT or sales tax where it applies. ${terms}`;
}
