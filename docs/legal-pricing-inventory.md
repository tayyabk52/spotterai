# Legal and MVR Pricing source inventory

Sources read October 8, 2026: https://spotter.ai/mvr-pricing, https://spotter.ai/privacy-policy, https://spotter.ai/terms-and-services, https://spotter.ai/ccpa. Canonical source titles/descriptions, rendered text, clause blocks, price rows and CCPA choices are saved in docs/source/legal-pricing. These captures exclude source navigation/footer from local policy content; the approved shared shell is reused.

## Exact content retained

- Privacy: introductory paragraph, 10 policy section headings, all paragraphs and lists, contact details and August 14, 2023 effective date. The original heading “Date Deletion” is intentionally not silently corrected. Source contact address is Spotter Inc, 415 Madison Ave, New York, NY 10017, rather than the shared footer address.
- Terms: “Spotter TOS”, seven sections, all 69 source heading/paragraph blocks including nested subheadings. Hidden DOM clauses were read; no accordion content was omitted. Original literal asterisks, capitalization, arbitration terms, exclusions and legacy Spotify support reference are retained. The Spotify URL remains source text, not a newly recommended support action. Actual Spotter sales contact emails and AAA link are functional. No effective date is invented where none appears on source.
- CCPA: both original informational sections, four rights, four collected-data categories, eight fields (name, surname, email, phone, request, state, zipcode, message), six request choices and all 50 original state options. Email/state are required, phone and ZIP optional; supplied phone and ZIP retain US validation. A local Privacy Policy cross-link is provided by the legal navigation.
- MVR: all 51 displayed state/DC rows at two decimal places. CDLIS $4.50, PSP $10.00, Driver Reviews $3.00 and Drug Testing $90.00. Sentinel company name, Info@spottersentinel.com and +1 (224) 788-0134 are retained. The live public API (https://api-safety.spotter.ai/api/pricing/public/) includes 52 entries and an $85 drug-test field; the source page displays 51 rows and $90. The local page reproduces the published page and identifies it as a dated snapshot.

## Editorial interface changes

Compact brand headers; shared legal tabs; chapter anchors and contents controls; semantic lists; readable paragraphs; explicit state/code search; state/name and price sort controls; CSV and print/save PDF actions; source-capture label; CCPA request heading and email-draft controls. No policy clauses, tariffs, retention promises, verification timelines or legal remedies were invented.

## CCPA integration

The inspected source bundle submits the same eight keys to https://spotter.ai/api/ccpa-request. Read-only HEAD inspection returned 404. The local flow creates an editable/reviewable email draft to support@spotter.ai, published in the source Privacy Policy. Visitors must send it from their own email client. Request text remains available for copying if no email handler is installed. No user data is persisted, logged or sent by the website. A no-JavaScript email alternative remains visible. A direct backend submission should only replace this flow after the owner provides a functioning privacy-request endpoint.

## Integration boundaries

Footer Privacy/Terms/CCPA links and both Sentinel pricing actions point to the four new local routes. New routes are included in sitemap. Existing Navbar/Footer styles, homepage and product narratives, shared motion and root tokens remain unchanged. Tests are skipped per the owner's instruction; build/lint and visual/content review are separate checks.
