import { expect, test, type Locator } from "@playwright/test";

test.use({ hasTouch: true });

test("mobile scrub catches up when a previous seek completion is delayed", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    const seeking = Object.getOwnPropertyDescriptor(
      HTMLMediaElement.prototype,
      "seeking",
    )!;
    const time = Object.getOwnPropertyDescriptor(
      HTMLMediaElement.prototype,
      "currentTime",
    )!;
    Object.defineProperty(HTMLMediaElement.prototype, "seeking", {
      configurable: true,
      get() {
        return this instanceof HTMLVideoElement &&
          this.dataset.stalledSeek === "true"
          ? true
          : seeking.get!.call(this);
      },
    });
    Object.defineProperty(HTMLMediaElement.prototype, "currentTime", {
      configurable: true,
      get: time.get,
      set(value) {
        if (this instanceof HTMLVideoElement) delete this.dataset.stalledSeek;
        time.set!.call(this, value);
      },
    });
  });
  await page.goto("/loan-calculators");
  const video = page.locator("#calculator-intro video");
  await expect(video).toHaveCount(1);
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState))
    .toBeGreaterThanOrEqual(2);
  await expectScrollFrame(video, 0.65, 0.15);
  await video.evaluate((v) => {
    v.dataset.stalledSeek = "true";
  });
  await expectScrollFrame(video, 0.85, 0.15);
});

async function expectScrollFrame(
  video: Locator,
  fraction: number,
  tolerance = 0.05,
) {
  await video.evaluate(async (element, fraction) => {
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
    // Allow the native scroll event and Motion's frame subscriber to settle.
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
  }, fraction);
  const duration = await video.evaluate(
    (element: HTMLVideoElement) => element.duration,
  );
  await expect
    .poll(() =>
      video.evaluate(
        (element: HTMLVideoElement, target) =>
          Math.abs(element.currentTime - target),
        (duration - 1 / 24) * fraction,
      ),
    )
    .toBeLessThan(tolerance);
  await expect
    .poll(() => video.evaluate((element: HTMLVideoElement) => element.seeking))
    .toBe(false);
  await expect
    .poll(() => video.evaluate((element) => getComputedStyle(element).opacity))
    .toBe("1");
}

for (const [route, ids] of [
  ["/claims-os", ["claims-intro", "claims-financials"]],
  ["/loan-calculators", ["calculator-intro"]],
  ["/tms", ["tms-intro", "tms-financials"]],
  ["/driversapp", ["driver-intro", "driver-scoring"]],
  ["/sentinel", ["sentinel-hero", "sentinel-compliance"]],
] as const) {
  test(`${route} mobile films reveal frames when loadeddata is suppressed`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(() => {
      document.addEventListener(
        "loadeddata",
        (event) => {
          if (event.target instanceof HTMLVideoElement)
            event.stopImmediatePropagation();
        },
        true,
      );
    });
    await page.goto(route);
    for (const id of ids) {
      await page.locator(`#${id} img`).first().scrollIntoViewIfNeeded();
      const video = page.locator(`#${id} video`);
      await expect(video).toHaveCount(1);
      await expect
        .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState))
        .toBeGreaterThanOrEqual(2);
      await expectScrollFrame(video, 0.65, 0.15);
      await expectScrollFrame(video, 0.85, 0.15);
      await expectScrollFrame(video, 0.7, 0.15);
      expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(
        true,
      );
    }
  });
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
