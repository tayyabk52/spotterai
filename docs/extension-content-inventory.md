# Extension source inventory

Observed October 8, 2026 at https://spotter.ai/extension using rendered-browser scrolling through lazy-loaded sections. Raw copy: source/extension-rendered.txt. Asset references: source/extension-assets.json. Dimensions, durations and bytes: source/extension-media-metadata.json. The crawler returned generic site fallback content; the rendered page is authoritative.

| Order | Heading / content | CTA | Asset | Status |
| --- | --- | --- | --- | --- |
| Navigation | Products, Solutions, Resources, Company | Shared destinations | Spotter logo | Existing project navigation |
| Hero | load spotter; navigate the freight market like a Pro | add to chrome | extension-main.mp4 | Reuse; title case adjusted |
| Email automation | Click to Email; Email Templates; Gmail Integrated; all three source descriptions | None | extension-gif-email.mp4; three PNG icons | Reuse |
| Market data | Market Insights; Pricing Insights; Best Load; all three source descriptions | None | extension-gif-market.mp4 | Reuse |
| Search helpers | Comment Filtering; Advanced Filtering; Click to Gmaps; all three source descriptions | None | extension-gif-filters.mp4 | Reuse |
| Footer | Products, company, legal, address, social and status | Shared destinations | Shared logo/social | Existing project footer |

Every feature description is recorded verbatim in content/extension.ts and source/extension-rendered.txt. Original installation destination is preserved: https://chrome.google.com/webstore/detail/dat-companion/anjknaophdgkjljelgjgoieopobgoaci.

Not found: testimonials, pricing, certifications, outcome statistics, FAQs, installation steps or a supported-load-board list. Omitted rather than invented. Existing footage contains historical product UI values, not newly fabricated data. Source PNG icons are downloaded and archived; functional interface icons use the approved Phosphor family.

Editorial items: hero and closing summaries combine the original section names; closing headline repeats the original hero. Exploration CTA, media-control labels, failure text, source attribution and metadata are interface copy. All visible page copy and asset provenance are in content/extension.ts.

## Storyboard

| Chapter | Buyer question | Beat | Estimated scroll | Visual | Motion |
| --- | --- | --- | --- | --- | --- |
| Intro | What does it do? | Show the product, then its parts | 0–25% | Original main demo; optional focus film later | Reveal / parallax |
| 01 Email automation | How do I contact a load? | Inquiry, templates, Gmail | 25–48% | Original email demo | Sticky heading / reveal |
| 02 Market data | What context can I see? | Markets, pricing, best load | 48–70% | Original market demo; optional signal film later | Sticky heading / parallax |
| 03 Search helpers | How do I narrow the search? | Comments, filters, maps | 70–90% | Original filtering demo | Sticky heading / reveal |
| Install | Where do I get it? | Original Chrome destination | 90–100% | Pale brand panel | Reveal |

Ranges are estimates, not playback logic. No generated footage used now. Two future prompts: extension-video-briefs.md.

## Verification and media preparation

Original four videos are preserved under public/extension-assets. Muted H.264 web derivatives under web/ total 3,078,557 bytes, versus 27,572,743 bytes for originals. Native controls retain normal playback; the hero starts on explicit request to avoid fetching it during initial page rendering. Capability demos start in view and pause outside view. Reduced-motion users opt into playback. Posters use actual decoded frames at one second because the initial frames were blank. Social preview is derived from the actual main-demo poster.

Production lint and build passed. Six Extension Playwright checks passed: 360/768/1440px layouts, canonical/OG/schema/install links, all four demos, anchor navigation, accessibility, reduced-motion opt-in, no-JavaScript copy and posters, plus media-failure fallback. Thirteen existing TMS playback regressions also passed during integration. Additional 1024x600 and 1920x1080 layout inspections found no horizontal overflow. A visual critique corrected broken desktop heading wrapping and black initial posters. Final Lighthouse: desktop 100/100/100/100; mobile 89/100/100/100 for Performance/Accessibility/Best Practices/SEO. Mobile CLS is zero; Performance remains below the aspirational 90 target under the audit's simulated mobile throttle.

Evidence: reports/extension-360.png, extension-768.png, extension-1440.png; extension-lighthouse-mobile.json and extension-lighthouse-desktop.json. Optional films remain intentionally ungenerated, as requested; their later integration is a separate delivery step.

## Study

Read PRODUCT.md, DESIGN.md, content audit, TMS premium review and its prior reference-site evidence. Reviewed impeccable brand, motion, spatial, typography and responsive references, installed Next.js metadata/video guides, official Motion useScroll and MDN video documentation. Reuse large Quicksand typography, the approved teal palette, source footage, sticky chapter headings and modest transform-only parallax. Shared Reveal preserves text opacity; native scroll remains unaltered. Navbar/Footer behavior and TMS styling unchanged. Route-specific canonical, OG, Twitter and WebPage/SoftwareApplication schema contain no invented pricing or ratings.
