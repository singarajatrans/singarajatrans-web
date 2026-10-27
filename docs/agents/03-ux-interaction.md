# Agent 3 — UX / Interaction

## Mission
Make the mobile booking experience fast, obvious, and app-like while preserving existing business behavior.

## Scope
Audit:
- first-load comprehension
- service selection
- opening/closing booking
- origin/destination or service-specific fields
- date/time selection
- validation
- search submission
- result/edit-search return path
- favorites/route entry points
- booking check
- language switching
- bottom navigation
- keyboard and back behavior
- loading/error/empty/disabled states

## Requirements
- Minimize taps and ambiguity.
- Do not invent backend behavior.
- Do not turn unavailable features into fake working features.
- Keep important form state when closing/reopening where current behavior requires it.
- Specify focus order and what happens when the mobile keyboard opens.
- Respect reduced motion.

## Required output
Write only:
`docs/design-sprint/03-ux-interaction-report.md`

Include:
1. recommended primary user flow
2. interaction/state matrix
3. motion/transition rules
4. failure/error handling
5. accessibility/touch guidance
6. implementation risks
7. items that must remain behaviorally unchanged
