import { useSyncExternalStore } from "react";
import { CURRENCIES, DEFAULT_CURRENCY } from "@/content/pricing";

/**
 * The visitor's pricing currency, shared by every price on the page. It comes
 * from a choice they made earlier (localStorage), otherwise from their time
 * zone: no location lookup, no request to a third party. Pages are static, so
 * the server renders euros and the browser swaps in the visitor's currency.
 */

const KEY = "nexarrow-currency";
const CODES = CURRENCIES.map((c) => c.code);
const UK_ZONES = ["Europe/London", "Europe/Belfast", "Europe/Guernsey", "Europe/Isle_of_Man", "Europe/Jersey"];

const listeners = new Set();
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

function snapshot() {
  if (current) return current;
  let saved = null;
  try {
    saved = window.localStorage.getItem(KEY);
  } catch {
    // Storage can be blocked; the time zone still gives a sensible default.
  }
  current = CODES.includes(saved) ? saved : fromTimeZone();
  return current;
}

function subscribe(onChange) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function setCurrency(code) {
  if (!CODES.includes(code)) return;
  current = code;
  try {
    window.localStorage.setItem(KEY, code);
  } catch {
    // Best effort: the choice still holds for this page view.
  }
  listeners.forEach((l) => l());
}

export function useCurrency() {
  return useSyncExternalStore(subscribe, snapshot, () => DEFAULT_CURRENCY);
}
