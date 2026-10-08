import LegalDoc from "@/components/sections/LegalDoc";
import { privacyPolicy } from "@/content/legal";
import { paths } from "@/lib/routes";
import { pageMeta } from "@/lib/meta";
import { pageSeo } from "@/content/seo";

export const metadata = pageMeta({ ...pageSeo.privacy, path: paths.privacy });

export default function PrivacyPage() {
  return <LegalDoc title="Privacy Policy" doc={privacyPolicy} />;
}
