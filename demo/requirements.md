# PharCovAI Demo — Requirements

## 1. Overview

### Purpose

An interactive HTML/CSS/JS demo of PharCovAI's two core product surfaces — the **Triage Queue** and the **Case Detail View**. This demo accompanies the PharCovAI ideation paper and is designed to be shown during a working session with engineers, UX designers, and cross-functional stakeholders.

### What It Demonstrates

The end-to-end reviewer workflow: a PV Specialist opens the triage queue, sees AI-flagged adverse event cases sorted by severity, clicks into a case, reviews the transcript evidence and pre-filled MedWatch fields, and makes a regulatory determination (Confirm / Dismiss / Escalate).

### Audience

- Engineers evaluating technical feasibility
- UX designers evaluating workflow patterns
- Compliance stakeholders validating regulatory alignment
- Leadership assessing product-market fit

### Constraints

- Static demo with mock data — no backend, no API calls
- Interactive via JavaScript (click-through workflows, state changes)
- Must feel like a real product, not a wireframe
- Two separate HTML pages with shared CSS

---

## 2. Design System

### Brand: the Company

| Token | Value | Usage |
| --- | --- | --- |
| `--color-primary` | `#000000` | Primary text, headings, navigation |
| `--color-background` | `#FFFFFF` | Page background |
| `--color-surface` | `#F8F9FA` | Card backgrounds, table rows (alt) |
| `--color-accent` | `#0D9488` | Teal — primary buttons, active states, links |
| `--color-accent-light` | `#CCFBF1` | Teal light — accent backgrounds, hover states |
| `--color-gradient-start` | `#0D9488` | Teal — gradient start |
| `--color-gradient-end` | `#0EA5E9` | Cyan/blue — gradient end |
| `--color-border` | `#E5E7EB` | Borders, dividers |
| `--color-text-secondary` | `#6B7280` | Secondary text, labels, timestamps |
| `--color-severity-critical` | `#DC2626` | Critical severity badge |
| `--color-severity-high` | `#EA580C` | High severity badge |
| `--color-severity-medium` | `#CA8A04` | Medium severity badge |
| `--color-severity-low` | `#16A34A` | Low severity badge |
| `--color-status-new` | `#3B82F6` | New case status |
| `--color-status-review` | `#8B5CF6` | In Review status |
| `--color-status-confirmed` | `#16A34A` | Confirmed AE status |
| `--color-status-dismissed` | `#6B7280` | Dismissed status |

### Typography

| Element | Font | Size | Weight |
| --- | --- | --- | --- |
| Body | Inter (fallback: system sans-serif) | 14px | 400 |
| Heading 1 | Inter | 24px | 700 |
| Heading 2 | Inter | 18px | 600 |
| Label | Inter | 12px | 500 |
| Badge | Inter | 11px | 600 |
| Table header | Inter | 13px | 600 |
| Table cell | Inter | 14px | 400 |

### Spacing

- Base unit: 4px
- Component padding: 16px
- Card padding: 20px
- Section gap: 24px
- Page margin: 32px

### Component Patterns

- **Cards**: White background, 1px border (`--color-border`), 8px border-radius, subtle shadow (`0 1px 3px rgba(0,0,0,0.1)`)
- **Buttons**: 8px border-radius, 12px 20px padding, 14px font
  - Primary: `--color-accent` background, white text
  - Secondary: white background, `--color-accent` border and text
  - Danger: `#DC2626` background, white text (for dismiss/reject actions)
- **Tables**: Header row with `--color-surface` background, alternating row colors, hover highlight
- **Badges**: Rounded pill shape, 4px 10px padding, 11px font, uppercase

---

## 3. Shared Components

### 3.1 Navigation Header

A fixed top bar present on both pages:

```
┌─────────────────────────────────────────────────────────────────────┐
│ [the Company Logo]  PharCovAI          Triage Queue | Case Detail    │
│                                            Sarah Chen, PV Analyst  │
└─────────────────────────────────────────────────────────────────────┘
```

