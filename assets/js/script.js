document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initMobileNavigation();
  initTypingEffect();
  initExpertiseTabs();
  initBackToTopButton();
  updateCurrentYear();
  initSmoothScrolling();
});

// Mobile Navigation
function initMobileNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");

  if (!hamburger || !navList) return;

  hamburger.addEventListener("click", toggleMobileMenu);

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-list a");
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  function toggleMobileMenu() {
    const isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
    navList.classList.toggle("active");
  }

  function closeMobileMenu() {
    if (navList.classList.contains("active")) {
      hamburger.setAttribute("aria-expanded", "false");
      navList.classList.remove("active");
    }
  }
}

// Typing Effect
function initTypingEffect() {
  const typingText = document.querySelector(".typing-text");
  const cursor = document.querySelector(".cursor");

  if (!typingText || !cursor) return;

  const words = [
    "TALL Stack Developer",
    "Laravel Expert",
    "Machine Learning Engineer",
  ];

  const typingConfig = {
    wordIndex: 0,
    charIndex: 0,
    isDeleting: false,
    isPaused: false,
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseBetweenWords: 1200,
  };

  function type() {
    if (typingConfig.isPaused) return;

    const currentWord = words[typingConfig.wordIndex];
    cursor.style.opacity =
      typingConfig.isDeleting && typingConfig.charIndex === 0 ? "1" : "0";

    if (!typingConfig.isDeleting) {
      // Typing forward
      typingText.textContent = currentWord.substring(
        0,
        typingConfig.charIndex + 1
      );
      typingConfig.charIndex++;

      if (typingConfig.charIndex === currentWord.length) {
        pauseTyping(() => {
          typingConfig.isDeleting = true;
          type();
        }, typingConfig.pauseBetweenWords);
        return;
      }
    } else {
      // Deleting backward
      typingText.textContent = currentWord.substring(
        0,
        typingConfig.charIndex - 1
      );
      typingConfig.charIndex--;

      if (typingConfig.charIndex === 0) {
        pauseTyping(() => {
          typingConfig.isDeleting = false;
          typingConfig.wordIndex = (typingConfig.wordIndex + 1) % words.length;
          type();
        }, 500);
        return;
      }
    }

    setTimeout(
      type,
      typingConfig.isDeleting
        ? typingConfig.deletingSpeed
        : typingConfig.typingSpeed
    );
  }

  function pauseTyping(callback, duration) {
    typingConfig.isPaused = true;
    setTimeout(() => {
      typingConfig.isPaused = false;
      callback();
    }, duration);
  }

  // Start typing after initial delay
  setTimeout(type, 800);

  // Pause on hover
  typingText.addEventListener("mouseenter", () => {
    typingConfig.isPaused = true;
    cursor.style.opacity = "1";
  });

  typingText.addEventListener("mouseleave", () => {
    typingConfig.isPaused = false;
    type();
  });
}

// Expertise Tabs
function initExpertiseTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Show corresponding content
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
}

// Back to Top Button
function initBackToTopButton() {
  const backToTopButton = document.querySelector(".back-to-top");
  if (!backToTopButton) return;

  window.addEventListener("scroll", () => {
    backToTopButton.classList.toggle("active", window.pageYOffset > 300);
  });
}

// Update Current Year in Footer
function updateCurrentYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", handleSmoothScroll);
  });

  function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight =
        document.querySelector(".navigation")?.offsetHeight || 0;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }
}
