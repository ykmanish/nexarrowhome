import { ArrowUpRight } from "lucide-react";
import { trustPoints } from "@/content/company";

/**
 * The facts a buyer can check or hold us to, in one hairline row directly
 * under the home hero. The registry entry links to the public register. The
 * list reaches into the gutter by the cells' own padding, so the first
 * column's text still starts on the gutter edge.
 */
export default function TrustStrip() {
  return (
    <section aria-label="Why you can trust us" className="gutter overflow-hidden border-b border-line bg-paper">
      <ul className="-mx-4 grid grid-cols-2 gap-px bg-line sm:grid-cols-3 xl:-mx-6 xl:grid-cols-6">
        {trustPoints.map((t) => (
          <li key={t.label} className="bg-paper px-4 py-5 xl:px-6">
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted">
              <span aria-hidden="true" className="size-1.5 bg-eu" />
              {t.label}
            </p>
            {t.href ? (
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex items-center gap-1.5 text-[14.5px] text-ink"
              >
                <span className="border-b border-ink/25 pb-0.5 group-hover:border-ink">{t.value}</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.8}
                  className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
                />
                <span className="sr-only">(verify in the Estonian e-Business Register)</span>
              </a>
            ) : (
              <p className="mt-2 text-[14.5px] text-ink">{t.value}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
