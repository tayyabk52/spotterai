import fs from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";
import { about } from "../content/about";

const source = JSON.parse(
  fs.readFileSync("docs/source/about-inventory.json", "utf8"),
) as { text: string; title: string; description: string };
const sourceLines = source.text
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);
const mainCopy = sourceLines.slice(
  sourceLines.indexOf("About Spotter"),
  sourceLines.indexOf("Serving fleets across North America") + 1,
);

async function seek(video: Locator, fraction: number) {
  await video.evaluate((element, fraction) => {
    const header = document
      .querySelector("header")!
      .getBoundingClientRect().height;
    const pinned = matchMedia(
      "(min-width: 1024px) and (min-height: 850px) and (prefers-reduced-motion: no-preference)",
    ).matches;
    const target = pinned
      ? element.closest("section")!
      : element.parentElement!.parentElement!;
    const box = target.getBoundingClientRect();
    const start = box.top + scrollY - (pinned ? header : innerHeight);
    const distance = pinned
      ? box.height - innerHeight + header
      : box.height + innerHeight - header;
    scrollTo({ top: start + distance * fraction, behavior: "instant" });
  }, fraction);
  const duration = await video.evaluate(
    (element: HTMLVideoElement) => element.duration,
  );
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeCloseTo((duration - 1 / 24) * fraction, 0);
}

test("all source copy, metadata and genuine award assets are retained", async ({
  page,
}) => {
  await page.goto("/about");
  const text = (await page.locator("main").textContent())!.replace(/\s+/g, " ");
  for (const line of mainCopy)
    expect(text).toContain(line.replace(/\s+/g, " "));
  await expect(page).toHaveTitle(source.title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    source.description,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://spotter.ai/about",
  );
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("#about-automation h3")).toHaveCount(9);
  await expect(page.locator("#about-journey li")).toHaveCount(8);
  await expect(page.locator("#about-awards img")).toHaveCount(5);
  await expect(
    page.getByRole("link", { name: "Talk to Sales", exact: true }),
  ).toHaveAttribute("href", "https://spotter.ai/request-quote");
  await expect(
    page.locator('#about-contact a[href="mailto:sales@spotter.ai"]'),
  ).toBeAttached();
  expect(about.philosophy.copyStatus.paragraphs).toEqual([
    "exact reuse",
    "exact reuse",
  ]);
  const schema = JSON.parse(
    await page.locator('main script[type="application/ld+json"]').innerText(),
  );
  expect(schema["@type"]).toBe("AboutPage");
  expect(schema.about).not.toHaveProperty("foundingDate");
});

for (const [width, height] of [
  [360, 800],
  [768, 900],
  [1280, 720],
  [1024, 850],
  [1440, 900],
]) {
  test(`layout, targets, keyboard and chapter links at ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/about");
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    for (const id of [
      "about-opening",
      "about-reality",
      "about-automation",
      "about-operators",
      "about-philosophy",
      "about-journey",
      "about-awards",
      "about-contact",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    }
    if (width >= 1024 && height >= 850) {
      const geometry = await page
        .locator("#about-philosophy")
        .evaluate((section) => {
          const copy = section.querySelector<HTMLElement>(
            '[class*="sceneCopy"]',
          )!;
          const stage = section.firstElementChild!;
          return {
            bottom: copy.getBoundingClientRect().bottom,
            stageBottom: stage.getBoundingClientRect().bottom,
          };
        });
      expect(geometry.bottom).toBeLessThanOrEqual(geometry.stageBottom);
    }
    const targets = await page
      .locator("main a, main button")
      .evaluateAll((elements) =>
        elements
          .filter((element) => element.getClientRects().length)
          .map((element) => {
            const box = element.getBoundingClientRect();
            return { width: box.width, height: box.height };
          }),
      );
    for (const box of targets) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to content" }),
    ).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
    const rail = page.getByRole("navigation", {
      name: about.ui.navigationLabel,
    });
    if (width < 1024) {
      await page.locator("#about-reality").scrollIntoViewIfNeeded();
    }
    await rail.locator('a[href="#about-philosophy"]').click();
    await expect(page).toHaveURL(/#about-philosophy$/);
    await expect
      .poll(() =>
        page
          .locator("#about-philosophy")
          .evaluate((element) =>
            Math.round(element.getBoundingClientRect().top),
          ),
      )
      .toBeGreaterThanOrEqual(80);
    expect(errors).toEqual([]);
  });
}

for (const height of [720, 900]) {
  test(`both films seek in both directions and persist at 1440x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height });
    await page.goto("/about");
    for (const id of ["about-opening", "about-philosophy"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      const video = page.locator(`#${id} video`);
      await expect(video).toHaveCount(1);
      await expect
        .poll(() =>
          video.evaluate((element: HTMLVideoElement) => element.readyState),
        )
        .toBeGreaterThanOrEqual(2);
      await video.evaluate((element) => {
        element.dataset.identity = "retained";
      });
      await seek(video, 0.65);
      await seek(video, 0.85);
      await seek(video, 0.6);
      await expect(
        page.getByRole("button", { name: about.ui.pause }),
      ).toBeVisible();
      await page.getByRole("button", { name: about.ui.pause }).click();
      const before = await video.evaluate(
        (element: HTMLVideoElement) => element.currentTime,
      );
      await page.mouse.wheel(0, 150);
      await page.waitForTimeout(150);
      expect(
        await video.evaluate(
          (element: HTMLVideoElement) => element.currentTime,
        ),
      ).toBeCloseTo(before, 2);
      await page.getByRole("button", { name: about.ui.resume }).click();
      await page.locator("#about-awards").scrollIntoViewIfNeeded();
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(video).toHaveAttribute("data-identity", "retained");
      await seek(video, 0.65);
      expect(
        await video.evaluate((element: HTMLVideoElement) => element.paused),
      ).toBe(true);
    }
  });
}

