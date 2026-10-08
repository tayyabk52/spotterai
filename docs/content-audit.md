# Homepage content audit

## Legal and pricing pages, 2026-10-08

Owner requested the four selected source pages, read before redesign: https://spotter.ai/mvr-pricing, /privacy-policy, /terms-and-services and /ccpa. The rendered DOM, hidden Terms clauses, all CCPA field/request/state values, pricing rows and loaded source scripts were inspected. Source captures and structured inventories are in docs/source/legal-pricing; detailed scope and anomalies are in docs/legal-pricing-inventory.md.

All legal clause wording and the Privacy Policy's August 14, 2023 effective date are retained. The Terms page has seven complete sections, including nested subheadings and every arbitration/liability paragraph. Source spelling, case and questionable legacy references remain intact; this task does not rewrite the legal policy. Source list bullet glyphs become semantic list markers, line breaks are preserved, and original contact emails/phone numbers become functional links. Legal document navigation, section index labels, CCPA page heading, draft-control text, pricing directory labels and SEO/interface navigation are editorial, with no new legal guarantees.

MVR reproduces all 51 displayed state/DC prices and the four displayed nationwide fees exactly. It explicitly labels the October 8, 2026 capture date; these are source-published prices rather than invented or independently verified rates. Filtering/sorting, CSV and printing preserve all displayed monetary precision. Original Sentinel company/email/phone contact details are retained. The source API contains additional data and a different drug-test value; only the published page inventory is reproduced.

The source CCPA form posts to /api/ccpa-request, which returns 404 on a read-only endpoint inspection. No real or synthetic privacy requests were submitted. The local form preserves every field, request choice and original state list, but honestly prepares an email draft to the support address published in Privacy Policy. It neither sends automatically, logs personal data nor reports simulated receipt. Existing footer legal links and Sentinel pricing actions become local; all other page content and global styles remain unchanged.

## Insights, October 8, 2026

Owner explicitly requested original Insights content. Playwright inventoried the listing, Resources submenu, source bundle/newsletter contract and all 51 article routes before implementation. Original listing heading/introduction, category/filter/order labels, feature/read-more labels, newsletter heading/description/feedback, every article title/excerpt/body/date/reading time/tag and all 51 closing invitations/actions are preserved. Rendered source SEO titles/descriptions are reused. Original claims inside archived articles remain source claims, not independent verification or new endorsements.

Only recovery/accessibility/navigation labels are editorial: search-submit label, clear filters, unavailable/retry messages, menu loading/unavailable status, category navigation label and “Enable JavaScript to subscribe to the newsletter.” The latter replaces an ineffective Lens fallback, without adding a marketing claim. Per-article source URLs and copyStatus plus original image URLs/dimensions/license context are stored in content/insights/source-articles.json. No article prose is rewritten. Seventy-six genuine source assets are stored locally; source HTML styling/scripts are stripped, and relevant Insights URLs/media paths become local. Heading tags normalize the hierarchy while preserving every heading's words and FAQ nesting. Shared Footer copy is unchanged.

The source listing and submenu make no Django article request: the source uses bundled data and hardcoded submenu promotions. The local menu fetches current summaries from the shared repository. A real Django endpoint can replace the source snapshot via INSIGHTS_API_URL; none was discovered or invented. Newsletter preserves POST /api/newsletter/subscribe and its exact source fields, but requires an existing production reverse proxy or direct NEWSLETTER_API_URL when the frontend replaces that domain. No live test email was submitted. Full provenance, scope, API contract and pending deployment verification: docs/insights-implementation.md.

## Link integration, 2026-10-08

The legacy Chrome store URL now points directly to its verified Load Spotter listing. The illustrative Slack action labels retain their wording and appearance as static preview content, rather than exposing inactive live buttons. Quote submission no longer fabricates a reference or success when no backend is configured or a response cannot be confirmed. It returns an honest unavailable message directing visitors to the existing sales email. Actual backend setup remains required for local form delivery; no customer submission was sent during this audit.

