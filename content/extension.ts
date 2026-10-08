export type ExtensionFeature = { title: string; description: string };
import type { ProductDemoAsset } from "./product-media";
export type { ProductDemoAsset } from "./product-media";
const demo = (
  id: string,
  width: number,
  height: number,
  duration: number,
  bytes: number,
  alt: string,
): ProductDemoAsset => ({
  src: `/extension-assets/web/${id}.mp4`,
  poster: `/extension-assets/${id}.webp`,
  width,
  height,
  duration,
  bytes,
  alt,
  sourceUrl: `https://spotter.ai/extension-assets/${id}.mp4`,
  license:
    "Original Spotter asset downloaded at the owner's request; no separate third-party license supplied. Muted web derivative prepared from the preserved original; poster is an actual decoded frame at one second (the opening frame is blank).",
});
export const extensionAssets = {
  main: demo(
    "extension-main",
    1280,
    770,
    10.833333,
    1063703,
    "Load Spotter extension workflow demonstration on a load board",
  ),
  email: demo(
    "extension-gif-email",
    1280,
    826,
    8,
    59431,
    "Load inquiry email workflow demonstration",
  ),
  market: demo(
    "extension-gif-market",
    1280,
    840,
    11.066667,
    1856162,
    "Destination market and pricing insights demonstration",
  ),
  filters: demo(
    "extension-gif-filters",
    1280,
    826,
    11,
    99261,
    "Load filtering and search helpers demonstration",
  ),
};
export const extension = {
  source: "https://spotter.ai/extension",
  observed: "October 8, 2026",
  copyStatus: "reuse" as const,
  metadata: {
    title: "Load Spotter Chrome Extension",
    description:
      "Navigate the freight market with Load Spotter: email automation, market and pricing insights, and load-board search helpers in a Chrome extension.",
    url: "https://spotter.ai/extension",
    image: "/extension-assets/social.png",
  },
  install: {
    label: "Add to Chrome",
    href: "https://chromewebstore.google.com/detail/load-spotter/anjknaophdgkjljelgjgoieopobgoaci",
  },
  hero: {
    label: "Load Spotter",
    title: "Navigate the freight market like a Pro",
    titleStart: "Navigate the freight market",
    titleEmphasis: "like a Pro",
    exploration: "Explore the extension",
    description: "Email automation. Market data. Search helpers.",
  },
  email: {
    id: "extension-email",
    number: "01",
    label: "Email automation",
    title: "Email automation",
    features: [
      {
        title: "Click to Email",
        description: "speed up your workflow with single click emails.",
      },
      {
        title: "Email Templates",
        description: "customize load inquiries to your liking.",
      },
      {
        title: "Gmail Integrated",
        description: "all correspondence is linked with your Gmail account.",
      },
    ],
  },
  market: {
    id: "extension-market",
    number: "02",
    label: "Market data",
    title: "Market data",
    features: [
      {
        title: "Market Insights",
        description: "color-coded destination markets.",
      },
      {
        title: "Pricing Insights",
        description: "AI-generated prices and average broker rates.",
      },
      {
        title: "Best Load",
        description: "Our AI highlights the next best load for you.",
      },
    ],
  },
  filters: {
    id: "extension-filters",
    number: "03",
    label: "Search helpers",
    title: "Search helpers",
    features: [
      {
        title: "Comment Filtering",
        description: "filter out loads that you don't care about.",
      },
      {
        title: "Advanced Filtering",
        description:
          "skip cross-border and non-factored loads, minimum mile by time filter.",
      },
      {
        title: "Click to Gmaps",
        description: "open Google Maps with a single click.",
      },
    ],
  },
  contact: {
    label: "Load Spotter",
    title: "Navigate the freight market like a Pro",
    description: "Email automation. Market data. Search helpers.",
  },
  ui: {
    chapters: "Extension capabilities",
    demonstration: "Product demonstration",
    source: "Original product demonstrations from Spotter",
    play: "Play demonstration",
    fallback: "The video could not load. View the original demonstration.",
    unavailable: "Video playback is unavailable in this browser.",
  },
  editorialStatus:
    "Hero capability summary combines original section labels. Exploration link, media controls, source attribution, metadata and closing composition are editorial interface copy. Feature wording and installation destination reuse the source.",
};
export const extensionChapters = [
  extension.email,
  extension.market,
  extension.filters,
];
export const extensionArchivedAssets = [
  {
    src: "/extension-assets/click-to-email-icon.png",
    sourceUrl: "https://spotter.ai/extension-assets/click-to-email-icon.png",
    alt: "Source email artwork",
    license:
      "Source asset downloaded at owner's request; no separate third-party license supplied.",
    status: "downloaded, archived; shared Phosphor icons used in interface",
  },
  {
    src: "/extension-assets/template-icon.png",
    sourceUrl: "https://spotter.ai/extension-assets/template-icon.png",
    alt: "Source template artwork",
    license:
      "Source asset downloaded at owner's request; no separate third-party license supplied.",
    status: "downloaded, archived; shared Phosphor icons used in interface",
  },
  {
    src: "/extension-assets/gmail-icon.png",
    sourceUrl: "https://spotter.ai/extension-assets/gmail-icon.png",
    alt: "Source Gmail artwork",
    license:
      "Source asset downloaded at owner's request; no separate third-party license supplied.",
    status: "downloaded, archived; no new third-party logo placement",
  },
];
