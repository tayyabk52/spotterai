import type { MetadataRoute } from "next";
import { getInsightArticles } from "@/lib/insights/repository";
import { insightHref } from "@/content/insights";
import { getCareerListing } from "@/lib/careers/repository";
import { EMPTY_CAREER_FILTERS, careerJobHref } from "@/content/careers";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getInsightArticles();

  let careerJobEntries: MetadataRoute.Sitemap = [];
  try {
    const careerListing = await getCareerListing(EMPTY_CAREER_FILTERS);
    if (careerListing?.jobs?.length) {
      careerJobEntries = careerListing.jobs.map((job) => ({
        url: `https://spotter.ai${careerJobHref(job.slug)}`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
    }
  } catch {
    // Graceful fallback if external Teamtailor API is offline or during build
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    // Homepage
    {
      url: "https://spotter.ai/",
      lastModified: "2026-10-08",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Core Products (0.9)
    {
      url: "https://spotter.ai/tms",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://spotter.ai/sentinel",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://spotter.ai/driversapp",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://spotter.ai/extension",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://spotter.ai/lens",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://spotter.ai/claims-os",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Operational & Conversion Tools (0.8)
    {
      url: "https://spotter.ai/request-quote",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://spotter.ai/watch-demo",
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
      url: "https://spotter.ai/mvr-pricing",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Company & Content Hubs (0.7 - 0.8)
    {
      url: "https://spotter.ai/about",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://spotter.ai/insights",
      lastModified: "2026-10-08",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://spotter.ai/careers",
      lastModified: "2026-10-08",
      changeFrequency: "daily",
      priority: 0.7,
    },
    // Legal & Regulatory Pages (0.3)
    {
      url: "https://spotter.ai/privacy-policy",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://spotter.ai/terms-and-services",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://spotter.ai/ccpa",
      lastModified: "2026-10-08",
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const insightArticleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `https://spotter.ai${insightHref(article.slug)}`,
    lastModified: article.publishDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    images: article.image
      ? [
          article.image.src.startsWith("/")
            ? `https://spotter.ai${article.image.src}`
            : article.image.src,
        ]
      : [],
  }));

  return [...staticRoutes, ...insightArticleEntries, ...careerJobEntries];
}
