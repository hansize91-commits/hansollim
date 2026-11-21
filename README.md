# 임한솔 Hansol Lim

임한솔 작가의 전시 아카이브입니다. 메뉴는 Hansol, CV, 개인전, 단체전, 마파두부, 독립출판사 쓰임입니다. 전시는 파일 하나로 추가하고, 같은 템플릿이 제목과 정보, 글, 사진 그리드를 보여 줍니다. 목록은 시작일 기준 최신순입니다.

## 로컬에서 실행

```bash
npm install
npm run dev
```

브라우저에서 http://127.0.0.1:4317 을 엽니다.

```bash
npm run build
```

결과물은 `dist/` 입니다.

## 전시를 추가하는 방법

1. `src/content/exhibitions/`에 마크다운 파일을 하나 만듭니다. 파일 이름이 주소가 됩니다. 예: `2026-longing.md` → `/exhibitions/2026-longing`
2. 파일 맨 위에 아래 항목을 적습니다.

```yaml
---
title: "전시 제목"
titleEn: "English title"          # 없으면 이 줄을 빼도 됩니다
category: group                   # solo(개인전), group(단체전), mapaduboo(마파두부)
start: 2026-10-01
end: 2026-10-13
dateLabel: "2026.10.01-10.13"     # 화면에 그대로 보일 날짜. 없으면 시작·끝 날짜로 만듭니다
venue: "장소"
artists:                          # 없으면 artists: []
  - 작가 이름
hours: "11:00-18:00"              # 없으면 빼도 됩니다
opening: "Opening 10.01 17:00"    # 없으면 빼도 됩니다
closed: "Closed Mondays"          # 없으면 빼도 됩니다
poster: poster.jpg                # 없으면 빼도 됩니다
photos: 2026-longing              # public/exhibitions/ 아래 폴더 이름
---
```

3. 설명 글이 있으면 `---` 다음 빈 줄 뒤에 문단으로 적습니다. 문단 사이는 빈 줄입니다. 글은 적은 그대로 보입니다. 설명이 없으면 본문을 비워 둡니다.
4. 사진 폴더를 만듭니다. `photos`에 적은 이름과 같아야 합니다.

```text
public/exhibitions/2026-longing/photos/
```

5. 그 폴더에 jpg, jpeg, png, webp, gif를 넣습니다. 파일 이름 순으로 보입니다. `01`, `02`처럼 번호를 붙이면 순서가 분명합니다.
6. 사진을 묶음으로 나눌 때는 `photos` 안에 폴더를 만듭니다. `전경`, `작품`, `오프닝`은 그 순서로 이어 보여 주고, 다른 폴더는 이름 순입니다. 각 폴더 안은 파일 이름 순입니다.
7. 포스터가 있으면 전시 폴더에 이미지 파일을 넣고 `poster`에 그 파일 이름을 적습니다. 예: `public/exhibitions/2026-longing/poster.jpg`
8. `npm run dev`로 개인전, 단체전, 마파두부 페이지를 확인합니다. `category`에 맞는 페이지에 최신순으로 붙습니다.

## 이번 두 전시의 사진 위치

휘청 (포스터 없음):

```text
public/exhibitions/2025-hwicheong/photos/
```

그리움이 남기고 간 것들:

```text
public/exhibitions/2026-longing/그리움이-남기고-간-것들-포스터.jpg
public/exhibitions/2026-longing/photos/전경/
public/exhibitions/2026-longing/photos/작품/
public/exhibitions/2026-longing/photos/오프닝/
```

## 배포

정적 사이트입니다. 맞춤 도메인 `hansollim.com`을 나중에 연결할 수 있습니다.

GitHub Pages: 이 저장소의 `.github/workflows/pages.yml`이 `main`에 푸시되면 `dist/`를 올립니다. 저장소 Settings → Pages → Source를 GitHub Actions로 둡니다. 도메인을 연결할 때는 Pages에 `hansollim.com`을 적고, `public/CNAME` 파일에 `hansollim.com` 한 줄을 넣은 뒤 다시 배포합니다.

Cloudflare Pages: 빌드 명령 `npm run build`, 출력 디렉터리 `dist`. 이후 Custom domain에 `hansollim.com`을 추가합니다.

사용자 사이트가 아닌 `username.github.io/저장소이름` 주소로 올릴 때는 `astro.config.mjs`의 `base`를 `/저장소이름/`으로 바꿉니다. 도메인이나 Cloudflare Pages는 `base` 없이 루트입니다.
