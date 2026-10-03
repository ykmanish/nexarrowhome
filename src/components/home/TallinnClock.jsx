"use client";

import { useSyncExternalStore } from "react";

const ZONE = "Europe/Tallinn";
const TIME = new Intl.DateTimeFormat("en-GB", { timeZone: ZONE, hour: "2-digit", minute: "2-digit" });
const DAY = new Intl.DateTimeFormat("en-GB", { timeZone: ZONE, weekday: "short", timeZoneName: "shortOffset" });

function subscribe(onChange) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

/** A string snapshot, so React sees "unchanged" until the minute turns. */
function snapshot() {
  const now = new Date();
  const parts = DAY.formatToParts(now);
  const pick = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return [TIME.format(now), pick("weekday"), pick("timeZoneName")].join("|");
}

/**
 * The studio's local time. The server has no idea where the visitor is, so it
 * renders a placeholder and the browser fills in the real time on hydration.
 */
export default function TallinnClock({ className = "" }) {
  const value = useSyncExternalStore(subscribe, snapshot, () => "");
  const [time, weekday, offset] = value ? value.split("|") : ["--:--", "", ""];

  return (
    <div className={className}>
      <p className="text-[10.5px] uppercase tracking-[0.18em] text-ink-soft">Studio time</p>
      <p className="mt-1.5 font-display text-[clamp(2rem,2.6vw,2.6rem)] leading-none tracking-[-0.03em] tabular-nums">
        <time suppressHydrationWarning>{time}</time>
      </p>
      <p className="mt-1.5 text-[12px] text-ink-soft">
        Tallinn{weekday && ` · ${weekday}`}
        {offset && <span className="text-muted"> · {offset}</span>}
      </p>
    </div>
  );
}
