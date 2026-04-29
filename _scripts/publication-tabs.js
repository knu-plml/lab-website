const publicationTabGroups = document.querySelectorAll("[data-publication-tabs]");
const publicationSearchLinkSelector = "[data-publication-search-link]";

for (const group of publicationTabGroups) {
  const root = group.closest("main") || document;
  const tabs = Array.from(group.querySelectorAll("[data-tab-target]"));
  const panels = Array.from(root.querySelectorAll("[data-tab-panel]"));
  const kindFilters = Array.from(group.querySelectorAll("[data-kind-filter]"));
  const emptyState = group.querySelector("[data-publication-empty]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeTarget = null;
  let activeKind = "all";
  const url = new URL(window.location.href);
  const updateStateInUrl = ({ target = activeTarget, kind = activeKind } = {}) => {
    const params = new URLSearchParams(window.location.search);
    if (target) {
      params.set("tab", target);
    }
    if (kind) {
      params.set("kind", kind);
    }
    url.search = params.toString();
    window.history.replaceState(null, "", url);
  };
  const getPanelsByTarget = (target = activeTarget) =>
    panels.filter((panel) => panel.dataset.tabPanel === target);
  const syncSearchLinks = () => {
    const links = document.querySelectorAll(publicationSearchLinkSelector);

    for (const link of links) {
      const linkUrl = new URL(link.href, window.location.origin);
      if (activeTarget) {
        linkUrl.searchParams.set("tab", activeTarget);
      }
      if (activeKind) {
        linkUrl.searchParams.set("kind", activeKind);
      }
      link.href = linkUrl.pathname + linkUrl.search + linkUrl.hash;
    }
  };

  const animatePanel = (panel, className) => {
    if (!panel || reduceMotion.matches) {
      return;
    }

    panel.classList.remove(className);
    requestAnimationFrame(() => {
      panel.classList.add(className);
    });
  };

  const countVisiblePublications = (targetPanels) => {
    let count = 0;
    const panelList = Array.isArray(targetPanels) ? targetPanels : [targetPanels].filter(Boolean);

    for (const panel of panelList) {
      for (const card of panel.querySelectorAll(".publication-card")) {
        const matchesKind = activeKind === "all" || card.dataset.publicationKind === activeKind;
        const matchesSearch = card.style.display !== "none";

        if (matchesKind && matchesSearch) {
          count += 1;
        }
      }
    }

    return count;
  };

  const syncTabCounts = () => {
    for (const tab of tabs) {
      const count = countVisiblePublications(getPanelsByTarget(tab.dataset.tabTarget));
      const countNode = tab.querySelector("[data-tab-count]");

      if (countNode) {
        countNode.textContent = `(${count})`;
      }
    }
  };

  const syncPageSectionTones = () => {
    const pageSections = Array.from(root.children).filter((child) => child.matches("section"));
    let visibleIndex = 0;

    for (const section of pageSections) {
      if (section.hidden) {
        delete section.dataset.sectionTone;
        continue;
      }

      section.dataset.sectionTone = visibleIndex % 2 === 0 ? "odd" : "even";
      visibleIndex += 1;
    }
  };

  const syncYearSections = () => {
    for (const yearSection of root.querySelectorAll("[data-publication-year-section]")) {
      const activePanels = Array.from(
        yearSection.querySelectorAll(`[data-tab-panel="${activeTarget}"]`)
      );
      const hasVisiblePublications = countVisiblePublications(activePanels) > 0;
      yearSection.hidden = !hasVisiblePublications;

      const pageSection = yearSection.closest("section");
      if (pageSection) {
        pageSection.hidden = !hasVisiblePublications;
      }
    }

    syncPageSectionTones();
  };

  const applyKindFilter = (panel) => {
    if (!panel) {
      return 0;
    }

    const children = Array.from(panel.children);
    let visibleCount = 0;

    for (const child of children) {
      if (!child.classList.contains("publication-card")) {
        continue;
      }

      const matchesKind = activeKind === "all" || child.dataset.publicationKind === activeKind;
      const matchesSearch = child.style.display !== "none";
      const isVisible = matchesKind && matchesSearch;
      child.hidden = !isVisible;

      if (isVisible) {
        visibleCount += 1;
      }
    }

    return visibleCount;
  };

  const applyKindFilterToPanels = (target = activeTarget) => {
    let visibleCount = 0;

    for (const panel of getPanelsByTarget(target)) {
      visibleCount += applyKindFilter(panel);
    }

    syncYearSections();
    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
    syncTabCounts();
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
        applyKindFilterToPanels(target);
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
    updateStateInUrl({ target });
    syncSearchLinks();
    applyKindFilterToPanels(target);
  };

  const activateKind = (kind) => {
    if (!kind || kind === activeKind) {
      return;
    }

    activeKind = kind;
    updateStateInUrl({ kind });
    syncKindFilters();
    syncSearchLinks();
    const activePanels = getPanelsByTarget();

    if (!activePanels.length) {
      return;
    }

    applyKindFilterToPanels();
    for (const activePanel of activePanels) {
      animatePanel(activePanel, "is-animating");
    }
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

  const tabFromUrl = url.searchParams.get("tab");
  const kindFromUrl = url.searchParams.get("kind");
  const initialTab =
    tabs.find((tab) => tab.dataset.tabTarget === tabFromUrl) ||
    tabs.find((tab) => tab.classList.contains("is-active")) ||
    tabs[0];
  const initialKindFilter =
    kindFilters.find((filter) => filter.dataset.kindFilter === kindFromUrl) ||
    kindFilters.find((filter) => filter.classList.contains("is-active")) ||
    kindFilters[0];

  if (initialKindFilter) {
    activeKind = initialKindFilter.dataset.kindFilter;
    syncKindFilters();
  }

  if (initialTab) {
    activateTab(initialTab.dataset.tabTarget, { animate: false });
  }

  window.addEventListener("search:updated", () => {
    applyKindFilterToPanels();
  });
}
