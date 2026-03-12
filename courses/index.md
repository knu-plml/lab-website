---
title: Courses
nav:
  order: 4
  tooltip: Course pages and teaching history
  header-dark: true
---

# {% include icon.html icon="fa-solid fa-book-open" %}Courses

PLML teaching spans programming languages, machine learning, software engineering, formal methods, and interdisciplinary graduate offerings.

<div class="courses-page">
  <div class="courses-page-rule"></div>

  <div class="courses-page-notice">
    <i class="fa-regular fa-circle-question" aria-hidden="true"></i>
    <span>
      강의 자료는
      <a href="https://eruri.kangwon.ac.kr/" target="_blank" rel="noreferrer">스마트캠퍼스 e-루리</a>
      를 통해 제공됩니다.
    </span>
  </div>

  {% assign courses_sorted = site.courses | sort: "date" | reverse %}
  {% assign course_groups = courses_sorted | group_by_exp: "course", "course.title | append: '||' | append: course.title_en" %}

  <div class="courses-group-list">
    {% for group in course_groups %}
      {% assign latest = group.items | first %}
      {% assign earliest = group.items | last %}
      {% assign latest_description = latest.description | to_s | strip %}
      <section class="course-group">
        <div class="course-group-header">
          <div class="course-group-main">
            <h2 class="course-group-title">{{ latest.title }}</h2>
            {% if latest.title_en %}
              <p class="course-group-title-en">{{ latest.title_en }}</p>
            {% endif %}
          </div>
          <div class="course-group-meta">
            <span>{{ group.items | size }}회 개설</span>
            <span>{{ earliest.date | date: "%Y" }}-{{ latest.date | date: "%Y" }}</span>
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
          {% for course in group.items %}
            {% assign subtitle_normalized = course.subtitle | replace: " ", " " | strip %}
            {% assign term = subtitle_normalized | split: " " | last %}
            {% assign term_ko = term %}
            {% case term %}
              {% when "Spring" %}
                {% assign term_ko = "봄" %}
              {% when "Summer" %}
                {% assign term_ko = "여름" %}
              {% when "Fall" %}
                {% assign term_ko = "가을" %}
              {% when "Winter" %}
                {% assign term_ko = "겨울" %}
            {% endcase %}

            <span class="course-date-chip" aria-disabled="true">
              <span class="course-date-chip-year">{{ course.date | date: "%Y" }}</span>
              <span class="course-date-chip-term">{{ term_ko }}</span>
            </span>
          {% endfor %}
        </div>
      </section>
    {% endfor %}
</div>
