/*
  filters elements on page based on url or search box.
  syntax: term1 term2 "full phrase 1" "full phrase 2" "tag: tag 1" "support: grant"
  match if: all terms AND at least one phrase AND at least one tag AND at least one support
*/
{
  // elements to filter
  const elementSelector = ".card, .citation, .post-excerpt, .publication-card, .portrait-wrapper, .alumni-entry, .course-group";
  const sectionElementSelector = ".card, .citation, .post-excerpt-container, .publication-card, .portrait-wrapper, .alumni-entry, .course-group";
  const filterableGroupSelector = ".grid, .alumni-list";
  // search box element
  const searchBoxSelector = ".search-box";
  // results info box element
  const infoBoxSelector = ".search-info";
  // tags element
  const tagSelector = ".tag";
  const quotedQueryPrefixes = {
    "tag:": "tags",
    "support:": "supports",
  };

  // split search query into terms, phrases, and tags
  const splitQuery = (query) => {
    // split into parts, preserve quotes
    const parts = query.match(/"[^"]*"|\S+/g) || [];

    // bins
    const terms = [];
    const phrases = [];
    const tags = [];
    const supports = [];

    // put parts into bins
    for (let part of parts) {
      if (part.startsWith('"')) {
        part = part.replaceAll('"', "").trim();
        const matchedPrefix = Object.keys(quotedQueryPrefixes).find((prefix) =>
          part.startsWith(prefix)
        );

        if (matchedPrefix) {
          const target = quotedQueryPrefixes[matchedPrefix];
          ({ tags, supports }[target]).push(
            normalizeTag(part.replace(new RegExp(`${matchedPrefix}\\s*`), ""))
          );
        } else {
          phrases.push(part.toLowerCase());
        }
      } else terms.push(part.toLowerCase());
    }

    return { terms, phrases, tags, supports };
  };

  // normalize tag string for comparison
  window.normalizeTag = (tag) =>
    tag.trim().toLowerCase().replaceAll(/\s+/g, "-");

  // get data attribute contents of element and children
  const getAttr = (element, attr) =>
    [element, ...element.querySelectorAll(`[data-${attr}]`)]
      .map((element) => element.dataset[attr])
      .join(" ");

  const getNormalizedTextMatches = (element, selector) =>
    [...element.querySelectorAll(selector)].map((item) => normalizeTag(item.innerText));

  const isInInactiveTabPanel = (element) => {
    const panel = element.closest("[data-tab-panel]");
    return Boolean(panel && panel.hidden && !panel.classList.contains("is-active"));
  };

  const syncPageSectionTones = () => {
    const main = document.querySelector("main");
    if (!main) {
      return;
    }

    const pageSections = Array.from(main.children).filter((child) =>
      child.matches("section")
    );
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

  // determine if element should show up in results based on query
  const elementMatches = (element, { terms, phrases, tags, supports }) => {
    // tag elements within element
    const tagMatches = getNormalizedTextMatches(element, ".tag");
    const supportMatches = getNormalizedTextMatches(
      element,
      '[data-search-group="support"]'
    );

    // check if text content exists in element
    const hasText = (string) =>
      (
        element.innerText +
        getAttr(element, "tooltip") +
        getAttr(element, "search")
      )
        .toLowerCase()
        .includes(string);
    // check if text matches a tag in element
    const hasTag = (string) => tagMatches.includes(string);
    const hasSupport = (string) => supportMatches.includes(string);

    // match logic
    return (
      (terms.every(hasText) || !terms.length) &&
      (phrases.some(hasText) || !phrases.length) &&
      (tags.some(hasTag) || !tags.length) &&
      (supports.some(hasSupport) || !supports.length)
    );
  };

  // loop through elements, hide/show based on query, and return results info
  const filterElements = (parts) => {
    const elements = Array.from(document.querySelectorAll(elementSelector));

    // results info
    let x = 0;
    let n = 0;
    // filter elements
    for (const element of elements) {
      const isActive = !isInInactiveTabPanel(element);
      const matches = elementMatches(element, parts);

      if (isActive) {
        n++;
      }

      if (matches) {
        element.style.display = "";
        if (isActive) {
          x++;
        }
      } else {
        element.style.display = "none";
      }
    }

    return [x, n];
  };

  const isElementVisible = (element) => {
    if (!element || element.hidden || element.style.display === "none") {
      return false;
    }

    return true;
  };

  const syncYearHeadings = () => {
    const headingSelector = "h2, h3";
    const parents = new Set(
      Array.from(document.querySelectorAll(sectionElementSelector))
        .filter((element) => !isInInactiveTabPanel(element))
        .map((element) => element.parentElement)
        .filter(Boolean)
    );

    for (const parent of parents) {
      const children = Array.from(parent.children);
      let currentHeading = null;
      let visibleInSection = 0;

      const flushSection = () => {
        if (currentHeading) {
          currentHeading.hidden = visibleInSection === 0;
        }
      };

      for (const child of children) {
        if (child.matches(headingSelector)) {
          flushSection();
          currentHeading = child;
          visibleInSection = 0;
          continue;
        }

        if (!child.matches(sectionElementSelector)) {
          continue;
        }

        const target = child.matches(".post-excerpt-container")
          ? child.querySelector(".post-excerpt")
          : child;

        if (isElementVisible(child) && isElementVisible(target)) {
          visibleInSection += 1;
        }
      }

      flushSection();
    }

    // Some category headings sit beside a wrapper that contains the filterable
    // cards, e.g. Team h2 + .grid and Alumni h2 + .alumni-list.
    for (const heading of document.querySelectorAll(headingSelector)) {
      if (isInInactiveTabPanel(heading)) {
        continue;
      }

      let sibling = heading.nextElementSibling;
      let filterables = [];

      while (sibling && !sibling.matches(headingSelector)) {
        if (isInInactiveTabPanel(sibling)) {
          sibling = sibling.nextElementSibling;
          continue;
        }

        if (sibling.matches(sectionElementSelector)) {
          filterables.push(sibling);
        }

        filterables = filterables.concat(
          Array.from(sibling.querySelectorAll(sectionElementSelector))
        );
        sibling = sibling.nextElementSibling;
      }

      if (!filterables.length) {
        continue;
      }

      heading.hidden = !filterables.some((element) => isElementVisible(element));
    }

    for (const group of document.querySelectorAll(filterableGroupSelector)) {
      if (isInInactiveTabPanel(group)) {
        continue;
      }

      const filterables = Array.from(group.querySelectorAll(sectionElementSelector));

      if (!filterables.length) {
        continue;
      }

      group.hidden = !filterables.some((element) => isElementVisible(element));
    }
  };

  const syncFilterableSections = (query = "") => {
    const hasQuery = query.trim().length > 0;
    const main = document.querySelector("main");

    if (!main) {
      return;
    }

    for (const section of Array.from(main.children).filter((child) => child.matches("section"))) {
      if (isInInactiveTabPanel(section)) {
        continue;
      }

      const filterables = Array.from(section.querySelectorAll(sectionElementSelector)).filter(
        (element) => !isInInactiveTabPanel(element)
      );

      if (!filterables.length) {
        continue;
      }

      const shouldHide = hasQuery && !filterables.some((element) => {
        const target = element.matches(".post-excerpt-container")
          ? element.querySelector(".post-excerpt")
          : element;

        return isElementVisible(element) && isElementVisible(target);
      });

      section.hidden = shouldHide;
    }

    syncPageSectionTones();
  };

  // highlight search terms
  const highlightMatches = async ({ terms, phrases }) => {
    // make sure Mark library available
    if (typeof Mark === "undefined") return;

    // reset
    new Mark(document.body).unmark();

    // limit number of highlights to avoid slowdown
    let counter = 0;
    const filter = () => counter++ < 100;

    // highlight terms and phrases
    const activeElements = Array.from(document.querySelectorAll(elementSelector)).filter(
      (element) => !isInInactiveTabPanel(element)
    );

    new Mark(activeElements)
      .mark(terms, { separateWordSearch: true, filter })
      .mark(phrases, { separateWordSearch: false, filter });
  };

  // update search box based on query
  const updateSearchBox = (query = "") => {
    const boxes = document.querySelectorAll(searchBoxSelector);

    for (const box of boxes) {
      const input = box.querySelector("input");
      const button = box.querySelector("button");
      const icon = box.querySelector("button i");
      input.value = query;
      icon.className = input.value.length
        ? "icon fa-solid fa-xmark"
        : "icon fa-solid fa-magnifying-glass";
      button.disabled = input.value.length ? false : true;
    }
  };

  // update info box based on query and results
  const updateInfoBox = (query, x, n) => {
    const boxes = document.querySelectorAll(infoBoxSelector);

    if (query.trim()) {
      // show all info boxes
      boxes.forEach((info) => (info.style.display = ""));

      // info template
      let info = "";
      info += `Showing ${x.toLocaleString()} of ${n.toLocaleString()} results<br>`;
      info += "<a href='./'>Clear search</a>";

      // set info HTML string
      boxes.forEach((el) => (el.innerHTML = info));
    }
    // if nothing searched
    else {
      // hide all info boxes
      boxes.forEach((info) => (info.style.display = "none"));
    }
  };

  // update tags based on query
  const updateTags = (query) => {
    const { tags } = splitQuery(query);
    document.querySelectorAll(tagSelector).forEach((tag) => {
      // set active if tag is in query
      if (tags.includes(normalizeTag(tag.innerText)))
        tag.setAttribute("data-active", "");
      else tag.removeAttribute("data-active");
    });
  };

  // run search with query
  const runSearch = (query = "") => {
    const parts = splitQuery(query);
    const [x, n] = filterElements(parts);
    syncYearHeadings();
    syncFilterableSections(query);
    updateSearchBox(query);
    updateInfoBox(query, x, n);
    updateTags(query);
    highlightMatches(parts);
    window.dispatchEvent(new CustomEvent("search:updated", { detail: { query, matches: x, total: n } }));
  };

  // update url based on query
  const updateUrl = (query = "") => {
    const url = new URL(window.location);
    let params = new URLSearchParams(url.search);
    params.set("search", query);
    url.search = params.toString();
    window.history.replaceState(null, null, url);
  };

  // search based on url param
  const searchFromUrl = () => {
    const query =
      new URLSearchParams(window.location.search).get("search") || "";
    runSearch(query);
  };

  // return func that runs after delay
  const debounce = (callback, delay = 250) => {
    let timeout;
    return (...args) => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => callback(...args), delay);
    };
  };

  // when user types into search box
  const debouncedRunSearch = debounce(runSearch, 1000);
  window.onSearchInput = (target) => {
    debouncedRunSearch(target.value);
    updateUrl(target.value);
  };

  // when user clears search box with button
  window.onSearchClear = () => {
    runSearch();
    updateUrl();
  };

  // after page loads
  window.addEventListener("load", searchFromUrl);
  // after tags load
  window.addEventListener("tagsfetched", searchFromUrl);
  // after tabbed content changes
  window.addEventListener("tabs:updated", searchFromUrl);
}
