"use client";

import { useEffect, useRef } from "react";
import { EUROPE } from "./europe-dots";

/** CSS pixels around the pointer in which dots light up. */
const REACH = 170;
/** Where the arcs leave the map, in grid units: west, south and east. */
const ARC_ENDS = [
  [-16, 58],
  [26, 114],
  [122, 84],
];
/** Cells over which land eases into sea where the map data stops. */
const EDGE_FADE = 8;

/** Land as a flat bitmap, decoded once from the hex rows. */
const LAND = (() => {
  const out = new Uint8Array(EUROPE.cols * EUROPE.rows);
  EUROPE.grid.forEach((hex, row) => {
    const bits = [...hex]
      .map((ch) => parseInt(ch, 16).toString(2).padStart(4, "0"))
      .join("")
      .slice(-EUROPE.cols);
    for (let col = 0; col < EUROPE.cols; col++) {
      if (bits[col] === "1") out[row * EUROPE.cols + col] = 1;
    }
  });
  return out;
})();

/** How much of a lattice cell is land, 0–1, softened toward the data's edge. */
function landAt(col, row) {
  if (col < 0 || row < 0 || col >= EUROPE.cols || row >= EUROPE.rows) return 0;
  if (!LAND[row * EUROPE.cols + col]) return 0;
  const edge = Math.min(col, row, EUROPE.cols - 1 - col, EUROPE.rows - 1 - row);
  return Math.min(1, (edge + 1) / EDGE_FADE);
}

/** Point on a quadratic curve at t. */
function quad(a, c, b, t) {
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
}

