import LegalDoc from "@/components/sections/LegalDoc";
import { termsAndConditions } from "@/content/legal";
import { paths } from "@/lib/routes";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Terms & Conditions",
  description:
    "The terms that govern use of the Nexarrow website.",
  path: paths.terms,
});

export default function TermsPage() {
  return <LegalDoc title="Terms & Conditions" doc={termsAndConditions} />;
}