Owner requested a precise destination audit across navigation, solution submenus, homepage, footer and existing pages, with tests skipped. Sentinel, loan-calculator and quote links now use implemented local routes. The desktop solution-role links match local Driver App, TMS and Sentinel pages; the existing workflow links map fleet management to TMS, safety to Sentinel, market intelligence to Lens and owner-operators to Driver App. The global suite action uses /#capabilities so it works from every route. Homepage CRM actions preserve product=crm. Product CTAs preserve their inquiry parameters; Claims OS and financing inquiries prefill the editable notes field rather than silently discarding their context. Source-attribution links and genuine external legal, Insights, careers, store and social destinations remain external. No marketing claims or styling were changed.

## Homepage demo, 2026-10-08

Owner requested the existing video on the homepage. The new section reuses the original TMS FuelSeek recording, source poster, audio-derived captions and approved description from content/watch-demo.ts. Its new headings and link labels are editorial interface copy; no performance or savings claims were added. The section appears between Capabilities and Results. All existing homepage copy is retained. Original media provenance is recorded in docs/watch-demo-content-inventory.md.

## Watch Demo page, 2026-10-08

Owner requested the original demo recordings from https://spotter.ai/watch-demo and a compact, premium local page. Both rendered source selections were inspected. The original 42.03-second Sentinel recording and 60.76-second Spotter TMS FuelSeek recording, including audio and thumbnails, were downloaded unchanged. Local caption tracks are generated from the actual audio and labelled as auto-generated. All new page headings, short descriptions, selection labels, playback controls, error text, exploration actions and SEO summaries are editorial interface copy; source performance guarantees are not repeated as new page claims. Exact URLs, dimensions, byte counts, checksums, caption provenance and copy inventory are recorded in docs/watch-demo-content-inventory.md. Shared Watch a Demo navigation now points locally; other destinations and existing pages retain their behavior.

## Lens product page, October 8, 2026

Owner requested the next product page from https://spotter.ai/lens. Playwright inspected the rendered market application, selector options, tooltips, ranked list, geographic map, location search and historical chart before implementation. Original functional labels/names are reused. All promotional headings, introductions, capability explanations and closing copy are rewritten from those observed functions; media attribution, accessibility labels and SEO are editorial. Full inventory and rewrite list: docs/lens-content-inventory.md; copy and image provenance: content/lens.ts.

Three optimized screenshots show the actual source application, with capture-date captions and a historical-data disclaimer. No data values, interfaces, product videos or social proof were generated. FAQs, attributed testimonials, pricing, certifications and promotional performance statistics were not found and are omitted. Shared Lens links now reach the local route; Navbar/Footer implementation, root tokens and other product pages are unchanged.

## TMS product page, 2026-10-08

- Owner approved the Stage 1 inventory and Stage 2 page plan before implementation. Source: https://spotter.ai/tms, inspected with Playwright including lazy-loaded sections, navigation and the pricing overlay.
- Promotional copy is rewritten in content/tms.ts: hero, coverage heading, results introduction and captions, all six core capabilities, visibility, load operations, maintenance, financial operations, closing invitation, metadata and CTAs. Product/publisher names and reported figures are retained as factual labels.
- Four headline results (18%, 12%, 89%, 25%), 500+ fleets and a 4.8/5 rating are explicitly attributed to Spotter and not independently verified. Rating methodology was not supplied.
- Omitted unexplained comparison increases, simulated dashboard figures, unsubstantiated load/maintenance figures, the self-funding guarantee and unspecified thousands-of-users claim. No testimonials, certifications, FAQs or published pricing table were found.
- The savings calculator is omitted: assumptions are undisclosed and eligibility conflicts between more than 10 trucks and at least 5 trucks. Demo actions retain the source destination https://spotter.ai/request-quote?product=tms.
- Publisher names appear as a static text list with source attribution. Uncleared publisher logos and fleet portraits are not used. No new imagery was generated or borrowed from the homepage.
- Five sized ASSET NEEDED markers reserve photographic placements. content/tms.ts records null source/license values honestly; eligible photos require a supplied asset or documented stock license before replacement.
- Navbar, Footer, Container, ActionLink, Reveal, tokens and homepage behavior remain unchanged. The root tokens.css remains the sole token source. PRODUCT.md now acknowledges the approved local TMS route.

## Homepage inventory, 2026-10-08

Source: https://spotter.ai/, observed October 8, 2026. The owner approved inventory, audience/Logo Brief, and design language before requesting implementation. No permission to copy promotional text verbatim was supplied.

