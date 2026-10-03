import Link from "next/link";
import { Heading, Label, Section } from "@/components/site/ui";

/**
 * Opening band for every inner page: breadcrumb, bracketed label, a two-tone
 * headline on the left and the supporting line answering it on the right.
 */
export default function PageHero({ crumbs = [], label, lead, tail, intro, actions, meta, size = "page", children }) {
  return (
    <Section className="pb-14 pt-8 lg:pb-20 lg:pt-12">
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" data-anim="fade">
          <ol className="flex flex-wrap items-center gap-2 text-[12.5px] text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-line-strong">
                  /
                </span>
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink-soft">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1.55fr_1fr] lg:items-end lg:gap-16">
        <div>
          <div data-anim="fade">
            <Label>{label}</Label>
          </div>
          <Heading as="h1" lead={lead} tail={tail} size={size} className="mt-6" />
        </div>
        {(intro || actions) && (
          <div className="lg:pb-2">
            {intro && (
              <p data-anim="rise" data-anim-delay="0.15" className="max-w-md text-[16px] leading-relaxed text-ink-soft md:text-[17px]">
                {intro}
              </p>
            )}
            {actions && (
              <div data-anim="rise" data-anim-delay="0.22" className="mt-7 flex flex-wrap gap-3">
                {actions}
              </div>
            )}
          </div>
        )}
      </div>

      {meta && (
        <div data-anim="fade" data-anim-delay="0.3" className="mt-12 flex flex-wrap items-center gap-2 border-t border-line pt-6">
          {meta}
        </div>
      )}
      {children}
    </Section>
  );
}
