import { deliveryPath } from "@/content/company";
import { Chip, SectionHead } from "@/components/site/ui";

/**
 * The delivery path as a trail of steps. On desktop the section pins and the
 * trail walks sideways with the scroll (see `data-hscroll` in lib/motion.js);
 * on touch widths it is a native swipeable row.
 */
export default function DeliveryTrail({
  label = "How we deliver",
  lead = "From first call",
  tail = "to production.",
  intro = "Every engagement moves through the same six stages, each ending in something concrete you can review. You always know what is happening and what comes next.",
  steps = deliveryPath,
}) {
  // GSAP wraps a pinned element in a spacer div. The outer div is the node
  // React owns and removes on navigation, so the spacer never confuses it.
  return (
    <div>
      <section
        data-hscroll
        className="overflow-hidden border-t border-line bg-mist py-20 text-ink lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-16"
      >
        <div className="gutter lg:pt-[76px]">
          <SectionHead label={label} lead={lead} tail={tail} intro={intro} />
        </div>

        <div
          data-hscroll-viewport
          className="gutter mt-12 snap-x snap-mandatory overflow-x-auto scroll-px-5 [scrollbar-width:none] md:scroll-px-10 lg:mt-14"
        >
          <ol data-hscroll-track className="flex w-max gap-px bg-line pr-5 md:pr-10 lg:pr-0">
            {steps.map((step, i) => {
              const last = i === steps.length - 1;
              return (
                <li key={step.title} data-hscroll-step className="trail-step w-[78vw] max-w-[330px] snap-start bg-mist sm:w-[320px]">
                  <div className="relative mb-5 h-0.5 bg-line-strong" aria-hidden="true">
                    <span className="trail-fill absolute inset-0 origin-left bg-eu" />
                    <span className="trail-dot absolute -top-[3px] left-0 size-2" />
                  </div>
                  <article className="flex min-h-[260px] flex-col bg-paper p-6 md:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11.5px] uppercase tracking-[0.16em] text-muted">Step</span>
                      <Chip>{step.artifact}</Chip>
                    </div>
                    <span className="mt-auto pt-10 font-display text-[44px] leading-none tracking-[-0.03em] text-eu">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-[26px] leading-tight tracking-[-0.02em]">{step.title}</h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{step.copy}</p>
                    {last && (
                      <div className="mt-5">
                        <Chip tone="eu">
                          <span aria-hidden="true" className="pulse-dot size-1.5 bg-lime" /> Live &amp; supported
                        </Chip>
                      </div>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
