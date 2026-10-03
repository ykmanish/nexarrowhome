import NotFoundView from "@/components/sections/NotFoundView";

export const metadata = { title: "Page not found" };

/** For notFound() thrown inside the site — the site layout already wraps it. */
export default function SiteNotFound() {
  return <NotFoundView />;
}
