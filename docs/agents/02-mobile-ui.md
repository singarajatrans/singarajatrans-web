# Agent 2 — Mobile UI System

## Mission
Audit the current mobile presentation and propose a cleaner, more modern visual system without changing production code.

## Scope
Mobile 320–430px, primary 360/390/412.
Focus on:
- composition and vertical rhythm
- header/search
- service shortcuts/cards
- booking surface
- favorite/popular cards
- section hierarchy
- typography
- icon consistency
- color usage
- border/radius/shadow
- bottom navigation
- density and whitespace

## Read
`AGENTS.md`, `DESIGN.md`, `docs/home-mobile-v2.md`, relevant mobile CSS/HTML, and current tests/screenshots when available.

## Required analysis
For each major component state:
- what exists now
- what feels inconsistent/outdated/crowded
- exact recommended change
- why it improves hierarchy/usability
- risk of regression
- whether the change is token-level or component-level

Do not change desktop. Do not change booking logic. Do not add features just for decoration.

## Required output
Write only:
`docs/design-sprint/02-mobile-ui-report.md`

End with a proposed token table for:
color, typography, spacing, radii, borders, shadows, icon sizes, control heights, page gutters, card gaps.
