---
title: Gallery
nav:
  order: 4.5
  tooltip: Lab moments, events, and conference photos
---

# {% include icon.html icon="fa-regular fa-images" %}Gallery

{% include search-box.html %}
{% include search-info.html %}

{% assign gallery_tags = site.gallery | map: "tags" | join: "," | downcase | split: "," | array_filter | uniq %}

{% include tags.html tags=gallery_tags class="gallery-tags tag-scroll" %}

{% assign gallery_items = site.gallery | sort: "date" | reverse %}
{% capture gallery_years_raw %}
  {% for item in gallery_items %}
    {{ item.date | date: "%Y" }},
  {% endfor %}
{% endcapture %}
{% assign gallery_years = gallery_years_raw | split: "," | array_filter | uniq %}

{% for year in gallery_years %}
{% include section.html %}

<div class="gallery-page publication-year-section" data-gallery-year-section>
  <h3 id="{{ year }}">{{ year }}</h3>

  <div class="gallery-grid">
    {% for item in gallery_items %}
      {% assign item_year = item.date | date: "%Y" %}
      {% if item_year == year %}
        {% assign photos = item.photos | default: empty %}
        {% assign cover = item.cover | default: photos.first | default: "images/fallback.svg" %}
        {% assign photo_count = photos | size %}
        {% assign excerpt = item.content | markdownify | strip_html | strip %}

        <article class="gallery-card ui-surface-panel" data-search="{{ item.title | xml_escape }} {{ item.tags | join: ' ' | xml_escape }}">
          <a class="gallery-card-image ui-surface-subtle" href="{{ item.url | relative_url | uri_escape }}">
            <img
              src="{{ cover | relative_url | uri_escape }}"
              alt="{{ item.title | default: "Gallery photo" | regex_strip }}"
              loading="lazy"
              {% include fallback.html %}
            >
          </a>
          <div class="gallery-card-body">
            <h3>
              <a href="{{ item.url | relative_url | uri_escape }}">
                {{ item.title }}
              </a>
            </h3>

            {% if excerpt != "" %}
              <p>{{ excerpt | truncate: 150 }}</p>
            {% endif %}

            {% if item.tags and item.tags.size > 0 %}
              <div class="gallery-card-tags">
                {% for tag in item.tags %}
                  <a
                    href="{{ page.dir | relative_url }}?search=&quot;tag: {{ tag | downcase }}&quot;"
                    class="gallery-card-tag tag ui-chip"
                    data-tooltip="Show items with the tag &quot;{{ tag | downcase }}&quot;"
                  >
                    {{ tag | downcase }}
                  </a>
                {% endfor %}
              </div>
            {% endif %}

            <div class="gallery-card-meta">
              <span>
                <i class="fa-regular fa-calendar-days" aria-hidden="true"></i>
                {{ item.date | date: "%B %-d, %Y" }}
              </span>
              <span>
                <i class="fa-regular fa-images" aria-hidden="true"></i>
                {{ photo_count }} photos
              </span>
            </div>
          </div>
        </article>
      {% endif %}
    {% endfor %}
  </div>
</div>
{% endfor %}
