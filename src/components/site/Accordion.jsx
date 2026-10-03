"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ScrollTrigger } from "@/lib/motion";
import { cx } from "./ui";

/**
 * Disclosure list in two dressings:
 *   rows  — hairline-separated, a code before each title (expertise lists)
 *   cards — rounded tiles that fill when open (FAQ)
 *
 * `items` are { title, code?, body } where body may be any server-rendered node.
 */
export default function Accordion({ items, variant = "rows", defaultOpen = 0, className = "" }) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = (i) => {
    setOpen((cur) => (cur === i ? -1 : i));
    // Content below moves once the height transition ends; re-measure pins.
    window.setTimeout(() => ScrollTrigger.refresh(), 480);
  };

  const cards = variant === "cards";

  return (
    <div className={cx(cards ? "space-y-2.5" : "border-t border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `acc-${item.code || i}-${variant}`;
        return (
          <div
            key={item.title}
            data-open={isOpen}
            className={cx(
              "transition-colors duration-300",
              cards
                ? cx("rounded-2xl border", isOpen ? "border-transparent bg-mist" : "border-line")
                : "border-b border-line",
            )}
          >
            <h3>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={id}
                className={cx(
                  "group flex w-full items-center gap-5 text-left",
                  cards ? "justify-between p-5 md:p-6" : "py-6 md:py-7",
                )}
              >
                {item.code && (
                  <span className="w-16 shrink-0 text-[11px] uppercase tracking-[0.14em] text-muted">{item.code}</span>
                )}
                <span
                  className={cx(
                    "flex-1 font-display tracking-[-0.02em] text-ink",
                    cards ? "text-[17px] leading-snug md:text-[19px]" : "text-[22px] leading-tight md:text-[30px]",
                  )}
                >
                  {item.title}
                </span>
                <span
                  className={cx(
                    "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300",
                    isOpen
                      ? "rotate-45 bg-ink text-paper"
                      : cards
                        ? "bg-lime text-lime-ink"
                        : "border border-line-strong text-ink group-hover:border-ink",
                  )}
                  aria-hidden="true"
                >
                  <Plus size={15} strokeWidth={1.8} />
                </span>
              </button>
            </h3>
            <div id={id} role="region" className="disclosure" inert={!isOpen}>
              <div>
                <div
                  className={cx(
                    "text-[15px] leading-relaxed text-ink-soft",
                    cards ? "px-5 pb-6 md:px-6" : "pb-8 md:pl-[84px]",
                  )}
                >
                  {item.body}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
