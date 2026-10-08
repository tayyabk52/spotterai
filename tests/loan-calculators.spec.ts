import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [360, 768, 1440]) {
  test(`Loan Calculators layout, SEO, accessibility and landmarks at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/loan-calculators");

    // Exactly one h1 landmark
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText(
      "Commercial Truck Loan Calculators",
    );

    // Canonical link
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://spotter.ai/loan-calculators",
    );

    // Primary CTA link
    const quoteLinks = page.getByRole("link", {
      name: "Request Financing Quote",
    });
    await expect(quoteLinks.first()).toHaveAttribute(
      "href",
      /request-quote\?product=financing$/,
    );

    // Section landmarks and IDs
    for (const id of [
      "calculator-intro",
      "calculator-suite",
      "equipment-benchmarks",
      "fleet-economics",
      "calculator-contact",
    ]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }

    // Check no horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);

    // Accessibility test (WCAG 2.1 AA)
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);

    expect(errors).toEqual([]);
  });
}

test("Loan Calculators verifies mathematical precision and interactive tab switching", async ({
  page,
}) => {
  await page.goto("/loan-calculators");

  // 1. Amortization default calculations
  await expect(page.locator("#panel-amortization")).toBeVisible();
  await expect(page.getByText("$3,883.94").first()).toBeVisible();
  await expect(page.getByText("$233,036.45")).toBeVisible();
  await expect(page.getByText("$58,036.45")).toBeVisible();

  // Schedule table should display Month 1 row
  await expect(
    page.getByRole("cell", { name: "Month 1", exact: true }),
  ).toBeVisible();

  // 2. Switch to Affordability Calculator
  await page.getByRole("tab", { name: /Affordability Calculator/i }).click();
  await expect(page.locator("#panel-affordability")).toBeVisible();
  await expect(page.getByText("$112,643.32").first()).toBeVisible();

  // 3. Switch to Interest Rate Calculator
  await page.getByRole("tab", { name: /Interest Rate Calculator/i }).click();
  await expect(page.locator("#panel-interest-rate")).toBeVisible();
  await expect(page.getByText("0.00%")).toBeVisible();

  // Test solving for 11.90% APR
  await page
    .locator("#panel-interest-rate input[type='number']")
    .nth(1)
    .fill("3329.09");
  await expect(page.getByText("11.90%")).toBeVisible();
});

test("Loan Calculators verifies keyboard navigation across tabs and table wrapper", async ({
  page,
}) => {
  await page.goto("/loan-calculators");

  // Focus the first tab
  const tab1 = page.locator("#tab-amortization");
  await tab1.focus();
  await expect(tab1).toBeFocused();

  // ArrowRight should move to Affordability Calculator
  await page.keyboard.press("ArrowRight");
  const tab2 = page.locator("#tab-affordability");
  await expect(tab2).toBeFocused();
  await expect(page.locator("#panel-affordability")).toBeVisible();

  // ArrowRight should move to Interest Rate Calculator
  await page.keyboard.press("ArrowRight");
  const tab3 = page.locator("#tab-interest-rate");
  await expect(tab3).toBeFocused();
  await expect(page.locator("#panel-interest-rate")).toBeVisible();

  // Home key returns to first tab
  await page.keyboard.press("Home");
  await expect(tab1).toBeFocused();
  await expect(page.locator("#panel-amortization")).toBeVisible();

  // Verify table wrapper is focusable keyboard scroll region (tabIndex={0})
  const tableWrapper = page.locator('[role="region"][aria-label="Amortization payment schedule"]');
  await expect(tableWrapper).toHaveAttribute("tabindex", "0");
  await tableWrapper.focus();
  await expect(tableWrapper).toBeFocused();
});

test("Loan Calculators all interactive elements in main have touch targets >= 44x44 CSS px", async ({
  page,
}) => {
  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/loan-calculators");

    const controls = page.locator("main a, main button, main input");
    const count = await controls.count();
    for (let i = 0; i < count; i++) {
      const el = controls.nth(i);
      if (await el.isVisible()) {
        const box = await el.boundingBox();
        if (box) {
          expect(
            box.width,
            `Control index ${i} at ${width}px width was ${box.width}px (<44px)`,
          ).toBeGreaterThanOrEqual(43.5);
          expect(
            box.height,
            `Control index ${i} at ${width}px height was ${box.height}px (<44px)`,
          ).toBeGreaterThanOrEqual(43.5);
        }
      }
    }
  }
});

test("Loan Calculators hero pinning strictly enforces >= 1024px width and >= 850px height", async ({
  page,
}) => {
  // Case A: 1440 x 900 -> eligible for sticky pinning
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/loan-calculators");
  const stageA = page.locator("[data-calc-pin] > div").first();
  const positionA = await stageA.evaluate((el) => window.getComputedStyle(el).position);
  expect(positionA).toBe("sticky");

  // Case B: 1440 x 700 -> short desktop window (< 850px height) -> unpinned
  await page.setViewportSize({ width: 1440, height: 700 });
  await page.goto("/loan-calculators");
  const stageB = page.locator("[data-calc-pin] > div").first();
  const positionB = await stageB.evaluate((el) => window.getComputedStyle(el).position);
  expect(positionB).toBe("relative");

  // Case C: 768 x 900 -> tablet window (< 1024px width) -> unpinned
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/loan-calculators");
  const stageC = page.locator("[data-calc-pin] > div").first();
  const positionC = await stageC.evaluate((el) => window.getComputedStyle(el).position);
  expect(positionC).toBe("relative");
});

test("Loan Calculators reduced motion disables pinning and provides static presentation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/loan-calculators");

  // Hero stage must be unpinned when reduced-motion is requested
  const stage = page.locator("[data-calc-pin] > div").first();
  const position = await stage.evaluate((el) => window.getComputedStyle(el).position);
  expect(position).toBe("relative");

  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("#calculator-suite")).toBeVisible();
  await expect(page.locator("#equipment-benchmarks")).toBeVisible();
  await expect(page.locator("#fleet-economics")).toBeVisible();
});

test("Loan Calculators renders cleanly without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/loan-calculators");

  // H1 and all core chapters are in HTML source
  await expect(page.locator("h1")).toContainText("Commercial Truck Loan Calculators");
  await expect(page.locator("#calculator-suite")).toBeAttached();
  await expect(page.locator("#equipment-benchmarks")).toBeAttached();
  await expect(page.locator("#fleet-economics")).toBeAttached();
  await expect(page.locator("#calculator-contact")).toBeAttached();

  await context.close();
});
