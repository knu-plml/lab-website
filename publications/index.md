---
title: Publications
nav:
  order: 2
  tooltip: Journal, conference, and domestic publications
---

# {% include icon.html icon="fa-solid fa-scroll" %}Publications

Selected work from PLML Laboratory is organized below across international publications, domestic journals, and domestic conferences.

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
      International ({{ international_publications.size }})
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
      Domestic ({{ domestic_publications.size }})
    </button>
  </div>

  <div
    class="publication-tab-panel is-active"
    id="publication-panel-international"
    role="tabpanel"
    aria-labelledby="publication-tab-international"
    data-tab-panel="international"
  >
    {% include list.html data="publications" component="publication-card" filter="tags && tags.include?('international')" %}
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
  </div>
</div>
