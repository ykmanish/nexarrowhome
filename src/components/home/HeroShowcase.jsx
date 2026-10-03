"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { paths } from "@/lib/routes";
import { BarsCard, DeployCard, ServiceVisual, Sky } from "@/components/site/visuals";
import { Dot, TextLink, cx } from "@/components/site/ui";

/** Seconds each service holds the stage before the next one takes over. */
const DWELL = 6;

const KEY_STEPS = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

/**
 * The four service lines as tabs over the sky, each swapping in its own
 * illustration. A progress bar under the open tab drives the rotation: when
 * its CSS animation ends the next tab opens, so pausing the animation (mouse
 * over, keyboard focus inside, scrolled away) pauses the rotation with it, and
 * reduced motion, which drops the animation, leaves the visitor in control.
 */
export default function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef(null);
  const tabRefs = useRef([]);
  const current = services[active];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const select = (i, focus = false) => {
    const next = (i + services.length) % services.length;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e) => {
    const step = KEY_STEPS[e.key];
    let target = null;
    if (step) target = active + step;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = services.length - 1;
    if (target === null) return;
    e.preventDefault();
    select(target, true);
  };

  const paused = hovered || focused || !visible;

  return (
    <div
      ref={rootRef}
      data-anim="rise"
      data-anim-delay="0.3"
      data-paused={paused || undefined}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setFocused(true)}
      onBlur={(e) => !rootRef.current?.contains(e.relatedTarget) && setFocused(false)}
      className="mt-14 lg:mt-20"
    >
      <div className="rounded-[30px] bg-paper p-2.5 shadow-[0_40px_90px_-45px_rgba(13,13,13,.55)] ring-1 ring-line">
        <Sky className="rounded-[22px] lg:h-[520px]" sizes="(min-width: 1440px) 1360px, 100vw">
          <div className="relative flex flex-col gap-6 p-3 pb-6 sm:p-5 sm:pb-8 lg:grid lg:h-full lg:grid-cols-[290px_minmax(0,1fr)] lg:items-center lg:gap-10 lg:p-8 xl:grid-cols-[300px_minmax(0,1fr)_210px]">
            {/* Tabs */}
            <div className="rounded-full border border-white/60 bg-white/65 p-1 text-[#0d0d0d] shadow-[0_14px_40px_-16px_rgba(13,13,13,.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#141414]/70 dark:text-white lg:rounded-[22px] lg:p-2">
              <p className="hidden items-center justify-between px-3 pb-2.5 pt-2 text-[11px] uppercase tracking-[0.16em] opacity-55 lg:flex">
                <span>What we build</span>
                <span>
                  {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
              </p>
              <div
                role="tablist"
                aria-label="What we build"
                onKeyDown={onKeyDown}
                className="flex gap-1 overflow-x-auto [scrollbar-width:none] lg:flex-col lg:overflow-visible"
              >
                {services.map((s, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={s.slug}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      id={`hero-tab-${s.slug}`}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      aria-controls={`hero-panel-${s.slug}`}
                      tabIndex={on ? 0 : -1}
                      onClick={() => select(i)}
                      className={cx(
                        "relative flex-auto shrink-0 overflow-hidden rounded-full px-3.5 pb-2.5 pt-2 text-left transition-colors duration-300 lg:flex-none lg:rounded-2xl lg:px-4 lg:pb-4 lg:pt-3.5",
                        on
                          ? "bg-white shadow-[0_8px_24px_-14px_rgba(13,13,13,.5)] dark:bg-white/[.12]"
                          : "hover:bg-white/50 dark:hover:bg-white/[.06]",
                      )}
                    >
                      <span className="hidden items-center justify-between text-[10.5px] uppercase tracking-[0.16em] opacity-50 lg:flex">
                        {s.code}
                        <ArrowUpRight
                          size={13}
                          strokeWidth={1.8}
                          className={cx("transition-opacity duration-300", on ? "opacity-100" : "opacity-0")}
                        />
                      </span>
                      <span className="block whitespace-nowrap text-center text-[13px] lg:mt-1 lg:text-left lg:font-display lg:text-[19px] lg:leading-tight lg:tracking-[-0.01em]">
                        <span className="lg:hidden">{s.name.split(" ")[0]}</span>
                        <span className="hidden lg:inline">{s.name}</span>
                      </span>
                      <span
                        className={cx(
                          "hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:grid",
                          on ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <span className="min-h-0 overflow-hidden">
                          <span className="block pt-1 text-[12.5px] leading-snug opacity-60">{s.short}</span>
                        </span>
                      </span>
                      {on && (
                        <span className="absolute inset-x-4 bottom-1 h-[2px] overflow-hidden rounded-full bg-black/10 dark:bg-white/15 lg:bottom-2">
                          <span
                            className="progress-bar block h-full rounded-full bg-[#0d0d0d] dark:bg-[var(--lime)]"
                            style={{ "--progress-duration": `${DWELL}s` }}
                            onAnimationEnd={(e) => e.target === e.currentTarget && select(i + 1)}
                          />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stage: every visual is laid in the same cell, so swapping one
                for the next never changes the height. The mocks are drawn at
                card size, so the wide stage zooms them up a step. */}
            <div className="mx-auto grid w-full max-w-[460px] xl:[zoom:1.18]">
              {services.map((s, i) => {
                const on = i === active;
                return (
                  <div
                    key={s.slug}
                    id={`hero-panel-${s.slug}`}
                    role="tabpanel"
                    aria-labelledby={`hero-tab-${s.slug}`}
                    inert={!on}
                    className={cx(
                      "self-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] [grid-area:1/1]",
                      on ? "opacity-100" : "pointer-events-none translate-y-5 scale-[.97] opacity-0",
                    )}
                  >
                    <ServiceVisual name={s.visual} />
                  </div>
                );
              })}
            </div>

            <div className="hidden h-full flex-col items-end justify-between py-2 xl:flex">
              <DeployCard className="float" />
              <BarsCard className="float [animation-delay:-3s]" />
            </div>
          </div>
        </Sky>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-3 py-3.5 text-[13px]">
          <p className="flex min-w-0 items-center gap-2 text-ink-soft">
            <Dot />
            <span className="shrink-0 whitespace-nowrap text-muted">{current.code}</span>
            <span className="truncate md:hidden">{current.short}</span>
            <span className="hidden truncate md:inline">{current.copy}</span>
          </p>
          <TextLink href={paths.service(current.slug)} className="shrink-0">
            Explore {current.name}
          </TextLink>
        </div>
      </div>
    </div>
  );
}
