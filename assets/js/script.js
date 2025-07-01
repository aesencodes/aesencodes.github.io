document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");

  hamburger.addEventListener("click", function () {
    this.setAttribute(
      "aria-expanded",
      this.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
    navList.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-list a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.setAttribute("aria-expanded", "false");
      navList.classList.remove("active");
    });
  });

  // Typing Effect
  const typingText = document.querySelector(".typing-text");
  const cursor = document.querySelector(".cursor");

  if (typingText && cursor) {
    const words = [
      "TALL Stack Developer",
      "Laravel Expert",
      "Machine Learning Engineer",
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBetweenWords = 1200;

    function type() {
      if (isPaused) return;

      const currentWord = words[wordIndex];
      cursor.style.opacity = isDeleting && charIndex === 0 ? "1" : "0";

      if (!isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
          isPaused = true;
          setTimeout(() => {
            isPaused = false;
            isDeleting = true;
            type();
          }, pauseBetweenWords);
          return;
        }
      } else {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isPaused = true;
          setTimeout(() => {
            isPaused = false;
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            type();
          }, 500);
          return;
        }
      }

      setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }

    setTimeout(type, 800);

    // Pause on hover
    typingText.addEventListener("mouseenter", () => {
      isPaused = true;
      cursor.style.opacity = "1";
    });

    typingText.addEventListener("mouseleave", () => {
      isPaused = false;
      type();
    });
  }

  // Expertise Tabs
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

  // Back to Top Button
  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  });

  // Set current year in footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const formData = new FormData(this);

      // Here you would typically send the form data to a server
      // For demo purposes, we'll just log it and show an alert
      const formValues = Object.fromEntries(formData.entries());
      console.log("Form submitted:", formValues);

      alert("Thank you for your message! I will get back to you soon.");
      this.reset();
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".navigation").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
