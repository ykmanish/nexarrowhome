import JsonLd from "@/components/site/JsonLd";
import SiteShell from "@/components/site/SiteShell";
import { siteGraph } from "@/lib/schema";

/** The company and the website as structured data, on every page of the site. */
export default function SiteLayout({ children }) {
  return (
    <SiteShell>
      <JsonLd data={siteGraph()} />
      {children}
    </SiteShell>
  );
}
