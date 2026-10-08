```text
app/tms/page.tsx
content/tms.ts
styles/tms-tokens.css
components/motion/StoryMotionProvider.tsx
components/motion/useActiveChapter.ts
components/motion/useChapterProgress.ts
components/motion/useVideoScrub.ts
components/sections/tms/ChapterNavigation.tsx
components/sections/tms/ChapterScene.tsx
components/sections/tms/ContactChapter.tsx
components/sections/tms/EvidenceChapter.tsx
components/sections/tms/FeatureList.tsx
components/sections/tms/FinancialChapter.tsx
components/sections/tms/LoadChapter.tsx
components/sections/tms/MaintenanceChapter.tsx
components/sections/tms/NarrativeBeats.tsx
components/sections/tms/OpeningChapter.tsx
components/sections/tms/OverviewChapter.tsx
components/sections/tms/Story.module.css
components/sections/tms/StoryFilm.tsx
components/sections/tms/VisibilityChapter.tsx
tests/tms.spec.ts
DESIGN.md
docs/content-audit.md
docs/tms-premium-review.md
reports/prepare-tms-media.py
public/brand/videos-tms/scrub/convergence.mp4
public/brand/videos-tms/scrub/convergence.webp
public/brand/videos-tms/scrub/journey.mp4
public/brand/videos-tms/scrub/journey.webp
public/brand/videos-tms/scrub/resolution.mp4
public/brand/videos-tms/scrub/resolution.webp
```

## app/tms/page.tsx

