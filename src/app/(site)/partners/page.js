import { Check } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import BookCall from "@/components/site/BookCall";
import { Button, Chip, Section, SectionHead, cx } from "@/components/site/ui";
import { company, engagementTiers } from "@/content/company";
import { pageMeta } from "@/lib/meta";
import { paths } from "@/lib/routes";

export const metadata = pageMeta({
  title: "Partner network",
  description:
    "Freelance engineers and designers, and agencies that need a white-label development team: how to partner with Nexarrow.",
  path: paths.partners,
});

const profileMail = `mailto:${company.email}?subject=${encodeURIComponent("Partner network")}&body=${encodeURIComponent(
  "Hi Nexarrow,\n\nLinks (portfolio, GitHub, LinkedIn):\nWhat I do best:\nRate and availability:\n\n",
)}`;

const STEPS = [
  ["Send your profile", "Portfolio, GitHub or shipped work, what you do best, your rate and availability."],
  ["A short intro call", "Twenty minutes to talk through your work and how you like to collaborate."],
  ["A small paid task", "One well-scoped piece of real work, paid at your rate. Never free samples."],
  ["Matched to projects", "When a project needs your skills, you get a written brief and agreed milestones."],
];

const LOOK_FOR = [
  "Engineers and designers with work you can show",
  "React, Next.js, Node.js, Python, cloud or AI integration",
  "Clear written English and reliable async communication",
];

const whiteLabel = engagementTiers.find((t) => t.tag === "For agencies");

/**
 * Freelancers and agencies. There are no employee roles open, so this page
 * says so and offers the two partnerships that do exist: a network of
 * independent specialists, and white-label development for agencies.
 */
export default function PartnersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Partner network" }]}
        label="Partner network"
        lead="Build with us,"
        tail="as a partner."
        intro="We are building a small network of independent engineers and designers for specialist and overflow work, and we work as the development team behind agencies. There are no employee roles open right now."
        actions={
          <>
            <Button href={profileMail} external variant="eu">
              Send your profile
            </Button>
            <Button href="#agencies" variant="outline">
              For agencies
            </Button>
          </>
        }
      />

      <Section id="freelancers">
        <SectionHead
          label="For freelancers"
          lead="How joining"
          tail="works."
          intro="Remote and async-friendly. You keep your own clients; we bring you in when a project needs your skills."
        />
        <ol className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map(([title, copy], i) => (
            <li key={title} data-anim="rise" className={cx("flex flex-col p-7", i === 0 ? "bg-eu text-eu-ink" : "bg-paper")}>
              <span
                className={cx(
                  "grid size-9 place-items-center rounded-md text-[12px]",
                  i === 0 ? "bg-lime text-lime-ink" : "bg-eu text-eu-ink",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-10 font-display text-[22px] tracking-[-0.015em]">{title}</h3>
              <p className={cx("mt-2.5 text-[14px] leading-relaxed", i === 0 ? "text-eu-ink/75" : "text-muted")}>{copy}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <ul className="border-t border-line">
            {LOOK_FOR.map((l) => (
              <li key={l} className="flex items-center gap-3 border-b border-line py-3.5 text-[15px] text-ink-soft">
                <Check size={15} strokeWidth={2.2} className="shrink-0 text-eu" />
                {l}
              </li>
            ))}
          </ul>
          <Button href={profileMail} external variant="eu">
            Send your profile
          </Button>
        </div>
      </Section>

      <Section id="agencies" tone="night">
        <SectionHead
          tone="night"
          label="For agencies"
          lead="Your development team,"
          tail="under your brand."
          intro="When your development capacity is full, we build for your client under your name, with an NDA by default, invoiced from our EU company."
          action={<BookCall variant="lime">Talk partnership</BookCall>}
        />
        {whiteLabel && (
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-[0.8fr_1.2fr]">
            <div data-anim="rise" className="bg-eu p-7 text-eu-ink md:p-9">
              <Chip className="bg-lime text-lime-ink">{whiteLabel.tag}</Chip>
              <p className="mt-10 font-display text-[clamp(2.4rem,4vw,3.4rem)] leading-none tracking-[-0.03em]">
                {whiteLabel.price}
              </p>
              <p className="mt-2 text-[13.5px] text-eu-ink/70">{whiteLabel.unit}</p>
            </div>
            <ul data-anim="rise" className="bg-night p-7 md:p-9">
              {[...whiteLabel.points, "Weekly demos and code in the repository you choose"].map((p) => (
                <li key={p} className="flex items-center gap-3 border-b border-white/10 py-3.5 text-[15px] text-white/80 first:pt-0">
                  <Check size={15} strokeWidth={2.2} className="shrink-0 text-lime" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </>
  );
}
