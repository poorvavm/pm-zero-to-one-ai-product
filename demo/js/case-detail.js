let caseData = DETAILED_CASE;
let isPlaying = false;
let decisionMade = false;

function init() {
  const params = new URLSearchParams(window.location.search);
  const caseId = params.get("id");
  if (caseId && caseId !== DETAILED_CASE.id) {
    const found = CASES.find(c => c.id === caseId);
    if (found) {
      caseData = { ...DETAILED_CASE, ...found, medwatch: DETAILED_CASE.medwatch, reasoning: DETAILED_CASE.reasoning, transcript: DETAILED_CASE.transcript, auditTrail: DETAILED_CASE.auditTrail };
    }
  }

  renderSummary();
  renderTranscript();
  renderMedWatch();
  renderReasoning();
  renderAuditTrail();
}

function renderSummary() {
  const c = caseData;
  const el = document.getElementById("case-summary");
  el.innerHTML = `
    <div class="case-summary-field">
      <span class="case-summary-label">Case ID</span>
      <span class="case-summary-value">${c.id}</span>
    </div>
    <div class="case-summary-field">
      <span class="case-summary-label">Customer</span>
      <span class="case-summary-value">${c.customer}</span>
    </div>
    <div class="case-summary-field">
      <span class="case-summary-label">Patient</span>
      <span class="case-summary-value">${c.patient.initials}, ${c.patient.age}${c.patient.sex}</span>
    </div>
    <div class="case-summary-field">
      <span class="case-summary-label">Drug</span>
      <span class="case-summary-value">${c.drug.brand}</span>
    </div>
    <div class="case-summary-field">
      <span class="case-summary-label">Source</span>
      <span class="case-summary-value"><span class="source-badge">${SOURCE_ICONS[c.source]} ${c.source}</span></span>
    </div>
    <div class="case-summary-field">
      <span class="case-summary-label">Severity</span>
      <span class="badge badge-${c.severity}">${SEVERITY_LABELS[c.severity]}</span>
    </div>
    <div class="case-summary-field">
      <span class="case-summary-label">Confidence</span>
      <span class="case-summary-value">${c.confidence}%</span>
    </div>
    <div class="case-summary-field">
      <span class="case-summary-label">SLA</span>
      <span class="sla ${getSlaClass(c.slaDays || 5.5)}">${c.slaRemaining}</span>
    </div>
    <div class="case-summary-field">
      <span class="case-summary-label">Status</span>
      <span class="badge badge-${c.status}" id="status-badge">${STATUS_LABELS[c.status]}</span>
    </div>
  `;
}

function renderTranscript() {
  const el = document.getElementById("transcript-body");
  el.innerHTML = caseData.transcript.map(turn => {
    const flaggedClass = turn.flagged ? " flagged" : "";
    const flagLabel = turn.flagged ? `<div class="flagged-label">&#9888; AI detected potential adverse event</div>` : "";
    return `
      <div class="transcript-turn${flaggedClass}" ${turn.flagged ? 'id="flagged-segment"' : ""}>
        ${flagLabel}
        <span class="transcript-timestamp">[${turn.time}]</span>
        <span class="transcript-speaker ${turn.speaker}">${turn.speaker === "agent" ? "Agent" : "Patient"}</span>
        <span class="transcript-text">${turn.text}</span>
      </div>
    `;
  }).join("");
}

