import { FileSignature, GitBranch, Lock, MessageSquareReply, MonitorPlay, Wallet } from "lucide-react";
import { safeguards } from "@/content/company";
import { Section, SectionHead } from "@/components/site/ui";

const ICONS = [FileSignature, Lock, Wallet, GitBranch, MonitorPlay, MessageSquareReply];

/** "How we keep you safe": the protections every engagement runs on, as hairline cells on night. */
export default function Safeguards() {
  return (
    <Section id="safety" tone="night">
      <SectionHead
        tone="night"
        label="How we keep you safe"
        lead="Every risk"
        tail="written down."
        intro="The same protections on every engagement, so you know what you are covered by before you pay anything."
      />
      <ul className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-3">
        {safeguards.map((s, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li key={s.title} data-anim="rise" className="flex flex-col bg-night p-7 md:p-8">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-md bg-eu text-eu-ink dark:bg-[#8aa4ff] dark:text-[#0b0c0b]">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <span className="text-[12px] text-white/35">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-10 font-display text-[24px] leading-tight tracking-[-0.015em] text-white">{s.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-white/60">{s.copy}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