test("reduced motion retains static first frames without video downloads", async ({
  page,
}) => {
  for (const reducedMotion of ["reduce"] as const) {
    await page.emulateMedia({ reducedMotion });
    await page.setViewportSize({
      width: reducedMotion === "reduce" ? 1440 : 360,
      height: 900,
    });
    const videos: string[] = [];
    page.on("request", (request) => {
      if (request.url().endsWith(".mp4")) videos.push(request.url());
    });
    await page.goto("/about");
    await page.locator("#about-philosophy").scrollIntoViewIfNeeded();
    await expect(page.locator("main video")).toHaveCount(0);
    await expect(page.locator("#about-philosophy img")).toBeVisible();
    expect(videos).toEqual([]);
    expect(
      await page
        .locator("[data-about-stage]")
        .evaluate((element) => getComputedStyle(element).position),
    ).toBe("relative");
  }
});

test("no JavaScript shows the complete story without empty pinned tracks", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(
    `${process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000"}/about`,
  );
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("main video")).toHaveCount(0);
  await expect(page.locator("#about-journey li")).toHaveCount(8);
  expect(
    await page
      .locator("[data-about-stage]")
      .evaluate((element) => getComputedStyle(element).position),
  ).toBe("relative");
  expect(
    await page
      .locator("#about-philosophy")
      .evaluate((element) => getComputedStyle(element).minHeight),
  ).toBe("0px");
  await page.locator("#about-contact").scrollIntoViewIfNeeded();
  await expect(page.locator("#about-contact h2")).toBeVisible();
  await context.close();
});

test("a failed film preserves its actual poster and readable copy", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.route(
    "**/brand/aboutus-videos/web/about-execution-layer.mp4",
    (route) => route.abort(),
  );
  await page.goto("/about");
  await expect(page.locator("#about-opening img")).toBeVisible();
  await expect(page.locator("#about-opening video")).toHaveCount(0);
  await expect(page.locator("h1")).toHaveText(about.opening.title);
});

for (const width of [360, 1440]) {
  test(`WCAG AA scan at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    await page.locator("#about-contact").scrollIntoViewIfNeeded();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

for (const [width, height] of [
  [360, 800],
  [390, 844],
  [768, 900],
  [1023, 700],
  [1280, 720],
  [1440, 900],
]) {
  test(`both About films scrub and survive resize at ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/about");
    for (const id of ["about-opening", "about-philosophy"]) {
      await page.locator(`#${id} img`).scrollIntoViewIfNeeded();
      const video = page.locator(`#${id} video`);
      await expect(video).toHaveCount(1);
      await expect
        .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState))
        .toBeGreaterThanOrEqual(2);
      await video.evaluate((v) => {
        v.dataset.resizeIdentity = "retained";
      });
      await seek(video, 0.65);
      await seek(video, 0.85);
      await seek(video, 0.6);
      for (const viewport of [
        { width: 390, height: 844 },
        { width: 1440, height: 900 },
        { width: 1280, height: 720 },
      ]) {
        await page.setViewportSize(viewport);
        await expect(video).toHaveAttribute("data-resize-identity", "retained");
        await seek(video, 0.65);
        await seek(video, 0.8);
        await seek(video, 0.6);
      }
    }
  });
}
