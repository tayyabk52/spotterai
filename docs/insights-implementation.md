# Insights implementation, October 8, 2026

## Source findings

Observed https://spotter.ai/insights with Playwright, including the featured story, search, categories, sorting, load-more control, Resources submenu, newsletter form and all 51 article routes. Evidence is archived under docs/source/insights-*.

The live website does **not** fetch articles from Django. `1776.0caeb1b0.chunk.js` exports 51 literal article records. `2201.58860730.chunk.js` imports them, maps article IDs to categories, sorts by publication date, features the newest story, excludes it from search results, and displays the remaining stories in batches of nine. Search covers title, excerpt, category and tags. Its Resources submenu has seven hardcoded promotions, with no article API request.

The observed newsletter service calls `POST /api/newsletter/subscribe`, with JSON fields: email, source, timestamp, userAgent, referrer, pageUrl, timezone, language, utmSource, utmMedium, utmCampaign, utmContent and utmTerm. Source is `insights`. The source bundle also defines status/unsubscribe methods, but the listing does not expose those actions. OPTIONS on the subscribe endpoint returned 204. This does not identify its server framework or prove successful subscription delivery. No real address was submitted.

Continuation validation: an empty JSON POST to the same live endpoint returned HTTP 400 with `{"success":false,"message":"Email and source are required"}`. Its public response headers identify Google Frontend and Express at the serving edge; this is not proof of an underlying Django integration. No address or subscription record was submitted. Evidence: docs/source/insights-newsletter-validation-probe.json. The live page still references the same main.1a258e76.js bundle.

The source main bundle identifies https://api.truckbase.ai/graphql/ as the application's backend. A read-only query-type introspection returned 200 but exposed no article/blog/Insights query field. No business/customer data was requested. Result: docs/source/insights-backend-schema-check.json. This further supports requesting the actual content endpoint instead of guessing a Django route.

## Implemented behavior

- `/insights`: original opening copy, original featured story, nine-item batches, source categories, title/excerpt/category/tag search, latest/oldest order and source newsletter wording. Filters and pagination have real URLs. Search, category selection, ordering fallback, pagination and article reading remain usable without JavaScript.
- `/insights/[slug]`: all 51 original titles, dates, reading times, tags, article bodies, closing invitations and CTA labels/destinations. Original per-article SEO titles/descriptions were captured from the rendered pages. Related stories come from the same repository.
- Article HTML is sanitized with sanitize-html. Source styling, scripts and event handlers are removed; original words, lists, tables and links remain. Local Insights links and image paths are normalized. Source headings are normalized below the single page h1, including h3 callouts preceding h2 sections, without flattening FAQ nesting. No generated article copy, photography, customer claims or statistics.
- 76 original thumbnail/inline assets are stored in public/images/insights, about 13.6 MB total. Each article records source URL, dimensions, alt text and reuse context. Images are original source assets authorized by the owner; no separate stock license was supplied. Listing/cover images use next/image with reserved dimensions. Inline article images retain source HTML with verified dimensions and lazy loading.
- `/api/insights`: shared summaries for the desktop/mobile menu, and the same query/pagination semantics as the listing. Full article bodies never enter the menu response or browser bundle. Opening Resources fetches seven current stories. The former paraphrased, static menu promotions and invented content-type badges were removed.
- Resource and footer Insights links, the Resources promotional action, and article links point locally. Other menu groups, page content and destinations were not changed. Insights menu rows received a 44px minimum height.
- SEO: server-rendered bodies, one h1, canonical URLs, source descriptions, article/collection Open Graph and Twitter metadata, CollectionPage/ItemList, BlogPosting and BreadcrumbList data, crawlable article URLs and sitemap entries. Search/category/sort/pagination variants use noindex/follow with the collection canonical. Missing article URLs return 404. Source article authorship is Spotter.ai; no personal author was invented.
- No streamed loading boundary is used on Insights: it prevented no-JavaScript rendering and sent 200 before missing-article detection. Error recovery is scoped to Insights.

## Deployment and API configuration

Default article storage is the imported source snapshot in content/insights/source-articles.json. This matches the source's bundled-content model and remains available after replacing the source site. It does **not** claim a live Django article connection.

Set server-only `INSIGHTS_API_URL` to the owner's real, published-articles endpoint to enable Django reads. The adapter accepts a JSON array, `{articles: [...]}`, or DRF `{results: [...], next: "..."}` pagination. It follows same-origin next links, rejects cycles, duplicate slugs and invalid records, and uses a five-minute Next data cache. An explicitly configured failing endpoint produces an honest unavailable state rather than silently publishing old snapshot content.

The normalized article contract is `id`, `slug`, `title`, `excerpt`, `publishDate`, `readTime`, `category`, `tags`, `image`, `content`, optional `seo` and optional `cta`. Accepted aliases: description for excerpt; publish_date/published_at for publishDate; read_time for readTime; body/content_html for content; thumbnail for image. An image can be a URL or `{src/url, width, height, alt}`. Source snapshot metadata is the complete example. Endpoint authentication and any different serializer require the actual backend contract; none was found on the live listing. The configured endpoint must expose only public articles.

