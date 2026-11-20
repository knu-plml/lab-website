# PLML Laboratory Website

강원대학교 PLML 연구실 웹사이트입니다.  
Jekyll 기반으로 동작하며 연구실 소개, 구성원, 논문, 소식을 관리합니다.

## Run

```bash
bundle install
bundle exec jekyll serve
```

기본 주소: `http://127.0.0.1:4000/`

## Structure

- `_config.yaml`: 사이트 설정
- `_styles/`: SCSS 스타일
- `_layouts/`, `_includes/`: 레이아웃과 공통 컴포넌트
- `_members/`, `_publications/`, `_news/`, `_courses/`: 콘텐츠 데이터
- `images/`: 이미지 자산

## Docker 빌드 및 배포

`master`에 push하면 self-hosted 러너가 Docker에서 빌드한 정적 결과물만 배포합니다.
러너에는 Docker(BuildKit), Git, rsync가 필요합니다.

로컬 빌드:

```bash
output_dir="$(mktemp -d)"
DOCKER_BUILDKIT=1 docker build --pull --target artifact \
  --output "type=local,dest=${output_dir}" .
echo "$output_dir"
```

## Notes

- 기존 템플릿은 Greene Lab의 Lab Website Template을 기반으로 커스터마이즈했습니다.
- 라이선스는 [LICENSE.md](LICENSE.md)를 따릅니다.
