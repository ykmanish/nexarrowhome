"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { isWithin, paths } from "@/lib/routes";
import { getLenis } from "@/lib/motion";
import ThemeToggle from "./ThemeToggle";
import { Button, Label, Logo, cx } from "./ui";

const NAV = [
  { href: paths.services, label: "Services", panel: true },
  { href: paths.work, label: "Work" },
  { href: paths.approach, label: "Approach" },
  { href: paths.about, label: "About" },
  { href: paths.insights, label: "Insights" },
];

const MOBILE_NAV = [...NAV, { href: paths.contact, label: "Contact" }];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [panel, setPanel] = useState(false);
  const [sheet, setSheet] = useState(false);
  const headerRef = useRef(null);

  // Close both menus when the route changes — adjusted during render, not in
  // an effect, so a navigation never paints one frame with the menu still open.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setPanel(false);
    setSheet(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setPanel(false);
      setSheet(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Freeze the page behind the mobile sheet.
  useEffect(() => {
    if (!sheet) return undefined;
    const lenis = getLenis();
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
    };
  }, [sheet]);

  // Every page opens on the sky, so until the page scrolls the header is
  // transparent and sits in the same column frame (--frame-cols) as the hero.
  const solid = scrolled || panel;

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={() => setPanel(false)}
        onBlur={(e) => {
          if (!headerRef.current?.contains(e.relatedTarget)) setPanel(false);
        }}
        className={cx(
          "sticky top-0 z-50 transition-[background-color,box-shadow] duration-500",
          solid ? "bg-paper/85 shadow-[0_1px_0_var(--line)] backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="gutter">
          <div
            className="flex h-[76px] items-center justify-between gap-6 xl:relative xl:-mx-6 xl:grid xl:grid-cols-[var(--frame-cols)] xl:gap-0 xl:*:px-6"
          >
            <Link href={paths.home} aria-label={`${company.short} home`} className="shrink-0">
              <Logo />
            </Link>

            {/* Centred on the page itself, over the merged middle cell of the frame. */}
            <nav
              aria-label="Primary"
              className="hidden items-center gap-8 lg:flex xl:absolute xl:left-1/2 xl:top-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2"
            >
              {NAV.map((item) => {
                const active = isWithin(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setPanel(Boolean(item.panel))}
                    onFocus={() => setPanel(Boolean(item.panel))}
                    aria-expanded={item.panel ? panel : undefined}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "relative flex items-center gap-1 py-1 text-[13.5px] transition-colors",
                      active ? "text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                    {item.panel && (
                      <ChevronDown
                        size={13}
                        strokeWidth={1.8}
                        className={cx("transition-transform duration-300", panel && "rotate-180")}
                      />
                    )}
                    <span
                      className={cx(
                        "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center justify-end gap-2.5 xl:col-start-4">
              {/* Wrapped rather than overridden: a `hidden` class on the control
                  itself would fight its own display utility. */}
              <span className="hidden sm:block">
                <ThemeToggle />
              </span>
              {/* The header's call goes to the booking banner on the contact page. */}
              <span className="hidden sm:block">
                <Button href={`${paths.contact}#book`} variant="ink">
                  Book a call
                </Button>
              </span>
              <button
                type="button"
                onClick={() => setSheet(true)}
                aria-label="Open menu"
                aria-expanded={sheet}
                className="grid size-10 place-items-center rounded-md border border-line text-ink lg:hidden"
              >
                <Menu size={17} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>

        {/* Services panel */}
        <div
          className={cx(
            "gutter absolute inset-x-0 top-full hidden pb-3 transition-all duration-300 lg:block",
            panel ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
          )}
        >
          <div className="grid grid-cols-[0.9fr_2fr] gap-8 rounded-md border border-line bg-paper p-8 shadow-[0_30px_80px_-40px_rgba(13,13,13,.45)]">
            <div className="flex flex-col justify-between">
              <div>
                <Label>Services</Label>
                <p className="mt-5 font-display text-[30px] leading-[1.02] tracking-[-0.02em]">
                  Four disciplines,
                  <span className="block font-serif text-[1.08em] italic text-eu">one team.</span>
                </p>
                <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-muted">
                  Strategy, build, AI and cloud under one roof, so decisions in one layer never quietly break another.
                </p>
              </div>
              <Link href={paths.services} className="group mt-8 inline-flex items-center gap-2 text-[14px] text-ink">
                <span className="border-b border-ink/25 pb-0.5 group-hover:border-ink">All services</span>
                <ArrowUpRight size={15} strokeWidth={1.8} className="transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={paths.service(s.slug)}
                    className="group flex h-full flex-col justify-between gap-6 rounded-md bg-mist p-5 transition-colors duration-300 hover:bg-eu"
                  >
                    <span className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-[0.14em] text-muted group-hover:text-eu-ink/65">
                        {s.code}
                      </span>
                      <span className="grid size-8 place-items-center rounded-md bg-paper text-ink transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRight size={14} strokeWidth={1.8} />
                      </span>
                    </span>
                    <span>
                      <span className="block font-display text-[21px] leading-tight tracking-[-0.02em] text-ink group-hover:text-eu-ink">
                        {s.name}
                      </span>
                      <span className="mt-1 block text-[13px] text-muted group-hover:text-eu-ink/70">{s.short}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!sheet}
        className={cx(
          "fixed inset-0 z-[70] flex flex-col bg-paper transition-[opacity,visibility] duration-300 lg:hidden",
          sheet ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="gutter flex h-[76px] shrink-0 items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={() => setSheet(false)}
            aria-label="Close menu"
            className="grid size-10 place-items-center rounded-md border border-line text-ink"
          >
            <X size={17} strokeWidth={1.8} />
          </button>
        </div>

        <div data-lenis-prevent className="gutter flex flex-1 flex-col overflow-y-auto pb-8">
          <nav aria-label="Mobile" className="mt-4 border-t border-line">
            {MOBILE_NAV.map((item, i) => (
              <div key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  className={cx(
                    "flex items-center gap-5 py-4 transition-all duration-500",
                    sheet ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  )}
                  style={{ transitionDelay: sheet ? `${60 + i * 40}ms` : "0ms" }}
                >
                  <span className="w-6 text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={cx(
                      "flex-1 font-display text-[30px] leading-none tracking-[-0.02em]",
                      isWithin(pathname, item.href) ? "text-ink" : "text-ink-soft",
                    )}
                  >
                    {item.label}
                  </span>
                  <ArrowUpRight size={18} strokeWidth={1.6} className="text-muted" />
                </Link>
                {item.panel && (
                  <ul className="-mt-1 grid grid-cols-2 gap-2 pb-4 pl-11">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={paths.service(s.slug)}
                          className="block rounded-md bg-mist px-3 py-2.5 text-[13px] text-ink-soft"
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-auto space-y-4 pt-10">
            <Button href={`${paths.contact}#book`} variant="eu" className="w-full justify-between">
              Book a call
            </Button>
            <div className="flex items-center justify-between gap-4">
              <a href={`mailto:${company.email}`} className="text-[14px] text-ink-soft">
                {company.email}
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
