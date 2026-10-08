# TMS premium review and completion evidence

## Study completed before implementation

Read both owner-supplied pasted-text files under the attachment 4115b4a6-5b4b-487b-b96d-ad0cb913311e. Read PRODUCT.md, DESIGN.md and the content audit, ran Impeccable's context loader, and studied its brand, animation and polish references.

Inspected https://www.bb-b.net/ through Playwright at 1440px and 390px, including its headings, video geometry, scrolling compositions and 12 loaded script resources. The reference uses wide media and deliberate headline hierarchy. No evidence was found for a pinned scroll-video hero in the loaded homepage; it has a looping video and timed subtitle logic. Its Motion runtime and requestAnimationFrame handling were observed. We use those findings as visual direction, not as a claim that its code implements our chosen scrub method. Captures and script excerpts are in reports/reference-bbb-*.

Primary technical references checked:

- Motion useScroll: https://motion.dev/docs/react-use-scroll
- Motion upgrade guidance: https://motion.dev/docs/react-upgrade-guide
- MDN currentTime: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime
- MDN readyState: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
- MDN presented-frame callbacks: https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/requestVideoFrameCallback
- MDN reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
- FFmpeg codecs/libx264: https://ffmpeg.org/ffmpeg-codecs.html
- Installed Next.js 16.4 guides: node_modules/next/dist/docs/01-app/02-guides/videos.md and 03-api-reference/02-components/image.md.

## Review findings and disposition

| Guide item              | Verified finding                                                                                                    | Resolution and evidence                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Re-entry unmounts video | Conditional rendering depended on live viewport intersection.                                                       | Element mounts once after approach, persists offscreen and paused; tests compare the same DOM element after leaving and returning.                          |
| GOP and scrub decoding  | Six-frame GOPs require intervening-frame decoding; precise currentTime seeking is not limited to keyframes.         | Benchmarked all-intra encodes, selected those for desktop. Decoder confirmed 191/191/143 independently encoded frames; reports/tms-codec-verification.json. |
| Scroll mapping          | Hero began approximately 40% through its clip at initial viewport position; non-pin mapping followed copy geometry. | Hero/pins use header-to-track-end mapping. Normal films use their own wrapper. Decoded first/final-frame and media-passage tests pass.                      |
| preload claimed invalid | Installed Next 16 explicitly documents preload and deprecates priority.                                             | Retained supported preload, verified successful lint/build and rendered preload link.                                                                       |
| Image/frame sizing      | Rendered narrow containers cropped wide footage despite valid dimensions.                                           | Full-width contain compositions; dimensioned next/image retained, explicit video dimensions added. 1440x812 stage fit verified in browser.                  |
| Motion import migration | Official docs recommend the motion package for a migration; project currently uses Framer Motion 14 throughout.     | Retained the approved working dependency within TMS scope; no new npm dependency or shared component migration.                                             |
| Final frame offset      | Old fixed .05-second subtraction was not tied to encode rate.                                                       | Targets duration minus one 24fps frame, with half-frame seek tolerance. Presented mediaTime confirms the final decoded frame.                               |
| Dead range data         | Storyboard percentage ranges were unused.                                                                           | Removed; current section geometry is the sole source of progress.                                                                                           |

## Visual design and scope

- Complete wide film compositions replace cropped portrait panels.
- The hero gets a dedicated opening-to-ending track; two immersive chapters pair type with sequential capabilities.
- Matte palette-derived scrims, unboxed captions, wide feature films, balanced headings and consistent action details preserve the teal identity without repeating cards.
- Three source films total 10,004,606 bytes in the new derivatives; the largest is 4,867,716 bytes. This exceeds the guide's proposed 2MB target for two desktop clips, an intentional quality tradeoff explicitly suggested by the guide. Mobile requests zero video. No cuts, invented frames or synthetic interfaces were introduced.
- All existing copy and claims are preserved. Navbar, Footer, root palette, shared Reveal and shared scrolling are unchanged. No new assets need generation.

## Verification evidence

- npm run lint and npm run build: passed.
- 23 relevant Playwright tests passed: TMS layout and Axe accessibility at 360/768/1440px, anchors/focus, reduced motion, no JavaScript, media error fallback, reverse seeking, pause, decoded first/final frames, retained element identity, full-frame geometry, caption keyboard controls and shared drawer/scroll behavior.
- Firefox and WebKit engine smoke checks: forward/reverse seeking passed, no page errors or horizontal overflow; reports/tms-browser-checks.json. These are engine checks on Windows, not physical iOS Safari device tests.
- Chromium synthetic animation check: median requestAnimationFrame interval 16.7ms, p95 16.8ms across 181 frames while scrolling the overview; reports/tms-animation-frame-check.json. Source video remains 24fps.
- Under 4x CPU throttling, the 20-point seek sweep reached each target in 52ms at p95, with one 79ms sample; this is a browser automation measurement with polling overhead, not a hardware guarantee. reports/tms-seek-latency.json.
- Lighthouse production mobile: performance 90, accessibility 100, best practices 100, SEO 100, CLS 0. Desktop: 100 in all four categories. JSON audit files are reports/tms-refined-lighthouse-mobile.json and reports/tms-refined-lighthouse-desktop.json.
- Reviewed final rendered screenshots for hero, both cinematic chapters, wide visibility composition, mobile hero/contact and active chapter rail. First-frame/media readiness was awaited before representative captures.
- Separate homepage contrast failure was already reported in the previous full-suite run; that component remains outside the TMS pass.

## Completion audit

The requested study, premium visual improvement, full-film framing, complete scroll timeline, decoder readiness, retained media on re-entry, source provenance, palette preservation, responsive/accessibility fallbacks and production validation have direct evidence above. No active implementation work remains for this scoped TMS refinement. Real-device behavior and network conditions outside the tested environments are not claimed as verified.
- Additional cold-network check: 100ms latency, 1MB/s download throughput and 4x CPU throttling. The hero received rapid targets at 80% then 40% before decoding completed and settled on the latest 40% target (3.169013 seconds), paused and readyState 4. Evidence: reports/tms-throttled-readiness.json. This verifies readiness recovery under the tested throttle, not every network condition.
