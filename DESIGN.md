# Design — Spotter.ai

## Careers, 2026-10-08

Owner requested a local careers page using the approved system. Pair a compact ink hero with the existing illustrative freight-terminal photograph; stack the composition on phones. Native 16px / 48px filters lead to flat ruled job rows, list/map navigation and original About copy. Local role descriptions use a 70ch reading limit, accessible section headings and a sticky desktop application aside that follows the description on phones.

Map view uses Leaflet with OpenStreetMap tiles and visible attribution, requiring no API key or paid account. Teal role markers and ink place clusters use the root palette. Keep zoom/reset and interaction controls outside the map image, 44px or larger. Lock touch gestures until explicitly enabled; never intercept page wheel scrolling. Geographic filtering uses a deliberate Search this area action. Mobile places the map above matching jobs; desktop pairs jobs with the map, with sticky positioning reserved for windows at least 1200px tall so its location links remain reachable. Loading/error recovery and no-JavaScript location links remain usable. Preserve shared navigation/footer visuals, root colors, fonts and existing submenu scrollbar behavior.

## Legal and pricing pages, 2026-10-08

Owner requested local redesigns of MVR Pricing, Privacy Policy, Terms of Service and CCPA. Preserve the homepage identity, Quicksand / Source Sans 3 and root teal palette. A compact ink header and a flat legal-document navigation strip lead to a light reading surface. Legal pages use 16px body text with 1.8 line height and a 74ch maximum, 25–31px section headings, a sticky desktop contents index and a native collapsed contents list on smaller screens. Clauses remain expanded in the document so searching, deep links, printing and reading without JavaScript retain all wording. No film, staged photo or speculative illustration is appropriate for these pages.

MVR Pricing pairs a compact source introduction with four nationwide fees on fine rules, followed by a two-column state table. Search, state/price sorting, CSV export and print/save PDF use the same published snapshot. Phones retain the full table in the viewport without sideways scrolling. CCPA retains source fields and choices in a scoped form with native validation and a transparent email-draft action. Existing navigation and footer visuals remain untouched; only relevant destinations become local.

## Insights, October 8, 2026

The local editorial collection preserves the approved teal palette, Quicksand / Source Sans 3, container gutters, 8px controls and 16px media corners. A dark introduction and asymmetrical featured story lead into a light, ruled article collection. The first latest story is a wide row; remaining stories use two columns on desktop and a single reading sequence on phones. Original photographs/thumbnail compositions remain complete with contain sizing. No borrowed source CSS or theme switch, new palette, generated images, or promotional statistics.

Scoped article typography caps reading width at 72ch and separates original section headings, lists and tables. A pale original-source invitation closes each article; the listing has the source newsletter signup. Shared Reveal supplies once-only transforms; reduced motion and no JavaScript keep complete content. Search/category controls use real navigation and at least 44px targets. Both Insights submenus fetch the same article summaries; other navigation groups retain their design and behavior.

## Homepage demo, 2026-10-08

Owner requested an inline homepage video without disturbing existing content or styling. A compact light section between Capabilities and Results features the authentic FuelSeek recording inside Spotter TMS. Existing typography, palette, gutters and panel corners are retained. Desktop copy sits beside the player; phones stack copy above it. The existing DemoPlayer supplies user-initiated native playback, captions, failure recovery and no-JavaScript controls; preload remains none. A single link opens the full demo library with TMS selected. Existing homepage sections and global styles remain unchanged.

## Watch Demo page, 2026-10-08

Owner requested a short demo page using the original Sentinel and Spotter TMS recordings. Preserve the approved root teal palette, Quicksand / Source Sans 3, 8px controls, 16px player corners and responsive gutters. A compact light introduction leads directly to two product selections and one native video player. Tablets and desktops place the selection list beside the player; phones place two options above it. A small personalized-demo invitation closes the page before the shared footer. No extra feature, testimonial or marketing sections.

Original MP4s retain their audio and source thumbnails. Player dimensions are reserved, contain sizing preserves the whole recording, and desktop media height is capped at 44svh / 400px. Playback starts only after a user action; native controls retain sound, seeking, captions and fullscreen. Real audio-derived English captions are explicitly labelled auto-generated. Selection URLs work without JavaScript, replace the active player and stop previous playback. Failure offers retry or a direct file link. Shared Navbar/Footer implementations, other product routes, root tokens and motion remain unchanged.

