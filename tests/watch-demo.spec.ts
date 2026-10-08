import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [360, 768, 1440]) {
  test(`Watch Demo layout and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    const mediaRequests: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("request", (request) => {
      if (request.url().endsWith(".mp4")) mediaRequests.push(request.url());
    });
    await page.goto("/watch-demo");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "See Spotter in action.",
    );
    await expect(page.locator("main video")).toHaveCount(1);
    await expect(page.locator("main video")).toHaveAttribute("preload", "none");
    expect(
      await page.locator("video").evaluate((video: HTMLVideoElement) => ({
        controls: video.controls,
        autoplay: video.autoplay,
        loop: video.loop,
      })),
    ).toEqual({ controls: true, autoplay: false, loop: false });
    expect(mediaRequests).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const control of await page.locator("main a, main button").all()) {
      const box = await control.boundingBox();
      if (box && box.width > 0 && box.height > 0) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
    const violations = (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations;
    expect(violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("The original recordings play, captions load, and selection stops previous playback", async ({
  page,
}) => {
  await page.goto("/watch-demo");
  const originalVideo = await page.locator("video").elementHandle();
  await page.getByRole("button", { name: "Play Sentinel demo" }).click();
  await expect
    .poll(() =>
      page
        .locator("video")
        .evaluate((video: HTMLVideoElement) => video.currentTime),
    )
    .toBeGreaterThan(0);
  await page.locator("track").evaluate((track: HTMLTrackElement) => {
    track.track.mode = "hidden";
  });
  await expect
    .poll(() =>
      page
        .locator("track")
        .evaluate((track: HTMLTrackElement) => track.track.cues?.length ?? 0),
    )
    .toBeGreaterThan(0);
  await expect(
    page.getByRole("button", { name: "Play Sentinel demo" }),
  ).toHaveCount(0);

  await page
    .getByRole("link", { name: "Spotter TMS 1:01 FuelSeek & routing" })
    .click();
  await expect(page).toHaveURL(/demo=tms$/);
  await expect(page.locator("video")).toHaveAttribute(
    "src",
    "/videos/watch-demo/tms.mp4",
  );
  expect(
    await originalVideo!.evaluate((video: HTMLVideoElement) => video.paused),
  ).toBe(true);
  await page.getByRole("button", { name: "Play Spotter TMS demo" }).click();
  await expect
    .poll(() =>
      page
        .locator("video")
        .evaluate((video: HTMLVideoElement) => video.currentTime),
    )
    .toBeGreaterThan(0);
  await expect(
    page.getByRole("link", { name: "Request a personalized demo" }),
  ).toHaveAttribute("href", "/request-quote?product=tms");
});

test("Video failure offers a working retry and direct-file fallback", async ({
  page,
}) => {
  await page.route("**/videos/watch-demo/sentinel.mp4", (route) =>
    route.abort(),
  );
  await page.goto("/watch-demo");
  await page.getByRole("button", { name: "Play Sentinel demo" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "The demo couldn’t load.",
  );
  await expect(
    page.getByRole("link", { name: "Open video directly" }),
  ).toHaveAttribute("href", "/videos/watch-demo/sentinel.mp4");
  await page.unroute("**/videos/watch-demo/sentinel.mp4");
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.locator("main").getByRole("alert")).toHaveCount(0);
  await page.getByRole("button", { name: "Play Sentinel demo" }).click();
  await expect
    .poll(() =>
      page
        .locator("video")
        .evaluate((video: HTMLVideoElement) => video.currentTime),
    )
    .toBeGreaterThan(0);
});

test("Demo selection and native playback remain available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/watch-demo");
  await expect(page.locator("video")).toHaveAttribute("controls", "");
  await expect(
    page.getByRole("button", { name: "Play Sentinel demo" }),
  ).not.toBeVisible();
  await page
    .getByRole("link", { name: "Spotter TMS 1:01 FuelSeek & routing" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Fuel planning", exact: true }),
  ).toBeVisible();
  await expect(page.locator("video")).toHaveAttribute(
    "src",
    "/videos/watch-demo/tms.mp4",
  );
  await context.close();
});

test("Invalid selections fall back to Sentinel and keep the canonical route", async ({
  page,
}) => {
  await page.goto("/watch-demo?demo=unknown");
  await expect(page.locator("video")).toHaveAttribute(
    "src",
    "/videos/watch-demo/sentinel.mp4",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://spotter.ai/watch-demo",
  );
});