/**
 * A dot lattice that fills its box, with Europe picked out in darker dots.
 * The lattice is placed by Tallinn: --map-tx/--map-ty (fractions of the box)
 * say where Tallinn sits, and every other dot follows from that and the cell
 * size, so the field has no edges of its own. The still layer is painted once
 * per size; each frame adds only what moves: dots lighting up around the
 * pointer, rings pulsing out of Tallinn and three arcs carrying work off the
 * map. Colours come from the theme's CSS variables and are re-read when the
 * theme flips. With reduced motion it draws one still frame, and it stops
 * drawing whenever it is scrolled out of view.
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
    let origin = [0, 0];
    let frame = 0;
    let visible = true;
    let ink = { dot: "13, 13, 13", land: 0.15, sea: 0.05, accent: "0, 51, 153" };

    const readStyle = () => {
      const css = getComputedStyle(canvas);
      const read = (name) => css.getPropertyValue(name).trim();
      ink = {
        dot: read("--map-dot") || ink.dot,
        land: parseFloat(read("--map-land-alpha")) || ink.land,
        sea: parseFloat(read("--map-sea-alpha")) || ink.sea,
        accent: read("--eu-rgb") || ink.accent,
      };
      return [parseFloat(read("--map-tx")) || 0.7, parseFloat(read("--map-ty")) || 0.22];
    };

    /** Centre of map cell (col, row) in canvas pixels. */
    const at = (col, row) => [origin[0] + (col + 0.5) * cell, origin[1] + (row + 0.5) * cell];
    /** Lattice indices covering canvas pixels from..to, plus a margin. */
    const span = (from, to, o) => [Math.floor((from - o) / cell) - 1, Math.ceil((to - o) / cell)];

    const arcs = () => {
      const h = at(...EUROPE.home);
      return ARC_ENDS.map(([ex, ey]) => {
        const end = at(ex, ey);
        const lift = Math.hypot(end[0] - h[0], end[1] - h[1]) * 0.32;
        return [h, [(h[0] + end[0]) / 2, (h[1] + end[1]) / 2 - lift], end];
      });
    };

    const paintBase = () => {
      base.width = canvas.width;
      base.height = canvas.height;
      const b = base.getContext("2d");
      const r = cell * 0.2;
      const [c0, c1] = span(0, canvas.width, origin[0]);
      const [r0, r1] = span(0, canvas.height, origin[1]);
      const sea = new Path2D();
      const land = new Path2D();
      for (let row = r0; row <= r1; row++) {
        for (let col = c0; col <= c1; col++) {
          const [x, y] = at(col, row);
          const w = landAt(col, row);
          if (w === 0 || w === 1) {
            const path = w ? land : sea;
            path.moveTo(x + r, y);
            path.arc(x, y, r, 0, Math.PI * 2);
          } else {
            b.fillStyle = `rgba(${ink.dot}, ${ink.sea + (ink.land - ink.sea) * w})`;
            b.beginPath();
            b.arc(x, y, r, 0, Math.PI * 2);
            b.fill();
          }
        }
      }
      b.fillStyle = `rgba(${ink.dot}, ${ink.sea})`;
      b.fill(sea);
      b.fillStyle = `rgba(${ink.dot}, ${ink.land})`;
      b.fill(land);

      // The arcs' faint dashed paths never move, so they live here too.
      b.setLineDash([2 * dpr, 6 * dpr]);
      b.lineWidth = dpr;
      b.strokeStyle = `rgba(${ink.accent}, 0.3)`;
      for (const [a, c, e] of arcs()) {
        b.beginPath();
        b.moveTo(a[0], a[1]);
        b.quadraticCurveTo(c[0], c[1], e[0], e[1]);
        b.stroke();
      }
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(base, 0, 0);

      // Dots around the pointer swell and take the accent, land most of all.
      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;
      pointer.on += ((pointer.inside ? 1 : 0) - pointer.on) * 0.08;
      if (pointer.on > 0.01) {
        const reach = REACH * dpr;
        const r = cell * 0.2;
        const [c0, c1] = span(pointer.x - reach, pointer.x + reach, origin[0]);
        const [r0, r1] = span(pointer.y - reach, pointer.y + reach, origin[1]);
        for (let row = r0; row <= r1; row++) {
          for (let col = c0; col <= c1; col++) {
            const [x, y] = at(col, row);
            const d = Math.hypot(x - pointer.x, y - pointer.y);
            if (d >= reach) continue;
            const k = (1 - d / reach) ** 2 * pointer.on * (0.3 + 0.7 * landAt(col, row));
            if (k < 0.02) continue;
            ctx.fillStyle = `rgba(${ink.accent}, ${0.15 + k * 0.85})`;
            ctx.beginPath();
            ctx.arc(x, y, r * (1 + k * 0.9), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Work leaving Tallinn: a short comet along each arc.
      ctx.setLineDash([]);
      ctx.lineCap = "round";
      ctx.lineWidth = 1.6 * dpr;
      arcs().forEach(([a, c, e], i) => {
        const head = (t / 3400 + i / ARC_ENDS.length) % 1;
        const tail = Math.max(0, head - 0.14);
        const steps = 14;
        for (let s = 0; s < steps; s++) {
          const p0 = quad(a, c, e, tail + ((head - tail) * s) / steps);
          const p1 = quad(a, c, e, tail + ((head - tail) * (s + 1)) / steps);
          ctx.strokeStyle = `rgba(${ink.accent}, ${((s + 1) / steps) * 0.9})`;
          ctx.beginPath();
          ctx.moveTo(p0[0], p0[1]);
          ctx.lineTo(p1[0], p1[1]);
          ctx.stroke();
        }
      });

      // Tallinn: a glow, three rings walking outwards, and the dot itself.
      const [hx, hy] = at(...EUROPE.home);
      const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, cell * 6);
      glow.addColorStop(0, `rgba(${ink.accent}, 0.32)`);
      glow.addColorStop(1, `rgba(${ink.accent}, 0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(hx - cell * 6, hy - cell * 6, cell * 12, cell * 12);
      if (!still) {
        ctx.lineWidth = 1.2 * dpr;
        for (let k = 0; k < 3; k++) {
          const p = (t / 2600 + k / 3) % 1;
          ctx.strokeStyle = `rgba(${ink.accent}, ${(1 - p) * 0.6})`;
          ctx.beginPath();
          ctx.arc(hx, hy, cell * (0.9 + p * 7), 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.fillStyle = `rgb(${ink.accent})`;
      ctx.beginPath();
      ctx.arc(hx, hy, cell * 0.55, 0, Math.PI * 2);
      ctx.fill();
    };

    const layout = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      const [tx, ty] = readStyle();
      cell = Math.min(13, Math.max(8, canvas.clientWidth / 120)) * dpr;
      origin = [
        tx * canvas.width - (EUROPE.home[0] + 0.5) * cell,
        ty * canvas.height - (EUROPE.home[1] + 0.5) * cell,
      ];
      paintBase();
      if (still) draw(0);
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

    const ro = new ResizeObserver(layout);
    ro.observe(canvas);
    layout();

    // The theme toggle swaps a class on <html>; repaint in the new colours.
    const mo = new MutationObserver(() => {
      readStyle();
      paintBase();
      if (still) draw(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    if (still) {
      return () => {
        ro.disconnect();
        mo.disconnect();
      };
    }

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
      mo.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
