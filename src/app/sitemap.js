import { jobs } from "@/content/careers";
import { company } from "@/content/company";
import { insights } from "@/content/insights";
import { services } from "@/content/services";
import { paths } from "@/lib/routes";

export default function sitemap() {
  const pages = [
    [paths.home, 1],
    [paths.services, 0.9],
    [paths.approach, 0.7],
    [paths.about, 0.7],
    [paths.insights, 0.7],
    [paths.careers, 0.6],
    [paths.contact, 0.8],
    [paths.privacy, 0.2],
    [paths.terms, 0.2],
    ...services.map((s) => [paths.service(s.slug), 0.8]),
    ...insights.map((a) => [paths.article(a.slug), 0.5]),
    ...jobs.map((j) => [paths.job(j.slug), 0.5]),
  ];

  return pages.map(([path, priority]) => ({ url: `${company.url}${path}`, priority }));
}
