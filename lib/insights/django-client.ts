import type { InsightArticle, InsightImage } from "@/content/insights";

type JsonRecord = Record<string, unknown>;

function stringField(record: JsonRecord, ...keys: string[]) {
  const value = keys
    .map((key) => record[key])
    .find((value) => typeof value === "string");
  return typeof value === "string" ? value : "";
}

function normalizeImage(
  value: unknown,
  base: URL,
  title: string,
): InsightImage | null {
  if (!value) return null;
  const image =
    typeof value === "string" ? { src: value } : (value as JsonRecord);
  const src = stringField(image, "src", "url", "sourceUrl");
  const absolute = new URL(src, base).href;
  if (!src || !/^https?:/.test(absolute))
    throw new Error("Invalid Insights image");
  return {
    src: absolute,
    sourceUrl: absolute,
    width: Number(image.width) || 1200,
    height: Number(image.height) || 675,
    alt: stringField(image, "alt") || title,
  };
}

function normalizeArticle(value: unknown, base: URL): InsightArticle {
  if (!value || typeof value !== "object")
    throw new Error("Invalid Insights article");
  const record = value as JsonRecord;
  const title = stringField(record, "title");
  const slug = stringField(record, "slug");
  const date = stringField(
    record,
    "publishDate",
    "publish_date",
    "published_at",
  );
  const content = stringField(record, "content", "body", "content_html");
  const seo =
    record.seo && typeof record.seo === "object"
      ? (record.seo as JsonRecord)
      : null;
  const cta =
    record.cta && typeof record.cta === "object"
      ? (record.cta as JsonRecord)
      : null;
  const ctaHref = cta ? stringField(cta, "href") : "";
  if (
    !title ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
    !Number.isFinite(Date.parse(date)) ||
    !content
  )
    throw new Error("Incomplete Insights article");
  return {
    id: typeof record.id === "number" ? record.id : String(record.id || slug),
    slug,
    title,
    content,
    publishDate: date,
    excerpt: stringField(record, "excerpt", "description"),
    category: stringField(record, "category") || "Industry Trends",
    readTime: stringField(record, "readTime", "read_time"),
    tags: Array.isArray(record.tags)
      ? record.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    image: normalizeImage(record.image || record.thumbnail, base, title),
    ...(seo
      ? {
          seo: {
            title: stringField(seo, "title") || title,
            description: stringField(seo, "description"),
          },
        }
      : {}),
    ...(cta && /^(https?:\/\/|\/(?!\/))/.test(ctaHref)
      ? {
          cta: {
            title: stringField(cta, "title"),
            description: stringField(cta, "description"),
            label: stringField(cta, "label"),
            href: ctaHref,
          },
        }
      : {}),
  };
}

export async function readDjangoInsights(
  endpoint: URL,
  fetcher: typeof fetch = fetch,
): Promise<InsightArticle[]> {
  const articles: InsightArticle[] = [];
  const visited = new Set<string>();
  let next: URL | null = endpoint;
  while (next) {
    if (
      visited.has(next.href) ||
      visited.size >= 100 ||
      next.origin !== endpoint.origin
    )
      throw new Error("Invalid Insights pagination");
    visited.add(next.href);
    const response: Response = await fetcher(next, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300, tags: ["insights"] },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      throw new Error(`Insights upstream returned ${response.status}`);
    const payload: unknown = await response.json();
    const envelope: JsonRecord =
      payload && typeof payload === "object" ? (payload as JsonRecord) : {};
    const results: unknown = Array.isArray(payload)
      ? payload
      : envelope.results || envelope.articles;
    if (!Array.isArray(results)) throw new Error("Invalid Insights response");
    articles.push(
      ...results.map((article) => normalizeArticle(article, endpoint)),
    );
    next =
      !Array.isArray(payload) && typeof envelope.next === "string"
        ? new URL(envelope.next, next)
        : null;
  }
  if (new Set(articles.map((article) => article.slug)).size !== articles.length)
    throw new Error("Duplicate Insights slugs");
  return articles;
}
