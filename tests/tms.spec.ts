import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [360, 768, 1440]) {
  test(`TMS layout and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/tms");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("main")).toHaveAttribute("id", "main-content");
    await expect(page.locator("main section")).toHaveCount(8);
    await expect(page.getByText(/^ASSET NEEDED:/)).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://spotter.ai/tms",
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "Spotter TMS: Fleet Operations",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const action of await page.locator("main a").all()) {
      const box = await action.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
      expect(box?.width).toBeGreaterThanOrEqual(44);
    }
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `reports/tms-${width}.png`, fullPage: true });
  });
}

test("TMS anchor, contact destination and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/tms");
  await page
    .getByRole("link", { name: "Explore the operation", exact: true })
    .click();
  await expect(page).toHaveURL(/#tms-capabilities$/);
  const target = page.locator("#tms-capabilities");
  await expect(target).toBeInViewport();
  expect(
    await target.evaluate((element) => element.getBoundingClientRect().top),
  ).toBeGreaterThanOrEqual(88);
  expect(await page.evaluate(() => document.activeElement?.id)).toBe(
    "tms-capabilities",
  );
  for (const action of await page
    .locator("main")
    .getByRole("link", { name: "Request a demo or quote" })
    .all()) {
    await expect(action).toHaveAttribute(
      "href",
      "https://spotter.ai/request-quote?product=tms",
    );
  }
  expect(
    await page
      .locator("main")
      .evaluate((element) => element.getAnimations({ subtree: true }).length),
  ).toBe(0);
});

test("TMS content is available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/tms");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Bring the work into balance." }),
  ).toBeVisible();
  await expect(page.getByText("18%", { exact: true })).toBeVisible();
  await expect(page.getByText(/^ASSET NEEDED:/)).toHaveCount(0);
  await context.close();
});

test("desktop story scrubs forward and backward and can be paused", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/tms");
  const scene = page.locator("#tms-capabilities");
  const geometry = await scene.evaluate((element) => ({
    top: element.getBoundingClientRect().top + scrollY,
    height: element.getBoundingClientRect().height,
  }));
  const travel = geometry.height - 900 + 88;
  const video = scene.locator("video");
  await page.evaluate((y) => scrollTo(0, y), geometry.top - 88 + travel * 0.2);
  await expect(video).toHaveCount(1);
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(1);
  const early = await video.evaluate(
    (element: HTMLVideoElement) => element.currentTime,
  );
  await page.evaluate((y) => scrollTo(0, y), geometry.top - 88 + travel * 0.8);
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(early + 3);
  await page.evaluate((y) => scrollTo(0, y), geometry.top - 88 + travel * 0.2);
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeLessThan(early + 0.3);
  const pinned = await scene.locator(":scope > div").boundingBox();
  expect(pinned?.height).toBeLessThanOrEqual(812);
  expect(pinned?.y).toBeCloseTo(88, 0);
  await expect(
    page.getByRole("link", { name: "03 One operation", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  expect(
    await video.evaluate((element: HTMLVideoElement) => element.paused),
  ).toBe(true);
  const frozen = await video.evaluate(
    (element: HTMLVideoElement) => element.currentTime,
  );
  await page.evaluate((y) => scrollTo(0, y), geometry.top - 88 + travel * 0.7);
  expect(
    await video.evaluate((element: HTMLVideoElement) => element.currentTime),
  ).toBe(frozen);
  await expect(
    page.getByRole("button", { name: "Enable motion", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(scene.locator("img")).toBeVisible();
});

test("mobile and reduced motion use posters without video requests", async ({
  browser,
}) => {
  for (const options of [
    { viewport: { width: 360, height: 800 } },
    {
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce" as const,
    },
  ]) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    const videoRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().endsWith(".mp4")) videoRequests.push(request.url());
    });
    await page.goto("/tms");
    await page.locator("#tms-financials").scrollIntoViewIfNeeded();
    await expect(page.locator("main img")).toHaveCount(6);
    await expect(page.locator("main video")).toHaveCount(0);
    expect(videoRequests).toEqual([]);
    expect(
      await page
        .locator("#tms-capabilities > div")
        .evaluate((element) => getComputedStyle(element).position),
    ).not.toBe("sticky");
    await context.close();
  }
});

test("failed video retains its poster and readable content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.route("**/*.mp4", (route) => route.abort());
  await page.goto("/tms");
  await expect(page.locator("#tms-intro img")).toBeVisible();
  await expect(page.locator("#tms-intro video")).toHaveCount(0);
  await expect(page.locator("h1")).toBeVisible();
});

for (const id of ["tms-intro", "tms-capabilities", "tms-maintenance"]) {
  test(`${id} decodes its opening and final frames and retains the video on re-entry`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/tms");
    const scene = page.locator(`#${id}`);
    const track = id === "tms-intro" ? scene.locator("[data-tms-pin]") : scene;
    const geometry = await track.evaluate((element) => ({
      top: element.getBoundingClientRect().top + scrollY - 88,
      travel: element.getBoundingClientRect().height - innerHeight + 88,
    }));
    await page.evaluate((y) => scrollTo(0, y), geometry.top);
    const video = scene.locator("video");
    await expect(video).toHaveCount(1);
    await expect
      .poll(() =>
        video.evaluate((element: HTMLVideoElement) => element.readyState),
      )
      .toBeGreaterThanOrEqual(2);
    await expect
      .poll(() =>
        video.evaluate((element: HTMLVideoElement) => element.currentTime),
      )
      .toBeLessThan(0.05);
    const handle = await video.elementHandle();
    await video.evaluate((element: HTMLVideoElement) => {
      const presented = (
        _now: number,
        metadata: VideoFrameCallbackMetadata,
      ) => {
        element.dataset.presentedTime = String(metadata.mediaTime);
        element.requestVideoFrameCallback(presented);
      };
      element.requestVideoFrameCallback(presented);
    });
    await page.evaluate((y) => scrollTo(0, y), geometry.top + geometry.travel);
    const final = await video.evaluate(
      (element: HTMLVideoElement) => element.duration - 1 / 24,
    );
    await expect
      .poll(() =>
        video.evaluate((element: HTMLVideoElement) =>
          Math.abs(element.currentTime - (element.duration - 1 / 24)),
        ),
      )
      .toBeLessThan(0.05);
    await expect
      .poll(() =>
        video.evaluate((element: HTMLVideoElement) =>
          Math.abs(
            Number(element.dataset.presentedTime) - (element.duration - 1 / 24),
          ),
        ),
      )
      .toBeLessThan(0.06);
    await page.locator("#tms-contact").scrollIntoViewIfNeeded();
    expect(await handle!.evaluate((element) => element.isConnected)).toBe(true);
    await page.evaluate(
      (y) => scrollTo(0, y),
      geometry.top + geometry.travel * 0.3,
    );
    expect(
      await handle!.evaluate(
        (element, id) => element === document.querySelector(`#${id} video`),
        id,
      ),
    ).toBe(true);
    await expect
      .poll(() =>
        video.evaluate((element: HTMLVideoElement) =>
          Math.abs(element.currentTime - (element.duration - 1 / 24) * 0.3),
        ),
      )
      .toBeLessThan(0.06);
    expect(final).toBeGreaterThan(5);
  });
}

