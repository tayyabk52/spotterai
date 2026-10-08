# Hero art direction

## Reference study

Reference: https://www.thinkcompany.com/, observed 2026-10-08 in desktop 1440px and mobile 390px browser sessions. Study evidence is saved under reports/reference/.

Observed desktop treatment: oversized centered headline (104px on the reference), dark textured canvas, three peripheral photographs, line-masked entrance, and photographs moving outward as scroll advances. Pointer movement alone caused no measurable image movement in the sampled session. Mobile removes the peripheral photographs and keeps the centered message. Spotter uses its own two photographs on mobile instead, to preserve the fleet narrative.

Spotter adaptation: existing dark teal and pale teal tokens, approved Quicksand and Source Sans 3 fonts, original freight and dispatch scenes, full-opacity headline motion, outward photo parallax, accessible quote link, and six product anchors along the base. No reference copy, photography, logo, or background asset was copied.

## Assets and provenance

Generated with the built-in Imagegen tool. Both photographs illustrate fictional scenes, not real customers, employees, or customer facilities. Optimized to 900 × 1200 WebP for the application without changing the generated scene. Original PNG outputs remain in the generation directory.

| Asset                  | Application path                          | Intended use          |
| ---------------------- | ----------------------------------------- | --------------------- |
| Fleet at dawn          | public/images/hero/fleet-dawn.webp        | The fleet on the road |
| Dispatcher in daylight | public/images/hero/dispatch-daylight.webp | The team behind it    |

## Final generation prompts

### Fleet at dawn

Use case: photorealistic-natural. Asset type: premium Spotter.ai fleet software homepage photograph, one standalone image. Scene: an American freight terminal just after sunrise, pale overcast sky, damp asphalt with understated reflections. Subject: one modern dark teal Class 8 sleeper semi truck with a white dry-van trailer, authentic proportions, three-quarter front view, freight yard and second distant trailer softly out of focus. Composition: portrait 3:4 editorial photograph, truck framed completely with some breathing room, camera at human eye level, realistic 50mm perspective. Mood: quiet operational confidence, working fleet rather than glossy luxury advertisement. Colors: deep teal #102A2B and #008080 truck, soft pale teal #BBDDDE atmosphere, natural asphalt, muted warm dawn highlight. Texture: honest tire tread, brushed metal, a little road dust, real-world materials. Constraints: photorealistic, no text, no branding, no logos, no watermark, no invented dashboard or futuristic holographic effects. Excellent mechanical accuracy; natural documentary photography with restrained cinematic lighting.

### Dispatcher in daylight

Use case: photorealistic-natural. Asset type: original premium fleet operations software homepage photograph, standalone portrait 3:4 image. Scene: real small trucking company dispatch office in early daylight, freight terminal glimpsed through a tall window. Subject: an experienced woman fleet operations manager in her forties wearing a muted teal cotton overshirt, seated in profile at a simple desk studying a laptop; candid concentration and quiet confidence, no posing or smiling at camera. Composition: natural medium shot with hands gently on keyboard, realistic 50mm lens perspective; manager and laptop in lower center, soft window light, one softly out of focus truck outside. Laptop display angled away, no legible interface, no invented scores or data. Style: premium documentary photography, tactile fabric, natural skin texture, ordinary functional office, restrained analog grain. Palette: deep teal #102A2B, soft pale teal #BBDDDE, warm neutral skin and diffuse daylight, no saturated blue or purple. Constraints: photorealistic, anatomically accurate hands, no visible text, no logos, no watermark, no fake dashboards, no futuristic effects, no decorative props, no stock-photo handshake or staged corporate group.

## Verification

Production build completed successfully after the hero changes. TypeScript and ESLint are checked separately. Further Playwright runs and browser automation were skipped at the owner's request. The already-running browser test batch had completed all ten checks before that request was processed; no further browser tests were launched. A fresh visual inspection and Lighthouse measurement of this hero remain outstanding and no new performance score is claimed.
