---
title: Team
nav:
  order: 3
  tooltip: Faculty, researchers, students, and alumni
---

# {% include icon.html icon="fa-solid fa-users" %}Team

PLML Laboratory brings together programming languages and machine learning researchers at Kangwon National University.

## Faculty

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'principal-investigator'" %}
</div>

## Postdoctoral Researchers

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'postdoc'" %}
</div>

## PhD Students

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'phd'" %}
</div>

## MS Students

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'ms'" %}
</div>

## Undergraduate Researchers

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'undergrad'" %}
</div>

## Alumni

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'alumni'" %}
</div>
