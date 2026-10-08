import { expect, test } from "@playwright/test";

for (const width of [360, 768, 1440]) {
  test(`source product demonstrations play normally at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tms");
    await expect(page.locator("#tms-title")).toHaveText(
      "Finally, TMS Built For Dispatchers",
    );
    for (const [id, file] of [
      ["tms-capabilities", "tms-fuel-seek-hero.mp4"],
      ["tms-visibility", "spotter-tms2.mp4"],
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      const video = page.locator(`#${id} video`);
      await expect(video).toHaveAttribute("src", `/videos/${file}`);
      await video.evaluate(async (element: HTMLVideoElement) => {
        if (element.readyState < 2) {
          await new Promise<void>((resolve) =>
            element.addEventListener("loadeddata", () => resolve(), {
              once: true,
            }),
          );
        }
        await element.play();
      });
      const before = await video.evaluate(
        (element: HTMLVideoElement) => element.currentTime,
      );
      await expect
        .poll(() =>
          video.evaluate((element: HTMLVideoElement) => element.currentTime),
        )
        .toBeGreaterThan(before + 0.3);
      expect(
        await video.evaluate((element: HTMLVideoElement) => element.controls),
      ).toBe(true);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
  });
}
