import type { Metadata } from "next";
import { StoryMotionProvider } from "@/components/motion/StoryMotionProvider";
import { ChapterRail } from "@/components/story/ChapterRail";
import { OpeningChapter } from "@/components/sections/about/OpeningChapter";
import { CompanyFigures } from "@/components/sections/about/CompanyFigures";
import { ExecutionChapter } from "@/components/sections/about/ExecutionChapter";
import { AutomationChapter } from "@/components/sections/about/AutomationChapter";
import { OperatorsChapter } from "@/components/sections/about/OperatorsChapter";
import { PhilosophyChapter } from "@/components/sections/about/PhilosophyChapter";
import { JourneyChapter } from "@/components/sections/about/JourneyChapter";
import { AwardsChapter } from "@/components/sections/about/AwardsChapter";
import { ContactChapter } from "@/components/sections/about/ContactChapter";
import { about, aboutChapters } from "@/content/about";
import "@/styles/about-tokens.css";
import styles from "@/components/sections/about/About.module.css";

export const metadata: Metadata = {
  title: { absolute: about.metadata.title },
  description: about.metadata.description,
  alternates: { canonical: about.metadata.url },
  openGraph: {
    title: about.metadata.title,
    description: about.metadata.description,
    url: about.metadata.url,
    siteName: about.metadata.siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: about.metadata.socialImage,
        width: 1200,
        height: 630,
        alt: about.metadata.socialImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: about.metadata.title,
    description: about.metadata.description,
    images: [about.metadata.socialImage],
  },
};

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${about.metadata.url}#webpage`,
    url: about.metadata.url,
    name: about.metadata.title,
    description: about.metadata.description,
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://spotter.ai/#website",
      url: "https://spotter.ai",
      name: "Spotter.ai",
    },
    about: {
      "@type": "Organization",
      "@id": "https://spotter.ai/#organization",
      name: "Spotter.ai",
      url: "https://spotter.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://spotter.ai/brand/spotter-logo.png",
        width: 640,
        height: 158,
      },
      description:
        "Spotter.ai provides full-stack AI execution infrastructure for modern trucking operations.",
      email: "sales@spotter.ai",
      sameAs: [
        "https://www.linkedin.com/company/spotter-sentinel/about/?viewAsMember=true",
        "https://www.facebook.com/people/Spotter-Sentinel/61577984011373/",
        "https://www.instagram.com/sentinel.safety/",
      ],
    },
    mainEntity: {
      "@type": "Organization",
      "@id": "https://spotter.ai/#organization",
    },
  };

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`aboutStory ${styles.story}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <noscript>
        <style>{`[data-about-pin],[data-tms-pin]{min-height:0!important}[data-about-stage],[data-tms-pin]>div{position:relative!important;height:auto!important}[data-about-hero-media]{position:relative!important;aspect-ratio:16/9!important}[data-about-stage]>div:first-child{width:100%!important}`}</style>
      </noscript>
      <StoryMotionProvider>
        <OpeningChapter />
        <CompanyFigures />
        <ExecutionChapter />
        <AutomationChapter />
        <OperatorsChapter />
        <PhilosophyChapter />
        <JourneyChapter />
        <AwardsChapter />
        <ContactChapter />
        <ChapterRail
          className={styles.rail}
          chapters={aboutChapters}
          label={about.ui.navigationLabel}
          pauseLabel={about.ui.pause}
          resumeLabel={about.ui.resume}
        />
      </StoryMotionProvider>
    </main>
  );
}
