import type { Metadata } from "next";
import { claimsOs } from "@/content/claims-os";
import { StoryMotionProvider } from "@/components/motion/StoryMotionProvider";
import { ClaimsHeroChapter } from "@/components/sections/claims-os/ClaimsHeroChapter";
import { ClaimTrackingChapter } from "@/components/sections/claims-os/ClaimTrackingChapter";
import { FinancialControlChapter } from "@/components/sections/claims-os/FinancialControlChapter";
import { SlackAutomationChapter } from "@/components/sections/claims-os/SlackAutomationChapter";
import { FleetOperationsChapter } from "@/components/sections/claims-os/FleetOperationsChapter";
import { ClaimsContactChapter } from "@/components/sections/claims-os/ClaimsContactChapter";
import { ClaimsChapterNavigation } from "@/components/sections/claims-os/ClaimsChapterNavigation";
import "@/styles/claims-os-tokens.css";
import styles from "@/components/sections/claims-os/Claims.module.css";

export const metadata: Metadata = {
  title: claimsOs.metadata.title,
  description: claimsOs.metadata.description,
  alternates: { canonical: claimsOs.metadata.url },
  openGraph: {
    title: claimsOs.metadata.title,
    description: claimsOs.metadata.description,
    url: claimsOs.metadata.url,
    siteName: claimsOs.metadata.siteName,
    type: "website",
  },
};

export default function ClaimsOsPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`claimsOsStory ${styles.story}`}
    >
      <noscript>
        <style>{`[data-claims-pin]{min-height:0!important}[data-claims-pin]>div{position:relative!important}`}</style>
      </noscript>
      <StoryMotionProvider>
        <ClaimsHeroChapter />
        <ClaimTrackingChapter />
        <FinancialControlChapter />
        <SlackAutomationChapter />
        <FleetOperationsChapter />
        <ClaimsContactChapter />
        <ClaimsChapterNavigation />
      </StoryMotionProvider>
    </main>
  );
}