## Lens product route, 2026-10-08

Owner requested a Lens page following the approved premium product-page direction. The palette and Quicksand / Source Sans 3 typography remain unchanged. Scoped Lens fluid headings and gutters follow the Extension product treatment. The dark hero introduces an actual profitability-map capture; light ranking and history chapters use alternating screenshot-and-copy compositions and a pale closing invitation. No simulated dashboard or repeated feature-card grid.

Actual screenshots are contained, dimensioned next/image assets with capture attribution. Their original product colors are evidence within images, not new interface palette tokens. Shared Reveal and ScrollComposition animate transform only; no video or ongoing motion. Reduced-motion users receive static content; no-JavaScript users retain all content and assets. A sticky desktop ranking introduction stays in ordinary document flow on smaller screens. No Navbar, Footer, shared motion or root token implementation changes.

Approved project reference, 2026-10-08. Read alongside PRODUCT.md in every session. Stage 3 was approved before implementation. Future pages share this system; amend deliberately rather than inventing page-specific palettes.

## System

- Direction: rounded precision. Dark teal photographic hero, navigation, and footer; light main canvas for capabilities and evidence.
- Audience: fleet owners and operations teams. Primary action: Request a demo or quote.
- Scene: an operations buyer evaluating software in a well-lit office, scanning capabilities and evidence with limited time.
- Structure: centered photographic hero with a six-product index at its base, alternating capability rows, compact results, customer summary, award strip, closing CTA with static partners, footer.
- Logo geometry, not a template or outside brand, is the visual anchor.

## Logo Brief

Attached 640 × 158 transparent PNG, sampled using Pillow. Fully transparent pixels: 83.31% of canvas. Visible-ink shares use alpha weighting and nearest dominant RGB grouping.

| Exact color | Ink share | Observed role     |
| ----------- | --------: | ----------------- |
| #FFFFFF     |    53.35% | Wordmark          |
| #BBDDDE     |    23.31% | Two lower circles |
| #008080     |    11.67% | Lower-left circle |
| #F8485F     |    11.67% | Upper-left circle |

Four solid circles form an asymmetric L. Circles are approximately 44px in diameter, with approximately 49px center spacing. The wordmark is rounded, lowercase, geometric, and thin. Mark-to-wordmark gap is approximately 32px. Closest font candidate: Quicksand Light; low confidence in exact identification, moderate confidence in family category. Preserve the supplied image rather than recreating its lettering.

Clear space: half one circle diameter, approximately 22px at native size (inferred). Preserve proportions, colors, internal spacing, and arrangement. The background is transparent, not black.

## Canonical Color Tokens

tokens.css is the implemented source of truth. Sampled colors stay exact; all other colors below are inferred derivatives. No additional chromatic brand hue.

| Token                    | Hex     | Approved pairing / ratio                   |
| ------------------------ | ------- | ------------------------------------------ |
| Primary                  | #008080 | Surface text: 4.67:1                       |
| Primary strong / success | #006D6D | Canvas: 5.69:1                             |
| Accent                   | #F8485F | Decorative only; no normal text over coral |
| Brand pale               | #BBDDDE | Main text: 10.45:1                         |
| Canvas                   | #F1F7F7 | Main text: 13.97:1                         |
| Surface                  | #FAFDFD | Body text: 9.46:1                          |
| Surface tint             | #E7F1F1 | Muted text: 4.96:1                         |
| Main text / dark surface | #102A2B | Canvas: 13.97:1                            |
| Body text                | #284A4B | Surface: 9.46:1                            |
| Muted text               | #526B6C | Canvas: 5.27:1                             |
| Decorative border        | #C5D8D8 | Surface: 1.45:1, decorative only           |
| Control border           | #6A8585 | Canvas: 3.65:1                             |
| Error                    | #B91F37 | Canvas: 5.85:1                             |

WCAG normal-text threshold 4.5:1, large-text and essential non-text threshold 3:1. Exact white logo on dark surface: 15.13:1. Exact teal logo circle on dark surface: 3.17:1. White and pale teal fail on white backgrounds; coral fails normal text on white. Teal normal text uses the stronger derivative on canvas. Status meaning needs labels/icons as well as color.

