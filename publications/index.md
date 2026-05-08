---
title: Publications
nav:
  order: 2
  tooltip: Journal, conference, and domestic publications
---

# {% include icon.html icon="fa-solid fa-scroll" %}Publications

{% assign international_publications = site.publications | where: "scope", "international" %}
{% assign domestic_publications = site.publications | where: "scope", "domestic" %}
{% assign publications_by_date = site.publications | sort: "date" | reverse %}
{% assign publication_years = site.publications | collection_years %}

{% include search-box.html %}

<div class="publication-filters tags tag-scroll">
  {% for item in site.data.publication_filters %}
    <a
      href="?search=&quot;tag: {{ item.tag }}&quot;"
      class="tag"
      data-publication-search-link
      data-tooltip="Filter publications by {{ item.label }}"
    >
      {{ item.label }}
    </a>
  {% endfor %}
</div>

<div class="publication-tabs" data-publication-tabs>
  <div class="publication-tabs-toolbar">
    <div class="publication-tabs-nav ui-segmented" role="tablist" aria-label="Publication categories">
      <button
        type="button"
        class="publication-tab is-active"
        id="publication-tab-international"
        role="tab"
        aria-selected="true"
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
        data-tab-target="domestic"
      >
        <span data-tab-label>Domestic</span>
        <span data-tab-count>({{ domestic_publications.size }})</span>
      </button>
    </div>

    <div class="publication-kind-filters ui-segmented" role="group" aria-label="Publication type">
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
  <p class="publication-tab-empty" data-publication-empty hidden>No publications found for this type.</p>
</div>

{% for year in publication_years %}
  {% assign year_name = year | append: "" %}
  {% assign has_year_publications = false %}
  {% for publication in publications_by_date %}
    {% assign publication_year = publication.date | date: "%Y" %}
    {% if publication_year == year_name %}
      {% assign has_year_publications = true %}
    {% endif %}
  {% endfor %}

  {% unless has_year_publications %}
    {% continue %}
  {% endunless %}

  {% include section.html %}

  <div class="publication-year-section" data-publication-year-section>
    <h3 class="list-year-heading" id="{{ year_name }}">{{ year_name }}</h3>

    <div
      class="publication-tab-panel is-active"
      role="tabpanel"
      aria-labelledby="publication-tab-international"
      data-tab-panel="international"
    >
      {% for publication in publications_by_date %}
        {% assign publication_year = publication.date | date: "%Y" %}
        {% if publication_year == year_name and publication.scope == "international" %}
          {% include publication-card.html publication=publication %}
        {% endif %}
      {% endfor %}
    </div>

    <div
      class="publication-tab-panel"
      role="tabpanel"
      aria-labelledby="publication-tab-domestic"
      data-tab-panel="domestic"
      hidden
    >
      {% for publication in publications_by_date %}
        {% assign publication_year = publication.date | date: "%Y" %}
        {% if publication_year == year_name and publication.scope == "domestic" %}
          {% include publication-card.html publication=publication %}
        {% endif %}
      {% endfor %}
    </div>
  </div>
{% endfor %}
