import Link from "next/link";
import { FrameLines, ROW_LINE, SkyBackdrop } from "@/components/site/frame";
import { Heading, Label, cx } from "@/components/site/ui";

/**
 * Opening band for every inner page, built like the home hero: the sky runs
 * under the header and the frame divides both into the same columns. The
 * breadcrumb sits under the logo, the label, headline, intro and actions
 * under the nav, and `aside` (a figure or fact, optional) in the last column.
 * `meta` chips get a row of their own along the bottom.
 */
export default function PageHero({
  crumbs = [],
  label,
  lead,
  tail,
  intro,
  actions,
  aside,
  meta,
  size = "page",
  children,
}) {
  return (
    <section className="relative isolate -mt-[76px] overflow-hidden">
      <SkyBackdrop position="object-[50%_85%]" />
      <div className="gutter">
        <div className="relative pt-[76px] xl:-mx-6">
          <FrameLines underNav />

          <div className="grid gap-8 pb-14 pt-12 lg:pb-20 lg:pt-16 xl:grid-cols-[var(--frame-cols)] xl:gap-0 xl:py-0">
            <div className="xl:px-6 xl:py-14">
              {crumbs.length > 0 && (
                <nav aria-label="Breadcrumb" data-anim="fade">
                  <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-ink-soft xl:flex-col xl:items-start xl:gap-1.5">
                    <li>
                      <Link href="/" className="transition-colors hover:text-ink">
                        Home
                      </Link>
                    </li>
                    {crumbs.map((c) => (
                      <li key={c.label} className="flex items-center gap-2">
                        <span aria-hidden="true" className="text-muted">
                          /
                        </span>
                        {c.href ? (
                          <Link href={c.href} className="transition-colors hover:text-ink">
                            {c.label}
                          </Link>
                        ) : (
                          <span aria-current="page" className="text-ink">
                            {c.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
            </div>

            <div className="xl:col-span-2 xl:px-6 xl:py-14">
              <div data-anim="fade">
                <Label>{label}</Label>
              </div>
              <Heading as="h1" lead={lead} tail={tail} size={size} className="mt-6" />
              {intro && (
                <p
                  data-anim="rise"
                  data-anim-delay="0.15"
                  className="mt-7 max-w-xl text-[16px] leading-relaxed text-ink-soft md:text-[17px]"
                >
                  {intro}
                </p>
              )}
              {actions && (
                <div data-anim="rise" data-anim-delay="0.22" className="mt-8 flex flex-wrap items-center gap-3">
                  {actions}
                </div>
              )}
            </div>

            {aside && (
              <div data-anim="rise" data-anim-delay="0.3" className="xl:flex xl:flex-col xl:justify-end xl:px-6 xl:py-14">
                {aside}
              </div>
            )}
          </div>

          {meta && (
            <div
              data-anim="fade"
              data-anim-delay="0.3"
              className={cx(
                "grid border-t border-white/75 py-5 dark:border-white/10 xl:grid-cols-[var(--frame-cols)] xl:border-0 xl:py-0",
                ROW_LINE,
              )}
            >
              <p className="hidden items-center text-[12px] uppercase tracking-[0.18em] text-ink-soft xl:flex xl:px-6 xl:py-5">
                At a glance
              </p>
              <div className="flex flex-wrap items-center gap-2 xl:col-span-3 xl:px-6 xl:py-5">{meta}</div>
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

/** A figure for a page hero's last column: a large number over a short caption. */
export function HeroFigure({ value, caption }) {
  return (
    <div>
      <p className="font-display text-[56px] leading-none tracking-[-0.03em]">{value}</p>
      <p className="mt-2 max-w-[18ch] text-[13.5px] leading-snug text-ink-soft">{caption}</p>
    </div>
  );
}