## Typography

- Display: Quicksand, Arial, sans-serif; 600, upright. Body/navigation: Source Sans 3, Arial, sans-serif; 400 with 600 emphasis.
- Both are OFL fonts, loaded through next/font. Logo remains an image.
- Scale: 13, 16, 20, 25, 31, 39, 49, 61px.
- H1 mobile/tablet/desktop: 39/49/61px. H2: 31/39/49px. Product headings: 25/25/31px.
- Body: 16px, line-height 1.6, max 70ch. Intro: 20px. Headings: line-height about 1.15.

## Layout & Geometry

- Max content width: 1248px. Four columns on mobile, eight on tablet, twelve on desktop.
- Outer gutters: 20px mobile, 32px tablet, at least 64px desktop. Grid gaps: 16/24/32px.
- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Section spacing: usually 64/96/128px; related elements group more tightly.
- Buttons/inputs radius 8px; visual panels radius 16px; borders 1px.
- Focus: immediate 2px outline with 3px offset, strong teal on light and pale teal on dark.

## Motion

- Entrance 240ms, opacity with up to 12px movement. Reveals once, 320ms, stagger capped at 160ms total. Hover/menu transitions 160ms.
- Easing: cubic-bezier(0.16, 1, 0.3, 1). Animate opacity and transforms, not layout.
- Reduced motion: no movement or stagger, content shown immediately. Content is available without JavaScript.
- Implementation accessibility refinement: text-bearing reveals retain full opacity, since fading a compliant text/control pair caused transient contrast failures. Motion remains a subtle transform; decorative-only opacity may be used without obscuring text.
- No continuous animation; partner logos are static.

## Principles & Avoidances

Rounded, not soft: circles with decisive hierarchy. Asymmetric, not disorderly: varied composition on a shared grid. Four colors with clear roles. Thin detail with strong hierarchy.
Avoid purple gradients, blobs, glass panels, fabricated dashboards, identical card grids, pills everywhere, pale text on light surfaces, italic headings, and invented evidence.

## Exports

tokens.css carries the implementation tokens. The approved decisions above remain the human-readable reference. No second independently maintained palette.

## Product section refinement, 2026-10-08

The owner requested compact desktop product sections that fit within the viewport and an imported icon family while continuing the individual product polish.

- At widths of 1024px and above, product rows use 48px vertical padding. At viewport heights of 740px or below, padding reduces to 32px. Compact capability panels use 24px padding, 56px capability rows, and a 160px illustration area, reduced to 104px on shorter desktop screens. Artwork preserves its proportions.
- Target full-section visibility beneath navigation at common desktop sizes down to 1024 × 600. No fixed section height, clipped text, scroll trapping, or reduced body font size. Narrow layouts and browser zoom retain natural scrolling.
- Phosphor React is the imported icon family. Use duotone, 24px, strong teal for labeled capabilities and regular, 20px arrows for product actions. Icons supplement text and are decorative to assistive technology. Import individual SSR-compatible icons to avoid loading the whole catalog.
- All six products share the refined copy, capability-row, and CTA components while retaining distinct conceptual illustrations. Driver App connects available loads, scoring/matching, and the next route; TMS shows data converging around fleet operations; Sentinel emphasizes protection and compliance; the extension narrows listings into focused search. These are capability illustrations, not fabricated interfaces or data displays.
- Sentinel uses the existing brand-pale token for its visual panel. Main text and product signature use ink; supporting notes use body text. Pale circles receive a thin control-color outline so the decorative mark remains distinguishable against the panel.
- Preserve the existing palette, heading scale, radii, and 320ms/160ms motion limits. Product anchor targets account for the navigation height.

## Hero refinement, 2026-10-08

The owner requested a hero inspired by https://www.thinkcompany.com/, with original Spotter content and generated imagery. This overrides the initial asymmetric, light hero composition only.

