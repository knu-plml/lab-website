---
title: News
nav:
  order: 5
  tooltip: Announcements and updates
---

# {% include icon.html icon="fa-solid fa-bullhorn" %}News

{% include search-box.html %}
{% include search-info.html %}
{% assign news_tags = site.news | map: "tags" | join: "," | split: "," %}
{% include tags.html tags=news_tags class="tag-scroll" %}

{% include list.html data="news" component="post-excerpt" section_per_year=true %}
