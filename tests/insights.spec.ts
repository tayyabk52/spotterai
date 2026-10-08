import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import articles from "../content/insights/source-articles.json";
import { insightArticleHtml } from "../lib/insights/article-html";
import type { InsightArticle } from "../content/insights";

const newest = [...articles].sort(
  (a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate),
);

test("listing keeps original content, filters, search, sorting and pagination", async ({
  page,
}) => {
  await page.goto("/insights");
  await expect(page.locator("h1")).toHaveText(
    "Real insights for a stronger trucking industry",
  );
  await expect(
    page.getByRole("heading", { name: newest[0].title, exact: true }),
  ).toBeVisible();
  await expect(page.locator("#latest-articles article")).toHaveCount(9);
  await page.getByRole("link", { name: "Load more articles" }).click();
  await expect(page.locator("#latest-articles article")).toHaveCount(18);
  await page
    .getByRole("navigation", { name: "Article categories" })
    .getByRole("link", { name: "Compliance", exact: true })
    .click();
  const compliance = newest.filter(
    (article) => article.category === "Compliance",
  );
  await expect(page.locator("#latest-articles article h3").first()).toHaveText(
    compliance[0].title,
  );
  await page.getByLabel("Sort by", { exact: true }).selectOption("oldest");
  await expect(page.locator("#latest-articles article h3").first()).toHaveText(
    compliance.at(-1)!.title,
  );
  await page
    .getByRole("searchbox", { name: "Search articles" })
    .fill("CDL MVR");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.locator("#latest-articles article")).toHaveCount(1);
  await expect(page.locator("#latest-articles article h3")).toHaveText(
    "How to Read a CDL MVR Report",
  );
  await page.getByRole("searchbox").fill("no-article-matches-this-string");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "No articles match your search" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Clear filters" }).click();
  await expect(page.locator("#latest-articles article")).toHaveCount(9);
});

test("all source article URLs render their original headings, body and SEO", async ({
  request,
}) => {
  for (const article of articles) {
    const response = await request.get(`/insights/${article.slug}`);
    expect(response.status(), article.slug).toBe(200);
    const html = await response.text();
    expect(html).toContain(`https://spotter.ai/insights/${article.slug}`);
    expect(html).toContain('"@type":"BlogPosting"');
    expect(html).toContain(article.publishDate);
    expect(html).toContain(insightArticleHtml(article as InsightArticle));
  }
  expect((await request.get("/insights/missing-article")).status()).toBe(404);
});

test("collection and article metadata, structured data and sitemap are crawlable", async ({
  page,
  request,
}) => {
  await page.goto("/insights");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://spotter.ai/insights",
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "website",
  );
  await page.goto("/insights?q=Sentinel");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex.*follow/,
  );
  await page.goto(`/insights/${newest[0].slug}`);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "article",
  );
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const article of articles)
    expect(sitemap).toContain(`/insights/${article.slug}`);
});

test("desktop Insights submenu fetches real titles and local destinations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const responsePromise = page.waitForResponse((response) =>
    response.url().includes("/api/insights?menu=1"),
  );
  await page.getByRole("button", { name: "Resources", exact: true }).hover();
  expect((await responsePromise).status()).toBe(200);
  const menu = page.locator("#desktop-megamenu");
  await expect(
    menu.getByRole("link", { name: new RegExp(newest[0].title) }),
  ).toHaveAttribute("href", `/insights/${newest[0].slug}`);
  await expect(
    menu.getByRole("link", { name: /^Insights Logistics research/ }),
  ).toHaveAttribute("href", "/insights");
  await expect(
    menu.getByRole("link", { name: /View all articles in Insights/ }),
  ).toHaveCount(2);
});

