import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [360, 768, 1440]) {
  test(`ClaimsOS layout, SEO, accessibility and landmarks at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/claims-os");

    // Exactly one h1 landmark
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText(
      "The Centralized Claims Operating System for Transportation Teams.",
    );

    // Canonical link
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://spotter.ai/claims-os",
    );

    // Primary CTA link to quote
    const quoteLinks = page.getByRole("link", { name: "I'm Interested" });
    await expect(quoteLinks.first()).toHaveAttribute(
      "href",
      /request-quote\?product=claims-os$/,
    );

    // Section landmarks and IDs
    for (const id of [
      "claims-intro",
      "claims-tracking",
      "claims-financials",
      "claims-slack",
      "claims-operations",
      "claims-contact",
    ]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }

    // Authentic board image is rendered
    const boardImg = page.locator("#claims-tracking img");
    await expect(boardImg).toBeAttached();

    // Check no horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);

    // Accessibility test (WCAG 2.1 AA)
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);

    expect(errors).toEqual([]);
  });
}

test("ClaimsOS responsive touch targets meet minimum 44px on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/claims-os");

  const links = page.locator("main a, main button");
  const count = await links.count();
  for (let i = 0; i < count; i++) {
    const el = links.nth(i);
    if (await el.isVisible()) {
      const box = await el.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  }
});

test("ClaimsOS reduced motion provides static presentation without crash", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/claims-os");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("#claims-tracking")).toBeVisible();
  await expect(page.locator("#claims-slack")).toBeVisible();
  // Ensure placeholder marker is gone
  await expect(page.getByText(/ASSET NEEDED/i)).toHaveCount(0);
});

test("ClaimsOS desktop loads and mounts delivered videos without placeholder badges", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/claims-os");

  // Hero video should mount
  const heroVideo = page.locator("#claims-intro video");
  await expect(heroVideo).toHaveCount(1);
  await expect(heroVideo).toHaveAttribute(
    "src",
    "/brand/claimsOS-videos/scrub/claims-triage.mp4",
  );

  // Poll for readyState >= 2
  await expect
    .poll(() => heroVideo.evaluate((v: HTMLVideoElement) => v.readyState))
    .toBeGreaterThanOrEqual(2);

  // Check hero heading uses same font-size as TMS hero (61px on desktop)
  const h1 = page.locator("#claims-intro h1");
  const fontSize = await h1.evaluate(
    (el) => window.getComputedStyle(el).fontSize,
  );
  expect(fontSize).toBe("61px");

  // Check hero heading vertical height is compact (< 300px)
  const h1Box = await h1.boundingBox();
  expect(h1Box?.height).toBeLessThan(300);

  // Check video uses object-fit: cover behind the complete hero
  const videoObjectFit = await heroVideo.evaluate(
    (el) => window.getComputedStyle(el).objectFit,
  );
  expect(videoObjectFit).toBe("cover");

  await page.screenshot({ path: "test-results/claims-os-hero.png" });

  // Scroll to financials
  await page.locator("#claims-financials").scrollIntoViewIfNeeded();
  const finVideo = page.locator("#claims-financials video");
  await expect(finVideo).toHaveCount(1);
  await expect(finVideo).toHaveAttribute(
    "src",
    "/brand/claimsOS-videos/scrub/liability-resolution.mp4",
  );
  await expect
    .poll(() => finVideo.evaluate((v: HTMLVideoElement) => v.readyState))
    .toBeGreaterThanOrEqual(2);
});

