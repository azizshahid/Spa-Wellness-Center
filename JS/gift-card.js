AOS.init({ duration: 900, once: true, offset: 80 });

window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 50);
});

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// ── State ──
const state = {
  amount: 5000,
  occasion: "Birthday",
  delivery: "Email (Instant)",
  deliveryExtra: 0,
  recipient: "",
};

// ── Card flip ──
let isFlipped = false;
function toggleCardFlip() {
  isFlipped = !isFlipped;
  document.getElementById("gift-card").classList.toggle("flipped", isFlipped);
}

// ── Amount selection ──
function selectAmount(el, val) {
  document
    .querySelectorAll(".amount-btn")
    .forEach((b) => b.classList.remove("selected"));
  el.classList.add("selected");
  document.getElementById("custom-row").classList.remove("visible");
  state.amount = val;
  updateCard();
  updateSummary();
}

function toggleCustom() {
  document
    .querySelectorAll(".amount-btn")
    .forEach((b) => b.classList.remove("selected"));
  document.getElementById("custom-btn").classList.add("selected");
  document.getElementById("custom-row").classList.add("visible");
  document.getElementById("custom-input").focus();
}

function applyCustomAmount(val) {
  const n = parseInt(val);
  if (!isNaN(n) && n >= 500) {
    state.amount = n;
    updateCard();
    updateSummary();
  }
}

// ── Occasion ──
function selectOccasion(el, name) {
  document
    .querySelectorAll(".occasion-chip")
    .forEach((c) => c.classList.remove("selected"));
  el.classList.add("selected");
  state.occasion = name;
  document.getElementById("sum-occasion").textContent = name;
}

// ── Recipient ──
function updateRecipient(val) {
  state.recipient = val;
  const display = val.trim() || "For Someone Special";
  document.getElementById("card-recipient-name").textContent = display;
  document.getElementById("scm-recipient").textContent = display;
  const sumEl = document.getElementById("sum-recipient");
  sumEl.textContent = val.trim() || "Not entered";
  sumEl.classList.toggle("empty", !val.trim());
}

// ── Delivery ──
function selectDelivery(el, type) {
  document
    .querySelectorAll(".delivery-option")
    .forEach((o) => o.classList.remove("selected"));
  el.classList.add("selected");
  state.delivery = type;
  state.deliveryExtra = type === "Physical Post" ? 150 : 0;
  document.getElementById("sum-delivery").textContent = type;
  updateSummary();
}

// ── Char count ──
function countChars(el) {
  document.getElementById("char-count").textContent = el.value.length;
}

// ── Schedule date ──
document
  .getElementById("schedule-date")
  .addEventListener("change", function () {
    if (this.value) {
      const d = new Date(this.value);
      const formatted = d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      document.getElementById("sum-schedule").textContent = formatted;
    } else {
      document.getElementById("sum-schedule").textContent = "Send immediately";
    }
  });

// ── Update card preview ──
function updateCard() {
  const formatted = "₹" + state.amount.toLocaleString("en-IN");
  document.getElementById("card-amt-num").textContent =
    state.amount.toLocaleString("en-IN");
  document.getElementById("scm-amt-num").textContent =
    state.amount.toLocaleString("en-IN");
}

// ── Update summary ──
function updateSummary() {
  const total = state.amount + state.deliveryExtra;
  document.getElementById("sum-amount").textContent =
    "₹" + state.amount.toLocaleString("en-IN");
  document.getElementById("sum-total").textContent =
    "₹" + total.toLocaleString("en-IN");
  document.getElementById("modal-amount-display").textContent =
    "₹" + total.toLocaleString("en-IN");
}

// ── Theme picker ──
function setTheme(swatch, c1, c2, c3) {
  document
    .querySelectorAll(".theme-swatch")
    .forEach((s) => s.classList.remove("active"));
  swatch.classList.add("active");
  const front = document.getElementById("card-front-face");
  front.style.background = `linear-gradient(135deg, ${c1} 0%, ${c2} 45%, ${c3} 100%)`;
  const mini = document.querySelector(".summary-card-mini");
  mini.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
  const modalCard = document.querySelector(".modal-gift-card");
  modalCard.style.background = `linear-gradient(135deg, ${c1}, ${c2}, ${c3})`;
}

// ── Purchase ──
function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const seg = () =>
    Array.from(
      { length: 4 },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
  return `SSG-${seg()}-${seg()}`;
}

function purchaseGiftCard() {
  const consent = document.getElementById("gift-consent");
  const recipientName = document.getElementById("recipient-name").value.trim();
  const recipientEmail = document
    .getElementById("recipient-email")
    .value.trim();
  const senderName = document.getElementById("sender-name").value.trim();
  const senderEmail = document.getElementById("sender-email").value.trim();

  if (!consent.checked) {
    alert("Please agree to the Terms & Conditions before purchasing.");
    return;
  }
  if (!recipientName) {
    alert("Please enter the recipient's name.");
    document.getElementById("recipient-name").focus();
    return;
  }
  if (!recipientEmail) {
    alert("Please enter the recipient's email address.");
    document.getElementById("recipient-email").focus();
    return;
  }
  if (!senderName || !senderEmail) {
    alert("Please fill in your name and email.");
    return;
  }

  const code = generateCode();
  document.getElementById("modal-code").textContent = code;
  document.getElementById("modal-recipient-name").textContent = recipientName;
  document.getElementById("modal-amount-display").textContent =
    "₹" + state.amount.toLocaleString("en-IN");
  document.getElementById("purchase-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("purchase-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function closeModalOutside(e) {
  if (e.target === document.getElementById("purchase-overlay")) closeModal();
}

function printCard() {
  window.print();
}

// ── FAQ toggle ──
function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  item.classList.toggle("open");
}

// ── Init ──
updateCard();
updateSummary();
window.addEventListener("load", () => document.body.classList.add("loaded"));
