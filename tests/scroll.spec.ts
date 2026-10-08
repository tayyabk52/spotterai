import { test, expect } from "@playwright/test";

test("section navigation eases to the target and transfers focus below the header", async ({
  page,
}) => {
  await page.goto("/");
  await page.waitForTimeout(300);
  await page
    .getByRole("link", { name: "Explore the suite", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/#capabilities$/);
  await expect(page.locator("#capabilities")).toBeFocused();
  const headerBottom = await page
    .getByRole("banner")
    .evaluate((element) => element.getBoundingClientRect().height);
  expect(
    await page
      .locator("#capabilities")
      .evaluate((element) => element.getBoundingClientRect().top),
  ).toBeCloseTo(headerBottom + 24, 0);
  await page.goBack();
  await expect(page).not.toHaveURL(/#capabilities$/);
});

test("manual wheel input interrupts section scrolling", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(300);
  await page
    .locator('a[href="#capabilities"]')
    .first()
    .evaluate((element) => (element as HTMLElement).click());
  await page.waitForTimeout(70);
  await page.evaluate(() => window.dispatchEvent(new WheelEvent("wheel")));
  const stoppedAt = await page.evaluate(() => window.scrollY);
  await page.waitForTimeout(900);
  expect(await page.evaluate(() => window.scrollY)).toBe(stoppedAt);
  await expect(page.locator("#capabilities")).not.toBeFocused();
});

test("reduced motion jumps directly to the section", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForTimeout(300);
  const result = await page
    .locator('a[href="#capabilities"]')
    .first()
    .evaluate((element) => {
      (element as HTMLElement).click();
      return {
        top: Math.round(
          document.getElementById("capabilities")!.getBoundingClientRect().top,
        ),
        expectedTop: Math.round(
          document.querySelector("header")!.getBoundingClientRect().height + 24,
        ),
        focused: document.activeElement?.id,
      };
    });
  expect(result.top).toBe(result.expectedTop);
  expect(result.focused).toBe("capabilities");
});