test("wide footage remains uncropped and its captions follow scroll and keyboard controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/tms");
  const scene = page.locator("#tms-capabilities");
  const geometry = await scene.evaluate((element) => ({
    top: element.getBoundingClientRect().top + scrollY - 88,
    travel: element.getBoundingClientRect().height - innerHeight + 88,
  }));
  await page.evaluate(
    (y) => scrollTo(0, y),
    geometry.top + geometry.travel * 0.4,
  );
  await expect(
    scene.getByRole("heading", { name: "Hours and wellness", exact: true }),
  ).toBeVisible();
  const video = scene.locator("video");
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState))
    .toBeGreaterThanOrEqual(2);
  expect(await video.evaluate((v) => getComputedStyle(v).objectFit)).toBe(
    "contain",
  );
  const box = await video.boundingBox();
  expect(box!.width).toBe(1440);
  expect(box!.height).toBe(812);
  const beat = scene.getByRole("button", {
    name: "Fleet coordination",
    exact: true,
  });
  await beat.focus();
  await page.keyboard.press("Enter");
  await expect(
    scene.getByRole("heading", { name: "Fleet coordination", exact: true }),
  ).toBeVisible();
  await expect(beat).toHaveAttribute("aria-pressed", "true");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const violations = (
    await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze()
  ).violations;
  expect(violations).toEqual([]);
});

test("normal chapters scrub across the media passage rather than the copy height", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/tms");
  const scene = page.locator("#tms-load-operations");
  await scene.scrollIntoViewIfNeeded();
  const video = scene.locator("video");
  await expect(video).toHaveCount(1);
  const geometry = await video.evaluate((v) => {
    const wrapper = v.closest("div")!.parentElement!.parentElement!;
    return {
      top: wrapper.getBoundingClientRect().top + scrollY,
      height: wrapper.getBoundingClientRect().height,
    };
  });
  await page.evaluate(
    (y) => scrollTo(0, y),
    geometry.top + geometry.height - 88,
  );
  await expect
    .poll(() =>
      video.evaluate((v: HTMLVideoElement) =>
        Math.abs(v.currentTime - (v.duration - 1 / 24)),
      ),
    )
    .toBeLessThan(0.2);
});

for (const viewport of [
  { width: 1366, height: 768 },
  { width: 1280, height: 720 },
  { width: 1440, height: 800 },
]) {
  test(`desktop footage scrubs at ${viewport.width}x${viewport.height} without requiring a tall pinned layout`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/tms");
    const scene = page.locator("#tms-capabilities");
    await scene.scrollIntoViewIfNeeded();
    const video = scene.locator("video");
    await expect(video).toHaveCount(1);
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState))
      .toBeGreaterThanOrEqual(2);
    expect(
      await scene
        .locator(":scope > div")
        .evaluate((e) => getComputedStyle(e).position),
    ).not.toBe("sticky");
    await expect(
      scene.getByRole("heading", { name: "Fleet coordination", exact: true }),
    ).toBeVisible();
    const early = await video.evaluate((v: HTMLVideoElement) => v.currentTime);
    await page.mouse.wheel(0, 240);
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
      .toBeGreaterThan(early + 0.2);
    const hero = page.locator("#tms-intro");
    await hero.locator("img").scrollIntoViewIfNeeded();
    const heroVideo = hero.locator("video");
    await expect(heroVideo).toHaveCount(1);
    await expect
      .poll(() => heroVideo.evaluate((v: HTMLVideoElement) => v.readyState))
      .toBeGreaterThanOrEqual(2);
    const heroEarly = await heroVideo.evaluate(
      (v: HTMLVideoElement) => v.currentTime,
    );
    await page.mouse.wheel(0, 180);
    await expect
      .poll(() => heroVideo.evaluate((v: HTMLVideoElement) => v.currentTime))
      .toBeGreaterThan(heroEarly + 0.2);
  });
}