| Section                   | Treatment                                | Change                                                                                                                               |
| ------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Navbar                    | Reuse labels/links; rewrite descriptions | Product descriptions shortened; seven Insights promotions paraphrased.                                                               |
| Hero                      | Rewrite                                  | New headline, introductory copy, suite labels, contact CTA. Product names retained.                                                  |
| Capabilities introduction | Rewrite                                  | Explains the six-product suite for operations teams.                                                                                 |
| Spotter Lens              | Rewrite                                  | Preserves market rankings and pricing meaning.                                                                                       |
| Spotter CRM               | Rewrite                                  | Preserves recruiting engagement and performance meaning.                                                                             |
| Driver App                | Rewrite                                  | Preserves AI-assisted scoring and matching meaning.                                                                                  |
| Spotter TMS               | Rewrite                                  | Preserves transportation management, data automation, and visibility meaning.                                                        |
| Sentinel                  | Rewrite                                  | Preserves driver scoring, safety, and compliance meaning.                                                                            |
| Load Board Extension      | Rewrite                                  | Preserves browser automation/filtering meaning.                                                                                      |
| Results                   | Rewrite captions; reuse figures          | Four platform figures remain explicitly source-reported. +127%, +89%, +156%, +12% omitted because comparison periods were not found. |
| Customer summary          | Rewrite                                  | Clearly labeled unquoted summary. Retains customer attribution and 40%/60% source-reported outcomes.                                 |
| Awards                    | Rewrite heading; reuse assets            | Workplace recognition is distinct from product/customer awards.                                                                      |
| Closing CTA               | Rewrite                                  | One consistent demo/quote action; no new local form.                                                                                 |
| Partner strip             | Rewrite heading; reuse logos             | Four authentic logos, static rather than continuously moving.                                                                        |
| Footer                    | Rewrite description; reuse links         | Legal/company/product destinations, downloads, socials, address preserved.                                                           |
| Operational status        | Omit                                     | No status integration was found.                                                                                                     |

## Link decisions

During the homepage build, only the homepage was implemented locally. Shared links retain original absolute destinations after the TMS route addition. No standalone CRM route was found in source navigation; its product action uses the existing quote form. Hero product links scroll to the corresponding homepage section.

## Asset provenance

Attached logo copied byte-for-byte into public/brand/spotter-logo.png. Five award images and King Express, M&M, QW Trucks logos came from the source site's static/media assets. Ampro is the original 179 × 78 PNG embedded in the source homepage bundle. Source dates/names are preserved; assets are not recreated or recolored. icon.svg is an inferred favicon adaptation of the four-dot motif, not an edited wordmark.

## Claims

Platform statistics and customer results are claims published by Spotter, not independently validated. The page does not imply that workplace awards certify product performance. Product diagrams are labeled capability overviews and contain no sample prices, fake scores, or live-data claims.

## Full-screen mobile navigation, 2026-10-08

- Studied bb-b.net's mobile menu in Playwright and its delivered navigation chunk: fixed full-screen surface, 56px rows, staggered 10px entrances, horizontal divider reveals and a bottom footer. Adapted these to Spotter's fonts, colors and motion limits.
- Retained existing navigation groups, child labels, descriptions and destinations. Footer uses the existing contact CTA. No reference copy/assets, unsupported language choices, theme controls or new promotional claims introduced.

## Closing contact section polish, 2026-10-08

- Retained the existing eyebrow, headline, description, contact action wording and quote destination. Partner wording and original logo assets remain unchanged.
- Updated composition and motion only: two-line heading, decorative brand geometry, separated description/action row and one-time reveals within the approved timing limits. No additional promises, form fields or claims.

## Generated capability artwork, 2026-10-08

- Replaced only the six diagrams with original generated illustrations, as requested by the owner. Product claims, headings, capability labels, CTA destinations and card footers remain unchanged.
- Art depicts abstract capabilities: signal focus, recruiting engagement, freight routing, connected fleet data, protection and compliance, and filtered search. No actual interface, prices, scores, statistics or customer identities are represented.
- Assets generated with the built-in image_gen tool; prompts and provenance recorded in docs/capability-art-direction.md. Transparent WebP output is stored in public/images/capabilities.

