const CASES = [
  {
    id: "PC-2026-0001",
    customer: "Pfizer",
    patient: { initials: "A.K.", age: 54, sex: "F" },
    drug: { brand: "Xeljanz", generic: "tofacitinib" },
    source: "Voice",
    event: "Patient reported persistent headaches and dizziness after dose increase",
    severity: "critical",
    confidence: 96,
    timeWaiting: "1h 42m",
    timeWaitingMinutes: 102,
    slaRemaining: "3d 2h",
    slaDays: 3.08,
    reviewer: "Sarah Chen",
    status: "review",
    program: "Immunology"
  },
  {
    id: "PC-2026-0002",
    customer: "Pfizer",
    patient: { initials: "R.S.", age: 71, sex: "M" },
    drug: { brand: "Eliquis", generic: "apixaban" },
    source: "Voice",
    event: "Mentioned blood in stool during follow-up call",
    severity: "critical",
    confidence: 98,
    timeWaiting: "5h 10m",
    timeWaitingMinutes: 310,
    slaRemaining: "1d 8h",
    slaDays: 1.33,
    reviewer: null,
    status: "new",
    program: "Cardiology"
  },
  {
    id: "PC-2026-0003",
    customer: "Roche",
    patient: { initials: "J.M.", age: 67, sex: "M" },
    drug: { brand: "Tecentriq", generic: "atezolizumab" },
    source: "Voice",
    event: "New skin rash reported after third infusion cycle",
    severity: "critical",
    confidence: 94,
    timeWaiting: "0h 28m",
    timeWaitingMinutes: 28,
    slaRemaining: "5d 12h",
    slaDays: 5.5,
    reviewer: "Sarah Chen",
    status: "review",
    program: "Oncology"
  },
  {
    id: "PC-2026-0004",
    customer: "Novartis",
    patient: { initials: "L.T.", age: 45, sex: "F" },
    drug: { brand: "Cosentyx", generic: "secukinumab" },
    source: "SMS",
    event: "Reported severe nausea and vomiting lasting 3 days",
    severity: "high",
    confidence: 89,
    timeWaiting: "2h 05m",
    timeWaitingMinutes: 125,
    slaRemaining: "8d 4h",
    slaDays: 8.17,
    reviewer: "James Rodriguez",
    status: "review",
    program: "Immunology"
  },
  {
    id: "PC-2026-0005",
    customer: "Pfizer",
    patient: { initials: "M.P.", age: 62, sex: "M" },
    drug: { brand: "Ibrance", generic: "palbociclib" },
    source: "Voice",
    event: "Patient mentioned bruising easily, concerned about bleeding",
    severity: "high",
    confidence: 82,
    timeWaiting: "6h 33m",
    timeWaitingMinutes: 393,
    slaRemaining: "10d 6h",
    slaDays: 10.25,
    reviewer: null,
    status: "new",
    program: "Oncology"
  },
  {
    id: "PC-2026-0006",
    customer: "Roche",
    patient: { initials: "S.W.", age: 38, sex: "F" },
    drug: { brand: "Ocrevus", generic: "ocrelizumab" },
    source: "Voice",
    event: "Infusion-related reaction with flushing and throat tightness",
    severity: "high",
    confidence: 85,
    timeWaiting: "3h 17m",
    timeWaitingMinutes: 197,
    slaRemaining: "7d 1h",
    slaDays: 7.04,
    reviewer: "Sarah Chen",
    status: "new",
    program: "Immunology"
  },
  {
    id: "PC-2026-0007",
    customer: "Novartis",
    patient: { initials: "D.L.", age: 73, sex: "M" },
    drug: { brand: "Entresto", generic: "sacubitril/valsartan" },
    source: "Email",
    event: "Reported frequent dizziness and low blood pressure episodes",
    severity: "medium",
    confidence: 71,
    timeWaiting: "1h 55m",
    timeWaitingMinutes: 115,
    slaRemaining: "12d 3h",
    slaDays: 12.13,
    reviewer: "James Rodriguez",
    status: "review",
    program: "Cardiology"
  },
  {
    id: "PC-2026-0008",
    customer: "Roche",
    patient: { initials: "K.B.", age: 29, sex: "F" },
    drug: { brand: "Avastin", generic: "bevacizumab" },
    source: "Voice",
    event: "Nosebleeds and slow wound healing after treatment",
    severity: "medium",
    confidence: 68,
    timeWaiting: "4h 22m",
    timeWaitingMinutes: 262,
    slaRemaining: "13d 0h",
    slaDays: 13,
    reviewer: null,
    status: "new",
    program: "Oncology"
  },
  {
    id: "PC-2026-0009",
    customer: "Novartis",
    patient: { initials: "T.N.", age: 56, sex: "M" },
    drug: { brand: "Kisqali", generic: "ribociclib" },
    source: "Voice",
    event: "Fatigue and decreased appetite, possibly treatment-related",
    severity: "medium",
    confidence: 65,
    timeWaiting: "0h 45m",
    timeWaitingMinutes: 45,
    slaRemaining: "11d 5h",
    slaDays: 11.21,
    reviewer: "Sarah Chen",
    status: "confirmed",
    program: "Oncology"
  },
  {
    id: "PC-2026-0010",
    customer: "Pfizer",
    patient: { initials: "E.G.", age: 42, sex: "F" },
    drug: { brand: "Paxlovid", generic: "nirmatrelvir/ritonavir" },
    source: "SMS",
    event: "Mentioned mild metallic taste, resolved on its own",
    severity: "low",
    confidence: 45,
    timeWaiting: "1h 12m",
    timeWaitingMinutes: 72,
    slaRemaining: "14d 2h",
    slaDays: 14.08,
    reviewer: "James Rodriguez",
    status: "dismissed",
    program: "Infectious Disease"
  }
];

