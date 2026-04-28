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

// Reading progress bar
window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const total = doc.scrollHeight - doc.clientHeight;
  const pct = (window.scrollY / total) * 100;
  document.getElementById("reading-progress").style.width = pct + "%";

  // Back to top
  document
    .getElementById("back-to-top")
    .classList.toggle("visible", window.scrollY > 500);
});

// Active TOC highlight
const sections = document.querySelectorAll(".terms-block");
const tocLinks = document.querySelectorAll(".terms-toc a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        tocLinks.forEach((l) => l.classList.remove("toc-active"));
        const active = document.querySelector(
          `.terms-toc a[href="#${entry.target.id}"]`,
        );
        if (active) active.classList.add("toc-active");
      }
    });
  },
  { rootMargin: "-30% 0px -65% 0px" },
);

sections.forEach((s) => observer.observe(s));

// Smooth scroll TOC links
tocLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

window.addEventListener("load", () => document.body.classList.add("loaded"));
