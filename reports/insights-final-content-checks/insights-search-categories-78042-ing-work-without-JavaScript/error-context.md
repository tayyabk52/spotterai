# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: insights.spec.ts >> search, categories, pagination and article reading work without JavaScript
- Location: tests\insights.spec.ts:232:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Enable JavaScript to subscribe to the newsletter.')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Enable JavaScript to subscribe to the newsletter.') with timeout 5000ms
  - waiting for getByText('Enable JavaScript to subscribe to the newsletter.')

```

```yaml
- link "Skip to content":
  - /url: "#main-content"
- banner:
  - link "Spotter.ai home":
    - /url: /
    - img "Spotter.ai"
- main:
  - region "Real insights for a stronger trucking industry":
    - paragraph: Insights
    - heading "Real insights for a stronger trucking industry" [level=1]
    - paragraph: Guides, trends, and news for carriers and fleets.
    - article:
      - paragraph: Featured
      - text: Company News
      - time: October 7, 2026
      - text: 2 min read
      - heading "Spotter AI Launches Freight Forecast Newsletter for Weekly Market Intelligence" [level=2]:
        - link "Spotter AI Launches Freight Forecast Newsletter for Weekly Market Intelligence":
          - /url: /insights/spotter-ai-launches-freight-forecast-newsletter-weekly-market-intelligence
      - paragraph: A weekly newsletter for fleet owners, dispatchers and trucking operators covering rate trends, demand signals and lane activity.
      - link "Read article":
        - /url: /insights/spotter-ai-launches-freight-forecast-newsletter-weekly-market-intelligence
  - region "Latest articles":
    - heading "Latest articles" [level=2]
    - text: Search articles
    - searchbox "Search articles"
    - button "Search"
    - text: Sort by
    - combobox "Sort by":
      - option "Latest" [selected]
      - option "Oldest"
    - navigation "Article categories":
      - link "All Articles":
        - /url: /insights#latest-articles
      - link "Compliance":
        - /url: /insights?category=Compliance#latest-articles
      - link "Driver Management":
        - /url: /insights?category=Driver+Management#latest-articles
      - link "Fleet Operations":
        - /url: /insights?category=Fleet+Operations#latest-articles
      - link "Technology":
        - /url: /insights?category=Technology#latest-articles
      - link "Industry Trends":
        - /url: /insights?category=Industry+Trends#latest-articles
      - link "Safety":
        - /url: /insights?category=Safety#latest-articles
      - link "Company News":
        - /url: /insights?category=Company+News#latest-articles
    - article:
      - link "Spotter AI Adds MVR Monitoring to Sentinel to Help Motor Carriers Track Driver Record Changes Company News September 30, 2026 3 min read Spotter AI Adds MVR Monitoring to Sentinel to Help Motor Carriers Track Driver Record Changes New Sentinel feature alerts fleets to driver record changes and centralizes MVR monitoring, notifications and follow-up.":
        - /url: /insights/spotter-ai-adds-mvr-monitoring-to-sentinel-driver-record-changes
        - img "Spotter AI Adds MVR Monitoring to Sentinel to Help Motor Carriers Track Driver Record Changes"
        - text: Company News
        - time: September 30, 2026
        - text: 3 min read
        - heading "Spotter AI Adds MVR Monitoring to Sentinel to Help Motor Carriers Track Driver Record Changes" [level=3]
        - paragraph: New Sentinel feature alerts fleets to driver record changes and centralizes MVR monitoring, notifications and follow-up.
    - article:
      - link "Why Driver and Carrier Verification Is Becoming a Bigger Business Priority in 2026 Compliance September 12, 2026 4 min read Why Driver and Carrier Verification Is Becoming a Bigger Business Priority in 2026 Verification is no longer an administrative step buried in onboarding. See why fleets are moving from manual, scattered checks to structured verification systems in 2026.":
        - /url: /insights/driver-carrier-verification-2026-business-priority
        - img "Why Driver and Carrier Verification Is Becoming a Bigger Business Priority in 2026"
        - text: Compliance
        - time: September 12, 2026
        - text: 4 min read
        - heading "Why Driver and Carrier Verification Is Becoming a Bigger Business Priority in 2026" [level=3]
        - paragraph: Verification is no longer an administrative step buried in onboarding. See why fleets are moving from manual, scattered checks to structured verification systems in 2026.
    - article:
      - link "How to Read a CDL MVR Report Compliance August 31, 2026 6 min read How to Read a CDL MVR Report License status, endorsements, violations, crashes and suspensions - how to read a commercial driver motor vehicle record line by line.":
        - /url: /insights/how-to-read-cdl-mvr-report
        - img "How to Read a CDL MVR Report"
        - text: Compliance
        - time: August 31, 2026
        - text: 6 min read
        - heading "How to Read a CDL MVR Report" [level=3]
        - paragraph: License status, endorsements, violations, crashes and suspensions - how to read a commercial driver motor vehicle record line by line.
    - article:
      - link "What Is FMCSA Driver Safety Compliance Compliance August 30, 2026 6 min read What Is FMCSA Driver Safety Compliance DQ files, MVR reviews, PSP reports, Clearinghouse queries and medical certification - what FMCSA driver safety compliance actually requires.":
        - /url: /insights/fmcsa-driver-safety-compliance
        - img "What Is FMCSA Driver Safety Compliance"
        - text: Compliance
        - time: August 30, 2026
        - text: 6 min read
        - heading "What Is FMCSA Driver Safety Compliance" [level=3]
        - paragraph: DQ files, MVR reviews, PSP reports, Clearinghouse queries and medical certification - what FMCSA driver safety compliance actually requires.
    - article:
      - link "CDL Driver Red Flags to Watch For Safety August 29, 2026 5 min read CDL Driver Red Flags to Watch For Suspended licenses, repeat serious violations, out-of-service orders and employment gaps - the driver red flags to catch before you hire.":
        - /url: /insights/cdl-driver-red-flags
        - img "CDL Driver Red Flags to Watch For"
        - text: Safety
        - time: August 29, 2026
        - text: 5 min read
        - heading "CDL Driver Red Flags to Watch For" [level=3]
        - paragraph: Suspended licenses, repeat serious violations, out-of-service orders and employment gaps - the driver red flags to catch before you hire.
    - article:
      - link "Spotter AI Launches ClaimsOS to Centralize Insurance Claims Management for Freight Transportation Teams Company News August 29, 2026 3 min read Spotter AI Launches ClaimsOS to Centralize Insurance Claims Management for Freight Transportation Teams New platform helps logistics teams move claims faster with clearer ownership, financial tracking and Slack-linked collaboration.":
        - /url: /insights/spotter-ai-launches-claimsos-insurance-claims-management-freight-transportation-teams
        - img "Spotter AI Launches ClaimsOS to Centralize Insurance Claims Management for Freight Transportation Teams"
        - text: Company News
        - time: August 29, 2026
        - text: 3 min read
        - heading "Spotter AI Launches ClaimsOS to Centralize Insurance Claims Management for Freight Transportation Teams" [level=3]
        - paragraph: New platform helps logistics teams move claims faster with clearer ownership, financial tracking and Slack-linked collaboration.
    - article:
      - 'link "MVR Check Hiring Process Guide: How to Screen a CDL-A Driver Driver Management August 28, 2026 6 min read MVR Check Hiring Process Guide: How to Screen a CDL-A Driver Consent, CDLIS, MVR, PSP, Clearinghouse, background and medical - the eight steps of a complete CDL-A driver screen, in order."':
        - /url: /insights/how-to-screen-cdl-a-driver
        - 'img "MVR Check Hiring Process Guide: How to Screen a CDL-A Driver"'
        - text: Driver Management
        - time: August 28, 2026
        - text: 6 min read
        - 'heading "MVR Check Hiring Process Guide: How to Screen a CDL-A Driver" [level=3]'
        - paragraph: Consent, CDLIS, MVR, PSP, Clearinghouse, background and medical - the eight steps of a complete CDL-A driver screen, in order.
    - article:
      - link "How to Lower Your MVR and Driver Screening Costs Driver Management August 27, 2026 5 min read How to Lower Your MVR and Driver Screening Costs Subscriptions, vendor sprawl and over-monitoring are where screening budgets leak. Here is what you can actually control.":
        - /url: /insights/lower-mvr-screening-costs
        - img "How to Lower Your MVR and Driver Screening Costs"
        - text: Driver Management
        - time: August 27, 2026
        - text: 5 min read
        - heading "How to Lower Your MVR and Driver Screening Costs" [level=3]
        - paragraph: Subscriptions, vendor sprawl and over-monitoring are where screening budgets leak. Here is what you can actually control.
    - article:
      - link "Best MVR Screening Software for Fleets in 2026 Technology August 26, 2026 6 min read Best MVR Screening Software for Fleets in 2026 Sentinel, SambaSafety, HireRight, Tenstreet, DriverReach and Foley compared on consolidation, speed, pricing model and fleet fit.":
        - /url: /insights/best-mvr-screening-software
        - img "Best MVR Screening Software for Fleets in 2026"
        - text: Technology
        - time: August 26, 2026
        - text: 6 min read
        - heading "Best MVR Screening Software for Fleets in 2026" [level=3]
        - paragraph: Sentinel, SambaSafety, HireRight, Tenstreet, DriverReach and Foley compared on consolidation, speed, pricing model and fleet fit.
    - link "Load more articles":
      - /url: /insights?page=2#latest-articles
  - region "Get insights in your inbox":
    - heading "Get insights in your inbox" [level=2]
    - paragraph: One email a week. Unsubscribe anytime.
    - text: Email address
    - textbox "Email address" [disabled]:
      - /placeholder: you@company.com
    - button "Subscribe" [disabled]
    - status
