import { test, expect } from "@playwright/test";
import source from "../content/insights/source-articles.json";
import { readDjangoInsights } from "../lib/insights/django-client";
import { POST } from "../app/api/newsletter/subscribe/route";

test("Django adapter follows pagination and preserves the source contract", async () => {
  const urls: string[] = [];
  const fetcher: typeof fetch = async (input) => {
    const url = new URL(String(input));
    urls.push(url.href);
    const index = url.searchParams.has("page") ? 1 : 0;
    const article = source[index];
    return Response.json({
      results: [
        {
          id: article.id,
          slug: article.slug,
          title: article.title,
          description: article.excerpt,
          publish_date: article.publishDate,
          read_time: article.readTime,
          category: article.category,
          tags: article.tags,
          content_html: article.content,
          image: { src: "/media/cover.webp", width: 1200, height: 675 },
          seo: article.seo,
          cta: article.cta,
        },
      ],
      next: index ? null : "?page=2",
    });
  };
  const articles = await readDjangoInsights(
    new URL("https://backend.example.test/articles/"),
    fetcher,
  );
  expect(urls).toEqual([
    "https://backend.example.test/articles/",
    "https://backend.example.test/articles/?page=2",
  ]);
  expect(articles.map((article) => article.slug)).toEqual(
    source.slice(0, 2).map((article) => article.slug),
  );
  expect(articles[0]).toMatchObject({
    content: source[0].content,
    excerpt: source[0].excerpt,
    publishDate: source[0].publishDate,
    readTime: source[0].readTime,
    seo: source[0].seo,
    cta: source[0].cta,
  });
  expect(articles[0].image?.src).toBe(
    "https://backend.example.test/media/cover.webp",
  );
});

test("Django adapter rejects broken pagination and malformed content", async () => {
  for (const payload of [
    { results: [source[0]], next: "https://other.example.test/articles/" },
    { results: [source[0]], next: "https://backend.example.test/articles/" },
    { results: [{ ...source[0], slug: "../private" }], next: null },
    { results: [source[0], source[0]], next: null },
    { unexpected: [] },
  ]) {
    await expect(
      readDjangoInsights(
        new URL("https://backend.example.test/articles/"),
        async () => Response.json(payload),
      ),
    ).rejects.toThrow();
  }
});

test("newsletter server forwards exact fields and rejects unconfirmed delivery", async () => {
  const realFetch = globalThis.fetch;
  let responseBody = { success: true };
  let forwarded: Record<string, string> = {};
  globalThis.fetch = async (input, options) => {
    expect(String(input)).toBe("https://spotter.ai/api/newsletter/subscribe");
    expect(options?.method).toBe("POST");
    forwarded = JSON.parse(String(options?.body));
    return Response.json(responseBody);
  };
  function request(email = "mock-only@example.com") {
    return new Request("http://localhost:3000/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source: "insights",
        timestamp: "2026-10-08T00:00:00Z",
        utmSource: "test",
        injected: "excluded",
      }),
    });
  }
  try {
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(forwarded).toEqual({
      email: "mock-only@example.com",
      source: "insights",
      timestamp: "2026-10-08T00:00:00Z",
      utmSource: "test",
    });
    responseBody = { success: false };
    expect((await POST(request())).status).toBe(502);
    expect((await POST(request("invalid"))).status).toBe(400);
    const recursion = new Request(
      "https://spotter.ai/api/newsletter/subscribe",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "mock-only@example.com" }),
      },
    );
    expect((await POST(recursion)).status).toBe(503);
  } finally {
    globalThis.fetch = realFetch;
  }
});
