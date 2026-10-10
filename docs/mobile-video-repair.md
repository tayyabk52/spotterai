# Mobile scroll video repair, October 10, 2026

## Changes

ClaimsFilm and LoanCalculatorsFilm previously revealed their video layers only on `loadeddata`. StoryFilm already handled `canplay` and `seeked`, which can arrive when mobile data-saving behavior suppresses `loadeddata`. All three now use the shared `useVideoReadiness` hook and reveal only when the media reports a decoded current frame. Error and poster fallbacks remain intact.

The shared scrub hook normally waits for an in-flight seek. It now schedules a bounded 250ms retry when a new scroll target is waiting for delayed completion. The retry can replace an outdated seek, cleans up on pause/unmount, and does not introduce continuous polling or autoplay.

No page layout, desktop pinning criteria, media eligibility, copy or reduced-motion policy changed.

## Verification and limits

- Chromium: all 22 selected production-build tests passed, including touch-capable mobile viewports, forward/backward seeking, metadata-only loading, suppressed loadeddata, delayed seek completion, resizing and reduced motion. This includes Claims OS and Loan Calculators reduced-motion checks.
- Lint and production build passed.
- Windows Playwright WebKit: the explicit delayed-completion regression passed. Broader runs had intermittent media/locator timeouts; the latest production run passed 8 of 10 tests, with TMS seek and Driver App video-mount timeouts. Earlier runs timed out on different pages. These are unresolved test observations, not proof of either success or failure on physical iOS Safari.

Physical iPhone/iPad verification remains necessary. Do not treat desktop Windows WebKit with a small viewport as a physical iOS device. No device was connected during this repair.

Regression coverage lives in `tests/story-film-readiness.spec.ts` and the existing `tests/tms-hero-responsive.spec.ts`.

## Follow-up: TMS frozen on mobile, October 10, 2026

The owner reported that the hero and financial management film remained still from loading in iOS Safari and mobile Chrome while desktop worked. The previous event-readiness repair did not address decoder activation.

For coarse-pointer devices, the shared scrub hook now briefly calls muted inline `play()`, pauses on the first `playing` event, then applies the latest scroll target. The video stays paused during scrubbing. If browser policy rejects the initial attempt, a direct touchend/pointerup handler retries within user activation. The hook retains activation per video element, clears timers/listeners on pause or exit, and leaves fine-pointer desktop behavior unchanged. Readiness also handles the decoded `playing` event.

`tests/tms-mobile-activation.spec.ts` models metadata-only video with blocked seeking until playback is activated by a trusted touch. It failed before this change and passed afterwards in Chromium and Windows WebKit for both TMS films, including forward/backward scrubbing and paused playback. All 21 selected Chromium checks and lint/build passed. This is an automated policy simulation, not physical-device verification.

Policy references: [WebKit video policies](https://webkit.org/blog/6784/new-video-policies-for-ios/) and [MDN play()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play).

After decoder activation was added, the full Windows WebKit readiness suite also passed all 10 checks, including TMS, unlike the earlier runs recorded above. Combined validation: 21 Chromium and 11 WebKit checks passed. Physical iOS verification remains separate.