- Deep teal canvas uses the existing ink token. Pale teal emphasizes the second headline line. Coral remains a small decorative brand dot.
- Centered headline: 61–96px on desktop, 44–68px on mobile; Quicksand 600 remains unchanged. This larger hero scale is an intentional section-specific refinement.
- Two original generated documentary-style photographs express the fleet on the road and the team behind it. These are illustrative scenes, not photographs of actual Spotter customers or staff.
- Desktop photographs frame the content at opposite edges. Mobile photographs reflow into a staggered pair below the primary actions. No essential text sits on imagery.
- Six product capability links form a single horizontal index on desktop and a two-column list on mobile. Keep all existing destinations and product names.
- Static fine grain and one faint circular outline provide texture. No gradient, glass treatment, dashboard invention, or copied reference assets.
- Headline entrance uses a 12px translate with an 80ms offset between lines, preserving full text opacity. Scroll moves desktop photos outward by at most 64px and upward by 48px. Mobile photos remain static. Reduced motion disables all movement.
- Keep navigation behavior and every section after the hero unchanged while sections are polished individually.
- Image prompts and provenance: docs/hero-art-direction.md. Hero images are optimized WebP files under public/images/hero/.

## Impact section refinement, 2026-10-08

- Light evidence section remains on the existing tint token. A thin top rule and up to 96px vertical padding establish a deliberate break after the product sequence.
- Desktop pairs the heading and source context with a two-by-two set of figures separated by fine rules. Figures use Quicksand 600 at 39–61px; narrow phones use a single column with 49px figures. No cards, chart implications, or fabricated comparisons.
- Small decorative Phosphor icons support the metric labels. The four-circle brand geometry anchors the introduction.
- Once-only metric movement is limited to 12px over 320ms, with 50ms offsets and 150ms total stagger. Decorative rules reveal with horizontal scale. Text and final numbers retain full opacity; reduced motion removes movement and stagger, and no-JavaScript rendering remains complete.

## Generated capability artwork, 2026-10-08

- Owner requested generated bitmap artwork in place of the six code-drawn diagrams only. This intentionally supersedes the SVG medium for these illustrations while retaining the approved cards, capability lists, copy, icons and destinations.
- Cohesive sculpted ceramic illustrations use teal, pale teal, porcelain and small coral accents on genuinely transparent backgrounds. These are conceptual capability artworks, not product interfaces or customer evidence. Natural material shading is confined to image assets; interface backgrounds remain solid tokens.
- Optimized 1200px WebP files live under public/images/capabilities. Preserve their proportions with contain sizing within the existing 160px desktop artwork area, 104px on short desktops, and a 5:2 area on narrow screens.
- Artwork rises once by 12px over 320ms. Reduced-motion users receive static imagery. All text and capability icons below the image remain unchanged. Prompt set and provenance: docs/capability-art-direction.md.

## Closing contact section refinement, 2026-10-08

- Retain the pale teal panel and 16px corner radius. Pair a deliberate two-line heading with a decorative four-circle brand motif inside a fine circular guide. Emphasize the second heading line with strong teal.
- A thin control-color rule separates the heading from the lower description and CTA row. Desktop uses 64px panel padding; tablets use 48px and phones use 32px vertically with 24px horizontal padding.
- Use the shared contact action with a Phosphor arrow, a 64px minimum height and 8px corner radius. Button text wraps on narrow screens without overflowing. Preserve the quote destination and the static partner strip below.
- Once-only 320ms reveals use up to 12px movement, with a 160ms maximum stagger. Decorative motif scale settles from 0.94 to 1. Reduced motion disables movement and stagger; no-JavaScript content remains visible.

## Hero action refinement, 2026-10-08

- Hero actions share a 64px minimum height, 8px control radius and 16px spacing. Primary action uses teal with a pale arrow inset; the secondary uses an outlined dark-surface treatment and a circular down-arrow detail. Phosphor arrows are decorative.
- Hover/focus arrows move by 2px diagonally or 3px downward over 160ms. Reduced-motion users receive static arrows. Keep the pale focus outline and all original labels and destinations.
- Below 480px, actions stack to the same width with 16px horizontal padding. Primary text may wrap without overflow. Changes are scoped to the hero and do not alter shared action styling elsewhere.

## Section scrolling, 2026-10-08

