# SINGARAJA TRANS — Agent Rules

## Current mission
Design-first sprint for the **mobile / PWA experience only**. Do not redesign or modify desktop.

## Source of truth
When instructions conflict, use this order:
1. The latest explicit user instruction for the active task.
2. `docs/home-mobile-v2.md` for the current mobile Home direction dated 27 October 2026.
3. `DESIGN.md` for current project-wide constraints.
4. `PRD-Design-Singaraja-Trans.md` for detailed behavior/content rules.
5. Existing live/source behavior where the documents are silent.

Do not revive older visual directions that have already been superseded.

## Hard scope locks
- Desktop >= 768px is LOCKED unless the user explicitly includes desktop.
- Do not change backend, API, database, auth, RBAC, routing, booking business logic, fares, schedules, content truth, or WhatsApp flow during the design sprint.
- Do not remove working logic to make a mockup easier.
- Do not invent prices, availability, ratings, testimonials, booking status, certifications, or operational claims.
- Reuse existing assets/components/patterns before proposing new ones.
- Do not add dependencies during the design phase.

## Mobile design targets
Primary QA widths: 360px, 390px, 412px.
Also check 320px and 430px for overflow/safe-area resilience.
Treat iOS Safari/WebKit and Android Chrome behavior as first-class.

## Design quality bar
Audit and specify:
- layout, alignment, geometry, spacing, typography, icon sizing
- color, border, radius, shadow, hierarchy
- header/search, service shortcuts, booking surface, cards, filters
- dropdown, calendar, time picker, modal/popover
- loading, empty, error, disabled, focus, pressed, selected
- scroll, clipping, overflow, z-index, keyboard, safe area
- PWA standalone mode and browser mode
- motion and prefers-reduced-motion
- consistency across 360/390/412

Modern does **not** mean adding visual noise. Prefer clear hierarchy, compact touch-friendly geometry, restrained surfaces, and consistent tokens.

## Five-agent ownership
- Agent 1: Design Lead / synthesis.
- Agent 2: Mobile UI system and visual hierarchy.
- Agent 3: UX / interaction and booking flow.
- Agent 4: PWA / device experience.
- Agent 5: Visual QA / regression.

During the design phase, Agents 2–5 must not edit production HTML/CSS/JS. Each writes only its assigned design report. Agent 1 synthesizes those reports into the master design.

## Conflict prevention
Each agent owns only the output path specified in its role file under `docs/agents/`.
Do not overwrite another agent's report.
Do not edit `index.html`, production CSS, JavaScript, manifest, tests, or workflows until the master design is approved.

## Final design gate
Design is not FINAL/LOCKED until:
- a single master mobile/PWA design exists,
- all material states are specified,
- 360/390/412 are covered,
- iOS/Android/PWA standalone constraints are covered,
- contradictions with current PRD are resolved,
- desktop is explicitly preserved.
