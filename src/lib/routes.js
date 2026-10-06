/**
 * Every internal URL is built here, so a route can move without hunting for
 * string literals across the pages.
 */

export const paths = {
  home: "/",
  services: "/services",
  service: (slug) => `/services/${slug}`,
  approach: "/why-us",
  about: "/about",
  insights: "/insights",
  article: (slug) => `/insights/${slug}`,
  work: "/work",
  caseStudy: (slug) => `/work#${slug}`,
  partners: "/partners",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
};

/** True when `pathname` is `href` or a page nested under it. */
export function isWithin(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
