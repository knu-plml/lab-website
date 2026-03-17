const publicationTabGroups = document.querySelectorAll("[data-publication-tabs]");

for (const group of publicationTabGroups) {
  const tabs = Array.from(group.querySelectorAll("[data-tab-target]"));
  const panels = Array.from(group.querySelectorAll("[data-tab-panel]"));
  const kindFilters = Array.from(group.querySelectorAll("[data-kind-filter]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeTarget = null;
  let activeKind = "all";

  const animatePanel = (panel, className) => {
    if (!panel || reduceMotion.matches) {
      return;
    }

    panel.classList.remove(className);
    requestAnimationFrame(() => {
      panel.classList.add(className);
    });
  };

  const applyKindFilter = (panel) => {
    if (!panel) {
      return;
    }

    const children = Array.from(panel.children);
    const emptyState = panel.querySelector("[data-publication-empty]");
    let currentHeading = null;
    let visibleInSection = 0;
    let visibleCount = 0;

    const flushSection = () => {
      if (currentHeading) {
        currentHeading.hidden = visibleInSection === 0;
      }
    };

    for (const child of children) {
      if (child.matches("h3")) {
        flushSection();
        currentHeading = child;
        visibleInSection = 0;
        continue;
      }

      if (!child.classList.contains("publication-card")) {
        continue;
      }

      const isVisible = activeKind === "all" || child.dataset.publicationKind === activeKind;
      child.hidden = !isVisible;

      if (isVisible) {
        visibleInSection += 1;
        visibleCount += 1;
      }
    }

    flushSection();

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  };

  const syncKindFilters = () => {
    for (const filter of kindFilters) {
      const isActive = filter.dataset.kindFilter === activeKind;
      filter.classList.toggle("is-active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    }
  };

  const activateTab = (target, { animate = true } = {}) => {
    if (!target || target === activeTarget) {
      if (target === activeTarget) {
        const activePanel = panels.find((panel) => panel.dataset.tabPanel === target);
        applyKindFilter(activePanel);
      }
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
        panel.classList.remove("is-filter-animating");

        if (animate) {
          animatePanel(panel, "is-animating");
        }
      } else {
        panel.classList.remove("is-animating");
        panel.classList.remove("is-filter-animating");
      }
    }

    activeTarget = target;
    applyKindFilter(panels.find((panel) => panel.dataset.tabPanel === target));
  };

  const activateKind = (kind) => {
    if (!kind || kind === activeKind) {
      return;
    }

    activeKind = kind;
    syncKindFilters();
    const activePanel = panels.find((panel) => panel.dataset.tabPanel === activeTarget);
    applyKindFilter(activePanel);
    animatePanel(activePanel, "is-filter-animating");
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

  for (const filter of kindFilters) {
    filter.addEventListener("click", () => {
      activateKind(filter.dataset.kindFilter);
    });
  }

  const initialTab = tabs.find((tab) => tab.classList.contains("is-active")) || tabs[0];
  const initialKindFilter =
    kindFilters.find((filter) => filter.classList.contains("is-active")) || kindFilters[0];

  if (initialKindFilter) {
    activeKind = initialKindFilter.dataset.kindFilter;
    syncKindFilters();
  }

  if (initialTab) {
    activateTab(initialTab.dataset.tabTarget, { animate: false });
  }
}
