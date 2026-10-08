import type { LegalDocument } from "./types";

// Exact source wording; capture provenance is in docs/source/legal-pricing.
export const ccpaRights = {
  path: "/ccpa",
  title: "CCPA Privacy Rights",
  navigationLabel: "CCPA",
  description:
    "California residents can request access to, or deletion of, the personal information Spotter.ai holds, or opt out of its sale.",
  introduction: [],
  sections: [
    {
      id: "ccpa-section-1",
      title: "1. Your CCPA Rights",
      blocks: [
        {
          kind: "paragraph",
          text: "If you are a California resident, you have the following rights under the CCPA:",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Right to Know - You have the right to request details about the personal information we collect, use, disclose, and sell.",
            "Right to Delete - You may request that we delete personal information we have collected from you, subject to certain exceptions.",
            "Right to Opt-Out - You have the right to opt-out of the sale of your personal information.",
            "Right to Non-Discrimination - We will not discriminate against you for exercising your rights under the CCPA.",
          ],
        },
      ],
    },
    {
      id: "ccpa-section-2",
      title: "2. Information We Collect",
      blocks: [
        {
          kind: "paragraph",
          text: "We collect personal information necessary to provide MVR (Motor Vehicle Records) and PSP (Pre-Employment Screening Program) reports. This may include:",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Driver's License Number (CDL)",
            "Name and Contact Information",
            "Payment Details (processed securely)",
            "Device and Usage Data",
          ],
        },
        {
          kind: "paragraph",
          text: "For a full list of categories of personal information we collect, please refer to our Privacy Policy.",
        },
      ],
    },
  ],
} satisfies LegalDocument;