- Left: the Company logo (text-based: "infinitus" in lowercase bold + "PharCovAI" label)
- Center: Navigation tabs — "Triage Queue" and "Case Detail" (active state: teal underline)
- Right: User name and role badge ("PV Analyst")

### 3.2 Severity Badge

| Level | Color | Label |
| --- | --- | --- |
| Critical | `#DC2626` bg, white text | CRITICAL |
| High | `#EA580C` bg, white text | HIGH |
| Medium | `#CA8A04` bg, white text | MEDIUM |
| Low | `#16A34A` bg, white text | LOW |

### 3.3 Status Badge

| Status | Color | Label |
| --- | --- | --- |
| New | `#3B82F6` bg, white text | NEW |
| In Review | `#8B5CF6` bg, white text | IN REVIEW |
| Confirmed | `#16A34A` bg, white text | CONFIRMED |
| Dismissed | `#6B7280` bg, white text | DISMISSED |
| Escalated | `#EA580C` bg, white text | ESCALATED |

### 3.4 Confidence Score Indicator

A horizontal bar or circular badge showing AI confidence:

- 90–100%: Green fill
- 70–89%: Teal fill
- 50–69%: Yellow fill
- <50%: Red fill

Display format: "92%" with colored background

### 3.5 SLA Countdown

Displays time remaining against FDA's 15-day reporting window:

- >10 days: Gray text, no urgency
- 5–10 days: Yellow text
- 2–5 days: Orange text, bold
- <2 days: Red text, bold, pulsing dot indicator

Format: "12d 4h remaining" or "2d 1h remaining"

---

## 4. Triage Queue (`triage-queue.html`)

