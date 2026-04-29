---
title: News
nav:
  order: 5
  tooltip: Announcements and updates
---

# {% include icon.html icon="fa-solid fa-bullhorn" %}News

{% include search-box.html %}
{% include search-info.html %}
{% include tags.html tags=site.tags %}

{% include list.html data="posts" component="post-excerpt" section_per_year=true %}
