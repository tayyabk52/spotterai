import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto("https://spotter.ai/loan-calculators", { waitUntil: "networkidle" });

console.log("=== MAIN CONTENT ===");
const mainText = await page.evaluate(() => document.querySelector("main")?.innerText || document.body.innerText);
console.log(mainText);

const tabNames = ["Amortization Calculator", "Affordability Calculator", "Interest Rate Calculator"];

for (const tab of tabNames) {
  console.log("\n==================================================");
  console.log("TAB:", tab);
  await page.getByRole("button", { name: new RegExp(tab, "i") }).click();
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll("input, select")).map(el => {
      let label = el.closest("label")?.innerText || "";
      if (!label && el.id) {
        label = document.querySelector(`label[for="${el.id}"]`)?.innerText || "";
      }
      if (!label) {
        label = el.parentElement?.innerText || "";
      }
      return {
        tag: el.tagName,
        type: el.type,
        id: el.id,
        name: el.name,
        value: el.value,
        placeholder: el.placeholder,
        label: label.trim().replace(/\s+/g, " "),
      };
    });

    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5")).map(h => ({
      tag: h.tagName,
      text: h.innerText.trim(),
    }));

    const text = document.querySelector("main")?.innerText || document.body.innerText;

    return { headings, inputs, text };
  });

  console.log("Headings:", JSON.stringify(data.headings, null, 2));
  console.log("Inputs:", JSON.stringify(data.inputs, null, 2));
  console.log("Text snippet:\n", data.text.slice(0, 1500));
}

await browser.close();
