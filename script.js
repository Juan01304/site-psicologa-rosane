(() => {
  const mobileFix = document.createElement("link");
  mobileFix.rel = "stylesheet";
  mobileFix.href = "mobile-fix.css?v=20260914-3";
  document.head.appendChild(mobileFix);

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");
  const mobileLinks = mobileMenu?.querySelectorAll("a") ?? [];
  const faqButtons = document.querySelectorAll(".faq-question");
  const year = document.querySelector("#year");
  const revealElements = document.querySelectorAll(".reveal");
  if (year) year.textContent = new Date().getFullYear();
  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    mobileMenu.hidden = true;
    document.body.classList.remove("menu-open");
  };
  const openMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu");
    mobileMenu.hidden = false;
    document.body.classList.add("menu-open");
    mobileMenu.scrollTop = 0;
  };
  menuToggle?.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  });
  mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1050) closeMenu();
  });
  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      if (!item) return;
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
    });
  });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }
})();