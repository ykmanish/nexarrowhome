import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MARK_ARROW, MARK_BADGE, MARK_VIEWBOX } from "@/lib/brand";

/** Joins class names, skipping falsy entries. */
export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

/* ─────────────────────────── brand ─────────────────────────── */

/**
 * The Nexarrow mark: an 18-sided badge with the curved arrow, vectorised from
 * the brand artwork so it can take the site lime instead of a fixed raster.
 */
export function BrandMark({ className = "size-9", fill = "var(--lime)", ink = "var(--lime-ink)" }) {
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden="true">
      <polygon fill={fill} points={MARK_BADGE} />
      <path fill={ink} d={MARK_ARROW} />
    </svg>
  );
}

/** Mark plus the brand wordmark. `onDark` forces the white wordmark. */
export function Logo({ onDark = false, className = "" }) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <BrandMark className="size-[34px] shrink-0" />
      <span className="sr-only">Nexarrow</span>
      {!onDark && (
        <Image
          src="/brand/wordmark-ink.png"
          alt=""
          width={122}
          height={17}
          priority
          className="dark:hidden"
        />
      )}
      <Image
        src="/brand/wordmark-white.png"
        alt=""
        width={122}
        height={17}
        priority
        className={onDark ? "" : "hidden dark:block"}
      />
    </span>
  );
}

/* ─────────────────────────── layout ─────────────────────────── */

const SECTION_TONES = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  night: "bg-night text-white",
  lime: "bg-lime text-lime-ink",
};

/**
 * Standard page band. Horizontal padding matches the header, so every edge
 * lines up, and each band opens on a full-width hairline like the hero's rows.
 */