- contentinfo:
  - link "Spotter.ai home":
    - /url: /
    - img "Spotter.ai"
  - paragraph: "Tools for the people who move freight: brokers, carriers, and drivers."
  - link "App Store":
    - /url: https://apps.apple.com/us/app/spotter-ai/id1670506993
  - link "Google Play":
    - /url: https://play.google.com/store/apps/details?id=com.spotter.ai&pcampaignid=web_share
  - navigation "Products footer links":
    - heading "Products" [level=2]
    - list:
      - listitem:
        - link "Spotter App":
          - /url: /driversapp
      - listitem:
        - link "Extension":
          - /url: /extension
      - listitem:
        - link "TMS":
          - /url: /tms
      - listitem:
        - link "Lens":
          - /url: /lens
      - listitem:
        - link "Sentinel":
          - /url: /sentinel
  - navigation "Company footer links":
    - heading "Company" [level=2]
    - list:
      - listitem:
        - link "About":
          - /url: /about
      - listitem:
        - link "Careers":
          - /url: /careers
      - listitem:
        - link "Contact":
          - /url: /request-quote
      - listitem:
        - link "Insights":
          - /url: /insights
  - navigation "Legal footer links":
    - heading "Legal" [level=2]
    - list:
      - listitem:
        - link "Privacy Policy":
          - /url: /privacy-policy
      - listitem:
        - link "Terms of Service":
          - /url: /terms-and-services
      - listitem:
        - link "CCPA":
          - /url: /ccpa
  - paragraph: © 2026 spotter.ai. All rights reserved.
  - paragraph: 251 Little Falls Dr., Wilmington, DE 19808
  - link "LinkedIn":
    - /url: https://www.linkedin.com/company/spotter-sentinel/about/?viewAsMember=true
  - link "Facebook":
    - /url: https://www.facebook.com/people/Spotter-Sentinel/61577984011373/
  - link "Instagram":
    - /url: https://www.instagram.com/sentinel.safety/
