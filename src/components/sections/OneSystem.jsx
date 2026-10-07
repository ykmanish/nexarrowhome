import { Section, SectionHead } from "@/components/site/ui";
import OneSystemDiagram from "./OneSystemDiagram";

/**
 * The change we make, drawn: work scattered across files, inboxes and chats
 * is captured, routed and automated, and comes out as one system.
 */
export default function OneSystem() {
  return (
    <Section id="one-system" tone="mist">
      <SectionHead
        label="What changes"
        lead="From scattered work"
        tail="to one system."
        intro="Most teams we meet run on spreadsheets, inboxes and chat threads. We replace the copy-paste with software built around how your team already works."
      />
      <div className="mt-14 xl:mt-16">
        <OneSystemDiagram />
      </div>
    </Section>
  );
}