```tsx
import type { Metadata } from "next";
import { tms } from "@/content/tms";
import StoryMotionProvider from "@/components/motion/StoryMotionProvider";
import OpeningChapter from "@/components/sections/tms/OpeningChapter";
import EvidenceChapter from "@/components/sections/tms/EvidenceChapter";
import OverviewChapter from "@/components/sections/tms/OverviewChapter";
import VisibilityChapter from "@/components/sections/tms/VisibilityChapter";
import LoadChapter from "@/components/sections/tms/LoadChapter";
import MaintenanceChapter from "@/components/sections/tms/MaintenanceChapter";
import FinancialChapter from "@/components/sections/tms/FinancialChapter";
import ContactChapter from "@/components/sections/tms/ContactChapter";
import ChapterNavigation from "@/components/sections/tms/ChapterNavigation";
import "@/styles/tms-tokens.css";
import styles from "@/components/sections/tms/Story.module.css";

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
export type FeatureGroup = {
  title: string;
  description: string;
  details?: readonly string[];
};
export type ProductSectionContent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  copyStatus: "rewrite";
  image: ProductPhotoAsset;
  features: readonly FeatureGroup[];
};

const missingPhoto = (id: string, description: string): ProductPhotoAsset => ({
  id,
  status: "placeholder",
  src: null,
  sourceUrl: null,
  license: null,
  width: 1200,
  height: 900,
  alt: description,
  placeholder: `ASSET NEEDED: ${description}`,
});

export const tmsImages = {
  hero: missingPhoto("tms-hero", "trucking fleet photograph"),
  visibility: missingPhoto(
    "tms-visibility",
    "fleet operations team photograph",
  ),
  loads: missingPhoto(
    "tms-loads",
    "truck loading at a freight terminal photograph",
  ),
  maintenance: missingPhoto(
    "tms-maintenance",
    "truck maintenance workshop photograph",
  ),
  financials: missingPhoto(
    "tms-financials",
    "fleet office financial workflow photograph",
  ),
};

export const tms = {
  source: { url: "https://spotter.ai/tms", observed: "October 8, 2026" },
  copyStatus: "rewrite" as const,
  metadata: {
    title: "Spotter TMS: Fleet Operations",
    description:
      "Explore Spotter TMS for fleet visibility, dispatch, maintenance and financial workflows. Request a demo or quote for your operation.",
    url: "https://spotter.ai/tms",
    siteName: "Spotter.ai",
  },
  action: {
    label: "Request a demo or quote",
    href: "https://spotter.ai/request-quote?product=tms",
    copyStatus: "rewrite" as const,
  },
  hero: {
    eyebrow: "Spotter TMS",
    title: "Your fleet. A clearer view.",
    description:
      "Connect the work behind every mile, from dispatch and fuel decisions to vehicle care and driver pay.",
    secondary: "Explore capabilities",
    secondaryHref: "#tms-capabilities",
    image: tmsImages.hero,
  },
  coverage: {
    title: "In the industry conversation",
    publishers: [
      "Transport Dive",
      "Medium",
      "Fusable",
      "Fleet Owner",
      "Fleet News Daily",
      "Heavy Duty Trucking",
    ],
    sourceLabel: "Publications listed on Spotter’s TMS page",
    namesStatus: "reuse" as const,
  },
  results: {
    eyebrow: "Reported outcomes",
    title: "A view of the results.",
    description:
      "Figures published by Spotter for its TMS platform. Outcomes will depend on your operation.",
    supporting:
      "The source reports 500+ fleets across North America and a 4.8/5 rating; its rating methodology is not specified.",
    attribution:
      "Source: Spotter TMS page, observed October 8, 2026. These figures have not been independently verified.",
    metrics: [
      { value: "18%", label: "Reported revenue-per-gallon improvement" },
      { value: "12%", label: "Reported fuel-efficiency gains" },
      { value: "89%", label: "Reported driver retention" },
      { value: "25%", label: "Reported maintenance savings" },
    ],
    figuresStatus: "reuse" as const,
  },
  capabilities: {
    id: "tms-capabilities",
    eyebrow: "The operational picture",
    title: "The details, connected.",
    description: "Bring the daily work of running a fleet into a shared view.",
    items: [
      {
        title: "Performance in context",
        description:
          "Follow gross revenue, revenue per gallon and miles per gallon through dashboards and reporting.",
      },
      {
        title: "A driver’s week",
        description:
          "Review earnings, assigned loads and weekly performance together.",
      },
      {
        title: "Hours and wellness",
        description:
          "Connect ELD records with service hours, disconnect alerts and driver wellness monitoring.",
      },
      {
        title: "Vehicle care",
        description:
          "Coordinate preventive maintenance, pre-trip inspections and vehicle condition notes.",
      },
      {
        title: "Pay across accounts",
        description:
          "Handle payroll calculations, driver settlements and expenses across accounts.",
      },
      {
        title: "Fleet coordination",
        description:
          "See how the core workflows connect across your operation.",
      },
    ],
  },
  contact: {
    eyebrow: "Your next move",
    title: "Let’s talk about your fleet.",
    description:
      "Tell us where your team needs a clearer view. We’ll help you explore how Spotter TMS fits your workflows.",
  },
};

export const tmsVisibility: ProductSectionContent = {
  id: "tms-visibility",
  eyebrow: "Fleet visibility",
  title: "See the work as it moves.",
  description:
    "Bring driver performance, vehicle status, load progress and financial measures into one operational view.",
  copyStatus: "rewrite",
  image: tmsImages.visibility,
  features: [
    {
      title: "Performance",
      description:
        "Follow revenue and fuel measures with reporting and predictive insights.",
    },
    {
      title: "Location",
      description: "Connect GPS and ELD information with route planning.",
    },
    {
      title: "Safety",
      description:
        "Review service hours, wellness alerts and driver safety scores.",
    },
    {
      title: "Decision support",
      description: "Explore AI-assisted recommendations for fleet decisions.",
    },
  ],
};
export const tmsLoadOperations: ProductSectionContent = {
  id: "tms-load-operations",
  eyebrow: "Load operations",
  title: "From assignment to arrival.",
  description:
    "Keep dispatch, documents and delivery progress connected throughout a load’s journey.",
  copyStatus: "rewrite",
  image: tmsImages.loads,
  features: [
    {
      title: "Dispatch with context",
      description:
        "Match loads using driver location, availability, preferences, equipment and past performance.",
      details: [
        "Load and driver matching",
        "Traffic-aware route planning",
        "Availability and preference tracking",
      ],
    },
    {
      title: "Billing that follows the load",
      description:
        "Prepare invoices, rate confirmations and settlements through connected payment workflows.",
    },
    {
      title: "Delivery visibility",
      description:
        "Follow GPS locations and arrival estimates, share updates and collect proof of delivery.",
    },
    {
      title: "Reporting by route and customer",
      description:
        "Review profitability, delivery performance and customer measures.",
    },
  ],
};
export const tmsMaintenance: ProductSectionContent = {
  id: "tms-maintenance",
  eyebrow: "Equipment care",
  title: "Make room for the next mile.",
  description:
    "Keep scheduled work, inspections and service records together so your team can plan vehicle care.",
  copyStatus: "rewrite",
  image: tmsImages.maintenance,
  features: [
    {
      title: "Scheduled maintenance",
      description:
        "Plan preventive work using mileage, engine hours and elapsed time.",
    },
    {
      title: "Pre-trip inspections",
      description: "Capture digital inspection forms, photographs and reports.",
    },
    {
      title: "Vehicle health",
      description: "Monitor diagnostics, fault alerts and vehicle performance.",
    },
    {
      title: "Service history",
      description:
        "Keep maintenance records, costs and vendor details in view.",
    },
  ],
};
export const tmsFinancials: ProductSectionContent = {
  id: "tms-financials",
  eyebrow: "Financial operations",
  title: "Keep the numbers close to the work.",
  description:
    "Connect payroll, expenses and financial reporting with the operation that drives them.",
  copyStatus: "rewrite",
  image: tmsImages.financials,
  features: [
    {
      title: "A connected payroll workflow",
      description:
        "Calculate weekly pay across pay structures, deductions, bonuses and settlements.",
      details: [
        "Multiple payroll accounts",
        "Tax calculations",
        "Direct deposit integration",
        "Driver settlement summaries",
      ],
    },
    {
      title: "Expense records",
      description:
        "Categorize fuel, maintenance, tolls and other operational costs.",
    },
    {
      title: "Financial reporting",
      description: "Review profit and loss, cost per mile and profitability.",
    },
    {
      title: "Multiple entities",
      description:
        "Coordinate financial work across companies, franchises and business entities.",
    },
  ],
};

export const tmsAudit = {
  omitted: [
    "Unexplained comparison percentages",
    "Simulated dashboard data",
    "Unsubstantiated load and maintenance outcome figures",
    "Fuel savings calculator and conflicting eligibility",
    "Unsupported self-funding guarantee",
    "Uncleared publisher logos and fleet portraits",
    "Unspecified thousands-of-users claim",
  ],
  notFound: [
    "FAQs",
    "Attributed testimonial quotations",
    "Certifications",
    "Published pricing table",
  ],
};

export type StoryAsset = {
  id: string;
  src: string;
  poster: string;
  sourceFile: string;
  sourceUrl: string;
  source: "client supplied";
  license: string;
  alt: string;
  width: number;
  height: number;
  duration: number;
  bytes: number;
};
const suppliedAsset = (
  id: string,
  sourceFile: string,
  alt: string,
  duration: number,
  bytes: number,
): StoryAsset => ({
  id,
  sourceFile,
  sourceUrl: `/brand/videos-tms/${sourceFile}`,
  source: "client supplied",
  license:
    "Supplied by the owner for this page; no separate third-party license supplied.",
  src: `/brand/videos-tms/scrub/${id}.mp4`,
  poster: `/brand/videos-tms/scrub/${id}.webp`,
  alt,
  width: 1280,
  height: 720,
  duration,
  bytes,
});
export const storyAssets = {
  convergence: suppliedAsset(
    "convergence",
    "Circular_modules_connecting_into.mp4",
    "Teal circular modules connecting into a coordinated assembly",
    7.96,
    3272919,
  ),
  journey: suppliedAsset(
    "journey",
    "Marker_moving_along.mp4",
    "A coral marker following a sculpted route between connected modules",
    7.96,
    4867716,
  ),
  resolution: suppliedAsset(
    "resolution",
    "Abstract_film_resolving_into_orde.mp4",
    "Pale planes and teal blocks moving into an orderly assembly",
    5.96,
    1863971,
  ),
};
export const storyChapters = [
  {
    id: "tms-intro",
    label: "Behind every mile",
    number: "01",
    motion: "pin",
    asset: "convergence",
  },
  {
    id: "tms-results",
    label: "The reported picture",
    number: "02",
    motion: "reveal",
    asset: null,
  },
  {
    id: "tms-capabilities",
    label: "One operation",
    number: "03",
    motion: "pin",
    asset: "journey",
  },
  {
    id: "tms-visibility",
    label: "See it moving",
    number: "04",
    motion: "parallax",
    asset: "convergence",
  },
  {
    id: "tms-load-operations",
    label: "Move the load",
    number: "05",
    motion: "parallax",
    asset: "journey",
  },
  {
    id: "tms-maintenance",
    label: "Stay ready",
    number: "06",
    motion: "pin",
    asset: "resolution",
  },
  {
    id: "tms-financials",
    label: "Close the loop",
    number: "07",
    motion: "parallax",
    asset: "resolution",
  },
  {
    id: "tms-contact",
    label: "Your next move",
    number: "08",
    motion: "static",
    asset: null,
  },
] as const;
export const tmsStory = {
  copyStatus: "rewrite" as const,
  navigationLabel: "TMS story chapters",
  pause: "Pause motion",
  resume: "Enable motion",
  scrollHint: "Scroll to follow the story",
  hero: {
    eyebrow: "Spotter TMS / Connected fleet operations",
    title: "The work behind every mile.",
    description:
      "A load on the road is only part of the picture. Bring the people, decisions and daily workflows behind it into view.",
    secondary: "Explore the operation",
  },
  overview: {
    eyebrow: "One operation",
    title: "Six workflows. One connected view.",
    description:
      "From a driver’s week to the numbers behind each mile, see how the pieces relate.",
    features: [
      {
        title: "Performance in context",
        description: "Revenue, fuel use and miles, together.",
      },
      {
        title: "A driver’s week",
        description: "Earnings, loads and weekly performance.",
      },
      {
        title: "Hours and wellness",
        description: "Service hours, ELD alerts and wellness.",
      },
      {
        title: "Vehicle care",
        description: "Maintenance, inspections and condition notes.",
      },
      {
        title: "Pay across accounts",
        description: "Payroll, settlements and expenses.",
      },
      {
        title: "Fleet coordination",
        description: "The daily workflows behind your operation.",
      },
    ],
  },
  visibility: {
    eyebrow: "See it moving",
    title: "Less searching. More perspective.",
    description: tmsVisibility.description,
  },
  loads: {
    eyebrow: "Move the load",
    title: "Every handoff has a next step.",
    description: tmsLoadOperations.description,
  },
  maintenance: {
    eyebrow: "Stay ready",
    title: "The next mile starts here.",
    description: tmsMaintenance.description,
  },
  financials: {
    eyebrow: "Close the loop",
    title: "Bring the work into balance.",
    description: tmsFinancials.description,
  },
  contact: {
    eyebrow: "Your next move",
    title: "Let’s look at your operation.",
    description: tms.contact.description,
  },
};
```

