"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  ChartLine,
  ClipboardPaste,
  Database,
  FileSpreadsheet,
  FileText,
  Keyboard,
  Mail,
  MessageCircle,
  RefreshCw,
  Route,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";
import { oneSystem } from "@/content/company";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { BrandMark, Label, cx } from "@/components/site/ui";

/* Drawn in a 1200 × 360 box. Chips, stages and cards are placed in % of the
   same box, so they sit on the ends of the SVG paths at any width. */
const BOX = { w: 1200, h: 360 };
const CORE = { x: 600, y: 180, r: 56 };
const STAGE_X = 430;
const STAGE_R = 22;
const AFTER_X = 74;

/** Where the work lives today: `x` is the chip's right edge, `y` its middle, in %. Two per stage. */
const BEFORE = [
  { icon: FileSpreadsheet, x: 19, y: 8, tilt: -2.5 },
  { icon: FileText, x: 22.5, y: 24, tilt: 1.5 },
  { icon: Mail, x: 20, y: 41, tilt: -1 },
  { icon: MessageCircle, x: 23, y: 58, tilt: 2 },
  { icon: ClipboardPaste, x: 19.5, y: 75, tilt: -1.5 },
  { icon: Keyboard, x: 22, y: 92, tilt: 1 },
].map((b, i) => ({ ...b, label: oneSystem.before[i], stage: Math.floor(i / 2) }));

/** What we do with it on the way in. */
const STAGES = [
  { icon: Database, y: 100 / 6 },
  { icon: Route, y: 50 },
  { icon: Bot, y: 500 / 6 },
].map((s, i) => ({ ...s, label: oneSystem.stages[i] }));

/** What it runs on after: every card starts at AFTER_X, `y` is its middle, in %. */
const AFTER = [
  { icon: Workflow, y: 10 },
  { icon: ChartLine, y: 30 },
  { icon: Sparkles, y: 50 },
  { icon: UsersRound, y: 70 },
  { icon: RefreshCw, y: 90 },
].map((a, i) => ({ ...a, label: oneSystem.after[i] }));

const px = (x) => (x / 100) * BOX.w;
const py = (y) => (y / 100) * BOX.h;

const inPath = (b) => {
  const s = STAGES[b.stage];
  return `M ${px(b.x)} ${py(b.y)} C ${px(b.x) + 80} ${py(b.y)}, ${STAGE_X - 80} ${py(s.y)}, ${STAGE_X - STAGE_R} ${py(s.y)}`;
};
const midPath = (s) =>
  `M ${STAGE_X + STAGE_R} ${py(s.y)} C ${STAGE_X + 90} ${py(s.y)}, ${CORE.x - 110} ${CORE.y}, ${CORE.x - CORE.r} ${CORE.y}`;
const outPath = (a) =>
  `M ${CORE.x + CORE.r} ${CORE.y} C ${CORE.x + 140} ${CORE.y}, ${px(AFTER_X) - 150} ${py(a.y)}, ${px(AFTER_X)} ${py(a.y)}`;

/** Stroke opacity and width for a path at rest, highlighted, and dimmed behind a highlight. */
const STROKES = {
  in: { idle: [0.3, 1.3], on: [0.9, 2], off: [0.1, 1.3] },
  mid: { idle: [0.45, 1.4], on: [1, 2.2], off: [0.15, 1.4] },
  out: { idle: [0.6, 1.5], on: [1, 2.6], off: [0.2, 1.5] },
};

function strokeStyle(kind, state) {
  const [opacity, width] = STROKES[kind][state];
  return { strokeOpacity: opacity, strokeWidth: width, transition: "stroke-opacity .3s, stroke-width .3s" };
}

const CHIP =
  "flex items-center gap-2 whitespace-nowrap rounded-md border bg-paper/90 px-3 py-1.5 text-[12px] text-ink-soft shadow-[0_10px_24px_-14px_rgba(13,13,13,.35)] backdrop-blur-md transition-[border-color,opacity] duration-300 2xl:text-[12.5px]";
const CARD =
  "flex items-center gap-2.5 whitespace-nowrap rounded-md border bg-paper py-1.5 pl-1.5 pr-3.5 text-[12.5px] text-ink shadow-[0_14px_30px_-16px_rgba(0,40,110,.45)] transition-[border-color,opacity] duration-300 2xl:text-[13px]";

function Before({ item }) {
  const Icon = item.icon;
  return (
    <>
      <Icon size={14} strokeWidth={1.8} className="shrink-0 text-muted" />
      {item.label}
    </>
  );
}

function After({ item }) {
  const Icon = item.icon;
  return (
    <>
      <span className="grid size-6 shrink-0 place-items-center rounded-[5px] bg-eu text-eu-ink">
        <Icon size={13} strokeWidth={1.9} />
      </span>
      {item.label}
    </>
  );
}

