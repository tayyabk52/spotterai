import type { Metadata } from "next";
import { driversApp } from "@/content/driversapp";
import { StoryMotionProvider } from "@/components/motion/StoryMotionProvider";
import OpeningChapter from "@/components/sections/driversapp/OpeningChapter";
import ScheduleChapter from "@/components/sections/driversapp/ScheduleChapter";
import NoGoChapter from "@/components/sections/driversapp/NoGoChapter";
import ScoringChapter from "@/components/sections/driversapp/ScoringChapter";
import AutonomyChapter from "@/components/sections/driversapp/AutonomyChapter";
import SettlementChapter from "@/components/sections/driversapp/SettlementChapter";
import ContactChapter from "@/components/sections/driversapp/ContactChapter";
import ChapterNavigation from "@/components/sections/driversapp/ChapterNavigation";
import "@/styles/driversapp-tokens.css";
import styles from "@/components/story/Story.module.css";

export const metadata: Metadata = {
  title: driversApp.metadata.title,
  description: driversApp.metadata.description,
  alternates: { canonical: driversApp.metadata.url },
  openGraph: {
    title: driversApp.metadata.title,
    description: driversApp.metadata.description,
    url: driversApp.metadata.url,
    siteName: driversApp.metadata.siteName,
    type: "website",
  },
};

export default function DriversAppPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`driverStory ${styles.story}`}
    >
      <noscript>
        <style>{`[data-tms-pin]{min-height:0!important}[data-tms-pin]>div{position:relative!important}`}</style>
      </noscript>
      <StoryMotionProvider>
        <OpeningChapter />
        <ScheduleChapter />
        <NoGoChapter />
        <ScoringChapter />
        <AutonomyChapter />
        <SettlementChapter />
        <ContactChapter />
        <ChapterNavigation />
      </StoryMotionProvider>
    </main>
  );
}
