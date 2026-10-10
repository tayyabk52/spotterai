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
