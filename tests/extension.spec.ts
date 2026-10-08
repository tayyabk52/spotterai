import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [360, 768, 1440]) {
  test(`Extension layout, SEO, accessibility and demos at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/extension");
    await expect(page.locator("h1")).toHaveCount(1);
    await page
      .locator("main section")
      .first()
      .getByRole("button", { name: "Play demonstration" })
      .click();
    await expect
      .poll(() =>
        page
          .locator("main section")
          .first()
          .locator("video")
          .evaluate((v: HTMLVideoElement) => v.currentTime),
      )
      .toBeGreaterThan(0.2);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://spotter.ai/extension",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://spotter.ai/extension-assets/social.png",
    );
    await expect(page.getByRole("link", { name: "Add to Chrome" })).toHaveCount(
      2,
    );
    for (const link of await page
      .getByRole("link", { name: "Add to Chrome" })
      .all())
      await expect(link).toHaveAttribute(
        "href",
        /anjknaophdgkjljelgjgoieopobgoaci$/,
      );
    expect(
      await page.evaluate(
        () =>
          JSON.parse(
            document.querySelector('main script[type="application/ld+json"]')!
              .textContent!,
          ).about.name,
      ),
    ).toBe("Load Spotter");
    await page.getByRole("link", { name: "Explore the extension" }).click();
    await expect(page).toHaveURL(/#extension-email$/);
    for (const id of [
      "extension-email",
      "extension-market",
      "extension-filters",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      const video = page.locator(`#${id} video`);
      await expect(video).toHaveCount(1);
      await video.evaluate(async (v: HTMLVideoElement) => {
        await v.play();
      });
      const start = await video.evaluate(
        (v: HTMLVideoElement) => v.currentTime,
      );
      await expect
        .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
        .toBeGreaterThan(start + 0.2);
      expect(await video.evaluate((v: HTMLVideoElement) => v.controls)).toBe(
        true,
      );
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
      path: `reports/extension-${width}.png`,
      fullPage: true,
    });
  });
}

test("Extension reduced motion uses posters and opt-in playback", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/extension");
  await page.locator("#extension-email").scrollIntoViewIfNeeded();
  await expect(page.locator("#extension-email video")).toHaveCount(0);
  await page
    .locator("#extension-email")
    .getByRole("button", { name: "Play demonstration" })
    .click();
  const video = page.locator("#extension-email video");
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(0.2);
});

test("Extension keeps all copy and imagery without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/extension");
  await expect(
    page.getByRole("heading", { name: "Gmail Integrated" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Advanced Filtering" }),
  ).toBeVisible();
  await expect(page.locator("main img")).toHaveCount(4);
  await expect(page.locator("main video")).toHaveCount(0);
  await context.close();
});

test("Extension media errors retain the genuine poster and original source link", async ({
  page,
}) => {
  await page.route("**/extension-assets/web/extension-gif-email.mp4", (route) =>
    route.abort(),
  );
  await page.goto("/extension");
  await page.locator("#extension-email").scrollIntoViewIfNeeded();
  const section = page.locator("#extension-email");
  await expect(
    section.getByRole("link", {
      name: "The video could not load. View the original demonstration.",
    }),
  ).toHaveAttribute(
    "href",
    "https://spotter.ai/extension-assets/extension-gif-email.mp4",
  );
  expect(
    await section
      .locator("img")
      .evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
  ).toBe(true);
});
