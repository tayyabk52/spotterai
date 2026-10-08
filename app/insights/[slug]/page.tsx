import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import { insightsContent as copy, insightHref } from "@/content/insights";
import {
  getInsightArticle,
  getInsightArticles,
} from "@/lib/insights/repository";
import { InsightArticle } from "@/components/insights/InsightArticle";
import { InsightTeaser } from "@/components/insights/InsightTeaser";
import styles from "@/components/insights/Insights.module.css";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getInsightArticle((await params).slug);
  if (!article) notFound();
  const url = insightHref(article.slug);
  const image = article.image?.src || "/opengraph-image";
  const imageUrl = image.startsWith("http")
    ? image
    : `https://spotter.ai${image}`;
  return {
    title: { absolute: article.seo?.title || `${article.title} | Spotter.ai` },
    description: article.seo?.description || article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.seo?.title || article.title,
      description: article.seo?.description || article.excerpt,
      url,
      publishedTime: article.publishDate,
      modifiedTime: article.publishDate,
      tags: article.tags,
      images: [
        {
          url: imageUrl,
          width: article.image?.width || 1200,
          height: article.image?.height || 630,
          alt: article.image?.alt || article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo?.title || article.title,
      description: article.seo?.description || article.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function InsightPage({ params }: Props) {
  const article = await getInsightArticle((await params).slug);
  if (!article) notFound();
  const related = (await getInsightArticles())
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate))
    .slice(0, 3);
  const articleUrl = `https://spotter.ai${insightHref(article.slug)}`;
  const imageUrl = article.image
    ? article.image.src.startsWith("http")
      ? article.image.src
      : `https://spotter.ai${article.image.src}`
    : "https://spotter.ai/opengraph-image";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seo?.description || article.excerpt,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Spotter.ai",
      url: "https://spotter.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://spotter.ai/brand/spotter-logo.png",
      },
    },
    author: {
      "@type": "Organization",
      name: "Spotter.ai",
      url: "https://spotter.ai",
    },
    image: [imageUrl],
    keywords: article.tags?.join(", "),
    articleSection: article.category,
  };
  const breadcrumbs = {
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
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://spotter.ai${insightHref(article.slug)}`,
      },
    ],
  };
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([schema, breadcrumbs]).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <InsightArticle article={article} />
      {related.length > 0 && (
        <section
          className={styles.related}
          aria-labelledby="related-insights-title"
        >
          <Container>
            <h2 id="related-insights-title">{copy.related}</h2>
            <div className={styles.relatedList}>
              {related.map((item) => (
                <InsightTeaser key={item.slug} article={item} compact />
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
