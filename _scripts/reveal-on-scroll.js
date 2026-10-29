window.addEventListener("DOMContentLoaded", () => {
  const items = [...document.querySelectorAll(".reveal-on-scroll")];

  if (!items.length) {
    return;
  }

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (mediaQuery.matches || typeof IntersectionObserver === "undefined") {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0,
      rootMargin: "0px 0px 15% 0px",
    }
  );

  items.forEach((item) => {
    observer.observe(item);
  });
});
