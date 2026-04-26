---
show-title: false
show-subtitle: false
---

{% include section.html size="full" dark="true" %}

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
          link="publications"
          text="Our Research"
          icon="fa-solid fa-arrow-right"
          flip=true
        %}
        {%
          include button.html
          link="contact"
          text="Join Us"
          style="bare"
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
      <li>재귀 타입</li>
      <li>모듈 시스템</li>
      <li>정적 의미론</li>
      <li>형식 검증</li>
    </ul>
  </article>
  <article class="home-research-card">
    <div class="home-research-icon">
      {% include icon.html icon="fa-solid fa-brain" %}
    </div>
    <p class="home-research-kicker">AI for Code</p>
    <strong>코드 생성, 번역, 자동 수정</strong>
    <ul class="home-research-tags">
      <li>대규모 코드 언어 모델</li>
      <li>버그 수정</li>
      <li>코드 번역</li>
      <li>프로그램 합성</li>
    </ul>
  </article>
  <article class="home-research-card">
    <div class="home-research-icon">
      {% include icon.html icon="fa-solid fa-chart-simple" %}
    </div>
    <p class="home-research-kicker">Software Engineering</p>
    <strong>프로그램 분석과 품질 자동화</strong>
    <ul class="home-research-tags">
      <li>정적 분석</li>
      <li>테스트</li>
      <li>자동 평가</li>
      <li>개발 자동화</li>
    </ul>
  </article>
  <article class="home-research-card">
    <div class="home-research-icon">
      {% include icon.html icon="fa-solid fa-briefcase-medical" %}
    </div>
    <p class="home-research-kicker">Healthcare AI</p>
    <strong>의료 데이터 분석과 임상 AI</strong>
    <ul class="home-research-tags">
      <li>의료 영상</li>
      <li>생체 신호</li>
      <li>임상 데이터</li>
      <li>의사결정 지원</li>
    </ul>
  </article>
</div>

{% include section.html %}

{% assign featured_publications = site.publications | where: "scope", "international" | sort: "date" | reverse %}
<div class="home-block reveal-on-scroll">
  <div class="home-block-header reveal-on-scroll">
    <p class="home-section-label">Research Output</p>
    <h2>연구 성과</h2>
  </div>
  <div class="home-research-publications">
    {% for publication in featured_publications limit:4 %}
      {% assign publication_venue = publication.venue | default: publication.subtitle | default: "" | strip %}
      <a class="home-research-publication reveal-on-scroll" href="{{ publication.url | relative_url }}">
        <div class="home-research-publication-image">
          <img
            src="{{ publication.image | relative_url }}"
            alt="{{ publication.title | escape }}"
            loading="lazy"
            {% include fallback.html %}
          >
        </div>
        <div class="home-research-publication-meta">
          <span>{{ publication.date | date: "%Y" }}</span>
          {% if publication_venue != "" %}
            <p class="home-research-publication-venue">{{ publication_venue }}</p>
          {% endif %}
        </div>
        <strong>{{ publication.title }}</strong>
        {% if publication.authors %}
          <p>{{ publication.authors | join: ", " }}</p>
        {% elsif publication.author %}
          <p>{{ publication.author }}</p>
        {% endif %}
      </a>
    {% endfor %}
  </div>
  <div class="home-news-more">
    {%
      include button.html
      link="publications"
      text="전체 논문 보기"
      icon="fa-solid fa-arrow-right"
      style="bare"
    %}
  </div>
</div>

{% include section.html %}

<div class="home-block reveal-on-scroll">
  <div class="home-block-header reveal-on-scroll">
    <p class="home-section-label">Graduate Programs</p>
    <h2>대학원 프로그램</h2>
  </div>
  <div class="home-program-grid">
    <a class="home-program-card reveal-on-scroll" href="http://knuds.kangwon.ac.kr/ds/index.do">
      <strong>데이터사이언스학과</strong>
      <span>일반대학원 연계</span>
      <p>데이터사이언스융합인재양성사업과 연계하여 데이터 중심 연구를 수행합니다.</p>
    </a>
    <a class="home-program-card reveal-on-scroll" href="https://bk21.kangwon.ac.kr/bk21/index.do">
      <strong>빅데이터메디컬융합학과</strong>
      <span>일반대학원 / BK21</span>
      <p>4단계 BK21 사업과 연계하여 의료 데이터와 AI 기반 융합 연구를 진행합니다.</p>
    </a>
    <a class="home-program-card reveal-on-scroll" href="https://cse.kangwon.ac.kr/cse/index.do">
      <strong>컴퓨터공학과</strong>
      <span>일반대학원 연계</span>
      <p>연구 과제 참여를 바탕으로 시스템 및 소프트웨어 연구를 수행합니다.</p>
    </a>
    <a class="home-program-card reveal-on-scroll" href="https://edugradu.kangwon.ac.kr/edugradu/index.do">
      <strong>컴퓨터교육전공</strong>
      <span>교육대학원</span>
      <p>교직 이수와 함께 컴퓨팅 교육 및 프로그래밍 언어 교육 관련 연구를 수행합니다.</p>
    </a>
    <a class="home-program-card reveal-on-scroll" href="http://cse.kangwon.ac.kr/cse/index.do">
      <strong>정보보안전공</strong>
      <span>정보과학행정대학원</span>
      <p>야간제 기반으로 정보보안 및 실무 중심의 융합 연구를 병행할 수 있습니다.</p>
    </a>
  </div>
  <div class="home-inline-links">
    <a href="https://graduate.kangwon.ac.kr/graduate/index.do">일반대학원</a>
    <a href="https://edugradu.kangwon.ac.kr/edugradu/index.do">교육대학원</a>
    <a href="https://information.kangwon.ac.kr/information/index.do">정보과학행정대학원</a>
  </div>
</div>

{% include section.html %}

<div class="home-news-feed reveal-on-scroll">
  <div class="home-block-header reveal-on-scroll">
    <p class="home-section-label">Latest News</p>
    <h2>최근 소식</h2>
  </div>
  <div class="home-news-list">
    {% for post in site.posts limit:3 %}
      <div class="reveal-on-scroll">
        {% include post-excerpt.html lookup=post.slug %}
      </div>
    {% endfor %}
  </div>
  <div class="home-news-more">
    {%
      include button.html
      link="news"
      text="전체 소식 보기"
      icon="fa-solid fa-arrow-right"
      style="bare"
    %}
  </div>
</div>