test("mobile Insights submenu fetches and closes on article navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/insights");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Resources", exact: true })
    .click();
  const link = page
    .getByRole("dialog")
    .getByRole("link", { name: new RegExp(newest[0].title) });
  await expect(link).toHaveAttribute("href", `/insights/${newest[0].slug}`);
  await link.click();
  await expect(page).toHaveURL(new RegExp(newest[0].slug));
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("newsletter mirrors the source payload and never reports unconfirmed success", async ({
  page,
}) => {
  await page.goto("/insights?utm_source=verification");
  const payloads: Record<string, unknown>[] = [];
  let successful = false;
  await page.route("**/api/newsletter/subscribe", async (route) => {
    payloads.push(route.request().postDataJSON());
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(successful ? { success: true } : {}),
    });
  });
  const email = page.getByLabel("Email address", { exact: true });
  await email.fill("not-an-email");
  await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  await expect(page.locator("#insights-subscription-status")).toHaveText(
    "Please enter a valid email address",
  );
  expect(payloads).toHaveLength(0);
  await email.fill("integration-test@example.com");
  await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  await expect(page.locator("#insights-subscription-status")).toHaveText(
    "Failed to subscribe. Please try again later.",
  );
  successful = true;
  await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  await expect(page.locator("#insights-subscription-status")).toHaveText(
    "Successfully subscribed! You'll receive our weekly newsletter.",
  );
  expect(payloads[1]).toMatchObject({
    email: "integration-test@example.com",
    source: "insights",
    utmSource: "verification",
  });
  for (const field of [
    "timestamp",
    "userAgent",
    "referrer",
    "pageUrl",
    "timezone",
    "language",
    "utmSource",
    "utmMedium",
    "utmCampaign",
    "utmContent",
    "utmTerm",
  ])
    expect(payloads[1]).toHaveProperty(field);
});

for (const width of [360, 768, 1440]) {
  test(`Insights listing and article fit ${width}px with accessible controls`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/insights", "/insights/how-to-read-cdl-mvr-report"]) {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const accessibility = await new AxeBuilder({ page })
        .include("#main-content")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(accessibility.violations).toEqual([]);
      const controls = await page
        .locator(
          "#main-content button, #main-content input:not([type=hidden]), #main-content select, #main-content nav a",
        )
        .evaluateAll((elements) =>
          elements
            .filter((element) => element.getClientRects().length)
            .map((element) => ({
              width: element.getBoundingClientRect().width,
              height: element.getBoundingClientRect().height,
            })),
        );
      expect(
        controls.every(
          (control) => control.width >= 44 && control.height >= 44,
        ),
      ).toBe(true);
    }
  });
}

test("search, categories, pagination and article reading work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${test.info().project.use.baseURL}/insights`);
  const signupFallback = page.locator(
    'section[aria-labelledby="insights-newsletter-title"] noscript p',
  );
  await expect(signupFallback).toHaveText(
    "Enable JavaScript to subscribe to the newsletter.",
  );
  await expect(signupFallback).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Subscribe", exact: true }),
  ).toBeDisabled();
  await page.getByRole("searchbox").fill("CDL MVR");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.locator("#latest-articles article")).toHaveCount(1);
  await page.locator("#latest-articles article a").click();
  await expect(
    page.getByRole("heading", {
      name: "How to Read a CDL MVR Report",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByText("Key takeaways", { exact: true })).toBeVisible();
  await context.close();
});

test("untrusted HTML cannot inject scripts, handlers or source CSS", () => {
  const article = {
    ...articles[0],
    content:
      '<script>alert(1)</script><img src="/images/x.png" onerror="alert(1)"><a href="&#106;avascript:alert(1)">Unsafe</a><p style="color:red" onclick="alert(1)">Content</p><iframe src="https://evil.example"></iframe>',
  } as InsightArticle;
  const html = insightArticleHtml(article);
  expect(html).not.toMatch(/script|onerror|onclick|javascript|style=|iframe/);
  expect(html).toContain("Content");
});

test("source callouts precede article sections with a valid heading hierarchy", () => {
  const article = {
    ...articles[0],
    content:
      "<h3>Key takeaways</h3><p>Original wording.</p><h2>Main section</h2><h3>Subsection</h3><h5>Nested detail</h5><h2>Next section</h2>",
  } as InsightArticle;
  expect(insightArticleHtml(article)).toBe(
    "<h2>Key takeaways</h2><p>Original wording.</p><h2>Main section</h2><h3>Subsection</h3><h4>Nested detail</h4><h2>Next section</h2>",
  );
});