function renderMedWatch() {
  const mw = caseData.medwatch;
  const fields = [
    { label: "Patient Name", key: "patientName", type: "text" },
    { label: "Age", key: "age", type: "number" },
    { label: "Sex", key: "sex", type: "select", options: ["Male", "Female", "Unknown"] },
    { label: "Drug Name", key: "drugName", type: "text" },
    { label: "Dose", key: "dose", type: "text" },
    { label: "Reaction / Event", key: "reaction", type: "textarea" },
    { label: "Onset Date", key: "onsetDate", type: "date" },
    { label: "Outcome", key: "outcome", type: "select", options: ["Recovering", "Recovered", "Not recovered", "Fatal", "Unknown"] },
    { label: "Reporter Type", key: "reporterType", type: "text", readonly: true },
    { label: "Report Source", key: "reportSource", type: "text", readonly: true }
  ];

  const el = document.getElementById("medwatch-form");
  el.innerHTML = fields.map(f => {
    const ro = f.readonly ? "readonly" : "";
    const aiTag = `<span class="ai-tag">AI-extracted</span>`;
    let input;

    if (f.type === "textarea") {
      input = `<textarea class="form-textarea" ${ro} oninput="markModified(this)">${mw[f.key]}</textarea>`;
    } else if (f.type === "select") {
      const opts = f.options.map(o => `<option ${o === String(mw[f.key]) ? "selected" : ""}>${o}</option>`).join("");
      input = `<select class="form-select" ${ro} onchange="markModified(this)">${opts}</select>`;
    } else {
      input = `<input class="form-input" type="${f.type}" value="${mw[f.key]}" ${ro} oninput="markModified(this)">`;
    }

    return `
      <div class="form-field">
        <label class="form-label">${f.label} ${aiTag}</label>
        ${input}
      </div>
    `;
  }).join("");
}

