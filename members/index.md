---
title: Team
nav:
  order: 3
  tooltip: Faculty, researchers, and students
---

# {% include icon.html icon="fa-solid fa-users" %}Team

{% include members-nav.html current="team" %}

{% assign professors = site.members | data_filter: "role == 'principal-investigator'" %}
{% if professors.size > 0 %}
## Professor

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'principal-investigator'" %}
</div>
{% endif %}

{% assign postdocs = site.members | data_filter: "role == 'postdoc'" %}
{% if postdocs.size > 0 %}
## Postdoctoral Researchers

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'postdoc'" %}
</div>
{% endif %}

{% assign phd_students = site.members | data_filter: "role == 'phd'" %}
{% if phd_students.size > 0 %}
## PhD Students

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'phd'" %}
</div>
{% endif %}

{% assign ms_students = site.members | data_filter: "role == 'ms'" %}
{% if ms_students.size > 0 %}
## MS Students

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'ms'" %}
</div>
{% endif %}

{% assign undergrads = site.members | data_filter: "role == 'undergrad'" %}
{% if undergrads.size > 0 %}
## Undergraduate Researchers

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'undergrad'" %}
</div>
{% endif %}
