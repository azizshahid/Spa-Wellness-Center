AOS.init({ duration: 900, once: true, offset: 80 });

// Navbar scroll
window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 50);
});

// Hamburger
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// ── State ──
const state = {
  treatment: null,
  treatmentPrice: 0,
  duration: "60 min",
  therapist: null,
  date: null,
  time: null,
  addons: [],
  addonTotal: 0,
};

// ── Step navigation ──
function goToStep(n) {
  document
    .querySelectorAll(".booking-step")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById("step-" + n).classList.add("active");

  document.querySelectorAll(".step-pill").forEach((p) => {
    const num = parseInt(p.dataset.step);
    p.classList.remove("active", "done");
    if (num === n) p.classList.add("active");
    if (num < n) p.classList.add("done");
  });

  if (n === 5) populateReview();
  window.scrollTo({ top: 300, behavior: "smooth" });
}

// ── Treatment selection ──
function selectTreatment(el) {
  document
    .querySelectorAll(".treat-option")
    .forEach((o) => o.classList.remove("selected"));
  el.classList.add("selected");
  state.treatment = el.dataset.treatment;
  state.treatmentPrice = parseInt(el.dataset.price);
  updateSummary();
}

// ── Duration selection ──
function selectDuration(el, val) {
  document
    .querySelectorAll(".dur-chip")
    .forEach((c) => c.classList.remove("selected"));
  el.classList.add("selected");
  state.duration = val;
  document.getElementById("sum-duration").textContent = val;
  document.getElementById("sum-duration").classList.remove("empty");
}

// ── Therapist selection ──
function selectTherapist(el, name) {
  document
    .querySelectorAll(".therapist-card")
    .forEach((c) => c.classList.remove("selected"));
  el.classList.add("selected");
  state.therapist = name;
  const el2 = document.getElementById("sum-therapist");
  el2.textContent = name;
  el2.classList.remove("empty");
}

// ── Calendar ──
let calYear, calMonth;

function initCalendar() {
  const now = new Date();
  calYear = now.getFullYear();
  calMonth = now.getMonth();
  renderCalendar();
}

function changeMonth(dir) {
  calMonth += dir;
  if (calMonth > 11) {
    calMonth = 0;
    calYear++;
  }
  if (calMonth < 0) {
    calMonth = 11;
    calYear--;
  }
  renderCalendar();
}

function renderCalendar() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  document.getElementById("cal-month-title").textContent =
    months[calMonth] + " " + calYear;

  const grid = document.getElementById("cal-grid");
  grid.innerHTML = "";
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((d) => {
    const dn = document.createElement("div");
    dn.className = "cal-day-name";
    dn.textContent = d;
    grid.appendChild(dn);
  });

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "cal-day empty";
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.className = "cal-day";
    cell.textContent = d;

    const thisDate = new Date(calYear, calMonth, d);
    const isToday = thisDate.toDateString() === today.toDateString();
    const isPast =
      thisDate <
      new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (isToday) cell.classList.add("today");
    if (isPast) cell.classList.add("disabled");
    else {
      const dateStr = `${d} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][calMonth]} ${calYear}`;
      cell.addEventListener("click", () => selectDate(cell, dateStr));
    }

    grid.appendChild(cell);
  }
}

function selectDate(el, dateStr) {
  document
    .querySelectorAll(".cal-day")
    .forEach((d) => d.classList.remove("selected"));
  el.classList.add("selected");
  state.date = dateStr;
  const el2 = document.getElementById("sum-date");
  el2.textContent = dateStr;
  el2.classList.remove("empty");
}

function selectTime(el, time) {
  document
    .querySelectorAll(".time-slot:not(.unavailable)")
    .forEach((t) => t.classList.remove("selected"));
  el.classList.add("selected");
  state.time = time;
  const el2 = document.getElementById("sum-time");
  el2.textContent = time;
  el2.classList.remove("empty");
}

// ── Add-ons ──
function toggleAddon(el, name, price) {
  el.classList.toggle("selected");
  if (el.classList.contains("selected")) {
    state.addons.push(name);
    state.addonTotal += price;
  } else {
    state.addons = state.addons.filter((a) => a !== name);
    state.addonTotal -= price;
  }
  updateSummary();
}

// ── Update summary ──
function updateSummary() {
  const treat = document.getElementById("sum-treatment");
  if (state.treatment) {
    treat.textContent = state.treatment;
    treat.classList.remove("empty");
  }

  const addonsEl = document.getElementById("sum-addons");
  if (state.addons.length > 0) {
    addonsEl.textContent = state.addons.join(", ");
    addonsEl.classList.remove("empty");
  } else {
    addonsEl.textContent = "None";
    addonsEl.classList.add("empty");
  }

  const total = state.treatmentPrice + state.addonTotal;
  document.getElementById("sum-total").textContent =
    "₹" + total.toLocaleString("en-IN");
}

function updateDetail(type) {
  if (type === "name") {
    const fn = document.getElementById("first-name").value;
    const ln = document.getElementById("last-name").value;
    if (fn || ln) {
      // nothing to update in summary for name in this version
    }
  }
}

// ── Review ──
function populateReview() {
  document.getElementById("review-treatment").textContent =
    (state.treatment || "—") + (state.duration ? " · " + state.duration : "");
  document.getElementById("review-datetime").textContent =
    (state.date || "—") + (state.time ? " at " + state.time : "");
  document.getElementById("review-therapist").textContent =
    state.therapist || "—";
  document.getElementById("review-addons").textContent =
    state.addons.length > 0 ? state.addons.join(", ") : "None selected";
  const total = state.treatmentPrice + state.addonTotal;
  document.getElementById("review-total").textContent =
    "₹" + total.toLocaleString("en-IN");
}

// ── Confirm ──
function confirmBooking() {
  const ref = "SSP-" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById("confirm-ref-code").textContent = ref;
  document.getElementById("booking-form-wrap").style.display = "none";
  const cs = document.getElementById("confirmation-screen");
  cs.style.display = "block";
  window.scrollTo({ top: 300, behavior: "smooth" });
}

// ── Init ──
initCalendar();
window.addEventListener("load", () => document.body.classList.add("loaded"));
