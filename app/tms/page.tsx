import type { Metadata } from "next";
import { tms } from "@/content/tms";
import { StoryMotionProvider } from "@/components/motion/StoryMotionProvider";
import OpeningChapter from "@/components/sections/tms/OpeningChapter";
import EvidenceChapter from "@/components/sections/tms/EvidenceChapter";
import OverviewChapter from "@/components/sections/tms/OverviewChapter";
import VisibilityChapter from "@/components/sections/tms/VisibilityChapter";
import LoadChapter from "@/components/sections/tms/LoadChapter";
import MaintenanceChapter from "@/components/sections/tms/MaintenanceChapter";
import FinancialChapter from "@/components/sections/tms/FinancialChapter";
import ContactChapter from "@/components/sections/tms/ContactChapter";
import { ChapterNavigation } from "@/components/sections/tms/ChapterNavigation";
import "@/styles/tms-tokens.css";
import styles from "@/components/story/Story.module.css";

export const metadata: Metadata = {
  title: tms.metadata.title,
  description: tms.metadata.description,
  alternates: { canonical: tms.metadata.url },
  openGraph: {
    title: tms.metadata.title,
    description: tms.metadata.description,
    url: tms.metadata.url,
    siteName: tms.metadata.siteName,
    type: "website",
  },
};

export default function TmsPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`tmsStory ${styles.story}`}
    >
      <noscript>
        <style>{`[data-tms-pin]{min-height:0!important}[data-tms-pin]>div{position:relative!important}`}</style>
      </noscript>
      <StoryMotionProvider>
        <OpeningChapter />
        <EvidenceChapter />
        <OverviewChapter />
        <VisibilityChapter />
        <LoadChapter />
        <MaintenanceChapter />
        <FinancialChapter />
        <ContactChapter />
        <ChapterNavigation />
      </StoryMotionProvider>
    </main>
  );
}
