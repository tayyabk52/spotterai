import type { InsightArticle, InsightSummary } from "@/content/insights";

export type InsightsQuery = {
  search: string;
  category: string;
  sort: "latest" | "oldest";
  page: number;
};
export const INSIGHTS_PAGE_SIZE = 9;

export function readInsightsQuery(params: URLSearchParams): InsightsQuery {
  return {
    search: (params.get("q") || "").trim().slice(0, 200),
    category: params.get("category") || "All Articles",
    sort: params.get("sort") === "oldest" ? "oldest" : "latest",
    page: Math.min(
      1000,
      Math.max(1, Number.parseInt(params.get("page") || "1", 10) || 1),
    ),
  };
}

export function insightsQueryHref(
  query: InsightsQuery,
  changes: Partial<InsightsQuery> = {},
) {
  const next = { ...query, ...changes };
  const params = new URLSearchParams();
  if (next.search) params.set("q", next.search);
  if (next.category !== "All Articles") params.set("category", next.category);
  if (next.sort !== "latest") params.set("sort", next.sort);
  if (next.page > 1) params.set("page", String(next.page));
  return `/insights${params.size ? `?${params}` : ""}#latest-articles`;
}

export function summarizeInsight(article: InsightArticle): InsightSummary {
  const {
    id,
    slug,
    title,
    excerpt,
    publishDate,
    readTime,
    category,
    tags,
    image,
  } = article;
  return {
    id,
    slug,
    title,
    excerpt,
    publishDate,
    readTime,
    category,
    tags,
    image,
  };
}

export function selectInsights(
  articles: InsightArticle[],
  query: InsightsQuery,
) {
  const sorted = [...articles].sort(
    (a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate),
  );
  const featured = sorted[0] || null;
  const keyword = query.search.toLocaleLowerCase("en-US");
  const matches = sorted
    .filter((article) => article.slug !== featured?.slug)
    .filter(
      (article) =>
        query.category === "All Articles" ||
        article.category === query.category,
    )
    .filter(
      (article) =>
        !keyword ||
        [
          article.title,
          article.excerpt,
          article.category,
          ...article.tags,
        ].some((text) => text.toLocaleLowerCase("en-US").includes(keyword)),
    );
  if (query.sort === "oldest") matches.reverse();
  return {
    featured,
    total: matches.length,
    visible: matches.slice(0, query.page * INSIGHTS_PAGE_SIZE),
    hasMore: matches.length > query.page * INSIGHTS_PAGE_SIZE,
  };
}