## styles/tms-tokens.css

```css
/* TMS-only story scale. Colors inherit the approved root tokens.css palette. */
.tmsStory {
  --tms-ink: var(--color-ink);
  --tms-light: var(--color-canvas);
  --tms-pale: var(--color-pale);
  --tms-title: clamp(3rem, 7.3vw, 7.5rem);
  --tms-heading: clamp(2.5rem, 4.6vw, 4.75rem);
  --tms-pin-heading: clamp(2.5rem, 4vw, 3.75rem);
  --tms-tablet-title: clamp(3rem, 7vw, 5rem);
  --tms-mobile-number: clamp(3rem, 14vw, 3.5rem);
  --tms-subheading: clamp(1.25rem, 1.55vw, 1.5rem);
  --tms-body: clamp(1rem, 1.25vw, 1.125rem);
  --tms-lead: clamp(1.125rem, 1.5vw, 1.375rem);
  --tms-number: clamp(3.5rem, 7vw, 7rem);
  --tms-caption: 0.8125rem;
  --tms-gutter: clamp(1.5rem, 5.5vw, 6rem);
  --tms-space: clamp(5rem, 10vw, 10rem);
  --tms-gap: clamp(2rem, 5vw, 6rem);
  --tms-width: 1440px;
  --tms-control: 52px;
  --tms-rail-height: 64px;
  --tms-pin-distance: 300svh;
  --tms-hero-distance: 240svh;
  --tms-scene-radius: 24px;
  --tms-caption-width: 560px;
  --tms-beat-heading: clamp(1.5rem, 2vw, 2rem);
  --tms-ease: cubic-bezier(0.16, 1, 0.3, 1);
  --tms-ink-overlay: color-mix(in srgb, var(--color-ink) 96%, transparent);
}
```

## components/motion/StoryMotionProvider.tsx

```tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";
import { LazyMotion } from "framer-motion";
const query =
  "(min-width: 1024px) and (min-height: 850px) and (prefers-reduced-motion: no-preference)";
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => false;
const loadFeatures = () =>
  import("../motion-features").then((module) => module.default);
const StoryMotionContext = createContext({
  enabled: false,
  eligible: false,
  paused: false,
  toggle: () => {},
});
export const useStoryMotion = () => useContext(StoryMotionContext);
export default function StoryMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const eligible = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [paused, setPaused] = useState(false);
  return (
    <StoryMotionContext.Provider
      value={{
        eligible,
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

## components/motion/useActiveChapter.ts

```ts
"use client";
import { useEffect, useState } from "react";
export default function useActiveChapter(ids: readonly string[]) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let next = 0;
      ids.forEach((id, index) => {
        if (
          (document.getElementById(id)?.getBoundingClientRect().top ??
            Infinity) <=
          innerHeight * 0.45
        )
          next = index;
      });
      setActive(next);
      const main = document.getElementById("main-content");
      setVisible(
        (main?.getBoundingClientRect().bottom ?? 0) > innerHeight * 0.4,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);
  return { active, visible };
}
```

## components/motion/useChapterProgress.ts

```ts
"use client";
import { useRef, useSyncExternalStore } from "react";
import { useScroll } from "framer-motion";
const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};
const headerHeight = () =>
  document.querySelector("header")?.getBoundingClientRect().height ?? 88;
