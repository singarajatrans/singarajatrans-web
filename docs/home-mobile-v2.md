# Home mobile — reference redesign, 27 October 2026

The latest supplied turquoise/orange travel app reference supersedes the earlier warm/red Home V2 direction. The right-hand home screen is the target; the onboarding and sign-in screens are outside this change.

## Presentation

- Turquoise header with subtle circular decoration, location, booking-check bell, white search field and orange search/filter control.
- Four turquoise service shortcuts on white icon tiles.
- Two compact photo cards in a two-column favorites grid, with local favorites, Bali location and published fares. “Lihat semua” expands the existing route dataset.
- Popular routes appear as horizontal image/list rows. Bali inspiration, destinations and verified customer reviews continue below.
- Four-item bottom navigation follows the reference: Home pill, favorites, trips and account. Existing unavailable account/favorites feedback is preserved; trips still opens the booking-check dialog.
- The existing booking form opens from search, the orange control, service shortcuts or a route. It can be closed without clearing its fields. Edit-search links reopen it automatically. All fares, validation, results, review and WhatsApp behavior remain in the existing booking code.
- Desktop retains its previous layout and colors. `assets/mobile-reference.css` owns the mobile presentation; the previous V2 stylesheet remains in history/the repository but is no longer loaded.

## Verification

Visual review at 360/390/412 px. Desktop comparison: 768 px is byte-identical to the original baseline; 1440 px retains identical geometry with only rendering noise of at most 1 per RGB channel. Browser tests cover layout, opening/closing booking, keyboard focus, route selection, favorites, expanded cards, ID/EN, all transport search services, retained search state, review links and booking checks. Breakpoint tests cover 320/390/430 px; WebKit checks cover native iPhone scrolling and viewport changes.

Commands: `node tests/core.test.cjs`, `node tests/home-mobile-v2.cjs`, `node tests/browser.cjs`, `node tests/mobile-search-lifecycle.cjs`, `node tests/ios-scroll.cjs`. Local lifecycle tests may select available engines using `BROWSER_ENGINES=chromium,webkit`; CI runs all three engines by default. The previous animated-header tests were replaced because that header is no longer part of the reference design.

Screenshot evidence is written to `qa-output/`, which CI uploads as `visual-review`. Browser emulation does not reproduce physical iPhone touch momentum or Safari toolbar movement.
