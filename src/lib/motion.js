"use client";

/**
 * Nexarrow motion layer.
 *
 * Every scroll-driven effect is declared in markup with a data attribute and
 * wired here, so pages stay server-rendered and there is one place to tune
 * easing, thresholds and reduced-motion behaviour.
 *
 *   data-anim="rise|fade|scale|mask"   reveal once on enter
 *   data-anim-delay="0.2"              extra delay in seconds
 *   data-stagger                       reveal direct children in sequence
 *   data-parallax="-0.2"               scroll parallax, fraction of travel
 *   data-scrub="grow|line|text"        continuous scroll-linked effect
 *   data-count="12" data-count-suffix  animated number
 *   data-hscroll                       pinned horizontal track (desktop only)
 *
 * Reveal targets are hidden by CSS before first paint (see globals.css), so
 * every reveal here animates *to* a visible state rather than from one.
 */

import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const EASE = "power3.out";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ───────────────────────── smooth scroll ───────────────────────── */

let lenis = null;

export function getLenis() {
  return lenis;
}

/**
 * Lenis, driven by the GSAP ticker only — driving it from requestAnimationFrame
 * as well advances it twice per frame and desyncs ScrollTrigger.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const instance = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
      anchors: { offset: -96 },
    });
    lenis = instance;

    const tick = (time) => instance.raf(time * 1000);
    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);
}

/* ───────────────────────── reveals ───────────────────────── */

const FROM = {
  rise: { y: 40, autoAlpha: 0 },
  fade: { autoAlpha: 0 },
  scale: { scale: 0.95, autoAlpha: 0, transformOrigin: "50% 70%" },
  mask: { yPercent: 108, autoAlpha: 1 },
};

const TO = {
  rise: { y: 0, autoAlpha: 1 },
  fade: { autoAlpha: 1 },
  scale: { scale: 1, autoAlpha: 1 },
  mask: { yPercent: 0, autoAlpha: 1 },
};

function buildReveals() {
  const vh = window.innerHeight;

  gsap.utils.toArray("[data-anim]").forEach((el) => {
    const kind = FROM[el.dataset.anim] ? el.dataset.anim : "rise";
    const delay = parseFloat(el.dataset.animDelay || "0");
    const stagger = el.hasAttribute("data-stagger");

    // A staggered parent is itself shown at once; its children carry the motion.
    if (stagger) gsap.set(el, { autoAlpha: 1 });
    const targets = stagger ? Array.from(el.children) : el;

    // Content already on screen plays as a load-in sequence instead of waiting
    // on a ScrollTrigger whose start clamps to scroll 0.
    const onScreen = el.getBoundingClientRect().top < vh * 0.94;

    gsap.fromTo(targets, FROM[kind], {
      ...TO[kind],
      duration: kind === "mask" ? 1 : 0.9,
      delay,
      ease: EASE,
      stagger: stagger ? 0.08 : 0,
      ...(onScreen ? {} : { scrollTrigger: { trigger: el, start: "top 90%", once: true } }),
    });
  });
}

/* ───────────────────────── scroll-linked ───────────────────────── */

function buildScrubbed() {
  gsap.utils.toArray("[data-parallax]").forEach((el) => {
    gsap.to(el, {
      yPercent: parseFloat(el.dataset.parallax || "0.15") * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest("[data-parallax-scope]") || el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  gsap.utils.toArray('[data-scrub="grow"]').forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 1.12 },
      { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: 0.6 } },
    );
  });

  gsap.utils.toArray('[data-scrub="line"]').forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: "0% 50%" },
      { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 92%", end: "top 55%", scrub: 0.5 } },
    );
  });

  gsap.utils.toArray('[data-scrub="text"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0.16 },
      { opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 88%", end: "top 52%", scrub: 0.5 } },
    );
  });
}

/* ───────────────────────── counters ───────────────────────── */

function buildCounters() {
  gsap.utils.toArray("[data-count]").forEach((el) => {
    const end = parseFloat(el.dataset.count || "0");
    const pad = parseInt(el.dataset.countPad || "0", 10);
    const suffix = el.dataset.countSuffix || "";
    const format = (v) => String(Math.round(v)).padStart(pad, "0") + suffix;
    const counter = { v: 0 };

    // The markup already holds the final figure, so it is correct without
    // motion; rewind to zero only now that the count-up is certain to run.
    el.textContent = format(0);

    gsap.to(counter, {
      v: end,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = format(counter.v);
      },
    });
  });
}

/* ───────────────────────── pinned horizontal track ───────────────────────── */

/**
 * Pins a section and walks its track sideways as the page scrolls. Desktop
 * only: on touch widths the same track is a native swipeable row. Steps light
 * up as they reach the middle of the viewport.
 */
function buildHorizontal(mm) {
  mm.add("(min-width: 1024px)", () => {
    gsap.utils.toArray("[data-hscroll]").forEach((section) => {
      const viewport = section.querySelector("[data-hscroll-viewport]");
      const track = section.querySelector("[data-hscroll-track]");
      if (!viewport || !track) return;

      // Travel until the last step meets the viewport's right padding edge.
      const distance = () => {
        const s = getComputedStyle(viewport);
        const inner = viewport.clientWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight);
        return Math.max(0, track.scrollWidth - inner);
      };
      if (distance() < 8) return;

      section.setAttribute("data-pinned", "");

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      section.querySelectorAll("[data-hscroll-step]").forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          containerAnimation: tween,
          start: "left 78%",
          onEnter: () => step.setAttribute("data-active", ""),
          onLeaveBack: () => step.removeAttribute("data-active"),
        });
      });

      return () => {
        section.removeAttribute("data-pinned");
        section.querySelectorAll("[data-hscroll-step]").forEach((s) => s.removeAttribute("data-active"));
      };
    });
  });
}

/* ───────────────────────── page wiring ───────────────────────── */

/**
 * Builds the whole declarative layer for the current page. Keyed on the
 * pathname so a navigation tears down the old page's triggers before the new
 * page's are measured.
 */
export function usePageMotion(key) {
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      buildReveals();
      buildScrubbed();
      buildCounters();
      buildHorizontal(mm);
    });

    // Fonts and images settle after mount and move things; re-measure then.
    const settle = setTimeout(() => ScrollTrigger.refresh(), 200);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      clearTimeout(settle);
      mm.revert();
      ctx.revert();
    };
  }, [key]);
}

export { gsap, ScrollTrigger };
