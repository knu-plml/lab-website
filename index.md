---
header-dark: false
show-title: false
show-subtitle: false
---

<div class="home-hero-panel reveal-on-scroll">
  <div class="home-hero-copy">
    <p class="home-section-label">Welcome!</p>
    <h1 class="home-hero-title">
      <span>Programming Language & Machine Learning Lab.</span>
    </h1>
    <p class="home-hero-lead">
      강원대학교 PLML 연구실은 프로그래밍 언어, 소프트웨어 공학, 기계학습, 의료 인공지능을 중심으로 다양한 연구를 수행합니다.<br />
      학부 연구 참여부터 학·석사 연계, 석사 및 박사 과정까지 함께 성장할 연구원을 상시 모집하고 있습니다.<br />
      관심이 있는 학생은 임현승 교수에게 상담을 신청하거나, 연구실 학생들과 이야기해보기 바랍니다.
    </p>
    <div class="home-hero-actions">
      {%
        include button.html
        link="contact"
        text="연락하기"
        icon="fa-solid fa-arrow-right"
      %}
      {%
        include button.html
        link="members"
        text="연구실 구성원 보기"
        icon="fa-solid fa-users"
        style="bare"
      %}
    </div>
    <div class="home-hero-chips">
      <span>Programming Languages</span>
      <span>Machine Learning</span>
      <span>Software Engineering</span>
      <span>Healthcare AI</span>
    </div>
  </div>
</div>

{% include section.html %}

<div class="home-block reveal-on-scroll">
  <div class="home-block-header reveal-on-scroll">
    <p class="home-section-label">Research Areas</p>
    <h2>주요 연구 분야</h2>
  </div>
  <div class="home-research-grid">
    <article class="home-research-card reveal-on-scroll">
      <div class="home-research-image">
        <img
          src="{{ 'images/research/programming-languages.svg' | relative_url }}"
          alt="타입 시스템과 형식 기법 연구 이미지"
        >
      </div>
      <p class="home-research-kicker">Programming Languages</p>
      <strong>타입 시스템과 형식 기법</strong>
      <p>재귀 타입, 모듈 시스템, 정적 의미론, 형식 검증을 통해 언어의 안전성과 표현력을 연구합니다.</p>
    </article>
    <article class="home-research-card reveal-on-scroll">
      <div class="home-research-image">
        <img
          src="{{ 'images/research/ai-for-code.svg' | relative_url }}"
          alt="코드 생성, 번역, 자동 수정 연구 이미지"
        >
      </div>
      <p class="home-research-kicker">AI for Code</p>
      <strong>코드 생성, 번역, 자동 수정</strong>
      <p>대규모 코드 언어 모델을 활용해 버그 수정, 코드 번역, 프로그램 합성과 같은 문제를 다룹니다.</p>
    </article>
    <article class="home-research-card reveal-on-scroll">
      <div class="home-research-image">
        <img
          src="{{ 'images/research/software-engineering.svg' | relative_url }}"
          alt="프로그램 분석과 품질 자동화 연구 이미지"
        >
      </div>
      <p class="home-research-kicker">Software Engineering</p>
      <strong>프로그램 분석과 품질 자동화</strong>
      <p>정적 분석, 테스트, 자동 평가를 바탕으로 실제 개발 환경에 적용 가능한 자동화 기법을 연구합니다.</p>
    </article>
    <article class="home-research-card reveal-on-scroll">
      <div class="home-research-image">
        <img
          src="{{ 'images/research/healthcare-ai.svg' | relative_url }}"
          alt="의료 데이터 분석과 임상 AI 연구 이미지"
        >
      </div>
      <p class="home-research-kicker">Healthcare AI</p>
      <strong>의료 데이터 분석과 임상 AI</strong>
      <p>의료 영상, 생체 신호, 임상 데이터를 활용해 예측 모델과 의사결정 지원 기법을 개발합니다.</p>
    </article>
  </div>
</div>

{% include section.html %}

{% assign featured_publications = site.publications | data_filter: "tags && tags.include?('international')" | sort: "date" | reverse %}
<div class="home-block reveal-on-scroll">
  <div class="home-block-header reveal-on-scroll">
    <p class="home-section-label">Research Output</p>
    <h2>연구 성과</h2>
  </div>
  <div class="home-research-publications">
    {% for publication in featured_publications limit:4 %}
      {% capture subtitle_clean -%}
        {{ publication.subtitle | default: "" | replace: "[PDF]", "" | replace: "[GitHub]", "" | replace: "[DOI]", "" | replace: "[Paper]", "" | replace: "[Webpage]", "" | strip }}
      {%- endcapture %}
      {% assign publication_year = publication.date | date: "%Y" %}
      {% assign first_sentence = subtitle_clean | split: ". " | first | strip %}
      {% assign comma_prefix = subtitle_clean | split: ", " | first | strip %}
      {% if comma_prefix contains publication_year %}
        {% assign publication_venue = comma_prefix | replace: publication_year, "" | replace: "  ", " " | strip %}
      {% elsif first_sentence contains publication_year %}
        {% assign publication_venue = first_sentence | replace: publication_year, "" | replace: "  ", " " | strip %}
      {% else %}
        {% assign publication_venue = first_sentence %}
      {% endif %}
      {% assign publication_venue = publication_venue | replace: " .", "." | replace: " ,", "," | strip %}
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
        {% elsif publication.description contains "Authors:" %}
          <p>{{ publication.description | split: "Venue:" | first | remove: "Authors:" | strip }}</p>
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
