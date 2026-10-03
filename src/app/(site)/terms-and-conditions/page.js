import LegalDoc from "@/components/sections/LegalDoc";
import { termsAndConditions } from "@/content/legal";
import { paths } from "@/lib/routes";

export const metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern use of the Nexarrow website.",
  alternates: { canonical: paths.terms },
};

export default function TermsPage() {
  return <LegalDoc title="Terms & Conditions" doc={termsAndConditions} />;
}
