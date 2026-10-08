import { getInsightArticles } from "@/lib/insights/repository";
import {
  readInsightsQuery,
  selectInsights,
  summarizeInsight,
} from "@/lib/insights/query";

export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;
    const articles = await getInsightArticles();
    const menu = params.get("menu") === "1";
    const selection = selectInsights(articles, readInsightsQuery(params));
    const visible = menu
      ? [...articles]
          .sort((a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate))
          .slice(0, 7)
      : selection.visible;
    return Response.json(
      {
        articles: visible.map(summarizeInsight),
        featured: menu
          ? null
          : selection.featured
            ? summarizeInsight(selection.featured)
            : null,
        total: selection.total,
        hasMore: !menu && selection.hasMore,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=60, stale-while-revalidate=240",
        },
      },
    );
  } catch {
    return Response.json(
      { message: "Articles are temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