const DETAILED_CASE = {
  id: "PC-2026-0003",
  customer: "Roche",
  patient: { initials: "J.M.", age: 67, sex: "M" },
  drug: { brand: "Tecentriq", generic: "atezolizumab", dose: "1200mg IV q3w" },
  source: "Voice",
  event: "New skin rash reported after third infusion cycle",
  severity: "critical",
  confidence: 94,
  timeWaiting: "0h 28m",
  slaRemaining: "5d 12h",
  reviewer: "Sarah Chen",
  status: "review",
  program: "Oncology",

  medwatch: {
    patientName: "J.M.",
    age: 67,
    sex: "Male",
    drugName: "Tecentriq (atezolizumab)",
    dose: "1200mg IV q3w",
    reaction: "Grade 2 maculopapular rash",
    onsetDate: "2026-05-08",
    outcome: "Not recovered",
    reporterType: "AI-Agent (voice call)",
    reportSource: "Patient support call — benefits verification"
  },

  reasoning: {
    explanation: "Patient reported new skin rash (itchy raised bumps on arms, chest, back) beginning 2 days after third Tecentriq infusion. Duration: 5 days, ongoing. Consistent with known immune-mediated dermatologic adverse event profile for atezolizumab. Nurse line assessment referenced possible immune-related reaction.",
    signals: [
      "Symptom description matches known AE profile",
      "Temporal association with infusion (onset 2 days post-treatment)",
      "Healthcare provider acknowledgment of possible immune-related reaction"
    ],
    modelVersion: "PharCovAI AE-Detect v2.1.4",
    analysisTime: "Flagged 18 minutes after ingestion"
  },

  transcript: [
    { time: "00:00", speaker: "agent", text: "Thank you for calling the platform Patient Support for Roche. How can I help you today?" },
    { time: "00:08", speaker: "patient", text: "Hi, yes, I'm calling about my Tecentriq treatment. I had my third infusion last Tuesday and I've been having some issues since then." },
    { time: "00:18", speaker: "agent", text: "I'm sorry to hear that. Can you tell me more about what you've been experiencing?" },
    { time: "00:24", speaker: "patient", text: "Well, about two days after the infusion, I started getting these itchy bumps all over my arms. And now it's spread to my chest and back too. It's really uncomfortable.", flagged: true },
    { time: "00:38", speaker: "agent", text: "I understand. How would you describe the rash? Is it raised bumps, flat spots, or something else?" },
    { time: "00:45", speaker: "patient", text: "It's like raised red bumps, some of them are kind of blotchy. My wife says it looks like hives but it hasn't gone away. It's been about five days now.", flagged: true },
    { time: "00:58", speaker: "agent", text: "Thank you for describing that. Have you experienced any other symptoms? Any fever, difficulty breathing, or swelling?" },
    { time: "01:06", speaker: "patient", text: "No fever or breathing problems, thankfully. Just the rash and it's really itchy. I've been using calamine lotion but it's not helping much." },
    { time: "01:15", speaker: "agent", text: "I want to make sure we document this properly. Have you contacted your oncologist about the rash?" },
    { time: "01:22", speaker: "patient", text: "I called the nurse line yesterday and they said to keep an eye on it and call back if it gets worse. They mentioned it might be an immune-related reaction." },
    { time: "01:33", speaker: "agent", text: "That's helpful to know. I'm going to note this in your file. The medical team will want to review this before your next scheduled infusion. Is there anything else I can help you with today?" },
    { time: "01:45", speaker: "patient", text: "No, that's it. I just wanted to make sure someone knew about it. Thank you." },
    { time: "01:50", speaker: "agent", text: "Of course. We'll make sure this is flagged for your care team. Thank you for calling, and please don't hesitate to reach out if the rash worsens." }
  ],

  auditTrail: [
    { time: "2026-05-10 11:02", event: "Reviewer opened case", actor: "Sarah Chen" },
    { time: "2026-05-10 10:45", event: "Case assigned to reviewer", actor: "System" },
    { time: "2026-05-10 10:32", event: "AI flagged potential AE (94% confidence)", actor: "PharCovAI v2.1.4" },
    { time: "2026-05-10 10:14", event: "Conversation ingested", actor: "System" },
    { time: "2026-05-10 09:47", event: "Call completed", actor: "Voice System" }
  ]
};

const SEVERITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };
const STATUS_LABELS = { new: "New", review: "In Review", confirmed: "Confirmed", dismissed: "Dismissed", escalated: "Escalated" };
const SEVERITY_LABELS = { critical: "Critical", high: "High", medium: "Medium", low: "Low" };
const SOURCE_ICONS = { Voice: "\u{1F4DE}", SMS: "\u{1F4AC}", Email: "\u{2709}️" };

function getConfidenceClass(score) {
  if (score >= 90) return "confidence-high";
  if (score >= 70) return "confidence-mid";
  if (score >= 50) return "confidence-low";
  return "confidence-vlow";
}

function getSlaClass(days) {
  if (days > 10) return "sla-safe";
  if (days > 5) return "sla-warning";
  if (days > 2) return "sla-urgent";
  return "sla-critical";
}

function getTimeWaitingClass(minutes) {
  return minutes > 240 ? "overdue" : "";
}
