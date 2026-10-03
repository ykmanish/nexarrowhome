"use client";

import { useSyncExternalStore } from "react";

const ZONE = "Europe/Tallinn";
const TIME = new Intl.DateTimeFormat("en-GB", { timeZone: ZONE, hour: "2-digit", minute: "2-digit" });
const OFFSET = new Intl.DateTimeFormat("en-GB", { timeZone: ZONE, timeZoneName: "shortOffset" });

function subscribe(onChange) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

/** A string snapshot, so React sees "unchanged" until the minute turns. */
function snapshot() {
  const now = new Date();
  const offset = OFFSET.formatToParts(now).find((p) => p.type === "timeZoneName")?.value ?? "";
  return `${TIME.format(now)}|${offset}`;
}

/**
 * The studio's local time, inline. The server cannot know the time the page
 * will be read at, so it renders a placeholder and the browser fills it in.
 */
export default function TallinnClock({ className = "" }) {
  const value = useSyncExternalStore(subscribe, snapshot, () => "");
  const [time, offset] = value ? value.split("|") : ["--:--", ""];
  return (
    <span className={className}>
      <time className="tabular-nums">{time}</time>
      {offset && <span className="opacity-50"> {offset}</span>}
    </span>
  );
}
