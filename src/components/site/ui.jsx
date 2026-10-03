import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
    <svg viewBox="0 0 400 403" className={className} aria-hidden="true">
      <polygon
        fill={fill}
        points="395,201.5 383.2,268.2 349.4,326.8 297.5,370.4 233.9,393.5 166.1,393.5 102.5,370.4 50.6,326.8 16.8,268.2 5,201.5 16.8,134.8 50.6,76.2 102.5,32.6 166.1,9.5 233.9,9.5 297.5,32.6 349.4,76.2 383.2,134.8"
      />
      <path
        fill={ink}
        d="M264.4 268.1L275.3 257.2L271.1 252.4C252 230.7 252.5 193.7 272.4 154.1L275.9 147.3L265.1 136.6L254.3 125.9L245.4 130.3C207.4 149.4 169.9 149.3 148.7 130.1L144.9 126.6L133.7 137.8L122.6 148.9L125 151.6C139.2 166.8 174.6 179 197.4 176.6L203.5 175.9L163.5 215.9L123.5 256L134.8 267.2L146 278.5L186 238.5L226.1 198.5L225.4 205C223.8 222.3 229.4 245.7 239.4 262.2C243.3 268.8 251.5 279 252.8 279C253.2 279 258.4 274.1 264.4 268.1Z"
      />
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

/** Standard page band. Horizontal padding matches the header, so every edge lines up. */
export function Section({ id, tone = "paper", className = "", children, ...rest }) {
  return (
    <section
      id={id}
      className={cx(SECTION_TONES[tone], "gutter scroll-mt-24 py-20 lg:py-28", className)}
      {...rest}
    >
      {children}
    </section>
  );
}

/* ─────────────────────────── type ─────────────────────────── */

/** Section label, set like a bracketed reference: ( ABOUT ). */
export function Label({ children, tone = "default", className = "" }) {
  const color = tone === "night" ? "text-white/45" : tone === "lime" ? "text-lime-ink/60" : "text-muted";
  return (
    <p className={cx("text-[12px] uppercase tracking-[0.2em]", color, className)}>
      ( {children} )
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
  default: ["text-ink", "text-muted"],
  soft: ["text-ink", "text-ink-soft"],
  night: ["text-white", "text-white/45"],
  lime: ["text-lime-ink", "text-lime-ink/50"],
};

/**
 * Two-tone display heading: the first line in ink, the second dropped back to
 * grey. Each line is masked and slides up into place.
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
    [tail, tailColor],
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

/** Large statement paragraph: an ink sentence that trails off into grey. */
export function Statement({ lead, tail, tone = "default", className = "" }) {
  const [leadColor, tailColor] = HEADING_TONES[tone] || HEADING_TONES.default;
  return (
    <p
      data-anim="rise"
      className={cx(
        "font-display text-balance text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.14] tracking-[-0.02em]",
        className,
      )}
    >
      <span className={leadColor}>{lead}</span> {tail && <span className={tailColor}>{tail}</span>}
    </p>
  );
}

/* ─────────────────────────── actions ─────────────────────────── */

const BUTTON_TONES = {
  ink: ["bg-ink text-paper hover:bg-ink-soft", "bg-lime text-lime-ink"],
  lime: [
    "bg-lime text-lime-ink shadow-[0_10px_28px_-12px_var(--lime-deep)] hover:bg-lime-deep",
    "bg-lime-ink text-lime",
  ],
  outline: ["border border-line-strong text-ink hover:border-ink", "bg-ink text-paper"],
  white: ["bg-white text-[#0d0d0d] hover:bg-white/90", "bg-[#0d0d0d] text-lime"],
  ghost: ["border border-white/20 text-white hover:border-white/50", "bg-lime text-lime-ink"],
};

/**
 * Pill button. With `arrow`, a round badge sits at the trailing edge and turns
 * on hover — the one repeated gesture behind every call to action.
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
  const [shell, badge] = BUTTON_TONES[variant] || BUTTON_TONES.ink;
  const classes = cx(
    "group inline-flex items-center gap-3 rounded-full text-[14px] transition-colors duration-300",
    arrow ? "py-1.5 pl-6 pr-1.5" : "px-7 py-3.5",
    shell,
    className,
  );
  const content = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      {arrow && (
        <span
          className={cx(
            "grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45",
            badge,
          )}
        >
          <ArrowUpRight size={16} strokeWidth={1.8} />
        </span>
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
  night: "border border-white/15 text-white/70",
  ink: "bg-ink text-paper",
};

export function Chip({ children, tone = "outline", className = "" }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[12px] leading-5",
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
