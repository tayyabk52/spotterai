const sourceUrl = "https://spotter.ai/lens";
const captured = "October 8, 2026";
const screenshot = (
  id: string,
  width: number,
  height: number,
  bytes: number,
  alt: string,
) => ({
  src: `/lens-assets/${id}.webp`,
  width,
  height,
  bytes,
  alt,
  sourceUrl,
  captured,
  status: "actual product screenshot" as const,
  license:
    "Captured from the original Spotter Lens page for the owner's requested product-page build. No separate third-party license supplied. Historical product data is visible; this is not a live feed. No interface or figures were generated.",
});

export const lensAssets = {
  social: {
    ...screenshot(
      "social",
      1200,
      630,
      231999,
      "Actual Spotter Lens market application captured for the page sharing image",
    ),
    src: "/lens-assets/social.png",
  },
  map: screenshot(
    "market-map",
    1180,
    896,
    75982,
    "Spotter Lens profitability map of US freight markets, with the VAN selector and cold-to-hot legend",
  ),
  rankings: screenshot(
    "market-rankings",
    900,
    1120,
    65286,
    "Actual Spotter Lens market rankings with Spotter Index values per hour and one-day changes",
  ),
  history: screenshot(
    "market-history",
    1200,
    850,
    29028,
    "Spotter Lens all-markets history chart with location search and selectable time ranges",
  ),
};

export const lens = {
  sourceUrl,
  captured,
  copyStatus: {
    functionalLabels: "reuse",
    headingsAndDescriptions: "rewrite",
    controlsAndMetadata: "editorial",
  },
  metadata: {
    title: "Spotter Lens | Freight Market Intelligence",
    description:
      "Explore freight markets with Spotter Lens: market rankings, profitability per hour, a US market map and historical charts with location search.",
    url: sourceUrl,
    image: "/lens-assets/social.png",
  },
  hero: {
    label: "Spotter Lens / Market intelligence",
    title: "See the market.",
    emphasis: "Choose your next move.",
    description:
      "Put your next freight decision in context. Explore market rankings, compare profitability and follow how the market moves over time.",
    explore: "Explore Lens",
    mapLabel: "01 / The market, mapped",
    mapTitle: "A wider view of profitability.",
    mapDescription:
      "View freight markets across the US with a cold-to-hot profitability map. Select VAN, RFER or FLAT to match the equipment you’re looking at.",
  },
  rankings: {
    id: "lens-rankings",
    number: "02",
    label: "Market rankings",
    title: "Find your market.",
    emphasis: "See where it stands.",
    description:
      "Compare markets in a ranked list. See the Spotter Index alongside the one-day change, then search by city, state or ZIP code to focus on a location.",
    features: [
      {
        label: "rank",
        title: "Compare markets",
        description: "View each market’s position in the ranked list.",
      },
      {
        label: "SI",
        title: "Profitability per hour",
        description: "The Spotter Index measures profitability per hour.",
      },
      {
        label: "1d change",
        title: "Follow daily movement",
        description:
          "See the one-day change alongside each market’s index value.",
      },
    ],
  },
  history: {
    id: "lens-history",
    number: "03",
    label: "Market history",
    title: "Today’s view.",
    emphasis: "A longer perspective.",
    description:
      "Look beyond a single reading. The market chart lets you explore a day, a week, a month, the full available history or a custom period.",
    detail:
      "Follow the all-markets view or focus on a location through city, state or ZIP code search.",
    ranges: ["1D", "7D", "1M", "MAX", "CUSTOM"],
    rangesLabel: "Available chart time ranges",
  },
  contact: {
    label: "Your next move",
    title: "Bring market context to the conversation.",
    description:
      "Explore the original Lens market view, or talk with us about where market intelligence fits in your operation.",
  },
  actions: {
    demo: {
      label: "Request a demo or quote",
      href: "/request-quote?product=lens",
    },
    live: { label: "Open live Lens", href: sourceUrl },
  },
  ui: {
    chapters: "Explore Lens capabilities",
    snapshot: `Actual Lens screenshot · ${captured}`,
    disclaimer:
      "Screenshots show a captured product view. Market figures are historical, not a live feed.",
    liveContext: "Opens the original market application",
    productName: "Spotter Lens",
  },
};

export const lensChapters = [
  { id: "lens-map", number: "01", label: "Profitability map" },
  { id: lens.rankings.id, number: "02", label: lens.rankings.label },
  { id: lens.history.id, number: "03", label: lens.history.label },
];