### 4.1 Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Navigation Header                                               │
├───────────┬─────────────────────────────────────────────────────┤
│ Sidebar   │ Main Content                                        │
│           │                                                     │
│ Filters   │ ┌─────────────────────────────────────────────────┐ │
│           │ │ Summary Bar: 14 cases | 3 Critical | 5 High    │ │
│ - Status  │ └─────────────────────────────────────────────────┘ │
│ - Severity│                                                     │
│ - Reviewer│ ┌─────────────────────────────────────────────────┐ │
│ - Program │ │ Case Table                                      │ │
│           │ │                                                 │ │
│           │ │ [Case rows...]                                  │ │
│           │ │                                                 │ │
│           │ └─────────────────────────────────────────────────┘ │
└───────────┴─────────────────────────────────────────────────────┘
```

### 4.2 Sidebar Filters

| Filter | Type | Options |
| --- | --- | --- |
| Status | Checkbox group | New, In Review, Confirmed, Dismissed, Escalated |
| Severity | Checkbox group | Critical, High, Medium, Low |
| Customer | Dropdown | All, Pfizer, Novartis, Roche |
| Source | Checkbox group | Voice, SMS, Email |
| Assigned Reviewer | Dropdown | All, Sarah Chen, James Rodriguez, Unassigned |
| Program | Dropdown | All, Oncology - Tecentriq, Cardiology - Eliquis, Immunology - Cosentyx, Oncology - Avastin, Oncology - Ibrance |

Filters update the case table in real-time (JavaScript filtering of mock data).

### 4.3 Summary Bar

A horizontal strip above the table showing:

- Total cases count
- Breakdown by severity (colored badges with count)
- "X cases need attention" callout for New + Critical

### 4.4 Case Table

#### Columns

| Column | Width | Content | Sortable |
| --- | --- | --- | --- |
| Severity | 80px | Severity badge (CRITICAL/HIGH/MEDIUM/LOW) | Yes |
| Case ID | 100px | Format: `PC-2026-0001` | Yes |
| Customer | 100px | Pharma company name (Pfizer, Novartis, Roche) | Yes |
| Patient | 120px | Patient initials + age/sex (e.g., "J.M., 67M") | No |
| Drug | 140px | Drug name (e.g., "Tecentriq (atezolizumab)") | Yes |
| Source | 80px | Conversation channel icon + label (Voice, SMS, Email) | Yes |
| Flagged Event | 200px | Brief AE description (truncated to 1 line) | No |
| Confidence | 80px | Confidence score with colored indicator | Yes |
| Time Waiting | 90px | Time since AI flagged the case (e.g., "2h 14m"). Red text if >4 hours with no reviewer action | Yes |
| SLA | 100px | Days remaining in FDA 15-day window with urgency coloring | Yes |
| Reviewer | 120px | Assigned reviewer name or "Unassigned" | Yes |
| Status | 100px | Status badge | Yes |

#### Row Behavior

- Hovering a row highlights it with a light teal background
- Clicking a row navigates to `case-detail.html?id=<case_id>`
- Critical severity rows have a subtle left border accent in red
- Rows are sorted by default: Severity (Critical first) then SLA (most urgent first)

### 4.5 Interactions

| Action | Behavior |
| --- | --- |
| Click row | Navigate to Case Detail View for that case |
| Click column header | Sort table by that column (toggle asc/desc) |
| Toggle filter checkbox | Filter table rows in real-time |
| Click "Assign to me" (on unassigned rows) | Update reviewer to current user, change status to "In Review" |

---

## 5. Case Detail View (`case-detail.html`)

### 5.1 Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Navigation Header                                               │
├─────────────────────────────────────────────────────────────────┤
│ ← Back to Triage Queue          Case PC-2026-0003  [CRITICAL]  │
├──────────────────────────────┬──────────────────────────────────┤
│ Left Panel (60%)             │ Right Panel (40%)                │
│                              │                                  │
│ ┌──────────────────────────┐ │ ┌──────────────────────────────┐ │
│ │ Case Summary Card        │ │ │ MedWatch Fields              │ │
│ │ Patient | Drug | Event   │ │ │ (Pre-filled, editable)       │ │
│ │ Severity | Confidence    │ │ │                              │ │
│ │ SLA Countdown            │ │ │ Patient Name: [J. Martinez]  │ │
│ └──────────────────────────┘ │ │ Age/Sex: [67/M]              │ │
│                              │ │ Drug: [Keytruda]             │ │
│ ┌──────────────────────────┐ │ │ Reaction: [Grade 2 rash]     │ │
│ │ Transcript Viewer        │ │ │ Onset Date: [2026-05-08]     │ │
│ │                          │ │ │ Reporter: [AI-Agent]         │ │
│ │ [Full transcript with    │ │ └──────────────────────────────┘ │
│ │  highlighted AE segment] │ │                                  │
│ │                          │ │ ┌──────────────────────────────┐ │
│ └──────────────────────────┘ │ │ AI Model Reasoning           │ │
│                              │ │                              │ │
│ ┌──────────────────────────┐ │ │ Why flagged: [explanation]   │ │
│ │ Audio Player             │ │ │ Confidence: 94%              │ │
│ │ [▶ 00:00 ━━━━━━━ 12:34] │ │ │ Signals detected: 3         │ │
│ └──────────────────────────┘ │ │ Model version: v2.1.4        │ │
│                              │ └──────────────────────────────┘ │
│ ┌──────────────────────────┐ │                                  │
│ │ Decision Actions         │ │ ┌──────────────────────────────┐ │
│ │ [Confirm AE] [Dismiss]   │ │ │ Audit Trail                  │ │
│ │ [Escalate]               │ │ │                              │ │
│ └──────────────────────────┘ │ │ 10:32 AI flagged case        │ │
│                              │ │ 10:45 Assigned to S. Chen    │ │
│                              │ │ 11:02 Reviewer opened case   │ │
│                              │ └──────────────────────────────┘ │
└──────────────────────────────┴──────────────────────────────────┘
```

### 5.2 Case Summary Card (Sticky)

A horizontal card at the top of the left panel. **This card is sticky** (`position: sticky; top: 0`) — it remains visible as the reviewer scrolls through the transcript below. This ensures the case context (patient, drug, severity, SLA) is always in view during review.

| Field | Display |
| --- | --- |
| Case ID | `PC-2026-0003` |
| Customer | Pharma company name (e.g., "Roche") |
| Patient | Initials, age, sex |
| Drug | Drug name (brand + generic) |
| Source | Conversation channel (e.g., "Voice Call") |
| Flagged Event | Brief AE description |
| Severity | Color-coded badge |
| Confidence | Score with colored indicator |
| Time Waiting | Time since AI flagged (urgency-colored if >4 hours) |
| SLA Countdown | Urgency-colored countdown |
| Status | Current status badge |
| Assigned Reviewer | Name + role |

