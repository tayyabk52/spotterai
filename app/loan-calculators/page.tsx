import type { Metadata } from "next";
import { loanCalculatorsContent } from "@/content/loan-calculators";
import { StoryMotionProvider } from "@/components/motion/StoryMotionProvider";
import { LoanCalculatorsHero } from "@/components/sections/loan-calculators/LoanCalculatorsHero";
import { CalculatorSuiteChapter } from "@/components/sections/loan-calculators/CalculatorSuiteChapter";
import { EquipmentBenchmarksChapter } from "@/components/sections/loan-calculators/EquipmentBenchmarksChapter";
import { FleetEconomicsChapter } from "@/components/sections/loan-calculators/FleetEconomicsChapter";
import { LoanCalculatorsContact } from "@/components/sections/loan-calculators/LoanCalculatorsContact";
import { LoanCalculatorsNav } from "@/components/sections/loan-calculators/LoanCalculatorsNav";
import "@/styles/loan-calculators-tokens.css";
import styles from "@/components/sections/loan-calculators/Calculators.module.css";

export const metadata: Metadata = {
  title: loanCalculatorsContent.metadata.title,
  description: loanCalculatorsContent.metadata.description,
  alternates: { canonical: loanCalculatorsContent.metadata.url },
  openGraph: {
    title: loanCalculatorsContent.metadata.title,
    description: loanCalculatorsContent.metadata.description,
    url: loanCalculatorsContent.metadata.url,
    siteName: loanCalculatorsContent.metadata.siteName,
    type: "website",
  },
};

export default function LoanCalculatorsPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`loanCalculatorsStory ${styles.story}`}
    >
      <noscript>
        <style>{`[data-calc-pin]{min-height:0!important;height:auto!important}[data-calc-pin]>div{position:relative!important;height:auto!important}`}</style>
      </noscript>
      <StoryMotionProvider>
        <LoanCalculatorsHero />
        <CalculatorSuiteChapter />
        <EquipmentBenchmarksChapter />
        <FleetEconomicsChapter />
        <LoanCalculatorsContact />
        <LoanCalculatorsNav />
      </StoryMotionProvider>
    </main>
  );
}
