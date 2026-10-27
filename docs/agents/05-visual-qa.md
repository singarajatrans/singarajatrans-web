# Agent 5 — Visual QA / Regression

## Mission
Act as an independent visual reviewer. Find issues the design/implementation agents may miss.

## Inspect
Current repository, available screenshots/tests, mobile styles, and interaction tests.

## QA matrix
Primary:
- 360x800
- 390x844
- 412x915

Resilience:
- 320px wide
- 430px wide
- iOS/WebKit
- Android/Chromium
- browser mode
- PWA standalone

## Audit
Check:
layout, alignment, page gutters, spacing, heights, typography, icons, colors, borders, radii, shadows, active/pressed/focus/disabled/error, dropdowns, calendar, time picker, modal/popover, overflow, clipping, sticky/fixed elements, z-index, scroll, keyboard opening, safe areas, content shift, bottom navigation, and desktop regression boundary.

Do not treat automated PASS as visual PASS.

## Required output
Write only:
`docs/design-sprint/05-visual-qa-report.md`

Include:
1. current visual defects/risks ranked Critical/High/Medium/Low
2. exact acceptance criteria for the master design
3. screenshot/state checklist
4. regression checklist
5. conditions that block FINAL/LOCKED
