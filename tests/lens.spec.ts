import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [360, 768, 1440]) {
  test(`Lens content, navigation, screenshots and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/lens");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://spotter.ai/lens",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://spotter.ai/lens-assets/social.png",
    );
    await page.getByRole("link", { name: "Explore Lens", exact: true }).click();
    await expect(page).toHaveURL(/#lens-map$/);
    for (const image of await page.locator("main img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
        )
        .toBe(true);
      expect(await image.getAttribute("alt")).toBeTruthy();
      expect(Number(await image.getAttribute("width"))).toBeGreaterThan(0);
      expect(Number(await image.getAttribute("height"))).toBeGreaterThan(0);
    }
    await expect(page.locator("main figcaption")).toHaveCount(3);
    await expect(
      page.getByRole("link", { name: "Open live Lens" }),
    ).toHaveAttribute("href", "https://spotter.ai/lens");
    for (const action of await page.locator("main a").all()) {
      const box = await action.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(box!.width).toBeGreaterThanOrEqual(44);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({
      path: `reports/lens-${width}.png`,
      fullPage: true,
    });
  });
}

test("Lens works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/lens");
  await expect(
    page.getByRole("heading", {
      name: "Find your market. See where it stands.",
    }),
  ).toBeVisible();
  await expect(page.locator("main img")).toHaveCount(3);
  await expect(
    page.getByRole("link", { name: "Open live Lens" }),
  ).toBeVisible();
  await context.close();
});

test("Lens reduced motion is static and keyboard anchors keep clear of navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/lens");
  const anchor = page.getByRole("link", { name: "02 Market rankings" });
  await anchor.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#lens-rankings$/);
  await expect
    .poll(() =>
      page
        .locator("#lens-rankings")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBeGreaterThanOrEqual(88);
  const figure = page.locator("#lens-rankings figure").locator("..");
  expect(await figure.evaluate((el) => getComputedStyle(el).transform)).toMatch(
    /none|matrix\(1, 0, 0, 1, 0, 0\)/,
  );
});
