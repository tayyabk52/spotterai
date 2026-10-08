import type { Metadata } from "next";
import { ccpaRights } from "@/content/legal/ccpa";
import { LegalPage } from "@/components/legal/LegalPage";
import { PrivacyRequestForm } from "@/components/legal/PrivacyRequestForm";

export const metadata: Metadata = {
  title: "CCPA Privacy Rights",
  description: ccpaRights.description,
  alternates: { canonical: ccpaRights.path },
};

export default function CcpaPage() {
  return (
    <LegalPage document={ccpaRights}>
      <PrivacyRequestForm />
    </LegalPage>
  );
}