export default function useChapterProgress<T extends HTMLElement = HTMLElement>(
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
import type { MotionValue } from "framer-motion";

export default function useVideoScrub(
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

## components/sections/tms/ChapterNavigation.tsx

```tsx
"use client";
import { useEffect, useRef } from "react";
import { PauseIcon } from "@phosphor-icons/react/dist/ssr/Pause";
import { PlayIcon } from "@phosphor-icons/react/dist/ssr/Play";
import { storyChapters, tmsStory } from "@/content/tms";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import useActiveChapter from "@/components/motion/useActiveChapter";
import styles from "./Story.module.css";
const ids = storyChapters.map((chapter) => chapter.id);
export default function ChapterNavigation() {
  const navigation = useRef<HTMLElement>(null);
  const { active, visible } = useActiveChapter(ids);
  const { eligible, paused, toggle } = useStoryMotion();
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
      aria-label={tmsStory.navigationLabel}
      hidden={!visible}
    >
      <ol>
        {storyChapters.map((chapter, index) => (
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
      {eligible && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          aria-label={paused ? tmsStory.resume : tmsStory.pause}
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

## components/sections/tms/ChapterScene.tsx

```tsx
"use client";
import { m, useTransform } from "framer-motion";
import useChapterProgress from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import type { StoryAsset, FeatureGroup } from "@/content/tms";
import StoryFilm from "./StoryFilm";
import NarrativeBeats from "./NarrativeBeats";
import FeatureList from "./FeatureList";
import Reveal from "@/components/Reveal";
import styles from "./Story.module.css";

export default function ChapterScene({
  id,
  number,
  label,
  title,
  description,
  asset,
  features,
  pinned = false,
  light = false,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  asset: StoryAsset;
  features: readonly FeatureGroup[];
  pinned?: boolean;
  light?: boolean;
}) {
  const { ref, progress } = useChapterProgress(pinned);
  const { ref: mediaRef, progress: mediaProgress } =
    useChapterProgress<HTMLDivElement>();
  const { enabled, eligible } = useStoryMotion();
  const y = useTransform(mediaProgress, [0, 1], [20, -20]);
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      data-tms-pin={pinned || undefined}
      className={`${styles.chapter} ${pinned ? styles.pinChapter : ""} ${light ? styles.light : styles.dark}`}
    >
      <div
        className={pinned ? styles.stickyScene : styles.scene}
        data-cinematic={(pinned && eligible) || undefined}
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
          <m.div
            ref={mediaRef}
            className={styles.sceneMedia}
            style={{ y: enabled && !pinned ? y : 0 }}
          >
            <StoryFilm
              asset={asset}
              progress={pinned && eligible ? progress : mediaProgress}
            />
          </m.div>
          {pinned ? (
            <NarrativeBeats
              features={features}
              progress={progress}
              sectionId={id}
            />
          ) : (
            <FeatureList features={features} compact />
          )}
        </div>
      </div>
    </section>
  );
}
```

## components/sections/tms/ContactChapter.tsx

```tsx
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { tms, tmsStory, storyChapters } from "@/content/tms";
import styles from "./Story.module.css";
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
import styles from "./Story.module.css";
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

## components/sections/tms/FeatureList.tsx

```tsx
import type { FeatureGroup } from "@/content/tms";
import styles from "./Story.module.css";
export default function FeatureList({
  features,
  compact = false,
}: {
  features: readonly FeatureGroup[];
  compact?: boolean;
}) {
  return (
    <ul className={`${styles.features} ${compact ? styles.compact : ""}`}>
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

## components/sections/tms/FinancialChapter.tsx

```tsx
import {
  tmsFinancials,
  tmsStory,
  storyAssets,
  storyChapters,
} from "@/content/tms";
import ChapterScene from "./ChapterScene";
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
import ChapterScene from "./ChapterScene";
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
import ChapterScene from "./ChapterScene";
export default function MaintenanceChapter() {
  const chapter = storyChapters[5];
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={tmsStory.maintenance.eyebrow}
      title={tmsStory.maintenance.title}
      description={tmsStory.maintenance.description}
      asset={storyAssets.resolution}
      pinned
      features={tmsMaintenance.features}
    />
  );
}
```

## components/sections/tms/NarrativeBeats.tsx

```tsx
"use client";
import { useState } from "react";
import { m, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import type { FeatureGroup } from "@/content/tms";
import styles from "./Story.module.css";

export default function NarrativeBeats({
  features,
  progress,
  sectionId,
}: {
  features: readonly FeatureGroup[];
  progress: MotionValue<number>;
  sectionId: string;
}) {
  const { enabled, eligible } = useStoryMotion();
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

## components/sections/tms/OpeningChapter.tsx

```tsx
"use client";
import { m, useTransform } from "framer-motion";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import { tms, tmsStory, storyAssets } from "@/content/tms";
import useChapterProgress from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import StoryFilm from "./StoryFilm";
import styles from "./Story.module.css";

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
import ChapterScene from "./ChapterScene";
export default function OverviewChapter() {
  const chapter = storyChapters[2];
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={tmsStory.overview.eyebrow}
      title={tmsStory.overview.title}
      description={tmsStory.overview.description}
      asset={storyAssets.journey}
      pinned
      features={tmsStory.overview.features}
    />
  );
}
```

## components/sections/tms/Story.module.css

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
.light .featureNumber {
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
.light .features p {
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

## components/sections/tms/StoryFilm.tsx

```tsx
"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { useInView, type MotionValue } from "framer-motion";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import useVideoScrub from "@/components/motion/useVideoScrub";
import type { StoryAsset } from "@/content/tms";
import styles from "./Story.module.css";

export default function StoryFilm({
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
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { enabled, eligible } = useStoryMotion();
  const inView = useInView(wrap, { margin: "150px 0px 150px 0px" });
  const entered = useInView(wrap, {
    margin: "450px 0px 450px 0px",
    once: true,
  });
  const mounted = entered && eligible && scrub && !failed;
  const active = enabled && inView && mounted;
  useVideoScrub(video, progress, active);
  return (
    <div ref={wrap} className={`${styles.film} ${hero ? styles.heroFilm : ""}`}>
      <div className={styles.filmLayer}>
        <Image
          src={asset.poster}
          width={asset.width}
          height={asset.height}
          alt={asset.alt}
          sizes="100vw"
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
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
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

## components/sections/tms/VisibilityChapter.tsx

```tsx
import {
  tmsVisibility,
  tmsStory,
  storyAssets,
  storyChapters,
} from "@/content/tms";
import ChapterScene from "./ChapterScene";
export default function VisibilityChapter() {
  const chapter = storyChapters[3];
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={tmsStory.visibility.eyebrow}
      title={tmsStory.visibility.title}
      description={tmsStory.visibility.description}
      asset={storyAssets.convergence}
      light
      features={tmsVisibility.features}
    />
  );
}
```

## tests/tms.spec.ts

```ts
import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [360, 768, 1440]) {
  test(`TMS layout and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/tms");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("main")).toHaveAttribute("id", "main-content");
    await expect(page.locator("main section")).toHaveCount(8);
    await expect(page.getByText(/^ASSET NEEDED:/)).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://spotter.ai/tms",
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "Spotter TMS: Fleet Operations",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const action of await page.locator("main a").all()) {
      const box = await action.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
      expect(box?.width).toBeGreaterThanOrEqual(44);
    }
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `reports/tms-${width}.png`, fullPage: true });
  });
}

test("TMS anchor, contact destination and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/tms");
  await page
    .getByRole("link", { name: "Explore the operation", exact: true })
    .click();
  await expect(page).toHaveURL(/#tms-capabilities$/);
  const target = page.locator("#tms-capabilities");
  await expect(target).toBeInViewport();
  expect(
    await target.evaluate((element) => element.getBoundingClientRect().top),
  ).toBeGreaterThanOrEqual(88);
  expect(await page.evaluate(() => document.activeElement?.id)).toBe(
    "tms-capabilities",
  );
  for (const action of await page
    .locator("main")
    .getByRole("link", { name: "Request a demo or quote" })
    .all()) {
    await expect(action).toHaveAttribute(
      "href",
      "https://spotter.ai/request-quote?product=tms",
    );
  }
  expect(
    await page
      .locator("main")
      .evaluate((element) => element.getAnimations({ subtree: true }).length),
  ).toBe(0);
});

test("TMS content is available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/tms");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Bring the work into balance." }),
  ).toBeVisible();
  await expect(page.getByText("18%", { exact: true })).toBeVisible();
  await expect(page.getByText(/^ASSET NEEDED:/)).toHaveCount(0);
  await context.close();
});

test("desktop story scrubs forward and backward and can be paused", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/tms");
  const scene = page.locator("#tms-capabilities");
  const geometry = await scene.evaluate((element) => ({
    top: element.getBoundingClientRect().top + scrollY,
    height: element.getBoundingClientRect().height,
  }));
  const travel = geometry.height - 900 + 88;
  const video = scene.locator("video");
  await page.evaluate((y) => scrollTo(0, y), geometry.top - 88 + travel * 0.2);
  await expect(video).toHaveCount(1);
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(1);
  const early = await video.evaluate(
    (element: HTMLVideoElement) => element.currentTime,
  );
  await page.evaluate((y) => scrollTo(0, y), geometry.top - 88 + travel * 0.8);
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(early + 3);
  await page.evaluate((y) => scrollTo(0, y), geometry.top - 88 + travel * 0.2);
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeLessThan(early + 0.3);
  const pinned = await scene.locator(":scope > div").boundingBox();
  expect(pinned?.height).toBeLessThanOrEqual(812);
  expect(pinned?.y).toBeCloseTo(88, 0);
  await expect(
    page.getByRole("link", { name: "03 One operation", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  expect(
    await video.evaluate((element: HTMLVideoElement) => element.paused),
  ).toBe(true);
  const frozen = await video.evaluate(
    (element: HTMLVideoElement) => element.currentTime,
  );
  await page.evaluate((y) => scrollTo(0, y), geometry.top - 88 + travel * 0.7);
  expect(
    await video.evaluate((element: HTMLVideoElement) => element.currentTime),
  ).toBe(frozen);
  await expect(
    page.getByRole("button", { name: "Enable motion", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(scene.locator("img")).toBeVisible();
});

test("mobile and reduced motion use posters without video requests", async ({
  browser,
}) => {
  for (const options of [
    { viewport: { width: 360, height: 800 } },
    {
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce" as const,
    },
  ]) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    const videoRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().endsWith(".mp4")) videoRequests.push(request.url());
    });
    await page.goto("/tms");
    await page.locator("#tms-financials").scrollIntoViewIfNeeded();
    await expect(page.locator("main img")).toHaveCount(6);
    await expect(page.locator("main video")).toHaveCount(0);
    expect(videoRequests).toEqual([]);
    expect(
      await page
        .locator("#tms-capabilities > div")
        .evaluate((element) => getComputedStyle(element).position),
    ).not.toBe("sticky");
    await context.close();
  }
});

test("failed video retains its poster and readable content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.route("**/*.mp4", (route) => route.abort());
  await page.goto("/tms");
  await expect(page.locator("#tms-intro img")).toBeVisible();
  await expect(page.locator("#tms-intro video")).toHaveCount(0);
  await expect(page.locator("h1")).toBeVisible();
});

for (const id of ["tms-intro", "tms-capabilities", "tms-maintenance"]) {
  test(`${id} decodes its opening and final frames and retains the video on re-entry`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/tms");
    const scene = page.locator(`#${id}`);
    const track = id === "tms-intro" ? scene.locator("[data-tms-pin]") : scene;
    const geometry = await track.evaluate((element) => ({
      top: element.getBoundingClientRect().top + scrollY - 88,
      travel: element.getBoundingClientRect().height - innerHeight + 88,
    }));
    await page.evaluate((y) => scrollTo(0, y), geometry.top);
    const video = scene.locator("video");
    await expect(video).toHaveCount(1);
    await expect
      .poll(() =>
        video.evaluate((element: HTMLVideoElement) => element.readyState),
      )
      .toBeGreaterThanOrEqual(2);
    await expect
      .poll(() =>
        video.evaluate((element: HTMLVideoElement) => element.currentTime),
      )
      .toBeLessThan(0.05);
    const handle = await video.elementHandle();
    await video.evaluate((element: HTMLVideoElement) => {
      const presented = (
        _now: number,
        metadata: VideoFrameCallbackMetadata,
      ) => {
        element.dataset.presentedTime = String(metadata.mediaTime);
        element.requestVideoFrameCallback(presented);
      };
      element.requestVideoFrameCallback(presented);
    });
    await page.evaluate((y) => scrollTo(0, y), geometry.top + geometry.travel);
    const final = await video.evaluate(
      (element: HTMLVideoElement) => element.duration - 1 / 24,
    );
    await expect
      .poll(() =>
        video.evaluate((element: HTMLVideoElement) =>
          Math.abs(element.currentTime - (element.duration - 1 / 24)),
        ),
      )
      .toBeLessThan(0.05);
    await expect
      .poll(() =>
        video.evaluate((element: HTMLVideoElement) =>
          Math.abs(
            Number(element.dataset.presentedTime) - (element.duration - 1 / 24),
          ),
        ),
      )
      .toBeLessThan(0.06);
    await page.locator("#tms-contact").scrollIntoViewIfNeeded();
    expect(await handle!.evaluate((element) => element.isConnected)).toBe(true);
    await page.evaluate(
      (y) => scrollTo(0, y),
      geometry.top + geometry.travel * 0.3,
    );
    expect(
      await handle!.evaluate(
        (element, id) => element === document.querySelector(`#${id} video`),
        id,
      ),
    ).toBe(true);
    await expect
      .poll(() =>
        video.evaluate((element: HTMLVideoElement) =>
          Math.abs(element.currentTime - (element.duration - 1 / 24) * 0.3),
        ),
      )
      .toBeLessThan(0.06);
    expect(final).toBeGreaterThan(5);
  });
}

test("wide footage remains uncropped and its captions follow scroll and keyboard controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/tms");
  const scene = page.locator("#tms-capabilities");
  const geometry = await scene.evaluate((element) => ({
    top: element.getBoundingClientRect().top + scrollY - 88,
    travel: element.getBoundingClientRect().height - innerHeight + 88,
  }));
  await page.evaluate(
    (y) => scrollTo(0, y),
    geometry.top + geometry.travel * 0.4,
  );
  await expect(
    scene.getByRole("heading", { name: "Hours and wellness", exact: true }),
  ).toBeVisible();
  const video = scene.locator("video");
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState))
    .toBeGreaterThanOrEqual(2);
  expect(await video.evaluate((v) => getComputedStyle(v).objectFit)).toBe(
    "contain",
  );
  const box = await video.boundingBox();
  expect(box!.width).toBe(1440);
  expect(box!.height).toBe(812);
  const beat = scene.getByRole("button", {
    name: "Fleet coordination",
    exact: true,
  });
  await beat.focus();
  await page.keyboard.press("Enter");
  await expect(
    scene.getByRole("heading", { name: "Fleet coordination", exact: true }),
  ).toBeVisible();
  await expect(beat).toHaveAttribute("aria-pressed", "true");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const violations = (
    await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze()
  ).violations;
  expect(violations).toEqual([]);
});

