import Image from "next/image";
import { audiences } from "@/content/company";
import BookCall from "@/components/site/BookCall";
import { Section, SectionHead, TextLink } from "@/components/site/ui";

/**
 * Who we work with: three kinds of teams, each card opening on a photograph,
 * then the situation in the buyer's own words and what we do about it, so a
 * visitor can find themselves in one of them.
 */
export default function Audiences() {
  return (
    <Section id="who">
      <SectionHead
        label="Who we work with"
        lead="Built for three"
        tail="kinds of teams."
        intro="Most of our work starts in one of these situations. If yours sounds familiar, we should talk."
        action={<BookCall variant="outline">Book a call</BookCall>}
      />

      <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-3">
        {audiences.map((a, i) => (
          <article key={a.label} data-anim="rise" className="group flex flex-col bg-paper">
            <div className="relative aspect-[4/3] overflow-hidden bg-mist">
              <Image
                src={a.photo.src}
                alt={a.photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute left-0 top-0 bg-eu px-3 py-1.5 text-[11px] tracking-[0.14em] text-eu-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h3 className="font-display text-[28px] leading-tight tracking-[-0.02em]">{a.label}</h3>
              <p className="mt-4 font-serif text-[21px] italic leading-[1.25] text-eu">&ldquo;{a.situation}&rdquo;</p>
              <p className="mt-5 text-[14.5px] leading-relaxed text-muted">{a.help}</p>
              <div className="mt-auto pt-8">
                <TextLink href={a.link.href}>{a.link.label}</TextLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
