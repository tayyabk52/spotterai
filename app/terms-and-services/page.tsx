import type { Metadata } from "next";
import { termsOfService } from "@/content/legal/terms-and-services";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: termsOfService.description,
  alternates: { canonical: termsOfService.path },
};

export default function TermsOfServicePage() {
  return <LegalPage document={termsOfService} />;
}
