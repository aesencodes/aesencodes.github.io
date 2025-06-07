document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-list a");
  const skipLink = document.querySelector(".skip-link");

  // Mobile Menu Toggle
  const toggleMenu = () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
    navList.classList.toggle("active");
    document.body.style.overflow = navList.classList.contains("active")
      ? "hidden"
      : "";
  };

  // Close mobile menu when clicking a link
  const closeMenu = () => {
    hamburger.setAttribute("aria-expanded", "false");
    navList.classList.remove("active");
    document.body.style.overflow = "";
  };

  // Event Listeners
  hamburger.addEventListener("click", toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Skip link focus
  skipLink.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(skipLink.getAttribute("href"));
    target.setAttribute("tabindex", "-1");
    target.focus();
    setTimeout(() => target.removeAttribute("tabindex"), 1000);
  });

  // Performance optimization: Load non-critical resources after page load
  window.addEventListener("load", () => {
    // Load any non-critical CSS or JavaScript here
    // Example: Load font awesome if needed
    // const fontAwesome = document.createElement('link');
    // fontAwesome.rel = 'stylesheet';
    // fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    // document.head.appendChild(fontAwesome);
  });

  // Update copyright year
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