### 5.3 Transcript Viewer

A scrollable panel showing the full conversation transcript:

- Each speaker turn is labeled: **Agent** (blue) or **Patient** (gray)
- The AI-flagged segment is highlighted with a yellow/amber background and a left border accent
- A "Jump to flagged segment" button at the top scrolls to the highlighted section
- Timestamps shown for each turn (e.g., `[02:34]`)
- The flagged segment has a tooltip: "AI detected potential adverse event here"

### 5.4 Audio Player

A simple audio player bar (visual only — no actual audio):

- Play/pause button
- Progress bar with current time / total time
- "Jump to detection" button that moves the playhead to the flagged timestamp
- Waveform visualization (decorative, static)
- Display: `▶ 02:34 / 12:47 — Jump to 02:34 (flagged segment)`

### 5.5 MedWatch Fields (Right Panel)

Pre-filled form fields extracted by the AI model. All fields are editable by the reviewer.

| Field | Pre-filled Value | Type |
| --- | --- | --- |
| Patient Name | Initials only (e.g., "J.M.") | Text input |
| Age | e.g., "67" | Number input |
| Sex | e.g., "Male" | Dropdown |
| Drug Name | Brand + generic (e.g., "Tecentriq (atezolizumab)") | Text input |
| Dose | e.g., "1200mg IV q3w" | Text input |
| Reaction / Event | e.g., "Grade 2 maculopapular rash" | Textarea |
| Onset Date | e.g., "2026-05-08" | Date input |
| Outcome | Dropdown: Recovering, Recovered, Not recovered, Fatal, Unknown | Dropdown |
| Reporter Type | e.g., "AI-Agent (voice call)" | Text input (read-only) |
| Report Source | e.g., "Patient support call — benefits verification" | Text input (read-only) |

Each field shows a small "AI-extracted" label with a link icon indicating the source transcript segment.

### 5.6 AI Model Reasoning Card

| Field | Content |
| --- | --- |
| Why Flagged | Plain-language explanation (e.g., "Patient reported new skin rash after third infusion cycle. Mention of 'itchy bumps all over arms' aligns with known dermatologic AE profile for atezolizumab (Tecentriq).") |
| Confidence Score | Percentage with colored bar |
| Signals Detected | Count + list (e.g., "3 signals: symptom mention, temporal association, drug-event correlation") |
| Model Version | e.g., "PharCovAI AE-Detect v2.1.4" |
| Analysis Time | e.g., "Flagged 18 minutes after ingestion" |

### 5.7 Decision Actions

Three action buttons at the bottom of the left panel:

| Button | Style | Behavior |
| --- | --- | --- |
| **Confirm AE** | Primary (teal, filled) | Shows confirmation dialog: "Confirm this as a reportable adverse event? MedWatch fields will be finalized." → Updates status to CONFIRMED, adds to audit trail |
| **Dismiss** | Secondary (outlined) | Shows dismissal dialog with required rationale: dropdown (Not an AE / Duplicate / Insufficient evidence / Other) + optional free text → Updates status to DISMISSED, adds to audit trail |
| **Escalate** | Warning (orange, outlined) | Shows escalation dialog: "Escalate to senior reviewer for second opinion?" + optional note → Updates status to ESCALATED, adds to audit trail |

After any decision, the buttons are replaced with a decision summary showing what was chosen, by whom, and when.

### 5.8 Audit Trail (Right Panel)

A reverse-chronological list of all actions taken on this case:

| Timestamp | Event | User |
| --- | --- | --- |
| 2026-05-10 11:02 | Reviewer opened case | Sarah Chen |
| 2026-05-10 10:45 | Case assigned to reviewer | System |
| 2026-05-10 10:32 | AI flagged potential AE (94% confidence) | PharCovAI v2.1.4 |
| 2026-05-10 10:14 | Conversation ingested | System |
| 2026-05-10 09:47 | Call completed | Voice System |

