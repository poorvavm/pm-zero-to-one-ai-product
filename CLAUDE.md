# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains product strategy and planning documents for **PharCovAI** — an AI-powered conversation compliance and pharmacovigilance platform being evaluated as a new Infinitus product offering.

- **Author:** Poorva Mittal
- **Product concept:** Compliance intelligence extension built on Infinitus Lens for pharma manufacturers — AE detection, SOP adherence monitoring, audit-ready workflows
- **Target customers:** Pharmaceutical manufacturers with patient support operations
- **Timeline constraint:** 90-day pilot-ready target
- **Case study context:** This paper supports a working session with engineers, UX designers, and cross-functional stakeholders (see `infinitus-case-study-guidelines.md` for the anchor question and leadership priorities)

## Repository Structure

- `infinitus-case-study-guidelines.md` — Case study prompt and discussion guidelines from Infinitus (includes the anchor question and leadership priorities)
- `pharcov-ai-case-study-execution-ideation-paper.md` — Full ideation paper with 90-day pilot execution plan (~540 lines, 13 sections)
- `20260510-v1-pharcov-ai-case-study-execution-ideation-paper.md` — Earlier version of the ideation paper (preserved for reference)
- `pharcov-ai-case-study-execution-ideation-paper.pdf` — PDF export (may be stale — regenerate with command below)
- `images/` — PNG diagram assets (architecture, timeline, personas, product vision, Mermaid-rendered charts)
- `diagrams/` — Mermaid source files (`.mmd`) for diagrams; render to PNG with `npx @mermaid-js/mermaid-cli -i <input.mmd> -o <output.png> -b white -w 1400`
- `demo/` — Interactive HTML/CSS/JS prototype of PharCovAI's core product surfaces

## Interactive Demo

A working prototype of PharCovAI's reviewer workflow. Pure HTML/CSS/JS — no frameworks, no server, no build step.

### Running the Demo

```
open demo/index.html
```

### Demo Pages

| Page | File | What It Shows |
|------|------|---------------|
| **Lens Dashboard** | `demo/index.html` | Infinitus Lens home screen with AE alert banner, compliance metrics, activity feed, program breakdown. Entry point to the demo. |
| **Triage Queue** | `demo/triage-queue.html` | 10 AI-flagged cases across Pfizer/Novartis/Roche with sortable columns, sidebar filters (status, severity, customer, source, reviewer), summary bar with attention alerts. |
| **Case Detail** | `demo/case-detail.html` | Full case review: sticky summary card, transcript with highlighted AE segments, audio player, editable MedWatch fields, AI reasoning, Confirm/Dismiss/Escalate decision flow with modals, live audit trail. |

### Demo Flow

Lens Dashboard → click AE alert or sidebar "AE Triage Queue" → Triage Queue → click any case row → Case Detail → make a decision (Confirm/Dismiss/Escalate)

### Demo File Structure

```
demo/
├── index.html              Lens Dashboard (entry point)
├── triage-queue.html       Triage Queue page
├── case-detail.html        Case Detail View page
├── requirements.md         Design contract / requirements doc
├── css/styles.css          Shared design system (Infinitus brand)
├── js/data.js              Mock data (10 cases, transcript, audit trail)
├── js/triage.js            Sort, filter, assign logic
├── js/case-detail.js       Decisions, modals, audit trail updates
└── assets/logo.svg         Logo
```

### Mock Data

- 10 cases: Pfizer (4), Roche (3), Novartis (3)
- Drugs: Xeljanz, Eliquis, Tecentriq, Cosentyx, Ibrance, Ocrevus, Entresto, Avastin, Kisqali, Paxlovid
- Primary demo case: PC-2026-0003 (Roche, Tecentriq — skin rash with full transcript)

## Working with the Ideation Paper

The ideation paper is the primary document. All images use file-path references to PNGs in `images/` — no base64 inline images.

### Generating PDF

```
npx md-to-pdf pharcov-ai-case-study-execution-ideation-paper.md --pdf-options '{"format": "A4", "margin": {"top": "20mm", "bottom": "20mm", "left": "20mm", "right": "20mm"}}'
```

### Section Map (for targeted reading)

| Section | Line | Topic |
|---------|------|-------|
| Table of Contents | ~9 | Two-level clickable index |
| 1. Executive Summary | ~59 | Platform overview, UC01–UC05, market size ($10.36B), pilot targets |
| 2. The Compliance Blind Spot | ~81 | Failure chain, AI governance vacuum, fragmented audit |
| 3. From 5% to 100%: The Product Vision | ~123 | Before/after table, design principles, "What This Is Not" |
| 4. Why Infinitus, Why Now | ~199 | Spending problem, four converging signals, moat table, competitive comparison |
| 5. Product Scope & Constraints | ~240 | Constraint/implication table |
| 6. Target Users & Personas | ~250 | Economic buyer, persona card diagram |
| 7. MVP Feature Prioritization | ~269 | V1 dependency chain, V1/V1.5/V2/Deferred feature tables with Why column |
| 8. Product Experience | ~315 | Workflow diagram, triage queue, case detail view |
| 9. From Contract to First Case Review | ~353 | Why pharma onboarding is different, 5-phase gated table, first value moment |
| 10. The 90-Day Pilot Plan | ~379 | Pilot design, execution tracks, Gantt timeline |
| 11. How We'll Know It's Working | ~412 | 3-tier scorecard (safety/quality/business) with "Why This Target" rationale |
| 12. The Week 12 Decision | ~447 | Go/Conditional Go/No-Go decision matrix with remediation scenarios |
| 13. The Case for Building This | ~496 | Strategic argument, cost of inaction, quarterly roadmap, 24-month north star, the ask |

### Image References

All images use file-path references (`![Alt](images/filename.png)`). Currently referenced:
- Section 1: `enterprise-architecture-diagram-ai-powered-pharmaceutical.png`
- Section 3: `pharcov-ai-product-vision.png`, `data-ingestion-and-training-pipeline.png`
- Section 6: `user-persona-card.png`
- Section 8: `section8-core-workflow.png`
- Section 10: `section10-pilot-timeline.png`

Mermaid sources in `diagrams/`: `section2-compliance-blind-spot.mmd`, `section7-build-sequence.mmd`, `section8-core-workflow.mmd`, `section10-pilot-timeline.mmd`.
