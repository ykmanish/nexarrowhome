export const routePaths = {
  home: "/",
  about: "/about",
  services: "/services",
  "service.web": "/services/software-development",
  "service.ui": "/services/saas-platforms",
  "service.cloud": "/services/cloud-infrastructure",
  "service.app": "/services/ai-solutions",
  manifesto: "/why-us",
  journal: "/insights",
  studios: "/company",
  awards: "/awards",
  careers: "/careers",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
};

export function jobRoute(slug) {
  return `job.${slug}`;
}

export function applyRoute(slug) {
  return `apply.${slug}`;
}

export function articleRoute(slug) {
  return `article.${slug}`;
}

export function pathForRoute(route) {
  if (route.startsWith("job.")) return `/careers/${route.replace("job.", "")}`;
  if (route.startsWith("apply.")) return `/careers/${route.replace("apply.", "")}/apply`;
  if (route.startsWith("article.")) return `/insights/${route.replace("article.", "")}`;

  return routePaths[route] || "/";
}
