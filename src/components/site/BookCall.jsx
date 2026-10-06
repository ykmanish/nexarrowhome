"use client";

import { bookingHref, company } from "@/content/company";
import { Button, cx } from "./ui";

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

/** Calendly's mark (Simple Icons path) in brand blue on a white tile, readable on any button. */
export function CalendlyMark({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={cx("grid size-5 shrink-0 place-items-center rounded-[5px] bg-white", className)}
    >
      <svg viewBox="0 0 24 24" className="size-[14px]" fill="#006BFF">
        <path d="M19.655 14.262c.281 0 .557.023.828.064 0 .005-.005.01-.005.014-.105.267-.234.534-.381.786l-1.219 2.106c-1.112 1.936-3.177 3.127-5.411 3.127h-2.432c-2.23 0-4.294-1.191-5.412-3.127l-1.218-2.106a6.251 6.251 0 0 1 0-6.252l1.218-2.106C6.736 4.832 8.8 3.641 11.035 3.641h2.432c2.23 0 4.294 1.191 5.411 3.127l1.219 2.106c.147.252.271.519.381.786 0 .004.005.009.005.014-.267.041-.543.064-.828.064-1.816 0-2.501-.607-3.291-1.306-.764-.676-1.711-1.517-3.44-1.517h-1.029c-1.251 0-2.387.455-3.2 1.278-.796.805-1.233 1.904-1.233 3.099v1.411c0 1.196.437 2.295 1.233 3.099.813.823 1.949 1.278 3.2 1.278h1.034c1.729 0 2.676-.841 3.439-1.517.791-.703 1.471-1.306 3.287-1.301Zm.005-3.237c.399 0 .794-.036 1.179-.11-.002-.004-.002-.01-.002-.014-.073-.414-.193-.823-.349-1.218.731-.12 1.407-.396 1.986-.819 0-.004-.005-.013-.005-.018-.331-1.085-.832-2.101-1.489-3.03-.649-.915-1.435-1.719-2.331-2.395-1.867-1.398-4.088-2.138-6.428-2.138-1.448 0-2.855.28-4.175.841-1.273.543-2.423 1.315-3.407 2.299S2.878 6.552 2.341 7.83c-.557 1.324-.842 2.726-.842 4.175 0 1.448.281 2.855.842 4.174.542 1.274 1.314 2.423 2.298 3.407s2.129 1.761 3.407 2.299c1.324.556 2.727.841 4.175.841 2.34 0 4.561-.74 6.428-2.137a10.815 10.815 0 0 0 2.331-2.396c.652-.929 1.158-1.949 1.489-3.03 0-.004.005-.014.005-.018-.579-.423-1.255-.699-1.986-.819.161-.395.276-.804.349-1.218.005-.009.005-.014.005-.023.869.166 1.692.506 2.404 1.035.685.505.552 1.075.446 1.416C22.184 20.437 17.619 24 12.221 24c-6.625 0-12-5.375-12-12s5.37-12 12-12c5.398 0 9.963 3.563 11.471 8.464.106.341.239.915-.446 1.421-.717.529-1.535.873-2.404 1.034.128.716.128 1.45 0 2.166-.387-.074-.782-.11-1.182-.11-4.184 0-3.968 2.823-6.736 2.823h-1.029c-1.899 0-3.15-1.357-3.15-3.095v-1.411c0-1.738 1.251-3.094 3.15-3.094h1.034c2.768 0 2.552 2.823 6.731 2.827Z" />
      </svg>
    </span>
  );
}

/**
 * Calendly's popup script, loaded once and only when someone shows intent to
 * book (pointer or focus on a booking button), so no third-party script runs
 * for visitors who never book.
 */
let loading = null;
function loadCalendly() {
  if (window.Calendly) return Promise.resolve(window.Calendly);
  loading ??= new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = WIDGET_CSS;
    document.head.appendChild(css);
    const script = document.createElement("script");
    script.src = WIDGET_JS;
    script.async = true;
    script.onload = () => (window.Calendly ? resolve(window.Calendly) : reject(new Error("Calendly unavailable")));
    script.onerror = () => reject(new Error("Calendly failed to load"));
    document.head.appendChild(script);
  }).catch((err) => {
    loading = null;
    throw err;
  });
  return loading;
}

const warm = () => loadCalendly().catch(() => {});

/**
 * "Book a call", wherever it appears. With a calendar link set, it opens the
 * Calendly booking popup over the page; if the popup cannot load, or the
 * visitor opens it in a new tab, the link goes straight to the Calendly page.
 * Without a calendar link it goes to the booking block on the contact page.
 */
export default function BookCall({ children = "Book a call", variant = "eu", className = "" }) {
  if (!company.booking) {
    return (
      <Button href={bookingHref} variant={variant} className={className}>
        {children}
      </Button>
    );
  }

  const onClick = (e) => {
    // Let modified clicks (new tab, new window) do what the visitor asked.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    loadCalendly()
      .then((Calendly) => Calendly.initPopupWidget({ url: `${company.booking}?primary_color=003399` }))
      .catch(() => window.open(company.booking, "_blank", "noopener,noreferrer"));
  };

  return (
    <Button
      href={company.booking}
      external
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      className={className}
      onClick={onClick}
      onPointerEnter={warm}
      onFocus={warm}
    >
      <span className="inline-flex items-center gap-2.5">
        <CalendlyMark />
        {children}
      </span>
    </Button>
  );
}