- Owner requested smooth section navigation using Framer Motion. Same-page anchor links animate the native scroll position with the approved ease-out curve; duration varies from 480–800ms with distance. This navigation-specific timing intentionally differs from 320ms content reveals.
- Account for the measured navigation height, target scroll margin and page scroll padding. Preserve hash history and move keyboard focus to the destination after arrival. Skip-to-content and reduced-motion navigation are immediate.
- Wheel, touch, pointer and navigation-key input cancel an active animation. Normal scrolling remains native, without transformed page wrappers, scroll trapping or continuous inertia loops. External, modified and download link clicks retain browser behavior.

## Mobile navigation refinement, 2026-10-08

- Owner confirmed the reference's full-screen shape. Below 1200px, use an opaque ink modal with the approved logo and 44px close control in an 88px top bar. Portal the native dialog to the body so header backdrop filtering cannot constrain its viewport bounds.
- Match the reference's flat 56px rows, fine full-width dividers and bottom-anchored footer. Use existing responsive gutters, Source Sans 16px group labels, pale supporting copy and a 64px quote action with 8px corners. Product, solution, resource and company groups retain their links and descriptions as flat expandable lists.
- Only the navigation area scrolls. Top controls and quote footer remain visible on short screens. Respect dynamic viewport height and safe areas.
- Rows rise into place by 10px over 320ms with 50ms offsets and 150ms total stagger. Divider scale reveals are decorative. Text stays fully opaque; reduced motion eliminates movement, stagger and exit delay. Normal exit uses 8px movement over 160ms.
- Native modal isolation and explicit Tab wrapping contain focus. Escape, close and link activation dismiss the drawer; closing restores focus, body styles and scroll position. Desktop breakpoint changes dismiss it. Desktop megamenu and no-JavaScript quote fallback remain unchanged.

## TMS cinematic storytelling exception, 2026-10-08

Extension route approved as the next product story: retain the same typography, teal palette, shared navigation and footer. Large source headline, wide real product demos, three alternating capability chapters, sticky chapter headings on desktop and a pale installation panel. Source copy remains Extension-specific. Page-scoped scale uses aliases and existing root colors. Reuse Reveal, ActionLink and useChapterProgress; ProductVideo and ScrollComposition are reusable primitives. Motion remains native-scroll transform only, with reduced-motion and no-JavaScript reading paths. Two optional abstract video briefs are documented for owner generation; no missing-film containers render before delivery.

The owner approved a TMS-only departure from the homepage's restrained scale and photographic compositions. Preserve the shared color palette, fonts, Navbar and Footer. New page-scoped scales live in styles/tms-tokens.css and alias the root tokens.css colors.

Eight chapters move from operational context through reported outcomes, workflow overview, visibility, load handoffs, maintenance and finances to contact. Use the three owner-supplied abstract films, not simulated product interfaces. Desktop chapters scrub muted video with native scroll, use modest image parallax and pin the overview and maintenance only on screens at least 1024px wide and 850px tall. A slim chapter rail supports direct navigation and a motion pause control. Small screens, reduced motion, media failures and no JavaScript show poster frames with all copy visible; no scroll interception.

## TMS film pacing and composition refinement, 2026-10-08

Study: the owner's two attached reviews, the rendered bb&b reference at desktop and mobile sizes, its loaded scripts, and official Motion, MDN, FFmpeg and installed Next.js documentation. The reference informs wide cinematic compositions, headline scale and separation of supporting detail; its source styling, words and assets were not copied. Research and requirement evidence: docs/tms-premium-review.md.

- Hero is a 240svh track; overview and maintenance use 300svh tracks. Sticky stages occupy the viewport below the measured header. Native scroll maps from track top meeting the header to track bottom meeting the viewport bottom. The complete 16:9 frames use contain sizing with no artwork zoom or portrait crop. Palette-derived scrims keep text readable; the captions have no enclosing cards.
- Normal chapters place the heading and introduction above a wide film and the capability detail below it. Their video follows the media wrapper's passage, from its top entering the viewport to its bottom meeting the header; paragraph height does not drive video time.
- Videos mount once when eligible scenes first approach the viewport and persist while offscreen or paused. Seeking stops outside view and resumes at the latest scroll position without recreating the element. A seek in progress coalesces subsequent requests; loaded-data, can-play and seeked events apply the newest target after readiness. No autoplay, loop, inertia scroll interception or infinite animation loop.
- Every frame in the three new muted H.264 encodes is independently encoded, confirmed by decoder output. Preserve the complete supplied durations at 24fps and 1280px. About 10MB total is an intentional desktop fidelity tradeoff; phones, short desktop windows and reduced-motion users request no video. First-frame WebP posters match each film's opening. Original clips are preserved.
- Overview and maintenance captions advance with scroll and offer keyboard-operable numbered controls. Pause freezes both decoded frames and captions without removing buffers. Reduced-motion, mobile and no-JavaScript versions present every feature in normal reading order. Chapter controls track actual section geometry; the mobile rail scrolls its active chapter into view.
- Navbar, Footer, shared root palette, shared Reveal and global anchor logic remain unchanged. Keep Next.js 16's supported preload prop and dimensioned next/image assets. Keep the installed Framer Motion dependency; a repository-wide import migration is outside this TMS pass.