Newsletter uses the source path `/api/newsletter/subscribe`. Locally its Next handler forwards to `https://spotter.ai/api/newsletter/subscribe`. At deployment, retain the existing reverse-proxy route from that path to the backend, or set server-only `NEWSLETTER_API_URL` to the direct backend subscribe URL. Pointing the handler at its own deployed domain is rejected to prevent recursion. The proxy forwards only source fields, enforces basic email validation, preserves rate-limit failures, and reports success only for an HTTP success with `success: true`. It does not forward browser cookies or invent authentication. Without JavaScript, inactive controls cannot leak an email into a GET URL; a factual interface instruction explains the signup requirement. The former Lens fallback was removed because the replacement Lens route has no newsletter form.

No guessed Django route or API credential is committed. A direct production newsletter destination or the existing reverse-proxy configuration remains necessary to verify delivery after replacing spotter.ai. Requested through the thread's clarification panel. An article endpoint is optional for matching the current bundled-content source model; if the owner has a separate Django feed, its actual contract must be supplied before claiming that connection.

## Validation

- Production lint/build pass.
- All 15 dedicated Insights tests pass against the final production snapshot: 12 page/navigation/content tests and three mocked adapter/handler tests. Mobile listing Lighthouse: 95 Performance / 100 Accessibility / 100 Best Practices / 100 SEO. Desktop listing: 100 in every category. The corrected mobile article audit scores 92 / 100 / 100 / 100; reports/insights-article-lighthouse-verified.json. An earlier run concurrent with browser tests scored 84 for performance; the final audit ran separately. Raw listing reports are under reports/insights-lighthouse-*.json.
- Insights Playwright coverage includes source content/HTML for all 51 articles, missing-article 404, source filtering/sorting/pagination, search empty state, metadata/sitemap, dynamic desktop/mobile menus, signup validation and confirmed/unconfirmed delivery, 360/768/1440px overflow/touch targets/WCAG AA, no-JavaScript reading, and HTML injection protection.
- Three adapter/handler tests use mocked transport: DRF pagination/aliases, invalid and cross-origin/cyclic pagination, source field forwarding, validation, success confirmation and self-proxy rejection. These prove the local contract, not the owner's live backend.
- Automatic approval review rejected starting the separate mock production API preview with “blocked by policy.” No backend end-to-end result is claimed.
- Five pre-existing mobile-drawer tests expect the old absolute quote URL. The project already used `/request-quote` before this task. Those unrelated assertions fail; this pass does not change quote navigation or those tests. Existing focus containment and reduced-motion drawer checks pass.

## Current completion audit

| Requirement | Authoritative evidence | Result |
| --- | --- | --- |
| Original article content | reports/insights-content-fidelity.json compares 50 literal source bodies and the remaining interpolated body against its rendered source; all 51 metadata/copy records match | Verified, zero mismatches |
| Original route SEO and structure | reports/insights-route-completion-audit.json checks all 51 HTTP statuses, one matching h1, source SEO title/description, canonical, heading hierarchy and structured data | Verified, zero errors |
| Our design and responsive behavior | Production Playwright at 360/768/1440px, WCAG AA, controls and no-JavaScript reading; Lighthouse results above | Verified |
| Dynamic local Insights submenus | Production desktop/mobile fetch-and-navigation tests plus summary feed audit | Verified |
| Existing API path and source payload | Live HTTP 400 validation response; mocked exact-field proxy and confirmed/unconfirmed response tests | Reachability and local contract verified; real subscription delivery unverified |
| API survives source-domain replacement | Default target would point at the replacement frontend; self-proxy test correctly rejects it | Incomplete until owner supplies backend destination or confirms existing proxy routing |
| Lint/build | Final npm run lint and npm run build succeeded | Verified |

The goal is blocked on the owner's production backend destination or existing reverse-proxy configuration. The same missing deployment information persisted across three consecutive goal turns and was revalidated: no INSIGHTS_API_URL or NEWSLETTER_API_URL is configured, and no environment configuration file is present. The page, all source articles and dynamic navigation are delivered; production backend integration cannot be marked complete from the available public source alone. Resume integration when that configuration is supplied.

## Files

New routes: app/insights/page.tsx, app/insights/[slug]/page.tsx, app/insights/error.tsx, app/api/insights/route.ts and app/api/newsletter/subscribe/route.ts.

New content/data: content/insights.ts, content/insights/source-articles.json, lib/insights/query.ts, lib/insights/repository.ts, lib/insights/django-client.ts and lib/insights/article-html.ts.

New UI: components/insights/InsightsHero.tsx, InsightsListing.tsx, InsightsFilters.tsx, InsightsNewsletter.tsx, InsightArticle.tsx, InsightTeaser.tsx, InsightImage.tsx, InsightMeta.tsx, useInsightsMenu.ts and Insights.module.css.

Shared changes: components/layout/Navbar.tsx, Navbar.module.css, MobileDrawer.tsx, content/home.ts and app/sitemap.ts, limited to Insights data/actions. Package files add sanitize-html and its TypeScript definitions. The only new runtime dependency sanitizes externally supplied article HTML.

Source importer: scripts/import-insights-source.cjs. Content provenance/CTA metadata and raw source files are archived in docs/source. Tests: tests/insights.spec.ts and tests/insights-api.spec.ts. Product/design/content-audit documents acknowledge this page.
