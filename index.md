---
show-title: false
show-subtitle: false
---

{% include section.html size="full" %}

<div class="home-hero">
  <div class="home-hero-inner">
    <div class="home-hero-copy">
      <h1 class="home-hero-title">
        <span>PLML</span> Laboratory
      </h1>
      <p class="home-hero-tagline">Programming Language & Machine Learning Lab.</p>
      <p class="home-hero-lead">
        인공지능 기술을 중심으로 프로그래밍 언어, 소프트웨어 공학, 기계학습, 의료 인공지능 분야의 혁신적인 연구를 수행합니다.
      </p>
      <div class="home-hero-actions">
        {%
          include button.html
          link="contact"
          text="Join Us"
          icon="fa-solid fa-arrow-right"
          flip=true
        %}
      </div>
    </div>
  </div>
</div>

<div class="home-research-overview">
  <article class="home-research-card">
    <div class="home-research-icon">
      {% include icon.html icon="fa-solid fa-code" %}
    </div>
    <p class="home-research-kicker">Programming Languages</p>
    <strong>타입 시스템과 형식 기법</strong>
    <ul class="home-research-tags">
      <li>
        <span>타입 시스템</span>
        <span>정적 분석</span>
      </li>
      <li>
        <span>정규식</span>
        <span>형식 기법</span>
      </li>
    </ul>
  </article>
  <article class="home-research-card">
    <div class="home-research-icon">
      {% include icon.html icon="fa-solid fa-brain" %}
    </div>
    <p class="home-research-kicker">Software Engineering</p>
    <strong>소프트웨어 공학</strong>
    <ul class="home-research-tags">
      <li>
        <span>Code LLM</span>
        <span>자동 프로그램 수정</span>
      </li>
      <li>
        <span>결함 위치 추적</span>
        <span>코드 번역</span>
      </li>
    </ul>
  </article>
  <article class="home-research-card">
    <div class="home-research-icon">
      {% include icon.html icon="fa-solid fa-shield-halved" %}
    </div>
    <p class="home-research-kicker">Data Systems & Security</p>
    <strong>데이터 시스템과 보안</strong>
    <ul class="home-research-tags">
      <li>
        <span>블록체인</span>
        <span>스마트 컨트랙트</span>
      </li>
      <li>
        <span>스카이라인 쿼리</span>
        <span>데이터 스트림</span>
      </li>
    </ul>
  </article>
  <article class="home-research-card">
    <div class="home-research-icon">
      {% include icon.html icon="fa-solid fa-briefcase-medical" %}
    </div>
    <p class="home-research-kicker">Healthcare AI</p>
    <strong>의료 데이터 분석과 임상 AI</strong>
    <ul class="home-research-tags">
      <li>
        <span>임상 예측</span>
        <span>심전도 분석</span>
      </li>
      <li>
        <span>AutoML</span>
        <span>의료 LLM</span>
      </li>
    </ul>
  </article>
</div>

{% include section.html %}

{% assign featured_publications = site.publications | where: "scope", "international" | sort: "date" | reverse %}
<div class="home-block reveal-on-scroll">
  <div class="home-block-header reveal-on-scroll">
    <p class="home-section-label">Research Output</p>
    <div class="home-block-title-row">
      <h2>연구 성과</h2>
      <a class="home-block-title-link" href="{{ 'publications' | relative_url }}">전체 논문 보기</a>
    </div>
  </div>
  <div class="home-research-publications">
    {% for publication in featured_publications limit:4 %}
      {% assign publication_venue = publication.venue | default: publication.subtitle | default: "" | strip %}
      {% assign publication_venue_url = publication.venue_url | default: "" | strip %}
      <article class="home-research-publication reveal-on-scroll">
        <a
          class="home-research-publication-image"
          href="{{ publication.url | relative_url }}"
          aria-label="{{ publication.title | escape }}"
        >
          <img
            src="{{ publication.image | relative_url }}"
            alt="{{ publication.title | escape }}"
            loading="lazy"
            {% include fallback.html %}
          >
        </a>
        <div class="home-research-publication-meta">
          <span>{{ publication.date | date: "%Y" }}</span>
          <a class="home-research-publication-title" href="{{ publication.url | relative_url }}">
            <strong>{{ publication.title }}</strong>
          </a>
          {% if publication_venue != "" %}
            {% if publication_venue_url != "" %}
              <a
                class="home-research-publication-venue"
                href="{{ publication_venue_url | escape }}"
                target="_blank"
                rel="noopener"
              >
                {{ publication_venue }}
              </a>
            {% else %}
              <p class="home-research-publication-venue">{{ publication_venue }}</p>
            {% endif %}
          {% endif %}
        </div>
        {% assign homepage_authors_text = publication.authors | join: ", " | replace: " ", " " | strip %}
        <p>{{ homepage_authors_text }}</p>
        {% if homepage_authors_text contains "*" %}
          <p class="home-research-publication-author-note">(* equal contributions)</p>
        {% endif %}
      </article>
    {% endfor %}
  </div>
</div>

{% include section.html %}

<div class="home-news-feed reveal-on-scroll">
  <div class="home-block-header reveal-on-scroll">
    <p class="home-section-label">Latest News</p>
    <div class="home-block-title-row">
      <h2>최근 소식</h2>
      <a class="home-block-title-link" href="{{ 'news' | relative_url }}">전체 소식 보기</a>
    </div>
  </div>
  <div class="home-news-list">
    {% for post in site.posts limit:3 %}
      <div class="reveal-on-scroll">
        {% include post-excerpt.html lookup=post.slug %}
      </div>
    {% endfor %}
  </div>
</div>
