import NotFoundView from "@/components/sections/NotFoundView";
import SiteShell from "@/components/site/SiteShell";

export const metadata = { title: "Page not found" };

/** Unmatched URLs render under the root layout only, so bring the site chrome along. */
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundView />
    </SiteShell>
  );
}
