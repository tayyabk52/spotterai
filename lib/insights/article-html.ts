import sanitizeHtml from "sanitize-html";
import type { InsightArticle } from "@/content/insights";

export function insightArticleHtml(article: InsightArticle) {
  const headingLevels = Array.from(
    article.content.matchAll(/<h([1-5])\b/gi),
    (match) => Number(match[1]),
  );
  const baseLevel = Math.min(...headingLevels, 5);
  let previousLevel = 1;
  // Source bodies often start at h3. Keep their relative hierarchy beneath
  // the page's single h1 without changing any heading wording.
  const headings = Object.fromEntries(
    [1, 2, 3, 4, 5].map((level) => [
      `h${level}`,
      (_tagName: string, attributes: Record<string, string>) => {
        const requested = Math.min(5, Math.max(2, level - baseLevel + 2));
        // An opening callout may use h3 before the source's first h2 section.
        // Preserve nesting while preventing a skipped level from the page h1.
        const next = Math.min(requested, previousLevel + 1);
        previousLevel = next;
        return { tagName: `h${next}`, attribs: attributes };
      },
    ]),
  );
  const images = new Map(
    article.inlineImages?.map((image) => [image.src, image]),
  );
  return sanitizeHtml(article.content, {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "h4",
      "h5",
      "ul",
      "ol",
      "li",
      "strong",
      "b",
      "em",
      "i",
      "a",
      "br",
      "hr",
      "blockquote",
      "div",
      "span",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "figure",
      "figcaption",
      "img",
      "sup",
      "sub",
    ],
    allowedAttributes: {
      a: ["href", "rel"],
      img: ["src", "alt", "width", "height", "loading", "decoding"],
      th: ["scope", "colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowProtocolRelative: false,
    transformTags: {
      ...headings,
      a: (tagName, attributes) => {
        const url = attributes.href || "";
        const href = url.startsWith("https://spotter.ai/insights")
          ? url.replace("https://spotter.ai", "")
          : url;
        return { tagName, attribs: { href, rel: "noopener noreferrer" } };
      },
      img: (tagName, attributes) => {
        const image = images.get(attributes.src);
        return {
          tagName,
          attribs: {
            src: attributes.src,
            alt: attributes.alt || image?.alt || article.title,
            width: String(image?.width || 1200),
            height: String(image?.height || 675),
            loading: "lazy",
            decoding: "async",
          },
        };
      },
    },
  });
}
