import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const [width, height] of [
  [320, 800],
  [390, 844],
  [768, 900],
  [1199, 800],
  [640, 360],
]) {
  test(`full-screen drawer fits ${width}x${height} and keeps its action accessible`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation" }).click();
    const drawer = page.getByRole("dialog", { name: "Mobile navigation" });
    await expect(drawer).toBeVisible();
    const bounds = await drawer.boundingBox();
    expect(bounds).toEqual({ x: 0, y: 0, width, height });
    await drawer.getByRole("button", { name: "Products", exact: true }).click();
    const quote = drawer.getByRole("link", { name: "Request a demo or quote" });
    await expect(quote).toHaveAttribute(
      "href",
      "https://spotter.ai/request-quote",
    );
    const actionBounds = await quote.boundingBox();
    expect(actionBounds!.y + actionBounds!.height).toBeLessThanOrEqual(height);
    expect(actionBounds!.x + actionBounds!.width).toBeLessThanOrEqual(width);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await drawer.getByRole("button", { name: "Close navigation" }).click();
    await expect(drawer).not.toBeVisible();
  });
}

test("drawer contains focus and restores scroll position and body styles", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    document.body.style.overflow = "clip";
    window.scrollTo(0, 800);
  });
  const previousY = await page.evaluate(() => window.scrollY);
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  const lockedY = await page.evaluate(() => -parseFloat(document.body.style.top));
  expect(Math.abs(lockedY - previousY)).toBeLessThanOrEqual(2);
  const drawer = page.getByRole("dialog");
  await expect(
    drawer.getByRole("button", { name: "Close navigation" }),
  ).toBeFocused();
  await drawer.getByRole("link", { name: "Request a demo or quote" }).focus();
  await page.keyboard.press("Tab");
  await expect(
    drawer.getByRole("link", { name: "Spotter.ai home" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    drawer.getByRole("link", { name: "Request a demo or quote" }),
  ).toBeFocused();
  expect(await page.evaluate(() => document.body.style.position)).toBe("fixed");
  await drawer.getByRole("button", { name: "Products", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(drawer).not.toBeVisible();
  await expect(menu).toBeFocused();
  expect(
    await page.evaluate(() => ({
      y: window.scrollY,
      overflow: document.body.style.overflow,
      position: document.body.style.position,
    })),
  ).toEqual({ y: lockedY, overflow: "clip", position: "" });
  await menu.click();
  await expect(
    drawer.getByRole("button", { name: "Products", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(drawer).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.position)).toBe("");
});

test("reduced-motion drawer keeps static rows and closes on link activation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  const drawer = page.getByRole("dialog");
  expect(
    await drawer
      .locator("nav > ul > li")
      .evaluateAll((elements) =>
        elements.every(
          (element) => getComputedStyle(element).transform === "none",
        ),
      ),
  ).toBe(true);
  await page.evaluate(() =>
    document.addEventListener(
      "click",
      (event) => {
        if (event.target instanceof Element && event.target.closest("dialog a"))
          event.preventDefault();
      },
      { capture: true },
    ),
  );
  await drawer.getByRole("link", { name: "Request a demo or quote" }).click();
  await expect(drawer).not.toBeVisible();
});
