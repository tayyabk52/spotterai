import { expect, test } from "@playwright/test";

test.use({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});

test("TMS hero and finances decode after mobile media activation", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const ready = Object.getOwnPropertyDescriptor(
      HTMLMediaElement.prototype,
      "readyState",
    )!;
    const time = Object.getOwnPropertyDescriptor(
      HTMLMediaElement.prototype,
      "currentTime",
    )!;
    const play = HTMLMediaElement.prototype.play;
    const activated = new WeakSet<HTMLMediaElement>();
    let gesture = false;
    for (const event of ["touchend", "pointerup"]) {
      document.addEventListener(
        event,
        (e) => {
          if (e.isTrusted) gesture = true;
        },
        true,
      );
    }
    function isFilm(element: HTMLMediaElement) {
      return (
        element instanceof HTMLVideoElement &&
        element.src.includes("videos-tms/scrub/")
      );
    }
    Object.defineProperty(HTMLMediaElement.prototype, "readyState", {
      configurable: true,
      get() {
        const state = ready.get!.call(this);
        return isFilm(this) && !activated.has(this) && state > 1 ? 1 : state;
      },
    });
    Object.defineProperty(HTMLMediaElement.prototype, "currentTime", {
      configurable: true,
      get: time.get,
      set(value) {
        if (!isFilm(this) || activated.has(this)) time.set!.call(this, value);
      },
    });
    HTMLMediaElement.prototype.play = function () {
      if (isFilm(this)) {
        if (!gesture)
          return Promise.reject(
            new DOMException("User activation required", "NotAllowedError"),
          );
        activated.add(this);
      }
      return play.call(this);
    };
  });
  await page.goto("/tms");
  for (const id of ["tms-intro", "tms-financials"]) {
    const section = page.locator(`#${id}`);
    await section.locator("h1, h2").tap();
    const video = section.locator("video");
    await expect(video).toHaveCount(1);
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState))
      .toBeGreaterThanOrEqual(2);
    for (const fraction of [0.65, 0.85, 0.7]) {
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
        .poll(() =>
          video.evaluate(
            (v: HTMLVideoElement, fraction) =>
              Math.abs(v.currentTime - (v.duration - 1 / 24) * fraction),
            fraction,
          ),
        )
        .toBeLessThan(0.2);
      await expect
        .poll(() => video.evaluate((v) => getComputedStyle(v).opacity))
        .toBe("1");
    }
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
      .toBe(true);
  }
});
