---
title: Courses
nav:
  order: 4
  tooltip: Course pages and teaching history
  header-dark: true
---

# {% include icon.html icon="fa-solid fa-book-open" %}Courses

<div class="courses-page">
  {% assign emptyarray = "" | split: "," %}
  <div class="courses-page-rule"></div>

  <div class="courses-page-notice">
    <i class="fa-regular fa-circle-question" aria-hidden="true"></i>
    <span>
      강의 자료는
      <a href="https://eruri.kangwon.ac.kr/" target="_blank" rel="noreferrer">스마트캠퍼스 e-루리</a>
      를 통해 제공됩니다.
    </span>
  </div>

  {% assign courses_sorted = site.courses | sort: "latest_sort" | reverse %}

  <div class="courses-group-list">
    {% for latest in courses_sorted %}
      {% assign semesters = latest.semesters | default: emptyarray %}
      {% assign latest_semester = semesters | first %}
      {% assign earliest_semester = semesters | last %}
      {% assign latest_description = latest.description | to_s | strip %}
      {% assign latest_year = latest_semester.year | default: "" %}
      {% assign earliest_year = earliest_semester.year | default: "" %}
      <section class="course-group">
        <div class="course-group-header">
          <div class="course-group-main">
            <h2 class="course-group-title">{{ latest.title }}</h2>
            {% if latest.title_en %}
              <p class="course-group-title-en">{{ latest.title_en }}</p>
            {% endif %}
          </div>
          <div class="course-group-meta">
            <span>{{ semesters | size }}회 개설</span>
            <span>{{ earliest_year }}-{{ latest_year }}</span>
          </div>
        </div>

        <div class="course-group-tags">
          {% if latest.tags %}
            {% for tag in latest.tags %}
              {% assign label = tag %}
              {% case tag %}
                {% when "graduate" %}
                  {% assign label = "대학원" %}
                {% when "graduate-school-of-education" %}
                  {% assign label = "교육대학원" %}
                {% when "online" %}
                  {% assign label = "온라인수업" %}
                {% when "team-teaching" %}
                  {% assign label = "팀티칭" %}
              {% endcase %}
              <span class="course-row-tag">{{ label }}</span>
            {% endfor %}
          {% endif %}

          {% if latest_description contains "강원혁신플랫폼" %}
            <span class="course-row-tag">강원혁신플랫폼</span>
          {% endif %}

          {% if latest_description contains "일반" %}
            <span class="course-row-tag">일반</span>
          {% endif %}
        </div>

        <div class="course-group-dates">
          {% for semester in semesters %}
            {% assign term_ko = semester.term %}
            {% case semester.term %}
              {% when "spring" %}
                {% assign term_ko = "봄" %}
              {% when "summer" %}
                {% assign term_ko = "여름" %}
              {% when "fall" %}
                {% assign term_ko = "가을" %}
              {% when "winter" %}
                {% assign term_ko = "겨울" %}
            {% endcase %}

            <span class="course-date-chip" aria-disabled="true">
              <span class="course-date-chip-year">{{ semester.year }}</span>
              <span class="course-date-chip-term">{{ term_ko }}</span>
            </span>
          {% endfor %}
        </div>
      </section>
    {% endfor %}
  </div>
</div>
