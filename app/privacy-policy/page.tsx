import type { Metadata } from "next";
import { privacyPolicy } from "@/content/legal/privacy-policy";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: privacyPolicy.description,
  alternates: { canonical: privacyPolicy.path },
};

export default function PrivacyPolicyPage() {
  return <LegalPage document={privacyPolicy} />;
}
