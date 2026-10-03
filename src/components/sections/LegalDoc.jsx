import PageHero from "./PageHero";
import { Section } from "@/components/site/ui";

/** Shared layout for the policy pages: sticky contents beside numbered sections. */
export default function LegalDoc({ title, doc }) {
  return (
    <>
      <PageHero crumbs={[{ label: title }]} label="Legal" lead={title} size="section" intro={doc.intro} />

      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
          <nav aria-label="Contents" className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-mist p-6">
              <p className="text-[11.5px] uppercase tracking-[0.18em] text-muted">Contents</p>
              <ol className="mt-4 space-y-2.5">
                {doc.sections.map((s, i) => (
                  <li key={s.h}>
                    <a href={`#sec-${i + 1}`} className="flex gap-3 text-[13.5px] leading-snug text-ink-soft transition-colors hover:text-ink">
                      <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {s.h}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="max-w-[70ch]">
            {doc.sections.map((s, i) => (
              <section key={s.h} id={`sec-${i + 1}`} className="scroll-mt-28 border-t border-line py-9 first:border-t-0 first:pt-0">
                <h2 className="flex gap-4 font-display text-[clamp(1.4rem,2.2vw,1.8rem)] leading-tight tracking-[-0.015em]">
                  <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {s.h}
                </h2>
                <div className="prose-body mt-4 text-[15.5px] leading-relaxed text-ink-soft">
                  {s.p.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>
        </div>
      </Section>
    </>
  );
}
