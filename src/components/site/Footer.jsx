import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { paths } from "@/lib/routes";
import { FrameLines, NIGHT_ROW_LINE } from "./frame";
import { Button, Heading, Label, Logo, cx } from "./ui";

const COLUMNS = [
  {
    title: "Services",
    links: services.map((s) => ({ href: paths.service(s.slug), label: s.name })),
  },
  {
    title: "Company",
    links: [
      { href: paths.about, label: "About" },
      { href: paths.approach, label: "Approach" },
      { href: paths.careers, label: "Careers" },
      { href: paths.contact, label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: paths.insights, label: "Insights" },
      { href: paths.services, label: "All services" },
      { href: paths.privacy, label: "Privacy Policy" },
      { href: paths.terms, label: "Terms & Conditions" },
    ],
  },
];

/** Grid row on the frame; cells padded 24px from 1280px up. */
const ROW = "grid xl:grid-cols-[var(--frame-cols)] xl:*:px-6";

/**
 * The night band that closes every page, on the same column frame as the
 * hero: the call to action across the top row, the company and link columns
 * under it, then the wordmark and the legal line.
 */
export default function Footer() {
  return (
    <footer className="gutter relative overflow-hidden bg-night text-white">
      <div className="relative xl:-mx-6">
        <FrameLines className="bg-white/10" />

        <div className={cx(ROW, "gap-8 pb-16 pt-20 xl:gap-0 xl:py-0")}>
          <div className="xl:py-20">
            <Label tone="night">Contact</Label>
          </div>
          <div className="xl:col-span-2 xl:py-20">
            <Heading lead="Got a project in mind?" tail="Let’s build it properly." tone="night" size="page" className="xl:-mt-1.5" />
          </div>
          <div className="flex flex-wrap items-center gap-5 xl:flex-col xl:items-start xl:justify-end xl:py-20">
            <Button href={paths.contact} variant="lime">
              Start a project
            </Button>
            <a href={`mailto:${company.email}`} className="text-[14px] text-white/70 transition-colors hover:text-white">
              {company.email}
            </a>
          </div>
        </div>

        <div className={cx(ROW, NIGHT_ROW_LINE, "gap-12 py-14 xl:gap-0 xl:py-0")}>
          <div className="xl:py-14">
            <Logo onDark />
            <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-white/55">
              Software, SaaS platforms, AI solutions and cloud infrastructure, built in Tallinn for businesses
              worldwide.
            </p>
            <div className="mt-6 flex items-center gap-3 text-[12.5px] text-white/45">
              <Image src="/eu.jpg" alt="European Union flag" width={36} height={24} className="h-6 w-auto rounded-[2px]" />
              <span>Registered in the {company.region}</span>
            </div>
          </div>

          {/* Link groups sit side by side on phones rather than stacking into a scroll. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:contents">
            {COLUMNS.map((col) => (
              <div key={col.title} className="xl:px-6 xl:py-14">
                <h2 className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.18em] text-white/45">
                  <span aria-hidden="true" className="size-1.5 bg-[#8aa4ff]" />
                  {col.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[14.5px] text-white/75 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Sized in container units: the set word is 5.1× its font size, so
            19.4cqw spans the footer edge to edge at any width. */}
        <div className={cx("@container pt-10", NIGHT_ROW_LINE)}>
          <p
            aria-hidden="true"
            className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[19.4cqw] uppercase leading-[0.8] tracking-[-0.04em] text-white/[0.06]"
          >
            Nexarrow
          </p>
        </div>

        <div
          className={cx(
            "flex flex-col-reverse gap-4 py-6 text-[12.5px] text-white/45 md:flex-row md:items-center md:justify-between xl:px-6",
            NIGHT_ROW_LINE,
          )}
        >
          <p>
            © {new Date().getFullYear()} {company.name} · Registry {company.registry} · VAT {company.vat}
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
            Back to top <ArrowUp size={13} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </footer>
  );
}
