# About storyboard — approved and implemented

Stage 2 approved by the owner; Stage 3 implementation authorized after the owner supplied both generated films.

Source: https://spotter.ai/about. Exact source wording and current imagery are recorded in docs/about-content-inventory.md and docs/source/about-*. Mission and vision are distinct content tracks within the original operating-philosophy section. The founder background is the people track; no portraits, full biographies or separate team roster were found.

## Chapters

| Chapter | Source heading / content | Scroll estimate | Motion | Asset |
| --- | --- | --- | --- | --- |
| Opening | Building the Freight Execution Infrastructure Layer for Trucking | 0–14% | Pin and scrub on eligible desktop; static otherwise | Client film about-execution-layer |
| Source figures | 500+, 24/7, 70%, $4.9MM with original labels | 14–18% | Static | None, source-reported text |
| 01 | Built for the Reality of Trucking | 18–28% | Reveal | Text only |
| 02 | A Single Unified Operating System | 28–43% | Reveal | Nine exact source features with numbered rows; functional actions use Phosphor icons |
| 03 | Built by Operators. Powered by AI. | 43–52% | Reveal | Exact founder narrative; no invented portrait |
| 04 | The Future of Freight Execution | 52–67% | Pin and scrub on eligible desktop; static otherwise | Client film about-freight-horizon; both mission and vision paragraphs remain complete and distinct |
| 05 | The Spotter Journey | 67–87% | Reveal | All eight original timeline entries |
| 06 | Recognized for Excellence | 87–93% | Static | Five existing source award images |
| Closing | Ready to transform your fleet operations? | 93–100% | Reveal | Exact source CTA text and destinations |

Percentages are storyboard estimates only. Active rail and scrub use measured geometry. Preserve source order and every paragraph, feature, timeline entry, metric label and CTA. Do not turn chapter questions into new visible marketing copy. Root Navbar/Footer remain the shared project versions as requested; source footer is inventoried but its original status label is not presented as a live local integration.

## Approved shared implementation

- Reuse Navbar, Footer, Reveal, StoryMotionProvider, useChapterProgress, useVideoScrub and useActiveChapter.
- Promote the existing ChapterScene, StoryFilm, FeatureList and NarrativeBeats into shared story modules at the second real use, with existing product consumers updated to named imports. Move shared media types away from content/tms.ts. Parameterize the existing chapter-rail renderer instead of cloning its behavior.
- Let StoryMotionProvider accept an About-only media eligibility query; default behavior remains TMS's current policy. About video scrubbing requires >=1024px width and no reduced-motion preference. Pinning additionally requires >=850px height. Short desktop windows use unpinned media-wrapper scrubbing; mobile, reduced motion and no JavaScript remain static. This preserves TMS's separation of playback from cinematic layout.
- Both films were delivered by the owner. Original masters are preserved; actual first-frame posters and verified all-intra web derivatives are integrated. No pending-film marker remains.
- Use named exports and typed props for promoted/new components; keep default exports only where Next pages/layouts require them. Split by responsibility, not line count.
- No new color palette: canonical root tokens.css supplies colors. styles/tokens.css is absent. styles/about-tokens.css contains About scale and aliases to root colors; do not create or relocate a second palette.
- Use the already installed motion/react entry point. The installed motion 14 package reexports framer-motion internals; do not mislabel the existing package as a broken compatibility shim. Regression-test shared primitives and TMS after the import/promotion changes.
- Keep each video mounted after first approach, gate seeks on HAVE_CURRENT_DATA, coalesce seeking and preserve pause state. Normal films follow their own media wrappers; pinned films follow their own tall media tracks.
- Prepare 1280×720, 24fps muted H.264 web derivatives with all-intra encoding (g=1, keyint_min=1, sc_threshold=0) and verify frame types. This reduces decode dependencies; inter-frame video can also seek between keyframes. Preserve source masters and derive actual first-frame posters.
- Posters/hero use fill with sizes in explicitly sized containers. Installed Next 16 supports preload and deprecates priority; use supported preload for the opening poster unless owner specifically elects the deprecated priority prop.
- Source title and meta description are exact reuse; canonical /about, AboutPage/Organization schema and social image metadata add no unsupported founding dates, ratings or statistics.
- Validate 360/768/1440 layouts, focus/targets/anchors, no overflow, reduced motion, no JavaScript, media failure and source-copy equality. Run lint/build and production Lighthouse (P>=80, A/BP/SEO>=90).

## External generation briefs

### about-execution-layer

Chapter: opening. 16:9. Duration: 6 seconds. Loop: no. Web derivative budget: approximately 3–6 MB, subject to quality and actual encoding.

Prompt: Create a premium abstract cinematic film of a freight execution infrastructure coming together, expressed entirely through physical materials and geometry. A deep dark teal architectural space contains several disconnected matte teal rails, pale porcelain planes and finely machined junctions. At the beginning these paths sit at different levels with clear breaks between them. In one continuous, deliberate movement, the parts slide and settle into precise alignment, forming a connected flowing structure with tangible depth and calm mechanical purpose. Use soft directional studio lighting, restrained reflections, subtle contact shadows and a single very small coral detail. The camera makes a slow, steady lateral drift; no cuts, dissolves, flicker, shake, rapid movement or jump at the end. Keep the left third dark and visually quiet for website text, while the material composition occupies the center and right. The opening frame must already be beautifully composed and useful as a static poster; the final frame is a resolved, stable structure. No people, vehicles, offices, brands, logos, text, letters, numbers, maps, charts, screens or product interfaces. High-quality material realism, not a technical schematic or decorative particle tunnel. Six seconds, silent, 16:9.

Poster: first frame; quiet dark teal left third and separated pale/teal rail pieces arranged in the center-right, before alignment.

### about-freight-horizon

Chapter: 04, operating philosophy / distinct mission and vision tracks. 16:9. Duration: 6 seconds. Loop: no. Web derivative budget: approximately 3–6 MB.

Prompt: Create a premium abstract cinematic film about disciplined systems creating a clearer future. Build a wide architectural horizon from layered pale porcelain planes and precision-cut matte teal pathways in a deep dark teal space. The opening composition has a few uneven pathways crossing different levels, with restrained tension and generous negative space. Over six seconds, these physical paths slowly align into an ordered, continuous perspective extending toward a softly lit distant horizon. Use one continuous shot with a very gentle forward camera movement, soft side lighting, realistic material shading and subtle reflections. Leave the left third quiet and dark for website copy; concentrate the geometry to the right. A tiny coral material accent may appear once, without glowing or acting as a live status signal. End in a composed stillness, without fading to black or cycling back. The first frame must stand on its own as a polished poster. No people, trucks, cities, recognizable landmarks, brands, logos, text, letters, numbers, maps, charts, UI panels or fabricated product interfaces. No cuts, particles, lens flares, flashes, fast motion or stock-tech tunnel. Quiet cinematic material realism, silent, 16:9, six seconds.

Poster: first frame; staggered porcelain planes and teal paths receding to a soft horizon on the right, with clear dark negative space on the left.

## Status

Implemented reuse: shared infrastructure, exact source copy and five existing award images. ChapterScene, StoryFilm, FeatureList, NarrativeBeats, shared story styles/types and the parameterized ChapterRail are promoted under components/story and content/story.ts. Two externally generated owner films are integrated; Codex generated no new film or photograph. No marketing content rewritten. See docs/about-implementation.md for verification.
