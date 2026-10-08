import { pageSeo } from "@/content/seo";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

const page = pageSeo.work;

export const alt = `${page.ogTitle} | Nexarrow`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ eyebrow: page.og, title: page.ogTitle });
}
