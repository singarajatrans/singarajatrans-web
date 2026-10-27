# SINGARAJA TRANS — Mobile/PWA Master Design

Status: Implemented baseline · 27 October 2026

## Scope
Mobile and installed PWA only (max-width 767px). Desktop, backend, API, database, auth, fares, schedules and booking business logic remain locked.

## Visual tokens
- Primary sea blue: #0B7285
- Primary strong: #075968
- Primary soft: #E6F5F7
- Accent orange: #FF8A4C
- Page: #F5F7F8
- Surface: #FFFFFF
- Ink: #20272D
- Muted: #7C898E
- Line: #E6ECEE
- Page gutter: 16px
- Surface radii: 14–20px
- Touch target: >=44px

## Component rules
- Header: compact sea-blue app shell with safe-area support; location + booking bell above a 48px search row.
- Search: 48px white field + 48px orange control, both 14px radius.
- Services: four equal shortcuts; consistent 62×58px surfaces; active state uses primary-soft.
- Booking form: 20px outer surface, 14px fields, 48px CTA; existing logic retained.
- Favorite cards: two-column mobile grid, 16px radius, light line + soft depth.
- Popular routes: one-column compact media rows, 16px radius.
- Inspiration/destinations/reviews: same surface/radius/shadow family.
- Bottom nav: four equal items, visible labels, 44px targets, active primary-soft state, bottom safe-area padding.

## PWA
- Standalone theme: sea blue.
- Background: page neutral.
- Icons: 192, 512, 512 maskable.
- Offline fallback is informational only.
- Navigation stays network-first; booking/payment/status data must never be presented from stale offline cache.

## QA gate
Required widths: 360, 390, 412. Resilience: 320 and 430. Verify Chromium + WebKit, keyboard opening, scroll, dialogs/popovers, safe area, bottom nav, booking lifecycle, ID/EN, no horizontal overflow and desktop regression.
