```text
DESIGN.md
PRODUCT.md
app/about/page.tsx
app/claims-os/page.tsx
app/driversapp/page.tsx
app/sentinel/page.tsx
app/sitemap.ts
app/tms/page.tsx
components/3d/QuoteBackground3D.tsx
components/CapabilityIllustration.tsx
components/HeroPhotography.tsx
components/Reveal.tsx
components/motion-features.ts
components/motion/ScrollComposition.tsx
components/motion/StoryMotionProvider.tsx
components/motion/useChapterProgress.ts
components/motion/useVideoScrub.ts
components/quote/QuoteForm.tsx
components/sections/ClosingMotif.tsx
components/sections/ImpactMetric.tsx
components/sections/about/About.module.css
components/sections/about/AutomationChapter.tsx
components/sections/about/AwardsChapter.tsx
components/sections/about/CompanyFigures.tsx
components/sections/about/ContactChapter.tsx
components/sections/about/ExecutionChapter.tsx
components/sections/about/JourneyChapter.tsx
components/sections/about/OpeningChapter.tsx
components/sections/about/OperatorsChapter.tsx
components/sections/about/PhilosophyChapter.tsx
components/sections/claims-os/ClaimsChapterScene.tsx
components/sections/claims-os/ClaimsFilm.tsx
components/sections/claims-os/ClaimsHeroChapter.tsx
components/sections/driversapp/AutonomyChapter.tsx
components/sections/driversapp/ChapterNavigation.tsx
components/sections/driversapp/ContactChapter.tsx
components/sections/driversapp/NoGoChapter.tsx
components/sections/driversapp/OpeningChapter.tsx
components/sections/driversapp/ScheduleChapter.tsx
components/sections/driversapp/ScoringChapter.tsx
components/sections/driversapp/SettlementChapter.tsx
components/sections/loan-calculators/LoanCalculatorsFilm.tsx
components/sections/loan-calculators/LoanCalculatorsHero.tsx
components/sections/sentinel/SentinelClosingCta.tsx
components/sections/sentinel/SentinelComplianceChapter.tsx
components/sections/sentinel/SentinelHero.tsx
components/sections/sentinel/SentinelMonitoringChapter.tsx
components/sections/sentinel/SentinelNavigation.tsx
components/sections/sentinel/SentinelScreeningChapter.tsx
components/sections/tms/ChapterNavigation.tsx
components/sections/tms/ContactChapter.tsx
components/sections/tms/EvidenceChapter.tsx
components/sections/tms/FinancialChapter.tsx
components/sections/tms/LoadChapter.tsx
components/sections/tms/MaintenanceChapter.tsx
components/sections/tms/OpeningChapter.tsx
components/sections/tms/OverviewChapter.tsx
components/sections/tms/VisibilityChapter.tsx
components/story/ChapterRail.tsx
components/story/ChapterScene.tsx
components/story/FeatureList.tsx
components/story/NarrativeBeats.tsx
components/story/Story.module.css
components/story/StoryFilm.tsx
content/about.ts
content/home.ts
content/story.ts
content/tms.ts
docs/about-implementation.md
docs/about-storyboard.md
docs/content-audit.md
docs/source/about-media-metadata.json
public/brand/aboutus-videos/web/about-execution-layer.mp4
public/brand/aboutus-videos/web/about-execution-layer.webp
public/brand/aboutus-videos/web/about-freight-horizon.mp4
public/brand/aboutus-videos/web/about-freight-horizon.webp
public/brand/aboutus-videos/web/about-social.webp
styles/about-tokens.css
tests/about.spec.ts
tests/loan-calculators.spec.ts
```

## app/about/page.tsx

```tsx
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
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`aboutStory ${styles.story}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: about.metadata.title,
            description: about.metadata.description,
            url: about.metadata.url,
            about: {
              "@type": "Organization",
              name: about.metadata.siteName,
              url: "https://spotter.ai",
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <noscript>
        <style>{`[data-about-pin],[data-tms-pin]{min-height:0!important}[data-about-stage],[data-tms-pin]>div{position:relative!important;height:auto!important}[data-about-hero-media]{position:relative!important;aspect-ratio:16/9!important}[data-about-stage]>div:first-child{width:100%!important}`}</style>
      </noscript>
      <StoryMotionProvider mediaQuery="(min-width: 1024px) and (prefers-reduced-motion: no-preference)">
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
```

## content/about.ts

```ts
import type { StoryAsset, StoryChapter } from "./story";

// Marketing text is exact reuse from the source snapshot; UI labels are identified separately.
export const about = {
  source: {
    url: "https://spotter.ai/about",
    observed: "2026-10-08",
    copyStatus: "exact reuse",
  },
  metadata: {
    title: "About Spotter.ai: The AI Platform Built for Trucking",
    description:
      "Spotter.ai builds AI software for trucking: a TMS, driver screening, freight market data and a driver app that help carriers run leaner and grow.",
    url: "https://spotter.ai/about",
    siteName: "Spotter.ai",
    socialImage: "/brand/aboutus-videos/web/about-social.webp",
    socialImageAlt:
      "Teal and porcelain infrastructure aligning in a dark architectural space",
    socialImageSource: "/brand/aboutus-videos/web/about-execution-layer.webp",
    socialImageLicense:
      "Derived from the owner-supplied abstract opening film; approved project use.",
    copyStatus: {
      title: "exact reuse",
      description: "exact reuse",
      socialImageAlt: "editorial descriptive alternative",
    },
  },
  opening: {
    id: "about-opening",
    number: "00",
    label: "About Spotter",
    title: "Building the Freight Execution Infrastructure Layer for Trucking",
    copyStatus: {
      label: "exact reuse",
      title: "exact reuse",
      description: "exact reuse",
    },
    description:
      "Most freight software makes recommendations. Spotter.ai executes the work. We provide the full-stack AI operating system that automates the complex, real-world workflows of modern fleets.",
    actions: [
      {
        label: "Explore Our Platform",
        href: "/",
        copyStatus: {
          label: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        label: "Talk to Sales",
        href: "https://spotter.ai/request-quote",
        copyStatus: {
          label: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
    ],
    source: "https://spotter.ai/about",
  },
  metrics: [
    {
      value: "500+",
      label: "Global Operations Network",
      copyStatus: {
        value: "exact reuse",
        label: "exact reuse",
      },
      source: "https://spotter.ai/about",
    },
    {
      value: "24/7",
      label: "Live Dispatch & Support",
      copyStatus: {
        value: "exact reuse",
        label: "exact reuse",
      },
      source: "https://spotter.ai/about",
    },
    {
      value: "70%",
      label: "YoY Net Revenue Growth",
      copyStatus: {
        value: "exact reuse",
        label: "exact reuse",
      },
      source: "https://spotter.ai/about",
    },
    {
      value: "$4.9MM",
      label: "Capital Raised Efficiently",
      copyStatus: {
        value: "exact reuse",
        label: "exact reuse",
      },
      source: "https://spotter.ai/about",
    },
  ],
  execution: {
    id: "about-reality",
    number: "01",
    label: "THE EXECUTION PROBLEM",
    title: "Built for the Reality of Trucking",
    copyStatus: {
      label: "exact reuse",
      title: "exact reuse",
      paragraphs: ["exact reuse", "exact reuse"],
    },
    paragraphs: [
      "Trucking is not simply a load-matching problem. It is an execution problem. Every shipment depends on a fragile chain of dispatch, routing, safety, compliance, insurance, maintenance, billing, collections, and real-time exception handling. When any one of those functions breaks down, revenue, service quality, and asset utilization suffer.",
      "Freight does not move in a clean software demo. Loads are delayed, trucks face unscheduled roadside repairs, drivers run out of legal hours, and weather patterns disrupt optimal routes. Spotter.ai was built from the inside out to handle these exact real-world operating exceptions automatically.",
    ],
    source: "https://spotter.ai/about",
  },
  automation: {
    id: "about-automation",
    number: "02",
    label: "WHAT SPOTTER.AI AUTOMATES",
    title: "A Single Unified Operating System",
    copyStatus: {
      label: "exact reuse",
      title: "exact reuse",
    },
    features: [
      {
        title: "AI Dispatch & Execution",
        description:
          "Automated load-booking and intelligent broker negotiations that route drivers to hot markets.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        title: "Dynamic Routing AI",
        description:
          "Real-time adjustments that instantly replan routes around traffic, weather, detention, and missed appointments.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        title: "Safety & Compliance Automation",
        description:
          "Hands-free management of permits, IFTA, Form 2290 filings, registrations, medical cards, and license monitoring.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        title: "Driver Recruiting & Screening",
        description:
          "End-to-end automation of driver pipeline follow-ups, consent forms, MVR/PSP reviews, and background checks.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        title: "Maintenance Intelligence",
        description:
          "Predictive insights, rapid vendor selection, repair location decisioning, and automated breakdown handling.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        title: "FuelSeek Optimization",
        description:
          "Real-time purchasing optimization driven by live diesel prices, current tank levels, and exact route needs.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        title: "Insurance & Claims Infrastructure",
        description:
          "Lower premiums and reduced claims leakage achieved through proprietary loss data and integrated accident video analysis.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        title: "Billing & Collections AI",
        description:
          "Instant matching of rate confirmations to bills of lading alongside automated collections back-office workflows.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        title: "Workforce & Asset Automation",
        description:
          "Custom, deeply integrated TMS, CRM, payroll, and 24/7 truck/driver utilization monitoring.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
    ],
    source: "https://spotter.ai/about",
  },
  operators: {
    id: "about-operators",
    number: "03",
    label: "WHY SPOTTER.AI IS DIFFERENT",
    title: "Built by Operators. Powered by AI.",
    copyStatus: {
      label: "exact reuse",
      title: "exact reuse",
      introduction: "exact reuse",
      advantageLabel: "exact reuse",
      advantage: "exact reuse",
      conclusion: "exact reuse",
    },
    introduction:
      "Many technology companies try to automate trucking from the outside. Spotter.ai was built directly inside the live operating environment.",
    advantageLabel: "THE SPOTTER ADVANTAGE",
    advantage:
      "Our founders combine quantitative finance, enterprise logistics software, and direct trucking operating experience. This unique DNA gives Spotter.ai a practical advantage: we are not just building tools that suggest what should happen; we are building systems that help operators make it happen.",
    conclusion:
      "We have proven our technology stack by running it inside live operations under the harshest market conditions, expanding our ecosystem around the actual, margin-critical problems carriers face every day.",
    source: "https://spotter.ai/about",
  },
  philosophy: {
    id: "about-philosophy",
    number: "04",
    label: "OUR OPERATING PHILOSOPHY",
    title: "The Future of Freight Execution",
    copyStatus: {
      label: "exact reuse",
      title: "exact reuse",
      paragraphs: ["exact reuse", "exact reuse"],
    },
    paragraphs: [
      "The future of logistics will be automated, verified, and data-driven. As trucking rapidly transitions away from manual workflows and relationship-based capacity, carriers need robust systems that control the entire workflow, aggregate data, enforce compliance, and automate margin-critical decisions.",
      "Spotter.ai is building that essential infrastructure layer. Our mission is to help trucking companies operate with the exact same intelligence, discipline, and automation that define the most advanced financial markets in the world.",
    ],
    source: "https://spotter.ai/about",
  },
  journey: {
    id: "about-journey",
    number: "05",
    label: "OUR STORY",
    title: "The Spotter Journey",
    copyStatus: {
      label: "exact reuse",
      title: "exact reuse",
    },
    entries: [
      {
        date: "2011",
        title: "Quant Foundations",
        description:
          "Gabe & Peidi build deep quant finance and high-frequency trading expertise, establishing the mathematical foundations for advanced workflow optimization models.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        date: "2017",
        title: "Practical Exposure",
        description:
          "First-hand entry into the logistics space reveals massive, real-world coordination inefficiencies across traditional motor carrier operations.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        date: "2019–2020",
        title: "The Vision Takes Shape",
        description:
          "The core idea for Spotter.ai solidifies: applying advanced quantitative models to the fragmented freight execution layer.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        date: "2020",
        title: "Dispatch Software Launch",
        description:
          "Spotter.ai launches its initial AI dispatch software, onboarding its first cohort of external carrier customers.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        date: "2020–2021",
        title: "The Shift to Execution",
        description:
          "Real-world deployment reveals that carriers face highly fragmented data challenges. Standalone software recommendations are insufficient; operators require automated execution.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        date: "2021–2022",
        title: "Full-Stack Integration",
        description:
          "Spotter pivots to a deeply integrated operating model, stress-testing its proprietary AI infrastructure directly within live, complex freight-hauling workflows.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        date: "2022–2024",
        title: "Ecosystem Expansion",
        description:
          "The platform expands from standalone dispatch into an all-in-one corporate operating stack, adding custom TMS, compliance automation, insurance infrastructure, and finance workflows.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        date: "Today",
        title: "AI Execution at Scale",
        description:
          "Spotter.ai serves as a hard-to-replace operational infrastructure partner for fleets across North America, driving industry-leading truck utilization and massive cost reductions.",
        copyStatus: {
          title: "exact reuse",
          description: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
    ],
    source: "https://spotter.ai/about",
  },
  awards: {
    id: "about-awards",
    number: "06",
    label: "AWARDS & RECOGNITION",
    title: "Recognized for Excellence",
    copyStatus: {
      label: "exact reuse",
      title: "exact reuse",
    },
    images: [
      {
        alt: "Top Work Places 2025 - CareerBuilder + Monster",
        width: 121,
        height: 200,
        src: "/brand/awards/workplace-2025.webp",
        sourceUrl:
          "https://spotter.ai/static/media/award-1.59b3d7f9f9f9b46a2472.webp",
        source: "source page",
        status: "client asset",
        license:
          "Existing source-site award asset supplied in the project; owner-approved reuse. Marks belong to their respective issuers.",
      },
      {
        alt: "USA Today Top Work Places 2026",
        width: 122,
        height: 200,
        src: "/brand/awards/workplace-2026.webp",
        sourceUrl:
          "https://spotter.ai/static/media/award-2.31354e96e4d82464e96a.webp",
        source: "source page",
        status: "client asset",
        license:
          "Existing source-site award asset supplied in the project; owner-approved reuse. Marks belong to their respective issuers.",
      },
      {
        alt: "Professional Development - Top Work Places 2025",
        width: 168,
        height: 200,
        src: "/brand/awards/development.webp",
        sourceUrl:
          "https://spotter.ai/static/media/Award3.44296501838f1396fed9.webp",
        source: "source page",
        status: "client asset",
        license:
          "Existing source-site award asset supplied in the project; owner-approved reuse. Marks belong to their respective issuers.",
      },
      {
        alt: "Employee Well-Being - Top Work Places 2025",
        width: 135,
        height: 200,
        src: "/brand/awards/wellbeing.webp",
        sourceUrl:
          "https://spotter.ai/static/media/Award4.aa2f5b89aeb3f351e513.webp",
        source: "source page",
        status: "client asset",
        license:
          "Existing source-site award asset supplied in the project; owner-approved reuse. Marks belong to their respective issuers.",
      },
      {
        alt: "Appreciation - Top Work Places 2025 by Nectar",
        width: 123,
        height: 200,
        src: "/brand/awards/appreciation.webp",
        sourceUrl:
          "https://spotter.ai/static/media/Award5.02cd2825876cdd4b5313.webp",
        source: "source page",
        status: "client asset",
        license:
          "Existing source-site award asset supplied in the project; owner-approved reuse. Marks belong to their respective issuers.",
      },
    ],
    source: "https://spotter.ai/about",
  },
  contact: {
    id: "about-contact",
    number: "07",
    label: "JOIN HUNDREDS OF FLEETS",
    title: "Ready to transform your fleet operations?",
    copyStatus: {
      label: "exact reuse",
      title: "exact reuse",
      description: "exact reuse",
      note: "exact reuse",
    },
    description:
      "Experience the power of an AI-driven freight execution stack built by operators, for operators.",
    actions: [
      {
        label: "Request a Demo",
        href: "https://spotter.ai/request-quote",
        copyStatus: {
          label: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
      {
        label: "Contact Sales",
        href: "mailto:sales@spotter.ai",
        copyStatus: {
          label: "exact reuse",
        },
        source: "https://spotter.ai/about",
      },
    ],
    note: "Serving fleets across North America",
    source: "https://spotter.ai/about",
  },
  ui: {
    navigationLabel: "About Spotter chapters",
    pause: "Pause scroll animations",
    resume: "Resume scroll animations",
    figuresSource: "Source: spotter.ai/about · October 8, 2026",
    copyStatus: "editorial accessibility and source-attribution labels",
  },
  assets: {
    execution: {
      id: "about-execution-layer",
      src: "/brand/aboutus-videos/web/about-execution-layer.mp4",
      poster: "/brand/aboutus-videos/web/about-execution-layer.webp",
      sourceFile:
        "public/brand/aboutus-videos/Infrastructure_parts_aligning_in…_1080p_20261008191611.mp4",
      sourceUrl: "/brand/aboutus-videos/web/about-execution-layer.mp4",
      source: "client supplied",
      status: "client asset",
      license:
        "Owner-supplied generated film; approved for this project. Original preserved; muted all-intra web derivative and first-frame poster created locally.",
      alt: "Matte teal rails and porcelain planes settling into a connected infrastructure",
      width: 1280,
      height: 720,
      duration: 6,
      bytes: 2429481,
    },
    horizon: {
      id: "about-freight-horizon",
      src: "/brand/aboutus-videos/web/about-freight-horizon.mp4",
      poster: "/brand/aboutus-videos/web/about-freight-horizon.webp",
      sourceFile:
        "public/brand/aboutus-videos/Geometric_pathways_aligning_into…_1080p_20261008191503.mp4",
      sourceUrl: "/brand/aboutus-videos/web/about-freight-horizon.mp4",
      source: "client supplied",
      status: "client asset",
      license:
        "Owner-supplied generated film; approved for this project. Original preserved; muted all-intra web derivative and first-frame poster created locally.",
      alt: "Layered porcelain planes and teal paths aligning toward a softly lit horizon",
      width: 1280,
      height: 720,
      duration: 5.958333333333333,
      bytes: 3286438,
    },
  },
} as const;

export const aboutFilms: { execution: StoryAsset; horizon: StoryAsset } =
  about.assets;
export const aboutChapters: readonly StoryChapter[] = [
  about.opening,
  about.execution,
  about.automation,
  about.operators,
  about.philosophy,
  about.journey,
  about.awards,
  about.contact,
];
```

## styles/about-tokens.css

```css
/* About scale; the canonical palette is inherited from root tokens.css. */
.aboutStory {
  --about-title: clamp(2.625rem, 5vw, 4.5rem);
  --about-heading: clamp(2.5rem, 4.5vw, 4.5rem);
  --about-pin-heading: clamp(2.5rem, 4vw, 3.5rem);
  --about-body: clamp(1.0625rem, 1.3vw, 1.1875rem);
  --about-lead: clamp(1.125rem, 1.6vw, 1.5rem);
  --about-subheading: clamp(1.25rem, 1.7vw, 1.625rem);
  --about-number: clamp(3rem, 6vw, 5.5rem);
  --about-caption: 0.8125rem;
  --about-gutter: clamp(1.5rem, 6vw, 6rem);
  --about-space: clamp(5rem, 9vw, 9rem);
  --about-gap: clamp(2rem, 5vw, 5rem);
  --about-width: 1280px;
  --about-hero-distance: 230svh;
  --about-scene-distance: 240svh;
  --about-hero-copy-width: 780px;
  --about-copy-width: 600px;
  --about-radius: 24px;
  --about-ink-overlay: color-mix(in srgb, var(--color-ink) 96%, transparent);
  /* Shared scene and rail keep their existing contract on all product routes. */
  --tms-ink: var(--color-ink);
  --tms-light: var(--color-canvas);
  --tms-pale: var(--color-pale);
  --tms-body: var(--about-body);
  --tms-lead: var(--about-lead);
  --tms-heading: var(--about-heading);
  --tms-pin-heading: var(--about-pin-heading);
  --tms-caption: var(--about-caption);
  --tms-subheading: var(--about-subheading);
  --tms-gutter: var(--about-gutter);
  --tms-space: var(--about-space);
  --tms-gap: var(--about-gap);
  --tms-width: var(--about-width);
  --tms-pin-distance: var(--about-scene-distance);
  --tms-scene-radius: var(--about-radius);
  --tms-caption-width: var(--about-copy-width);
  --tms-ink-overlay: var(--about-ink-overlay);
}
```

## components/sections/about/About.module.css

```css
.story {
  background: var(--color-ink);
  color: var(--color-surface);
  font-size: var(--about-body);
}
.story section {
  scroll-margin-top: calc(var(--header-height) + var(--space-5));
}
.story h2 {
  font-size: var(--about-heading);
  line-height: 1.1;
  letter-spacing: -0.045em;
  font-weight: 600;
  text-wrap: balance;
}
.chapter,
.contact {
  padding: var(--about-space) var(--about-gutter);
}
.container {
  max-width: var(--about-width);
  margin-inline: auto;
}
.label {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  font-size: var(--about-caption);
  line-height: 1.5;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
}
.label::before {
  content: "";
  width: var(--space-2);
  height: var(--space-2);
  flex: 0 0 auto;
  border-radius: var(--radius-circle);
  background: var(--color-accent);
}
.label span {
  color: var(--color-pale);
}
.light .label span {
  color: var(--color-primary-strong);
}
.hero {
  position: relative;
  isolation: isolate;
}
.heroStage {
  position: relative;
  display: flex;
  flex-direction: column;
}
.heroCopy {
  position: relative;
  z-index: 2;
  padding: var(--space-7) var(--about-gutter);
}
.heroCopy h1 {
  max-width: 19ch;
  margin-block: var(--space-5);
  font-size: var(--about-title);
  line-height: 1.07;
  letter-spacing: -0.055em;
  font-weight: 600;
  text-wrap: balance;
}
.intro {
  font-size: var(--about-lead);
  line-height: 1.5;
  max-width: 45ch;
  color: var(--color-pale);
}
.heroMedia {
  position: relative;
  aspect-ratio: 16 / 9;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-6);
}
.primary,
.secondary {
  min-height: var(--space-8);
  white-space: normal;
}
.hero .primary {
  background: var(--color-pale);
  color: var(--color-ink);
}
.hero .primary:hover {
  background: var(--color-surface);
}
.hero .secondary {
  color: var(--color-surface);
  border-color: var(--color-control);
}
.hero .secondary:hover {
  background: var(--color-primary-strong);
}
.hero a:focus-visible {
  outline-color: var(--color-pale);
}
.metrics {
  padding: var(--space-7) var(--about-gutter) var(--about-space);
}
.metrics dl {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-6);
  max-width: var(--about-width);
  margin-inline: auto;
}
.metrics dl > div {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--space-4);
  border-top: var(--rule-width) solid var(--color-control);
  padding-top: var(--space-5);
}
.metrics dd {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--about-number);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.055em;
}
.metrics dt {
  color: var(--color-pale);
  font-size: var(--about-body);
  max-width: 23ch;
}
.light {
  background: var(--color-canvas);
  color: var(--color-ink);
}
.execution {
  background: var(--color-tint);
}
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--about-gap);
  align-items: start;
}
.sectionHead h2 {
  margin-top: var(--space-5);
  max-width: 18ch;
}
.prose p,
.advantage p {
  font-size: var(--about-body);
  line-height: 1.6;
  max-width: 57ch;
  color: var(--color-body);
}
.prose p + p {
  margin-top: var(--space-5);
}
.execution .prose {
  padding-top: var(--space-8);
}
.automation h2 {
  max-width: 17ch;
}
.operators .intro {
  margin-top: var(--space-6);
}
.operators .prose p {
  color: var(--color-pale);
}
.advantage {
  margin: var(--space-8) 0 var(--space-6);
  border-left: var(--focus-width) solid var(--color-accent);
  padding-left: var(--space-6);
}
.advantage .label {
  margin-bottom: var(--space-5);
  color: var(--color-pale);
}
.advantage .label::before {
  display: none;
}
.advantage p {
  color: var(--color-surface);
  font-size: var(--about-lead);
}
.philosophy p + p {
  margin-top: var(--space-5);
}
.journey {
  background: var(--color-canvas);
}
.timeline {
  list-style: none;
  padding: 0;
  margin: var(--space-8) 0 0;
  max-width: var(--about-width);
}
.timeline > li {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: var(--about-gap);
  padding: var(--space-6) 0 var(--space-7);
  border-top: var(--rule-width) solid var(--color-rule);
}
.date {
  font-family: var(--font-display);
  font-size: var(--about-subheading);
  line-height: 1.3;
  color: var(--color-primary-strong);
  font-weight: 600;
}
.timeline h3 {
  font-size: var(--about-subheading);
  line-height: 1.3;
  margin-bottom: var(--space-3);
}
.timeline p {
  max-width: 58ch;
  line-height: 1.6;
  color: var(--color-body);
}
.awards {
  background: var(--color-surface);
  border-top: var(--rule-width) solid var(--color-rule);
}
.awardList {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--space-6);
  list-style: none;
  margin: var(--space-8) 0 0;
  padding: 0;
}
.awardList > li {
  display: flex;
  justify-content: center;
}
.awardImage {
  position: relative;
  width: var(--award-width);
  max-width: 100%;
  aspect-ratio: var(--award-ratio);
}
.awardImage img {
  object-fit: contain;
}
.contact {
  background: var(--color-pale);
  color: var(--color-ink);
}
.contact h2 {
  max-width: 19ch;
  margin-block: var(--space-6);
}
.contact .intro {
  color: var(--color-body);
  max-width: 41ch;
}
.contactBottom {
  margin-top: var(--space-8);
  border-top: var(--rule-width) solid var(--color-control);
  padding-top: var(--space-6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-5);
}
.contactBottom .actions {
  margin: 0;
}
.contact .primary {
  background: var(--color-primary-strong);
  color: var(--color-surface);
}
.contact .secondary:hover {
  background: var(--color-canvas);
}
.contactBottom > p {
  color: var(--color-body);
  font-size: var(--about-caption);
}
@media (min-width: 1024px) and (min-height: 850px) and (prefers-reduced-motion: no-preference) {
  .hero {
    min-height: var(--about-hero-distance);
  }
  .heroStage {
    position: sticky;
    top: var(--header-height);
    height: calc(100svh - var(--header-height));
    justify-content: center;
  }
  .heroMedia {
    position: absolute;
    inset: 0;
    aspect-ratio: auto;
    z-index: 0;
  }
  .heroStage::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      var(--color-ink),
      var(--about-ink-overlay) 36%,
      transparent 78%
    );
    z-index: 1;
    pointer-events: none;
  }
  .heroCopy {
    width: min(62%, var(--about-hero-copy-width));
    padding-right: 0;
  }
  .heroCopy .intro {
    font-size: var(--about-body);
    max-width: 44ch;
  }
}
@media (max-width: 1023px) {
  .rail[data-opening] {
    display: none;
  }
  .split {
    grid-template-columns: 1fr;
  }
  .execution .prose {
    padding: 0;
  }
  .metrics dl {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-7) var(--space-5);
  }
  .awardList {
    gap: var(--space-4);
  }
  .contactBottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
@media (max-width: 767px) {
  .heroCopy {
    padding-block: var(--space-7) var(--space-6);
  }
  .heroCopy h1 {
    max-width: 15ch;
  }
  .metrics {
    padding-top: var(--space-6);
  }
  .metrics dl {
    gap: var(--space-6) var(--space-4);
  }
  .timeline > li {
    grid-template-columns: 1fr;
    row-gap: var(--space-4);
  }
  .awardList {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-7) var(--space-5);
  }
  .awardList > li:last-child {
    grid-column: 1 / -1;
  }
  .advantage {
    padding-left: var(--space-5);
  }
  .contact {
    padding-bottom: calc(var(--about-space) + var(--space-8));
  }
}
@media (max-width: 399px) {
  .actions {
    flex-direction: column;
  }
  .actions a {
    width: 100%;
  }
  .contactBottom .actions {
    width: 100%;
  }
}

