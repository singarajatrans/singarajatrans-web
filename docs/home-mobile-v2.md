# Home Mobile V2 — 27 October 2026

Reference: the supplied Lumière travel app screenshot. The adaptation retains Singaraja Trans branding and transport booking rather than hotel content.

## Mobile composition (up to 767 px)

1. Existing red wordmark/search header, Bali photograph and short introduction.
2. White floating booking widget, reusing the existing fields, service state and submission flow.
3. Four service choices in a fully visible grid.
4. Pilihan Favorit: horizontal photo cards, service filters, local favorites and route selection.
5. A travel recommendation banner linking to destinations. No unverified promotion or savings claim.
6. Compact popular routes, with fares read from the existing reference dataset.
7. Existing sourced customer reviews, followed by Bali destination cards.
8. Existing bottom navigation, with an inline SVG favorite icon to avoid a remote icon-font dependency.

`assets/mobile-home-v2.css` isolates the new layout in a mobile media query. The stylesheet's only desktop rule hides the new mobile-only content. Existing desktop rules are unchanged. The booking JavaScript change only updates the mobile shuttle hero copy; the fare data, validation, search, results, review and WhatsApp flow are unchanged. New popular-route buttons use the existing service and field controls.

## Verification

- Visual inspection at 360, 390 and 412 px, including scrolling through the full home feed.
- Desktop screenshot comparison at 768 and 1440 px against commit `505c0f1`: identical PNG hashes before and after the final redesign.
- `node tests/core.test.cjs`: reference fares, direction, capacity, dates and times.
- `node tests/home-mobile-v2.cjs`: Chromium and WebKit at all three requested widths; overlap, section order, overflow, navigation, persistent favorites, filtering, ID/EN, popular-route prefilling, shuttle/airport/charter results, booking review, retained search details and booking-check dialog.
- Existing lifecycle, iOS scroll and responsive booking checks remain in CI. Obsolete service-carousel/notch geometry assertions are updated for the four-column service grid.
- Local runs pass the responsive booking checks at 320/360/390/412/768/1024/1440 px, header checks at 360/390/412 px, bottom navigation at 320/360/375/390/412/430 px, and the Chromium/WebKit search lifecycle checks. The local Firefox executable cannot launch because its Windows runtime dependencies are unavailable; its CI check remains enabled.

Screenshots are written to `qa-output/` and uploaded by CI as `visual-review`. Mobile screenshots use viewport captures at several scroll positions because Chromium's existing mobile layout scrolls the body, while iOS uses the native document scroller. Desktop browser emulation does not establish physical iPhone touch or Safari-toolbar behavior.