export function Section({ id, tone = "paper", className = "", children, ...rest }) {
  return (
    <section
      id={id}
      className={cx(
        SECTION_TONES[tone],
        "gutter scroll-mt-24 border-t py-20 lg:py-28",
        tone === "night" ? "border-white/10" : "border-line",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

/**
 * The site's column frame (--frame-cols) inside a gutter. From 1280px up it
 * reaches 24px past the gutter and pads each cell by 24px, so cell content
 * still sits on the gutter edge. Children pick columns with col-start/span.
 */
export function Frame({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={cx("xl:-mx-6 xl:grid xl:grid-cols-[var(--frame-cols)] xl:*:px-6", className)} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Section opening on the frame: the label under the logo column with a
 * hairline after it, the heading across the next two columns, and the intro
 * and action in the last one, set on the baseline.
 */
export function SectionHead({ label, lead, tail, intro, action, tone = "default", as, size, className = "" }) {
  const night = tone === "night";
  return (
    <Frame className={cx("grid gap-6 xl:gap-0", className)}>
      <div data-anim="fade" className={cx("xl:border-r", night ? "border-white/10" : "border-line")}>
        <Label tone={tone}>{label}</Label>
      </div>
      <div className="xl:col-span-2">
        <Heading as={as} lead={lead} tail={tail} tone={tone} size={size} className="xl:-mt-1.5" />
      </div>
      {(intro || action) && (
        <div className="flex flex-col gap-6 xl:justify-end">
          {intro && (
            <p data-anim="rise" className={cx("max-w-sm text-[14.5px] leading-relaxed", night ? "text-white/55" : "text-muted")}>
              {intro}
            </p>
          )}
          {action && <div data-anim="fade">{action}</div>}
        </div>
      )}
    </Frame>
  );
}

/* ─────────────────────────── type ─────────────────────────── */

/** Section label: a small square of European blue, then the name in capitals. */
export function Label({ children, tone = "default", className = "" }) {
  const color = tone === "night" ? "text-white/55" : tone === "lime" ? "text-lime-ink/60" : "text-muted";
  const mark = tone === "night" ? "bg-[#8aa4ff]" : tone === "lime" ? "bg-lime-ink" : "bg-eu";
  return (
    <p className={cx("flex items-center gap-2.5 text-[12px] uppercase tracking-[0.18em]", color, className)}>
      <span aria-hidden="true" className={cx("size-1.5 shrink-0", mark)} />
      {children}
    </p>
  );
}

const HEADING_SIZES = {
  hero: "text-[clamp(2.9rem,7vw,6.25rem)] leading-[0.92] tracking-[-0.025em]",
  page: "text-[clamp(2.6rem,6vw,5.25rem)] leading-[0.95] tracking-[-0.025em]",
  section: "text-[clamp(2.25rem,4.5vw,3.6rem)] leading-[0.98] tracking-[-0.02em]",
  sub: "text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.04] tracking-[-0.02em]",
};

const HEADING_TONES = {
  default: ["text-ink", "text-eu"],
  soft: ["text-ink", "text-eu"],
  night: ["text-white", "text-[#8aa4ff]"],
  lime: ["text-lime-ink", "text-lime-ink/60"],
};

/** The serif italic the second line is set in, sized up to sit level with the sans. */
const SERIF_TAIL = "font-serif italic text-[1.08em] tracking-[-0.01em]";

/**
 * Two-part display heading: the first line in ink, the second in European
 * blue serif italic, the hero's "Europe" carried through the site. Each line
 * is masked and slides up into place.
 */
export function Heading({
  as: Tag = "h2",
  lead,
  tail,
  size = "section",
  tone = "default",
  className = "",
  delay = 0,
}) {
  const [leadColor, tailColor] = HEADING_TONES[tone] || HEADING_TONES.default;
  const lines = [
    [lead, leadColor],
    [tail, cx(tailColor, SERIF_TAIL)],
  ].filter(([text]) => text);

  return (
    <Tag className={cx("font-display text-balance", HEADING_SIZES[size], className)}>
      {lines.map(([text, color], i) => (
        <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <span data-anim="mask" data-anim-delay={delay + i * 0.08} className={cx("block", color)}>
            {text}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Large statement paragraph: an ink sentence that trails off into a softer serif italic. */
export function Statement({ lead, tail, tone = "default", className = "" }) {
  const [leadColor] = HEADING_TONES[tone] || HEADING_TONES.default;
  const tailColor = tone === "night" ? "text-white/55" : "text-ink-soft";
  return (
    <p
      data-anim="rise"
      className={cx(
        "font-display text-balance text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.14] tracking-[-0.02em]",
        className,
      )}
    >
      <span className={leadColor}>{lead}</span>{" "}
      {tail && <span className={cx("font-serif italic tracking-[-0.005em]", tailColor)}>{tail}</span>}
    </p>
  );
}

/* ─────────────────────────── actions ─────────────────────────── */

const BUTTON_TONES = {
  eu: "bg-eu text-eu-ink hover:bg-eu-deep",
  ink: "bg-ink text-paper hover:bg-ink-soft",
  lime: "bg-lime text-lime-ink hover:bg-lime-deep",
  outline: "border border-line-strong text-ink hover:border-ink",
  white: "bg-white text-[#0d0d0d] hover:bg-white/85",
  ghost: "border border-white/25 text-white hover:border-white/60",
};

/**
 * Square-cornered button, like the hero's call to action. With `arrow`, a
 * trailing arrow turns on hover: the one repeated gesture behind every call
 * to action.
 */
export function Button({
  href,
  children,
  variant = "ink",
  arrow = true,
  external = false,
  className = "",
  ...rest
}) {
  const classes = cx(
    "group inline-flex items-center gap-3 rounded-md px-6 py-3.5 text-[14px] transition-colors duration-300",
    BUTTON_TONES[variant] || BUTTON_TONES.ink,
    className,
  );
  const content = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      {arrow && (
        <ArrowUpRight
          size={16}
          strokeWidth={1.8}
          className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

/** Underlined text link with a trailing arrow. */
export function TextLink({ href, children, tone = "default", className = "", external = false }) {
  const Cmp = external ? "a" : Link;
  return (
    <Cmp
      href={href}
      className={cx(
        "group inline-flex items-center gap-1.5 text-[14px]",
        tone === "night" ? "text-white" : "text-ink",
        className,
      )}
    >
      <span className="border-b border-current/25 pb-0.5 transition-colors group-hover:border-current">
        {children}
      </span>
      <ArrowUpRight size={15} strokeWidth={1.8} className="transition-transform duration-300 group-hover:rotate-45" />
    </Cmp>
  );
}

/* ─────────────────────────── small parts ─────────────────────────── */

const CHIP_TONES = {
  outline: "border border-line text-ink-soft",
  soft: "bg-mist text-ink-soft",
  paper: "bg-paper text-ink",
  lime: "bg-lime text-lime-ink",
  eu: "bg-eu text-eu-ink",
  night: "border border-white/15 text-white/70",
  ink: "bg-ink text-paper",
};

export function Chip({ children, tone = "outline", className = "" }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-[4px] px-2.5 py-1 text-[12px] leading-5",
        CHIP_TONES[tone] || CHIP_TONES.outline,
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Status dot used in chips and captions. */
export function Dot({ className = "bg-lime-deep" }) {
  return <span className={cx("inline-block size-2 shrink-0 rounded-full", className)} aria-hidden="true" />;
}

/**
 * A figure with a caption. Numeric values count up on enter; the markup holds
 * the real number, so the figure is right even without motion.
 */
export function Stat({ value, pad = 2, suffix = "", label, tone = "default", className = "" }) {
  const numeric = typeof value === "number";
  const display = numeric ? String(value).padStart(pad, "0") + suffix : value;
  return (
    <div className={className}>
      <div
        className={cx(
          "font-display text-[clamp(2.75rem,5vw,4.25rem)] leading-none tracking-[-0.03em]",
          tone === "night" ? "text-white" : "text-ink",
        )}
        {...(numeric ? { "data-count": value, "data-count-pad": pad, "data-count-suffix": suffix } : {})}
      >
        {display}
      </div>
      <p className={cx("mt-3 max-w-[22ch] text-[13px] leading-relaxed", tone === "night" ? "text-white/55" : "text-muted")}>
        {label}
      </p>
    </div>
  );
}

/** Infinite, CSS-driven strip. The second copy is hidden from assistive tech. */
export function Marquee({ items, duration = 40, renderItem, className = "" }) {
  return (
    <div className={cx("marquee fade-x overflow-hidden", className)}>
      <div className="marquee-track flex w-max" style={{ "--marquee-duration": `${duration}s` }}>
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center gap-10 pr-10">
            {items.map((item) => (
              <li key={item} className="shrink-0">
                {renderItem ? renderItem(item) : item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/** Circular text badge that turns slowly, with the brand mark at its centre. */
export function RotatingBadge({ text, className = "" }) {
  return (
    <div className={cx("relative grid size-[112px] place-items-center rounded-full bg-[#0d0d0d]", className)}>
      <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <path id="badge-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text fill="#ffffff" fontSize="9.6" letterSpacing="2.4" style={{ fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>
          <textPath href="#badge-ring">{text}</textPath>
        </text>
      </svg>
      <BrandMark className="size-10" />
      <span className="sr-only">{text}</span>
    </div>
  );
}
