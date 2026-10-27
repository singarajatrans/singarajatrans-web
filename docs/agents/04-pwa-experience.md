# Agent 4 — PWA / Device Experience

## Mission
Define how the existing mobile website should feel correct when installed as a PWA, without prematurely changing the app architecture.

## Scope
Audit current manifest and mobile shell. Specify:
- standalone display behavior
- theme/background colors aligned with latest mobile design
- status/navigation bar considerations
- safe-area insets
- iOS Safari vs installed PWA
- Android Chrome vs installed PWA
- orientation expectations
- keyboard/viewport resize
- scroll restoration
- splash/icon requirements
- install affordance strategy
- offline fallback boundaries
- loading/network-loss states
- cache safety for booking-related information

## Safety
Do not cache or fabricate live booking/payment status.
Do not propose secrets/client-side credentials.
Do not edit manifest/service worker in this design phase.

## Required output
Write only:
`docs/design-sprint/04-pwa-experience-report.md`

Separate:
- design requirements
- technical PWA requirements
- later implementation items
- things explicitly out of scope
