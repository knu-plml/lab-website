const publicationTabGroups = document.querySelectorAll("[data-publication-tabs]");

for (const group of publicationTabGroups) {
  const tabs = Array.from(group.querySelectorAll("[data-tab-target]"));
  const panels = Array.from(group.querySelectorAll("[data-tab-panel]"));
  let activeTarget = null;

  const activateTab = (target, { animate = true } = {}) => {
    if (!target || target === activeTarget) {
      return;
    }

    for (const tab of tabs) {
      const isActive = tab.dataset.tabTarget === target;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    }

    for (const panel of panels) {
      const isActive = panel.dataset.tabPanel === target;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;

      if (isActive) {
        panel.classList.remove("is-animating");

        if (animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          requestAnimationFrame(() => {
            panel.classList.add("is-animating");
          });
        }
      } else {
        panel.classList.remove("is-animating");
      }
    }

    activeTarget = target;
  };

  for (const tab of tabs) {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.tabTarget);
    });

    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        return;
      }

      event.preventDefault();

      const currentIndex = tabs.indexOf(tab);
      let nextIndex = currentIndex;

      if (event.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      }

      const nextTab = tabs[nextIndex];
      activateTab(nextTab.dataset.tabTarget);
      nextTab.focus();
    });
  }

  const initialTab = tabs.find((tab) => tab.classList.contains("is-active")) || tabs[0];
  if (initialTab) {
    activateTab(initialTab.dataset.tabTarget, { animate: false });
  }
}
