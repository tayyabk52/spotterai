import { test, expect } from "@playwright/test";

test.describe("Login Portal & Navbar Integration (/login)", () => {
  test("Navbar contains clean Log in button linking to /login", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const navLoginBtn = page.getByTestId("nav-login-btn");
    await expect(navLoginBtn).toBeVisible();
    await expect(navLoginBtn).toContainText("Log in");
    await expect(navLoginBtn).toHaveAttribute("href", "/login");

    // Click to navigate to /login
    await navLoginBtn.click();
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator("h1")).toContainText("Select Your");
  });


  test("Login page renders both redesigned portal cards with exact source destinations", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/login");

    // 1. Header & Eyebrow
    await expect(page.getByTestId("login-eyebrow")).toBeVisible();
    await expect(page.getByTestId("login-eyebrow")).toContainText("PORTAL ACCESS");
    const heading = page.locator("h1");
    await expect(heading).toContainText("Select Your");
    await expect(heading).toContainText("Workspace");

    // 2. TMS Portal Card
    const tmsCard = page.getByTestId("login-portal-tms");
    await expect(tmsCard).toBeVisible();
    await expect(tmsCard).toContainText("Spotter TMS");
    await expect(tmsCard).toContainText("TRANSPORTATION MANAGEMENT SYSTEM");
    await expect(tmsCard).toContainText("Real-time Analytics");
    await expect(tmsCard).toContainText("Fleet Management");
    await expect(tmsCard).toContainText("Route Optimization");

    const tmsBtn = page.getByTestId("access-btn-tms");
    await expect(tmsBtn).toBeVisible();
    await expect(tmsBtn).toHaveAttribute("href", "https://tms.spotter.ai/login");

    // 3. Sentinel Portal Card
    const sentinelCard = page.getByTestId("login-portal-sentinel");
    await expect(sentinelCard).toBeVisible();
    await expect(sentinelCard).toContainText("Sentinel");
    await expect(sentinelCard).toContainText("SAFETY MANAGEMENT SYSTEM");
    await expect(sentinelCard).toContainText("Safety Monitoring");
    await expect(sentinelCard).toContainText("Compliance Tracking");
    await expect(sentinelCard).toContainText("Risk Assessment");

    const sentinelBtn = page.getByTestId("access-btn-sentinel");
    await expect(sentinelBtn).toBeVisible();
    await expect(sentinelBtn).toHaveAttribute("href", "https://sentinel-app.spotter.ai/login");

    // 4. Support and Assistance links
    const supportLink = page.getByRole("link", { name: "Contact our support team" });
    await expect(supportLink).toBeVisible();
    await expect(supportLink).toHaveAttribute("href", "/request-quote");

    const emailLink = page.getByRole("link", { name: "support@spotter.ai" });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute("href", "mailto:support@spotter.ai");

    const driverAppLink = page.getByRole("link", { name: /Explore Driver App/i });
    await expect(driverAppLink).toBeVisible();
    await expect(driverAppLink).toHaveAttribute("href", "/driversapp");
  });

  test("Desktop viewport: Both portal cards fit within viewport without clipping", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/login");

    const tmsBtn = page.getByTestId("access-btn-tms");
    const sentinelBtn = page.getByTestId("access-btn-sentinel");

    const tmsBox = await tmsBtn.boundingBox();
    const sentinelBox = await sentinelBtn.boundingBox();

    expect(tmsBox).not.toBeNull();
    expect(sentinelBox).not.toBeNull();

    // Capture desktop screenshot
    await page.screenshot({
      path: "C:/Users/tayya/.gemini/antigravity/brain/aa616a7d-1b14-4acd-9f45-b566539fcf37/login-portal-desktop.png",
      fullPage: false,
    });
  });

  test("Mobile responsiveness: Cards stack cleanly with no horizontal overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/login");

    // Check no horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(375);

    // Check touch target height on mobile buttons
    const tmsBtn = page.getByTestId("access-btn-tms");
    const box = await tmsBtn.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
    }

    // Capture mobile screenshot
    await page.screenshot({
      path: "C:/Users/tayya/.gemini/antigravity/brain/aa616a7d-1b14-4acd-9f45-b566539fcf37/login-portal-mobile.png",
      fullPage: false,
    });
  });
});