Each entry shows: timestamp, event description, and actor (user name, "System", or model version).

---

## 6. Mock Data

### 6.1 Case List (10 cases)

| Case ID | Customer | Patient | Drug | Source | Flagged Event | Severity | Confidence | Time Waiting | SLA Remaining | Reviewer | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PC-2026-0001 | Pfizer | A.K., 54F | Xeljanz (tofacitinib) | Voice | Patient reported persistent headaches and dizziness after dose increase | Critical | 96% | 1h 42m | 3d 2h | Sarah Chen | In Review |
| PC-2026-0002 | Pfizer | R.S., 71M | Eliquis (apixaban) | Voice | Mentioned blood in stool during follow-up call | Critical | 98% | 5h 10m | 1d 8h | Unassigned | New |
| PC-2026-0003 | Roche | J.M., 67M | Tecentriq (atezolizumab) | Voice | New skin rash reported after third infusion cycle | Critical | 94% | 0h 28m | 5d 12h | Sarah Chen | In Review |
| PC-2026-0004 | Novartis | L.T., 45F | Cosentyx (secukinumab) | SMS | Reported severe nausea and vomiting lasting 3 days | High | 89% | 2h 05m | 8d 4h | James Rodriguez | In Review |
| PC-2026-0005 | Pfizer | M.P., 62M | Ibrance (palbociclib) | Voice | Patient mentioned bruising easily, concerned about bleeding | High | 82% | 6h 33m | 10d 6h | Unassigned | New |
| PC-2026-0006 | Roche | S.W., 38F | Ocrevus (ocrelizumab) | Voice | Infusion-related reaction with flushing and throat tightness | High | 85% | 3h 17m | 7d 1h | Sarah Chen | New |
| PC-2026-0007 | Novartis | D.L., 73M | Entresto (sacubitril/valsartan) | Email | Reported frequent dizziness and low blood pressure episodes | Medium | 71% | 1h 55m | 12d 3h | James Rodriguez | In Review |
| PC-2026-0008 | Roche | K.B., 29F | Avastin (bevacizumab) | Voice | Nosebleeds and slow wound healing after treatment | Medium | 68% | 4h 22m | 13d 0h | Unassigned | New |
| PC-2026-0009 | Novartis | T.N., 56M | Kisqali (ribociclib) | Voice | Fatigue and decreased appetite, possibly treatment-related | Medium | 65% | 0h 45m | 11d 5h | Sarah Chen | Confirmed |
| PC-2026-0010 | Pfizer | E.G., 42F | Paxlovid (nirmatrelvir/ritonavir) | SMS | Mentioned mild metallic taste, resolved on its own | Low | 45% | 1h 12m | 14d 2h | James Rodriguez | Dismissed |

### 6.2 Detailed Case (for Case Detail View)

**Case PC-2026-0003** (Roche — Tecentriq) is the primary demo case:

**Transcript excerpt:**

```
[00:00] Agent: Thank you for calling the Company Patient Support
        for Roche. How can I help you today?

[00:08] Patient: Hi, yes, I'm calling about my Tecentriq treatment.
        I had my third infusion last Tuesday and I've been having
        some issues since then.

[00:18] Agent: I'm sorry to hear that. Can you tell me more about
        what you've been experiencing?

[00:24] Patient: Well, about two days after the infusion, I started
        getting these itchy bumps all over my arms. And now it's
        spread to my chest and back too. It's really uncomfortable.

[00:38] Agent: I understand. How would you describe the rash?
        Is it raised bumps, flat spots, or something else?

[00:45] Patient: It's like raised red bumps, some of them are kind
        of blotchy. My wife says it looks like hives but it hasn't
        gone away. It's been about five days now.

[00:58] Agent: Thank you for describing that. Have you experienced
        any other symptoms? Any fever, difficulty breathing, or
        swelling?

[01:06] Patient: No fever or breathing problems, thankfully.
        Just the rash and it's really itchy. I've been using
        calamine lotion but it's not helping much.

[01:15] Agent: I want to make sure we document this properly.
        Have you contacted your oncologist about the rash?

[01:22] Patient: I called the nurse line yesterday and they said
        to keep an eye on it and call back if it gets worse.
        They mentioned it might be an immune-related reaction.

[01:33] Agent: That's helpful to know. I'm going to note this
        in your file. The medical team will want to review this
        before your next scheduled infusion. Is there anything
        else I can help you with today?

[01:45] Patient: No, that's it. I just wanted to make sure
        someone knew about it. Thank you.

[01:50] Agent: Of course. We'll make sure this is flagged for
        your care team. Thank you for calling, and please don't
        hesitate to reach out if the rash worsens.
```

