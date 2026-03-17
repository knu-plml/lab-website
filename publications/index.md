---
title: Publications
nav:
  order: 2
  tooltip: Journal, conference, and domestic publications
---

# {% include icon.html icon="fa-solid fa-scroll" %}Publications

{% assign international_publications = site.publications | data_filter: "tags && tags.include?('international')" %}
{% assign domestic_publications = site.publications | data_filter: "tags && (tags.include?('domestic-journal') || tags.include?('domestic-conference'))" %}

{% include search-box.html %}
{% include search-info.html %}

<div class="publication-filters tags">
  {% for item in site.data.publication_filters %}
    <a
      href="?search=&quot;tag: {{ item.tag }}&quot;"
      class="tag"
      data-tooltip="Filter publications by {{ item.label }}"
    >
      {{ item.label }}
    </a>
  {% endfor %}
</div>

{% include section.html %}

<div class="publication-tabs" data-publication-tabs>
  <div class="publication-tabs-toolbar">
    <div class="publication-tabs-nav" role="tablist" aria-label="Publication categories">
      <button
        type="button"
        class="publication-tab is-active"
        id="publication-tab-international"
        role="tab"
        aria-selected="true"
        aria-controls="publication-panel-international"
        data-tab-target="international"
      >
        <span data-tab-label>International</span>
        <span data-tab-count>({{ international_publications.size }})</span>
      </button>
      <button
        type="button"
        class="publication-tab"
        id="publication-tab-domestic"
        role="tab"
        aria-selected="false"
        aria-controls="publication-panel-domestic"
        data-tab-target="domestic"
      >
        <span data-tab-label>Domestic</span>
        <span data-tab-count>({{ domestic_publications.size }})</span>
      </button>
    </div>

    <div class="publication-kind-filters" role="group" aria-label="Publication type">
      <button
        type="button"
        class="publication-kind-filter is-active"
        data-kind-filter="all"
        aria-pressed="true"
      >
        All
      </button>
      <button
        type="button"
        class="publication-kind-filter"
        data-kind-filter="conference"
        aria-pressed="false"
      >
        Conference
      </button>
      <button
        type="button"
        class="publication-kind-filter"
        data-kind-filter="journal"
        aria-pressed="false"
      >
        Journal
      </button>
    </div>
  </div>

  <div
    class="publication-tab-panel is-active"
    id="publication-panel-international"
    role="tabpanel"
    aria-labelledby="publication-tab-international"
    data-tab-panel="international"
  >
    {% include list.html data="publications" component="publication-card" filter="tags && tags.include?('international')" %}
    <p class="publication-tab-empty" data-publication-empty hidden>No publications found for this type.</p>
  </div>

  <div
    class="publication-tab-panel"
    id="publication-panel-domestic"
    role="tabpanel"
    aria-labelledby="publication-tab-domestic"
    data-tab-panel="domestic"
    hidden
  >
    {% include list.html data="publications" component="publication-card" filter="tags && (tags.include?('domestic-journal') || tags.include?('domestic-conference'))" %}
    <p class="publication-tab-empty" data-publication-empty hidden>No publications found for this type.</p>
  </div>
</div>
