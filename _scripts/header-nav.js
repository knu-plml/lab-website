{
  const header = document.querySelector("header");
  const navToggle = header?.querySelector(".nav-toggle");
  const nav = header?.querySelector("nav");

  if (header) {
    const updateHeaderBackground = () => {
      header.dataset.scrolled = window.scrollY > 0 ? "true" : "false";
    };

    updateHeaderBackground();
    window.addEventListener("scroll", updateHeaderBackground, { passive: true });
  }

  if (header && navToggle && nav) {
    const closeNav = () => {
      navToggle.checked = false;
    };

    document.addEventListener("click", (event) => {
      if (!navToggle.checked || header.contains(event.target)) {
        return;
      }

      closeNav();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navToggle.checked) {
        closeNav();
        navToggle.focus();
      }
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeNav();
      }
    });
  }
}
