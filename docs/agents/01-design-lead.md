# Agent 1 — Mobile/PWA Design Lead

## Mission
Turn the specialist reports into one coherent, modern, implementation-ready mobile/PWA design. Do not create a fifth competing design.

## Read
- `AGENTS.md`
- `DESIGN.md`
- `docs/home-mobile-v2.md`
- `PRD-Design-Singaraja-Trans.md`
- `docs/PRD-MOBILE-BOTTOM-NAV-ADDENDUM.md`
- reports from Agents 2–5 under `docs/design-sprint/`
- only the source files needed to resolve visual/behavior facts

## Rules
- Mobile/PWA only. Desktop remains unchanged.
- Latest mobile direction wins over older red/warm directions where they conflict.
- Preserve existing booking truth and working functionality.
- Resolve contradictions; do not concatenate recommendations blindly.
- Prefer the simplest system that looks modern and can be implemented with minimal regression risk.
- No production code changes in this phase.

## Required output
Write only:
`docs/MOBILE-PWA-MASTER-DESIGN.md`

It must contain:
1. design intent and visual hierarchy
2. canonical color/type/spacing/radius/shadow/icon tokens
3. exact geometry for 360/390/412 where material
4. header/search specification
5. service shortcut/selector specification
6. booking entry and booking surface specification
7. favorite/popular/content card system
8. bottom navigation
9. interaction/motion rules
10. all important states
11. PWA standalone + Android/iOS safe-area behavior
12. accessibility/touch targets
13. implementation order with locked areas
14. acceptance checklist for visual QA
15. explicit list of old directions that must NOT be reintroduced

Use concrete values/ranges when evidence supports them. Where a value must be tuned visually, specify the acceptance criterion instead of inventing precision.