## Impact section redesign, 2026-10-08

- Retained the impact headline, description, all four metric values and labels, and the original publication attribution and observation date. No new claims or comparisons added.
- Studied bb-b.net through Playwright: rendered heading hierarchy, page spacing, and viewport animation timing (400–600ms with short staggered delays). Adapted the visual pacing to Spotter's approved 320ms motion limit and 150ms total metric stagger; no reference assets or copy reused.
- Final values stay visible throughout. Rules are decorative and do not represent metric magnitudes. Reduced-motion and no-JavaScript users receive complete, static figures.

## Spotter Lens visual polish, 2026-10-08

- The owner supplied https://www.bb-b.net/ as a visual craft and motion reference. No reference assets or copy reused.
- Lens product copy, capability labels, and destination remain unchanged. The custom focus illustration is a capability overview, not a product screenshot or a market-data visualization.
- Uses the approved Spotter colors, typography, circular geometry, and motion limits. Other product sections retain their existing treatments.
- Follow-up text and CTA refinement: inspected the reference's rendered layout, computed styles, and delivered motion code. Adapted its hierarchy, whitespace, one-time reveals, and arrow interaction to Spotter's existing font scale, 8px control radius, and 320ms reveal / 160ms hover limits. Product wording and destination remain unchanged.

## Capabilities introduction polish, 2026-10-08

- Existing eyebrow, heading, and description retained. No new product or performance claims.
- Asymmetric desktop composition pairs the approved two-line heading with a separate suite description. Six decorative circles correspond to the six products; they are not controls or live status indicators.
- Approved heading scale, strong teal emphasis, spacing tokens, and one-time 320ms reveals with a maximum 160ms stagger. Mobile stacks in reading order; reduced-motion and no-JavaScript content remain supported.

## Lens and CRM capability revamp, 2026-10-08

- Inspected the reference's computed button styles, hover behavior, and deployed Framer Motion code using Playwright. The reference uses once-only viewport reveals, staggered transforms, and image-cover reveals. Adapted motion to the existing Spotter timing and accessibility rules rather than adopting the reference's longer timings.
- Replaced the cropped Lens illustration with a complete signal-to-focus composition. Added an original recruiting-to-tracking-to-visibility schematic for CRM, labeled as a capability overview. Neither graphic depicts a product interface, actual market data, or recruiting performance figures.
- Preserved product copy, capability labels, and external destinations. CRM adopts the shared refined text and CTA treatment; other product rows retain their current treatments.
- Decorative SVG groups reveal once in sequence using transforms and opacity. Text keeps full opacity. Motion is disabled for reduced-motion preferences; all content and diagrams render without JavaScript.

## Driver App and desktop compaction, 2026-10-08

- Retained Driver App wording, its three capability labels, and the original driversapp destination. New route illustration describes available loads, scoring/matching, and the next move without adding scores, live data, or interface claims.
- Imported Phosphor React icons (MIT), using individual SSR-compatible modules. Decorative icons accompany existing labels and product CTAs.
- Applied the owner's compact-desktop request to all product rows and the shared refined capability panels. Verified full rows beneath navigation at 1024 × 600, 1280 × 720, 1366 × 768, 1440 × 900, and 1920 × 1080 without clipping or reducing body text size. Mobile retains natural scrolling.

## Remaining product sections, 2026-10-08

- TMS, Sentinel, and Load Board Extension retain their approved product wording, all capability labels, and original external destinations. The extension CTA retains "Explore the extension".
- Added original Phosphor-based capability illustrations: fleet-centered data connections for TMS, identity/protection/compliance for Sentinel, and listings/filtering/search for the extension. These describe capabilities without depicting actual product interfaces or invented data.
- Sentinel's visual panel uses the existing brand-pale token with ink text and body-colored notes. Text contrast remains compliant; decorative pale mark circles receive a thin outline.
- All six products now use shared, compact components with different illustrations and alternating layouts. Motion remains one-time, 320ms, with a 160ms maximum stagger and immediate visibility for reduced-motion/no-JavaScript users.

## Hero refinement, 2026-10-08

- Owner-supplied headline updated verbatim to "trucking automation that works for you". Desktop headline sizing accommodates the longer wording; the terminal photograph and its caption move 32px right on desktop. Tablet and mobile photograph positions retain their existing layout.

