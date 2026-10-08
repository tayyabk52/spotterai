import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const viewport of [
  { width: 1024, height: 600 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
]) {
  test(`Sentinel desktop hero fits the ${viewport.width}×${viewport.height} viewport`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    for (const reducedMotion of ["no-preference", "reduce"] as const) {
      await page.emulateMedia({ reducedMotion });
      await page.goto("/sentinel");
      const hero = page.locator("#sentinel-hero");
      const box = await hero.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height + 1);
      for (const action of await hero.locator("a").all()) {
        await expect(action).toBeInViewport({ ratio: 1 });
      }
      await expect(hero).not.toHaveAttribute("data-tms-pin");
    }
  });
}

for (const width of [360, 768, 1440]) {
  test(`Sentinel layout and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/sentinel");

    // Check headings and landmark structure
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("main")).toHaveAttribute("id", "main-content");
    await expect(page.locator("main section")).toHaveCount(7);

    // SEO tags
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://spotter.ai/sentinel",
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "Sentinel — AI Driver Hiring, MVR Monitoring & Fleet Compliance | Spotter",
    );

    // No horizontal scroll overflow
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);

    // Touch targets >= 44x44 CSS px for interactive links and buttons
    for (const action of await page.locator("main a, main button").all()) {
      const box = await action.boundingBox();
      if (box && box.width > 0 && box.height > 0) {
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }

    // WCAG 2.1 AA accessibility audit
    const violations = (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations;
    expect(violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("Sentinel quote and pricing matrix link destinations", async ({
  page,
}) => {
  await page.goto("/sentinel");

  // Quote links
  const quoteLinks = page.locator(
    'a[href*="https://spotter.ai/request-quote?product=sentinel"]',
  );
  expect(await quoteLinks.count()).toBeGreaterThanOrEqual(2);

  // MVR pricing links
  const mvrLinks = page.locator('a[href*="https://spotter.ai/mvr-pricing"]');
  expect(await mvrLinks.count()).toBeGreaterThanOrEqual(2);
});

test("Sentinel talent board filtering interactivity", async ({ page }) => {
  await page.goto("/sentinel");

  // Initial count of driver cards
  const cards = page.locator("[data-driver-card]");
  await expect(cards).toHaveCount(6);

  // Filter to Grade A
  await page.getByRole("button", { name: "Grade A (90–100)" }).click();
  await expect(cards).toHaveCount(2);
  await expect(page.getByText("Billy Graham")).toBeVisible();
  await expect(page.getByText("Rory Rice")).toBeVisible();

  // Filter to Grade B
  await page.getByRole("button", { name: "Grade B (80–89)" }).click();
  await expect(cards).toHaveCount(2);
  await expect(page.getByText("Caesar Morton")).toBeVisible();
  await expect(page.getByText("Dannie Brown")).toBeVisible();

  // Filter to Flagged
  await page.getByRole("button", { name: "Flagged (Under 70)" }).click();
  await expect(cards).toHaveCount(2);
  await expect(page.getByText("Mark Childs")).toBeVisible();
  await expect(page.getByText("Jesse Watt")).toBeVisible();

  // Reset to All Drivers
  await page.getByRole("button", { name: /All Drivers/ }).click();
  await expect(cards).toHaveCount(6);
});

test("Sentinel anchors and reduced motion support", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/sentinel");

  // Click secondary hero CTA to navigate to screening chapter
  await page.getByRole("link", { name: "Explore Capabilities" }).click();
  await expect(page).toHaveURL(/#sentinel-screening$/);
  const target = page.locator("#sentinel-screening");
  await expect(target).toBeInViewport();

  // Reduced motion should have no infinite animations
  expect(
    await page
      .locator("main")
      .evaluate((element) => element.getAnimations({ subtree: true }).length),
  ).toBe(0);
});

test("Sentinel content is accessible without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/sentinel");

  await expect(page.locator("h1")).toHaveText(
    "Autonomous Fleet Safety & Driver Qualification",
  );
  await expect(
    page.getByRole("heading", {
      name: "Sub-60s Driver Qualification with Predictive Risk Scoring",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "24/7 Fleet Surveillance Delivered Directly to Operations Chat",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Up to 75% Lower Screening Costs With Zero Hidden Markups",
    }),
  ).toBeVisible();

  await context.close();
});

test("Sentinel sections 1 and 2 feature unpinned normal demo videos with controls and proper section separation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/sentinel");

  // Section 1: screening demo video
  const sec1 = page.locator("#sentinel-screening");
  await expect(sec1).not.toHaveAttribute("data-tms-pin");
  await sec1.scrollIntoViewIfNeeded();
  const video1 = sec1.locator("video");
  await expect(video1).toHaveAttribute(
    "src",
    "/videos/sentinel/sentinel-C.mp4",
  );
  expect(await video1.evaluate((el: HTMLVideoElement) => el.controls)).toBe(
    true,
  );

  // Section 2: monitoring demo video with light theme
  const sec2 = page.locator("#sentinel-monitoring");
  await expect(sec2).not.toHaveAttribute("data-tms-pin");
  await expect(sec2).toHaveClass(/light/);
  await sec2.scrollIntoViewIfNeeded();
  const video2 = sec2.locator("video");
  await expect(video2).toHaveAttribute(
    "src",
    "/videos/sentinel/slack-demo-2.mp4",
  );
  expect(await video2.evaluate((el: HTMLVideoElement) => el.controls)).toBe(
    true,
  );

  // Section 4 is light and Section 5 is dark (proper visual separation, no merging)
  const sec4 = page.locator("#sentinel-economics");
  const sec5 = page.locator("#sentinel-talent");
  await expect(sec4).toHaveClass(/light/);
  await expect(sec5).toHaveClass(/dark/);
});
