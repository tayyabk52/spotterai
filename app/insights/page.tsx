import type { Metadata } from "next";
import { insightsContent as copy, insightHref } from "@/content/insights";
import { getInsightArticles } from "@/lib/insights/repository";
import { readInsightsQuery, selectInsights } from "@/lib/insights/query";
import { InsightsHero } from "@/components/insights/InsightsHero";
import { InsightsListing } from "@/components/insights/InsightsListing";
import { InsightsNewsletter } from "@/components/insights/InsightsNewsletter";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: { canonical: "/insights" },
    robots: {
      index: !Object.keys(params).some((key) =>
        ["q", "sort", "category", "page"].includes(key),
      ),
      follow: true,
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: "/insights",
      type: "website",
      siteName: "Spotter.ai",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: copy.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function InsightsPage({ searchParams }: Props) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(await searchParams))
    if (typeof value === "string") params.set(key, value);
  const query = readInsightsQuery(params);
  const articles = await getInsightArticles();
  const selected = selectInsights(articles, query);
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.title,
    description: copy.description,
    url: "https://spotter.ai/insights",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [selected.featured, ...selected.visible]
        .filter((article) => article !== null)
        .map((article, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://spotter.ai${insightHref(article.slug)}`,
          name: article.title,
        })),
    },
  };
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://spotter.ai/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: copy.eyebrow,
        item: "https://spotter.ai/insights",
      },
    ],
  };
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([schema, breadcrumbsSchema]).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <InsightsHero featured={selected.featured} />
      <InsightsListing articles={articles} query={query} />
      <InsightsNewsletter />
    </main>
  );
}
