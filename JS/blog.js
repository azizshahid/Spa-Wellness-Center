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

// ── Blog filter ──
function filterBlog(btn, cat) {
  if (btn) {
    document
      .querySelectorAll("#blog-filter .filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }

  document.querySelectorAll(".article-card").forEach((card) => {
    const match = cat === "all" || card.dataset.cat === cat;
    card.style.display = match ? "" : "none";
  });
}

// ── Modals ──
function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  document.getElementById(id).classList.remove("open");
  document.body.style.overflow = "";
}

function closeModalOutside(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".article-modal-overlay.open").forEach((m) => {
      m.classList.remove("open");
      document.body.style.overflow = "";
    });
  }
});

// Pagination (visual only)
document.querySelectorAll(".page-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".page-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
  });
});

window.addEventListener("load", () => document.body.classList.add("loaded"));