.figuresSource {
  max-width: var(--about-width);
  margin: var(--space-5) auto 0;
  color: var(--color-pale);
  font-size: var(--about-caption);
}
.figuresSource a {
  display: inline-flex;
  align-items: center;
  min-height: var(--space-7);
  text-decoration: underline;
  text-underline-offset: var(--space-1);
}
.figuresSource a:focus-visible {
  outline-color: var(--color-pale);
}
```

## app/claims-os/page.tsx

```tsx
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
```

## app/driversapp/page.tsx

```tsx
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
```

## app/sentinel/page.tsx

```tsx
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
```

## app/sitemap.ts

```ts
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://spotter.ai/watch-demo",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://spotter.ai/about",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://spotter.ai/lens",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://spotter.ai/extension",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://spotter.ai/tms",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://spotter.ai/claims-os",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://spotter.ai/loan-calculators",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://spotter.ai/",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

## app/tms/page.tsx

```tsx
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
```

## components/3d/QuoteBackground3D.tsx

```tsx
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D Ambient Logistics Constellation Background.
 *
 * Generates an interactive, GPU-accelerated spatial network of nodes and telemetry links
 * that react smoothly to user pointer movement.
 * Complies with the 3D-web-experience skill:
 * - WebGL capability detection with CSS gradient fallback
 * - prefers-reduced-motion detection (single static frame, no tick loop)
 * - DPR clamp (max 1 on mobile, max 2 on desktop)
 * - Complete resource disposal on unmount (geometry, material, renderer)
 * - Non-interactive pointer-events: none to prevent obstructing form inputs
 */
export function QuoteBackground3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Detect WebGL support
    const testCanvas = document.createElement("canvas");
    const gl =
      testCanvas.getContext("webgl") ||
      (testCanvas.getContext(
        "experimental-webgl",
      ) as WebGLRenderingContext | null);
    if (!gl) {
      container.style.background =
        "radial-gradient(circle at 50% 30%, #0d2838 0%, #06141f 100%)";
      return;
    }

    // 2. Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // 3. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06141f, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      1,
      1000,
    );
    camera.position.z = 240;

    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, isMobile ? 1 : 1.75),
    );
    container.appendChild(renderer.domElement);

    // 4. Create Node Points & Dynamic Interconnecting Lines
    const particleCount = isMobile ? 45 : 85;
    const maxDistance = 65;
    const bounds = { x: 260, y: 160, z: 120 };

    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * bounds.x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z;

      velocities.push({
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.15,
        z: (Math.random() - 0.5) * 0.1,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    // Glowing round point texture
    const pointCanvas = document.createElement("canvas");
    pointCanvas.width = 32;
    pointCanvas.height = 32;
    const ctx = pointCanvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(0, 229, 176, 1)");
      gradient.addColorStop(0.3, "rgba(0, 180, 150, 0.8)");
      gradient.addColorStop(0.8, "rgba(0, 128, 128, 0.2)");
      gradient.addColorStop(1, "rgba(0, 128, 128, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const pointTexture = new THREE.CanvasTexture(pointCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00e5b0,
      size: isMobile ? 4.5 : 6,
      map: pointTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lines connecting nodes
    const maxLineSegments = particleCount * particleCount;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineColors = new Float32Array(maxLineSegments * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3).setUsage(
        THREE.DynamicDrawUsage,
      ),
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage),
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // 5. Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0x06141f, 1.2);
    scene.add(ambientLight);

    const spotlight = new THREE.PointLight(0x00e5b0, 2.5, 400);
    spotlight.position.set(0, 50, 100);
    scene.add(spotlight);

    // 6. Pointer Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }

      // Parallax smooth interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      camera.position.x = currentMouseX * 24;
      camera.position.y = currentMouseY * 16;
      camera.lookAt(scene.position);

      if (!prefersReducedMotion) {
        // Subtle drift of nodes
        const posAttr = particleGeometry.getAttribute(
          "position",
        ) as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          posArray[idx] += velocities[i].x;
          posArray[idx + 1] += velocities[i].y;
          posArray[idx + 2] += velocities[i].z;

          // Bounce off boundaries
          if (Math.abs(posArray[idx]) > bounds.x / 2) velocities[i].x *= -1;
          if (Math.abs(posArray[idx + 1]) > bounds.y / 2) velocities[i].y *= -1;
          if (Math.abs(posArray[idx + 2]) > bounds.z / 2) velocities[i].z *= -1;
        }
        posAttr.needsUpdate = true;

        // Recalculate dynamic line connections
        let vertexCount = 0;
        let colorCount = 0;

        for (let i = 0; i < particleCount; i++) {
          const ix = posArray[i * 3];
          const iy = posArray[i * 3 + 1];
          const iz = posArray[i * 3 + 2];

          for (let j = i + 1; j < particleCount; j++) {
            const jx = posArray[j * 3];
            const jy = posArray[j * 3 + 1];
            const jz = posArray[j * 3 + 2];

            const dx = ix - jx;
            const dy = iy - jy;
            const dz = iz - jz;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDistance) {
              const alpha = (1 - dist / maxDistance) * 0.65;

              linePositions[vertexCount++] = ix;
              linePositions[vertexCount++] = iy;
              linePositions[vertexCount++] = iz;

              linePositions[vertexCount++] = jx;
              linePositions[vertexCount++] = jy;
              linePositions[vertexCount++] = jz;

              // Emerald teal line gradient
              lineColors[colorCount++] = 0.0;
              lineColors[colorCount++] = 0.85 * alpha;
              lineColors[colorCount++] = 0.65 * alpha;

              lineColors[colorCount++] = 0.0;
              lineColors[colorCount++] = 0.5 * alpha;
              lineColors[colorCount++] = 0.5 * alpha;
            }
          }
        }

        lineGeometry.setDrawRange(0, vertexCount / 3);
        const linePosAttr = lineGeometry.getAttribute(
          "position",
        ) as THREE.BufferAttribute;
        const lineColAttr = lineGeometry.getAttribute(
          "color",
        ) as THREE.BufferAttribute;
        linePosAttr.needsUpdate = true;
        lineColAttr.needsUpdate = true;

        // Subtle overall orbit
        particles.rotation.y += 0.0006;
        lines.rotation.y += 0.0006;
      }

      renderer.render(scene, camera);
    };

    // Initial render
    animate();

    // 9. Comprehensive Resource Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      particleGeometry.dispose();
      particleMaterial.dispose();
      pointTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 50% 20%, #0c202e 0%, #06141f 60%, #030a10 100%)",
      }}
    />
  );
}
```

## components/CapabilityIllustration.tsx

```tsx
"use client";

import Image from "next/image";
import { LazyMotion, m, useReducedMotion } from "framer-motion";
import type { Product } from "@/content/home";
import styles from "./CapabilityOverview.module.css";

export type CapabilityVariant = Product["id"];
const loadFeatures = () =>
  import("./motion-features").then((module) => module.motionFeatures);

export default function CapabilityIllustration({
  variant,
}: {
  variant: CapabilityVariant;
}) {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div
        className={styles.artwork}
        aria-hidden="true"
        initial={false}
        whileInView={reduced ? undefined : { y: [12, 0] }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={`/images/capabilities/${variant}.webp`}
          alt=""
          width={1200}
          height={480}
          sizes="(max-width: 767px) calc(100vw - 88px), (max-width: 1199px) 44vw, 560px"
          className={styles.illustration}
        />
      </m.div>
    </LazyMotion>
  );
}
```

## components/HeroPhotography.tsx

```tsx
"use client";
import Image from "next/image";
import {
  LazyMotion,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { heroPhotos } from "./sections/hero-images";
import styles from "./sections/Hero.module.css";
const loadFeatures = () =>
  import("./motion-features").then((module) => module.motionFeatures);
export default function HeroPhotography() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const leftX = useTransform(scrollY, [0, 800], [0, -64]);
  const rightX = useTransform(scrollY, [0, 800], [0, 64]);
  const photoY = useTransform(scrollY, [0, 800], [0, -48]);
  return (
    <LazyMotion features={loadFeatures} strict>
      <div className={styles.photography}>
        {heroPhotos.map((image) => (
          <m.figure
            key={image.src}
            className={`${styles.photo} ${styles[image.position]}`}
            style={
              reduced
                ? undefined
                : { x: image.direction === "left" ? leftX : rightX, y: photoY }
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 767px) 45vw, (max-width: 1199px) 150px, 240px"
              className={styles.photoImage}
            />
            <figcaption>{image.caption}</figcaption>
          </m.figure>
        ))}
      </div>
    </LazyMotion>
  );
}
```

## components/motion-features.ts

```ts
export { domAnimation as motionFeatures } from "motion/react";
```

## components/motion/ScrollComposition.tsx

```tsx
"use client";
import { LazyMotion, m, useReducedMotion, useTransform } from "framer-motion";
import { useChapterProgress } from "./useChapterProgress";
const loadFeatures = () =>
  import("../motion-features").then((m) => m.motionFeatures);
export default function ScrollComposition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, progress } = useChapterProgress<HTMLDivElement>();
  const reduced = useReducedMotion();
  const y = useTransform(progress, [0, 1], [16, -16]);
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div ref={ref} className={className} style={{ y: reduced ? 0 : y }}>
        {children}
      </m.div>
    </LazyMotion>
  );
}
```

## components/motion/StoryMotionProvider.tsx

```tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";
import { LazyMotion } from "motion/react";
const query = "(prefers-reduced-motion: no-preference)";
const cinematicQuery = `${query} and (min-width: 1024px) and (min-height: 850px)`;
const subscribeQuery = (query: string, callback: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const subscribeCinematic = (callback: () => void) =>
  subscribeQuery(cinematicQuery, callback);
const serverSnapshot = () => false;
const loadFeatures = () =>
  import("../motion-features").then((module) => module.motionFeatures);
const StoryMotionContext = createContext({
  enabled: false,
  eligible: false,
  heroEligible: false,
  cinematic: false,
  paused: false,
  toggle: () => {},
});
export function useStoryMotion() {
  return useContext(StoryMotionContext);
}
export function StoryMotionProvider({
  children,
  mediaQuery = query,
}: {
  children: React.ReactNode;
  mediaQuery?: string;
}) {
  const subscribe = useCallback(
    (callback: () => void) => subscribeQuery(mediaQuery, callback),
    [mediaQuery],
  );
  const eligible = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(mediaQuery).matches,
    serverSnapshot,
  );
  const cinematic = useSyncExternalStore(
    subscribeCinematic,
    () => window.matchMedia(cinematicQuery).matches,
    serverSnapshot,
  );
  const [paused, setPaused] = useState(false);
  return (
    <StoryMotionContext.Provider
      value={{
        eligible,
        heroEligible: eligible,
        cinematic,
        enabled: eligible && !paused,
        paused,
        toggle: () => setPaused((value) => !value),
      }}
    >
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </StoryMotionContext.Provider>
  );
}
```

## components/motion/useChapterProgress.ts

```ts
"use client";
import { useRef, useSyncExternalStore } from "react";
import { useScroll } from "motion/react";
const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};
const headerHeight = () =>
  document.querySelector("header")?.getBoundingClientRect().height ?? 88;
export function useChapterProgress<T extends HTMLElement = HTMLElement>(
  pinned = false,
) {
  const ref = useRef<T>(null);
  const header = useSyncExternalStore(subscribe, headerHeight, () => 88);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: pinned
      ? [`start ${header}px`, "end end"]
      : ["start end", `end ${header}px`],
  });
  return { ref, progress: scrollYProgress };
}
```

## components/motion/useVideoScrub.ts

```ts
"use client";
import { useEffect, type RefObject } from "react";
import type { MotionValue } from "motion/react";

export function useVideoScrub(
  ref: RefObject<HTMLVideoElement | null>,
  progress: MotionValue<number>,
  enabled: boolean,
) {
  useEffect(() => {
    const video = ref.current;
    if (!video || !enabled) return;
    let frame = 0;
    let disposed = false;
    const seek = () => {
      frame = 0;
      if (
        disposed ||
        video.seeking ||
        !Number.isFinite(video.duration) ||
        video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA
      )
        return;
      const time =
        Math.max(0, Math.min(1, progress.get())) *
        Math.max(0, video.duration - 1 / 24);
      if (Math.abs(video.currentTime - time) > 1 / 48) video.currentTime = time;
    };
    const schedule = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(seek);
    };
    video.pause();
    video.addEventListener("loadedmetadata", schedule);
    video.addEventListener("loadeddata", schedule);
    video.addEventListener("canplay", schedule);
    video.addEventListener("seeked", schedule);
    const unsubscribe = progress.on("change", schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      unsubscribe();
      video.removeEventListener("loadedmetadata", schedule);
      video.removeEventListener("loadeddata", schedule);
      video.removeEventListener("canplay", schedule);
      video.removeEventListener("seeked", schedule);
      video.pause();
    };
  }, [ref, progress, enabled]);
}
```

## components/quote/QuoteForm.tsx

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "@phosphor-icons/react/dist/ssr/User";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { Phone } from "@phosphor-icons/react/dist/ssr/Phone";
import { Hash } from "@phosphor-icons/react/dist/ssr/Hash";
import { ChatText } from "@phosphor-icons/react/dist/ssr/ChatText";
import { Truck } from "@phosphor-icons/react/dist/ssr/Truck";
import { CaretDown } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import {
  type QuoteRequestPayload,
  validateQuoteForm,
  submitQuoteRequest,
} from "@/lib/api/quote";
import { ProductInterestCards } from "./ProductInterestCards";
import styles from "./QuoteForm.module.css";

interface QuoteFormProps {
  initialProduct?: string | null;
}

const FLEET_SIZE_OPTIONS = [
  "1 - 5 trucks",
  "6 - 15 trucks",
  "16 - 50 trucks",
  "51 - 100 trucks",
  "100+ trucks",
];

/**
 * Maps query param aliases to canonical product identifiers.
 */
function resolveInitialProduct(param?: string | null): string[] {
  if (!param) return [];
  const normalized = param.toLowerCase().trim();
  if (normalized === "tms" || normalized === "fuelseek") return ["tms"];
  if (normalized === "sentinel") return ["sentinel"];
  if (
    normalized === "driverapp" ||
    normalized === "driversapp" ||
    normalized === "driver-app"
  ) {
    return ["driver-app"];
  }
  if (normalized === "lens") return ["lens"];
  if (normalized === "crm") return ["crm"];
  if (normalized === "extension" || normalized === "load-board-extension") {
    return ["extension"];
  }
  return [];
}