- Existing Spotter headline, introduction, primary CTA, and product names retained from this project's rewritten content.
- New original labels: "Built around your fleet.", "The fleet on the road.", and "The team behind it." These are original project copy, not source quotations.
- Reference website supplied by the owner: https://www.thinkcompany.com/. Visual composition and motion studied only; no copy or imagery reused.
- Generated photographs illustrate fictional fleet and dispatch scenes. They provide atmosphere and make no claim about actual customers, staff, or product interfaces.

## TMS storytelling revision, 2026-10-08

Superseded by the owner's source-content request: TMS hero, section headings, descriptions, capability lists, evidence labels and contact copy now use wording observed on https://spotter.ai/tms. The source hero rotates Dispatchers, Accounting and Payroll; the local static heading uses Dispatchers. Primary CTA now reads Book a Demo; existing contact destination remains. Chapter labels use source section names. Attribution and motion/accessibility instructions remain editorial interface text. Source claims are reproduced as source copy, not independently verified findings. Simulated dashboard figures, unexplained comparison percentages and the fuel calculator remain omitted. No new sections or invented evidence.

Downloaded original videos unchanged from https://spotter.ai/videos/spotter-tms2.mp4 and https://spotter.ai/videos/tms-fuel-seek-hero.mp4. Owner confirmed dashboard video in chapter 04 and fuel video in chapter 03. Product demonstrations use normal playback and native controls. PNG posters are first decoded frames of the actual files. Asset dimensions, duration, bytes and source provenance are in content/tms.ts. Other films retain their prior behavior. No CSS, palette, Navbar or Footer changes.

Owner supplied three abstract videos in public/brand/videos-tms and authorized building the cinematic scroll version. Their provenance is recorded as client supplied, with no separate third-party license supplied. Original files are preserved; web encodes and WebP posters are derived locally. The separate maintenance clip was not supplied; maintenance and financial chapters share the resolution film. No real people, customer imagery, invented interface or generated statistics were added.

Rewritten items: hero heading and introduction, exploration action, overview heading/introduction and six capability summaries, visibility/load/maintenance/financial/contact chapter headings, chapter labels, scroll hint and motion-control accessibility labels. Existing rewritten feature copy and source-attributed metrics remain. Publisher names and figures remain marked reuse; all prose is marked rewrite in content/tms.ts. The former five photo placeholders are not rendered in this approved abstract-film version. FAQs, attributed testimonials, certifications and published pricing remain not found on source. Unsupported guarantees, simulated dashboard figures and unresolved calculator claims remain omitted.

Shared Navbar, Footer, root tokens and global scrolling behavior were not changed. Chapter ranges are storyboard estimates; active navigation follows actual section geometry. Native scroll drives video time in both directions, with poster fallback on mobile/reduced motion or playback failure.

## TMS film correction audit, 2026-10-08

Extension route, October 8, 2026: owner requested the next page using original source content/assets and the approved product-story direction. Rendered https://spotter.ai/extension was inventoried before implementation. Original hero wording, nine feature headings/descriptions and Chrome install destination are reused, with section/title capitalization adjusted. Hero/closing summaries combine original category labels; exploration link, media controls, failure labels, source attribution and SEO metadata are editorial UI copy. No new product claims or outcome numbers. Testimonials, pricing, certifications, statistics and FAQs were not found and are omitted. All four actual demo videos downloaded unchanged, then integrated through muted web derivatives with real-frame WebP posters sampled at one second to avoid blank opening frames. Three original icons downloaded and archived; interface uses Phosphor. Full inventory and provenance: docs/extension-content-inventory.md and content/extension.ts. Two generation prompts only: docs/extension-video-briefs.md. Navbar/Footer implementation and TMS route are unchanged; Extension destinations in shared content point locally.

Subsequent chapter 06 asset replacement authorized by the owner: built-in imagegen created a realistic fictional teal truck in a maintenance workshop. Stored as public/images/tms/maintenance-workshop.webp, with provenance in content/tms.ts and full prompt in docs/tms-maintenance-art-direction.md. Maintenance now uses this photograph instead of the resolution film. Source wording, other chapters and styling are unchanged; no marketing claims added.

