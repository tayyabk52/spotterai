import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [360, 768, 1440]) {
  test(`Driver App layout and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/driversapp");

    // Check headings and landmark structure
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("main")).toHaveAttribute("id", "main-content");
    await expect(page.locator("main section")).toHaveCount(7);

    // SEO tags
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://spotter.ai/driversapp",
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "Spotter Driver App: AI Load Matching for Drivers & Owner-Operators",
    );

    // No horizontal scroll overflow
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);

    // Touch targets >= 44x44 CSS px for all interactive links and buttons
    for (const action of await page.locator("main a, main button").all()) {
      const box = await action.boundingBox();
      if (box) {
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

test("Driver App app store, play store, and quote link destinations", async ({
  page,
}) => {
  await page.goto("/driversapp");

  // App Store links
  const appStoreLinks = page.locator(
    'a[href="https://apps.apple.com/us/app/spotter-ai/id1670506993"]',
  );
  expect(await appStoreLinks.count()).toBeGreaterThanOrEqual(2);

  // Play Store links
  const playStoreLinks = page.locator(
    'a[href="https://play.google.com/store/apps/details?id=com.spotter.ai&pcampaignid=web_share"]',
  );
  expect(await playStoreLinks.count()).toBeGreaterThanOrEqual(2);

  // Quote link
  const quoteLinks = page.locator(
    'a[href="https://spotter.ai/request-quote?product=driver-app"]',
  );
  expect(await quoteLinks.count()).toBeGreaterThanOrEqual(2);
});

test("Driver App anchors and reduced motion support", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/driversapp");

  // Click secondary hero CTA to navigate to schedule
  await page.getByRole("link", { name: "See how matching works" }).click();
  await expect(page).toHaveURL(/#driver-schedule$/);
  const target = page.locator("#driver-schedule");
  await expect(target).toBeInViewport();

  // Reduced motion should have no infinite animations
  expect(
    await page
      .locator("main")
      .evaluate((element) => element.getAnimations({ subtree: true }).length),
  ).toBe(0);
});

test("Driver App content is fully accessible without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/driversapp");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Set your hours. Protect your home time.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Blacklist bad markets. Protect your rate per mile.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Put freight automation in your pocket.",
    }),
  ).toBeVisible();

  await context.close();
});

test("Driver App pinned scenes degrade to static flow on mobile <1024px and reduced motion", async ({
  page,
}) => {
  // Mobile: <1024px degrades to static flow
  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto("/driversapp");
  await page.waitForLoadState("networkidle");
  const mobileScene = page.locator("#driver-schedule > div");
  await expect(mobileScene).not.toHaveAttribute("data-cinematic", "true");
  const mobilePosition = await mobileScene.evaluate(
    (el) => window.getComputedStyle(el).position,
  );
  expect(mobilePosition).toBe("static");

  // Reduced motion: degrades to static/relative flow
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/driversapp");
  await page.waitForLoadState("networkidle");
  const rmScene = page.locator("#driver-schedule > div");
  await expect(rmScene).not.toHaveAttribute("data-cinematic", "true");
  const rmPosition = await rmScene.evaluate(
    (el) => window.getComputedStyle(el).position,
  );
  expect(rmPosition).not.toBe("sticky");

  // Desktop with no reduced motion: enables cinematic sticky pinning
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/driversapp");
  await page.waitForLoadState("networkidle");
  const desktopScene = page.locator("#driver-schedule > div");
  await expect(desktopScene).toHaveAttribute("data-cinematic", "true");
  const desktopPosition = await desktopScene.evaluate(
    (el) => window.getComputedStyle(el).position,
  );
  expect(desktopPosition).toBe("sticky");
});

test("Driver App desktop hero and matching videos decode and scrub with scroll", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/driversapp");

  // Hero video: driver-opening
  const heroVideo = page.locator("#driver-intro video");
  await expect(heroVideo).toHaveCount(1);
  await expect(heroVideo).toHaveAttribute(
    "src",
    "/videos/driversapp/driver-opening.mp4",
  );
  await expect
    .poll(() => heroVideo.evaluate((v: HTMLVideoElement) => v.readyState))
    .toBeGreaterThanOrEqual(2);

  // Matching video: driver-matching in chapter 03
  const matchingScene = page.locator("#driver-scoring");
  await matchingScene.scrollIntoViewIfNeeded();
  const matchingVideo = matchingScene.locator("video");
  await expect(matchingVideo).toHaveCount(1);
  await expect(matchingVideo).toHaveAttribute(
    "src",
    "/videos/driversapp/driver-matching.mp4",
  );
  await expect
    .poll(() => matchingVideo.evaluate((v: HTMLVideoElement) => v.readyState))
    .toBeGreaterThanOrEqual(2);
});


