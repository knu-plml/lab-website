---
title: Team
nav:
  order: 3
  tooltip: Faculty, researchers, and students
---

# {% include icon.html icon="fa-solid fa-users" %}Team

{% include search-box.html %}
{% include search-info.html %}

{% include members-nav.html current="team" %}

{% assign professors = site.members | data_filter: "role == 'principal-investigator'" %}
{% if professors.size > 0 %}
{% include section.html %}
<tab-panel>team</tab-panel>
## Professor

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'principal-investigator'" %}
</div>
{% endif %}

{% assign postdocs = site.members | data_filter: "role == 'postdoc'" %}
{% if postdocs.size > 0 %}
{% include section.html %}
<tab-panel>team</tab-panel>
## Postdoctoral Researchers

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'postdoc'" %}
</div>
{% endif %}

{% assign phd_students = site.members | data_filter: "role == 'phd'" %}
{% if phd_students.size > 0 %}
{% include section.html %}
<tab-panel>team</tab-panel>
## PhD Students

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'phd'" %}
</div>
{% endif %}

{% assign ms_students = site.members | data_filter: "role == 'ms'" %}
{% if ms_students.size > 0 %}
{% include section.html %}
<tab-panel>team</tab-panel>
## MS Students

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'ms'" %}
</div>
{% endif %}

{% assign undergrads = site.members | data_filter: "role == 'undergrad'" %}
{% if undergrads.size > 0 %}
{% include section.html %}
<tab-panel>team</tab-panel>
## Undergraduate Researchers

<div class="grid">
  {% include list.html data="members" component="portrait" filter="role == 'undergrad'" %}
</div>
{% endif %}

{% assign alumni_members = site.members | data_filter: "role != 'principal-investigator'" | sort: "name" %}
{% assign phd_alumni = alumni_members | data_filter: "Array(education).any? { |entry| entry['degree'] == 'Ph.D.' } || content&.include?('Ph.D. in')" | sort_by_education_date %}
{% assign phd_coursework_alumni = alumni_members | data_filter: "Array(education).any? { |entry| entry['degree'] == 'Ph.D. coursework completed' } || content&.include?('Ph.D. coursework completed')" | sort_by_education_date %}
{% assign ms_alumni = alumni_members | data_filter: "(Array(education).any? { |entry| entry['degree'] == 'M.S.' } || content&.include?('M.S. in')) && !(Array(education).any? { |entry| entry['degree'] == 'Ph.D.' } || content&.include?('Ph.D. in')) && !(Array(education).any? { |entry| entry['degree'] == 'Ph.D. coursework completed' } || content&.include?('Ph.D. coursework completed'))" | sort_by_education_date %}
{% assign ms_coursework_alumni = alumni_members | data_filter: "Array(education).any? { |entry| entry['degree'] == 'M.S. coursework completed' } || content&.include?('M.S. coursework completed')" | sort_by_education_date %}
{% assign undergrad_alumni = alumni_members | data_filter: "(Array(education).any? { |entry| entry['degree'] == 'B.S.' } || content&.include?('B.S. in')) && !(Array(education).any? { |entry| entry['degree'] == 'M.S.' } || content&.include?('M.S. in')) && !(Array(education).any? { |entry| entry['degree'] == 'Ph.D.' } || content&.include?('Ph.D. in')) && !(Array(education).any? { |entry| entry['degree'] == 'Ph.D. coursework completed' } || content&.include?('Ph.D. coursework completed')) && !(Array(education).any? { |entry| entry['degree'] == 'M.S. coursework completed' } || content&.include?('M.S. coursework completed'))" | sort_by_education_date %}

{% if phd_alumni.size > 0 %}
{% include section.html %}
<tab-panel>alumni</tab-panel>
## Ph.D.

<div class="alumni-list">
  {% for member in phd_alumni %}
    {% include alumni-entry.html member=member %}
  {% endfor %}
</div>
{% endif %}

{% if phd_coursework_alumni.size > 0 %}
{% include section.html %}
<tab-panel>alumni</tab-panel>
## Ph.D. Coursework Completed

<div class="alumni-list">
  {% for member in phd_coursework_alumni %}
    {% include alumni-entry.html member=member %}
  {% endfor %}
</div>
{% endif %}

{% if ms_alumni.size > 0 %}
{% include section.html %}
<tab-panel>alumni</tab-panel>
## M.S.

<div class="alumni-list">
  {% for member in ms_alumni %}
    {% include alumni-entry.html member=member %}
  {% endfor %}
</div>
{% endif %}

{% if ms_coursework_alumni.size > 0 %}
{% include section.html %}
<tab-panel>alumni</tab-panel>
## M.S. Coursework Completed

<div class="alumni-list">
  {% for member in ms_coursework_alumni %}
    {% include alumni-entry.html member=member %}
  {% endfor %}
</div>
{% endif %}

{% if undergrad_alumni.size > 0 %}
{% include section.html %}
<tab-panel>alumni</tab-panel>
## Undergraduate Interns

<div class="alumni-list">
  {% for member in undergrad_alumni %}
    {% include alumni-entry.html member=member %}
  {% endfor %}
</div>
{% endif %}
