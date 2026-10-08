import { expect, test, type Locator } from "@playwright/test";

async function expectScrollFrame(video: Locator, fraction: number) {
  await video.evaluate((element, fraction) => {
    const box = element.parentElement!.parentElement!.getBoundingClientRect();
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
  const duration = await video.evaluate(
    (element: HTMLVideoElement) => element.duration,
  );
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeCloseTo((duration - 1 / 24) * fraction, 1);
  await expect
    .poll(() => video.evaluate((element) => getComputedStyle(element).opacity))
    .toBe("1");
}

for (const viewport of [
  { width: 320, height: 668 },
  { width: 390, height: 844 },
  { width: 768, height: 900 },
]) {
  test(`About films stay visible without loadeddata at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.addInitScript(() => {
      // Mobile data-saving modes may suppress this event entirely.
      document.addEventListener(
        "loadeddata",
        (event) => {
          if (event.target instanceof HTMLVideoElement)
            event.stopImmediatePropagation();
        },
        true,
      );
    });
    await page.goto("/about");
    for (const id of ["about-opening", "about-philosophy"]) {
      await page.locator(`#${id} img`).scrollIntoViewIfNeeded();
      const video = page.locator(`#${id} video`);
      await expect(video).toHaveCount(1);
      await expect
        .poll(() => video.evaluate((v) => getComputedStyle(v).opacity))
        .toBe("1");
      await expectScrollFrame(video, 0.6);
      await expectScrollFrame(video, 0.8);
      await expectScrollFrame(video, 0.65);
    }
  });
}

test("metadata-only loading can seek and reveal a decoded frame", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    const ready = Object.getOwnPropertyDescriptor(
      HTMLMediaElement.prototype,
      "readyState",
    )!;
    const time = Object.getOwnPropertyDescriptor(
      HTMLMediaElement.prototype,
      "currentTime",
    )!;
    const requested = new WeakSet<HTMLMediaElement>();
    Object.defineProperty(HTMLMediaElement.prototype, "readyState", {
      configurable: true,
      get() {
        const state = ready.get!.call(this);
        return this instanceof HTMLVideoElement &&
          !requested.has(this) &&
          state > 1
          ? 1
          : state;
      },
    });
    Object.defineProperty(HTMLMediaElement.prototype, "currentTime", {
      configurable: true,
      get: time.get,
      set(value) {
        requested.add(this);
        time.set!.call(this, value);
      },
    });
    document.addEventListener(
      "loadeddata",
      (event) => {
        if (event.target instanceof HTMLVideoElement)
          event.stopImmediatePropagation();
      },
      true,
    );
  });
  await page.goto("/about");
  for (const id of ["about-opening", "about-philosophy"]) {
    await page.locator(`#${id} img`).scrollIntoViewIfNeeded();
    const video = page.locator(`#${id} video`);
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
      .toBeGreaterThan(0.1);
    await expect
      .poll(() => video.evaluate((v) => getComputedStyle(v).opacity))
      .toBe("1");
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  }
});
