import { caseStudies, getCaseStudy } from "@/content/work";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "A Nexarrow playbook: how we build it, chapter by chapter";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return ogImage({ eyebrow: `Playbook · ${cs.sector}`, title: cs.title });
}
