import fs from "node:fs/promises";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { chromium } from "playwright";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import path from "node:path";

const profile = path.resolve(
  "reports",
  `extension-audit-profile-${process.pid}`,
);
await fs.mkdir(profile, { recursive: true });
const chrome = await chromeLauncher.launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless", "--no-sandbox"],
  userDataDir: profile,
});
try {
  for (const form of ["mobile", "desktop"]) {
    const result = await lighthouse(
      "http://127.0.0.1:3001/extension",
      {
        port: chrome.port,
        output: "json",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      },
      form === "desktop" ? desktopConfig : undefined,
    );
    await fs.writeFile(
      `reports/extension-lighthouse-${form}.json`,
      result.report,
    );
    console.log(
      form,
      Object.fromEntries(
        Object.entries(result.lhr.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      ),
    );
  }
} finally {
  await chrome.kill();
}
