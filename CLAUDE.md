# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains product strategy documents and an interactive prototype for **PharCovAI** — an AI-powered conversation compliance and pharmacovigilance platform proposed as a new Infinitus product offering.

- **Author:** Poorva Mittal
- **Product concept:** Compliance intelligence extension built on Infinitus Lens for pharma manufacturers — Adverse Event (AE) detection, Standard Operating Procedure (SOP) adherence monitoring, audit-ready workflows
- **Target customers:** Pharmaceutical manufacturers with patient support operations
- **Timeline constraint:** 90-day pilot-ready target
- **Case study context:** Supports a working session with engineers, UX, and cross-functional stakeholders. See `infinitus-case-study-guidelines.md` for the anchor question and leadership priorities.

## Key Commands

### Open the demo
```
open demo/index.html
```
No server required — pure HTML/CSS/JS.

### Render a Mermaid diagram to PNG
```
npx @mermaid-js/mermaid-cli -i diagrams/<name>.mmd -o images/<name>.png -b white -w 1400
```

### Generate PDF of the ideation paper
```
npx md-to-pdf pharcov-ai-case-study-execution-ideation-paper.md --pdf-options '{"format": "A4", "margin": {"top": "20mm", "bottom": "20mm", "left": "20mm", "right": "20mm"}}'
```

## Architecture

### Documents
- `pharcov-ai-case-study-execution-ideation-paper.md` — The primary document. 12-section ideation paper covering the compliance blind spot, product vision, feature prioritization, UX design, onboarding, pilot plan, metrics, and strategic case. All image references use file-path references to PNGs in `images/` — no base64 inline images.
- `20260510-v1-pharcov-ai-case-study-execution-ideation-paper.md` — Earlier 13-section snapshot (included "Product Scope & Constraints" as its own section 5), preserved for reference only.
- `20260511-v2-pharcov-ai-case-study-execution-ideation-paper.md` — Second snapshot (same structure as current primary), preserved for reference only.
- `infinitus-case-study-guidelines.md` — Source prompt and anchor questions from Infinitus.

### Ideation Paper — Section Map
| Section | Topic |
|---------|-------|
| 1. Executive Summary | Platform overview, use cases, market size, pilot targets |
| 2. The Compliance Blind Spot | Failure chain, AI governance vacuum, fragmented audit landscape |
| 3. From 5% to 100%: The Product Vision | Before/after, design principles, what this is not |
| 4. Why Infinitus, Why Now | Spending problem, four converging signals, moat table, competitive comparison |
| 5. Target Users & Personas | Economic buyer, persona card diagram |
| 6. MVP Feature Prioritization | V1 dependency chain, V1/V1.5/V2/Deferred feature tables with Why column |
| 7. Product Experience | Workflow diagram, triage queue, case detail view |
| 8. From Contract to First Case Review | Why pharma onboarding is different, 5-phase gated table, first value moment |
| 9. Pilot Launch Plan | Pilot design, execution tracks, Gantt timeline |
| 10. How We'll Know It's Working | 3-tier scorecard (safety / quality / business) with target rationale |
| 11. The Week 12 Decision | Go / Conditional Go / No-Go decision matrix with remediation scenarios |
| 12. The Case for Building This | Strategic argument, cost of inaction, quarterly roadmap, 24-month north star, the ask |

### Demo — JS Data Architecture
`js/data.js` is the single source of truth for all mock data — 10 case objects and the full PC-2026-0003 transcript/audit trail. Both `triage.js` and `case-detail.js` read from `CASES` and `CASE_DETAIL` exported from `data.js`. When adding or modifying cases, only `data.js` needs to change.

- `triage.js` — sort, filter (real-time checkbox/dropdown filtering against `CASES`), row click navigation, "Assign to me" handler
- `case-detail.js` — decision modals (Confirm/Dismiss/Escalate), MedWatch field edit state, transcript jump, audio playhead, live audit trail updates

### Demo — Two HTML Layout Patterns
The three demo pages use two distinct layouts:
- **`index.html` (Lens Dashboard)** — sidebar navigation shell (`lens-sidebar` + `lens-main`), used as the product entry point
- **`triage-queue.html` and `case-detail.html`** — top navigation bar with left-sidebar filters or two-panel split (`60% / 40%`), no shared shell with `index.html`

Navigation between them is handled via plain `<a href>` links, not a router.

### Demo — CSS Design System
All design tokens are CSS custom properties defined at `:root` in `css/styles.css`. The canonical values and their intended usage are documented in `demo/requirements.md` (Section 2 — Design System). Key tokens:
- `--color-accent` (`#0D9488`) — primary buttons, active states, links
- `--color-severity-{critical|high|medium|low}` — severity badge colors
- `--color-status-{new|review|confirmed|dismissed}` — status badge colors
- SLA urgency coloring is applied inline via JS in `triage.js` and `case-detail.js`, not via CSS classes

### Diagrams
Mermaid source files in `diagrams/` with corresponding rendered PNGs in `images/`:
- `section2-compliance-blind-spot.mmd` — failure chain and scale of missed coverage
- `section7-build-sequence.mmd` — V1 feature dependency/build order
- `section8-core-workflow.mmd` — reviewer workflow (Triage Queue → Case Detail → decision)
- `section10-pilot-timeline.mmd` — 90-day Gantt

### Image References in Ideation Paper
| Section | Image file |
|---------|-----------|
| 1 | `enterprise-architecture-diagram-ai-powered-pharmaceutical.png` |
| 3 | `pharcov-ai-product-vision.png`, `data-ingestion-and-training-pipeline.png` |
| 5 | `user-persona-card.png` |
| 7 | `section8-core-workflow.png` |
| 9 | `section10-pilot-timeline.png` |

Note: `section8-core-workflow.png` and `section10-pilot-timeline.png` are legacy filenames from before sections were renumbered — do not rename them as the paper still references them by these paths.
