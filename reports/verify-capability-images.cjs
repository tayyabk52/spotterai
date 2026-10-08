const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  for (const [width, height, mode] of [[320, 800, 'normal'], [768, 900, 'normal'], [1440, 900, 'normal'], [1366, 768, 'reduced'], [1024, 600, 'nojs']]) {
    const context = await browser.newContext({ viewport: { width, height }, javaScriptEnabled: mode !== 'nojs', reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });
    const page = await context.newPage();
    await page.goto('http://localhost:3000');
    for (const id of ['lens', 'crm', 'driver-app', 'tms', 'sentinel', 'extension']) {
      const card = page.locator(`#${id} figure`);
      await card.scrollIntoViewIfNeeded();
      await page.waitForFunction(id => document.querySelector(`#${id} figure img`)?.naturalWidth > 0, id);
      assert.equal(await card.locator('ol li').count(), 3);
      const geometry = await card.evaluate(e => { const a = e.querySelector('img').getBoundingClientRect(); const b = e.getBoundingClientRect(); return { fits: a.left >= b.left && a.right <= b.right && a.bottom <= b.bottom, cardHeight: b.height }; });
      assert(geometry.fits, `${id} image exceeds card at ${width}`);
      if (width >= 1024) assert(geometry.cardHeight <= height - 112, `${id} exceeds desktop viewport`);
      if (width === 1440) { await page.waitForTimeout(400); await card.screenshot({ path: `reports/capability-${id}-final.png` }); }
    }
    console.log(`PASS ${width}x${height} ${mode}: six images loaded, labels retained, artwork contained`);
    await context.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
