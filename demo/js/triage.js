let currentSort = { key: "sla", direction: "asc" };
let filteredCases = [...CASES];

function init() {
  bindFilters();
  bindSort();
  applyFiltersAndSort();
}

function renderTable(cases) {
  const tbody = document.getElementById("case-table-body");
  tbody.innerHTML = cases.map(c => {
    const isCritical = c.severity === "critical" ? " row-critical" : "";
    const twClass = getTimeWaitingClass(c.timeWaitingMinutes);
    const reviewerDisplay = c.reviewer || `<span class="text-muted">Unassigned</span>`;
    const assignBtn = !c.reviewer
      ? `<button class="btn btn-sm btn-secondary assign-btn" data-id="${c.id}" onclick="event.stopPropagation(); assignToMe('${c.id}')">Assign to me</button>`
      : "";

    return `
      <tr class="${isCritical}" onclick="openCase('${c.id}')">
        <td><span class="badge badge-${c.severity}">${SEVERITY_LABELS[c.severity]}</span></td>
        <td class="font-medium">${c.id}</td>
        <td>${c.customer}</td>
        <td>${c.patient.initials}, ${c.patient.age}${c.patient.sex}</td>
        <td>${c.drug.brand}</td>
        <td><span class="source-badge"><span class="source-icon">${SOURCE_ICONS[c.source]}</span> ${c.source}</span></td>
        <td class="truncate" style="max-width:200px" title="${c.event}">${c.event}</td>
        <td>
          <div class="confidence">
            <span>${c.confidence}%</span>
            <div class="confidence-bar"><div class="confidence-fill ${getConfidenceClass(c.confidence)}" style="width:${c.confidence}%"></div></div>
          </div>
        </td>
        <td><span class="time-waiting ${twClass}">${c.timeWaiting}</span></td>
        <td><span class="sla ${getSlaClass(c.slaDays)}">${c.slaRemaining}</span></td>
        <td>${reviewerDisplay} ${assignBtn}</td>
        <td><span class="badge badge-${c.status}">${STATUS_LABELS[c.status]}</span></td>
      </tr>
    `;
  }).join("");
}

function renderSummary(cases) {
  const total = cases.length;
  const counts = { critical: 0, high: 0, medium: 0, low: 0 };
  let needAttention = 0;

  cases.forEach(c => {
    counts[c.severity]++;
    if (c.status === "new" && (c.severity === "critical" || c.severity === "high")) needAttention++;
  });

  const bar = document.getElementById("summary-bar");
  bar.innerHTML = `
    <div class="summary-stat">
      <span class="summary-stat-value">${total}</span>
      <span class="text-secondary">total cases</span>
    </div>
    <div class="summary-divider"></div>
    <div class="summary-stat"><span class="badge badge-critical">${counts.critical}</span> Critical</div>
    <div class="summary-stat"><span class="badge badge-high">${counts.high}</span> High</div>
    <div class="summary-stat"><span class="badge badge-medium">${counts.medium}</span> Medium</div>
    <div class="summary-stat"><span class="badge badge-low">${counts.low}</span> Low</div>
    ${needAttention > 0 ? `
      <div class="summary-alert">
        <span class="pulse-dot"></span>
        ${needAttention} case${needAttention > 1 ? "s" : ""} need${needAttention === 1 ? "s" : ""} attention
      </div>
    ` : ""}
  `;
}

function getActiveFilters() {
  const filters = { status: [], severity: [], source: [] };

  document.querySelectorAll("[data-filter]").forEach(cb => {
    if (cb.checked) {
      filters[cb.dataset.filter].push(cb.value);
    }
  });

  filters.customer = document.getElementById("filter-customer").value;
  filters.reviewer = document.getElementById("filter-reviewer").value;

  return filters;
}

function applyFiltersAndSort() {
  const filters = getActiveFilters();

  filteredCases = CASES.filter(c => {
    if (!filters.status.includes(c.status)) return false;
    if (!filters.severity.includes(c.severity)) return false;
    if (!filters.source.includes(c.source)) return false;
    if (filters.customer !== "all" && c.customer !== filters.customer) return false;
    if (filters.reviewer !== "all") {
      if (filters.reviewer === "unassigned" && c.reviewer !== null) return false;
      if (filters.reviewer !== "unassigned" && c.reviewer !== filters.reviewer) return false;
    }
    return true;
  });

  sortCases();
  renderTable(filteredCases);
  renderSummary(filteredCases);
}

function sortCases() {
  const { key, direction } = currentSort;
  const dir = direction === "asc" ? 1 : -1;

  filteredCases.sort((a, b) => {
    let valA, valB;

    switch (key) {
      case "severity":
        valA = SEVERITY_ORDER[a.severity];
        valB = SEVERITY_ORDER[b.severity];
        break;
      case "confidence":
        valA = a.confidence;
        valB = b.confidence;
        return (valB - valA) * dir;
      case "sla":
        valA = a.slaDays;
        valB = b.slaDays;
        break;
      case "timeWaiting":
        valA = a.timeWaitingMinutes;
        valB = b.timeWaitingMinutes;
        return (valB - valA) * dir;
      case "id":
        valA = a.id;
        valB = b.id;
        break;
      case "customer":
        valA = a.customer;
        valB = b.customer;
        break;
      case "drug":
        valA = a.drug.brand;
        valB = b.drug.brand;
        break;
      case "source":
        valA = a.source;
        valB = b.source;
        break;
      case "reviewer":
        valA = a.reviewer || "ZZZ";
        valB = b.reviewer || "ZZZ";
        break;
      case "status":
        valA = a.status;
        valB = b.status;
        break;
      default:
        return 0;
    }

    if (typeof valA === "string") {
      return valA.localeCompare(valB) * dir;
    }
    return (valA - valB) * dir;
  });
}

function bindFilters() {
  document.querySelectorAll("[data-filter]").forEach(cb => {
    cb.addEventListener("change", applyFiltersAndSort);
  });
  document.getElementById("filter-customer").addEventListener("change", applyFiltersAndSort);
  document.getElementById("filter-reviewer").addEventListener("change", applyFiltersAndSort);
}

function bindSort() {
  document.querySelectorAll("[data-sort]").forEach(th => {
    th.addEventListener("click", () => {
      const key = th.dataset.sort;
      if (currentSort.key === key) {
        currentSort.direction = currentSort.direction === "asc" ? "desc" : "asc";
      } else {
        currentSort = { key, direction: "asc" };
      }

      document.querySelectorAll("[data-sort]").forEach(el => el.classList.remove("sorted"));
      th.classList.add("sorted");
      th.querySelector(".sort-arrow").textContent = currentSort.direction === "asc" ? "▲" : "▼";

      applyFiltersAndSort();
    });
  });
}

function openCase(caseId) {
  window.location.href = `case-detail.html?id=${caseId}`;
}

function assignToMe(caseId) {
  const caseItem = CASES.find(c => c.id === caseId);
  if (caseItem) {
    caseItem.reviewer = "Sarah Chen";
    caseItem.status = "review";
    applyFiltersAndSort();
    showToast(`Case ${caseId} assigned to you`);
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

document.addEventListener("DOMContentLoaded", init);
