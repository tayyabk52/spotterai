import fs from "node:fs/promises";
import path from "node:path";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { chromium } from "playwright";

const profile = path.resolve("reports", `insights-audit-profile-${process.pid}`);
await fs.mkdir(profile, { recursive: true });
const chrome = await chromeLauncher.launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless", "--no-sandbox"],
  userDataDir: profile,
});
try {
  const result = await lighthouse(
    "http://127.0.0.1:3001/insights/how-to-read-cdl-mvr-report",
    {
      port: chrome.port,
      output: "json",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    },
  );
  await fs.writeFile("reports/insights-article-lighthouse-verified.json", result.report);
  console.log(Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])));
} finally {
  await chrome.kill();
}
