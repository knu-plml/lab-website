# PLML Laboratory Website

강원대학교 PLML 연구실 웹사이트입니다.  
Jekyll 기반으로 동작하며 연구실 소개, 구성원, 논문, 소식을 관리합니다.

## Run

```bash
bundle install
bundle exec jekyll serve
```

기본 주소: `http://127.0.0.1:4000/new`

## Structure

- `_config.yaml`: 사이트 설정
- `_styles/`: SCSS 스타일
- `_layouts/`, `_includes/`: 레이아웃과 공통 컴포넌트
- `_members/`, `_publications/`, `_posts/`, `_courses/`: 콘텐츠 데이터
- `images/`: 이미지 자산

## Notes

- 기존 템플릿은 Greene Lab의 Lab Website Template을 기반으로 커스터마이즈했습니다.
- 라이선스는 [LICENSE.md](LICENSE.md)를 따릅니다.
