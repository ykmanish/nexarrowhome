import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { paths } from "@/lib/routes";
import { Button, Heading, Label, Logo } from "./ui";

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

export default function Footer() {
  return (
    <footer className="gutter relative overflow-hidden bg-night pb-8 pt-20 text-white lg:pt-28">
      <Label tone="night">Contact</Label>
      <Heading lead="Got a project in mind?" tail="Let’s build it properly." tone="night" size="page" className="mt-6" />

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <Button href={`mailto:${company.email}`} external variant="lime">
          {company.email}
        </Button>
        <div className="flex items-center gap-2.5">
          <Link
            href={paths.contact}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-white/50"
            aria-label="Contact page"
          >
            <ArrowUpRight size={17} strokeWidth={1.7} />
          </Link>
          <a
            href={`mailto:${company.email}`}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-white/50"
            aria-label={`Email ${company.email}`}
          >
            <Mail size={16} strokeWidth={1.7} />
          </a>
        </div>
      </div>

      <div className="mt-20 grid gap-12 border-t border-white/10 pt-14 md:grid-cols-[1.3fr_repeat(3,1fr)] lg:mt-24">
        <div>
          <Logo onDark />
          <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-white/55">
            Software, SaaS platforms, AI solutions and cloud infrastructure, built in Tallinn for businesses
            worldwide.
          </p>
          <div className="mt-6 flex items-center gap-3 text-[12.5px] text-white/45">
            <Image src="/eu.jpg" alt="European Union flag" width={36} height={24} className="h-6 w-auto rounded-[3px]" />
            <span>Registered in the {company.region}</span>
          </div>
        </div>

        {/* Link groups sit side by side on phones rather than stacking into a scroll. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:contents">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-[12px] uppercase tracking-[0.18em] text-white/40">{col.title}</h2>
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
      <div className="@container mt-16">
        <p
          aria-hidden="true"
          className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[19.4cqw] uppercase leading-[0.8] tracking-[-0.04em] text-white/[0.06]"
        >
          Nexarrow
        </p>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-4 border-t border-white/10 pt-6 text-[12.5px] text-white/45 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {company.name} · Registry {company.registry} · VAT {company.vat}
        </p>
        <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
          Back to top <ArrowUp size={13} strokeWidth={1.8} />
        </a>
      </div>
    </footer>
  );
}
