import { deliveryPath } from "@/content/company";
import { Chip, Dot, Heading, Label } from "@/components/site/ui";

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
        className="overflow-hidden bg-mist py-20 text-ink lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-16"
      >
        <div className="gutter lg:pt-[76px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div>
              <Label>{label}</Label>
              <Heading lead={lead} tail={tail} className="mt-6" />
            </div>
            <p data-anim="rise" className="max-w-sm text-[14.5px] leading-relaxed text-muted">
              {intro}
            </p>
          </div>
        </div>

        <div
          data-hscroll-viewport
          className="gutter mt-12 snap-x snap-mandatory overflow-x-auto scroll-px-5 [scrollbar-width:none] md:scroll-px-10 lg:mt-14"
        >
          <ol data-hscroll-track className="flex w-max gap-4 pr-5 md:pr-10 lg:pr-0">
            {steps.map((step, i) => {
              const last = i === steps.length - 1;
              return (
                <li key={step.title} data-hscroll-step className="trail-step w-[78vw] max-w-[330px] snap-start sm:w-[320px]">
                  <div className="relative mb-5 h-px bg-line-strong" aria-hidden="true">
                    <span className="trail-fill absolute inset-0 origin-left bg-ink" />
                    <span className="trail-dot absolute -top-[3px] left-0 size-[7px] rounded-full" />
                  </div>
                  <article className="flex min-h-[250px] flex-col rounded-[22px] bg-paper p-6 md:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11.5px] text-muted">Step {String(i + 1).padStart(2, "0")}</span>
                      <Chip>{step.artifact}</Chip>
                    </div>
                    <h3 className="mt-auto pt-12 font-display text-[26px] leading-tight tracking-[-0.02em]">{step.title}</h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{step.copy}</p>
                    {last && (
                      <div className="mt-5">
                        <Chip tone="lime">
                          <Dot className="bg-lime-ink" /> Live &amp; supported
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
