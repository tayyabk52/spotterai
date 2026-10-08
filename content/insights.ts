export type InsightImage = {
  src: string;
  sourceUrl: string;
  width: number;
  height: number;
  alt: string;
  status?: string;
  license?: string;
};

export type InsightSummary = {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image: InsightImage | null;
};

export type InsightArticle = InsightSummary & {
  content: string;
  seo?: { title: string; description: string };
  cta?: { title: string; description: string; label: string; href: string };
  sourceUrl?: string;
  inlineImages?: InsightImage[];
  copyStatus?: string;
};

export const insightsContent = {
  source: "https://spotter.ai/insights",
  observed: "2026-10-08",
  copyStatus: "reuse",
  title: "Trucking Insights: TMS, Compliance & Freight | Spotter.ai",
  description:
    "Guides and analysis for trucking fleets: choosing a TMS, ELD and FMCSA compliance, driver screening, fuel costs, and freight market trends.",
  eyebrow: "Insights",
  heading: "Real insights for a stronger",
  headingAccent: "trucking industry",
  introduction: "Guides, trends, and news for carriers and fleets.",
  featured: "Featured",
  readArticle: "Read article",
  latest: "Latest articles",
  sort: "Sort by",
  sortOptions: [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
  ],
  categories: [
    "All Articles",
    "Compliance",
    "Driver Management",
    "Fleet Operations",
    "Technology",
    "Industry Trends",
    "Safety",
    "Company News",
  ],
  search: "Search articles",
  searchPlaceholder: "Search articles…",
  emptyHeading: "No articles match your search",
  emptyBody: "Try a different keyword or clear the category filter.",
  loadMore: "Load more articles",
  back: "Back to Insights",
  related: "Related Articles",
  newsletter: {
    heading: "Get insights in your inbox",
    description: "One email a week. Unsubscribe anytime.",
    label: "Email address",
    placeholder: "you@company.com",
    submit: "Subscribe",
    pending: "Subscribing",
    success: "Successfully subscribed! You'll receive our weekly newsletter.",
    invalid: "Please enter a valid email address",
    failure: "Failed to subscribe. Please try again later.",
  },
  // These recovery / accessibility labels are interface copy, not article claims.
  interface: {
    clear: "Clear filters",
    searchButton: "Search",
    filterLabel: "Article categories",
    available: "Articles are temporarily unavailable. Please try again.",
    retry: "Try again",
    menuUnavailable: "Articles are temporarily unavailable.",
    menuLoading: "Loading articles…",
    menuAll: "View all articles in Insights",
    newsletterRequiresJavaScript:
      "Enable JavaScript to subscribe to the newsletter.",
  },
} as const;

export function insightHref(slug: string) {
  return `/insights/${encodeURIComponent(slug)}`;
}

export function formatInsightDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