**Flagged segment:** Lines [00:24] through [00:45] — highlighted in the transcript viewer.

**AI reasoning:** "Patient reported new skin rash (itchy raised bumps on arms, chest, back) beginning 2 days after third Tecentriq infusion. Duration: 5 days, ongoing. Consistent with known immune-mediated dermatologic adverse event profile for atezolizumab. Nurse line assessment referenced possible immune-related reaction. 3 signals: symptom description, temporal association with infusion, healthcare provider acknowledgment."

---

## 7. Interactions

### 7.1 Page Navigation

| Action | Behavior |
| --- | --- |
| Click "Triage Queue" in nav | Navigate to `triage-queue.html` |
| Click "Case Detail" in nav | Navigate to `case-detail.html` (loads default case PC-2026-0003) |
| Click a case row in triage queue | Navigate to `case-detail.html?id=<case_id>` |
| Click "← Back to Triage Queue" in case detail | Navigate to `triage-queue.html` |

### 7.2 Triage Queue Interactions

| Action | Behavior |
| --- | --- |
| Click column header | Sort table by that column, toggle asc/desc, show sort arrow |
| Toggle filter checkbox | Show/hide matching rows with a fade transition |
| Hover row | Light teal background highlight |
| Click "Assign to me" | Change reviewer to "Sarah Chen", status to "In Review", show brief toast notification |

### 7.3 Case Detail Interactions

| Action | Behavior |
| --- | --- |
| Click "Jump to flagged segment" | Smooth-scroll transcript to highlighted section |
| Click "Jump to detection" on audio player | Move playhead indicator to flagged timestamp |
| Edit MedWatch field | Field becomes editable, shows "Modified" indicator |
| Click "Confirm AE" | Show modal → on confirm, update status badge to CONFIRMED, add audit trail entry, replace buttons with decision summary |
| Click "Dismiss" | Show modal with rationale dropdown (required) → on submit, update status to DISMISSED, add audit trail entry with rationale |
| Click "Escalate" | Show modal with note field → on submit, update status to ESCALATED, add audit trail entry |

### 7.4 Modal Dialogs

All decision modals follow the same pattern:

```
┌─────────────────────────────────────┐
│ [Action Title]                   ✕  │
├─────────────────────────────────────┤
│                                     │
│ [Confirmation message]              │
│                                     │
│ [Optional input fields]             │
│                                     │
├─────────────────────────────────────┤
│              [Cancel]  [Confirm]    │
└─────────────────────────────────────┘
```

- Background overlay dims the page
- Modal is centered, 480px max width
- Cancel closes without action
- Confirm executes the action and closes

---

## 8. File Structure

```
demo/
├── requirements.md          ← This file
├── triage-queue.html        ← Triage Queue page
├── case-detail.html         ← Case Detail View page
├── css/
│   └── styles.css           ← Shared styles, design system, components
├── js/
│   ├── data.js              ← Mock case data (JSON)
│   ├── triage.js            ← Triage queue logic (sort, filter, navigation)
│   └── case-detail.js       ← Case detail logic (decisions, modals, audit trail)
└── assets/
    └── logo.svg             ← the Company logo (text-based)
```

### Dependencies

- **None** — pure HTML/CSS/JS, no frameworks, no build step
- Font: Inter via Google Fonts CDN (`<link>` in HTML head)
- Icons: Inline SVG or Unicode characters (no icon library dependency)

### How to Run

Open `triage-queue.html` in any modern browser. No server required.