## TMS playback eligibility correction, 2026-10-08

Owner subsequently requested the remaining abstract footage, including financial resolution, to scrub at every screen width as well. All abstract media eligibility now uses reduced-motion preference only. Cinematic pinning still requires 1024px width and 850px height; narrow screens retain their existing stacked layout. Actual decoded video overlays its first-frame poster when ready. Posters remain for reduced motion, unavailable media and no JavaScript.

Responsive hero correction: owner requested scroll-driven hero playback at every viewport width. Hero media eligibility now depends only on reduced-motion preference; desktop cinematic pinning retains its existing width/height criteria. Non-pinned layouts map the hero media's own passage to video time. The pause control is available on mobile as well. Other chapters retain existing eligibility and layouts. This supersedes the mobile poster-only rule for the hero, while reduced-motion and media-failure posters remain.

Chapter 06 imagery exception approved by the owner: replace its abstract film with a generated realistic truck-maintenance photograph. Preserve the existing layout, palette, source copy and scroll-driven capability captions. The image illustrates a fictional maintenance bay and does not depict an actual customer. Prompt and provenance: docs/tms-maintenance-art-direction.md.

The 850px minimum viewport height accidentally controlled video creation as well as pinned layout. This disabled all footage on common 1366x768, 1280x720 and 1440x800 desktops. Video eligibility now depends on desktop width (1024px minimum) and reduced-motion preference only. A separate cinematic flag retains the 850px threshold for sticky compositions and sequenced captions. Shorter windows use the complete wide films and all capability text in normal flow. Their hero video maps its own media passage instead of the unpinned hero's copy height. Mobile and reduced-motion poster fallbacks remain approved behavior. Playback remains driven by scrolling, with a pause control.

## About company storytelling exception, 2026-10-08

Owner approved docs/about-storyboard.md and supplied both films before implementation. Preserve the root palette, Quicksand / Source Sans 3, shared Navbar and Footer. styles/about-tokens.css owns the company-page scale and aliases the shared scene contract; root tokens.css remains the only palette.

Opening and operating philosophy use complete 16:9 abstract films, dark palette-derived scrims and native scroll seeking. Pin only at >=1024px width and >=850px height with no reduced-motion preference. Short desktop windows scrub their own unpinned media wrappers. Mobile, reduced motion, failed media and no JavaScript retain real first-frame posters and every original paragraph. Videos stay mounted after approach while eligibility remains; pause freezes seeking without clearing buffers. Films have muted 1280x720 / 24fps all-intra derivatives, with untouched source masters.

Company figures, nine numbered capability rows, the operator narrative, all eight timeline entries and five real award images keep source order. Mission and vision remain two distinct paragraphs; the 2011 quant background is not reinterpreted as a company founding date. No team portraits or biographies are fabricated. Closing reuses original invitation, demo destination and sales email. A shared chapter rail follows measured geometry. About-specific scales do not affect existing product pages.

About mobile rail refinement: defer the rail until the first content chapter becomes active, keeping both original hero actions unobstructed. Desktop rail remains visible.

## About responsive video correction, 2026-10-08

Owner requested working films on small and dynamically resized screens. About now uses the shared all-width media eligibility policy: scroll scrubbing at every width when reduced motion is not requested. Only cinematic pinning retains the 1024px / 850px gate. Non-pinned films follow their media wrappers; viewport changes retain the video element and buffer. This supersedes About’s mobile poster-only policy. Reduced motion, no JavaScript and media errors keep real posters. Content and styling remain unchanged.
