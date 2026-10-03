"use client";

import { useEffect, useRef } from "react";
import { EUROPE } from "./europe-dots";

const LIME = "207, 242, 127";
/** CSS pixels around the pointer in which dots light up. */
const REACH = 170;
/** Where the arcs leave the map, in grid units: west, south and east. */
const ARC_ENDS = [
  [-16, 58],
  [26, 114],
  [122, 84],
];

/** Land cells as [col, row], decoded once from the hex bitmap. */
const DOTS = EUROPE.grid.flatMap((hex, row) => {
  const bits = [...hex]
    .map((ch) => parseInt(ch, 16).toString(2).padStart(4, "0"))
    .join("")
    .slice(-EUROPE.cols);
  return [...bits].flatMap((bit, col) => (bit === "1" ? [[col, row]] : []));
});

/** Point on a quadratic curve at t. */
function quad(a, c, b, t) {
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
}

/**
 * The dotted map behind the hero, drawn on a canvas. The land is painted once
 * per size into an offscreen layer; each frame adds only what moves: dots
 * lighting up around the pointer, rings pulsing out of Tallinn and three
 * arcs carrying work off the map. With reduced motion it draws one still
 * frame, and it stops drawing whenever it is scrolled out of view.
 */
export default function EuropeMap({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return undefined;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const base = document.createElement("canvas");
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, on: 0, inside: false };
    let dpr = 1;
    let cell = 1;
    let frame = 0;
    let visible = true;

    const home = () => [(EUROPE.home[0] + 0.5) * cell, (EUROPE.home[1] + 0.5) * cell];

    const arcs = () => {
      const h = home();
      return ARC_ENDS.map(([ex, ey]) => {
        const end = [(ex + 0.5) * cell, (ey + 0.5) * cell];
        const mid = [(h[0] + end[0]) / 2, (h[1] + end[1]) / 2];
        const lift = Math.hypot(end[0] - h[0], end[1] - h[1]) * 0.32;
        return [h, [mid[0], mid[1] - lift], end];
      });
    };

    const paintBase = () => {
      base.width = canvas.width;
      base.height = canvas.height;
      const b = base.getContext("2d");
      b.fillStyle = "rgba(255, 255, 255, 0.2)";
      b.beginPath();
      const r = cell * 0.2;
      for (const [c, rw] of DOTS) {
        const x = (c + 0.5) * cell;
        const y = (rw + 0.5) * cell;
        b.moveTo(x + r, y);
        b.arc(x, y, r, 0, Math.PI * 2);
      }
      b.fill();

      // The arcs' faint dashed paths never move, so they live here too.
      b.setLineDash([2 * dpr, 6 * dpr]);
      b.lineWidth = dpr;
      b.strokeStyle = `rgba(${LIME}, 0.22)`;
      for (const [a, c, e] of arcs()) {
        b.beginPath();
        b.moveTo(a[0], a[1]);
        b.quadraticCurveTo(c[0], c[1], e[0], e[1]);
        b.stroke();
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      cell = canvas.width / EUROPE.cols;
      paintBase();
      if (still) draw(0);
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(base, 0, 0);

      // Dots around the pointer swell and turn lime.
      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;
      pointer.on += ((pointer.inside ? 1 : 0) - pointer.on) * 0.08;
      if (pointer.on > 0.01) {
        const reach = REACH * dpr;
        const r = cell * 0.2;
        for (const [c, rw] of DOTS) {
          const x = (c + 0.5) * cell;
          const y = (rw + 0.5) * cell;
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          if (Math.abs(dx) > reach || Math.abs(dy) > reach) continue;
          const d = Math.hypot(dx, dy);
          if (d >= reach) continue;
          const k = (1 - d / reach) ** 2 * pointer.on;
          ctx.fillStyle = `rgba(${LIME}, ${0.2 + k * 0.8})`;
          ctx.beginPath();
          ctx.arc(x, y, r * (1 + k * 0.9), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Work leaving Tallinn: a short comet along each arc.
      arcs().forEach(([a, c, e], i) => {
        const head = (t / 3400 + i / ARC_ENDS.length) % 1;
        const tail = Math.max(0, head - 0.14);
        const steps = 14;
        ctx.setLineDash([]);
        ctx.lineCap = "round";
        for (let s = 0; s < steps; s++) {
          const p0 = quad(a, c, e, tail + ((head - tail) * s) / steps);
          const p1 = quad(a, c, e, tail + ((head - tail) * (s + 1)) / steps);
          ctx.strokeStyle = `rgba(${LIME}, ${((s + 1) / steps) * 0.9})`;
          ctx.lineWidth = 1.6 * dpr;
          ctx.beginPath();
          ctx.moveTo(p0[0], p0[1]);
          ctx.lineTo(p1[0], p1[1]);
          ctx.stroke();
        }
      });

      // Tallinn: a glow, three rings walking outwards, and the dot itself.
      const [hx, hy] = home();
      const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, cell * 6);
      glow.addColorStop(0, `rgba(${LIME}, 0.4)`);
      glow.addColorStop(1, `rgba(${LIME}, 0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(hx - cell * 6, hy - cell * 6, cell * 12, cell * 12);
      if (!still) {
        for (let k = 0; k < 3; k++) {
          const p = (t / 2600 + k / 3) % 1;
          ctx.strokeStyle = `rgba(${LIME}, ${(1 - p) * 0.6})`;
          ctx.lineWidth = 1.2 * dpr;
          ctx.beginPath();
          ctx.arc(hx, hy, cell * (0.9 + p * 7), 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.fillStyle = `rgb(${LIME})`;
      ctx.beginPath();
      ctx.arc(hx, hy, cell * 0.55, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = (t) => {
      draw(t);
      frame = visible ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) * dpr;
      pointer.ty = (e.clientY - rect.top) * dpr;
      pointer.inside = e.clientY >= rect.top - REACH && e.clientY <= rect.bottom + REACH;
      if (pointer.on < 0.01) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };
    const onLeave = () => {
      pointer.inside = false;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (still) return () => ro.disconnect();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
