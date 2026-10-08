import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage explains the suite and offers the quote destination", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "trucking automation that works for you",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  const ctas = page.getByRole("link", {
    name: "Request a demo or quote",
    exact: true,
  });
  expect(await ctas.count()).toBeGreaterThanOrEqual(2);
  for (const cta of await ctas.all())
    await expect(cta).toHaveAttribute(
      "href",
      "https://spotter.ai/request-quote",
    );
  await expect(
    page.getByRole("heading", { name: "Spotter Lens", exact: true }),
  ).toBeVisible();
});

test("desktop disclosures support keyboard, Escape, and outside dismissal", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const products = page.getByRole("button", { name: "Products", exact: true });
  await expect(products).toBeEnabled();
  await products.focus();
  await page.keyboard.press("Enter");
  await expect(products).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("link", { name: /Claims OS/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(products).toHaveAttribute("aria-expanded", "false");
  await expect(products).toBeFocused();
  await products.click();
  await page.getByRole("heading", { level: 1 }).click();
  await expect(products).toHaveAttribute("aria-expanded", "false");
});

for (const width of [320, 360, 375, 414, 768, 1440]) {
  test(`layout stays within ${width}px and passes accessibility checks`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  });
}

test("mobile menu restores focus and remains accessible", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await page.getByRole("button", { name: "Products", exact: true }).click();
  await expect(page.getByRole("link", { name: /Claims OS/ })).toBeVisible();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
});

test("reduced motion and disabled JavaScript preserve readable content", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    reducedMotion: "reduce",
    javaScriptEnabled: false,
    viewport: { width: 320, height: 800 },
  });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Spotter TMS", exact: true }),
  ).toBeVisible();
  const fallback = page.getByRole("link", {
    name: "Request a quote ↗",
    exact: true,
  });
  await expect(fallback).toBeVisible();
  const bounds = await fallback.boundingBox();
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
  await context.close();
});
