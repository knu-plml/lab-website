---
title: Alumni
permalink: /members/alumni/
---

# {% include icon.html icon="fa-solid fa-user-graduate" %}Alumni

{% assign members = site.members | data_filter: "role != 'principal-investigator'" | sort: "name" %}
{% assign phd_alumni = members | data_filter: "content&.include?('Ph.D. in')" %}
{% assign phd_coursework_alumni = members | data_filter: "content&.include?('Ph.D. coursework completed')" %}
{% assign ms_alumni = members | data_filter: "content&.include?('M.S. in') && !content&.include?('Ph.D. in') && !content&.include?('Ph.D. coursework completed')" %}
{% assign ms_coursework_alumni = members | data_filter: "content&.include?('M.S. coursework completed')" %}
{% assign undergrad_alumni = members | data_filter: "content&.include?('B.S. in') && !content&.include?('M.S. in') && !content&.include?('Ph.D. in') && !content&.include?('Ph.D. coursework completed') && !content&.include?('M.S. coursework completed')" %}

{% if phd_alumni.size > 0 %}
## Ph.D.

<div class="alumni-list">
  {% for member in phd_alumni %}
    {% include alumni-entry.html member=member %}
  {% endfor %}
</div>
{% endif %}

{% if phd_coursework_alumni.size > 0 %}
## Ph.D. Coursework Completed

<div class="alumni-list">
  {% for member in phd_coursework_alumni %}
    {% include alumni-entry.html member=member %}
  {% endfor %}
</div>
{% endif %}

{% if ms_alumni.size > 0 %}
## M.S.

<div class="alumni-list">
  {% for member in ms_alumni %}
    {% include alumni-entry.html member=member %}
  {% endfor %}
</div>
{% endif %}

{% if ms_coursework_alumni.size > 0 %}
## M.S. Coursework Completed

<div class="alumni-list">
  {% for member in ms_coursework_alumni %}
    {% include alumni-entry.html member=member %}
  {% endfor %}
</div>
{% endif %}

{% if undergrad_alumni.size > 0 %}
## Undergraduate Interns

<div class="alumni-list">
  {% for member in undergrad_alumni %}
    {% include alumni-entry.html member=member %}
  {% endfor %}
</div>
{% endif %}