test("normal chapters scrub across the media passage rather than the copy height", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/tms");
  const scene = page.locator("#tms-load-operations");
  await scene.scrollIntoViewIfNeeded();
  const video = scene.locator("video");
  await expect(video).toHaveCount(1);
  const geometry = await video.evaluate((v) => {
    const wrapper = v.closest("div")!.parentElement!.parentElement!;
    return {
      top: wrapper.getBoundingClientRect().top + scrollY,
      height: wrapper.getBoundingClientRect().height,
    };
  });
  await page.evaluate(
    (y) => scrollTo(0, y),
    geometry.top + geometry.height - 88,
  );
  await expect
    .poll(() =>
      video.evaluate((v: HTMLVideoElement) =>
        Math.abs(v.currentTime - (v.duration - 1 / 24)),
      ),
    )
    .toBeLessThan(0.2);
});
```

## DESIGN.md

```md
# Design — Spotter.ai

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
```

## docs/content-audit.md

```md
# Homepage content audit

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

Owner supplied three abstract videos in public/brand/videos-tms and authorized building the cinematic scroll version. Their provenance is recorded as client supplied, with no separate third-party license supplied. Original files are preserved; web encodes and WebP posters are derived locally. The separate maintenance clip was not supplied; maintenance and financial chapters share the resolution film. No real people, customer imagery, invented interface or generated statistics were added.

