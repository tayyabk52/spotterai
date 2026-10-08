const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  for (const mode of ['clean', 'extension-attributes']) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', error => errors.push(error.message));
    if (mode !== 'clean') await page.route('http://127.0.0.1:3000/', async route => {
      const response = await route.fetch();
      let html = await response.text();
      html = html.replace(/<body([^>]*)>/, (_, attrs) => `<body${attrs} data-new-gr-c-s-check-loaded="14.1335.0" data-gr-ext-installed="" __processed_example__="true">`);
      if (mode === 'child-mismatch') html = html.replace('Skip to content', 'Extension changed this content');
      await route.fulfill({ response, body: html });
    });
    await page.goto('http://127.0.0.1:3000');
    await page.waitForTimeout(800);
    const hydrationErrors = errors.filter(error => /hydrat|match/i.test(error));
    assert.equal(hydrationErrors.length, 0);
    console.log(`PASS ${mode}: no hydration errors`);
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