/** From 1280px: the full diagram, animated in on scroll and lit on hover. */
function Diagram() {
  const rootRef = useRef(null);
  const coreRef = useRef(null);
  const ringRef = useRef(null);
  const clipRef = useRef(null);
  const packetsRef = useRef(null);
  const [hot, setHot] = useState(null); // { side: "in" | "out", i }

  const inState = (i) => (hot?.side !== "in" ? "idle" : hot.i === i ? "on" : "off");
  const midState = (j) => (hot?.side !== "in" ? "idle" : BEFORE[hot.i].stage === j ? "on" : "off");
  const outState = (k) => (hot?.side !== "out" ? "idle" : hot.i === k ? "on" : "off");

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const root = rootRef.current;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const ins = q("[data-flow='in']");
      const stages = q("[data-flow='stage']");
      const outs = q("[data-flow='out']");
      const outPaths = q("[data-flow-path='out']");

      // Everything starts scattered or undrawn, then assembles once in view.
      gsap.set(ins, {
        autoAlpha: 0,
        x: () => gsap.utils.random(-90, -30),
        y: () => gsap.utils.random(-40, 40),
        rotation: () => gsap.utils.random(-14, 14),
      });
      gsap.set(stages, { autoAlpha: 0, scale: 0.4 });
      gsap.set(coreRef.current, { autoAlpha: 0, scale: 0.6 });
      gsap.set(outs, { autoAlpha: 0, x: 40 });
      gsap.set(clipRef.current, { attr: { width: 0 } });
      outPaths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(packetsRef.current, { autoAlpha: 0 });

      gsap
        .timeline({ scrollTrigger: { trigger: root, start: "top 72%", once: true } })
        .to(ins, { autoAlpha: 1, x: 0, y: 0, rotation: 0, duration: 0.9, ease: "back.out(1.4)", stagger: 0.07 })
        .to(clipRef.current, { attr: { width: BOX.w }, duration: 1.2, ease: "power2.inOut" }, "-=0.4")
        .to(stages, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(2)", stagger: 0.1 }, "-=0.9")
        .to(coreRef.current, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(1.8)" }, "-=0.4")
        .to(outPaths, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out", stagger: 0.08 }, "-=0.3")
        .to(outs, { autoAlpha: 1, x: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 }, "-=0.7")
        .to(packetsRef.current, { autoAlpha: 1, duration: 0.6 }, "-=0.2")
        .set(outPaths, { clearProps: "strokeDasharray,strokeDashoffset" });

      // The dashed ring around the mark turns as the section scrolls past.
      gsap.to(ringRef.current, {
        rotation: 240,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative hidden border border-line bg-paper bg-[radial-gradient(var(--line-strong)_1px,transparent_1.2px)] bg-[size:22px_22px] px-10 pb-16 pt-28 xl:block"
    >
      <div className="relative" style={{ aspectRatio: `${BOX.w} / ${BOX.h}` }}>
        {/* Two zones: loose and dashed on the way in, tinted European blue on the way out. */}
        <div aria-hidden="true" className="absolute -bottom-8 -top-20 left-[-2%] w-[31%] border border-dashed border-ink/20 bg-ink/[.02]" />
        <div aria-hidden="true" className="absolute -bottom-8 -top-20 right-[-2%] w-[31%] border border-eu/20 bg-eu/[.05]" />
        <Label className="absolute -top-14 left-0">Scattered today</Label>
        <Label className="absolute -top-14 left-[73%]">One system after</Label>

        <svg viewBox={`0 0 ${BOX.w} ${BOX.h}`} className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
          <defs>
            <clipPath id="flow-in-clip">
              <rect ref={clipRef} x="-40" y="-40" width={BOX.w} height={BOX.h + 80} />
            </clipPath>
          </defs>

          <g clipPath="url(#flow-in-clip)">
            {BEFORE.map((b, i) => (
              <path
                key={b.label}
                id={`flow-in-${i}`}
                d={inPath(b)}
                fill="none"
                stroke="var(--ink)"
                strokeDasharray="3 6"
                style={strokeStyle("in", inState(i))}
              />
            ))}
            {STAGES.map((s, j) => (
              <path
                key={s.label}
                id={`flow-mid-${j}`}
                d={midPath(s)}
                fill="none"
                stroke="var(--ink)"
                style={strokeStyle("mid", midState(j))}
              />
            ))}
          </g>

          {AFTER.map((a, k) => (
            <g key={a.label}>
              <path
                id={`flow-out-${k}`}
                data-flow-path="out"
                d={outPath(a)}
                fill="none"
                stroke="var(--eu)"
                style={strokeStyle("out", outState(k))}
              />
              <circle cx={px(AFTER_X)} cy={py(a.y)} r="3" fill="var(--eu)" />
            </g>
          ))}

          {/* Packets: grey on the way in, ink through the stages, blue on the way out. */}
          <g ref={packetsRef} className="flow-packets">
            {BEFORE.map((b, i) => (
              <circle key={b.label} r="2.4" fill="var(--ink)" fillOpacity="0.45">
                <animateMotion dur={`${2.2 + (i % 3) * 0.4}s`} begin={`-${i * 0.6}s`} repeatCount="indefinite">
                  <mpath href={`#flow-in-${i}`} />
                </animateMotion>
              </circle>
            ))}
            {STAGES.map((s, j) => (
              <circle key={s.label} r="2.8" fill="var(--ink)">
                <animateMotion dur="2s" begin={`-${j * 0.7}s`} repeatCount="indefinite">
                  <mpath href={`#flow-mid-${j}`} />
                </animateMotion>
              </circle>
            ))}
            {AFTER.map((a, k) => (
              <circle key={a.label} r="3.2" fill="var(--eu)">
                <animateMotion dur="2.4s" begin={`-${k * 0.5}s`} repeatCount="indefinite">
                  <mpath href={`#flow-out-${k}`} />
                </animateMotion>
              </circle>
            ))}
          </g>
        </svg>

        {BEFORE.map((b, i) => (
          <div
            key={b.label}
            className="absolute"
            style={{ right: `${100 - b.x}%`, top: `${b.y}%`, transform: `translateY(-50%) rotate(${b.tilt}deg)` }}
          >
            <div data-flow="in" onMouseEnter={() => setHot({ side: "in", i })} onMouseLeave={() => setHot(null)}>
              <span
                className={cx(
                  "float",
                  CHIP,
                  inState(i) === "on" ? "border-ink/40" : "border-line",
                  inState(i) === "off" && "opacity-50",
                )}
                style={{ animationDelay: `${-i * 1.1}s` }}
              >
                <Before item={b} />
              </span>
            </div>
          </div>
        ))}

        {STAGES.map((s, j) => (
          <div
            key={s.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(STAGE_X / BOX.w) * 100}%`, top: `${s.y}%` }}
          >
            <div data-flow="stage" className="relative flex flex-col items-center">
              <span
                className={cx(
                  "absolute bottom-full mb-2 whitespace-nowrap text-[10.5px] uppercase tracking-[0.16em] transition-colors duration-300",
                  midState(j) === "on" ? "text-ink" : "text-muted",
                )}
              >
                {s.label}
              </span>
              <span className="grid size-11 place-items-center rounded-full bg-[#0d0d0d] text-lime shadow-[0_12px_24px_-12px_rgba(13,13,13,.6)] ring-4 ring-paper">
                <s.icon size={17} strokeWidth={1.8} />
              </span>
            </div>
          </div>
        ))}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div ref={coreRef} className="relative grid place-items-center">
            <span ref={ringRef} aria-hidden="true" className="absolute -inset-5 rounded-full border border-dashed border-eu/50" />
            <span aria-hidden="true" className="flow-ring absolute inset-0 rounded-full border border-eu/40" />
            <span aria-hidden="true" className="flow-ring absolute inset-0 rounded-full border border-eu/40 [animation-delay:1.4s]" />
            <span className="relative grid size-24 place-items-center rounded-full bg-[#0d0d0d] shadow-[0_22px_44px_-16px_rgba(0,40,110,.6)] ring-8 ring-paper">
              <BrandMark className="size-12" />
            </span>
          </div>
        </div>

        {AFTER.map((a, k) => (
          <div key={a.label} className="absolute -translate-y-1/2" style={{ left: `${AFTER_X}%`, top: `${a.y}%` }}>
            <div data-flow="out" onMouseEnter={() => setHot({ side: "out", i: k })} onMouseLeave={() => setHot(null)}>
              <span
                className={cx(
                  CARD,
                  outState(k) === "on" ? "border-eu/50" : "border-transparent",
                  outState(k) === "off" && "opacity-60",
                )}
              >
                <After item={a} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Below 1280px: the same story, stacked. */
function Stack() {
  return (
    <div className="border border-line bg-paper p-5 sm:p-7 xl:hidden">
      <Label>Scattered today</Label>
      <ul data-anim="rise" data-stagger className="mt-4 flex flex-wrap gap-2">
        {BEFORE.map((b) => (
          <li key={b.label} className={cx(CHIP, "border-line")}>
            <Before item={b} />
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="my-7 flex items-center gap-4">
        <span className="h-px flex-1 border-t border-dashed border-ink/25" />
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#0d0d0d] ring-4 ring-mist">
          <BrandMark className="size-7" />
        </span>
        <span className="h-px flex-1 bg-eu/50" />
      </div>
      <p className="-mt-3 mb-6 text-center text-[10.5px] uppercase tracking-[0.16em] text-muted">
        {oneSystem.stages.join(" · ")}
      </p>
      <Label>One system after</Label>
      <ul data-anim="rise" data-stagger className="mt-4 flex flex-wrap gap-2">
        {AFTER.map((a) => (
          <li key={a.label} className={cx(CARD, "border-line")}>
            <After item={a} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Work scattered across files, inboxes and chats is captured, routed and
 * automated, and comes out as one system. Illustrative labels, not results.
 */
export default function OneSystemDiagram() {
  return (
    <>
      <Diagram />
      <Stack />
    </>
  );
}