export function QuoteForm({ initialProduct }: QuoteFormProps) {
  const successRef = useRef<HTMLHeadingElement>(null);
  const [formData, setFormData] = useState<QuoteRequestPayload>({
    fullName: "",
    email: "",
    phone: "",
    mcNumber: "",
    notes: "",
    fleetSize: "",
    productInterests: resolveInitialProduct(initialProduct),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");

  useEffect(() => {
    if (isSubmitted) successRef.current?.focus();
  }, [isSubmitted]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-level error once user starts correcting it
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleBlur(
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name } = e.target;
    const validation = validateQuoteForm(formData);
    if (validation.errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validation.errors[name] }));
    }
  }

  function handleProductSelection(newSelection: string[]) {
    setFormData((prev) => ({ ...prev, productInterests: newSelection }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = validateQuoteForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      const firstInvalidField = Object.keys(validation.errors)[0];
      e.currentTarget
        .querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)
        ?.focus();
      return;
    }

    setIsSubmitting(true);
    setServerMessage("");

    try {
      const response = await submitQuoteRequest(formData);
      setIsSubmitted(true);
      setServerMessage(response.message);
      if (response.referenceId) {
        setReferenceId(response.referenceId);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to submit quote request";
      setServerMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      mcNumber: "",
      notes: "",
      fleetSize: "",
      productInterests: [],
    });
    setErrors({});
    setIsSubmitted(false);
    setServerMessage("");
    setReferenceId("");
  }

  if (isSubmitted) {
    return (
      <div className={styles.formCard} data-testid="quote-success-banner">
        <div className={styles.successContainer}>
          <div className={styles.successIconWrap}>
            <CheckCircle size={56} weight="duotone" aria-hidden="true" />
          </div>
          <h2 ref={successRef} tabIndex={-1} className={styles.successTitle}>
            Request Submitted
          </h2>
          <p className={styles.successDesc}>
            {serverMessage ||
              "Thank you for contacting Spotter. An operations specialist will review your details and reach out within 1 business day."}
          </p>
          {referenceId && (
            <div className={styles.referenceBadge}>
              Reference ID: <strong>{referenceId}</strong>
            </div>
          )}
          <button
            type="button"
            onClick={handleReset}
            className={styles.resetButton}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formCard}>
      <form
        onSubmit={handleSubmit}
        noValidate
        className={styles.form}
        aria-busy={isSubmitting}
      >
        <div className={styles.formHeading}>
          <h2>Your details</h2>
          <p>Name, email and phone are required.</p>
        </div>
        {/* Row 1: Full name & Email address */}
        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label htmlFor="fullName" className={styles.fieldLabel}>
              Full name
            </label>
            <div
              className={`${styles.inputWrapper} ${
                errors.fullName ? styles.inputError : ""
              }`}
            >
              <div className={styles.inputIcon} aria-hidden="true">
                <User size={18} weight="regular" />
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
                className={styles.input}
                data-testid="input-fullname"
                required
              />
            </div>
            {errors.fullName && (
              <span
                id="fullName-error"
                className={styles.errorMessage}
                data-testid="error-fullname"
              >
                {errors.fullName}
              </span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.fieldLabel}>
              Email address
            </label>
            <div
              className={`${styles.inputWrapper} ${
                errors.email ? styles.inputError : ""
              }`}
            >
              <div className={styles.inputIcon} aria-hidden="true">
                <EnvelopeSimple size={18} weight="regular" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={styles.input}
                data-testid="input-email"
                required
              />
            </div>
            {errors.email && (
              <span id="email-error" className={styles.errorMessage}>
                {errors.email}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Phone number & MC number (optional) */}
        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label htmlFor="phone" className={styles.fieldLabel}>
              Phone number
            </label>
            <div
              className={`${styles.inputWrapper} ${
                errors.phone ? styles.inputError : ""
              }`}
            >
              <div className={styles.inputIcon} aria-hidden="true">
                <Phone size={18} weight="regular" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={styles.input}
                data-testid="input-phone"
                required
              />
            </div>
            {errors.phone && (
              <span id="phone-error" className={styles.errorMessage}>
                {errors.phone}
              </span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="mcNumber" className={styles.fieldLabel}>
              MC number <span>Optional</span>
            </label>
            <div className={styles.inputWrapper}>
              <div className={styles.inputIcon} aria-hidden="true">
                <Hash size={18} weight="regular" />
              </div>
              <input
                id="mcNumber"
                name="mcNumber"
                type="text"
                placeholder="MC number (optional)"
                value={formData.mcNumber}
                onChange={handleChange}
                className={styles.input}
                data-testid="input-mcNumber"
              />
            </div>
          </div>
        </div>

        <div className={styles.fleetRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="notes" className={styles.fieldLabel}>
              Needs or questions <span>Optional</span>
            </label>
            <div className={`${styles.inputWrapper} ${styles.textareaWrapper}`}>
              <div className={styles.textareaIcon} aria-hidden="true">
                <ChatText size={18} weight="regular" />
              </div>
              <textarea
                id="notes"
                name="notes"
                placeholder="Tell us about your specific needs or questions..."
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                className={styles.textarea}
                data-testid="input-notes"
              />
            </div>
          </div>

          {/* Row 4: Fleet Size Dropdown */}
          <div className={styles.fleetGroup}>
            <label htmlFor="fleetSize" className={styles.fieldLabel}>
              How many trucks do you run?
            </label>
            <div className={styles.selectWrapper}>
              <div className={styles.inputIcon} aria-hidden="true">
                <Truck size={18} weight="regular" />
              </div>
              <select
                id="fleetSize"
                name="fleetSize"
                value={formData.fleetSize}
                onChange={handleChange}
                className={styles.select}
                data-testid="select-fleet-size"
              >
                <option value="">Select number of trucks</option>
                {FLEET_SIZE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className={styles.selectCaret} aria-hidden="true">
                <CaretDown size={14} weight="bold" />
              </div>
            </div>
          </div>
        </div>

        {/* Row 5: Product Interest Multi-Select Cards */}
        <div className={styles.productSection}>
          <div className={styles.productHeading}>
            <h3 id="product-interest-label">Product interest</h3>
            <p>Select any that interest you.</p>
          </div>
          <ProductInterestCards
            selectedProducts={formData.productInterests}
            onChange={handleProductSelection}
          />
        </div>

        {/* Server error if any */}
        {serverMessage && !isSubmitted && (
          <div className={styles.serverAlert} role="alert">
            {serverMessage}
          </div>
        )}

        {/* Row 6: Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
          data-testid="submit-quote-btn"
        >
          {isSubmitting ? (
            <span className={styles.submittingState}>
              <span className={styles.spinner} aria-hidden="true" />
              <span>Submitting...</span>
            </span>
          ) : (
            <span className={styles.submitContent}>
              <span>Request Quote</span>
              <ArrowUpRight size={22} aria-hidden="true" />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
```

## components/Reveal.tsx

```tsx
"use client";
import { LazyMotion, m, useReducedMotion } from "framer-motion";
const loadFeatures = () =>
  import("./motion-features").then((module) => module.motionFeatures);
export default function Reveal({
  children,
  className,
  entrance = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  entrance?: boolean;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div
        className={className}
        initial={false}
        whileInView={reduced ? undefined : { y: [12, 0] }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{
          duration: entrance ? 0.24 : 0.32,
          delay: reduced ? 0 : Math.min(Math.max(delay, 0), 0.16),
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
```

## components/sections/about/AutomationChapter.tsx

```tsx
import Reveal from "@/components/Reveal";
import { FeatureList } from "@/components/story/FeatureList";
import { about } from "@/content/about";
import styles from "./About.module.css";

export function AutomationChapter() {
  const chapter = about.automation;
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={`${styles.chapter} ${styles.light} ${styles.automation}`}
    >
      <div className={styles.container}>
        <Reveal className={styles.sectionHead}>
          <p className={styles.label}>
            <span>{chapter.number}</span>
            {chapter.label}
          </p>
          <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <FeatureList features={chapter.features} compact light />
        </Reveal>
      </div>
    </section>
  );
}
```

## components/sections/about/AwardsChapter.tsx

```tsx
import type { CSSProperties } from "react";
import Image from "next/image";
import { about } from "@/content/about";
import styles from "./About.module.css";

export function AwardsChapter() {
  const chapter = about.awards;
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={`${styles.chapter} ${styles.light} ${styles.awards}`}
    >
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.label}>
            <span>{chapter.number}</span>
            {chapter.label}
          </p>
          <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        </div>
        <ul className={styles.awardList}>
          {chapter.images.map((image) => (
            <li key={image.src}>
              <div
                className={styles.awardImage}
                style={
                  {
                    "--award-width": `${image.width}px`,
                    "--award-ratio": `${image.width} / ${image.height}`,
                  } as CSSProperties
                }
              >
                <Image
                  src={image.src}
                  fill
                  sizes={`${image.width}px`}
                  alt={image.alt}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

## components/sections/about/CompanyFigures.tsx

```tsx
import { about } from "@/content/about";
import styles from "./About.module.css";

export function CompanyFigures() {
  return (
    <div className={styles.metrics}>
      <dl>
        {about.metrics.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
      <p className={styles.figuresSource}>
        <a href={about.source.url}>{about.ui.figuresSource}</a>
      </p>
    </div>
  );
}
```

## components/sections/about/ContactChapter.tsx

```tsx
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { about } from "@/content/about";
import styles from "./About.module.css";

export function ContactChapter() {
  const chapter = about.contact;
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={`${styles.contact} ${styles.light}`}
    >
      <Reveal className={styles.container}>
        <p className={styles.label}>{chapter.label}</p>
        <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        <p className={styles.intro}>{chapter.description}</p>
        <div className={styles.contactBottom}>
          <div className={styles.actions}>
            {chapter.actions.map((action, index) => (
              <ActionLink
                key={action.label}
                href={action.href}
                secondary={index === 1}
                className={index === 0 ? styles.primary : styles.secondary}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {action.label}
              </ActionLink>
            ))}
          </div>
          <p>{chapter.note}</p>
        </div>
      </Reveal>
    </section>
  );
}
```

## components/sections/about/ExecutionChapter.tsx

```tsx
import Reveal from "@/components/Reveal";
import { about } from "@/content/about";
import styles from "./About.module.css";

export function ExecutionChapter() {
  const chapter = about.execution;
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={`${styles.chapter} ${styles.light} ${styles.execution}`}
    >
      <div className={`${styles.container} ${styles.split}`}>
        <Reveal className={styles.sectionHead}>
          <p className={styles.label}>
            <span>{chapter.number}</span>
            {chapter.label}
          </p>
          <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        </Reveal>
        <Reveal className={styles.prose} delay={0.08}>
          {chapter.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
```

## components/sections/about/JourneyChapter.tsx

```tsx
import Reveal from "@/components/Reveal";
import { about } from "@/content/about";
import styles from "./About.module.css";

export function JourneyChapter() {
  const chapter = about.journey;
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={`${styles.chapter} ${styles.light} ${styles.journey}`}
    >
      <div className={styles.container}>
        <Reveal className={styles.sectionHead}>
          <p className={styles.label}>
            <span>{chapter.number}</span>
            {chapter.label}
          </p>
          <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        </Reveal>
        <ol className={styles.timeline}>
          {chapter.entries.map((entry) => (
            <li key={`${entry.date}-${entry.title}`}>
              <span className={styles.date}>{entry.date}</span>
              <Reveal>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

## components/sections/about/OpeningChapter.tsx

```tsx
"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { StoryFilm } from "@/components/story/StoryFilm";
import { about, aboutFilms } from "@/content/about";
import styles from "./About.module.css";

export function OpeningChapter() {
  const { cinematic } = useStoryMotion();
  const { ref, progress } = useChapterProgress(cinematic);
  const chapter = about.opening;
  return (
    <section
      ref={ref}
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={styles.hero}
      data-about-pin
    >
      <div className={styles.heroStage} data-about-stage>
        <div className={styles.heroCopy}>
          <p className={styles.label}>{chapter.label}</p>
          <h1 id={`${chapter.id}-title`}>{chapter.title}</h1>
          <p className={styles.intro}>{chapter.description}</p>
          <div className={styles.actions}>
            {chapter.actions.map((action, index) => (
              <ActionLink
                key={action.label}
                href={action.href}
                secondary={index === 1}
                className={index === 0 ? styles.primary : styles.secondary}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {action.label}
              </ActionLink>
            ))}
          </div>
        </div>
        <div className={styles.heroMedia} data-about-hero-media>
          <StoryFilm asset={aboutFilms.execution} progress={progress} hero />
        </div>
      </div>
    </section>
  );
}
```

## components/sections/about/OperatorsChapter.tsx

```tsx
import Reveal from "@/components/Reveal";
import { about } from "@/content/about";
import styles from "./About.module.css";

export function OperatorsChapter() {
  const chapter = about.operators;
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={`${styles.chapter} ${styles.operators}`}
    >
      <div className={styles.container}>
        <div className={styles.split}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.label}>
              <span>{chapter.number}</span>
              {chapter.label}
            </p>
            <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
          </Reveal>
          <Reveal className={styles.intro} delay={0.08}>
            {chapter.introduction}
          </Reveal>
        </div>
        <Reveal>
          <div className={styles.advantage}>
            <p className={styles.label}>{chapter.advantageLabel}</p>
            <p>{chapter.advantage}</p>
          </div>
        </Reveal>
        <Reveal className={styles.prose}>
          <p>{chapter.conclusion}</p>
        </Reveal>
      </div>
    </section>
  );
}
```

## components/sections/about/PhilosophyChapter.tsx

```tsx
import { ChapterScene } from "@/components/story/ChapterScene";
import { about, aboutFilms } from "@/content/about";
import styles from "./About.module.css";

export function PhilosophyChapter() {
  const chapter = about.philosophy;
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={chapter.label}
      title={chapter.title}
      description={chapter.paragraphs[0]}
      paragraphs={chapter.paragraphs.slice(1)}
      asset={aboutFilms.horizon}
      features={[]}
      pinned
      className={styles.philosophy}
    />
  );
}
```

## components/sections/claims-os/ClaimsChapterScene.tsx

```tsx
"use client";
import React from "react";
import { m, useTransform } from "motion/react";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import type { StoryAsset, FeatureGroup } from "@/content/claims-os";
import { ClaimsFilm } from "./ClaimsFilm";
import Reveal from "@/components/Reveal";
import styles from "./Claims.module.css";

export function ClaimsChapterScene({
  id,
  number,
  label,
  title,
  description,
  asset,
  features,
  pinned = false,
  light = false,
  scrub = true,
  children,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  asset?: StoryAsset | null;
  features?: readonly FeatureGroup[];
  pinned?: boolean;
  light?: boolean;
  scrub?: boolean;
  children?: React.ReactNode;
}) {
  const { enabled, cinematic } = useStoryMotion();
  const { ref, progress } = useChapterProgress(pinned && cinematic);
  const { ref: mediaRef, progress: mediaProgress } =
    useChapterProgress<HTMLDivElement>();
  const y = useTransform(mediaProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      data-claims-pin={pinned || undefined}
      className={`${styles.chapter} ${pinned ? styles.pinChapter : ""} ${
        light ? styles.light : styles.dark
      }`}
    >
      <div
        className={pinned ? styles.stickyScene : styles.scene}
        data-cinematic={(pinned && cinematic) || undefined}
      >
        <div className={styles.sceneLayout}>
          <Reveal className={styles.sceneCopy}>
            <div>
              <p className={styles.chapterLabel}>
                <span>{number}</span>
                {label}
              </p>
              <h2 id={`${id}-title`}>{title}</h2>
            </div>
            <p className={styles.lead}>{description}</p>
          </Reveal>

          {asset && (
            <m.div
              ref={mediaRef}
              className={styles.sceneMedia}
              style={{ y: enabled && !pinned ? y : 0 }}
            >
              <ClaimsFilm
                asset={asset}
                scrub={scrub}
                progress={pinned && cinematic ? progress : mediaProgress}
              />
            </m.div>
          )}

          {children}

          {features && features.length > 0 && (
            <ul className={`${styles.features} ${styles.compact}`}>
              {features.map((feature, index) => (
                <li key={feature.title}>
                  <span className={styles.featureNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    {feature.details && feature.details.length > 0 && (
                      <ul className={styles.details}>
                        {feature.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
```

## components/sections/claims-os/ClaimsFilm.tsx

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, type MotionValue } from "motion/react";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { useVideoScrub } from "@/components/motion/useVideoScrub";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import type { StoryAsset } from "@/content/claims-os";
import styles from "./Claims.module.css";

export function ClaimsFilm({
  asset,
  progress,
  hero = false,
  scrub = true,
}: {
  asset: StoryAsset;
  progress: MotionValue<number>;
  hero?: boolean;
  scrub?: boolean;
}) {
  const { ref: wrap, progress: ownProgress } =
    useChapterProgress<HTMLDivElement>();
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { enabled, eligible, heroEligible, cinematic, paused } =
    useStoryMotion();
  const scrubEligible = hero ? heroEligible : eligible;

  // Once entered view, stay mounted to preserve buffer and readyState
  const inView = useInView(wrap, { margin: "150px 0px 150px 0px" });
  const entered = useInView(wrap, {
    margin: "450px 0px 450px 0px",
    once: true,
  });

  const isVideoAvailable =
    asset.kind === "video" &&
    asset.src !== null &&
    asset.status !== "placeholder";

  const mounted =
    isVideoAvailable && entered && (scrub ? scrubEligible : true) && !failed;

  const active =
    scrub && (hero ? heroEligible && !paused : enabled) && inView && mounted;

  useVideoScrub(video, hero && !cinematic ? ownProgress : progress, active);

  useEffect(() => {
    const element = video.current;
    if (scrub || !element) return;
    if (inView && !paused) void element.play().catch(() => {});
    else element.pause();
  }, [scrub, inView, paused, mounted]);

  return (
    <div ref={wrap} className={`${styles.film} ${hero ? styles.heroFilm : ""}`}>
      <div className={styles.filmLayer}>
        <div className={styles.posterContainer}>
          <Image
            src={asset.poster}
            alt={asset.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            priority={hero}
            className={styles.poster}
          />
          {asset.status === "placeholder" && (
            <div className={styles.assetNeededBadge}>
              <span>ASSET NEEDED: {asset.id}</span>
            </div>
          )}
        </div>
        {mounted && (
          <video
            ref={video}
            src={asset.src ?? undefined}
            width={asset.width}
            height={asset.height}
            muted
            loop={!scrub}
            controls={!scrub}
            playsInline
            preload="auto"
            aria-hidden={scrub ? true : undefined}
            aria-label={scrub ? undefined : asset.alt}
            tabIndex={scrub ? -1 : 0}
            className={`${styles.video} ${ready ? styles.videoReady : ""}`}
            onLoadStart={() => setReady(false)}
            onLoadedData={() => setReady(true)}
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}
```

## components/sections/claims-os/ClaimsHeroChapter.tsx

```tsx
"use client";
import { m, useTransform } from "motion/react";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import { claimsOs, storyAssets } from "@/content/claims-os";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { ClaimsFilm } from "./ClaimsFilm";
import styles from "./Claims.module.css";

export function ClaimsHeroChapter() {
  const { ref, progress } = useChapterProgress<HTMLDivElement>(true);
  const { enabled } = useStoryMotion();
  const y = useTransform(progress, [0, 1], [0, -18]);

  return (
    <section
      id="claims-intro"
      aria-labelledby="claims-title"
      className={styles.opening}
    >
      <div ref={ref} className={styles.heroTrack} data-claims-pin>
        <div className={styles.heroStage}>
          <ClaimsFilm asset={storyAssets.triage} progress={progress} hero />
          <m.div className={styles.heroCopy} style={{ y: enabled ? y : 0 }}>
            <p className={styles.chapterLabel}>{claimsOs.hero.eyebrow}</p>
            <h1 id="claims-title">{claimsOs.hero.title}</h1>
            <p className={styles.lead}>{claimsOs.hero.description}</p>
            <div className={styles.actions}>
              <ActionLink
                href={claimsOs.action.href}
                className={styles.primary}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {claimsOs.action.label}
              </ActionLink>
              <a
                href={claimsOs.hero.secondaryHref}
                className={styles.secondary}
              >
                {claimsOs.hero.secondary}
                <ArrowDownIcon aria-hidden="true" />
              </a>
            </div>
            <p className={styles.scrollHint}>
              <ArrowDownIcon aria-hidden="true" />
              {claimsOs.hero.scrollHint}
            </p>
          </m.div>
        </div>
      </div>
    </section>
  );
}
```

## components/sections/ClosingMotif.tsx

```tsx
"use client";
import { LazyMotion, m, useReducedMotion } from "framer-motion";
import styles from "./ClosingCTA.module.css";
const loadFeatures = () =>
  import("../motion-features").then((module) => module.motionFeatures);
export default function ClosingMotif() {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.svg
        viewBox="0 0 224 224"
        fill="none"
        className={styles.motif}
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="112" cy="112" r="104" className={styles.orbit} />
        <path
          d="M8 112H36M188 112H216M112 8V36M112 188V216"
          className={styles.orbit}
        />
        <m.g
          initial={false}
          whileInView={reduced ? undefined : { scale: [0.94, 1], y: [12, 0] }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "112px 112px" }}
        >
          <circle cx="66" cy="66" r="24" className={styles.coral} />
          <circle cx="66" cy="122" r="24" className={styles.teal} />
          <circle cx="122" cy="122" r="24" className={styles.porcelain} />
          <circle cx="178" cy="122" r="24" className={styles.porcelain} />
        </m.g>
      </m.svg>
    </LazyMotion>
  );
}
```

## components/sections/driversapp/AutonomyChapter.tsx

```tsx
import { ChapterScene } from "@/components/story/ChapterScene";
import { driversApp, driverStoryAssets } from "@/content/driversapp";

export default function AutonomyChapter() {
  const { autonomy } = driversApp;
  return (
    <ChapterScene
      id={autonomy.id}
      number={autonomy.number}
      label={autonomy.label}
      title={autonomy.title}
      description={autonomy.description}
      asset={driverStoryAssets.autonomy}
      features={autonomy.features}
      pinned={false}
    />
  );
}
```

## components/sections/driversapp/ChapterNavigation.tsx

```tsx
"use client";
import { useEffect, useRef } from "react";
import { PauseIcon } from "@phosphor-icons/react/dist/ssr/Pause";
import { PlayIcon } from "@phosphor-icons/react/dist/ssr/Play";
import { driverChapters, driversApp } from "@/content/driversapp";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import useActiveChapter from "@/components/motion/useActiveChapter";
import styles from "@/components/story/Story.module.css";

const ids = driverChapters.map((chapter) => chapter.id);

export default function ChapterNavigation() {
  const navigation = useRef<HTMLElement>(null);
  const { active, visible } = useActiveChapter(ids);
  const { heroEligible, paused, toggle } = useStoryMotion();

  useEffect(() => {
    const list = navigation.current?.querySelector("ol");
    const link = list?.querySelector<HTMLElement>("[aria-current]");
    if (!list || !link || window.innerWidth >= 1024) return;
    list.scrollTo({
      left:
        link.offsetLeft -
        list.offsetLeft -
        list.clientWidth / 2 +
        link.offsetWidth / 2,
      behavior: "instant",
    });
  }, [active]);

  return (
    <nav
      ref={navigation}
      className={styles.chapterNav}
      aria-label={driversApp.story.navigationLabel}
      hidden={!visible}
    >
      <ol>
        {driverChapters.map((chapter, index) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              aria-label={`${chapter.number} ${chapter.label}`}
              title={chapter.label}
              aria-current={active === index ? "location" : undefined}
            >
              {chapter.number}
            </a>
          </li>
        ))}
      </ol>
      {heroEligible && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          aria-label={paused ? driversApp.story.resume : driversApp.story.pause}
        >
          {paused ? (
            <PlayIcon aria-hidden="true" />
          ) : (
            <PauseIcon aria-hidden="true" />
          )}
        </button>
      )}
    </nav>
  );
}
```

## components/sections/driversapp/ContactChapter.tsx

```tsx
import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { driversApp } from "@/content/driversapp";
import tmsStyles from "@/components/story/Story.module.css";
import driverStyles from "./DriversApp.module.css";

export default function ContactChapter() {
  const { contact, appDownloads, quoteLink } = driversApp;
  return (
    <section
      id={contact.id}
      aria-labelledby={`${contact.id}-title`}
      className={tmsStyles.contact}
    >
      <Reveal>
        <p className={tmsStyles.chapterLabel}>
          <span>{contact.number}</span>
          {contact.eyebrow}
        </p>
        <h2 id={`${contact.id}-title`}>{contact.title}</h2>
      </Reveal>
      <div className={tmsStyles.contactBottom}>
        <p className={tmsStyles.lead}>{contact.description}</p>
        <div className={driverStyles.contactActions}>
          <div className={driverStyles.contactBadges}>
            <a
              href={appDownloads.ios.href}
              target="_blank"
              rel="noopener noreferrer"
              className={driverStyles.appBadgeLink}
              aria-label={appDownloads.ios.label}
            >
              <Image
                src={appDownloads.ios.icon}
                alt=""
                width={149}
                height={44}
                className={driverStyles.appBadgeImg}
                unoptimized
              />
            </a>
            <a
              href={appDownloads.android.href}
              target="_blank"
              rel="noopener noreferrer"
              className={driverStyles.appBadgeLink}
              aria-label={appDownloads.android.label}
            >
              <Image
                src={appDownloads.android.icon}
                alt=""
                width={147}
                height={44}
                className={driverStyles.appBadgeImg}
                unoptimized
              />
            </a>
          </div>
          <ActionLink
            href={quoteLink.href}
            className={tmsStyles.primary}
            arrow={<ArrowUpRightIcon aria-hidden="true" />}
          >
            {quoteLink.label}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
```

## components/sections/driversapp/NoGoChapter.tsx

```tsx
import { ChapterScene } from "@/components/story/ChapterScene";
import { driversApp, driverStoryAssets } from "@/content/driversapp";

export default function NoGoChapter() {
  const { nogo } = driversApp;
  return (
    <ChapterScene
      id={nogo.id}
      number={nogo.number}
      label={nogo.label}
      title={nogo.title}
      description={nogo.description}
      asset={driverStoryAssets.nogo}
      features={nogo.features}
      pinned
    />
  );
}
```

## components/sections/driversapp/OpeningChapter.tsx

```tsx
"use client";
import Image from "next/image";
import { m, useTransform } from "framer-motion";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import { driversApp, driverStoryAssets } from "@/content/driversapp";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { StoryFilm } from "@/components/story/StoryFilm";
import tmsStyles from "@/components/story/Story.module.css";
import driverStyles from "./DriversApp.module.css";

export default function OpeningChapter() {
  const { ref, progress } = useChapterProgress<HTMLDivElement>(true);
  const { enabled } = useStoryMotion();
  const y = useTransform(progress, [0, 1], [0, -18]);

  return (
    <section
      id="driver-intro"
      aria-labelledby="driver-title"
      className={tmsStyles.opening}
    >
      <div ref={ref} className={tmsStyles.heroTrack} data-tms-pin>
        <div className={tmsStyles.heroStage}>
          <StoryFilm
            asset={driverStoryAssets.opening}
            progress={progress}
            hero
          />
          <m.div className={tmsStyles.heroCopy} style={{ y: enabled ? y : 0 }}>
            <p className={tmsStyles.chapterLabel}>{driversApp.hero.eyebrow}</p>
            <h1 id="driver-title">{driversApp.hero.title}</h1>
            <p className={tmsStyles.lead}>{driversApp.hero.description}</p>
            <div className={driverStyles.appBadges}>
              <a
                href={driversApp.appDownloads.ios.href}
                target="_blank"
                rel="noopener noreferrer"
                className={driverStyles.appBadgeLink}
                aria-label={driversApp.appDownloads.ios.label}
              >
                <Image
                  src={driversApp.appDownloads.ios.icon}
                  alt=""
                  width={149}
                  height={44}
                  className={driverStyles.appBadgeImg}
                  unoptimized
                />
              </a>
              <a
                href={driversApp.appDownloads.android.href}
                target="_blank"
                rel="noopener noreferrer"
                className={driverStyles.appBadgeLink}
                aria-label={driversApp.appDownloads.android.label}
              >
                <Image
                  src={driversApp.appDownloads.android.icon}
                  alt=""
                  width={147}
                  height={44}
                  className={driverStyles.appBadgeImg}
                  unoptimized
                />
              </a>
            </div>
            <div className={tmsStyles.actions}>
              <ActionLink
                href={driversApp.quoteLink.href}
                className={tmsStyles.primary}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {driversApp.quoteLink.label}
              </ActionLink>
              <a
                href={driversApp.hero.secondaryHref}
                className={tmsStyles.secondary}
              >
                {driversApp.hero.secondaryCta}
                <ArrowDownIcon aria-hidden="true" />
              </a>
            </div>
            <p className={tmsStyles.scrollHint}>
              <ArrowDownIcon aria-hidden="true" />
              {driversApp.story.scrollHint}
            </p>
          </m.div>
        </div>
      </div>
      <div className={tmsStyles.coverage}>
        <p className={driverStyles.carrierNotice}>
          {driversApp.hero.carrierNote}
        </p>
      </div>
    </section>
  );
}
```

## components/sections/driversapp/ScheduleChapter.tsx

```tsx
import { ChapterScene } from "@/components/story/ChapterScene";
import { driversApp, driverStoryAssets } from "@/content/driversapp";

export default function ScheduleChapter() {
  const { schedule } = driversApp;
  return (
    <ChapterScene
      id={schedule.id}
      number={schedule.number}
      label={schedule.label}
      title={schedule.title}
      description={schedule.description}
      asset={driverStoryAssets.schedule}
      features={schedule.features}
      pinned
    />
  );
}
```

## components/sections/driversapp/ScoringChapter.tsx

```tsx
import { ChapterScene } from "@/components/story/ChapterScene";
import { driversApp, driverStoryAssets } from "@/content/driversapp";

export default function ScoringChapter() {
  const { scoring } = driversApp;
  return (
    <ChapterScene
      id={scoring.id}
      number={scoring.number}
      label={scoring.label}
      title={scoring.title}
      description={scoring.description}
      asset={driverStoryAssets.matching}
      features={scoring.features}
      pinned
      scrub
    />
  );
}
```

## components/sections/driversapp/SettlementChapter.tsx

```tsx
import { ChapterScene } from "@/components/story/ChapterScene";
import { driversApp, driverStoryAssets } from "@/content/driversapp";

export default function SettlementChapter() {
  const { settlement } = driversApp;
  return (
    <ChapterScene
      id={settlement.id}
      number={settlement.number}
      label={settlement.label}
      title={settlement.title}
      description={settlement.description}
      asset={driverStoryAssets.settlement}
      features={settlement.features}
      pinned={false}
      light
    />
  );
}
```

## components/sections/ImpactMetric.tsx

```tsx
"use client";
import type { ReactNode } from "react";
import { LazyMotion, m, useReducedMotion } from "framer-motion";
import styles from "./Results.module.css";
const loadFeatures = () =>
  import("../motion-features").then((module) => module.motionFeatures);
export default function ImpactMetric({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const reduced = useReducedMotion();
  const transition = {
    duration: 0.32,
    delay: reduced ? 0 : index * 0.05,
    ease: [0.16, 1, 0.3, 1] as const,
  };
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div
        className={styles.metric}
        initial={false}
        whileInView={reduced ? undefined : { y: [12, 0] }}
        viewport={{ once: true, amount: 0.5 }}
        transition={transition}
      >
        <m.span
          aria-hidden="true"
          className={styles.rule}
          initial={false}
          whileInView={reduced ? undefined : { scaleX: [0, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          transition={transition}
        />
        {children}
      </m.div>
    </LazyMotion>
  );
}
```

## components/sections/loan-calculators/LoanCalculatorsFilm.tsx

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, type MotionValue } from "motion/react";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { useVideoScrub } from "@/components/motion/useVideoScrub";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import type { StoryAsset } from "@/content/loan-calculators";
import styles from "./Calculators.module.css";

export function LoanCalculatorsFilm({
  asset,
  progress,
  hero = false,
  scrub = true,
}: {
  asset: StoryAsset;
  progress: MotionValue<number>;
  hero?: boolean;
  scrub?: boolean;
}) {
  const { ref: wrap, progress: ownProgress } =
    useChapterProgress<HTMLDivElement>();
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { enabled, eligible, heroEligible, cinematic, paused } =
    useStoryMotion();
  const scrubEligible = hero ? heroEligible : eligible;

  // Once entered view, stay mounted to preserve buffer and readyState
  const inView = useInView(wrap, { margin: "150px 0px 150px 0px" });
  const entered = useInView(wrap, {
    margin: "450px 0px 450px 0px",
    once: true,
  });

  const isVideoAvailable =
    asset.kind === "video" &&
    asset.src !== null &&
    asset.status !== "placeholder";

  const mounted =
    isVideoAvailable && entered && (scrub ? scrubEligible : true) && !failed;

  const active =
    scrub && (hero ? heroEligible && !paused : enabled) && inView && mounted;

  useVideoScrub(video, hero && !cinematic ? ownProgress : progress, active);

  useEffect(() => {
    const element = video.current;
    if (scrub || !element) return;
    if (inView && !paused) void element.play().catch(() => {});
    else element.pause();
  }, [scrub, inView, paused, mounted]);

  return (
    <div ref={wrap} className={`${styles.film} ${hero ? styles.heroFilm : ""}`}>
      <div className={styles.filmLayer}>
        <div className={styles.posterContainer}>
          <Image
            src={asset.poster}
            alt={asset.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            priority={hero}
            className={styles.poster}
          />
          {asset.status === "placeholder" && (
            <div className={styles.assetNeededBadge}>
              <span>ASSET NEEDED: {asset.id}</span>
            </div>
          )}
        </div>
        {mounted && (
          <video
            ref={video}
            src={asset.src ?? undefined}
            width={asset.width}
            height={asset.height}
            muted
            loop={!scrub}
            controls={!scrub}
            playsInline
            preload="auto"
            aria-hidden={scrub ? true : undefined}
            aria-label={scrub ? undefined : asset.alt}
            tabIndex={scrub ? -1 : 0}
            className={`${styles.video} ${ready ? styles.videoReady : ""}`}
            onLoadStart={() => setReady(false)}
            onLoadedData={() => setReady(true)}
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}
```

## components/sections/loan-calculators/LoanCalculatorsHero.tsx

```tsx
"use client";
import { m, useTransform } from "motion/react";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import {
  loanCalculatorsContent,
  loanStoryAssets,
} from "@/content/loan-calculators";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { LoanCalculatorsFilm } from "./LoanCalculatorsFilm";
import styles from "./Calculators.module.css";

export function LoanCalculatorsHero() {
  const { ref, progress } = useChapterProgress<HTMLDivElement>(true);
  const { enabled } = useStoryMotion();
  const y = useTransform(progress, [0, 1], [0, -18]);

  return (
    <section
      id="calculator-intro"
      aria-labelledby="calculator-title"
      className={styles.opening}
    >
      <div ref={ref} className={styles.heroTrack} data-calc-pin>
        <div className={styles.heroStage}>
          <LoanCalculatorsFilm
            asset={loanStoryAssets.hero}
            progress={progress}
            hero
          />
          <m.div className={styles.heroCopy} style={{ y: enabled ? y : 0 }}>
            <p className={styles.chapterLabel}>
              {loanCalculatorsContent.hero.eyebrow}
            </p>
            <h1 id="calculator-title">{loanCalculatorsContent.hero.title}</h1>
            <p className={styles.lead}>
              {loanCalculatorsContent.hero.description}
            </p>
            <div className={styles.actions}>
              <ActionLink
                href={loanCalculatorsContent.action.href}
                className={styles.primary}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {loanCalculatorsContent.action.label}
              </ActionLink>
              <a
                href={loanCalculatorsContent.hero.secondaryHref}
                className={styles.secondary}
              >
                {loanCalculatorsContent.hero.secondary}
                <ArrowDownIcon aria-hidden="true" />
              </a>
            </div>
            <p className={styles.scrollHint}>
              <ArrowDownIcon aria-hidden="true" />
              {loanCalculatorsContent.hero.scrollHint}
            </p>
          </m.div>
        </div>
      </div>
    </section>
  );
}
```

## components/sections/sentinel/SentinelClosingCta.tsx

```tsx
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { sentinelContent } from "@/content/sentinel";
import tmsStyles from "@/components/story/Story.module.css";
import sentinelStyles from "./Sentinel.module.css";

export default function SentinelClosingCta() {
  const { closingCta } = sentinelContent;

  return (
    <section
      id="sentinel-cta"
      aria-labelledby="sentinel-cta-title"
      className={tmsStyles.contact}
    >
      <Reveal>
        <p className={tmsStyles.chapterLabel}>
          <span>06</span>
          {closingCta.eyebrow}
        </p>
        <h2 id="sentinel-cta-title">{closingCta.heading}</h2>
      </Reveal>

      <div className={tmsStyles.contactBottom}>
        <p className={tmsStyles.lead}>{closingCta.description}</p>

        <div className={tmsStyles.actions}>
          <ActionLink
            href={closingCta.primaryHref}
            className={tmsStyles.primary}
            arrow={<ArrowUpRightIcon aria-hidden="true" />}
          >
            {closingCta.primaryCta}
          </ActionLink>
          <a
            href={closingCta.secondaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className={tmsStyles.secondary}
          >
            {closingCta.secondaryCta}
          </a>
        </div>

        <div className={sentinelStyles.guaranteeGrid}>
          {closingCta.guarantees.map((item) => (
            <div key={item.label} className={sentinelStyles.guaranteeCard}>
              <span className={sentinelStyles.guaranteeLabel}>
                {item.label}
              </span>
              <span className={sentinelStyles.guaranteeDetail}>
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## components/sections/sentinel/SentinelComplianceChapter.tsx

```tsx
import { ChapterScene } from "@/components/story/ChapterScene";
import { sentinelContent, sentinelStoryAssets } from "@/content/sentinel";

export default function SentinelComplianceChapter() {
  const { complianceChapter } = sentinelContent;
  return (
    <ChapterScene
      id={complianceChapter.id}
      number={complianceChapter.chapterNumber}
      label={complianceChapter.tag}
      title={complianceChapter.heading}
      description={complianceChapter.description}
      asset={sentinelStoryAssets.compliance}
      features={complianceChapter.features}
      pinned={false}
    />
  );
}
```

## components/sections/sentinel/SentinelHero.tsx

```tsx
"use client";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import { sentinelContent, sentinelStoryAssets } from "@/content/sentinel";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { StoryFilm } from "@/components/story/StoryFilm";
import styles from "./SentinelHero.module.css";

// A resolved film frame keeps the artwork visible in the static fallback.
const HERO_ASSET = {
  ...sentinelStoryAssets.shield,
  poster: "/images/sentinel/sentinel-shield-hero.webp",
};

export function SentinelHero() {
  const { ref, progress } = useChapterProgress<HTMLDivElement>();

  return (
    <section
      id="sentinel-hero"
      aria-labelledby="sentinel-title"
      className={styles.hero}
    >
      <div ref={ref} className={styles.stage}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{sentinelContent.hero.eyebrow}</p>
          <h1 id="sentinel-title">{sentinelContent.hero.title}</h1>
          <p className={styles.description}>
            {sentinelContent.hero.description}
          </p>

          <div className={styles.actions}>
            <ActionLink
              href={sentinelContent.hero.primaryHref}
              className={styles.primary}
              arrow={<ArrowUpRightIcon aria-hidden="true" />}
            >
              {sentinelContent.hero.primaryCta}
            </ActionLink>
            <a
              href={sentinelContent.hero.secondaryHref}
              className={styles.secondary}
            >
              {sentinelContent.hero.secondaryCta}
              <ArrowDownIcon aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.media}>
            <StoryFilm asset={HERO_ASSET} progress={progress} hero />
          </div>

          <div className={styles.statGrid}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {sentinelContent.hero.savingsStat}
              </span>
              <span className={styles.statLabel}>
                {sentinelContent.hero.savingsLabel}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {sentinelContent.hero.speedStat}
              </span>
              <span className={styles.statLabel}>
                {sentinelContent.hero.speedLabel}
              </span>
            </div>
          </div>

          <div className={styles.channels}>
            <span className={styles.channelDot} aria-hidden="true" />
            <span>{sentinelContent.hero.badgeChannels}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

## components/sections/sentinel/SentinelMonitoringChapter.tsx

```tsx
import { ChapterScene } from "@/components/story/ChapterScene";
import { sentinelContent, sentinelStoryAssets } from "@/content/sentinel";

export default function SentinelMonitoringChapter() {
  const { monitoringChapter } = sentinelContent;
  return (
    <ChapterScene
      id={monitoringChapter.id}
      number={monitoringChapter.chapterNumber}
      label={monitoringChapter.tag}
      title={monitoringChapter.heading}
      description={monitoringChapter.description}
      asset={sentinelStoryAssets.monitoring}
      features={monitoringChapter.features}
      pinned={false}
      scrub={false}
      light
    />
  );
}
```

## components/sections/sentinel/SentinelNavigation.tsx

```tsx
"use client";
import { useEffect, useRef } from "react";
import { PauseIcon } from "@phosphor-icons/react/dist/ssr/Pause";
import { PlayIcon } from "@phosphor-icons/react/dist/ssr/Play";
import { sentinelContent } from "@/content/sentinel";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import useActiveChapter from "@/components/motion/useActiveChapter";
import styles from "@/components/story/Story.module.css";

const ids = sentinelContent.navigation.map((item) => item.id);

export default function SentinelNavigation() {
  const navigation = useRef<HTMLElement>(null);
  const { active, visible } = useActiveChapter(ids);
  const { heroEligible, paused, toggle } = useStoryMotion();

  useEffect(() => {
    const list = navigation.current?.querySelector("ol");
    const link = list?.querySelector<HTMLElement>("[aria-current]");
    if (!list || !link || window.innerWidth >= 1024) return;
    list.scrollTo({
      left:
        link.offsetLeft -
        list.offsetLeft -
        list.clientWidth / 2 +
        link.offsetWidth / 2,
      behavior: "instant",
    });
  }, [active]);

  return (
    <nav
      ref={navigation}
      className={styles.chapterNav}
      aria-label="Sentinel chapter navigation"
      hidden={!visible}
    >
      <ol>
        {sentinelContent.navigation.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-label={item.label}
              title={item.label}
              aria-current={active === index ? "location" : undefined}
            >
              {String(index + 1).padStart(2, "0")}
            </a>
          </li>
        ))}
      </ol>
      {heroEligible && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          aria-label={paused ? "Resume scrub motion" : "Pause scrub motion"}
        >
          {paused ? (
            <PlayIcon aria-hidden="true" />
          ) : (
            <PauseIcon aria-hidden="true" />
          )}
        </button>
      )}
    </nav>
  );
}
```

## components/sections/sentinel/SentinelScreeningChapter.tsx

```tsx
import { ChapterScene } from "@/components/story/ChapterScene";
import { sentinelContent, sentinelStoryAssets } from "@/content/sentinel";

export default function SentinelScreeningChapter() {
  const { screeningChapter } = sentinelContent;
  return (
    <ChapterScene
      id={screeningChapter.id}
      number={screeningChapter.chapterNumber}
      label={screeningChapter.tag}
      title={screeningChapter.heading}
      description={screeningChapter.description}
      asset={sentinelStoryAssets.screening}
      features={screeningChapter.features}
      pinned={false}
      scrub={false}
    />
  );
}
```

## components/sections/tms/ChapterNavigation.tsx

```tsx
import { ChapterRail } from "@/components/story/ChapterRail";
import { storyChapters, tmsStory } from "@/content/tms";

export function ChapterNavigation() {
  return (
    <ChapterRail
      chapters={storyChapters}
      label={tmsStory.navigationLabel}
      pauseLabel={tmsStory.pause}
      resumeLabel={tmsStory.resume}
    />
  );
}
```

## components/sections/tms/ContactChapter.tsx

```tsx
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { tms, tmsStory, storyChapters } from "@/content/tms";
import styles from "@/components/story/Story.module.css";
export default function ContactChapter() {
  const chapter = storyChapters[7];
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={styles.contact}
    >
      <Reveal>
        <p className={styles.chapterLabel}>
          <span>{chapter.number}</span>
          {tmsStory.contact.eyebrow}
        </p>
        <h2 id={`${chapter.id}-title`}>{tmsStory.contact.title}</h2>
      </Reveal>
      <div className={styles.contactBottom}>
        <p className={styles.lead}>{tmsStory.contact.description}</p>
        <ActionLink
          href={tms.action.href}
          className={styles.primary}
          arrow={<ArrowUpRightIcon aria-hidden="true" />}
        >
          {tms.action.label}
        </ActionLink>
      </div>
    </section>
  );
}
```

## components/sections/tms/EvidenceChapter.tsx

```tsx
import Reveal from "@/components/Reveal";
import { tms, storyChapters } from "@/content/tms";
import styles from "@/components/story/Story.module.css";
export default function EvidenceChapter() {
  const chapter = storyChapters[1];
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={`${styles.evidence} ${styles.light}`}
    >
      <div className={styles.evidenceHead}>
        <Reveal>
          <p className={styles.chapterLabel}>
            <span>{chapter.number}</span>
            {chapter.label}
          </p>
          <h2 id={`${chapter.id}-title`}>{tms.results.title}</h2>
        </Reveal>
        <p className={styles.lead}>{tms.results.description}</p>
      </div>
      <dl className={styles.metrics}>
        {tms.results.metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.05}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </Reveal>
        ))}
      </dl>
      <div className={styles.attribution}>
        <p>{tms.results.supporting}</p>
        <a href={tms.source.url}>{tms.results.attribution}</a>
      </div>
    </section>
  );
}
```

## components/sections/tms/FinancialChapter.tsx

```tsx
import {
  tmsFinancials,
  tmsStory,
  storyAssets,
  storyChapters,
} from "@/content/tms";
import { ChapterScene } from "@/components/story/ChapterScene";
export default function FinancialChapter() {
  const chapter = storyChapters[6];
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={tmsStory.financials.eyebrow}
      title={tmsStory.financials.title}
      description={tmsStory.financials.description}
      asset={storyAssets.resolution}
      light
      features={tmsFinancials.features}
    />
  );
}
```

## components/sections/tms/LoadChapter.tsx

```tsx
import {
  tmsLoadOperations,
  tmsStory,
  storyAssets,
  storyChapters,
} from "@/content/tms";
import { ChapterScene } from "@/components/story/ChapterScene";
export default function LoadChapter() {
  const chapter = storyChapters[4];
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={tmsStory.loads.eyebrow}
      title={tmsStory.loads.title}
      description={tmsStory.loads.description}
      asset={storyAssets.journey}
      features={tmsLoadOperations.features}
    />
  );
}
```

## components/sections/tms/MaintenanceChapter.tsx

```tsx
import {
  tmsMaintenance,
  tmsStory,
  storyAssets,
  storyChapters,
} from "@/content/tms";
import { ChapterScene } from "@/components/story/ChapterScene";
export default function MaintenanceChapter() {
  const chapter = storyChapters[5];
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={tmsStory.maintenance.eyebrow}
      title={tmsStory.maintenance.title}
      description={tmsStory.maintenance.description}
      asset={storyAssets.maintenancePhoto}
      pinned
      features={tmsMaintenance.features}
    />
  );
}
```

## components/sections/tms/OpeningChapter.tsx

```tsx
"use client";
import { m, useTransform } from "framer-motion";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import { tms, tmsStory, storyAssets } from "@/content/tms";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { StoryFilm } from "@/components/story/StoryFilm";
import styles from "@/components/story/Story.module.css";

export default function OpeningChapter() {
  const { ref, progress } = useChapterProgress<HTMLDivElement>(true);
  const { enabled } = useStoryMotion();
  const y = useTransform(progress, [0, 1], [0, -18]);
  return (
    <section
      id="tms-intro"
      aria-labelledby="tms-title"
      className={styles.opening}
    >
      <div ref={ref} className={styles.heroTrack} data-tms-pin>
        <div className={styles.heroStage}>
          <StoryFilm asset={storyAssets.convergence} progress={progress} hero />
          <m.div className={styles.heroCopy} style={{ y: enabled ? y : 0 }}>
            <p className={styles.chapterLabel}>{tmsStory.hero.eyebrow}</p>
            <h1 id="tms-title">{tmsStory.hero.title}</h1>
            <p className={styles.lead}>{tmsStory.hero.description}</p>
            <div className={styles.actions}>
              <ActionLink
                href={tms.action.href}
                className={styles.primary}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {tms.action.label}
              </ActionLink>
              <a href="#tms-capabilities" className={styles.secondary}>
                {tmsStory.hero.secondary}
                <ArrowDownIcon aria-hidden="true" />
              </a>
            </div>
            <p className={styles.scrollHint}>
              <ArrowDownIcon aria-hidden="true" />
              {tmsStory.scrollHint}
            </p>
          </m.div>
        </div>
      </div>
      <div className={styles.coverage}>
        <a href={tms.source.url}>{tms.coverage.sourceLabel}</a>
        <ul>
          {tms.coverage.publishers.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

## components/sections/tms/OverviewChapter.tsx

```tsx
import { tmsStory, storyAssets, storyChapters } from "@/content/tms";
import { ChapterScene } from "@/components/story/ChapterScene";
export default function OverviewChapter() {
  const chapter = storyChapters[2];
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={tmsStory.overview.eyebrow}
      title={tmsStory.overview.title}
      description={tmsStory.overview.description}
      asset={storyAssets.fuel}
      scrub={false}
      pinned
      features={tmsStory.overview.features}
    />
  );
}
```

## components/sections/tms/VisibilityChapter.tsx

```tsx
import {
  tmsVisibility,
  tmsStory,
  storyAssets,
  storyChapters,
} from "@/content/tms";
import { ChapterScene } from "@/components/story/ChapterScene";
export default function VisibilityChapter() {
  const chapter = storyChapters[3];
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={tmsStory.visibility.eyebrow}
      title={tmsStory.visibility.title}
      description={tmsStory.visibility.description}
      asset={storyAssets.dashboard}
      scrub={false}
      light
      features={tmsVisibility.features}
    />
  );
}
```

## components/story/ChapterRail.tsx

```tsx
"use client";
import { useEffect, useMemo, useRef } from "react";
import { PauseIcon } from "@phosphor-icons/react/dist/ssr/Pause";
import { PlayIcon } from "@phosphor-icons/react/dist/ssr/Play";
import type { StoryChapter } from "@/content/story";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import useActiveChapter from "@/components/motion/useActiveChapter";
import styles from "@/components/story/Story.module.css";
export function ChapterRail({
  chapters,
  label,
  pauseLabel,
  resumeLabel,
  className = "",
}: {
  chapters: readonly StoryChapter[];
  label: string;
  pauseLabel: string;
  resumeLabel: string;
  className?: string;
}) {
  const ids = useMemo(() => chapters.map((chapter) => chapter.id), [chapters]);
  const navigation = useRef<HTMLElement>(null);
  const { active, visible } = useActiveChapter(ids);
  const { heroEligible, paused, toggle } = useStoryMotion();
  useEffect(() => {
    const list = navigation.current?.querySelector("ol");
    const link = list?.querySelector<HTMLElement>("[aria-current]");
    if (!list || !link || window.innerWidth >= 1024) return;
    list.scrollTo({
      left:
        link.offsetLeft -
        list.offsetLeft -
        list.clientWidth / 2 +
        link.offsetWidth / 2,
      behavior: "instant",
    });
  }, [active]);
  return (
    <nav
      ref={navigation}
      className={`${styles.chapterNav} ${className}`}
      data-opening={active === 0 || undefined}
      aria-label={label}
      hidden={!visible}
    >
      <ol>
        {chapters.map((chapter, index) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              aria-label={`${chapter.number} ${chapter.label}`}
              title={chapter.label}
              aria-current={active === index ? "location" : undefined}
            >
              {chapter.number}
            </a>
          </li>
        ))}
      </ol>
      {heroEligible && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          aria-label={paused ? resumeLabel : pauseLabel}
        >
          {paused ? (
            <PlayIcon aria-hidden="true" />
          ) : (
            <PauseIcon aria-hidden="true" />
          )}
        </button>
      )}
    </nav>
  );
}
```

## components/story/ChapterScene.tsx

```tsx
"use client";
import { m, useTransform } from "motion/react";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import type { StoryAsset, FeatureGroup } from "@/content/story";
import { StoryFilm } from "./StoryFilm";
import { NarrativeBeats } from "./NarrativeBeats";
import { FeatureList } from "./FeatureList";
import Reveal from "@/components/Reveal";
import styles from "@/components/story/Story.module.css";

export function ChapterScene({
  id,
  number,
  label,
  title,
  description,
  paragraphs = [],
  className = "",
  asset,
  features,
  pinned = false,
  light = false,
  scrub = true,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  paragraphs?: readonly string[];
  className?: string;
  asset: StoryAsset;
  features: readonly FeatureGroup[];
  pinned?: boolean;
  light?: boolean;
  scrub?: boolean;
}) {
  const { enabled, cinematic } = useStoryMotion();
  const { ref, progress } = useChapterProgress(pinned && cinematic);
  const { ref: mediaRef, progress: mediaProgress } =
    useChapterProgress<HTMLDivElement>();
  const y = useTransform(mediaProgress, [0, 1], [20, -20]);
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      data-tms-pin={pinned || undefined}
      className={`${styles.chapter} ${pinned ? styles.pinChapter : ""} ${light ? styles.light : styles.dark} ${className}`}
    >
      <div
        className={pinned ? styles.stickyScene : styles.scene}
        data-cinematic={(pinned && cinematic) || undefined}
      >
        <div className={styles.sceneLayout}>
          <Reveal className={styles.sceneCopy}>
            <div>
              <p className={styles.chapterLabel}>
                <span>{number}</span>
                {label}
              </p>
              <h2 id={`${id}-title`}>{title}</h2>
            </div>
            <div>
              <p className={styles.lead}>{description}</p>
              {paragraphs.map((paragraph) => (
                <p className={styles.lead} key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <m.div
            ref={mediaRef}
            className={styles.sceneMedia}
            style={{ y: enabled && !pinned ? y : 0 }}
          >
            <StoryFilm
              asset={asset}
              scrub={scrub}
              progress={pinned && cinematic ? progress : mediaProgress}
            />
          </m.div>
          {features.length > 0 &&
            (pinned ? (
              <NarrativeBeats
                features={features}
                progress={progress}
                sectionId={id}
              />
            ) : (
              <FeatureList features={features} compact />
            ))}
        </div>
      </div>
    </section>
  );
}
```

## components/story/FeatureList.tsx

```tsx
import type { FeatureGroup } from "@/content/story";
import styles from "@/components/story/Story.module.css";
export function FeatureList({
  features,
  compact = false,
  light = false,
}: {
  features: readonly FeatureGroup[];
  compact?: boolean;
  light?: boolean;
}) {
  return (
    <ul
      className={`${styles.features} ${compact ? styles.compact : ""} ${light ? styles.light : ""}`}
    >
      {features.map((feature, index) => (
        <li key={feature.title}>
          <span className={styles.featureNumber} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            {feature.details && (
              <ul className={styles.details}>
                {feature.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
```

## components/story/NarrativeBeats.tsx

```tsx
"use client";
import { useState } from "react";
import { m, useMotionValueEvent, type MotionValue } from "motion/react";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import type { FeatureGroup } from "@/content/story";
import styles from "@/components/story/Story.module.css";

export function NarrativeBeats({
  features,
  progress,
  sectionId,
}: {
  features: readonly FeatureGroup[];
  progress: MotionValue<number>;
  sectionId: string;
}) {
  const { enabled, cinematic: eligible } = useStoryMotion();
  const [current, setCurrent] = useState(0);
  useMotionValueEvent(progress, "change", (value) => {
    if (!enabled) return;
    const next = Math.min(
      features.length - 1,
      Math.floor(Math.max(0, value) * features.length),
    );
    setCurrent((previous) => (previous === next ? previous : next));
  });
  const jump = (index: number) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const header =
      document.querySelector("header")?.getBoundingClientRect().height ?? 88;
    const top = section.getBoundingClientRect().top + window.scrollY - header;
    const travel = section.offsetHeight - window.innerHeight + header;
    setCurrent(index);
    window.scrollTo({
      top: top + travel * ((index + 0.25) / features.length),
      behavior: enabled ? "smooth" : "instant",
    });
  };
  return (
    <div className={styles.beats} data-sequenced={eligible || undefined}>
      {eligible && (
        <div className={styles.beatIndex}>
          {features.map((feature, index) => (
            <button
              key={feature.title}
              type="button"
              onClick={() => jump(index)}
              aria-label={feature.title}
              aria-pressed={index === current}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      )}
      <ol>
        {features.map((feature, index) => (
          <li key={feature.title} hidden={eligible && index !== current}>
            <m.div
              initial={false}
              animate={enabled && index === current ? { y: [12, 0] } : { y: 0 }}
              key={`${index}-${eligible && index === current}`}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </m.div>
          </li>
        ))}
      </ol>
    </div>
  );
}
```

## components/story/Story.module.css

```css
.story {
  background: var(--tms-ink);
  font-size: var(--tms-body);
}
.story section {
  scroll-margin-top: calc(var(--header-height) + var(--space-5));
}
.dark,
.opening {
  color: var(--color-surface);
  background: var(--tms-ink);
}
.light {
  color: var(--tms-ink);
  background: var(--tms-light);
}
.chapterLabel {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  font-size: var(--tms-caption);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  line-height: 1.5;
}
.chapterLabel > span {
  color: var(--color-pale);
}
.light .chapterLabel > span,
.contact .chapterLabel > span {
  color: var(--color-body);
}
.chapterLabel::before {
  content: "";
  width: var(--space-2);
  height: var(--space-2);
  border-radius: var(--radius-circle);
  background: var(--color-accent);
  flex-shrink: 0;
}
.story h2 {
  font-size: var(--tms-heading);
  line-height: 1.1;
  letter-spacing: -0.045em;
  font-weight: 600;
  text-wrap: balance;
}
.lead {
  font-size: var(--tms-lead);
  line-height: 1.5;
  max-width: 45ch;
}
.opening {
  position: relative;
  isolation: isolate;
}
.heroStage {
  position: relative;
  min-height: calc(100svh - var(--header-height));
  overflow: hidden;
}
.heroCopy {
  position: relative;
  z-index: 1;
  width: min(58%, 880px);
  padding: var(--space-7) var(--tms-gutter);
}
.heroCopy h1 {
  font-size: var(--tms-title);
  line-height: 1.04;
  letter-spacing: -0.055em;
  max-width: 12ch;
  margin-block: var(--space-6);
}
.heroCopy .lead {
  color: var(--tms-pale);
  max-width: 34ch;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-7);
}
.primary {
  min-height: var(--space-8);
  border-radius: var(--radius-control);
  padding: var(--space-4) var(--space-5);
  background: var(--color-pale);
  color: var(--tms-ink);
  white-space: normal;
  text-align: center;
}
.primary:hover {
  background: var(--color-surface);
}
.primary svg,
.secondary svg {
  width: var(--space-5);
  height: var(--space-5);
  flex-shrink: 0;
  transition: transform 160ms var(--tms-ease);
}
.primary:hover svg {
  transform: translate(2px, -2px);
}
.secondary:hover svg {
  transform: translateY(3px);
}
.secondary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  min-height: var(--space-8);
  padding: var(--space-4) var(--space-2);
  border-bottom: var(--rule-width) solid var(--color-control);
  font-weight: 600;
}
.opening a:focus-visible,
.dark a:focus-visible {
  outline-color: var(--color-pale);
}
.scrollHint {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-7);
  font-size: var(--tms-caption);
  color: var(--color-pale);
}
.scrollHint svg {
  width: var(--space-4);
  height: var(--space-4);
}
.film {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: var(--tms-ink);
}
.filmLayer {
  position: absolute;
  inset: 0;
}
.poster,
.video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.video {
  opacity: 0;
}
.videoReady {
  opacity: 1;
}
.heroFilm {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.coverage {
  position: relative;
  z-index: 2;
  background: var(--tms-ink);
  padding: var(--space-6) var(--tms-gutter);
  border-top: var(--rule-width) solid var(--color-control);
}
.coverage a {
  display: inline-flex;
  align-items: center;
  min-height: var(--tms-control);
  color: var(--color-pale);
  font-size: var(--tms-caption);
  text-decoration: underline;
  text-underline-offset: var(--space-1);
}
.coverage ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3) var(--space-6);
  color: var(--color-pale);
  font-weight: 600;
}
.evidence {
  padding: var(--tms-space) var(--tms-gutter);
}
.evidenceHead {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--tms-gap);
  align-items: end;
}
.evidence h2 {
  max-width: 12ch;
  margin-top: var(--space-6);
}
.evidence .lead {
  color: var(--color-body);
}
.metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: var(--space-8) 0 var(--space-7);
  gap: var(--space-6);
}
.metrics > div {
  border-top: var(--rule-width) solid var(--color-control);
  padding-top: var(--space-5);
  display: flex;
  flex-direction: column-reverse;
  gap: var(--space-4);
}
.metrics dt {
  font-size: var(--tms-body);
  color: var(--color-body);
  max-width: 23ch;
}
.metrics dd {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--tms-number);
  line-height: 1;
  letter-spacing: -0.05em;
  font-weight: 600;
}
.attribution {
  color: var(--color-muted);
  font-size: var(--tms-caption);
  max-width: 85ch;
}
.attribution a {
  display: inline-flex;
  align-items: center;
  min-height: var(--tms-control);
  text-decoration: underline;
  text-underline-offset: var(--space-1);
}
.scene,
.stickyScene {
  padding-block: var(--tms-space);
}
.sceneLayout {
  width: min(calc(100% - var(--tms-gutter) * 2), var(--tms-width));
  margin-inline: auto;
}
.sceneCopy {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--tms-gap);
  align-items: end;
  margin-bottom: var(--space-7);
}
.sceneCopy h2 {
  max-width: 17ch;
  margin-top: var(--space-6);
}
.dark .lead {
  color: var(--color-pale);
}
.light .lead {
  color: var(--color-body);
}
.sceneMedia {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--tms-scene-radius);
  overflow: hidden;
}
.features {
  margin-top: var(--space-7);
}
.features > li {
  border-top: var(--rule-width) solid var(--color-control);
  padding-block: var(--space-5);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-4);
}
.featureNumber {
  font-size: var(--tms-caption);
  line-height: 2;
  color: var(--color-pale);
}
.light .featureNumber,
.features.light .featureNumber {
  color: var(--color-primary-strong);
}
.features h3,
.beats h3 {
  font-size: var(--tms-subheading);
  font-family: var(--font-body);
  letter-spacing: -0.01em;
  line-height: 1.3;
}
.features p,
.beats p {
  margin-top: var(--space-2);
  font-size: var(--tms-body);
  line-height: 1.5;
  color: var(--color-pale);
}
.light .features p,
.features.light p {
  color: var(--color-body);
}
.compact {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 var(--tms-gap);
}
.details {
  padding-left: var(--space-4);
  margin-top: var(--space-2);
  list-style: disc;
  color: var(--color-pale);
  font-size: var(--tms-body);
}
.light .details {
  color: var(--color-body);
}
.beats {
  margin-top: var(--space-7);
}
.beats ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-6) var(--tms-gap);
}
.beats li {
  border-top: var(--rule-width) solid var(--color-control);
  padding-top: var(--space-5);
}
.beats li[hidden] {
  display: none;
}
.beatIndex {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}
.beatIndex button {
  min-width: 44px;
  min-height: 44px;
  color: var(--color-pale);
  border: var(--rule-width) solid var(--color-control);
  background: var(--tms-ink);
  border-radius: var(--radius-circle);
  font-size: var(--tms-caption);
}
.beatIndex button[aria-pressed="true"] {
  color: var(--tms-ink);
  background: var(--color-pale);
}
.beatIndex button:focus-visible {
  outline-color: var(--color-pale);
}
.contact {
  padding: var(--tms-space) var(--tms-gutter);
  background: var(--color-pale);
  color: var(--tms-ink);
}
.contact h2 {
  font-size: var(--tms-title);
  max-width: 15ch;
  margin-block: var(--space-7) var(--space-8);
}
.contactBottom {
  display: flex;
  gap: var(--tms-gap);
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-6);
  border-top: var(--rule-width) solid var(--color-control);
}
.contact .primary {
  background: var(--color-primary-strong);
  color: var(--color-surface);
  flex-shrink: 0;
}
.chapterNav {
  position: fixed;
  bottom: var(--space-5);
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border: var(--rule-width) solid var(--color-control);
  border-radius: var(--radius-control);
  background: var(--tms-ink);
  color: var(--color-pale);
  max-width: calc(100vw - var(--space-6));
}
.chapterNav[hidden] {
  display: none;
}
.chapterNav ol {
  display: flex;
  gap: var(--space-1);
  padding: 0;
  margin: 0;
  list-style: none;
  overflow-x: auto;
}
.chapterNav a,
.chapterNav button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  font-size: var(--tms-caption);
  border-radius: var(--radius-control);
}
.chapterNav a[aria-current] {
  background: var(--color-pale);
  color: var(--tms-ink);
}
.chapterNav a:focus-visible,
.chapterNav button:focus-visible {
  outline-color: var(--color-pale);
  outline-offset: 0;
}
.chapterNav button {
  flex-shrink: 0;
  border: var(--rule-width) solid var(--color-control);
  background: transparent;
  color: var(--color-pale);
}
.chapterNav svg {
  width: var(--space-4);
  height: var(--space-4);
}
@media (min-width: 1024px) {
  .chapterNav {
    top: 50%;
    right: var(--space-3);
    bottom: auto;
    left: auto;
    transform: translateY(-50%);
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-1);
  }
  .chapterNav ol {
    flex-direction: column;
    gap: 0;
    overflow: visible;
  }
}
@media (min-width: 1024px) and (min-height: 850px) and (prefers-reduced-motion: no-preference) {
  .heroTrack {
    min-height: var(--tms-hero-distance);
  }
  .heroStage {
    position: sticky;
    top: var(--header-height);
    height: calc(100svh - var(--header-height));
  }
  .heroStage::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(90deg, var(--tms-ink-overlay), transparent 68%);
  }
  .heroCopy {
    z-index: 2;
  }
  .pinChapter {
    min-height: var(--tms-pin-distance);
  }
  .stickyScene {
    position: sticky;
    top: var(--header-height);
    min-height: calc(100svh - var(--header-height));
  }
  .stickyScene[data-cinematic] {
    height: calc(100svh - var(--header-height));
    padding: 0;
  }
  .stickyScene[data-cinematic] .sceneLayout {
    position: relative;
    width: 100%;
    height: 100%;
    isolation: isolate;
  }
  .stickyScene[data-cinematic] .sceneMedia {
    position: absolute;
    inset: 0;
    border-radius: 0;
    height: 100%;
    aspect-ratio: auto;
    z-index: -2;
  }
  .stickyScene[data-cinematic] .sceneLayout::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      var(--tms-ink),
      var(--tms-ink-overlay) 40%,
      transparent 74%
    );
    z-index: -1;
    pointer-events: none;
  }
  .stickyScene[data-cinematic] .sceneCopy {
    position: absolute;
    left: var(--tms-gutter);
    top: var(--space-7);
    display: block;
    width: min(42%, var(--tms-caption-width));
    margin: 0;
    padding: 0;
  }
  .stickyScene[data-cinematic] h2 {
    font-size: var(--tms-pin-heading);
    max-width: 15ch;
    margin-block: var(--space-5);
  }
  .stickyScene[data-cinematic] .lead {
    font-size: var(--tms-body);
    max-width: 35ch;
  }
  .stickyScene[data-cinematic] .beats {
    position: absolute;
    left: var(--tms-gutter);
    bottom: var(--space-7);
    width: min(42%, var(--tms-caption-width));
    margin: 0;
    padding-top: var(--space-5);
    border-top: var(--rule-width) solid var(--color-control);
  }
  .beats[data-sequenced] ol {
    display: block;
  }
  .beats[data-sequenced] li {
    border-top: 0;
    padding-top: 0;
  }
  .beats[data-sequenced] h3 {
    font-size: var(--tms-beat-heading);
  }
}
@media (max-width: 1199px) {
  .heroCopy h1 {
    font-size: var(--tms-tablet-title);
  }
}
@media (max-width: 1023px), (max-height: 849px) {
  .heroStage {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .heroCopy {
    width: 100%;
    padding-bottom: var(--space-7);
    order: -1;
  }
  .heroCopy h1 {
    max-width: 14ch;
  }
  .heroCopy .lead {
    max-width: 45ch;
  }
  .heroFilm {
    position: relative;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }
  .scrollHint {
    display: none;
  }
  .contactBottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
@media (max-width: 1023px) {
  .sceneCopy {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }
  .sceneCopy h2 {
    max-width: 19ch;
  }
  .metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-7) var(--space-6);
  }
}
@media (max-width: 767px) {
  .evidenceHead {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  .evidence h2 {
    max-width: 15ch;
  }
  .heroCopy h1 {
    font-size: var(--tms-title);
    max-width: 11ch;
  }
  .heroCopy .chapterLabel {
    max-width: 27ch;
  }
  .coverage {
    padding-bottom: var(--space-7);
  }
  .compact,
  .beats ol {
    grid-template-columns: 1fr;
  }
  .chapterNav {
    bottom: var(--space-3);
    width: calc(100vw - var(--space-6));
    padding-inline: var(--space-2);
  }
  .chapterNav ol {
    gap: 0;
  }
  .contact {
    padding-bottom: calc(var(--tms-space) + var(--tms-rail-height));
  }
  .sceneMedia {
    border-radius: var(--radius-panel);
  }
}
@media (max-width: 399px) {
  .actions {
    flex-direction: column;
  }
  .primary {
    width: 100%;
  }
  .secondary {
    align-self: flex-start;
  }
  .metrics {
    gap: var(--space-6) var(--space-4);
  }
  .metrics dd {
    font-size: var(--tms-mobile-number);
  }
}
@media (prefers-reduced-motion: reduce) {
  .pinChapter,
  .heroTrack {
    min-height: 0;
  }
  .stickyScene,
  .heroStage {
    position: relative;
  }
  .primary svg,
  .secondary svg {
    transition: none;
    transform: none;
  }
}
```

## components/story/StoryFilm.tsx

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, type MotionValue } from "motion/react";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { useVideoScrub } from "@/components/motion/useVideoScrub";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import type { StoryAsset } from "@/content/story";
import styles from "@/components/story/Story.module.css";

export function StoryFilm({
  asset,
  progress,
  hero = false,
  scrub = true,
}: {
  asset: StoryAsset;
  progress: MotionValue<number>;
  hero?: boolean;
  scrub?: boolean;
}) {
  const { ref: wrap, progress: ownProgress } =
    useChapterProgress<HTMLDivElement>();
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { enabled, eligible, heroEligible, cinematic, paused } =
    useStoryMotion();
  const scrubEligible = hero ? heroEligible : eligible;
  const inView = useInView(wrap, { margin: "150px 0px 150px 0px" });
  const entered = useInView(wrap, {
    margin: "450px 0px 450px 0px",
    once: true,
  });
  const mounted =
    asset.kind !== "image" &&
    entered &&
    (scrub ? scrubEligible : true) &&
    !failed;
  const active =
    scrub && (hero ? heroEligible && !paused : enabled) && inView && mounted;
  useVideoScrub(video, hero && !cinematic ? ownProgress : progress, active);
  useEffect(() => {
    const element = video.current;
    if (scrub || !element) return;
    if (inView && !paused) void element.play().catch(() => {});
    else element.pause();
  }, [scrub, inView, paused, mounted]);
  return (
    <div ref={wrap} className={`${styles.film} ${hero ? styles.heroFilm : ""}`}>
      <div className={styles.filmLayer}>
        <Image
          src={asset.poster}
          fill
          alt={asset.alt}
          sizes="(min-width: 1440px) 1440px, 100vw"
          preload={hero}
          className={styles.poster}
        />
        {mounted && (
          <video
            ref={video}
            src={asset.src}
            width={asset.width}
            height={asset.height}
            muted
            loop={!scrub}
            controls={!scrub}
            playsInline
            preload="auto"
            aria-hidden={scrub ? true : undefined}
            aria-label={scrub ? undefined : asset.alt}
            tabIndex={scrub ? -1 : 0}
            className={`${styles.video} ${ready ? styles.videoReady : ""}`}
            onLoadStart={() => setReady(false)}
            onLoadedData={() => setReady(true)}
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}
```

## content/home.ts

```ts
export type SiteLink = { label: string; href: string; description?: string };
export type Product = {
  id: "lens" | "crm" | "driver-app" | "tms" | "sentinel" | "extension";
  name: string;
  category: string;
  title: string;
  description: string;
  href: string;
  steps: readonly string[];
  copyStatus: "rewrite";
};
const site = "https://spotter.ai";
export const quoteLink = {
  label: "Request a demo or quote",
  href: `${site}/request-quote`,
};
export const navigation: { label: string; items: SiteLink[] }[] = [
  {
    label: "Products",
    items: [
      {
        label: "Spotter TMS",
        href: "/tms",
        description: "Bring your operations into view.",
      },
      {
        label: "Sentinel",
        href: `${site}/sentinel`,
        description: "Make safety part of the workflow.",
      },
      {
        label: "Spotter Lens",
        href: "/lens",
        description: "Understand the freight market.",
      },
      {
        label: "Driver App",
        href: "/driversapp",
        description: "Find a better fit for the next load.",
      },
      {
        label: "Claims OS",
        href: "/claims-os",
        description: "Keep claims moving toward resolution.",
      },
      {
        label: "Load Spotter",
        href: "/extension",
        description: "Simplify the load-board search.",
      },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Fleet Management", href: "/tms" },
      { label: "Safety & Compliance", href: `${site}/sentinel` },
      { label: "Market Intelligence", href: "/lens" },
      { label: "Owner-Operators", href: "/driversapp" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Insights", href: `${site}/insights` },
      { label: "Watch a Demo", href: "/watch-demo" },
      { label: "Chrome Extension", href: "/extension" },
      { label: "Loan Calculators", href: `${site}/loan-calculators` },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About Spotter", href: "/about" },
      { label: "Contact Sales", href: quoteLink.href },
      { label: "Careers", href: "https://careers.spotter.ai/" },
    ],
  },
];
export const insights: SiteLink[] = [
  {
    label: "New tools for hiring and compliance",
    href: `${site}/insights/spotter-ai-expands-sentinel-platform-ai-powered-hiring-verification-compliance-solutions`,
  },
  {
    label: "AI and driver retention",
    href: `${site}/insights/role-ai-driver-retention-keeping-best-people-road`,
  },
  {
    label: "Sentinel in the industry press",
    href: `${site}/insights/sentinel-gains-coverage-leading-trucking-logistics-publications`,
  },
  {
    label: "The role of a TMS in 2026",
    href: `${site}/insights/why-every-fleet-needs-transportation-management-system-2026`,
  },
  {
    label: "Updates to Spotter TMS",
    href: `${site}/insights/spotter-tms-releases-major-platform-updates-fleet-reliability-operational-efficiency`,
  },
  {
    label: "Introducing Sentinel",
    href: `${site}/insights/spotter-ai-launches-sentinel-to-cut-hiring-costs-and-improve-trucking-safety`,
  },
  {
    label: "Spotter’s 2026 workplace recognition",
    href: `${site}/insights/spotter-named-2026-usa-today-top-workplace-ai-platform-transforms-trucking-industry`,
  },
];
export const products: Product[] = [
  {
    id: "lens",
    name: "Spotter Lens",
    category: "Market intelligence",
    title: "See the market before you make your move.",
    description:
      "Explore freight rankings and pricing insights in real time. Put market context behind your next operational decision.",
    href: "/lens",
    steps: ["Market signals", "Rankings & pricing", "An informed decision"],
    copyStatus: "rewrite",
  },
  {
    id: "crm",
    name: "Spotter CRM",
    category: "Recruiting",
    title: "Keep recruiting progress in sight.",
    description:
      "Follow engagement and recruiting performance in one place, so your team can see where the process stands.",
    href: quoteLink.href,
    steps: [
      "Recruiting activity",
      "Engagement tracking",
      "Performance visibility",
    ],
    copyStatus: "rewrite",
  },
  {
    id: "driver-app",
    name: "Driver App",
    category: "Load selection",
    title: "Make the next load a better fit.",
    description:
      "Use AI-assisted load scoring and matching to evaluate your options, with performance information available as you go.",
    href: "/driversapp",
    steps: ["Available loads", "Scoring & matching", "Your next move"],
    copyStatus: "rewrite",
  },
  {
    id: "tms",
    name: "Spotter TMS",
    category: "Fleet operations",
    title: "Bring the moving parts together.",
    description:
      "Manage transportation workflows with clearer operational visibility and automated data handling.",
    href: "/tms",
    steps: ["Operational data", "Workflow automation", "A clearer fleet view"],
    copyStatus: "rewrite",
  },
  {
    id: "sentinel",
    name: "Sentinel",
    category: "Safety & compliance",
    title: "Put safety into the everyday workflow.",
    description:
      "Bring driver scoring, safety automation, and compliance monitoring into the way your team works.",
    href: `${site}/sentinel`,
    steps: ["Driver information", "Scoring & monitoring", "Safety visibility"],
    copyStatus: "rewrite",
  },
  {
    id: "extension",
    name: "Load Board Extension",
    category: "Browser automation",
    title: "Spend less effort on the search.",
    description:
      "Simplify load-board workflows with filtering and browser automation for Chrome and Firefox.",
    href: "/extension",
    steps: [
      "Load-board listings",
      "Filtering & automation",
      "A focused search",
    ],
    copyStatus: "rewrite",
  },
];
export const home = {
  hero: {
    eyebrow: "Trucking automation, connected",
    title: "trucking automation that works for you",
    lines: ["trucking automation", "that works for you"],
    description:
      "From the freight market to the people behind the wheel, give your team the tools to see more clearly and keep operations moving.",
    secondary: "Explore the suite",
    copyStatus: "rewrite",
  },
  capabilities: {
    eyebrow: "Built around your operation",
    title: "The right tool.\nThe bigger picture.",
    description:
      "Six focused products for the decisions, workflows, and people that keep freight moving.",
    copyStatus: "rewrite",
  },
  results: {
    eyebrow: "The impact in view",
    title: "Built for work.\nMeasured in outcomes.",
    description: "A snapshot of the platform’s reach, as reported by Spotter.",
    source:
      "Platform figures published on spotter.ai, observed October 8, 2026.",
    copyStatus: "rewrite",
  },
  metrics: [
    { value: "10K+", label: "Fleet managers active daily" },
    { value: "2.8M+", label: "Load matches processed monthly" },
    { value: "$50M+", label: "Savings reported across customers" },
    { value: "96.7%", label: "Reported market prediction accuracy" },
  ],
  customer: {
    eyebrow: "A customer’s perspective",
    title: "More clarity. Less operational friction.",
    summary:
      "Road King Express owner Marius Stašauskas reports a 40% reduction in operational costs and 60% faster load matching, with AI insights helping the team make decisions.",
    name: "Marius Stašauskas",
    role: "Owner, Road King Express",
    note: "Summary of a customer testimonial published by Spotter.",
    copyStatus: "rewrite",
  },
  awardsTitle: "Recognition for the people behind the platform",
  closing: {
    eyebrow: "Your next move",
    title: "Let’s talk about your operation.",
    description:
      "Tell us where you want a clearer view, from dispatch and recruiting to safety. We’ll help you explore the Spotter tools that fit.",
    partnersTitle: "Alongside teams across freight",
    copyStatus: "rewrite",
  },
  footerDescription:
    "Tools for the people who move freight: brokers, carriers, and drivers.",
};
export const awards = [
  {
    src: "/brand/awards/workplace-2025.webp",
    alt: "2025 Top Workplaces recognition, CareerBuilder and Monster",
    width: 121,
    height: 200,
  },
  {
    src: "/brand/awards/workplace-2026.webp",
    alt: "2026 USA Today Top Workplaces recognition",
    width: 122,
    height: 200,
  },
  {
    src: "/brand/awards/development.webp",
    alt: "2025 Top Workplaces professional development award",
    width: 168,
    height: 200,
  },
  {
    src: "/brand/awards/wellbeing.webp",
    alt: "2025 Top Workplaces employee well-being award",
    width: 135,
    height: 200,
  },
  {
    src: "/brand/awards/appreciation.webp",
    alt: "2025 Top Workplaces appreciation award by Nectar",
    width: 123,
    height: 200,
  },
];
export const partners = [
  {
    src: "/brand/partners/king-express.png",
    alt: "King Express",
    width: 180,
    height: 183,
  },
  { src: "/brand/partners/mm.webp", alt: "M&M", width: 400, height: 223 },
  {
    src: "/brand/partners/qwtrucks.png",
    alt: "QW Trucks",
    width: 147,
    height: 74,
  },
  { src: "/brand/partners/ampro.png", alt: "Ampro", width: 179, height: 78 },
];
export const footerGroups = [
  {
    label: "Products",
    links: [
      { label: "Spotter App", href: "/driversapp" },
      { label: "Extension", href: "/extension" },
      { label: "TMS", href: "/tms" },
      { label: "Lens", href: "/lens" },
      { label: "Sentinel", href: `${site}/sentinel` },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "https://careers.spotter.ai/" },
      { label: "Contact", href: quoteLink.href },
      { label: "Insights", href: `${site}/insights` },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy Policy", href: `${site}/privacy-policy` },
      { label: "Terms of Service", href: `${site}/terms-and-services` },
      { label: "CCPA", href: `${site}/ccpa` },
    ],
  },
];
export const downloads = [
  {
    label: "App Store",
    href: "https://apps.apple.com/us/app/spotter-ai/id1670506993",
  },
  {
    label: "Google Play",
    href: "https://play.google.com/store/apps/details?id=com.spotter.ai&pcampaignid=web_share",
  },
];
export const social = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/spotter-sentinel/about/?viewAsMember=true",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Spotter-Sentinel/61577984011373/",
  },
  { label: "Instagram", href: "https://www.instagram.com/sentinel.safety/" },
];

export const heroImages = [
  {
    src: "/images/hero/fleet-dawn.webp",
    alt: "Teal semi truck and dry-van trailer at a freight terminal in early daylight",
    caption: "The fleet on the road.",
  },
  {
    src: "/images/hero/dispatch-daylight.webp",
    alt: "Fleet operations manager working at a laptop beside a window overlooking a freight yard",
    caption: "The team behind it.",
  },
] as const;
```

## content/story.ts

```ts
export type FeatureGroup = {
  title: string;
  description: string;
  details?: readonly string[];
};

export type StoryAsset = {
  kind?: "image";
  id: string;
  src: string;
  poster: string;
  sourceFile: string;
  sourceUrl: string;
  source: "client supplied" | "source page" | "generated";
  status?: "client asset" | "licensed stock" | "placeholder";
  license: string;
  alt: string;
  width: number;
  height: number;
  duration: number;
  bytes: number;
};

export type StoryChapter = { id: string; number: string; label: string };
```

## content/tms.ts

```ts
export type ProductPhotoAsset = {
  id: string;
  status: "client asset" | "licensed stock" | "placeholder";
  src: string | null;
  sourceUrl: string | null;
  license: string | null;
  width: number;
  height: number;
  alt: string;
  placeholder: string;
};
import type { FeatureGroup, StoryAsset } from "./story";
export type { FeatureGroup, StoryAsset } from "./story";
export type ProductSectionContent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  copyStatus: "reuse" | "rewrite";
  image: ProductPhotoAsset;
  features: readonly FeatureGroup[];
};

export const tmsImages: Record<string, ProductPhotoAsset> = {
  hero: {
    id: "tms-hero",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "trucking fleet photograph",
    placeholder: "ASSET NEEDED: trucking fleet photograph",
  },
  visibility: {
    id: "tms-visibility",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "fleet operations team photograph",
    placeholder: "ASSET NEEDED: fleet operations team photograph",
  },
  loads: {
    id: "tms-loads",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "truck loading at a freight terminal photograph",
    placeholder: "ASSET NEEDED: truck loading at a freight terminal photograph",
  },
  maintenance: {
    id: "tms-maintenance",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "truck maintenance workshop photograph",
    placeholder: "ASSET NEEDED: truck maintenance workshop photograph",
  },
  financials: {
    id: "tms-financials",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "fleet office financial workflow photograph",
    placeholder: "ASSET NEEDED: fleet office financial workflow photograph",
  },
};

export const tms = {
  source: {
    url: "https://spotter.ai/tms",
    observed: "October 8, 2026",
  },
  copyStatus: "reuse",
  metadata: {
    title: "Spotter TMS: Fleet Operations",
    description:
      "Explore Spotter TMS for fleet visibility, dispatch, maintenance and financial workflows. Request a demo or quote for your operation.",
    url: "https://spotter.ai/tms",
    siteName: "Spotter.ai",
  },
  action: {
    label: "Book a Demo",
    href: "https://spotter.ai/request-quote?product=tms",
    copyStatus: "reuse",
  },
  hero: {
    eyebrow: "Spotter TMS",
    title: "Finally, TMS Built For Dispatchers",
    description: "Automated AI Fuel Savings. Only TMS that pays for itself.",
    secondary: "Essential Fleet Management Tools",
    secondaryHref: "#tms-capabilities",
    image: {
      id: "tms-hero",
      status: "placeholder" as const,
      src: null,
      sourceUrl: null,
      license: null,
      width: 1200,
      height: 900,
      alt: "trucking fleet photograph",
      placeholder: "ASSET NEEDED: trucking fleet photograph",
    },
  },
  coverage: {
    title: "BUILT FOR THE INDUSTRY. FEATURED BY THE BEST.",
    publishers: [
      "Transport Dive",
      "Medium",
      "Fusable",
      "Fleet Owner",
      "Fleet News Daily",
      "Heavy Duty Trucking",
    ],
    sourceLabel: "BUILT FOR THE INDUSTRY. FEATURED BY THE BEST.",
    namesStatus: "reuse",
  },
  results: {
    eyebrow: "Reported outcomes",
    title: "Proven Performance Results",
    description: "Trusted by 500+ fleets across North America",
    supporting: "4.8/5 Rating",
    attribution:
      "Source: Spotter TMS page, observed October 8, 2026. These figures have not been independently verified.",
    metrics: [
      {
        value: "18%",
        label: "Average RPG Improvement",
      },
      {
        value: "12%",
        label: "Fuel Efficiency Gains",
      },
      {
        value: "89%",
        label: "Driver Retention Rate",
      },
      {
        value: "25%",
        label: "Maintenance Savings",
      },
    ],
    figuresStatus: "reuse",
  },
  capabilities: {
    id: "tms-capabilities",
    eyebrow: "Essential Fleet Management Tools",
    title: "Essential Fleet Management Tools",
    description:
      "Everything you need to manage drivers, monitor performance, and optimize your fleet operations in one powerful platform",
    items: [
      {
        title: "Metrics Monitoring",
        description:
          "Monitor key performance indicators including gross revenue, revenue per gallon, and miles per gallon with real-time dashboards and automated reporting.",
      },
      {
        title: "Driver Week Management",
        description:
          "Comprehensive driver week overview showing gross earnings, load assignments, performance metrics, and weekly summaries for optimal driver management.",
      },
      {
        title: "ELD & Wellness Monitoring",
        description:
          "Advanced ELD integration with wellness monitoring, disconnect alerts, and compliance tracking to ensure driver safety and regulatory adherence.",
      },
      {
        title: "Maintenance Management",
        description:
          "Complete maintenance oversight with preventive maintenance scheduling, pre-trip inspections, truck condition tracking, and detailed maintenance notes.",
      },
      {
        title: "Multi-Account Payroll",
        description:
          "Manage different account payrolls with automated calculations, driver settlements, expense tracking, and integrated accounting workflows.",
      },
      {
        title: "Fleet Optimization",
        description:
          "Integrated fleet management combining all core functions for maximum efficiency, cost control, and operational visibility across your entire operation.",
      },
    ],
  },
  contact: {
    eyebrow: "Get Started Today",
    title: "Ready to Transform Your Fleet Operations?",
    description:
      "Join thousands of fleet managers using Spotter TMS to optimize their operations",
  },
};

export const tmsVisibility: ProductSectionContent = {
  id: "tms-visibility",
  eyebrow: "Live Analytics Engine",
  title: "Real-Time Fleet Dashboard & Performance Intelligence",
  description:
    "Monitor your entire fleet operation from a single, intelligent dashboard. Track driver performance, vehicle status, load progress, and financial metrics in real-time with AI-powered insights and predictive analytics.",
  copyStatus: "reuse",
  image: {
    id: "tms-visibility",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "fleet operations team photograph",
    placeholder: "ASSET NEEDED: fleet operations team photograph",
  },
  features: [
    {
      title: "Performance Analytics",
      description:
        "Real-time RPG, MPG, and gross revenue tracking with predictive insights",
    },
    {
      title: "Live Fleet Tracking",
      description:
        "GPS integration with ELD and intelligent route optimization",
    },
    {
      title: "Safety Monitoring",
      description:
        "HOS compliance, driver wellness alerts, and safety score tracking",
    },
    {
      title: "AI Insights",
      description:
        "Machine learning powered recommendations for fleet decision making",
    },
  ],
};

export const tmsLoadOperations: ProductSectionContent = {
  id: "tms-load-operations",
  eyebrow: "Load Operations Engine",
  title: "Advanced Load Management & Intelligent Dispatching",
  description:
    "From dispatch to delivery, manage every aspect of your loads with our comprehensive load management system featuring AI-powered routing, automated billing, and real-time tracking with predictive analytics.",
  copyStatus: "reuse",
  image: {
    id: "tms-loads",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "truck loading at a freight terminal photograph",
    placeholder: "ASSET NEEDED: truck loading at a freight terminal photograph",
  },
  features: [
    {
      title: "Smart Dispatching",
      description:
        "AI-powered load assignment based on driver location, preferences, equipment compatibility, and historical performance data for optimal routing.",
      details: [
        "Automated load-driver matching with ML algorithms",
        "Dynamic route optimization with traffic analysis",
        "Real-time availability tracking and preferences",
      ],
    },
    {
      title: "Automated Billing",
      description:
        "Generate invoices, rate confirmations, and settlements automatically with customizable templates and integrated payment processing.",
      details: [
        "Instant invoice generation with custom templates",
        "Automated rate confirmation distribution",
        "Integrated settlement and payment processing",
      ],
    },
    {
      title: "Live Tracking & Analytics",
      description:
        "Monitor load progress in real-time with GPS integration, delivery confirmations, customer updates, and predictive arrival times.",
      details: [
        "GPS-based tracking with ETA predictions",
        "Automated delivery confirmations and PODs",
        "Proactive customer notifications and updates",
      ],
    },
    {
      title: "Advanced Analytics",
      description:
        "Comprehensive reporting on load profitability, on-time performance, customer metrics, and predictive insights for business optimization.",
      details: [
        "Profitability analysis by route and customer",
        "Performance metrics and benchmarking",
        "Customer scorecards and relationship insights",
      ],
    },
  ],
};

export const tmsMaintenance: ProductSectionContent = {
  id: "tms-maintenance",
  eyebrow: "Equipment Care",
  title: "Smart Maintenance System",
  description:
    "Stay ahead of repairs, maximize uptime, and extend your fleet's lifespan with our cutting-edge maintenance system that watches your vehicles 24/7. Never let maintenance issues slow you down again.",
  copyStatus: "reuse",
  image: {
    id: "tms-maintenance",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "truck maintenance workshop photograph",
    placeholder: "ASSET NEEDED: truck maintenance workshop photograph",
  },
  features: [
    {
      title: "Preventive Maintenance",
      description:
        "Automated PM scheduling based on mileage, engine hours, and time intervals",
    },
    {
      title: "Pre-Trip Inspections",
      description:
        "Digital PTI forms with photo documentation and automatic reporting",
    },
    {
      title: "Vehicle Health Monitoring",
      description:
        "Real-time diagnostics, fault code alerts, and performance tracking",
    },
    {
      title: "Complete Service History",
      description:
        "Detailed maintenance records, cost tracking, and vendor management",
    },
  ],
};

export const tmsFinancials: ProductSectionContent = {
  id: "tms-financials",
  eyebrow: "Financial Management",
  title: "Complete Financial Control Center",
  description:
    "Streamline your financial operations with automated payroll processing, multi-account management, expense tracking, and comprehensive financial reporting.",
  copyStatus: "reuse",
  image: {
    id: "tms-financials",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "fleet office financial workflow photograph",
    placeholder: "ASSET NEEDED: fleet office financial workflow photograph",
  },
  features: [
    {
      title: "Advanced Payroll System",
      description:
        "Automated weekly payroll calculations with support for multiple pay structures, deductions, bonuses, and settlement processing.",
      details: [
        "Multi-account payroll processing",
        "Automated tax calculations",
        "Direct deposit integration",
        "Driver settlement summaries",
      ],
    },
    {
      title: "Expense Management",
      description:
        "Track fuel, maintenance, tolls, and operational expenses with automated categorization.",
    },
    {
      title: "Financial Analytics",
      description:
        "Comprehensive P&L reports, cost per mile analysis, and profitability tracking.",
    },
    {
      title: "Multi-Entity Support",
      description:
        "Manage multiple companies, franchises, and business entities from one platform.",
    },
  ],
};

export const tmsAudit = {
  omitted: [
    "Unexplained comparison percentages",
    "Simulated dashboard data",
    "Unsubstantiated load and maintenance outcome figures",
    "Fuel savings calculator and conflicting eligibility",
    "Uncleared publisher logos and fleet portraits",
  ],
  notFound: [
    "FAQs",
    "Attributed testimonial quotations",
    "Certifications",
    "Published pricing table",
  ],
};

export const storyAssets: Record<
  | "convergence"
  | "journey"
  | "resolution"
  | "dashboard"
  | "fuel"
  | "maintenancePhoto",
  StoryAsset
> = {
  maintenancePhoto: {
    kind: "image",
    id: "maintenance-workshop",
    src: "/images/tms/maintenance-workshop.webp",
    poster: "/images/tms/maintenance-workshop.webp",
    sourceFile: "exec-241dc090-1cf1-4c0e-8e32-80e7ad689b15.png",
    sourceUrl: "docs/tms-maintenance-art-direction.md",
    source: "generated",
    license:
      "Generated with built-in imagegen at the owner's request. Illustrative fictional workshop; not a customer photograph.",
    alt: "Teal semi-truck parked in a spacious maintenance workshop with service equipment and organized tools",
    width: 1672,
    height: 941,
    duration: 0,
    bytes: 260818,
  },
  convergence: {
    id: "convergence",
    sourceFile: "Circular_modules_connecting_into.mp4",
    sourceUrl: "/brand/videos-tms/Circular_modules_connecting_into.mp4",
    source: "client supplied",
    license:
      "Supplied by the owner for this page; no separate third-party license supplied.",
    src: "/brand/videos-tms/scrub/convergence.mp4",
    poster: "/brand/videos-tms/scrub/convergence.webp",
    alt: "Teal circular modules connecting into a coordinated assembly",
    width: 1280,
    height: 720,
    duration: 7.96,
    bytes: 3272919,
  },
  journey: {
    id: "journey",
    sourceFile: "Marker_moving_along.mp4",
    sourceUrl: "/brand/videos-tms/Marker_moving_along.mp4",
    source: "client supplied",
    license:
      "Supplied by the owner for this page; no separate third-party license supplied.",
    src: "/brand/videos-tms/scrub/journey.mp4",
    poster: "/brand/videos-tms/scrub/journey.webp",
    alt: "A coral marker following a sculpted route between connected modules",
    width: 1280,
    height: 720,
    duration: 7.96,
    bytes: 4867716,
  },
  resolution: {
    id: "resolution",
    sourceFile: "Abstract_film_resolving_into_orde.mp4",
    sourceUrl: "/brand/videos-tms/Abstract_film_resolving_into_orde.mp4",
    source: "client supplied",
    license:
      "Supplied by the owner for this page; no separate third-party license supplied.",
    src: "/brand/videos-tms/scrub/resolution.mp4",
    poster: "/brand/videos-tms/scrub/resolution.webp",
    alt: "Pale planes and teal blocks moving into an orderly assembly",
    width: 1280,
    height: 720,
    duration: 5.96,
    bytes: 1863971,
  },
  dashboard: {
    id: "spotter-tms2",
    src: "/videos/spotter-tms2.mp4",
    poster: "/videos/spotter-tms2.png",
    sourceFile: "spotter-tms2.mp4",
    sourceUrl: "https://spotter.ai/videos/spotter-tms2.mp4",
    source: "source page",
    license:
      "Downloaded from the original Spotter TMS page at the owner’s explicit request; no separate license supplied.",
    alt: "Spotter TMS product demonstration",
    width: 1920,
    height: 1080,
    duration: 45.766667,
    bytes: 6464661,
  },
  fuel: {
    id: "tms-fuel-seek-hero",
    src: "/videos/tms-fuel-seek-hero.mp4",
    poster: "/videos/tms-fuel-seek-hero.png",
    sourceFile: "tms-fuel-seek-hero.mp4",
    sourceUrl: "https://spotter.ai/videos/tms-fuel-seek-hero.mp4",
    source: "source page",
    license:
      "Downloaded from the original Spotter TMS page at the owner’s explicit request; no separate license supplied.",
    alt: "Spotter TMS fuel savings product demonstration",
    width: 1920,
    height: 1080,
    duration: 15.7,
    bytes: 5975805,
  },
};

export const storyChapters = [
  {
    id: "tms-intro",
    label: "Spotter TMS",
    number: "01",
    motion: "pin",
    asset: "convergence",
  },
  {
    id: "tms-results",
    label: "Proven Performance Results",
    number: "02",
    motion: "reveal",
    asset: null,
  },
  {
    id: "tms-capabilities",
    label: "Essential Fleet Management Tools",
    number: "03",
    motion: "pin",
    asset: "fuel",
  },
  {
    id: "tms-visibility",
    label: "Live Analytics Engine",
    number: "04",
    motion: "parallax",
    asset: "dashboard",
  },
  {
    id: "tms-load-operations",
    label: "Load Operations Engine",
    number: "05",
    motion: "parallax",
    asset: "journey",
  },
  {
    id: "tms-maintenance",
    label: "Equipment Care",
    number: "06",
    motion: "pin",
    asset: "maintenancePhoto",
  },
  {
    id: "tms-financials",
    label: "Financial Management",
    number: "07",
    motion: "parallax",
    asset: "resolution",
  },
  {
    id: "tms-contact",
    label: "Get Started Today",
    number: "08",
    motion: "static",
    asset: null,
  },
] as const;

export const tmsStory = {
  copyStatus: "reuse",
  navigationLabel: "TMS story chapters",
  pause: "Pause motion",
  resume: "Enable motion",
  scrollHint: "Scroll to follow the story",
  hero: {
    eyebrow: "Spotter TMS",
    title: "Finally, TMS Built For Dispatchers",
    description: "Automated AI Fuel Savings. Only TMS that pays for itself.",
    secondary: "Essential Fleet Management Tools",
  },
  overview: {
    id: "tms-capabilities",
    eyebrow: "Essential Fleet Management Tools",
    title: "Essential Fleet Management Tools",
    description:
      "Everything you need to manage drivers, monitor performance, and optimize your fleet operations in one powerful platform",
    items: [
      {
        title: "Metrics Monitoring",
        description:
          "Monitor key performance indicators including gross revenue, revenue per gallon, and miles per gallon with real-time dashboards and automated reporting.",
      },
      {
        title: "Driver Week Management",
        description:
          "Comprehensive driver week overview showing gross earnings, load assignments, performance metrics, and weekly summaries for optimal driver management.",
      },
      {
        title: "ELD & Wellness Monitoring",
        description:
          "Advanced ELD integration with wellness monitoring, disconnect alerts, and compliance tracking to ensure driver safety and regulatory adherence.",
      },
      {
        title: "Maintenance Management",
        description:
          "Complete maintenance oversight with preventive maintenance scheduling, pre-trip inspections, truck condition tracking, and detailed maintenance notes.",
      },
      {
        title: "Multi-Account Payroll",
        description:
          "Manage different account payrolls with automated calculations, driver settlements, expense tracking, and integrated accounting workflows.",
      },
      {
        title: "Fleet Optimization",
        description:
          "Integrated fleet management combining all core functions for maximum efficiency, cost control, and operational visibility across your entire operation.",
      },
    ],
    features: [
      {
        title: "Metrics Monitoring",
        description:
          "Monitor key performance indicators including gross revenue, revenue per gallon, and miles per gallon with real-time dashboards and automated reporting.",
      },
      {
        title: "Driver Week Management",
        description:
          "Comprehensive driver week overview showing gross earnings, load assignments, performance metrics, and weekly summaries for optimal driver management.",
      },
      {
        title: "ELD & Wellness Monitoring",
        description:
          "Advanced ELD integration with wellness monitoring, disconnect alerts, and compliance tracking to ensure driver safety and regulatory adherence.",
      },
      {
        title: "Maintenance Management",
        description:
          "Complete maintenance oversight with preventive maintenance scheduling, pre-trip inspections, truck condition tracking, and detailed maintenance notes.",
      },
      {
        title: "Multi-Account Payroll",
        description:
          "Manage different account payrolls with automated calculations, driver settlements, expense tracking, and integrated accounting workflows.",
      },
      {
        title: "Fleet Optimization",
        description:
          "Integrated fleet management combining all core functions for maximum efficiency, cost control, and operational visibility across your entire operation.",
      },
    ],
  },
  visibility: {
    eyebrow: "Live Analytics Engine",
    title: "Real-Time Fleet Dashboard & Performance Intelligence",
    description:
      "Monitor your entire fleet operation from a single, intelligent dashboard. Track driver performance, vehicle status, load progress, and financial metrics in real-time with AI-powered insights and predictive analytics.",
  },
  loads: {
    eyebrow: "Load Operations Engine",
    title: "Advanced Load Management & Intelligent Dispatching",
    description:
      "From dispatch to delivery, manage every aspect of your loads with our comprehensive load management system featuring AI-powered routing, automated billing, and real-time tracking with predictive analytics.",
  },
  maintenance: {
    eyebrow: "Equipment Care",
    title: "Smart Maintenance System",
    description:
      "Stay ahead of repairs, maximize uptime, and extend your fleet's lifespan with our cutting-edge maintenance system that watches your vehicles 24/7. Never let maintenance issues slow you down again.",
  },
  financials: {
    eyebrow: "Financial Management",
    title: "Complete Financial Control Center",
    description:
      "Streamline your financial operations with automated payroll processing, multi-account management, expense tracking, and comprehensive financial reporting.",
  },
  contact: {
    eyebrow: "Get Started Today",
    title: "Ready to Transform Your Fleet Operations?",
    description:
      "Join thousands of fleet managers using Spotter TMS to optimize their operations",
  },
};
```

## DESIGN.md

```markdown
# Design — Spotter.ai

## Homepage demo, 2026-10-08

Owner requested an inline homepage video without disturbing existing content or styling. A compact light section between Capabilities and Results features the authentic FuelSeek recording inside Spotter TMS. Existing typography, palette, gutters and panel corners are retained. Desktop copy sits beside the player; phones stack copy above it. The existing DemoPlayer supplies user-initiated native playback, captions, failure recovery and no-JavaScript controls; preload remains none. A single link opens the full demo library with TMS selected. Existing homepage sections and global styles remain unchanged.

## Watch Demo page, 2026-10-08

Owner requested a short demo page using the original Sentinel and Spotter TMS recordings. Preserve the approved root teal palette, Quicksand / Source Sans 3, 8px controls, 16px player corners and responsive gutters. A compact light introduction leads directly to two product selections and one native video player. Tablets and desktops place the selection list beside the player; phones place two options above it. A small personalized-demo invitation closes the page before the shared footer. No extra feature, testimonial or marketing sections.

Original MP4s retain their audio and source thumbnails. Player dimensions are reserved, contain sizing preserves the whole recording, and desktop media height is capped at 44svh / 400px. Playback starts only after a user action; native controls retain sound, seeking, captions and fullscreen. Real audio-derived English captions are explicitly labelled auto-generated. Selection URLs work without JavaScript, replace the active player and stop previous playback. Failure offers retry or a direct file link. Shared Navbar/Footer implementations, other product routes, root tokens and motion remain unchanged.

## Lens product route, 2026-10-08

Owner requested a Lens page following the approved premium product-page direction. The palette and Quicksand / Source Sans 3 typography remain unchanged. Scoped Lens fluid headings and gutters follow the Extension product treatment. The dark hero introduces an actual profitability-map capture; light ranking and history chapters use alternating screenshot-and-copy compositions and a pale closing invitation. No simulated dashboard or repeated feature-card grid.

Actual screenshots are contained, dimensioned next/image assets with capture attribution. Their original product colors are evidence within images, not new interface palette tokens. Shared Reveal and ScrollComposition animate transform only; no video or ongoing motion. Reduced-motion users receive static content; no-JavaScript users retain all content and assets. A sticky desktop ranking introduction stays in ordinary document flow on smaller screens. No Navbar, Footer, shared motion or root token implementation changes.

Approved project reference, 2026-10-08. Read alongside PRODUCT.md in every session. Stage 3 was approved before implementation. Future pages share this system; amend deliberately rather than inventing page-specific palettes.

## System

- Direction: rounded precision. Dark teal photographic hero, navigation, and footer; light main canvas for capabilities and evidence.
- Audience: fleet owners and operations teams. Primary action: Request a demo or quote.
- Scene: an operations buyer evaluating software in a well-lit office, scanning capabilities and evidence with limited time.
- Structure: centered photographic hero with a six-product index at its base, alternating capability rows, compact results, customer summary, award strip, closing CTA with static partners, footer.
- Logo geometry, not a template or outside brand, is the visual anchor.

## Logo Brief

Attached 640 × 158 transparent PNG, sampled using Pillow. Fully transparent pixels: 83.31% of canvas. Visible-ink shares use alpha weighting and nearest dominant RGB grouping.

| Exact color | Ink share | Observed role     |
| ----------- | --------: | ----------------- |
| #FFFFFF     |    53.35% | Wordmark          |
| #BBDDDE     |    23.31% | Two lower circles |
| #008080     |    11.67% | Lower-left circle |
| #F8485F     |    11.67% | Upper-left circle |

Four solid circles form an asymmetric L. Circles are approximately 44px in diameter, with approximately 49px center spacing. The wordmark is rounded, lowercase, geometric, and thin. Mark-to-wordmark gap is approximately 32px. Closest font candidate: Quicksand Light; low confidence in exact identification, moderate confidence in family category. Preserve the supplied image rather than recreating its lettering.

Clear space: half one circle diameter, approximately 22px at native size (inferred). Preserve proportions, colors, internal spacing, and arrangement. The background is transparent, not black.

## Canonical Color Tokens

tokens.css is the implemented source of truth. Sampled colors stay exact; all other colors below are inferred derivatives. No additional chromatic brand hue.

| Token                    | Hex     | Approved pairing / ratio                   |
| ------------------------ | ------- | ------------------------------------------ |
| Primary                  | #008080 | Surface text: 4.67:1                       |
| Primary strong / success | #006D6D | Canvas: 5.69:1                             |
| Accent                   | #F8485F | Decorative only; no normal text over coral |
| Brand pale               | #BBDDDE | Main text: 10.45:1                         |
| Canvas                   | #F1F7F7 | Main text: 13.97:1                         |
| Surface                  | #FAFDFD | Body text: 9.46:1                          |
| Surface tint             | #E7F1F1 | Muted text: 4.96:1                         |
| Main text / dark surface | #102A2B | Canvas: 13.97:1                            |
| Body text                | #284A4B | Surface: 9.46:1                            |
| Muted text               | #526B6C | Canvas: 5.27:1                             |
| Decorative border        | #C5D8D8 | Surface: 1.45:1, decorative only           |
| Control border           | #6A8585 | Canvas: 3.65:1                             |
| Error                    | #B91F37 | Canvas: 5.85:1                             |

WCAG normal-text threshold 4.5:1, large-text and essential non-text threshold 3:1. Exact white logo on dark surface: 15.13:1. Exact teal logo circle on dark surface: 3.17:1. White and pale teal fail on white backgrounds; coral fails normal text on white. Teal normal text uses the stronger derivative on canvas. Status meaning needs labels/icons as well as color.

## Typography

- Display: Quicksand, Arial, sans-serif; 600, upright. Body/navigation: Source Sans 3, Arial, sans-serif; 400 with 600 emphasis.
- Both are OFL fonts, loaded through next/font. Logo remains an image.
- Scale: 13, 16, 20, 25, 31, 39, 49, 61px.
- H1 mobile/tablet/desktop: 39/49/61px. H2: 31/39/49px. Product headings: 25/25/31px.
- Body: 16px, line-height 1.6, max 70ch. Intro: 20px. Headings: line-height about 1.15.

## Layout & Geometry

- Max content width: 1248px. Four columns on mobile, eight on tablet, twelve on desktop.
- Outer gutters: 20px mobile, 32px tablet, at least 64px desktop. Grid gaps: 16/24/32px.
- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Section spacing: usually 64/96/128px; related elements group more tightly.
- Buttons/inputs radius 8px; visual panels radius 16px; borders 1px.
- Focus: immediate 2px outline with 3px offset, strong teal on light and pale teal on dark.

## Motion

- Entrance 240ms, opacity with up to 12px movement. Reveals once, 320ms, stagger capped at 160ms total. Hover/menu transitions 160ms.
- Easing: cubic-bezier(0.16, 1, 0.3, 1). Animate opacity and transforms, not layout.
- Reduced motion: no movement or stagger, content shown immediately. Content is available without JavaScript.
- Implementation accessibility refinement: text-bearing reveals retain full opacity, since fading a compliant text/control pair caused transient contrast failures. Motion remains a subtle transform; decorative-only opacity may be used without obscuring text.
- No continuous animation; partner logos are static.

## Principles & Avoidances

Rounded, not soft: circles with decisive hierarchy. Asymmetric, not disorderly: varied composition on a shared grid. Four colors with clear roles. Thin detail with strong hierarchy.
Avoid purple gradients, blobs, glass panels, fabricated dashboards, identical card grids, pills everywhere, pale text on light surfaces, italic headings, and invented evidence.

## Exports

tokens.css carries the implementation tokens. The approved decisions above remain the human-readable reference. No second independently maintained palette.

## Product section refinement, 2026-10-08

The owner requested compact desktop product sections that fit within the viewport and an imported icon family while continuing the individual product polish.

- At widths of 1024px and above, product rows use 48px vertical padding. At viewport heights of 740px or below, padding reduces to 32px. Compact capability panels use 24px padding, 56px capability rows, and a 160px illustration area, reduced to 104px on shorter desktop screens. Artwork preserves its proportions.
- Target full-section visibility beneath navigation at common desktop sizes down to 1024 × 600. No fixed section height, clipped text, scroll trapping, or reduced body font size. Narrow layouts and browser zoom retain natural scrolling.
- Phosphor React is the imported icon family. Use duotone, 24px, strong teal for labeled capabilities and regular, 20px arrows for product actions. Icons supplement text and are decorative to assistive technology. Import individual SSR-compatible icons to avoid loading the whole catalog.
- All six products share the refined copy, capability-row, and CTA components while retaining distinct conceptual illustrations. Driver App connects available loads, scoring/matching, and the next route; TMS shows data converging around fleet operations; Sentinel emphasizes protection and compliance; the extension narrows listings into focused search. These are capability illustrations, not fabricated interfaces or data displays.
- Sentinel uses the existing brand-pale token for its visual panel. Main text and product signature use ink; supporting notes use body text. Pale circles receive a thin control-color outline so the decorative mark remains distinguishable against the panel.
- Preserve the existing palette, heading scale, radii, and 320ms/160ms motion limits. Product anchor targets account for the navigation height.

## Hero refinement, 2026-10-08

The owner requested a hero inspired by https://www.thinkcompany.com/, with original Spotter content and generated imagery. This overrides the initial asymmetric, light hero composition only.

- Deep teal canvas uses the existing ink token. Pale teal emphasizes the second headline line. Coral remains a small decorative brand dot.
- Centered headline: 61–96px on desktop, 44–68px on mobile; Quicksand 600 remains unchanged. This larger hero scale is an intentional section-specific refinement.
- Two original generated documentary-style photographs express the fleet on the road and the team behind it. These are illustrative scenes, not photographs of actual Spotter customers or staff.
- Desktop photographs frame the content at opposite edges. Mobile photographs reflow into a staggered pair below the primary actions. No essential text sits on imagery.
- Six product capability links form a single horizontal index on desktop and a two-column list on mobile. Keep all existing destinations and product names.
- Static fine grain and one faint circular outline provide texture. No gradient, glass treatment, dashboard invention, or copied reference assets.
- Headline entrance uses a 12px translate with an 80ms offset between lines, preserving full text opacity. Scroll moves desktop photos outward by at most 64px and upward by 48px. Mobile photos remain static. Reduced motion disables all movement.
- Keep navigation behavior and every section after the hero unchanged while sections are polished individually.
- Image prompts and provenance: docs/hero-art-direction.md. Hero images are optimized WebP files under public/images/hero/.

## Impact section refinement, 2026-10-08

- Light evidence section remains on the existing tint token. A thin top rule and up to 96px vertical padding establish a deliberate break after the product sequence.
- Desktop pairs the heading and source context with a two-by-two set of figures separated by fine rules. Figures use Quicksand 600 at 39–61px; narrow phones use a single column with 49px figures. No cards, chart implications, or fabricated comparisons.
- Small decorative Phosphor icons support the metric labels. The four-circle brand geometry anchors the introduction.
- Once-only metric movement is limited to 12px over 320ms, with 50ms offsets and 150ms total stagger. Decorative rules reveal with horizontal scale. Text and final numbers retain full opacity; reduced motion removes movement and stagger, and no-JavaScript rendering remains complete.

## Generated capability artwork, 2026-10-08

- Owner requested generated bitmap artwork in place of the six code-drawn diagrams only. This intentionally supersedes the SVG medium for these illustrations while retaining the approved cards, capability lists, copy, icons and destinations.
- Cohesive sculpted ceramic illustrations use teal, pale teal, porcelain and small coral accents on genuinely transparent backgrounds. These are conceptual capability artworks, not product interfaces or customer evidence. Natural material shading is confined to image assets; interface backgrounds remain solid tokens.
- Optimized 1200px WebP files live under public/images/capabilities. Preserve their proportions with contain sizing within the existing 160px desktop artwork area, 104px on short desktops, and a 5:2 area on narrow screens.
- Artwork rises once by 12px over 320ms. Reduced-motion users receive static imagery. All text and capability icons below the image remain unchanged. Prompt set and provenance: docs/capability-art-direction.md.

## Closing contact section refinement, 2026-10-08

- Retain the pale teal panel and 16px corner radius. Pair a deliberate two-line heading with a decorative four-circle brand motif inside a fine circular guide. Emphasize the second heading line with strong teal.
- A thin control-color rule separates the heading from the lower description and CTA row. Desktop uses 64px panel padding; tablets use 48px and phones use 32px vertically with 24px horizontal padding.
- Use the shared contact action with a Phosphor arrow, a 64px minimum height and 8px corner radius. Button text wraps on narrow screens without overflowing. Preserve the quote destination and the static partner strip below.
- Once-only 320ms reveals use up to 12px movement, with a 160ms maximum stagger. Decorative motif scale settles from 0.94 to 1. Reduced motion disables movement and stagger; no-JavaScript content remains visible.

## Hero action refinement, 2026-10-08

- Hero actions share a 64px minimum height, 8px control radius and 16px spacing. Primary action uses teal with a pale arrow inset; the secondary uses an outlined dark-surface treatment and a circular down-arrow detail. Phosphor arrows are decorative.
- Hover/focus arrows move by 2px diagonally or 3px downward over 160ms. Reduced-motion users receive static arrows. Keep the pale focus outline and all original labels and destinations.
- Below 480px, actions stack to the same width with 16px horizontal padding. Primary text may wrap without overflow. Changes are scoped to the hero and do not alter shared action styling elsewhere.

## Section scrolling, 2026-10-08

- Owner requested smooth section navigation using Framer Motion. Same-page anchor links animate the native scroll position with the approved ease-out curve; duration varies from 480–800ms with distance. This navigation-specific timing intentionally differs from 320ms content reveals.
- Account for the measured navigation height, target scroll margin and page scroll padding. Preserve hash history and move keyboard focus to the destination after arrival. Skip-to-content and reduced-motion navigation are immediate.
- Wheel, touch, pointer and navigation-key input cancel an active animation. Normal scrolling remains native, without transformed page wrappers, scroll trapping or continuous inertia loops. External, modified and download link clicks retain browser behavior.

## Mobile navigation refinement, 2026-10-08

- Owner confirmed the reference's full-screen shape. Below 1200px, use an opaque ink modal with the approved logo and 44px close control in an 88px top bar. Portal the native dialog to the body so header backdrop filtering cannot constrain its viewport bounds.
- Match the reference's flat 56px rows, fine full-width dividers and bottom-anchored footer. Use existing responsive gutters, Source Sans 16px group labels, pale supporting copy and a 64px quote action with 8px corners. Product, solution, resource and company groups retain their links and descriptions as flat expandable lists.
- Only the navigation area scrolls. Top controls and quote footer remain visible on short screens. Respect dynamic viewport height and safe areas.
- Rows rise into place by 10px over 320ms with 50ms offsets and 150ms total stagger. Divider scale reveals are decorative. Text stays fully opaque; reduced motion eliminates movement, stagger and exit delay. Normal exit uses 8px movement over 160ms.
- Native modal isolation and explicit Tab wrapping contain focus. Escape, close and link activation dismiss the drawer; closing restores focus, body styles and scroll position. Desktop breakpoint changes dismiss it. Desktop megamenu and no-JavaScript quote fallback remain unchanged.

## TMS cinematic storytelling exception, 2026-10-08

Extension route approved as the next product story: retain the same typography, teal palette, shared navigation and footer. Large source headline, wide real product demos, three alternating capability chapters, sticky chapter headings on desktop and a pale installation panel. Source copy remains Extension-specific. Page-scoped scale uses aliases and existing root colors. Reuse Reveal, ActionLink and useChapterProgress; ProductVideo and ScrollComposition are reusable primitives. Motion remains native-scroll transform only, with reduced-motion and no-JavaScript reading paths. Two optional abstract video briefs are documented for owner generation; no missing-film containers render before delivery.

The owner approved a TMS-only departure from the homepage's restrained scale and photographic compositions. Preserve the shared color palette, fonts, Navbar and Footer. New page-scoped scales live in styles/tms-tokens.css and alias the root tokens.css colors.

Eight chapters move from operational context through reported outcomes, workflow overview, visibility, load handoffs, maintenance and finances to contact. Use the three owner-supplied abstract films, not simulated product interfaces. Desktop chapters scrub muted video with native scroll, use modest image parallax and pin the overview and maintenance only on screens at least 1024px wide and 850px tall. A slim chapter rail supports direct navigation and a motion pause control. Small screens, reduced motion, media failures and no JavaScript show poster frames with all copy visible; no scroll interception.

## TMS film pacing and composition refinement, 2026-10-08

Study: the owner's two attached reviews, the rendered bb&b reference at desktop and mobile sizes, its loaded scripts, and official Motion, MDN, FFmpeg and installed Next.js documentation. The reference informs wide cinematic compositions, headline scale and separation of supporting detail; its source styling, words and assets were not copied. Research and requirement evidence: docs/tms-premium-review.md.

- Hero is a 240svh track; overview and maintenance use 300svh tracks. Sticky stages occupy the viewport below the measured header. Native scroll maps from track top meeting the header to track bottom meeting the viewport bottom. The complete 16:9 frames use contain sizing with no artwork zoom or portrait crop. Palette-derived scrims keep text readable; the captions have no enclosing cards.
- Normal chapters place the heading and introduction above a wide film and the capability detail below it. Their video follows the media wrapper's passage, from its top entering the viewport to its bottom meeting the header; paragraph height does not drive video time.
- Videos mount once when eligible scenes first approach the viewport and persist while offscreen or paused. Seeking stops outside view and resumes at the latest scroll position without recreating the element. A seek in progress coalesces subsequent requests; loaded-data, can-play and seeked events apply the newest target after readiness. No autoplay, loop, inertia scroll interception or infinite animation loop.
- Every frame in the three new muted H.264 encodes is independently encoded, confirmed by decoder output. Preserve the complete supplied durations at 24fps and 1280px. About 10MB total is an intentional desktop fidelity tradeoff; phones, short desktop windows and reduced-motion users request no video. First-frame WebP posters match each film's opening. Original clips are preserved.
- Overview and maintenance captions advance with scroll and offer keyboard-operable numbered controls. Pause freezes both decoded frames and captions without removing buffers. Reduced-motion, mobile and no-JavaScript versions present every feature in normal reading order. Chapter controls track actual section geometry; the mobile rail scrolls its active chapter into view.
- Navbar, Footer, shared root palette, shared Reveal and global anchor logic remain unchanged. Keep Next.js 16's supported preload prop and dimensioned next/image assets. Keep the installed Framer Motion dependency; a repository-wide import migration is outside this TMS pass.

## TMS playback eligibility correction, 2026-10-08

Owner subsequently requested the remaining abstract footage, including financial resolution, to scrub at every screen width as well. All abstract media eligibility now uses reduced-motion preference only. Cinematic pinning still requires 1024px width and 850px height; narrow screens retain their existing stacked layout. Actual decoded video overlays its first-frame poster when ready. Posters remain for reduced motion, unavailable media and no JavaScript.

Responsive hero correction: owner requested scroll-driven hero playback at every viewport width. Hero media eligibility now depends only on reduced-motion preference; desktop cinematic pinning retains its existing width/height criteria. Non-pinned layouts map the hero media's own passage to video time. The pause control is available on mobile as well. Other chapters retain existing eligibility and layouts. This supersedes the mobile poster-only rule for the hero, while reduced-motion and media-failure posters remain.

Chapter 06 imagery exception approved by the owner: replace its abstract film with a generated realistic truck-maintenance photograph. Preserve the existing layout, palette, source copy and scroll-driven capability captions. The image illustrates a fictional maintenance bay and does not depict an actual customer. Prompt and provenance: docs/tms-maintenance-art-direction.md.

The 850px minimum viewport height accidentally controlled video creation as well as pinned layout. This disabled all footage on common 1366x768, 1280x720 and 1440x800 desktops. Video eligibility now depends on desktop width (1024px minimum) and reduced-motion preference only. A separate cinematic flag retains the 850px threshold for sticky compositions and sequenced captions. Shorter windows use the complete wide films and all capability text in normal flow. Their hero video maps its own media passage instead of the unpinned hero's copy height. Mobile and reduced-motion poster fallbacks remain approved behavior. Playback remains driven by scrolling, with a pause control.

## About company storytelling exception, 2026-10-08

Owner approved docs/about-storyboard.md and supplied both films before implementation. Preserve the root palette, Quicksand / Source Sans 3, shared Navbar and Footer. styles/about-tokens.css owns the company-page scale and aliases the shared scene contract; root tokens.css remains the only palette.

Opening and operating philosophy use complete 16:9 abstract films, dark palette-derived scrims and native scroll seeking. Pin only at >=1024px width and >=850px height with no reduced-motion preference. Short desktop windows scrub their own unpinned media wrappers. Mobile, reduced motion, failed media and no JavaScript retain real first-frame posters and every original paragraph. Videos stay mounted after approach while eligibility remains; pause freezes seeking without clearing buffers. Films have muted 1280x720 / 24fps all-intra derivatives, with untouched source masters.

Company figures, nine numbered capability rows, the operator narrative, all eight timeline entries and five real award images keep source order. Mission and vision remain two distinct paragraphs; the 2011 quant background is not reinterpreted as a company founding date. No team portraits or biographies are fabricated. Closing reuses original invitation, demo destination and sales email. A shared chapter rail follows measured geometry. About-specific scales do not affect existing product pages.

About mobile rail refinement: defer the rail until the first content chapter becomes active, keeping both original hero actions unobstructed. Desktop rail remains visible.
```

## docs/about-implementation.md

```markdown
# About implementation — Stage 3

Implemented at /about after the owner approved the inventory/storyboard and delivered both generated films. The source content is recorded at docs/source/about-inventory.json and docs/about-content-inventory.md. All 81 captured main-page text items are retained verbatim; source metadata and five award alternatives are retained separately. No marketing text is rewritten.

## Composition and media

Opening / execution problem / nine automation capabilities / operator background / operating philosophy / all eight journey entries / five awards / original closing invitation stay in source order. Four source figures retain their exact values and labels, with an explicitly editorial source citation. Mission and vision remain complete, distinct paragraphs. The prior 2011 quantitative background is not presented as a legal company founding date.

Two owner films illustrate infrastructure and future vision, without fabricated people, offices, brands or interfaces. Originals remain intact in public/brand/aboutus-videos. The web folder contains 1280×720, 24fps muted H.264 derivatives, encoded with -g 1 -keyint_min 1 -sc_threshold 0 -crf 23 -pix_fmt yuv420p -movflags +faststart. Decoder output confirmed every frame as an independent I-frame. Byte counts/durations/provenance are in content/about.ts and docs/source/about-media-metadata.json. WebP posters are actual first frames; the social image is a resized derivative of the opening poster. All five existing award images preserve their original source URLs, dimensions and alternatives. No required assets are pending.

Cinematic pinning requires at least 1024px width, 850px height and no reduced-motion preference. Short desktop windows retain media-wrapper scrubbing without pinning. Mobile/reduced-motion/no-JavaScript use sized real posters and full content. Films remain mounted after first approach while eligible, even offscreen or paused. Seeking checks HAVE_CURRENT_DATA and coalesces changes through one animation frame; playback pauses outside the viewport. The pause control retains buffers. The chapter rail follows actual geometry. On mobile it appears after the opening chapter to keep the hero actions unobstructed.

## Reuse and shared changes

- Existing Navbar/Footer visual implementations and root palette are untouched by this task. Shared content links About locally; sitemap includes /about.
- ChapterScene, StoryFilm, FeatureList, NarrativeBeats and Story.module.css moved from components/sections/tms to components/story; their existing consumers use named imports. ChapterRail parameterizes the existing TMS rail rather than introducing another renderer.
- FeatureGroup/StoryAsset types moved to content/story.ts; content/tms.ts keeps type reexports for existing content consumers. ChapterScene gains optional additional paragraphs and a className; FeatureList supports its existing light palette directly; ChapterRail accepts page-specific presentation classes. StoryFilm uses supported Next 16 preload for the opening poster.
- StoryMotionProvider accepts an About-specific eligibility query. Its default behavior preserves TMS's all-width playback policy. New/promoted motion code imports motion/react. Shared hooks and motion feature bundle use named exports, with all consumers updated atomically. Existing Reveal and lazy-feature consumers receive import-binding changes only, preserving their animation behavior.
- About-specific scale lives in styles/about-tokens.css and inherits colors from canonical root tokens.css. No second palette, dependency or global styling changes.
- Repository-wide checks exposed unrelated existing errors. Minimal fixes removed synchronous React state for the unchanged WebGL fallback in QuoteBackground3D, removed unread quote-form touched state, and placed first() on the correct Playwright Locator in the loan-calculator test. No quote copy/layout/colors changed by these fixes.

## Verification

- npm run lint: passed with no warnings/errors.
- npm run build: passed, including static /about route.
- 42 Playwright checks passed across About, TMS responsive/video regressions, homepage and Extension. After the final mobile rail adjustment, all 13 About checks passed again. Reports: reports/about-playwright.json and reports/about-final-playwright.json.
- About tests verify exact source text, metadata/canonical/schema, one h1, all nine features/eight history entries/five awards, original action destinations, 360/768/1280/1440 layouts, 1024×850 pin boundary, target sizes, keyboard/skip link, anchor positioning, two-way seeking/pause/mount retention, static mobile/reduced/no-JavaScript paths, failed-video fallback, no overflow and WCAG 2.1 AA scans.
- At 1024×850, philosophy copy bottom measured 674.6px within a stage ending at 850px; at 1440×900, bottom 743.8px within 900px. No clipped mission/vision paragraphs.
- Existing /tms, /driversapp, /sentinel, /claims-os, /lens and /extension smoke checks returned 200, one h1 and no page errors.
- Production Lighthouse, local mobile: Performance 90 / Accessibility 100 / Best Practices 100 / SEO 100. Desktop: 100 / 100 / 100 / 100. Raw reports: reports/about-lighthouse-mobile.json and reports/about-lighthouse-desktop.json. Audits run against an isolated production workspace because concurrent project builds replaced .next files during an earlier invalid run.
- Explicit review-only agent confirmed source equality and media policy. Named-export and figure-attribution findings were corrected; follow-up review found no concrete regression or stale imports. No implementation was delegated.

## Content and omissions

Exact reuse: all source marketing content, figures, history, action labels/destinations, page title/description and five award alternatives. Editorial additions: chapter numbers, navigation/pause accessibility labels, source citation, abstract film alternatives and social-image alternative. These are identified in content/about.ts. Shared homepage footer remains the approved project version; its source counterpart is inventoried separately.

Not found on source: team portraits, office photographs, full roster/biographies, an explicit legal founding date, attributed testimonials, FAQs, published pricing, independently verified company figures or source videos. None fabricated. The source canvas is replaced by the approved supplied film. No static source status label is presented as a live operational integration.
```

## docs/about-storyboard.md

```markdown
# About storyboard — approved and implemented

Stage 2 approved by the owner; Stage 3 implementation authorized after the owner supplied both generated films.

Source: https://spotter.ai/about. Exact source wording and current imagery are recorded in docs/about-content-inventory.md and docs/source/about-*. Mission and vision are distinct content tracks within the original operating-philosophy section. The founder background is the people track; no portraits, full biographies or separate team roster were found.

## Chapters

| Chapter | Source heading / content | Scroll estimate | Motion | Asset |
| --- | --- | --- | --- | --- |
| Opening | Building the Freight Execution Infrastructure Layer for Trucking | 0–14% | Pin and scrub on eligible desktop; static otherwise | Client film about-execution-layer |
| Source figures | 500+, 24/7, 70%, $4.9MM with original labels | 14–18% | Static | None, source-reported text |
| 01 | Built for the Reality of Trucking | 18–28% | Reveal | Text only |
| 02 | A Single Unified Operating System | 28–43% | Reveal | Nine exact source features with numbered rows; functional actions use Phosphor icons |
| 03 | Built by Operators. Powered by AI. | 43–52% | Reveal | Exact founder narrative; no invented portrait |
| 04 | The Future of Freight Execution | 52–67% | Pin and scrub on eligible desktop; static otherwise | Client film about-freight-horizon; both mission and vision paragraphs remain complete and distinct |
| 05 | The Spotter Journey | 67–87% | Reveal | All eight original timeline entries |
| 06 | Recognized for Excellence | 87–93% | Static | Five existing source award images |
| Closing | Ready to transform your fleet operations? | 93–100% | Reveal | Exact source CTA text and destinations |

Percentages are storyboard estimates only. Active rail and scrub use measured geometry. Preserve source order and every paragraph, feature, timeline entry, metric label and CTA. Do not turn chapter questions into new visible marketing copy. Root Navbar/Footer remain the shared project versions as requested; source footer is inventoried but its original status label is not presented as a live local integration.

## Approved shared implementation

- Reuse Navbar, Footer, Reveal, StoryMotionProvider, useChapterProgress, useVideoScrub and useActiveChapter.
- Promote the existing ChapterScene, StoryFilm, FeatureList and NarrativeBeats into shared story modules at the second real use, with existing product consumers updated to named imports. Move shared media types away from content/tms.ts. Parameterize the existing chapter-rail renderer instead of cloning its behavior.
- Let StoryMotionProvider accept an About-only media eligibility query; default behavior remains TMS's current policy. About video scrubbing requires >=1024px width and no reduced-motion preference. Pinning additionally requires >=850px height. Short desktop windows use unpinned media-wrapper scrubbing; mobile, reduced motion and no JavaScript remain static. This preserves TMS's separation of playback from cinematic layout.
- Both films were delivered by the owner. Original masters are preserved; actual first-frame posters and verified all-intra web derivatives are integrated. No pending-film marker remains.
- Use named exports and typed props for promoted/new components; keep default exports only where Next pages/layouts require them. Split by responsibility, not line count.
- No new color palette: canonical root tokens.css supplies colors. styles/tokens.css is absent. styles/about-tokens.css contains About scale and aliases to root colors; do not create or relocate a second palette.
- Use the already installed motion/react entry point. The installed motion 14 package reexports framer-motion internals; do not mislabel the existing package as a broken compatibility shim. Regression-test shared primitives and TMS after the import/promotion changes.
- Keep each video mounted after first approach, gate seeks on HAVE_CURRENT_DATA, coalesce seeking and preserve pause state. Normal films follow their own media wrappers; pinned films follow their own tall media tracks.
- Prepare 1280×720, 24fps muted H.264 web derivatives with all-intra encoding (g=1, keyint_min=1, sc_threshold=0) and verify frame types. This reduces decode dependencies; inter-frame video can also seek between keyframes. Preserve source masters and derive actual first-frame posters.
- Posters/hero use fill with sizes in explicitly sized containers. Installed Next 16 supports preload and deprecates priority; use supported preload for the opening poster unless owner specifically elects the deprecated priority prop.
- Source title and meta description are exact reuse; canonical /about, AboutPage/Organization schema and social image metadata add no unsupported founding dates, ratings or statistics.
- Validate 360/768/1440 layouts, focus/targets/anchors, no overflow, reduced motion, no JavaScript, media failure and source-copy equality. Run lint/build and production Lighthouse (P>=80, A/BP/SEO>=90).

## External generation briefs

### about-execution-layer

Chapter: opening. 16:9. Duration: 6 seconds. Loop: no. Web derivative budget: approximately 3–6 MB, subject to quality and actual encoding.

Prompt: Create a premium abstract cinematic film of a freight execution infrastructure coming together, expressed entirely through physical materials and geometry. A deep dark teal architectural space contains several disconnected matte teal rails, pale porcelain planes and finely machined junctions. At the beginning these paths sit at different levels with clear breaks between them. In one continuous, deliberate movement, the parts slide and settle into precise alignment, forming a connected flowing structure with tangible depth and calm mechanical purpose. Use soft directional studio lighting, restrained reflections, subtle contact shadows and a single very small coral detail. The camera makes a slow, steady lateral drift; no cuts, dissolves, flicker, shake, rapid movement or jump at the end. Keep the left third dark and visually quiet for website text, while the material composition occupies the center and right. The opening frame must already be beautifully composed and useful as a static poster; the final frame is a resolved, stable structure. No people, vehicles, offices, brands, logos, text, letters, numbers, maps, charts, screens or product interfaces. High-quality material realism, not a technical schematic or decorative particle tunnel. Six seconds, silent, 16:9.

Poster: first frame; quiet dark teal left third and separated pale/teal rail pieces arranged in the center-right, before alignment.

### about-freight-horizon

Chapter: 04, operating philosophy / distinct mission and vision tracks. 16:9. Duration: 6 seconds. Loop: no. Web derivative budget: approximately 3–6 MB.

Prompt: Create a premium abstract cinematic film about disciplined systems creating a clearer future. Build a wide architectural horizon from layered pale porcelain planes and precision-cut matte teal pathways in a deep dark teal space. The opening composition has a few uneven pathways crossing different levels, with restrained tension and generous negative space. Over six seconds, these physical paths slowly align into an ordered, continuous perspective extending toward a softly lit distant horizon. Use one continuous shot with a very gentle forward camera movement, soft side lighting, realistic material shading and subtle reflections. Leave the left third quiet and dark for website copy; concentrate the geometry to the right. A tiny coral material accent may appear once, without glowing or acting as a live status signal. End in a composed stillness, without fading to black or cycling back. The first frame must stand on its own as a polished poster. No people, trucks, cities, recognizable landmarks, brands, logos, text, letters, numbers, maps, charts, UI panels or fabricated product interfaces. No cuts, particles, lens flares, flashes, fast motion or stock-tech tunnel. Quiet cinematic material realism, silent, 16:9, six seconds.

Poster: first frame; staggered porcelain planes and teal paths receding to a soft horizon on the right, with clear dark negative space on the left.

## Status

Implemented reuse: shared infrastructure, exact source copy and five existing award images. ChapterScene, StoryFilm, FeatureList, NarrativeBeats, shared story styles/types and the parameterized ChapterRail are promoted under components/story and content/story.ts. Two externally generated owner films are integrated; Codex generated no new film or photograph. No marketing content rewritten. See docs/about-implementation.md for verification.
```

## docs/content-audit.md

```markdown
# Homepage content audit

## Homepage demo, 2026-10-08

Owner requested the existing video on the homepage. The new section reuses the original TMS FuelSeek recording, source poster, audio-derived captions and approved description from content/watch-demo.ts. Its new headings and link labels are editorial interface copy; no performance or savings claims were added. The section appears between Capabilities and Results. All existing homepage copy is retained. Original media provenance is recorded in docs/watch-demo-content-inventory.md.

## Watch Demo page, 2026-10-08

Owner requested the original demo recordings from https://spotter.ai/watch-demo and a compact, premium local page. Both rendered source selections were inspected. The original 42.03-second Sentinel recording and 60.76-second Spotter TMS FuelSeek recording, including audio and thumbnails, were downloaded unchanged. Local caption tracks are generated from the actual audio and labelled as auto-generated. All new page headings, short descriptions, selection labels, playback controls, error text, exploration actions and SEO summaries are editorial interface copy; source performance guarantees are not repeated as new page claims. Exact URLs, dimensions, byte counts, checksums, caption provenance and copy inventory are recorded in docs/watch-demo-content-inventory.md. Shared Watch a Demo navigation now points locally; other destinations and existing pages retain their behavior.

## Lens product page, October 8, 2026

Owner requested the next product page from https://spotter.ai/lens. Playwright inspected the rendered market application, selector options, tooltips, ranked list, geographic map, location search and historical chart before implementation. Original functional labels/names are reused. All promotional headings, introductions, capability explanations and closing copy are rewritten from those observed functions; media attribution, accessibility labels and SEO are editorial. Full inventory and rewrite list: docs/lens-content-inventory.md; copy and image provenance: content/lens.ts.

Three optimized screenshots show the actual source application, with capture-date captions and a historical-data disclaimer. No data values, interfaces, product videos or social proof were generated. FAQs, attributed testimonials, pricing, certifications and promotional performance statistics were not found and are omitted. Shared Lens links now reach the local route; Navbar/Footer implementation, root tokens and other product pages are unchanged.

## TMS product page, 2026-10-08

- Owner approved the Stage 1 inventory and Stage 2 page plan before implementation. Source: https://spotter.ai/tms, inspected with Playwright including lazy-loaded sections, navigation and the pricing overlay.
- Promotional copy is rewritten in content/tms.ts: hero, coverage heading, results introduction and captions, all six core capabilities, visibility, load operations, maintenance, financial operations, closing invitation, metadata and CTAs. Product/publisher names and reported figures are retained as factual labels.
- Four headline results (18%, 12%, 89%, 25%), 500+ fleets and a 4.8/5 rating are explicitly attributed to Spotter and not independently verified. Rating methodology was not supplied.
- Omitted unexplained comparison increases, simulated dashboard figures, unsubstantiated load/maintenance figures, the self-funding guarantee and unspecified thousands-of-users claim. No testimonials, certifications, FAQs or published pricing table were found.
- The savings calculator is omitted: assumptions are undisclosed and eligibility conflicts between more than 10 trucks and at least 5 trucks. Demo actions retain the source destination https://spotter.ai/request-quote?product=tms.
- Publisher names appear as a static text list with source attribution. Uncleared publisher logos and fleet portraits are not used. No new imagery was generated or borrowed from the homepage.
- Five sized ASSET NEEDED markers reserve photographic placements. content/tms.ts records null source/license values honestly; eligible photos require a supplied asset or documented stock license before replacement.
- Navbar, Footer, Container, ActionLink, Reveal, tokens and homepage behavior remain unchanged. The root tokens.css remains the sole token source. PRODUCT.md now acknowledges the approved local TMS route.

## Homepage inventory, 2026-10-08

Source: https://spotter.ai/, observed October 8, 2026. The owner approved inventory, audience/Logo Brief, and design language before requesting implementation. No permission to copy promotional text verbatim was supplied.

| Section                   | Treatment                                | Change                                                                                                                               |
| ------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Navbar                    | Reuse labels/links; rewrite descriptions | Product descriptions shortened; seven Insights promotions paraphrased.                                                               |
| Hero                      | Rewrite                                  | New headline, introductory copy, suite labels, contact CTA. Product names retained.                                                  |
| Capabilities introduction | Rewrite                                  | Explains the six-product suite for operations teams.                                                                                 |
| Spotter Lens              | Rewrite                                  | Preserves market rankings and pricing meaning.                                                                                       |
| Spotter CRM               | Rewrite                                  | Preserves recruiting engagement and performance meaning.                                                                             |
| Driver App                | Rewrite                                  | Preserves AI-assisted scoring and matching meaning.                                                                                  |
| Spotter TMS               | Rewrite                                  | Preserves transportation management, data automation, and visibility meaning.                                                        |
| Sentinel                  | Rewrite                                  | Preserves driver scoring, safety, and compliance meaning.                                                                            |
| Load Board Extension      | Rewrite                                  | Preserves browser automation/filtering meaning.                                                                                      |
| Results                   | Rewrite captions; reuse figures          | Four platform figures remain explicitly source-reported. +127%, +89%, +156%, +12% omitted because comparison periods were not found. |
| Customer summary          | Rewrite                                  | Clearly labeled unquoted summary. Retains customer attribution and 40%/60% source-reported outcomes.                                 |
| Awards                    | Rewrite heading; reuse assets            | Workplace recognition is distinct from product/customer awards.                                                                      |
| Closing CTA               | Rewrite                                  | One consistent demo/quote action; no new local form.                                                                                 |
| Partner strip             | Rewrite heading; reuse logos             | Four authentic logos, static rather than continuously moving.                                                                        |
| Footer                    | Rewrite description; reuse links         | Legal/company/product destinations, downloads, socials, address preserved.                                                           |
| Operational status        | Omit                                     | No status integration was found.                                                                                                     |

## Link decisions

During the homepage build, only the homepage was implemented locally. Shared links retain original absolute destinations after the TMS route addition. No standalone CRM route was found in source navigation; its product action uses the existing quote form. Hero product links scroll to the corresponding homepage section.

## Asset provenance

Attached logo copied byte-for-byte into public/brand/spotter-logo.png. Five award images and King Express, M&M, QW Trucks logos came from the source site's static/media assets. Ampro is the original 179 × 78 PNG embedded in the source homepage bundle. Source dates/names are preserved; assets are not recreated or recolored. icon.svg is an inferred favicon adaptation of the four-dot motif, not an edited wordmark.

## Claims

Platform statistics and customer results are claims published by Spotter, not independently validated. The page does not imply that workplace awards certify product performance. Product diagrams are labeled capability overviews and contain no sample prices, fake scores, or live-data claims.

## Full-screen mobile navigation, 2026-10-08

- Studied bb-b.net's mobile menu in Playwright and its delivered navigation chunk: fixed full-screen surface, 56px rows, staggered 10px entrances, horizontal divider reveals and a bottom footer. Adapted these to Spotter's fonts, colors and motion limits.
- Retained existing navigation groups, child labels, descriptions and destinations. Footer uses the existing contact CTA. No reference copy/assets, unsupported language choices, theme controls or new promotional claims introduced.

## Closing contact section polish, 2026-10-08

- Retained the existing eyebrow, headline, description, contact action wording and quote destination. Partner wording and original logo assets remain unchanged.
- Updated composition and motion only: two-line heading, decorative brand geometry, separated description/action row and one-time reveals within the approved timing limits. No additional promises, form fields or claims.

## Generated capability artwork, 2026-10-08

- Replaced only the six diagrams with original generated illustrations, as requested by the owner. Product claims, headings, capability labels, CTA destinations and card footers remain unchanged.
- Art depicts abstract capabilities: signal focus, recruiting engagement, freight routing, connected fleet data, protection and compliance, and filtered search. No actual interface, prices, scores, statistics or customer identities are represented.
- Assets generated with the built-in image_gen tool; prompts and provenance recorded in docs/capability-art-direction.md. Transparent WebP output is stored in public/images/capabilities.

## Impact section redesign, 2026-10-08

- Retained the impact headline, description, all four metric values and labels, and the original publication attribution and observation date. No new claims or comparisons added.
- Studied bb-b.net through Playwright: rendered heading hierarchy, page spacing, and viewport animation timing (400–600ms with short staggered delays). Adapted the visual pacing to Spotter's approved 320ms motion limit and 150ms total metric stagger; no reference assets or copy reused.
- Final values stay visible throughout. Rules are decorative and do not represent metric magnitudes. Reduced-motion and no-JavaScript users receive complete, static figures.

## Spotter Lens visual polish, 2026-10-08

- The owner supplied https://www.bb-b.net/ as a visual craft and motion reference. No reference assets or copy reused.
- Lens product copy, capability labels, and destination remain unchanged. The custom focus illustration is a capability overview, not a product screenshot or a market-data visualization.
- Uses the approved Spotter colors, typography, circular geometry, and motion limits. Other product sections retain their existing treatments.
- Follow-up text and CTA refinement: inspected the reference's rendered layout, computed styles, and delivered motion code. Adapted its hierarchy, whitespace, one-time reveals, and arrow interaction to Spotter's existing font scale, 8px control radius, and 320ms reveal / 160ms hover limits. Product wording and destination remain unchanged.

## Capabilities introduction polish, 2026-10-08

- Existing eyebrow, heading, and description retained. No new product or performance claims.
- Asymmetric desktop composition pairs the approved two-line heading with a separate suite description. Six decorative circles correspond to the six products; they are not controls or live status indicators.
- Approved heading scale, strong teal emphasis, spacing tokens, and one-time 320ms reveals with a maximum 160ms stagger. Mobile stacks in reading order; reduced-motion and no-JavaScript content remain supported.

## Lens and CRM capability revamp, 2026-10-08

- Inspected the reference's computed button styles, hover behavior, and deployed Framer Motion code using Playwright. The reference uses once-only viewport reveals, staggered transforms, and image-cover reveals. Adapted motion to the existing Spotter timing and accessibility rules rather than adopting the reference's longer timings.
- Replaced the cropped Lens illustration with a complete signal-to-focus composition. Added an original recruiting-to-tracking-to-visibility schematic for CRM, labeled as a capability overview. Neither graphic depicts a product interface, actual market data, or recruiting performance figures.
- Preserved product copy, capability labels, and external destinations. CRM adopts the shared refined text and CTA treatment; other product rows retain their current treatments.
- Decorative SVG groups reveal once in sequence using transforms and opacity. Text keeps full opacity. Motion is disabled for reduced-motion preferences; all content and diagrams render without JavaScript.

## Driver App and desktop compaction, 2026-10-08

- Retained Driver App wording, its three capability labels, and the original driversapp destination. New route illustration describes available loads, scoring/matching, and the next move without adding scores, live data, or interface claims.
- Imported Phosphor React icons (MIT), using individual SSR-compatible modules. Decorative icons accompany existing labels and product CTAs.
- Applied the owner's compact-desktop request to all product rows and the shared refined capability panels. Verified full rows beneath navigation at 1024 × 600, 1280 × 720, 1366 × 768, 1440 × 900, and 1920 × 1080 without clipping or reducing body text size. Mobile retains natural scrolling.

## Remaining product sections, 2026-10-08

- TMS, Sentinel, and Load Board Extension retain their approved product wording, all capability labels, and original external destinations. The extension CTA retains "Explore the extension".
- Added original Phosphor-based capability illustrations: fleet-centered data connections for TMS, identity/protection/compliance for Sentinel, and listings/filtering/search for the extension. These describe capabilities without depicting actual product interfaces or invented data.
- Sentinel's visual panel uses the existing brand-pale token with ink text and body-colored notes. Text contrast remains compliant; decorative pale mark circles receive a thin outline.
- All six products now use shared, compact components with different illustrations and alternating layouts. Motion remains one-time, 320ms, with a 160ms maximum stagger and immediate visibility for reduced-motion/no-JavaScript users.

## Hero refinement, 2026-10-08

- Owner-supplied headline updated verbatim to "trucking automation that works for you". Desktop headline sizing accommodates the longer wording; the terminal photograph and its caption move 32px right on desktop. Tablet and mobile photograph positions retain their existing layout.

- Existing Spotter headline, introduction, primary CTA, and product names retained from this project's rewritten content.
- New original labels: "Built around your fleet.", "The fleet on the road.", and "The team behind it." These are original project copy, not source quotations.
- Reference website supplied by the owner: https://www.thinkcompany.com/. Visual composition and motion studied only; no copy or imagery reused.
- Generated photographs illustrate fictional fleet and dispatch scenes. They provide atmosphere and make no claim about actual customers, staff, or product interfaces.

## TMS storytelling revision, 2026-10-08

Superseded by the owner's source-content request: TMS hero, section headings, descriptions, capability lists, evidence labels and contact copy now use wording observed on https://spotter.ai/tms. The source hero rotates Dispatchers, Accounting and Payroll; the local static heading uses Dispatchers. Primary CTA now reads Book a Demo; existing contact destination remains. Chapter labels use source section names. Attribution and motion/accessibility instructions remain editorial interface text. Source claims are reproduced as source copy, not independently verified findings. Simulated dashboard figures, unexplained comparison percentages and the fuel calculator remain omitted. No new sections or invented evidence.

Downloaded original videos unchanged from https://spotter.ai/videos/spotter-tms2.mp4 and https://spotter.ai/videos/tms-fuel-seek-hero.mp4. Owner confirmed dashboard video in chapter 04 and fuel video in chapter 03. Product demonstrations use normal playback and native controls. PNG posters are first decoded frames of the actual files. Asset dimensions, duration, bytes and source provenance are in content/tms.ts. Other films retain their prior behavior. No CSS, palette, Navbar or Footer changes.

Owner supplied three abstract videos in public/brand/videos-tms and authorized building the cinematic scroll version. Their provenance is recorded as client supplied, with no separate third-party license supplied. Original files are preserved; web encodes and WebP posters are derived locally. The separate maintenance clip was not supplied; maintenance and financial chapters share the resolution film. No real people, customer imagery, invented interface or generated statistics were added.

Rewritten items: hero heading and introduction, exploration action, overview heading/introduction and six capability summaries, visibility/load/maintenance/financial/contact chapter headings, chapter labels, scroll hint and motion-control accessibility labels. Existing rewritten feature copy and source-attributed metrics remain. Publisher names and figures remain marked reuse; all prose is marked rewrite in content/tms.ts. The former five photo placeholders are not rendered in this approved abstract-film version. FAQs, attributed testimonials, certifications and published pricing remain not found on source. Unsupported guarantees, simulated dashboard figures and unresolved calculator claims remain omitted.

Shared Navbar, Footer, root tokens and global scrolling behavior were not changed. Chapter ranges are storyboard estimates; active navigation follows actual section geometry. Native scroll drives video time in both directions, with poster fallback on mobile/reduced motion or playback failure.

## TMS film correction audit, 2026-10-08

Extension route, October 8, 2026: owner requested the next page using original source content/assets and the approved product-story direction. Rendered https://spotter.ai/extension was inventoried before implementation. Original hero wording, nine feature headings/descriptions and Chrome install destination are reused, with section/title capitalization adjusted. Hero/closing summaries combine original category labels; exploration link, media controls, failure labels, source attribution and SEO metadata are editorial UI copy. No new product claims or outcome numbers. Testimonials, pricing, certifications, statistics and FAQs were not found and are omitted. All four actual demo videos downloaded unchanged, then integrated through muted web derivatives with real-frame WebP posters sampled at one second to avoid blank opening frames. Three original icons downloaded and archived; interface uses Phosphor. Full inventory and provenance: docs/extension-content-inventory.md and content/extension.ts. Two generation prompts only: docs/extension-video-briefs.md. Navbar/Footer implementation and TMS route are unchanged; Extension destinations in shared content point locally.

Subsequent chapter 06 asset replacement authorized by the owner: built-in imagegen created a realistic fictional teal truck in a maintenance workshop. Stored as public/images/tms/maintenance-workshop.webp, with provenance in content/tms.ts and full prompt in docs/tms-maintenance-art-direction.md. Maintenance now uses this photograph instead of the resolution film. Source wording, other chapters and styling are unchanged; no marketing claims added.

No new promotional copy or marketing claims. Existing headings, body text, capability descriptions, publisher names, source attribution and action destinations remain. Removed unused storyboard percentage ranges and unused film-caption copy; chapter motion metadata now describes the implemented hero pin and financial-media parallax. Navigation tooltips reuse existing chapter labels.

Three owner-supplied abstract films remain the only imagery. New all-intra derivatives and first-frame WebP posters live in public/brand/videos-tms/scrub; exact byte counts and original source paths are recorded in content/tms.ts. No generated people, customer identity, product interfaces, testimonials or fabricated evidence were added. All original source files are intact.

The previously documented ranges were estimates; those unused values are now removed. Both scene activation and video progress follow rendered geometry. Research distinguishes supported fixes from inaccuracies in the pasted review: Next.js 16 supports preload, explicit width/height with sized contain containers is valid, and precise media seeking is not restricted to keyframes. The all-intra encoding choice reduces decoding dependencies rather than relying on that incorrect restriction.

## ClaimsOS product page, 2026-10-08

- Owner approved the Stage 1 inventory and Stage 2 motion/chapter plan before implementation. Source: https://spotter.ai/claims-os, inspected via rendered browser.
- Original copy preserved: hero heading, introductory description, four core capabilities (Claim Tracking, Financial Control, Slack Automation, Activity Monitoring), real-time Slack workflow details and simulated notification feed copy (`#claims-ops`, Claim #4821 notification, action buttons), platform architecture pillars (Centralized Dashboard, Document Storage, Driver Integration), and all four operational role descriptions (Claims Team, Freight Accounting, Fleet Safety, Operations Management).
- Authentic client product screenshot `claimos-board.0ee8047bade8e616909a.webp` downloaded directly from the source site to `public/images/claims-os/claimos-board.webp` (1692 × 930) and displayed with responsive contain styling.
- Two abstract videos delivered by owner in public/brand/claimsOS-videos: Laser_lines_aligning_freight_data_20261008175814.mp4 (6.0s, 1920x1080) and Kinetic_sculpture_rotating_into_…_20261008175745.mp4 (6.0s, 1920x1080).
- Local all-intra derivatives encoded with FFmpeg libx264 (-g 1 -keyint_min 1 -sc_threshold 0 -an -crf 20 -movflags +faststart) to public/brand/claimsOS-videos/scrub/claims-triage.mp4 (9,970,815 bytes) and liability-resolution.mp4 (6,192,526 bytes).
- First decoded frame WebP posters generated via libwebp and copied to both public/brand/claimsOS-videos/scrub/ and public/images/claims-os/.
## Sentinel product page, 2026-10-08

- Owner approved Stage 1 inventory and Stage 2 motion/chapter plan before implementation. Source: https://spotter.ai/sentinel, inspected with Playwright headless DOM analysis (`sentinel_scrape.json`, `sentinel_full.html`).
- Three distinct functional tracks preserved throughout copy, structure, and chapter scenes:
  1. Track A (AI Driver Hiring & Screening): Optical CDL extraction, multi-bureau MVR + PSP + CDLIS report pull, instant A–F predictive safety grade, DOT 10-panel drug test tracking (`Order` -> `Collection` -> `Result`), and pre-vetted driver marketplace.
  2. Track B (Continuous MVR Monitoring): 24/7 state database webhooks detecting moving violations and suspensions, pushing direct alert cards into Slack and Google Chat without logging into a separate web dashboard.
  3. Track C (Compliance & Risk Defense): Automated deadline tracking for CDL and DOT medical card renewals, multi-carrier history discrepancy verification, and fleet ISS score containment.
- Authentic client source videos extracted and downloaded directly from spotter.ai:
  - `https://spotter.ai/videos/sentinel-C.mp4` -> `public/videos/sentinel/sentinel-C.mp4` (1280x720, 31.2s; poster: `how-it-works-poster.webp`). Software walkthrough showing CDL upload, optical character recognition, and A–F risk grading.
  - `https://spotter.ai/videos/slack-demo-2.mp4` -> `public/videos/sentinel/slack-demo-2.mp4` (1280x698, 41.8s; poster: `slack-demo-poster.webp`). Software walkthrough demonstrating Slack webhook alerts when a driver's record changes.
  - Local all-intra derivatives encoded with FFmpeg (`-g 1 -keyint_min 1 -sc_threshold 0 -an -crf 22 -movflags +faststart`) to `sentinel-C-scrub.mp4` and `slack-demo-2-scrub.mp4` for seamless, lag-free scroll scrubbing.
- Authentic client vector emblem downloaded from `https://spotter.ai/static/media/sentinel.d7c0b2d96225306b1602b74228da3336.svg` to `public/images/sentinel/sentinel-logo.svg`.
- Competitor tariff comparisons preserved factually from published tariffs: MVRcheck.com, Solera SuperVision, SambaSafety, Checkr vs. Sentinel ($10.00 MVR, $4.50 PSP, $3.00 CDLIS), highlighting up to 75% savings and linking to `https://spotter.ai/mvr-pricing`. Rendered as an accessible, high-contrast, keyboard-focusable comparison table with zero third-party licensing baggage.
- Subsequent layout and media polish per owner feedback:
  - Sections 1 and 2 updated to unpinned normal video playback (`pinned={false}`, `scrub={false}`) using native `sentinel-C.mp4` and `slack-demo-2.mp4` with native controls, auto-play on inView, and `object-fit: contain` with zero zoom or crop distortion.
  - Video media containers bounded on desktop (`max-width: min(100%, 1060px); max-height: min(60vh, 580px)`) to keep heading, video, controls, and features in the active viewport.
  - Alternating section rhythm enforced across chapters to eliminate merging: Section 1 (Screening) Dark, Section 2 (Monitoring) Light, Section 3 (Compliance) Dark, Section 4 (Economics) Light, Section 5 (Talent Board) Dark, Section 6 (Closing CTA) Light (`contact`).
  - Section 4 (Economics) updated with a clean, light-mode comparison table card with accessible green indicator badge and 44px tariff link.
  - Section 5 (Talent Board) converted to compact TMS features list for the 3 steps, and compact 3-column candidate cards with tight padding and accessible action buttons, fitting cleanly into the desktop viewport.




## Truck Loan Calculators product page, 2026-10-08

- Owner approved Stage 1 inventory and Stage 2 motion/chapter plan before implementation. Source: https://spotter.ai/loan-calculators, inspected with Playwright headless DOM analysis.
- The live source page contains zero imagery or video (pure HTML form calculation tools).
- All mathematical formulas, default input parameters, and computed results were verified against the live source calculator:
  1. Amortization Calculator: Default $175,000 price, $0 down, 11.9% APR, 60 months -> $3,883.94/mo, $58,036.45 total interest, $233,036.45 total payments. Supports balloon payment, extra monthly payment, one-time extra payment, and full month-by-month schedule.
  2. Affordability Calculator: Default $2,500/mo, 11.9% APR, 60 months, $0 down -> $112,643.32 max borrowing capacity.
  3. Interest Rate Calculator: Default $150,000 loan, $2,500/mo, 60 months, $0 balloon -> solves for implied APR % via Newton-Raphson numerical iteration.
- Commercial Freight Equipment Financing Benchmarks provided as factual market-rate reference points across Class 8 sleeper cabs, day cabs, dry van trailers, and refrigerated reefers.
- Fleet Economics section contextualizes debt service into carrier cost-per-mile fixed overhead allocation.
- Hero incorporates abstract financial debt amortization asset (`liability-resolution.mp4` / `liability-resolution.webp`) with GOP=1 keyframes, smooth video scrub, and `object-fit: cover` to eliminate letterbox gaps.
- Full responsive coverage verified at 360px, 768px, and 1440px with touch targets >= 44x44px and WCAG 2.1 AA accessibility compliance.

## About company page, 2026-10-08

- Owner approved Stage 1 / Stage 2, then supplied both abstract films in public/brand/aboutus-videos. Implemented /about using the recorded rendered source snapshot at https://spotter.ai/about (docs/source/about-inventory.json, about-rendered.txt and about-dom.html).
- Exact reuse: original title and description; opening label, heading, paragraph and two actions; all four figure values and labels; both execution-problem paragraphs; nine capability titles and descriptions; operator introduction, advantage label/paragraph and conclusion; separate vision and mission paragraphs; all eight journey dates/titles/descriptions; recognition label/heading and all five award alternatives; closing label/heading/paragraph, actions and service-area note. Per-field source/copyStatus metadata is in content/about.ts. No marketing copy rewritten.
- Editorial only: chapter numbers, chapter-navigation and pause/resume accessibility labels, visible source attribution beneath company figures, descriptive alternatives for abstract owner films, and social-image alternative. These introduce no new company claims. Canonical, AboutPage/Organization schema, social and Twitter metadata add no founding date, ratings, team identity or unsupported evidence.
- The 500+, 24/7, 70% and $4.9MM figures are exact source claims, not independent verification. The 2011 timeline entry describes founders’ prior quantitative experience, not company establishment. Mission, vision, history and founder background stay distinct.
- Assets: both supplied films remain intact. Local web derivatives about-execution-layer.mp4 (2,429,481 bytes / 6 seconds) and about-freight-horizon.mp4 (3,286,438 bytes / 5.958 seconds) are muted H.264, 1280x720 at 24fps, every frame independently encoded. Posters are their actual first frames; social image is resized from the opening poster. Five existing award assets are reused with original source URLs/dimensions/license context in content/about.ts. No pending generation or missing required assets.
- Existing Navbar/Footer visual implementations unchanged. Shared link data points About locally. Existing product consumers now import promoted story components/styles/types; default playback policy remains intact. Details and verification: docs/about-implementation.md.
- Not found on source: team portraits, office photographs, full team roster/biographies, an explicit legal founding date, attributed testimonials, FAQs, published pricing, independent verification of the company figures, or source videos. Do not fabricate them. Source canvas is replaced by the approved supplied film. The source footer’s static operational-status label is not presented as a live local integration.
```

## docs/source/about-media-metadata.json

```json
[
  {
    "id": "about-freight-horizon",
    "sourceFile": "public/brand/aboutus-videos/Geometric_pathways_aligning_into…_1080p_20261008191503.mp4",
    "src": "/brand/aboutus-videos/web/about-freight-horizon.mp4",
    "poster": "/brand/aboutus-videos/web/about-freight-horizon.webp",
    "sourceBytes": 2013792,
    "bytes": 3286438,
    "width": 1280,
    "height": 720,
    "frames": 143,
    "duration": 5.958333333333333,
    "allIntra": true
  },
  {
    "id": "about-execution-layer",
    "sourceFile": "public/brand/aboutus-videos/Infrastructure_parts_aligning_in…_1080p_20261008191611.mp4",
    "src": "/brand/aboutus-videos/web/about-execution-layer.mp4",
    "poster": "/brand/aboutus-videos/web/about-execution-layer.webp",
    "sourceBytes": 1344302,
    "bytes": 2429481,
    "width": 1280,
    "height": 720,
    "frames": 144,
    "duration": 6,
    "allIntra": true
  }
]
```

## PRODUCT.md

```markdown
# Product — Spotter.ai

## Register
brand

## Users
Primary audience: fleet owners and operations teams evaluating software from an office or on a mobile device between tasks. Secondary audiences: dispatchers, safety and recruiting managers, independent drivers and owner-operators. Device priorities are inferred from the use cases, not analytics.

## Product Purpose
Explain the six-product freight operations suite and help buyers request a demo or quote. The homepage and approved TMS, Extension, Lens, ClaimsOS, Driver App, and Sentinel product routes, plus the About company page and compact Watch Demo page, are implemented locally; other pages retain their existing public destinations.

## Brand Personality
Precise, approachable, confident. These words and the audience and conversion goal were explicitly confirmed by the owner on 2026-10-08.

## Anti-references
No purple gradients, hero blobs, generic three-column cards, glass panels, fake dashboard chrome, invented statistics, or endless logo marquees.

## Design Principles
Make choosing a product straightforward. Keep evidence near capabilities. Use the approved logo as the brand anchor. Keep the primary contact action consistent. Prioritize readability and keyboard access.

## Accessibility & Inclusion
WCAG 2.1 AA color combinations, semantic landmarks, one h1, descriptive alternatives, visible focus, 44px minimum control targets, and reduced-motion support.

## Content Rules

TMS exception approved by the owner on 2026-10-08: use original TMS-page wording for this route instead of rewritten promotional copy. Other product pages remain unchanged. Source videos are downloaded for the TMS demonstrations at the owner's request.
Extension continuation uses its own original feature wording and source demos with the same provenance audit. Editorial navigation, media controls and SEO summaries are identified separately in content/extension.ts and docs/extension-content-inventory.md.
ClaimsOS continuation uses original source copy, real product board screenshot, and abstract video briefs matching TMS cinematic standards, recorded in content/claims-os.ts and docs/content-audit.md.
Driver App continuation replicates the TMS motion standard for driver onboarding, AI-matched scheduling, and market autonomy, recorded in content/driversapp.ts.
Sentinel continuation replicates the TMS motion and storytelling standard using authentic client source videos (sentinel-C.mp4, slack-demo-2.mp4), real competitor pricing matrix tariffs, abstract perimeter/compliance films, and interactive pre-vetted driver filtering, recorded in content/sentinel.ts and docs/content-audit.md.
Rewrite promotional copy; preserve functional names and destinations. Record every rewrite in docs/content-audit.md. Keep source-reported headline figures with clear source attribution; omit unexplained percentage increases. Summarize the customer story without quotation marks. Do not pretend a static status label is live. No Lorem ipsum or fabricated social proof.

About continuation approved on 2026-10-08: preserve every source About-page heading, paragraph, feature, figure, timeline entry and CTA exactly. Two owner-supplied abstract films illustrate infrastructure and future vision; they are not footage of real offices or product interfaces. The local /about route reuses shared navigation/footer and TMS motion infrastructure.
```

## tests/about.spec.ts

```ts
import fs from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";
import { about } from "../content/about";

const source = JSON.parse(
  fs.readFileSync("docs/source/about-inventory.json", "utf8"),
) as { text: string; title: string; description: string };
const sourceLines = source.text
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);
const mainCopy = sourceLines.slice(
  sourceLines.indexOf("About Spotter"),
  sourceLines.indexOf("Serving fleets across North America") + 1,
);

async function seek(video: Locator, fraction: number) {
  await video.evaluate((element, fraction) => {
    const header = document
      .querySelector("header")!
      .getBoundingClientRect().height;
    const pinned = matchMedia(
      "(min-width: 1024px) and (min-height: 850px) and (prefers-reduced-motion: no-preference)",
    ).matches;
    const target = pinned
      ? element.closest("section")!
      : element.parentElement!.parentElement!;
    const box = target.getBoundingClientRect();
    const start = box.top + scrollY - (pinned ? header : innerHeight);
    const distance = pinned
      ? box.height - innerHeight + header
      : box.height + innerHeight - header;
    scrollTo({ top: start + distance * fraction, behavior: "instant" });
  }, fraction);
  const duration = await video.evaluate(
    (element: HTMLVideoElement) => element.duration,
  );
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeCloseTo((duration - 1 / 24) * fraction, 0);
}

test("all source copy, metadata and genuine award assets are retained", async ({
  page,
}) => {
  await page.goto("/about");
  const text = (await page.locator("main").textContent())!.replace(/\s+/g, " ");
  for (const line of mainCopy)
    expect(text).toContain(line.replace(/\s+/g, " "));
  await expect(page).toHaveTitle(source.title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    source.description,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://spotter.ai/about",
  );
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("#about-automation h3")).toHaveCount(9);
  await expect(page.locator("#about-journey li")).toHaveCount(8);
  await expect(page.locator("#about-awards img")).toHaveCount(5);
  await expect(
    page.getByRole("link", { name: "Talk to Sales", exact: true }),
  ).toHaveAttribute("href", "https://spotter.ai/request-quote");
  await expect(
    page.locator('#about-contact a[href="mailto:sales@spotter.ai"]'),
  ).toBeAttached();
  expect(about.philosophy.copyStatus.paragraphs).toEqual([
    "exact reuse",
    "exact reuse",
  ]);
  const schema = JSON.parse(
    await page.locator('main script[type="application/ld+json"]').innerText(),
  );
  expect(schema["@type"]).toBe("AboutPage");
  expect(schema.about).not.toHaveProperty("foundingDate");
});

for (const [width, height] of [
  [360, 800],
  [768, 900],
  [1280, 720],
  [1024, 850],
  [1440, 900],
]) {
  test(`layout, targets, keyboard and chapter links at ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/about");
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    for (const id of [
      "about-opening",
      "about-reality",
      "about-automation",
      "about-operators",
      "about-philosophy",
      "about-journey",
      "about-awards",
      "about-contact",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    }
    if (width >= 1024 && height >= 850) {
      const geometry = await page
        .locator("#about-philosophy")
        .evaluate((section) => {
          const copy = section.querySelector<HTMLElement>(
            '[class*="sceneCopy"]',
          )!;
          const stage = section.firstElementChild!;
          return {
            bottom: copy.getBoundingClientRect().bottom,
            stageBottom: stage.getBoundingClientRect().bottom,
          };
        });
      expect(geometry.bottom).toBeLessThanOrEqual(geometry.stageBottom);
    }
    const targets = await page
      .locator("main a, main button")
      .evaluateAll((elements) =>
        elements
          .filter((element) => element.getClientRects().length)
          .map((element) => {
            const box = element.getBoundingClientRect();
            return { width: box.width, height: box.height };
          }),
      );
    for (const box of targets) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to content" }),
    ).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
    const rail = page.getByRole("navigation", {
      name: about.ui.navigationLabel,
    });
    if (width < 1024) {
      await page.locator("#about-reality").scrollIntoViewIfNeeded();
    }
    await rail.locator('a[href="#about-philosophy"]').click();
    await expect(page).toHaveURL(/#about-philosophy$/);
    await expect
      .poll(() =>
        page
          .locator("#about-philosophy")
          .evaluate((element) =>
            Math.round(element.getBoundingClientRect().top),
          ),
      )
      .toBeGreaterThanOrEqual(80);
    expect(errors).toEqual([]);
  });
}

for (const height of [720, 900]) {
  test(`both films seek in both directions and persist at 1440x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height });
    await page.goto("/about");
    for (const id of ["about-opening", "about-philosophy"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      const video = page.locator(`#${id} video`);
      await expect(video).toHaveCount(1);
      await expect
        .poll(() =>
          video.evaluate((element: HTMLVideoElement) => element.readyState),
        )
        .toBeGreaterThanOrEqual(2);
      await video.evaluate((element) => {
        element.dataset.identity = "retained";
      });
      await seek(video, 0.65);
      await seek(video, 0.85);
      await seek(video, 0.6);
      await expect(
        page.getByRole("button", { name: about.ui.pause }),
      ).toBeVisible();
      await page.getByRole("button", { name: about.ui.pause }).click();
      const before = await video.evaluate(
        (element: HTMLVideoElement) => element.currentTime,
      );
      await page.mouse.wheel(0, 150);
      await page.waitForTimeout(150);
      expect(
        await video.evaluate(
          (element: HTMLVideoElement) => element.currentTime,
        ),
      ).toBeCloseTo(before, 2);
      await page.getByRole("button", { name: about.ui.resume }).click();
      await page.locator("#about-awards").scrollIntoViewIfNeeded();
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(video).toHaveAttribute("data-identity", "retained");
      await seek(video, 0.65);
      expect(
        await video.evaluate((element: HTMLVideoElement) => element.paused),
      ).toBe(true);
    }
  });
}

test("mobile and reduced motion retain static first frames without video downloads", async ({
  page,
}) => {
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    await page.emulateMedia({ reducedMotion });
    await page.setViewportSize({
      width: reducedMotion === "reduce" ? 1440 : 360,
      height: 900,
    });
    const videos: string[] = [];
    page.on("request", (request) => {
      if (request.url().endsWith(".mp4")) videos.push(request.url());
    });
    await page.goto("/about");
    await page.locator("#about-philosophy").scrollIntoViewIfNeeded();
    await expect(page.locator("main video")).toHaveCount(0);
    await expect(page.locator("#about-philosophy img")).toBeVisible();
    expect(videos).toEqual([]);
    expect(
      await page
        .locator("[data-about-stage]")
        .evaluate((element) => getComputedStyle(element).position),
    ).toBe("relative");
  }
});

test("no JavaScript shows the complete story without empty pinned tracks", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(
    `${process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000"}/about`,
  );
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("main video")).toHaveCount(0);
  await expect(page.locator("#about-journey li")).toHaveCount(8);
  expect(
    await page
      .locator("[data-about-stage]")
      .evaluate((element) => getComputedStyle(element).position),
  ).toBe("relative");
  expect(
    await page
      .locator("#about-philosophy")
      .evaluate((element) => getComputedStyle(element).minHeight),
  ).toBe("0px");
  await page.locator("#about-contact").scrollIntoViewIfNeeded();
  await expect(page.locator("#about-contact h2")).toBeVisible();
  await context.close();
});

test("a failed film preserves its actual poster and readable copy", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.route(
    "**/brand/aboutus-videos/web/about-execution-layer.mp4",
    (route) => route.abort(),
  );
  await page.goto("/about");
  await expect(page.locator("#about-opening img")).toBeVisible();
  await expect(page.locator("#about-opening video")).toHaveCount(0);
  await expect(page.locator("h1")).toHaveText(about.opening.title);
});

for (const width of [360, 1440]) {
  test(`WCAG AA scan at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    await page.locator("#about-contact").scrollIntoViewIfNeeded();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
```

## tests/loan-calculators.spec.ts

```ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [360, 768, 1440]) {
  test(`Loan Calculators layout, SEO, accessibility and landmarks at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/loan-calculators");

    // Exactly one h1 landmark
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText(
      "Commercial Truck Loan Calculators",
    );

    // Canonical link
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://spotter.ai/loan-calculators",
    );

    // Primary CTA link
    const quoteLinks = page.getByRole("link", {
      name: "Request Financing Quote",
    });
    await expect(quoteLinks.first()).toHaveAttribute(
      "href",
      /request-quote\?product=financing$/,
    );

    // Section landmarks and IDs
    for (const id of [
      "calculator-intro",
      "calculator-suite",
      "equipment-benchmarks",
      "fleet-economics",
      "calculator-contact",
    ]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }

    // Check no horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);

    // Accessibility test (WCAG 2.1 AA)
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);

    expect(errors).toEqual([]);
  });
}

test("Loan Calculators verifies mathematical precision and interactive tab switching", async ({
  page,
}) => {
  await page.goto("/loan-calculators");

  // 1. Amortization default calculations
  await expect(page.locator("#panel-amortization")).toBeVisible();
  await expect(page.getByText("$3,883.94").first()).toBeVisible();
  await expect(page.getByText("$233,036.45")).toBeVisible();
  await expect(page.getByText("$58,036.45")).toBeVisible();

  // Schedule table should display Month 1 row
  await expect(
    page.getByRole("cell", { name: "Month 1", exact: true }),
  ).toBeVisible();

  // 2. Switch to Affordability Calculator
  await page.getByRole("tab", { name: /Affordability Calculator/i }).click();
  await expect(page.locator("#panel-affordability")).toBeVisible();
  await expect(page.getByText("$112,643.32").first()).toBeVisible();

  // 3. Switch to Interest Rate Calculator
  await page.getByRole("tab", { name: /Interest Rate Calculator/i }).click();
  await expect(page.locator("#panel-interest-rate")).toBeVisible();
  await expect(page.getByText("0.00%")).toBeVisible();

  // Test solving for 11.90% APR
  await page
    .locator("#panel-interest-rate input[type='number']")
    .nth(1)
    .fill("3329.09");
  await expect(page.getByText("11.90%")).toBeVisible();
});

test("Loan Calculators responsive touch targets meet minimum 44px on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/loan-calculators");

  const links = page.locator("main a, main button");
  const count = await links.count();
  for (let i = 0; i < count; i++) {
    const el = links.nth(i);
    if (await el.isVisible()) {
      const box = await el.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  }
});

test("Loan Calculators reduced motion provides complete static presentation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/loan-calculators");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("#calculator-suite")).toBeVisible();
  await expect(page.locator("#equipment-benchmarks")).toBeVisible();
  await expect(page.locator("#fleet-economics")).toBeVisible();
});
```

## Removed paths

- components/sections/tms/ChapterScene.tsx — promoted to components/story/
- components/sections/tms/StoryFilm.tsx — promoted to components/story/
- components/sections/tms/FeatureList.tsx — promoted to components/story/
- components/sections/tms/NarrativeBeats.tsx — promoted to components/story/
- components/sections/tms/Story.module.css — promoted to components/story/

## Change summary

Built /about with exact source copy, two supplied films, five original awards and the approved teal palette. New route/content/scales and chapter components; shared story primitives/styles/types promoted and existing consumers updated; local About links/sitemap/docs/tests updated. Three unrelated lint/typecheck cleanups reported in docs/about-implementation.md. Navbar/Footer visual implementations unchanged by this task. All 81 main-page source text items reused exactly; zero marketing rewrites. Accessibility and source-attribution labels are editorial. No assets pending generation. Not found on source: team portraits, office photographs, full roster/biographies, a legal founding date, attributed testimonials, FAQs, pricing or independent verification; none invented. Lint/build pass; 42 regression checks plus 13 final About checks pass. Final production Lighthouse mobile 90/100/100/100; desktop 100/100/100/100.
