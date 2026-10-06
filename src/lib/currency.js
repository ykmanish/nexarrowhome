import { useSyncExternalStore } from "react";
import { DEFAULT_CURRENCY } from "@/content/pricing";

/**
 * The visitor's pricing currency, worked out from their time zone: India sees
 * rupees, the UK pounds, the Americas dollars, everyone else euros. No
 * location lookup and no request to a third party. Pages are static, so the
 * server renders euros and the browser swaps in the visitor's currency.
 */

const UK_ZONES = ["Europe/London", "Europe/Belfast", "Europe/Guernsey", "Europe/Isle_of_Man", "Europe/Jersey"];

let current = null;

function fromTimeZone() {
  let zone = "";
  try {
    zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    return DEFAULT_CURRENCY;
  }
  if (zone === "Asia/Kolkata" || zone === "Asia/Calcutta") return "INR";
  if (UK_ZONES.includes(zone)) return "GBP";
  if (/^(America|US|Canada)\//.test(zone) || zone === "Pacific/Honolulu") return "USD";
  return DEFAULT_CURRENCY;
}

/** The time zone does not change during a visit, so it is read once. */
function snapshot() {
  current ??= fromTimeZone();
  return current;
}

const subscribe = () => () => {};

export function useCurrency() {
  return useSyncExternalStore(subscribe, snapshot, () => DEFAULT_CURRENCY);
}
