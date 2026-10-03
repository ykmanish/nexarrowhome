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
  careers: "/careers",
  job: (slug) => `/careers/${slug}`,
  apply: (slug) => `/careers/${slug}/apply`,
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
};

/** True when `pathname` is `href` or a page nested under it. */
export function isWithin(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
