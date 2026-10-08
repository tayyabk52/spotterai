import { test, expect } from "@playwright/test";

test.describe("Request Quote & Information Page (/request-quote)", () => {
  test("Desktop: Form fits within viewport and renders all required fields", async ({
    page,
  }) => {
    // Standard desktop monitor viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/request-quote");

    // 1. Verify Header
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Request");
    await expect(heading).toContainText("for Information");

    // 2. Verify all inputs exist
    const fullNameInput = page.getByTestId("input-fullname");
    const emailInput = page.getByTestId("input-email");
    const phoneInput = page.getByTestId("input-phone");
    const mcInput = page.getByTestId("input-mcNumber");
    const notesInput = page.getByTestId("input-notes");
    const fleetSelect = page.getByTestId("select-fleet-size");
    const submitBtn = page.getByTestId("submit-quote-btn");

    await expect(fullNameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(mcInput).toBeVisible();
    await expect(notesInput).toBeVisible();
    await expect(fleetSelect).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // 3. Verify all 6 product interest cards
    const productIds = [
      "lens",
      "crm",
      "driver-app",
      "tms",
      "sentinel",
      "extension",
    ];
    for (const id of productIds) {
      const card = page.getByTestId(`product-card-${id}`);
      await expect(card).toBeVisible();
    }

    // 4. Viewport check: Submit button should be within the initial viewport without scrolling
    const submitBox = await submitBtn.boundingBox();
    expect(submitBox).not.toBeNull();
    if (submitBox) {
      expect(submitBox.y + submitBox.height).toBeLessThanOrEqual(900);
    }
  });

  test("Form validation: Shows error when full name is missing on submit", async ({
    page,
  }) => {
    await page.goto("/request-quote");

    const submitBtn = page.getByTestId("submit-quote-btn");
    await submitBtn.click();

    // Full name error should appear
    const errorMsg = page.getByTestId("error-fullname");
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText("Full name is required");
    await expect(page.getByLabel("Full name", { exact: true })).toBeFocused();

    // Typing in full name clears error
    const fullNameInput = page.getByTestId("input-fullname");
    await fullNameInput.fill("Alexander Mercer");
    await expect(errorMsg).not.toBeVisible();
  });

  test("Product card toggling and keyboard accessibility", async ({ page }) => {
    await page.goto("/request-quote");

    const lensCard = page.getByTestId("product-card-lens");
    await expect(lensCard).toHaveAttribute("aria-checked", "false");

    // Click to select
    await lensCard.click();
    await expect(lensCard).toHaveAttribute("aria-checked", "true");

    // Click again to deselect
    await lensCard.click();
    await expect(lensCard).toHaveAttribute("aria-checked", "false");

    // Keyboard Space to toggle
    await lensCard.focus();
    await page.keyboard.press("Space");
    await expect(lensCard).toHaveAttribute("aria-checked", "true");
  });

  test("URL query param pre-selection works for product links", async ({
    page,
  }) => {
    // Test ?product=sentinel
    await page.goto("/request-quote?product=sentinel");
    const sentinelCard = page.getByTestId("product-card-sentinel");
    await expect(sentinelCard).toHaveAttribute("aria-checked", "true");

    // Test ?product=tms
    await page.goto("/request-quote?product=tms");
    const tmsCard = page.getByTestId("product-card-tms");
    await expect(tmsCard).toHaveAttribute("aria-checked", "true");
  });

  test("Form submission flow displays success confirmation", async ({
    page,
  }) => {
    await page.goto("/request-quote");

    await page.getByTestId("input-fullname").fill("Devin Vance");
    await page
      .getByTestId("input-email")
      .fill("devin.vance@freightlogistics.com");
    await page.getByTestId("input-phone").fill("+1 (555) 234-5678");
    await page.getByTestId("input-mcNumber").fill("MC-892104");
    await page
      .getByTestId("input-notes")
      .fill("Interested in fleet management and telematics.");
    await page.getByTestId("select-fleet-size").selectOption("16 - 50 trucks");
    await page.getByTestId("product-card-tms").click();

    const submitBtn = page.getByTestId("submit-quote-btn");
    await submitBtn.click();

    // Success screen check
    const successBanner = page.getByTestId("quote-success-banner");
    await expect(successBanner).toBeVisible();
    await expect(page.getByText("Request Submitted")).toBeVisible();
    await expect(page.getByText(/Reference ID:/)).toBeVisible();
  });

  test("Mobile responsiveness: No horizontal overflow and touch targets meet minimums", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/request-quote");

    // Verify page title
    await expect(page.locator("h1")).toBeVisible();

    // Check that elements fit horizontally without page scrollWidth exceeding viewport
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    expect(scrollWidth).toBeLessThanOrEqual(375);

    // Check touch target height on mobile (at least 44px)
    const submitBtn = page.getByTestId("submit-quote-btn");
    const btnBox = await submitBtn.boundingBox();
    expect(btnBox).not.toBeNull();
    if (btnBox) {
      expect(btnBox.height).toBeGreaterThanOrEqual(44);
    }
  });

  test("Mobile fields have persistent labels, readable text and native zoom remains available", async ({
    page,
  }) => {
    for (const width of [320, 375, 768]) {
      await page.setViewportSize({ width, height: 812 });
      await page.goto("/request-quote");
      await expect(page.getByLabel("Full name", { exact: true })).toBeVisible();
      await expect(
        page.getByLabel("Email address", { exact: true }),
      ).toBeVisible();
      await expect(
        page.getByLabel("Phone number", { exact: true }),
      ).toBeVisible();
      const controls = await page
        .locator("main input, main textarea, main select")
        .evaluateAll((elements) =>
          elements.map((element) => ({
            fontSize: parseFloat(getComputedStyle(element).fontSize),
            height: element.getBoundingClientRect().height,
          })),
        );
      expect(controls).toHaveLength(6);
      for (const control of controls) {
        expect(control.fontSize).toBeGreaterThanOrEqual(16);
        expect(control.height).toBeGreaterThanOrEqual(44);
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      const viewport = await page
        .locator('meta[name="viewport"]')
        .getAttribute("content");
      expect(viewport).not.toMatch(/user-scalable=no|maximum-scale=1(?:,|$)/);
    }
  });

  test("Failed submission preserves fields and product selections for retry", async ({
    page,
  }) => {
    await page.route("**/api/quote", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Unable to send your request. Please try again.",
        }),
      }),
    );
    await page.goto("/request-quote?product=sentinel");
    await page.getByLabel("Full name", { exact: true }).fill("Alex Mercer");
    await page
      .getByLabel("Email address", { exact: true })
      .fill("alex@example.com");
    await page
      .getByLabel("Phone number", { exact: true })
      .fill("+1 555 234 5678");
    await page.getByTestId("submit-quote-btn").click();
    await expect(page.getByRole("main").getByRole("alert")).toHaveText(
      "Unable to send your request. Please try again.",
    );
    await expect(page.getByLabel("Full name", { exact: true })).toHaveValue(
      "Alex Mercer",
    );
    await expect(page.getByTestId("product-card-sentinel")).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await expect(page.getByTestId("submit-quote-btn")).toBeEnabled();
  });
});
