import { expect, test } from "@playwright/test";

for (const [width, height] of [
  [360, 800],
  [390, 844],
  [768, 900],
  [1023, 700],
  [1280, 720],
  [1440, 900],
]) {
  test(`hero scrubs forward and backward at ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/tms");
    const video = page.locator("#tms-intro video");
    await expect(video).toHaveCount(1);
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState))
      .toBeGreaterThanOrEqual(2);
    const seek = async (fraction: number) => {
      await video.evaluate((v, fraction) => {
        const header = document
          .querySelector("header")!
          .getBoundingClientRect().height;
        const pinned = matchMedia(
          "(min-width: 1024px) and (min-height: 850px)",
        ).matches;
        const target = pinned
          ? v.closest("[data-tms-pin]")!
          : v.parentElement!.parentElement!;
        const box = target.getBoundingClientRect();
        const start = box.top + scrollY - (pinned ? header : innerHeight);
        const distance = pinned
          ? box.height - innerHeight + header
          : box.height + innerHeight - header;
        scrollTo({ top: start + distance * fraction, behavior: "instant" });
      }, fraction);
      await expect
        .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
        .toBeCloseTo((7.96 - 1 / 24) * fraction, 0);
    };
    await seek(0.65);
    await seek(0.9);
    await seek(0.7);
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await page.setViewportSize({
      width: width < 1024 ? 1280 : 390,
      height: 800,
    });
    await expect(video).toHaveCount(1);
    await seek(0.65);
    await seek(0.85);
  });
}

test("reduced-motion hero retains its poster", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/tms");
  await expect(page.locator("#tms-intro img")).toBeVisible();
  await expect(page.locator("#tms-intro video")).toHaveCount(0);
});

for (const width of [360, 768, 1440]) {
  test(`financial resolution uses decoded video at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tms");
    await page.locator("#tms-financials").scrollIntoViewIfNeeded();
    const video = page.locator("#tms-financials video");
    await expect(video).toHaveAttribute(
      "src",
      "/brand/videos-tms/scrub/resolution.mp4",
    );
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState))
      .toBeGreaterThanOrEqual(2);
    const seek = async (fraction: number) => {
      await video.evaluate((v, fraction) => {
        const box = v.parentElement!.parentElement!.getBoundingClientRect();
        const header = document
          .querySelector("header")!
          .getBoundingClientRect().height;
        scrollTo({
          top:
            box.top +
            scrollY -
            innerHeight +
            (box.height + innerHeight - header) * fraction,
          behavior: "instant",
        });
      }, fraction);
      await expect
        .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
        .toBeCloseTo((5.96 - 1 / 24) * fraction, 0);
    };
    await seek(0.6);
    await seek(0.85);
    await seek(0.65);
    expect(await video.evaluate((v) => getComputedStyle(v).opacity)).toBe("1");
  });
}