```

# Test source

```ts
  140 | 
  141 | test("newsletter mirrors the source payload and never reports unconfirmed success", async ({
  142 |   page,
  143 | }) => {
  144 |   await page.goto("/insights?utm_source=verification");
  145 |   const payloads: Record<string, unknown>[] = [];
  146 |   let successful = false;
  147 |   await page.route("**/api/newsletter/subscribe", async (route) => {
  148 |     payloads.push(route.request().postDataJSON());
  149 |     await route.fulfill({
  150 |       status: 200,
  151 |       contentType: "application/json",
  152 |       body: JSON.stringify(successful ? { success: true } : {}),
  153 |     });
  154 |   });
  155 |   const email = page.getByLabel("Email address", { exact: true });
  156 |   await email.fill("not-an-email");
  157 |   await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  158 |   await expect(page.locator("#insights-subscription-status")).toHaveText(
  159 |     "Please enter a valid email address",
  160 |   );
  161 |   expect(payloads).toHaveLength(0);
  162 |   await email.fill("integration-test@example.com");
  163 |   await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  164 |   await expect(page.locator("#insights-subscription-status")).toHaveText(
  165 |     "Failed to subscribe. Please try again later.",
  166 |   );
  167 |   successful = true;
  168 |   await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  169 |   await expect(page.locator("#insights-subscription-status")).toHaveText(
  170 |     "Successfully subscribed! You'll receive our weekly newsletter.",
  171 |   );
  172 |   expect(payloads[1]).toMatchObject({
  173 |     email: "integration-test@example.com",
  174 |     source: "insights",
  175 |     utmSource: "verification",
  176 |   });
  177 |   for (const field of [
  178 |     "timestamp",
  179 |     "userAgent",
  180 |     "referrer",
  181 |     "pageUrl",
  182 |     "timezone",
  183 |     "language",
  184 |     "utmSource",
  185 |     "utmMedium",
  186 |     "utmCampaign",
  187 |     "utmContent",
  188 |     "utmTerm",
  189 |   ])
  190 |     expect(payloads[1]).toHaveProperty(field);
  191 | });
  192 | 
  193 | for (const width of [360, 768, 1440]) {
  194 |   test(`Insights listing and article fit ${width}px with accessible controls`, async ({
  195 |     page,
  196 |   }) => {
  197 |     await page.setViewportSize({ width, height: 900 });
  198 |     for (const path of ["/insights", "/insights/how-to-read-cdl-mvr-report"]) {
  199 |       await page.goto(path);
  200 |       await expect(page.locator("h1")).toHaveCount(1);
  201 |       expect(
  202 |         await page.evaluate(
  203 |           () => document.documentElement.scrollWidth <= innerWidth,
  204 |         ),
  205 |       ).toBe(true);
  206 |       const accessibility = await new AxeBuilder({ page })
  207 |         .include("#main-content")
  208 |         .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  209 |         .analyze();
  210 |       expect(accessibility.violations).toEqual([]);
  211 |       const controls = await page
  212 |         .locator(
  213 |           "#main-content button, #main-content input:not([type=hidden]), #main-content select, #main-content nav a",
  214 |         )
  215 |         .evaluateAll((elements) =>
  216 |           elements
  217 |             .filter((element) => element.getClientRects().length)
  218 |             .map((element) => ({
  219 |               width: element.getBoundingClientRect().width,
  220 |               height: element.getBoundingClientRect().height,
  221 |             })),
  222 |         );
  223 |       expect(
  224 |         controls.every(
  225 |           (control) => control.width >= 44 && control.height >= 44,
  226 |         ),
  227 |       ).toBe(true);
  228 |     }
  229 |   });
  230 | }
  231 | 
  232 | test("search, categories, pagination and article reading work without JavaScript", async ({
  233 |   browser,
  234 | }) => {
  235 |   const context = await browser.newContext({ javaScriptEnabled: false });
  236 |   const page = await context.newPage();
  237 |   await page.goto(`${test.info().project.use.baseURL}/insights`);
  238 |   await expect(
  239 |     page.getByText("Enable JavaScript to subscribe to the newsletter."),
> 240 |   ).toBeVisible();
      |     ^ Error: expect(locator).toBeVisible() failed
  241 |   await expect(
  242 |     page.getByRole("button", { name: "Subscribe", exact: true }),
  243 |   ).toBeDisabled();
  244 |   await page.getByRole("searchbox").fill("CDL MVR");
  245 |   await page.getByRole("button", { name: "Search", exact: true }).click();
  246 |   await expect(page.locator("#latest-articles article")).toHaveCount(1);
  247 |   await page.locator("#latest-articles article a").click();
  248 |   await expect(
  249 |     page.getByRole("heading", {
  250 |       name: "How to Read a CDL MVR Report",
  251 |       exact: true,
  252 |     }),
  253 |   ).toBeVisible();
  254 |   await expect(page.getByText("Key takeaways", { exact: true })).toBeVisible();
  255 |   await context.close();
  256 | });
  257 | 
  258 | test("untrusted HTML cannot inject scripts, handlers or source CSS", () => {
  259 |   const article = {
  260 |     ...articles[0],
  261 |     content:
  262 |       '<script>alert(1)</script><img src="/images/x.png" onerror="alert(1)"><a href="&#106;avascript:alert(1)">Unsafe</a><p style="color:red" onclick="alert(1)">Content</p><iframe src="https://evil.example"></iframe>',
  263 |   } as InsightArticle;
  264 |   const html = insightArticleHtml(article);
  265 |   expect(html).not.toMatch(/script|onerror|onclick|javascript|style=|iframe/);
  266 |   expect(html).toContain("Content");
  267 | });
  268 | 
  269 | test("source callouts precede article sections with a valid heading hierarchy", () => {
  270 |   const article = {
  271 |     ...articles[0],
  272 |     content:
  273 |       "<h3>Key takeaways</h3><p>Original wording.</p><h2>Main section</h2><h3>Subsection</h3><h5>Nested detail</h5><h2>Next section</h2>",
  274 |   } as InsightArticle;
  275 |   expect(insightArticleHtml(article)).toBe(
  276 |     "<h2>Key takeaways</h2><p>Original wording.</p><h2>Main section</h2><h3>Subsection</h3><h4>Nested detail</h4><h2>Next section</h2>",
  277 |   );
  278 | });
  279 | 
```