function renderReasoning() {
  const r = caseData.reasoning;
  const el = document.getElementById("reasoning-body");
  el.innerHTML = `
    <div class="reasoning-text">${r.explanation}</div>
    <div class="reasoning-signals">
      <h4 class="mt-2 mb-2">Signals Detected (${r.signals.length})</h4>
      ${r.signals.map(s => `
        <div class="reasoning-signal">
          <span class="reasoning-signal-dot"></span>
          <span>${s}</span>
        </div>
      `).join("")}
    </div>
    <div class="mt-4 flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <span class="text-secondary text-sm">Model Version</span>
        <span class="text-sm font-medium">${r.modelVersion}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-secondary text-sm">Analysis Time</span>
        <span class="text-sm font-medium">${r.analysisTime}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-secondary text-sm">Confidence</span>
        <div class="confidence">
          <span class="font-semibold">${caseData.confidence}%</span>
          <div class="confidence-bar" style="width:60px">
            <div class="confidence-fill ${getConfidenceClass(caseData.confidence)}" style="width:${caseData.confidence}%"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAuditTrail() {
  const el = document.getElementById("audit-trail");
  el.innerHTML = caseData.auditTrail.map((entry, i) => `
    <div class="audit-entry">
      <span class="audit-dot" ${i === 0 ? 'style="background: var(--color-accent)"' : ""}></span>
      <span class="audit-time">${entry.time.split(" ")[1]}</span>
      <span class="audit-event">${entry.event}</span>
      <span class="audit-actor">${entry.actor}</span>
    </div>
  `).join("");
}

function addAuditEntry(event, actor) {
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  caseData.auditTrail.unshift({ time: timeStr, event, actor });
  renderAuditTrail();
}

function jumpToFlagged() {
  const el = document.getElementById("flagged-segment");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.style.transition = "box-shadow 300ms";
    el.style.boxShadow = "0 0 0 3px rgba(234, 88, 12, 0.4)";
    setTimeout(() => { el.style.boxShadow = "none"; }, 2000);
  }
}

function jumpToDetection() {
  const fill = document.getElementById("audio-fill");
  fill.style.transition = "width 500ms ease";
  fill.style.width = "19%";
  jumpToFlagged();
}

function togglePlay() {
  isPlaying = !isPlaying;
  document.getElementById("play-btn").innerHTML = isPlaying ? "&#9646;&#9646;" : "&#9654;";
}

function markModified(el) {
  el.classList.add("form-modified");
  const field = el.closest(".form-field");
  if (!field.querySelector(".modified-indicator")) {
    const indicator = document.createElement("span");
    indicator.className = "modified-indicator";
    indicator.textContent = "Modified";
    field.querySelector(".form-label").appendChild(indicator);
  }
}

function showModal(type) {
  if (decisionMade) return;

  const overlay = document.getElementById("modal-overlay");
  const title = document.getElementById("modal-title");
  const body = document.getElementById("modal-body");
  const footer = document.getElementById("modal-footer");

  if (type === "confirm") {
    title.textContent = "Confirm Adverse Event";
    body.innerHTML = `<p>Confirm this as a reportable adverse event? MedWatch fields will be finalized and an audit-ready export package will be generated.</p>`;
    footer.innerHTML = `
      <button class="btn btn-ghost" onclick="hideModal()">Cancel</button>
      <button class="btn btn-primary" onclick="executeDecision('confirmed', 'AE confirmed — MedWatch package generated')">Confirm AE</button>
    `;
  } else if (type === "dismiss") {
    title.textContent = "Dismiss Case";
    body.innerHTML = `
      <p class="mb-4">Provide a rationale for dismissing this case. This will be recorded in the audit trail.</p>
      <div class="form-field">
        <label class="form-label">Reason</label>
        <select class="form-select" id="dismiss-reason">
          <option value="">Select a reason...</option>
          <option>Not an adverse event</option>
          <option>Duplicate case</option>
          <option>Insufficient evidence</option>
          <option>Other</option>
        </select>
      </div>
      <div class="form-field mt-2">
        <label class="form-label">Additional notes (optional)</label>
        <textarea class="form-textarea" id="dismiss-notes" placeholder="Add context for the audit trail..."></textarea>
      </div>
    `;
    footer.innerHTML = `
      <button class="btn btn-ghost" onclick="hideModal()">Cancel</button>
      <button class="btn btn-danger" onclick="executeDismiss()">Dismiss Case</button>
    `;
  } else if (type === "escalate") {
    title.textContent = "Escalate to Senior Reviewer";
    body.innerHTML = `
      <p class="mb-4">Escalate this case for a second opinion from a senior reviewer.</p>
      <div class="form-field">
        <label class="form-label">Note for senior reviewer (optional)</label>
        <textarea class="form-textarea" id="escalate-notes" placeholder="Describe why you're escalating..."></textarea>
      </div>
    `;
    footer.innerHTML = `
      <button class="btn btn-ghost" onclick="hideModal()">Cancel</button>
      <button class="btn btn-warning" onclick="executeDecision('escalated', 'Case escalated to senior reviewer')">Escalate</button>
    `;
  }

  overlay.classList.add("active");
}

function hideModal() {
  document.getElementById("modal-overlay").classList.remove("active");
}

function closeModal(event) {
  if (event.target === document.getElementById("modal-overlay")) {
    hideModal();
  }
}

function executeDecision(newStatus, auditMessage) {
  decisionMade = true;
  caseData.status = newStatus;
  hideModal();

  addAuditEntry(auditMessage, "Sarah Chen");

  document.getElementById("status-badge").className = `badge badge-${newStatus}`;
  document.getElementById("status-badge").textContent = STATUS_LABELS[newStatus];

  const actionsEl = document.getElementById("decision-actions");
  const icons = { confirmed: "&#10003;", dismissed: "&#10005;", escalated: "&#8679;" };
  const colors = { confirmed: "var(--color-success)", dismissed: "var(--color-text-secondary)", escalated: "var(--color-warning)" };

  actionsEl.innerHTML = `
    <div class="decision-summary" style="border-left: 4px solid ${colors[newStatus]}; width: 100%;">
      <span class="decision-summary-icon">${icons[newStatus]}</span>
      <div>
        <div class="decision-summary-text">${auditMessage}</div>
        <div class="decision-summary-meta">By Sarah Chen &middot; Just now</div>
      </div>
    </div>
  `;

  showToast(`Case ${caseData.id}: ${STATUS_LABELS[newStatus]}`);
}

function executeDismiss() {
  const reason = document.getElementById("dismiss-reason").value;
  if (!reason) {
    document.getElementById("dismiss-reason").style.borderColor = "var(--color-danger)";
    return;
  }
  const notes = document.getElementById("dismiss-notes").value;
  const auditMsg = `Case dismissed — ${reason}${notes ? ": " + notes : ""}`;
  executeDecision("dismissed", auditMsg);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

document.addEventListener("DOMContentLoaded", init);