Rewritten items: hero heading and introduction, exploration action, overview heading/introduction and six capability summaries, visibility/load/maintenance/financial/contact chapter headings, chapter labels, scroll hint and motion-control accessibility labels. Existing rewritten feature copy and source-attributed metrics remain. Publisher names and figures remain marked reuse; all prose is marked rewrite in content/tms.ts. The former five photo placeholders are not rendered in this approved abstract-film version. FAQs, attributed testimonials, certifications and published pricing remain not found on source. Unsupported guarantees, simulated dashboard figures and unresolved calculator claims remain omitted.

Shared Navbar, Footer, root tokens and global scrolling behavior were not changed. Chapter ranges are storyboard estimates; active navigation follows actual section geometry. Native scroll drives video time in both directions, with poster fallback on mobile/reduced motion or playback failure.

## TMS film correction audit, 2026-10-08

No new promotional copy or marketing claims. Existing headings, body text, capability descriptions, publisher names, source attribution and action destinations remain. Removed unused storyboard percentage ranges and unused film-caption copy; chapter motion metadata now describes the implemented hero pin and financial-media parallax. Navigation tooltips reuse existing chapter labels.

Three owner-supplied abstract films remain the only imagery. New all-intra derivatives and first-frame WebP posters live in public/brand/videos-tms/scrub; exact byte counts and original source paths are recorded in content/tms.ts. No generated people, customer identity, product interfaces, testimonials or fabricated evidence were added. All original source files are intact.

The previously documented ranges were estimates; those unused values are now removed. Both scene activation and video progress follow rendered geometry. Research distinguishes supported fixes from inaccuracies in the pasted review: Next.js 16 supports preload, explicit width/height with sized contain containers is valid, and precise media seeking is not restricted to keyframes. The all-intra encoding choice reduces decoding dependencies rather than relying on that incorrect restriction.
```

## docs/tms-premium-review.md

```md
# TMS premium review and completion evidence

## Study completed before implementation

Read both owner-supplied pasted-text files under the attachment 4115b4a6-5b4b-487b-b96d-ad0cb913311e. Read PRODUCT.md, DESIGN.md and the content audit, ran Impeccable's context loader, and studied its brand, animation and polish references.

Inspected https://www.bb-b.net/ through Playwright at 1440px and 390px, including its headings, video geometry, scrolling compositions and 12 loaded script resources. The reference uses wide media and deliberate headline hierarchy. No evidence was found for a pinned scroll-video hero in the loaded homepage; it has a looping video and timed subtitle logic. Its Motion runtime and requestAnimationFrame handling were observed. We use those findings as visual direction, not as a claim that its code implements our chosen scrub method. Captures and script excerpts are in reports/reference-bbb-*.

Primary technical references checked:

- Motion useScroll: https://motion.dev/docs/react-use-scroll
- Motion upgrade guidance: https://motion.dev/docs/react-upgrade-guide
- MDN currentTime: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime
- MDN readyState: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
- MDN presented-frame callbacks: https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/requestVideoFrameCallback
- MDN reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
- FFmpeg codecs/libx264: https://ffmpeg.org/ffmpeg-codecs.html
- Installed Next.js 16.4 guides: node_modules/next/dist/docs/01-app/02-guides/videos.md and 03-api-reference/02-components/image.md.

## Review findings and disposition

| Guide item              | Verified finding                                                                                                    | Resolution and evidence                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Re-entry unmounts video | Conditional rendering depended on live viewport intersection.                                                       | Element mounts once after approach, persists offscreen and paused; tests compare the same DOM element after leaving and returning.                          |
| GOP and scrub decoding  | Six-frame GOPs require intervening-frame decoding; precise currentTime seeking is not limited to keyframes.         | Benchmarked all-intra encodes, selected those for desktop. Decoder confirmed 191/191/143 independently encoded frames; reports/tms-codec-verification.json. |
| Scroll mapping          | Hero began approximately 40% through its clip at initial viewport position; non-pin mapping followed copy geometry. | Hero/pins use header-to-track-end mapping. Normal films use their own wrapper. Decoded first/final-frame and media-passage tests pass.                      |
| preload claimed invalid | Installed Next 16 explicitly documents preload and deprecates priority.                                             | Retained supported preload, verified successful lint/build and rendered preload link.                                                                       |
| Image/frame sizing      | Rendered narrow containers cropped wide footage despite valid dimensions.                                           | Full-width contain compositions; dimensioned next/image retained, explicit video dimensions added. 1440x812 stage fit verified in browser.                  |
| Motion import migration | Official docs recommend the motion package for a migration; project currently uses Framer Motion 14 throughout.     | Retained the approved working dependency within TMS scope; no new npm dependency or shared component migration.                                             |
| Final frame offset      | Old fixed .05-second subtraction was not tied to encode rate.                                                       | Targets duration minus one 24fps frame, with half-frame seek tolerance. Presented mediaTime confirms the final decoded frame.                               |
| Dead range data         | Storyboard percentage ranges were unused.                                                                           | Removed; current section geometry is the sole source of progress.                                                                                           |

