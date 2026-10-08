# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: story-film-readiness.spec.ts >> About films stay visible without loadeddata at 768px
- Location: tests\story-film-readiness.spec.ts:8:7

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 3.2365604
Received:   3.635129

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Spotter.ai home" [ref=e5]:
        - /url: /
        - img "Spotter.ai" [ref=e6]
      - button "Open navigation" [ref=e7] [cursor=pointer]
  - main [ref=e10]:
    - region [ref=e11]:
      - generic [ref=e12]:
        - generic [ref=e13]:
          - paragraph [ref=e14]: About Spotter
          - heading "Building the Freight Execution Infrastructure Layer for Trucking" [level=1] [ref=e15]
          - paragraph [ref=e16]: Most freight software makes recommendations. Spotter.ai executes the work. We provide the full-stack AI operating system that automates the complex, real-world workflows of modern fleets.
          - generic [ref=e17]:
            - link "Explore Our Platform" [ref=e18]:
              - /url: /
            - link "Talk to Sales" [ref=e23]:
              - /url: /request-quote
        - img "Matte teal rails and porcelain planes settling into a connected infrastructure" [ref=e31]
    - generic [ref=e33]:
      - generic [ref=e34]:
        - generic [ref=e35]:
          - term [ref=e36]: Global Operations Network
          - definition [ref=e37]: 500+
        - generic [ref=e38]:
          - term [ref=e39]: Live Dispatch & Support
          - definition [ref=e40]: 24/7
        - generic [ref=e41]:
          - term [ref=e42]: YoY Net Revenue Growth
          - definition [ref=e43]: 70%
        - generic [ref=e44]:
          - term [ref=e45]: Capital Raised Efficiently
          - definition [ref=e46]: $4.9MM
      - paragraph [ref=e47]:
        - 'link "Source: spotter.ai/about · October 8, 2026" [ref=e48]':
          - /url: https://spotter.ai/about
    - region [ref=e49]:
      - generic [ref=e50]:
        - generic [ref=e51]:
          - paragraph [ref=e52]:
            - generic [ref=e53]: "01"
            - text: THE EXECUTION PROBLEM
          - heading "Built for the Reality of Trucking" [level=2] [ref=e54]
        - generic [ref=e55]:
          - paragraph [ref=e56]: Trucking is not simply a load-matching problem. It is an execution problem. Every shipment depends on a fragile chain of dispatch, routing, safety, compliance, insurance, maintenance, billing, collections, and real-time exception handling. When any one of those functions breaks down, revenue, service quality, and asset utilization suffer.
          - paragraph [ref=e57]: Freight does not move in a clean software demo. Loads are delayed, trucks face unscheduled roadside repairs, drivers run out of legal hours, and weather patterns disrupt optimal routes. Spotter.ai was built from the inside out to handle these exact real-world operating exceptions automatically.
    - region [ref=e58]:
      - generic [ref=e59]:
        - generic [ref=e60]:
          - paragraph [ref=e61]:
            - generic [ref=e62]: "02"
            - text: WHAT SPOTTER.AI AUTOMATES
          - heading "A Single Unified Operating System" [level=2] [ref=e63]
        - list [ref=e65]:
          - listitem [ref=e66]:
            - generic [aria-hidden] [ref=e67]: "01"
            - generic [ref=e68]:
              - heading "AI Dispatch & Execution" [level=3] [ref=e69]
              - paragraph [ref=e70]: Automated load-booking and intelligent broker negotiations that route drivers to hot markets.
          - listitem [ref=e71]:
            - generic [aria-hidden] [ref=e72]: "02"
            - generic [ref=e73]:
              - heading "Dynamic Routing AI" [level=3] [ref=e74]
              - paragraph [ref=e75]: Real-time adjustments that instantly replan routes around traffic, weather, detention, and missed appointments.
          - listitem [ref=e76]:
            - generic [aria-hidden] [ref=e77]: "03"
            - generic [ref=e78]:
              - heading "Safety & Compliance Automation" [level=3] [ref=e79]
              - paragraph [ref=e80]: Hands-free management of permits, IFTA, Form 2290 filings, registrations, medical cards, and license monitoring.
          - listitem [ref=e81]:
            - generic [aria-hidden] [ref=e82]: "04"
            - generic [ref=e83]:
              - heading "Driver Recruiting & Screening" [level=3] [ref=e84]
              - paragraph [ref=e85]: End-to-end automation of driver pipeline follow-ups, consent forms, MVR/PSP reviews, and background checks.
          - listitem [ref=e86]:
            - generic [aria-hidden] [ref=e87]: "05"
            - generic [ref=e88]:
              - heading "Maintenance Intelligence" [level=3] [ref=e89]
              - paragraph [ref=e90]: Predictive insights, rapid vendor selection, repair location decisioning, and automated breakdown handling.
          - listitem [ref=e91]:
            - generic [aria-hidden] [ref=e92]: "06"
            - generic [ref=e93]:
              - heading "FuelSeek Optimization" [level=3] [ref=e94]
              - paragraph [ref=e95]: Real-time purchasing optimization driven by live diesel prices, current tank levels, and exact route needs.
          - listitem [ref=e96]:
            - generic [aria-hidden] [ref=e97]: "07"
            - generic [ref=e98]:
              - heading "Insurance & Claims Infrastructure" [level=3] [ref=e99]
              - paragraph [ref=e100]: Lower premiums and reduced claims leakage achieved through proprietary loss data and integrated accident video analysis.
          - listitem [ref=e101]:
            - generic [aria-hidden] [ref=e102]: "08"
            - generic [ref=e103]:
              - heading "Billing & Collections AI" [level=3] [ref=e104]
              - paragraph [ref=e105]: Instant matching of rate confirmations to bills of lading alongside automated collections back-office workflows.
          - listitem [ref=e106]:
            - generic [aria-hidden] [ref=e107]: "09"
            - generic [ref=e108]:
              - heading "Workforce & Asset Automation" [level=3] [ref=e109]
              - paragraph [ref=e110]: Custom, deeply integrated TMS, CRM, payroll, and 24/7 truck/driver utilization monitoring.
    - region [ref=e111]:
      - generic [ref=e112]:
        - generic [ref=e113]:
          - generic [ref=e114]:
            - paragraph [ref=e115]:
              - generic [ref=e116]: "03"
              - text: WHY SPOTTER.AI IS DIFFERENT
            - heading "Built by Operators. Powered by AI." [level=2] [ref=e117]
          - generic [ref=e118]: Many technology companies try to automate trucking from the outside. Spotter.ai was built directly inside the live operating environment.
        - generic [ref=e120]:
          - paragraph [ref=e121]: THE SPOTTER ADVANTAGE
          - paragraph [ref=e122]: "Our founders combine quantitative finance, enterprise logistics software, and direct trucking operating experience. This unique DNA gives Spotter.ai a practical advantage: we are not just building tools that suggest what should happen; we are building systems that help operators make it happen."
        - paragraph [ref=e124]: We have proven our technology stack by running it inside live operations under the harshest market conditions, expanding our ecosystem around the actual, margin-critical problems carriers face every day.
    - region [ref=e125]:
      - generic [ref=e127]:
        - generic [ref=e128]:
          - generic [ref=e129]:
            - paragraph [ref=e130]:
              - generic [ref=e131]: "04"
              - text: OUR OPERATING PHILOSOPHY
            - heading "The Future of Freight Execution" [level=2] [ref=e132]
          - generic [ref=e133]:
            - paragraph [ref=e134]: The future of logistics will be automated, verified, and data-driven. As trucking rapidly transitions away from manual workflows and relationship-based capacity, carriers need robust systems that control the entire workflow, aggregate data, enforce compliance, and automate margin-critical decisions.
            - paragraph [ref=e135]: Spotter.ai is building that essential infrastructure layer. Our mission is to help trucking companies operate with the exact same intelligence, discipline, and automation that define the most advanced financial markets in the world.
        - img "Layered porcelain planes and teal paths aligning toward a softly lit horizon" [ref=e139]
    - region [ref=e141]:
      - generic [ref=e142]:
        - generic [ref=e143]:
          - paragraph [ref=e144]:
            - generic [ref=e145]: "05"
            - text: OUR STORY
          - heading "The Spotter Journey" [level=2] [ref=e146]
        - list [ref=e147]:
          - listitem [ref=e148]:
            - generic [ref=e149]: "2011"
            - generic [ref=e150]:
              - heading "Quant Foundations" [level=3] [ref=e151]
              - paragraph [ref=e152]: Gabe & Peidi build deep quant finance and high-frequency trading expertise, establishing the mathematical foundations for advanced workflow optimization models.
          - listitem [ref=e153]:
            - generic [ref=e154]: "2017"
            - generic [ref=e155]:
              - heading "Practical Exposure" [level=3] [ref=e156]
              - paragraph [ref=e157]: First-hand entry into the logistics space reveals massive, real-world coordination inefficiencies across traditional motor carrier operations.
          - listitem [ref=e158]:
            - generic [ref=e159]: 2019–2020
            - generic [ref=e160]:
              - heading "The Vision Takes Shape" [level=3] [ref=e161]
              - paragraph [ref=e162]: "The core idea for Spotter.ai solidifies: applying advanced quantitative models to the fragmented freight execution layer."
          - listitem [ref=e163]:
            - generic [ref=e164]: "2020"
            - generic [ref=e165]:
              - heading "Dispatch Software Launch" [level=3] [ref=e166]
              - paragraph [ref=e167]: Spotter.ai launches its initial AI dispatch software, onboarding its first cohort of external carrier customers.
          - listitem [ref=e168]:
            - generic [ref=e169]: 2020–2021
            - generic [ref=e170]:
              - heading "The Shift to Execution" [level=3] [ref=e171]
              - paragraph [ref=e172]: Real-world deployment reveals that carriers face highly fragmented data challenges. Standalone software recommendations are insufficient; operators require automated execution.
          - listitem [ref=e173]:
            - generic [ref=e174]: 2021–2022
            - generic [ref=e175]:
              - heading "Full-Stack Integration" [level=3] [ref=e176]
              - paragraph [ref=e177]: Spotter pivots to a deeply integrated operating model, stress-testing its proprietary AI infrastructure directly within live, complex freight-hauling workflows.
          - listitem [ref=e178]:
            - generic [ref=e179]: 2022–2024
            - generic [ref=e180]:
              - heading "Ecosystem Expansion" [level=3] [ref=e181]
              - paragraph [ref=e182]: The platform expands from standalone dispatch into an all-in-one corporate operating stack, adding custom TMS, compliance automation, insurance infrastructure, and finance workflows.
          - listitem [ref=e183]:
            - generic [ref=e184]: Today
            - generic [ref=e185]:
              - heading "AI Execution at Scale" [level=3] [ref=e186]
              - paragraph [ref=e187]: Spotter.ai serves as a hard-to-replace operational infrastructure partner for fleets across North America, driving industry-leading truck utilization and massive cost reductions.
    - region [ref=e188]:
      - generic [ref=e189]:
        - generic [ref=e190]:
          - paragraph [ref=e191]:
            - generic [ref=e192]: "06"
            - text: AWARDS & RECOGNITION
          - heading "Recognized for Excellence" [level=2] [ref=e193]
        - list [ref=e194]:
          - listitem [ref=e195]:
            - img "Top Work Places 2025 - CareerBuilder + Monster" [ref=e197]
          - listitem [ref=e198]:
            - img "USA Today Top Work Places 2026" [ref=e200]
          - listitem [ref=e201]:
            - img "Professional Development - Top Work Places 2025" [ref=e203]
          - listitem [ref=e204]:
            - img "Employee Well-Being - Top Work Places 2025" [ref=e206]
          - listitem [ref=e207]:
            - img "Appreciation - Top Work Places 2025 by Nectar" [ref=e209]
    - region [ref=e210]:
      - generic [ref=e211]:
        - paragraph [ref=e212]: JOIN HUNDREDS OF FLEETS
        - heading "Ready to transform your fleet operations?" [level=2] [ref=e213]
        - paragraph [ref=e214]: Experience the power of an AI-driven freight execution stack built by operators, for operators.
        - generic [ref=e215]:
          - generic [ref=e216]:
            - link "Request a Demo" [ref=e217]:
              - /url: /request-quote
            - link "Contact Sales" [ref=e222]:
              - /url: mailto:sales@spotter.ai
          - paragraph [ref=e227]: Serving fleets across North America
    - navigation "About Spotter chapters" [ref=e228]:
      - list [ref=e229]:
        - listitem [ref=e230]:
          - link "00 About Spotter" [ref=e231]:
            - /url: "#about-opening"
            - text: "00"
        - listitem [ref=e232]:
          - link "01 THE EXECUTION PROBLEM" [ref=e233]:
            - /url: "#about-reality"
            - text: "01"
        - listitem [ref=e234]:
          - link "02 WHAT SPOTTER.AI AUTOMATES" [ref=e235]:
            - /url: "#about-automation"
            - text: "02"
        - listitem [ref=e236]:
          - link "03 WHY SPOTTER.AI IS DIFFERENT" [ref=e237]:
            - /url: "#about-operators"
            - text: "03"
        - listitem [ref=e238]:
          - link "04 OUR OPERATING PHILOSOPHY" [ref=e239]:
            - /url: "#about-philosophy"
            - text: "04"
        - listitem [ref=e240]:
          - link "05 OUR STORY" [ref=e241]:
            - /url: "#about-journey"
            - text: "05"
        - listitem [ref=e242]:
          - link "06 AWARDS & RECOGNITION" [ref=e243]:
            - /url: "#about-awards"
            - text: "06"
        - listitem [ref=e244]:
          - link "07 JOIN HUNDREDS OF FLEETS" [ref=e245]:
            - /url: "#about-contact"
            - text: "07"
      - button "Pause scroll animations" [ref=e246] [cursor=pointer]
  - contentinfo [ref=e249]:
    - generic [ref=e250]:
      - generic [ref=e251]:
        - generic [ref=e252]:
          - link "Spotter.ai home" [ref=e253]:
            - /url: /
            - img "Spotter.ai" [ref=e254]
          - paragraph [ref=e255]: "Tools for the people who move freight: brokers, carriers, and drivers."
          - generic [ref=e256]:
            - link "App Store" [ref=e257]:
              - /url: https://apps.apple.com/us/app/spotter-ai/id1670506993
              - text: App Store
              - generic [aria-hidden] [ref=e258]: ↗
            - link "Google Play" [ref=e259]:
              - /url: https://play.google.com/store/apps/details?id=com.spotter.ai&pcampaignid=web_share
              - text: Google Play
              - generic [aria-hidden] [ref=e260]: ↗
        - navigation "Products footer links" [ref=e261]:
          - heading "Products" [level=2] [ref=e262]
          - list [ref=e263]:
            - listitem [ref=e264]:
              - link "Spotter App" [ref=e265]:
                - /url: /driversapp
            - listitem [ref=e266]:
              - link "Extension" [ref=e267]:
                - /url: /extension
            - listitem [ref=e268]:
              - link "TMS" [ref=e269]:
                - /url: /tms
            - listitem [ref=e270]:
              - link "Lens" [ref=e271]:
                - /url: /lens
            - listitem [ref=e272]:
              - link "Sentinel" [ref=e273]:
                - /url: /sentinel
        - navigation "Company footer links" [ref=e274]:
          - heading "Company" [level=2] [ref=e275]
          - list [ref=e276]:
            - listitem [ref=e277]:
              - link "About" [ref=e278]:
                - /url: /about
            - listitem [ref=e279]:
              - link "Careers" [ref=e280]:
                - /url: /careers
            - listitem [ref=e281]:
              - link "Contact" [ref=e282]:
                - /url: /request-quote
            - listitem [ref=e283]:
              - link "Insights" [ref=e284]:
                - /url: /insights
        - navigation "Legal footer links" [ref=e285]:
          - heading "Legal" [level=2] [ref=e286]
          - list [ref=e287]:
            - listitem [ref=e288]:
              - link "Privacy Policy" [ref=e289]:
                - /url: /privacy-policy
            - listitem [ref=e290]:
              - link "Terms of Service" [ref=e291]:
                - /url: /terms-and-services
            - listitem [ref=e292]:
              - link "CCPA" [ref=e293]:
                - /url: /ccpa
      - generic [ref=e294]:
        - generic [ref=e295]:
          - paragraph [ref=e296]: © 2026 spotter.ai. All rights reserved.
          - paragraph [ref=e297]: 251 Little Falls Dr., Wilmington, DE 19808
        - generic [ref=e298]:
          - link "LinkedIn" [ref=e299]:
            - /url: https://www.linkedin.com/company/spotter-sentinel/about/?viewAsMember=true
          - link "Facebook" [ref=e300]:
            - /url: https://www.facebook.com/people/Spotter-Sentinel/61577984011373/
          - link "Instagram" [ref=e301]:
            - /url: https://www.instagram.com/sentinel.safety/
  - button "Open Next.js Dev Tools" [ref=e307] [cursor=pointer]
  - alert [ref=e311]
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | 
  3   | for (const viewport of [
  4   |   { width: 320, height: 668 },
  5   |   { width: 390, height: 844 },
  6   |   { width: 768, height: 900 },
  7   | ]) {
  8   |   test(`About films stay visible without loadeddata at ${viewport.width}px`, async ({
  9   |     page,
  10  |   }) => {
  11  |     await page.setViewportSize(viewport);
  12  |     await page.addInitScript(() => {
  13  |       // Mobile data-saving modes may suppress this event entirely.
  14  |       document.addEventListener(
  15  |         "loadeddata",
  16  |         (event) => {
  17  |           if (event.target instanceof HTMLVideoElement)
  18  |             event.stopImmediatePropagation();
  19  |         },
  20  |         true,
  21  |       );
  22  |     });
  23  |     await page.goto("/about");
  24  |     for (const id of ["about-opening", "about-philosophy"]) {
  25  |       await page.locator(`#${id} img`).scrollIntoViewIfNeeded();
  26  |       const video = page.locator(`#${id} video`);
  27  |       await expect(video).toHaveCount(1);
  28  |       await expect
  29  |         .poll(() => video.evaluate((v) => getComputedStyle(v).opacity))
  30  |         .toBe("1");
  31  |       const before = await video.evaluate(
  32  |         (v: HTMLVideoElement) => v.currentTime,
  33  |       );
  34  |       await page.mouse.wheel(0, 100);
  35  |       await expect
  36  |         .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
  37  |         .toBeGreaterThan(before + 0.1);
  38  |       await page.mouse.wheel(0, -100);
  39  |       await expect
  40  |         .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
> 41  |         .toBeLessThan(before + 0.1);
      |          ^ Error: expect(received).toBeLessThan(expected)
  42  |     }
  43  |   });
  44  | }
  45  | 
  46  | test("metadata-only loading can seek and reveal a decoded frame", async ({
  47  |   page,
  48  | }) => {
  49  |   await page.setViewportSize({ width: 390, height: 844 });
  50  |   await page.addInitScript(() => {
  51  |     const ready = Object.getOwnPropertyDescriptor(
  52  |       HTMLMediaElement.prototype,
  53  |       "readyState",
  54  |     )!;
  55  |     const time = Object.getOwnPropertyDescriptor(
  56  |       HTMLMediaElement.prototype,
  57  |       "currentTime",
  58  |     )!;
  59  |     const requested = new WeakSet<HTMLMediaElement>();
  60  |     Object.defineProperty(HTMLMediaElement.prototype, "readyState", {
  61  |       configurable: true,
  62  |       get() {
  63  |         const state = ready.get!.call(this);
  64  |         return this instanceof HTMLVideoElement &&
  65  |           !requested.has(this) &&
  66  |           state > 1
  67  |           ? 1
  68  |           : state;
  69  |       },
  70  |     });
  71  |     Object.defineProperty(HTMLMediaElement.prototype, "currentTime", {
  72  |       configurable: true,
  73  |       get: time.get,
  74  |       set(value) {
  75  |         requested.add(this);
  76  |         time.set!.call(this, value);
  77  |       },
  78  |     });
  79  |     document.addEventListener(
  80  |       "loadeddata",
  81  |       (event) => {
  82  |         if (event.target instanceof HTMLVideoElement)
  83  |           event.stopImmediatePropagation();
  84  |       },
  85  |       true,
  86  |     );
  87  |   });
  88  |   await page.goto("/about");
  89  |   for (const id of ["about-opening", "about-philosophy"]) {
  90  |     await page.locator(`#${id} img`).scrollIntoViewIfNeeded();
  91  |     const video = page.locator(`#${id} video`);
  92  |     await expect
  93  |       .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
  94  |       .toBeGreaterThan(0.1);
  95  |     await expect
  96  |       .poll(() => video.evaluate((v) => getComputedStyle(v).opacity))
  97  |       .toBe("1");
  98  |     expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  99  |   }
  100 | });
  101 | 
```