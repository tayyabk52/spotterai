# Lens source inventory and implementation audit

Source: https://spotter.ai/lens, observed October 8, 2026 in rendered Chromium at 1440 × 1000. Raw visible text, asset references, DOM and capture metadata are under docs/source/lens-*. The source is one interactive market application between shared navigation and footer, not a marketing landing page. Its rendered content is authoritative; the generic crawler fallback discusses other products and was not used for Lens claims.

| Source order              | Visible content                                                                                                                       | Treatment                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Shared navigation         | Products, Solutions, Resources, Company; newsletter sign-up                                                                           | Existing local Navbar retained, no newsletter form invented                                                           |
| Market ranking list       | rank, market, SI, 1d change; all markets and individual city/state rows with hourly index values and one-day changes                  | Functional labels reused; historical values appear only inside actual captured screenshots, not recreated live tables |
| Equipment / profitability | VAN selector; options VAN, RFER, FLAT; profitability; tooltip “Spotter Index measures profitability per hour”                         | Functional names reused; concise descriptions rewritten from observed controls and tooltip                            |
| US profitability map      | Colored market regions, cold/hot legend and per-region location/rank tooltips                                                         | Real screenshot; explanatory copy rewritten, no invented map                                                          |
| Location / history        | all markets; city, state or zip code; 1D, 7D, 1M, MAX, CUSTOM; historical candlestick chart with dates and open/high/low/close fields | Range labels reused; location and historical-chart explanations rewritten                                             |
| Shared footer             | Products, company and legal destinations; original contact URL /request-quote                                                         | Existing local Footer retained. Contact action uses source destination with existing project product=lens convention  |

The source has no promotional hero heading, feature paragraphs, product video or standalone product photograph. Added marketing headings are rewrites grounded in the app's observed capabilities. Each group has a copy-status entry in content/lens.ts. No source prose is reused verbatim apart from functional labels and names.

## Rewritten / editorial items

- Hero: “See the market. Choose your next move.” and its introduction.
- Map: section heading and equipment/map explanation.
- Rankings: heading, introduction and Compare markets / Profitability per hour / Follow daily movement descriptions.
- History: heading, introduction and location-search explanation.
- Closing: invitation heading and paragraph.
- Interface/editorial: product/category label, chapter labels and numbers, Explore Lens, Request a demo or quote, Open live Lens, original-app context, screenshot attribution/disclaimer, alt text and metadata.

## Real assets

| Local image                       | Source / alt                                                                                  | Status                                                                        |
| --------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| /lens-assets/market-map.webp      | https://spotter.ai/lens; US market profitability map with VAN selector and cold-to-hot legend | Actual product screenshot, captured October 8, 2026; 1180 × 896; 75,982 bytes |
| /lens-assets/market-rankings.webp | Same source; ranked markets with hourly SI values and one-day changes                         | Actual product screenshot; 900 × 1120; 65,286 bytes                           |
| /lens-assets/market-history.webp  | Same source; all-markets chart, location search and time ranges                               | Actual product screenshot; 1200 × 850; 29,028 bytes                           |
| /lens-assets/social.png           | Same source; full product-view crop padded for sharing                                        | Actual product screenshot derivative; 1200 × 630                              |

Captured for the owner's requested product-page build; no separate third-party license supplied. Images are unchanged product captures apart from cropping, sizing and encoding. Data shown is historical and explicitly labeled, not a live feed. No generated interface, video, people or customer assets. No assets needed for the implemented page.

## Local structure

Hero plus map → ranked markets → historical perspective → contact. This is an original presentation of the single source application, not additional product functionality. Reuses ActionLink, Reveal and ScrollComposition; shared Navbar/Footer components are unchanged. Four shared Lens destinations in content/home.ts now point to /lens. Source-app action keeps the original full URL and opens a new tab in the local preview. If this marketing route replaces the live application's production URL, deployment must retain a separate application destination and update that action.

Not found on source: attributed testimonials, FAQs, pricing, certifications, product videos, promotional performance statistics, guarantees or standalone product photographs. These are omitted. No pricing-insight claim beyond the observed profitability-per-hour measure; no AI forecasting or accuracy claim.

## Validation and changed files

- npm run lint and npm run build passed. The existing scripts/generate-posters.cjs used intentional CommonJS imports and triggered the TypeScript require restriction; eslint.config.mjs now permits require only for scripts/**/*.cjs. Script behavior is unchanged.
- Five Playwright checks passed: 360 / 768 / 1440 responsive layouts, loaded dimensioned images, one h1, canonical/Open Graph metadata, contact/live destinations, minimum 44px action bounds, anchor navigation, no overflow, zero WCAG A/AA axe findings, no browser exceptions, reduced motion and no-JavaScript content.
- Production Lighthouse: mobile Performance 92 / Accessibility 100 / Best Practices 100 / SEO 100; desktop 100 / 100 / 100 / 100. Reports are in reports/lens-lighthouse-*.json. Scores are local audit results, not a guarantee for a deployed environment.
- New: app/lens/page.tsx, content/lens.ts, components/sections/lens/{LensHero,LensRankings,LensHistory,LensContact,LensScreenshot}.tsx, Lens.module.css, public/lens-assets/_, this inventory, docs/source/lens-_ and tests/lens.spec.ts.
- Updated: content/home.ts (four Lens destinations), app/sitemap.ts, PRODUCT.md, DESIGN.md, docs/content-audit.md and the scoped CommonJS lint configuration. Shared Navbar/Footer/UI/motion implementation, root palette and other product routes are unchanged.
- Shared regression checks exposed an existing homepage closing-label contrast issue: the global eyebrow rule overrode its intended body-colored text. ClosingCTA.module.css now scopes that existing color to .panel .eyebrow. No layout or palette change.
- Final combined Lens, homepage and mobile-drawer run: 22 tests passed after that correction. Final lint and production build also passed.
