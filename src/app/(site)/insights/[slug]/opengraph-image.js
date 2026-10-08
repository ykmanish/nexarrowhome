import { getInsight, insights } from "@/content/insights";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "A Nexarrow insight on software, SaaS, AI or cloud";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const a = getInsight(slug);
  return ogImage({ eyebrow: `Insights · ${a.date}`, title: a.title });
}
