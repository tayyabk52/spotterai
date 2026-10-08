# About implementation — Stage 3

Implemented at /about after the owner approved the inventory/storyboard and delivered both generated films. The source content is recorded at docs/source/about-inventory.json and docs/about-content-inventory.md. All 81 captured main-page text items are retained verbatim; source metadata and five award alternatives are retained separately. No marketing text is rewritten.

## Composition and media

Opening / execution problem / nine automation capabilities / operator background / operating philosophy / all eight journey entries / five awards / original closing invitation stay in source order. Four source figures retain their exact values and labels, with an explicitly editorial source citation. Mission and vision remain complete, distinct paragraphs. The prior 2011 quantitative background is not presented as a legal company founding date.

Two owner films illustrate infrastructure and future vision, without fabricated people, offices, brands or interfaces. Originals remain intact in public/brand/aboutus-videos. The web folder contains 1280×720, 24fps muted H.264 derivatives, encoded with -g 1 -keyint_min 1 -sc_threshold 0 -crf 23 -pix_fmt yuv420p -movflags +faststart. Decoder output confirmed every frame as an independent I-frame. Byte counts/durations/provenance are in content/about.ts and docs/source/about-media-metadata.json. WebP posters are actual first frames; the social image is a resized derivative of the opening poster. All five existing award images preserve their original source URLs, dimensions and alternatives. No required assets are pending.

Cinematic pinning requires at least 1024px width, 850px height and no reduced-motion preference. Short desktop and mobile windows retain media-wrapper scrubbing without pinning. Reduced-motion/no-JavaScript use sized real posters and full content. Films remain mounted after first approach while eligible, even offscreen or paused. Seeking begins at HAVE_METADATA and coalesces changes through one animation frame; decoded frames become visible at HAVE_CURRENT_DATA. Playback pauses outside the viewport. The pause control retains buffers. The chapter rail follows actual geometry. On mobile it appears after the opening chapter to keep the hero actions unobstructed.

## Reuse and shared changes

- Existing Navbar/Footer visual implementations and root palette are untouched by this task. Shared content links About locally; sitemap includes /about.
- ChapterScene, StoryFilm, FeatureList, NarrativeBeats and Story.module.css moved from components/sections/tms to components/story; their existing consumers use named imports. ChapterRail parameterizes the existing TMS rail rather than introducing another renderer.
- FeatureGroup/StoryAsset types moved to content/story.ts; content/tms.ts keeps type reexports for existing content consumers. ChapterScene gains optional additional paragraphs and a className; FeatureList supports its existing light palette directly; ChapterRail accepts page-specific presentation classes. StoryFilm uses supported Next 16 preload for the opening poster.
- StoryMotionProvider accepts an About-specific eligibility query. Its default behavior preserves TMS's all-width playback policy. New/promoted motion code imports motion/react. Shared hooks and motion feature bundle use named exports, with all consumers updated atomically. Existing Reveal and lazy-feature consumers receive import-binding changes only, preserving their animation behavior.
- About-specific scale lives in styles/about-tokens.css and inherits colors from canonical root tokens.css. No second palette, dependency or global styling changes.
- Repository-wide checks exposed unrelated existing errors. Minimal fixes removed synchronous React state for the unchanged WebGL fallback in QuoteBackground3D, removed unread quote-form touched state, and placed first() on the correct Playwright Locator in the loan-calculator test. No quote copy/layout/colors changed by these fixes.

## Verification

- npm run lint: passed with no warnings/errors.
- npm run build: passed, including static /about route.
- 42 Playwright checks passed across About, TMS responsive/video regressions, homepage and Extension. After the final mobile rail adjustment, all 13 About checks passed again. Reports: reports/about-playwright.json and reports/about-final-playwright.json.
- About tests verify exact source text, metadata/canonical/schema, one h1, all nine features/eight history entries/five awards, original action destinations, 360/768/1280/1440 layouts, 1024×850 pin boundary, target sizes, keyboard/skip link, anchor positioning, two-way seeking/pause/mount retention, static mobile/reduced/no-JavaScript paths, failed-video fallback, no overflow and WCAG 2.1 AA scans.
- At 1024×850, philosophy copy bottom measured 674.6px within a stage ending at 850px; at 1440×900, bottom 743.8px within 900px. No clipped mission/vision paragraphs.
- Existing /tms, /driversapp, /sentinel, /claims-os, /lens and /extension smoke checks returned 200, one h1 and no page errors.
- Production Lighthouse, local mobile: Performance 90 / Accessibility 100 / Best Practices 100 / SEO 100. Desktop: 100 / 100 / 100 / 100. Raw reports: reports/about-lighthouse-mobile.json and reports/about-lighthouse-desktop.json. Audits run against an isolated production workspace because concurrent project builds replaced .next files during an earlier invalid run.
- Explicit review-only agent confirmed source equality and media policy. Named-export and figure-attribution findings were corrected; follow-up review found no concrete regression or stale imports. No implementation was delegated.

## Content and omissions

Exact reuse: all source marketing content, figures, history, action labels/destinations, page title/description and five award alternatives. Editorial additions: chapter numbers, navigation/pause accessibility labels, source citation, abstract film alternatives and social-image alternative. These are identified in content/about.ts. Shared homepage footer remains the approved project version; its source counterpart is inventoried separately.

Not found on source: team portraits, office photographs, full roster/biographies, an explicit legal founding date, attributed testimonials, FAQs, published pricing, independently verified company figures or source videos. None fabricated. The source canvas is replaced by the approved supplied film. No static source status label is presented as a live operational integration.

## Responsive playback follow-up

Removed the About-only minimum-width video eligibility query at the owner’s request. Both films now scrub across mobile/tablet/desktop and survive viewport changes without remounting. Pinning remains restricted to large/tall screens; reduced-motion and failure posters remain. Added two-way seeking and repeated resize coverage at 360/390/768/1023/1280/1440 widths.

### Mobile frame readiness repair

Reproduced a stuck-poster failure by suppressing the video `loadeddata` event at 390px: the decoded film was at readyState 4 and its time advanced from 1.346 to 2.325 seconds, but its opacity remained 0. The player relied exclusively on that event to reveal the film. [MDN documents that mobile/tablet data-saving modes can omit loadeddata](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event).

`StoryFilm` now checks decoded-frame readiness on `canplay` and `seeked` as well as `loadeddata`. `useVideoScrub` can request a frame as soon as metadata is available, avoiding a decoding deadlock in browsers that defer frame loading until seeking. [HAVE_METADATA supports seeking](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState). Posters remain until a frame is decoded; pause, reduced-motion and error fallback behavior are unchanged. No styling, source copy, assets or dependencies changed.

New regression coverage in tests/story-film-readiness.spec.ts verifies both films with loadeddata suppressed at 320/390/768px and metadata-only loading until the first seek. All 12 production checks passed across Chromium, Firefox and WebKit. Another 31 About/TMS regression checks passed, including repeated viewport changes, pause/resume, normal product-video playback, reduced motion, no JavaScript, failed assets and WCAG AA scans. The current About in-app preview was refreshed and its frame time visibly advanced and reversed at an actual 319×668 viewport.

Final npm run lint and npm run build passed. Two interim builds encountered an actively edited, unrelated Careers component; no Careers files were changed for this playback repair. The updated production preview remains available at http://127.0.0.1:3001/about.
