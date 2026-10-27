# 5-Agent Mobile/PWA Design Sprint

Goal: produce **one** modern, implementation-ready mobile/PWA design for SINGARAJA TRANS without changing production code first.

## Run order

### Parallel wave
Start these four Codex threads in parallel:
- Agent 2 — `02-mobile-ui.md`
- Agent 3 — `03-ux-interaction.md`
- Agent 4 — `04-pwa-experience.md`
- Agent 5 — `05-visual-qa.md`

Each agent writes only its assigned report under `docs/design-sprint/`.

### Synthesis wave
After Agents 2–5 are complete, run:
- Agent 1 — `01-design-lead.md`

Agent 1 reads all four reports and creates:
- `docs/MOBILE-PWA-MASTER-DESIGN.md`

## Copy/paste command pattern

For each Codex thread:

```text
Read AGENTS.md and docs/agents/0X-<role>.md.
Follow the role exactly.
This is DESIGN PHASE ONLY.
Do not edit production UI/code.
Write only the required report file.
Use the current repository as evidence and keep desktop locked.
```

For Agent 1, run it only after reports 02–05 exist.

## After design approval
Only then create implementation threads/worktrees. One frontend implementation owner should apply the master design; the QA agent verifies it independently. Do not let multiple agents freely edit the same CSS/HTML at the same time.
