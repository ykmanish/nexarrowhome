import Image from "next/image";
import { cx } from "./ui";

/** Vertical frame lines, in % of the frame: its two edges and the column breaks of --frame-cols. */
const FRAME_LINES = [0, 18, 60, 80, 100];

/** A hairline over the sky: white on the light photograph, faint on the dark one. */
export const SKY_LINE = "bg-white/75 dark:bg-white/10";

/**
 * The sky photograph every page opens on. It runs up under the transparent
 * header, washed lighter at the top so the nav reads, and darkened to night
 * in the dark theme. The hairline under the nav runs the full width. Short
 * heroes pass `position` to crop to the bluer lower sky, so the white
 * hairlines still read against it.
 */
export function SkyBackdrop({ priority = true, position = "object-center" }) {
  return (
    <>
      <Image src="/hero-sky.jpg" alt="" fill priority={priority} sizes="100vw" className={cx("-z-20 object-cover", position)} />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,.5),rgba(255,255,255,.12)_45%,rgba(255,255,255,0)_75%)] dark:bg-[linear-gradient(180deg,rgba(10,11,14,.86),rgba(10,11,14,.72))]"
      />
      <span aria-hidden="true" className={cx("pointer-events-none absolute inset-x-0 top-[76px] hidden h-px xl:block", SKY_LINE)} />
    </>
  );
}

/**
 * The frame's vertical hairlines, from 1280px up. Place inside the element
 * that spans the frame (the gutter box widened by 24px each side). Under the
 * header (`underNav`), the break between the two middle columns starts below
 * the nav row, so the centred nav sits in one merged cell.
 */
export function FrameLines({ className = SKY_LINE, underNav = false }) {
  return FRAME_LINES.map((x) => (
    <span
      key={x}
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute bottom-0 hidden w-px xl:block",
        underNav && x === 60 ? "top-[76px]" : "top-0",
        className,
      )}
      style={{ left: `${x}%` }}
    />
  ));
}

/**
 * A full-bleed hairline along the top of a frame row, from 1280px up; the
 * section's overflow clips it to the viewport.
 */
export const ROW_LINE =
  "relative xl:before:pointer-events-none xl:before:absolute xl:before:-inset-x-[100vw] xl:before:top-0 xl:before:h-px xl:before:bg-white/75 dark:xl:before:bg-white/10";

/** The same full-bleed row hairline on a night band, at every width. */
export const NIGHT_ROW_LINE =
  "relative before:pointer-events-none before:absolute before:-inset-x-[100vw] before:top-0 before:h-px before:bg-white/10";
