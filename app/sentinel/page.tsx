import type { Metadata } from "next";
import { sentinelContent } from "@/content/sentinel";
import { StoryMotionProvider } from "@/components/motion/StoryMotionProvider";
import { SentinelHero } from "@/components/sections/sentinel/SentinelHero";
import SentinelScreeningChapter from "@/components/sections/sentinel/SentinelScreeningChapter";
import SentinelMonitoringChapter from "@/components/sections/sentinel/SentinelMonitoringChapter";
import SentinelComplianceChapter from "@/components/sections/sentinel/SentinelComplianceChapter";
import { SentinelEconomicsChapter } from "@/components/sections/sentinel/SentinelEconomicsChapter";
import { SentinelTalentChapter } from "@/components/sections/sentinel/SentinelTalentChapter";
import SentinelClosingCta from "@/components/sections/sentinel/SentinelClosingCta";
import SentinelNavigation from "@/components/sections/sentinel/SentinelNavigation";
import "@/styles/sentinel-tokens.css";
import styles from "@/components/story/Story.module.css";

export const metadata: Metadata = {
  title: sentinelContent.metadata.title,
  description: sentinelContent.metadata.description,
  alternates: { canonical: sentinelContent.metadata.url },
  openGraph: {
    title: sentinelContent.metadata.title,
    description: sentinelContent.metadata.description,
    url: sentinelContent.metadata.url,
    siteName: sentinelContent.metadata.siteName,
    type: "website",
  },
};

export default function SentinelPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`sentinelStory ${styles.story}`}
    >
      <noscript>
        <style>{`[data-tms-pin]{min-height:0!important}[data-tms-pin]>div{position:relative!important}`}</style>
      </noscript>
      <StoryMotionProvider>
        <SentinelHero />
        <SentinelScreeningChapter />
        <SentinelMonitoringChapter />
        <SentinelComplianceChapter />
        <SentinelEconomicsChapter />
        <SentinelTalentChapter />
        <SentinelClosingCta />
        <SentinelNavigation />
      </StoryMotionProvider>
    </main>
  );
}
