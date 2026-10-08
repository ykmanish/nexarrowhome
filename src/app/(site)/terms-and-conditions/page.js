import LegalDoc from "@/components/sections/LegalDoc";
import { termsAndConditions } from "@/content/legal";
import { paths } from "@/lib/routes";
import { pageMeta } from "@/lib/meta";
import { pageSeo } from "@/content/seo";

export const metadata = pageMeta({ ...pageSeo.terms, path: paths.terms });

export default function TermsPage() {
  return <LegalDoc title="Terms & Conditions" doc={termsAndConditions} />;
}
