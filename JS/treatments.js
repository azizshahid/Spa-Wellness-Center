// AOS
AOS.init({ duration: 900, once: true, offset: 80 });

// Navbar scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Hamburger
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Filter bar
const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll("#treatments-grid .treatment-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;

    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.style.display = match ? "" : "none";
    });
  });
});

// Book now / tour buttons
document.querySelectorAll(".book-now-btn, .cta-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    alert(
      "Booking system would open here. Thank you for your interest in Serenity Spa!",
    );
  });
});

// Loaded fade-in
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Ripple on buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
            position:absolute; width:${size}px; height:${size}px;
            left:${e.clientX - rect.left - size / 2}px;
            top:${e.clientY - rect.top - size / 2}px;
            background:rgba(255,255,255,0.3); border-radius:50%;
            transform:scale(0); animation:ripple 0.6s linear; pointer-events:none;
          `;
    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Process step hover already handled by CSS
