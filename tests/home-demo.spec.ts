import { expect, test } from "@playwright/test";

test("Homepage demo follows the suite, waits for interaction, and plays with captions", async ({
  page,
}) => {
  const mediaRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".mp4")) mediaRequests.push(request.url());
  });
  await page.goto("/");
  const demo = page.locator("#home-demo");
  await expect(demo.locator("video")).toHaveAttribute("preload", "none");
  expect(mediaRequests).toEqual([]);
  expect(
    await demo.evaluate((section) => ({
      previous: section.previousElementSibling?.id,
      next: section.nextElementSibling?.getAttribute("aria-labelledby"),
    })),
  ).toEqual({ previous: "capabilities", next: "results-title" });
  await demo.getByRole("button", { name: "Play Spotter TMS demo" }).click();
  await expect
    .poll(() =>
      demo
        .locator("video")
        .evaluate((video: HTMLVideoElement) => video.currentTime),
    )
    .toBeGreaterThan(0);
  await demo.locator("track").evaluate((track: HTMLTrackElement) => {
    track.track.mode = "hidden";
  });
  await expect
    .poll(() =>
      demo
        .locator("track")
        .evaluate((track: HTMLTrackElement) => track.track.cues?.length ?? 0),
    )
    .toBeGreaterThan(0);
  await demo.getByRole("link", { name: "Watch all demos" }).click();
  await expect(page).toHaveURL(/\/watch-demo\?demo=tms$/);
  await expect(page.locator("video")).toHaveAttribute(
    "src",
    "/videos/watch-demo/tms.mp4",
  );
});

test("Homepage native demo controls remain available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  const demo = page.locator("#home-demo");
  await expect(demo.locator("video")).toHaveAttribute("controls", "");
  await expect(demo.getByRole("button")).not.toBeVisible();
  await expect(
    demo.getByRole("link", { name: "Watch all demos" }),
  ).toHaveAttribute("href", "/watch-demo?demo=tms");
  await context.close();
});
