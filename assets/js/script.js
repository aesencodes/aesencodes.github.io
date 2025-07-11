document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initMobileNavigation();
  initTypingEffect();
  initExpertiseTabs();
  initBackToTopButton();
  updateCurrentYear();
  initSmoothScrolling();
  initTechStackAnimation();
});

// Mobile Navigation
function initMobileNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");
  const html = document.documentElement;

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

    // Prevent scrolling when menu is open
    html.style.overflow = isExpanded ? "auto" : "hidden";
  }

  function closeMobileMenu() {
    hamburger.setAttribute("aria-expanded", "false");
    navList.classList.remove("active");
    html.style.overflow = "auto";
  }

  // Tambahkan pengecekan resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      html.style.overflow = "auto";
    }
  });
}

// Typing Effect
function initTypingEffect() {
  const typingContainer = document.querySelector(".hero-title");
  if (!typingContainer) return;

  // Buat element untuk teks dan cursor
  const typingText = document.createElement("span");
  typingText.className = "typing-text";

  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  cursor.innerHTML = "|";

  // Kosongkan container dan tambahkan element baru
  typingContainer.innerHTML = "";
  typingContainer.appendChild(typingText);
  typingContainer.appendChild(cursor);

  const words = ["Web Developer", "Machine Learning Enthusiast"];

  const typingConfig = {
    wordIndex: 0,
    charIndex: 0,
    isDeleting: false,
    isPaused: false,
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseBetweenWords: 1200,
    cursorVisible: true,
  };

  // Animasi cursor blink
  function animateCursor() {
    cursor.style.opacity = typingConfig.cursorVisible ? "1" : "0";
    typingConfig.cursorVisible = !typingConfig.cursorVisible;
    setTimeout(animateCursor, 500);
  }

  // Proses typing
  function type() {
    if (typingConfig.isPaused) {
      setTimeout(type, 100);
      return;
    }

    const currentWord = words[typingConfig.wordIndex];

    if (!typingConfig.isDeleting) {
      // Mengetik maju
      typingText.textContent = currentWord.substring(
        0,
        typingConfig.charIndex + 1
      );
      typingConfig.charIndex++;

      if (typingConfig.charIndex === currentWord.length) {
        typingConfig.isPaused = true;
        setTimeout(() => {
          typingConfig.isPaused = false;
          typingConfig.isDeleting = true;
        }, typingConfig.pauseBetweenWords);
      }
    } else {
      // Menghapus
      typingText.textContent = currentWord.substring(
        0,
        typingConfig.charIndex - 1
      );
      typingConfig.charIndex--;

      if (typingConfig.charIndex === 0) {
        typingConfig.isDeleting = false;
        typingConfig.wordIndex = (typingConfig.wordIndex + 1) % words.length;
        typingConfig.isPaused = true;
        setTimeout(() => {
          typingConfig.isPaused = false;
        }, 500);
      }
    }

    const speed = typingConfig.isDeleting
      ? typingConfig.deletingSpeed
      : typingConfig.typingSpeed;
    setTimeout(type, speed);
  }

  // Mulai animasi
  setTimeout(animateCursor, 500);
  setTimeout(type, 1000);
}

// Tech Stack Animation with requestAnimationFrame
function initTechStackAnimation() {
  const techStack = document.querySelector(".tech-stack");
  if (!techStack) return;

  const items = Array.from(document.querySelectorAll(".stack-item"));
  if (items.length === 0) return;

  // Configuration
  const config = {
    radius: 120, // Base radius
    speed: 0.5, // Degrees per frame
    centerX: 0,
    centerY: 0,
    angles: [],
    isPaused: false,
    lastTimestamp: 0,
  };

  // Initialize angles
  items.forEach((_, index) => {
    config.angles[index] = (index * (360 / items.length)) % 360;
  });

  // Initialize positions
  function init() {
    const rect = techStack.getBoundingClientRect();
    config.centerX = rect.width / 2;
    config.centerY = rect.height / 2;

    // Adjust for mobile
    if (window.innerWidth <= 768) {
      config.radius = 90;
    } else {
      config.radius = 120;
    }
  }

  // Update item positions
  function updatePositions(timestamp) {
    if (!config.lastTimestamp) {
      config.lastTimestamp = timestamp;
    }

    const deltaTime = timestamp - config.lastTimestamp;
    config.lastTimestamp = timestamp;

    if (config.isPaused) {
      requestAnimationFrame(updatePositions);
      return;
    }

    // Calculate progress based on time to maintain consistent speed
    const progress = deltaTime / 16; // Normalize to 60fps

    items.forEach((item, index) => {
      // Update angle
      config.angles[index] =
        (config.angles[index] + config.speed * progress) % 360;

      // Convert to radians
      const angleInRad = (config.angles[index] * Math.PI) / 180;

      // Calculate position
      const x = config.centerX + config.radius * Math.cos(angleInRad);
      const y = config.centerY + config.radius * Math.sin(angleInRad);

      // Apply transformation
      item.style.transform = `translate(${x - config.centerX}px, ${
        y - config.centerY
      }px)`;
    });

    requestAnimationFrame(updatePositions);
  }

  // Handle hover events
  function setupHoverEffects() {
    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.classList.add("hover");
        config.isPaused = true;
      });

      item.addEventListener("mouseleave", () => {
        item.classList.remove("hover");
        config.isPaused = false;
      });
    });
  }

  // Handle window resize
  function handleResize() {
    init();
  }

  // Initialize everything
  function startAnimation() {
    init();
    setupHoverEffects();
    window.addEventListener("resize", handleResize);
    requestAnimationFrame(updatePositions);
  }

  // Start when everything is loaded
  if (document.readyState === "complete") {
    startAnimation();
  } else {
    window.addEventListener("load", startAnimation);
  }
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

  // Adjust visibility threshold
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;
    const heroHeight = document.querySelector(".hero")?.offsetHeight || 0;

    // Only show when scrolled past hero section
    backToTopButton.classList.toggle(
      "active",
      scrollPosition > heroHeight * 0.5
    );
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
