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

// ── Gallery filter ──
function filterGallery(btn, cat) {
  document
    .querySelectorAll("#gallery-filter .filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".gallery-tile").forEach((tile) => {
    tile.dataset.hidden =
      cat !== "all" && tile.dataset.cat !== cat ? "true" : "false";
  });
}

// ── Lightbox ──
const tiles = document.querySelectorAll(".gallery-tile[data-index]");
let currentIndex = 0;

function buildIndex() {
  return Array.from(tiles).map((t) => ({
    src: t.dataset.src,
    title: t.dataset.title,
    label: t.dataset.label,
    index: parseInt(t.dataset.index),
  }));
}

function openLightbox(idx) {
  const data = buildIndex();
  const item = data.find((d) => d.index === idx);
  if (!item) return;
  currentIndex = idx;
  document.getElementById("lightbox-img").src = item.src;
  document.getElementById("lightbox-title").textContent = item.title;
  document.getElementById("lightbox-label").textContent = item.label;
  document.getElementById("lightbox-counter").textContent =
    idx + 1 + " / " + data.length;
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

function closeLightboxOutside(e) {
  if (e.target === document.getElementById("lightbox")) closeLightbox();
}

function shiftLightbox(dir) {
  const data = buildIndex();
  currentIndex = (currentIndex + dir + data.length) % data.length;
  const item = data.find((d) => d.index === currentIndex);
  if (!item) return;
  const img = document.getElementById("lightbox-img");
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = item.src;
    document.getElementById("lightbox-title").textContent = item.title;
    document.getElementById("lightbox-label").textContent = item.label;
    document.getElementById("lightbox-counter").textContent =
      currentIndex + 1 + " / " + data.length;
    img.style.opacity = 1;
  }, 150);
  img.style.transition = "opacity 0.15s ease";
}

document.addEventListener("keydown", (e) => {
  if (!document.getElementById("lightbox").classList.contains("open")) return;
  if (e.key === "ArrowRight") shiftLightbox(1);
  if (e.key === "ArrowLeft") shiftLightbox(-1);
  if (e.key === "Escape") closeLightbox();
});

window.addEventListener("load", () => document.body.classList.add("loaded"));