## Visual design and scope

- Complete wide film compositions replace cropped portrait panels.
- The hero gets a dedicated opening-to-ending track; two immersive chapters pair type with sequential capabilities.
- Matte palette-derived scrims, unboxed captions, wide feature films, balanced headings and consistent action details preserve the teal identity without repeating cards.
- Three source films total 10,004,606 bytes in the new derivatives; the largest is 4,867,716 bytes. This exceeds the guide's proposed 2MB target for two desktop clips, an intentional quality tradeoff explicitly suggested by the guide. Mobile requests zero video. No cuts, invented frames or synthetic interfaces were introduced.
- All existing copy and claims are preserved. Navbar, Footer, root palette, shared Reveal and shared scrolling are unchanged. No new assets need generation.

## Verification evidence

- npm run lint and npm run build: passed.
- 23 relevant Playwright tests passed: TMS layout and Axe accessibility at 360/768/1440px, anchors/focus, reduced motion, no JavaScript, media error fallback, reverse seeking, pause, decoded first/final frames, retained element identity, full-frame geometry, caption keyboard controls and shared drawer/scroll behavior.
- Firefox and WebKit engine smoke checks: forward/reverse seeking passed, no page errors or horizontal overflow; reports/tms-browser-checks.json. These are engine checks on Windows, not physical iOS Safari device tests.
- Chromium synthetic animation check: median requestAnimationFrame interval 16.7ms, p95 16.8ms across 181 frames while scrolling the overview; reports/tms-animation-frame-check.json. Source video remains 24fps.
- Under 4x CPU throttling, the 20-point seek sweep reached each target in 52ms at p95, with one 79ms sample; this is a browser automation measurement with polling overhead, not a hardware guarantee. reports/tms-seek-latency.json.
- Lighthouse production mobile: performance 90, accessibility 100, best practices 100, SEO 100, CLS 0. Desktop: 100 in all four categories. JSON audit files are reports/tms-refined-lighthouse-mobile.json and reports/tms-refined-lighthouse-desktop.json.
- Reviewed final rendered screenshots for hero, both cinematic chapters, wide visibility composition, mobile hero/contact and active chapter rail. First-frame/media readiness was awaited before representative captures.
- Separate homepage contrast failure was already reported in the previous full-suite run; that component remains outside the TMS pass.

## Completion audit

The requested study, premium visual improvement, full-film framing, complete scroll timeline, decoder readiness, retained media on re-entry, source provenance, palette preservation, responsive/accessibility fallbacks and production validation have direct evidence above. No active implementation work remains for this scoped TMS refinement. Real-device behavior and network conditions outside the tested environments are not claimed as verified.
- Additional cold-network check: 100ms latency, 1MB/s download throughput and 4x CPU throttling. The hero received rapid targets at 80% then 40% before decoding completed and settled on the latest 40% target (3.169013 seconds), paused and readyState 4. Evidence: reports/tms-throttled-readiness.json. This verifies readiness recovery under the tested throttle, not every network condition.
```

## reports/prepare-tms-media.py

```py
from pathlib import Path
import subprocess
import imageio_ffmpeg

root = Path(__file__).resolve().parents[1] / 'public' / 'brand' / 'videos-tms'
out = root / 'scrub'
out.mkdir(exist_ok=True)
encoder = imageio_ffmpeg.get_ffmpeg_exe()
assets = {
    'convergence': 'Circular_modules_connecting_into.mp4',
    'journey': 'Marker_moving_along.mp4',
    'resolution': 'Abstract_film_resolving_into_orde.mp4',
}
for name, source in assets.items():
    common = [encoder, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(root / source)]
    subprocess.run(common + ['-an', '-vf', 'scale=1280:-2,fps=24', '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-g', '1', '-keyint_min', '1', '-bf', '0', '-sc_threshold', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(out / (name + '.mp4'))], check=True)
    subprocess.run(common + ['-frames:v', '1', '-vf', 'scale=1280:-2', '-c:v', 'libwebp', '-quality', '86', str(out / (name + '.webp'))], check=True)
    print(name, (out / (name + '.mp4')).stat().st_size)
```

## Change summary

Refined TMS cinematic storytelling after studying both attached reviews, bb&b with Playwright and official library/media documentation. Full wide footage replaces portrait cropping; explicit tracks cover opening through final decoded frame; films remain mounted on re-entry and pause; all-intra encodes reduce decoding dependencies; sequential captions and keyboard controls accompany the two pinned chapters. All existing copy/claims remain. Shared Navbar, Footer, root palette, dependencies and global scroll logic unchanged. No additional assets needed; all supplied originals preserved. Existing not-found source items remain FAQs, attributed testimonials, certifications and published pricing.

Validation: lint/build passed; 23 relevant Playwright checks passed. Forward/reverse media seeking passed in Chromium, Firefox and WebKit. Production Lighthouse mobile 90/100/100/100, desktop 100/100/100/100. See docs/tms-premium-review.md for requirement-level evidence, measurements, documentation corrections and test limitations.
