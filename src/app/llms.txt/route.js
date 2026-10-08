import { company, faqs } from "@/content/company";
import { insights } from "@/content/insights";
import { marketsLine, pageSeo } from "@/content/seo";
import { services } from "@/content/services";
import { caseStudies } from "@/content/work";
import { paths } from "@/lib/routes";

/**
 * /llms.txt: a plain summary of the company and links to every page, for AI
 * assistants and AI search (the llmstxt.org convention). Built from the same
 * content as the site, so it never drifts from what the pages say.
 */
export const dynamic = "force-static";

const url = (path) => `${company.url}${path}`;

export function GET() {
  const text = [
    `# ${company.short}`,
    "",
    `> ${pageSeo.home.description}`,
    "",
    `${company.name} is a software development company registered in the EU (${company.address}; registry code ${company.registry}, VAT ${company.vat}). It works remotely with clients in ${marketsLine}, on fixed-price projects with weekly demos and milestone payments, and the client owns the code. Contact: ${company.email}.`,
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.seo.serviceType}](${url(paths.service(s.slug))}): ${s.seo.description}`),
    "",
    "## Playbooks",
    "",
    ...caseStudies.map((c) => `- [${c.seo.title}](${url(paths.caseStudy(c.slug))}): ${c.seo.description}`),
    "",
    "## Company",
    "",
    `- [About](${url(paths.about)}): ${pageSeo.about.description}`,
    `- [How we work](${url(paths.approach)}): ${pageSeo.approach.description}`,
    `- [Contact](${url(paths.contact)}): ${pageSeo.contact.description}`,
    `- [Partner network](${url(paths.partners)}): ${pageSeo.partners.description}`,
    "",
    "## Insights",
    "",
    ...insights.map((a) => `- [${a.title.replace(/\.$/, "")}](${url(paths.article(a.slug))}): ${a.excerpt}`),
    "",
    "## FAQ",
    "",
    ...faqs.flatMap(([q, a]) => [`### ${q}`, "", a, ""]),
  ].join("\n");

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
