# Careers integration

Implemented October 8, 2026 at `/careers` and `/careers/jobs/[slug]`, using the approved Spotter typography, colors, gutters and shared navigation/footer.

## Source and requests

The source is the public Teamtailor careers site at https://careers.spotter.ai/. Its job listing is server-rendered HTML, not a public JSON jobs API. Browser request captures and original HTML are saved in `docs/source/careers/`.

- Listing: `GET /jobs?split_view=true` with `Turbo-Frame: jobs_list`. Pass through the source's `query`, `department`, `location` and `remote_status_id` parameters. Remote values are `none`, `temporary`, `hybrid`, `fully` and `onsite`.
- Facets: `GET /jobs/faceted_search_data`, which returns `faceted_search_counts` for departments, locations and remote status. The local form uses the unfiltered facet response to keep all choices available while narrowing the listing.
- Map area: the source issues another listing request with `geobound_coordinates[top_left_lat]`, `[top_left_lon]`, `[bottom_right_lat]` and `[bottom_right_lon]`. The local map sends these same fields through an explicit **Search this area** action rather than automatically navigating on every pan. Clear-map-area removes only geographic bounds. Switching views preserves filters and bounds.
- Details: `GET /jobs/{numeric-id}-{slug}`. Titles, metadata, introduction, description, original application endpoint and JobPosting data are read from that response.
- Applications: each detail page links to its exact source `/jobs/{slug}/applications/new` endpoint. Résumé uploads, candidate consent and submission remain within Teamtailor's original flow. Connect and candidate-privacy destinations remain `/connect` and `/data-privacy` on the original careers host.

`lib/careers/repository.ts` fetches these fixed-origin public requests on the server, with a 15-second timeout and five-minute Next.js revalidation. No credentials, API key, account setup, fabricated jobs or copied source tracking scripts are used. GET-based filters, list links and job descriptions work without JavaScript. External source recovery links are shown when fetching or parsing fails. Unknown jobs return 404.

The current source returns all 15 jobs without pagination. If Teamtailor adds a next-page link, the local page exposes a source continuation link rather than silently hiding further openings.

## Parsing and content

The listing's `#jobs_list_container` supplies exact job titles and metadata. The source's `data-blocks--jobs-locations-value` supplies live coordinates and filtered role counts. Six current IDs were cross-checked with source geography and facet labels: Lemont, Pakistan, India, Colombia, Mexico and Argentina. Newly introduced IDs fall back to `Location {id}` until their label is confirmed; coordinates and counts continue coming from the source.

Description HTML is sanitized to paragraphs, headings, lists, emphasis and safe links. Source classes, inline styles, event handlers, embedded scripts and tracking code are omitted. Top-level description headings are normalized to h2 for a consistent accessible local hierarchy; wording is preserved. Some source JobPosting JSON-LD contains literal line breaks inside JSON strings. The parser escapes only these control characters before JSON.parse, with no code evaluation. The local JobPosting retains the source properties, replaces the description with sanitized HTML and points its URL to the local role page.

Source About copy is preserved in `CareersCulture.tsx`; editorial headings, navigation and helper copy are inventoried in `docs/content-audit.md`. The hero reuses the approved illustrative freight-terminal photograph, not a real employee or office photograph. No new company figures, benefits or employment claims are invented.

## Free map

Leaflet 1.9.4 and Leaflet.markercluster 1.5.3 render the source locations with standard public OpenStreetMap raster tiles at `https://tile.openstreetmap.org/{z}/{x}/{y}.png`. No API key or paid map account is required. The basemap still needs internet access. OSM attribution remains visible; no offline downloads, bulk prefetch or proxy is implemented. Production use must follow https://operations.osmfoundation.org/policies/tiles/.

Teal circles show roles at individual locations. Ink clusters show the number of nearby **places**, which avoids double-counting remote roles. Popups link to the source's country/location filter. The explanatory caption makes the multiple-region eligibility clear.

The map starts with touch dragging and pinch gestures locked so the page can scroll normally. An explicit control enables them; wheel zoom stays off. Separate 44px zoom/reset controls and the interaction control sit outside the map image, leaving every marker unobstructed. Keyboard panning/zoom remains available. Search-area navigation is deliberate. Geolocation is requested only after the visitor chooses **Use my location**, with an unavailable/denied recovery message. Loading and tile failures preserve usable location links and offer map retry. Without JavaScript, the inert map controls are hidden and location links remain.

The map follows reduced-motion preferences and cleans up the Leaflet instance and ResizeObserver when unmounted or retried. Client library code initializes only in map view. Mobile places the map before its role list; desktop pairs the role list with the map. Short desktop windows use a 280–440px map in normal flow so location links remain reachable; the complete panel becomes sticky only at viewport heights of 1200px or greater. Inputs/selects use 16px text and 48px height, preserving native page zoom while avoiding iOS focus zoom.

## Verification evidence

- `artifacts/careers-content-verification.json`: all 15 local descriptions have identical normalized text to their live source and all application links match. All three handoff destinations return 200. Source/local listing parity covers keyword, department, location, remote status, combined filters, empty results and geographic bounds.
- `artifacts/careers-responsive-verification.json`: browser measurements for list, map and role detail at 320, 375, 768, 1024 and 1440px, plus mobile WebKit at 375px. All measured layouts fit the viewport and all filter fields are 16px / 48px. Final follow-up accessibility evidence is recorded separately after correcting the source heading hierarchy.
- Final screenshots are under `artifacts/careers-final-*`. The main hero photograph is confirmed decoded, visible and served successfully.
- `artifacts/careers-final-verification.json`: production keyboard cluster expansion and popup links, original geographic filtering, fully reset form values after clearing, touch-action lock/unlock, geolocation success/denial, tile failure/retry and visible no-JavaScript recovery. Final role-description and popup accessibility scans have zero violations. Mobile WebKit keeps the visual viewport scale at 1 when a 16px field receives focus.
- `artifacts/careers-map-layout-verification.json`: final production map layout and accessibility checks at 375×812, 1366×768 and 1440×1200. No horizontal overflow or accessibility violations; shorter desktop windows retain normal flow and the tall desktop panel fits below navigation.
- Final `npm run lint` and `npm run build` complete successfully. No unused careers exports, unused props, missing CSS classes or duplicated filter/bounds serialization remain.

No application was submitted during verification. No automated test suite was run for this integration.