No new promotional copy or marketing claims. Existing headings, body text, capability descriptions, publisher names, source attribution and action destinations remain. Removed unused storyboard percentage ranges and unused film-caption copy; chapter motion metadata now describes the implemented hero pin and financial-media parallax. Navigation tooltips reuse existing chapter labels.

Three owner-supplied abstract films remain the only imagery. New all-intra derivatives and first-frame WebP posters live in public/brand/videos-tms/scrub; exact byte counts and original source paths are recorded in content/tms.ts. No generated people, customer identity, product interfaces, testimonials or fabricated evidence were added. All original source files are intact.

The previously documented ranges were estimates; those unused values are now removed. Both scene activation and video progress follow rendered geometry. Research distinguishes supported fixes from inaccuracies in the pasted review: Next.js 16 supports preload, explicit width/height with sized contain containers is valid, and precise media seeking is not restricted to keyframes. The all-intra encoding choice reduces decoding dependencies rather than relying on that incorrect restriction.

## ClaimsOS product page, 2026-10-08

- Owner approved the Stage 1 inventory and Stage 2 motion/chapter plan before implementation. Source: https://spotter.ai/claims-os, inspected via rendered browser.
- Original copy preserved: hero heading, introductory description, four core capabilities (Claim Tracking, Financial Control, Slack Automation, Activity Monitoring), real-time Slack workflow details and simulated notification feed copy (`#claims-ops`, Claim #4821 notification, action buttons), platform architecture pillars (Centralized Dashboard, Document Storage, Driver Integration), and all four operational role descriptions (Claims Team, Freight Accounting, Fleet Safety, Operations Management).
- Authentic client product screenshot `claimos-board.0ee8047bade8e616909a.webp` downloaded directly from the source site to `public/images/claims-os/claimos-board.webp` (1692 × 930) and displayed with responsive contain styling.
- Two abstract videos delivered by owner in public/brand/claimsOS-videos: Laser_lines_aligning_freight_data_20261008175814.mp4 (6.0s, 1920x1080) and Kinetic_sculpture_rotating_into_…_20261008175745.mp4 (6.0s, 1920x1080).
- Local all-intra derivatives encoded with FFmpeg libx264 (-g 1 -keyint_min 1 -sc_threshold 0 -an -crf 20 -movflags +faststart) to public/brand/claimsOS-videos/scrub/claims-triage.mp4 (9,970,815 bytes) and liability-resolution.mp4 (6,192,526 bytes).
- First decoded frame WebP posters generated via libwebp and copied to both public/brand/claimsOS-videos/scrub/ and public/images/claims-os/.
## Sentinel product page, 2026-10-08

- Owner approved Stage 1 inventory and Stage 2 motion/chapter plan before implementation. Source: https://spotter.ai/sentinel, inspected with Playwright headless DOM analysis (`sentinel_scrape.json`, `sentinel_full.html`).
- Three distinct functional tracks preserved throughout copy, structure, and chapter scenes:
  1. Track A (AI Driver Hiring & Screening): Optical CDL extraction, multi-bureau MVR + PSP + CDLIS report pull, instant A–F predictive safety grade, DOT 10-panel drug test tracking (`Order` -> `Collection` -> `Result`), and pre-vetted driver marketplace.
  2. Track B (Continuous MVR Monitoring): 24/7 state database webhooks detecting moving violations and suspensions, pushing direct alert cards into Slack and Google Chat without logging into a separate web dashboard.
  3. Track C (Compliance & Risk Defense): Automated deadline tracking for CDL and DOT medical card renewals, multi-carrier history discrepancy verification, and fleet ISS score containment.
- Authentic client source videos extracted and downloaded directly from spotter.ai:
  - `https://spotter.ai/videos/sentinel-C.mp4` -> `public/videos/sentinel/sentinel-C.mp4` (1280x720, 31.2s; poster: `how-it-works-poster.webp`). Software walkthrough showing CDL upload, optical character recognition, and A–F risk grading.
  - `https://spotter.ai/videos/slack-demo-2.mp4` -> `public/videos/sentinel/slack-demo-2.mp4` (1280x698, 41.8s; poster: `slack-demo-poster.webp`). Software walkthrough demonstrating Slack webhook alerts when a driver's record changes.
  - Local all-intra derivatives encoded with FFmpeg (`-g 1 -keyint_min 1 -sc_threshold 0 -an -crf 22 -movflags +faststart`) to `sentinel-C-scrub.mp4` and `slack-demo-2-scrub.mp4` for seamless, lag-free scroll scrubbing.
- Authentic client vector emblem downloaded from `https://spotter.ai/static/media/sentinel.d7c0b2d96225306b1602b74228da3336.svg` to `public/images/sentinel/sentinel-logo.svg`.
- Competitor tariff comparisons preserved factually from published tariffs: MVRcheck.com, Solera SuperVision, SambaSafety, Checkr vs. Sentinel ($10.00 MVR, $4.50 PSP, $3.00 CDLIS), highlighting up to 75% savings and linking to `https://spotter.ai/mvr-pricing`. Rendered as an accessible, high-contrast, keyboard-focusable comparison table with zero third-party licensing baggage.
- Subsequent layout and media polish per owner feedback:
  - Sections 1 and 2 updated to unpinned normal video playback (`pinned={false}`, `scrub={false}`) using native `sentinel-C.mp4` and `slack-demo-2.mp4` with native controls, auto-play on inView, and `object-fit: contain` with zero zoom or crop distortion.
  - Video media containers bounded on desktop (`max-width: min(100%, 1060px); max-height: min(60vh, 580px)`) to keep heading, video, controls, and features in the active viewport.
  - Alternating section rhythm enforced across chapters to eliminate merging: Section 1 (Screening) Dark, Section 2 (Monitoring) Light, Section 3 (Compliance) Dark, Section 4 (Economics) Light, Section 5 (Talent Board) Dark, Section 6 (Closing CTA) Light (`contact`).
  - Section 4 (Economics) updated with a clean, light-mode comparison table card with accessible green indicator badge and 44px tariff link.
  - Section 5 (Talent Board) converted to compact TMS features list for the 3 steps, and compact 3-column candidate cards with tight padding and accessible action buttons, fitting cleanly into the desktop viewport.




## Truck Loan Calculators product page, 2026-10-08

- Owner approved Stage 1 inventory and Stage 2 motion/chapter plan before implementation. Source: https://spotter.ai/loan-calculators, inspected with Playwright headless DOM analysis.
- The live source page contains zero imagery or video (pure HTML form calculation tools).
- All mathematical formulas, default input parameters, and computed results were verified against the live source calculator:
  1. Amortization Calculator: Default $175,000 price, $0 down, 11.9% APR, 60 months -> $3,883.94/mo, $58,036.45 total interest, $233,036.45 total payments. Supports balloon payment, extra monthly payment, one-time extra payment, and full month-by-month schedule.
  2. Affordability Calculator: Default $2,500/mo, 11.9% APR, 60 months, $0 down -> $112,643.32 max borrowing capacity.
  3. Interest Rate Calculator: Default $150,000 loan, $2,500/mo, 60 months, $0 balloon -> solves for implied APR % via Newton-Raphson numerical iteration.
- Commercial Freight Equipment Financing Benchmarks provided as factual market-rate reference points across Class 8 sleeper cabs, day cabs, dry van trailers, and refrigerated reefers.
- Fleet Economics section contextualizes debt service into carrier cost-per-mile fixed overhead allocation.
- Hero incorporates abstract financial debt amortization asset (`liability-resolution.mp4` / `liability-resolution.webp`) with GOP=1 keyframes, smooth video scrub, and `object-fit: cover` to eliminate letterbox gaps.
- Full responsive coverage verified at 360px, 768px, and 1440px with touch targets >= 44x44px and WCAG 2.1 AA accessibility compliance.

## About company page, 2026-10-08

- Owner approved Stage 1 / Stage 2, then supplied both abstract films in public/brand/aboutus-videos. Implemented /about using the recorded rendered source snapshot at https://spotter.ai/about (docs/source/about-inventory.json, about-rendered.txt and about-dom.html).
- Exact reuse: original title and description; opening label, heading, paragraph and two actions; all four figure values and labels; both execution-problem paragraphs; nine capability titles and descriptions; operator introduction, advantage label/paragraph and conclusion; separate vision and mission paragraphs; all eight journey dates/titles/descriptions; recognition label/heading and all five award alternatives; closing label/heading/paragraph, actions and service-area note. Per-field source/copyStatus metadata is in content/about.ts. No marketing copy rewritten.
- Editorial only: chapter numbers, chapter-navigation and pause/resume accessibility labels, visible source attribution beneath company figures, descriptive alternatives for abstract owner films, and social-image alternative. These introduce no new company claims. Canonical, AboutPage/Organization schema, social and Twitter metadata add no founding date, ratings, team identity or unsupported evidence.
- The 500+, 24/7, 70% and $4.9MM figures are exact source claims, not independent verification. The 2011 timeline entry describes founders’ prior quantitative experience, not company establishment. Mission, vision, history and founder background stay distinct.
- Assets: both supplied films remain intact. Local web derivatives about-execution-layer.mp4 (2,429,481 bytes / 6 seconds) and about-freight-horizon.mp4 (3,286,438 bytes / 5.958 seconds) are muted H.264, 1280x720 at 24fps, every frame independently encoded. Posters are their actual first frames; social image is resized from the opening poster. Five existing award assets are reused with original source URLs/dimensions/license context in content/about.ts. No pending generation or missing required assets.
- Existing Navbar/Footer visual implementations unchanged. Shared link data points About locally. Existing product consumers now import promoted story components/styles/types; default playback policy remains intact. Details and verification: docs/about-implementation.md.
- Not found on source: team portraits, office photographs, full team roster/biographies, an explicit legal founding date, attributed testimonials, FAQs, published pricing, independent verification of the company figures, or source videos. Do not fabricate them. Source canvas is replaced by the approved supplied film. The source footer’s static operational-status label is not presented as a live local integration.

## Request quote form refinement, 2026-10-08

- Preserved the original page title, introduction, six product names/descriptions, all six text/select fields, fleet-size options, required-field rules, product identifiers and API payload. Replaced only visual presentation and editorial form labels/help text.
- New interface copy: “Let’s talk”, “Your details”, “Name, email and phone are required.”, “Needs or questions”, “Optional”, “Product interest”, “Select any that interest you.”, “Prefer email?”, and “Loading form…”. No new marketing claims. Sales email reuses the existing About-page destination.
- Removed the decorative WebGL constellation and gradient button. The page reuses the approved palette, fonts, brand geometry and control radii. Mobile text inputs, textarea and select retain 16px text, native pinch zoom, autofill and at least 48px field targets. Product controls are native keyboard-operable buttons exposing checkbox state.

## Careers integration, 2026-10-08

- Source: https://careers.spotter.ai/, `/jobs`, `/jobs/faceted_search_data` and every published role detail. Original rendered pages and network requests are preserved under docs/source/careers. The current 15 role titles, metadata, introductory summaries and complete descriptions are fetched from the source, with original application endpoints. Source department spelling and remote-status names are preserved.
- Exact About reuse: “Who we are”, “Team” and “Join us”, with their three original paragraphs. These remain source claims, not independent verification. No invented employee names, benefits, hiring statistics or office identities.
- Editorial additions: “Careers at Spotter”, “Build what moves freight.”, “Bring your perspective to a team connecting trucking expertise with engineering.”, “The industry we build for.”, “Find your next role”, “Open opportunities.”, the role-finding helper, “Different perspectives. One connected team.”, “Stay connected with Spotter.” and talent-network/action labels. These restate the source's trucking/engineering/team themes without introducing additional factual company claims.
- Functional additions: labelled filters, result counts, list/map navigation, loading/unavailable/empty states, geographic-search controls, map gesture/zoom controls, location permission feedback, the multiple-region eligibility explanation, application-handoff disclosure and candidate-privacy link. Counts and geographic markers come from each live listing response; remote roles can appear in several regions.
- Asset: reuse public/images/hero/terminal-dawn.webp from the approved homepage photography. Its alternative explicitly identifies it as illustrative. It is not evidence of an actual office, employee or customer.
- Sanitization removes source scripts, presentation attributes and unsafe HTML. Description heading levels are normalized for local accessibility while preserving visible text. No source tracking, application submission or candidate-data storage is recreated locally. Integration details: docs/careers-integration.md.
