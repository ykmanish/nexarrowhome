import { getService, services } from "@/content/services";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "A Nexarrow service: software, SaaS, cloud or AI";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  return ogImage({ eyebrow: `Services · ${s.name}`, title: s.titleLines.join(" ") });
}
