import "server-only";
import { cache } from "react";
import { readDjangoInsights } from "./django-client";
import sourceArticles from "@/content/insights/source-articles.json";
import type { InsightArticle } from "@/content/insights";

export const getInsightArticles = cache(
  async function getInsightArticles(): Promise<InsightArticle[]> {
    const endpoint = process.env.INSIGHTS_API_URL;
    if (!endpoint) return sourceArticles as InsightArticle[];
    const url = new URL(endpoint);
    if (!/^https?:$/.test(url.protocol))
      throw new Error("Invalid Insights endpoint");
    // An explicitly configured feed never silently falls back to old source content.
    return readDjangoInsights(url);
  },
);

export const getInsightArticle = cache(async function getInsightArticle(
  slug: string,
) {
  return (
    (await getInsightArticles()).find((article) => article.slug === slug) ||
    null
  );
});
