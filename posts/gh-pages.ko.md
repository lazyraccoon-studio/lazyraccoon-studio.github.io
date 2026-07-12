---
slug: gh-pages
date: 2026.07
tag: guide
read: 6
title: GitHub Pages + Markdown 으로 스튜디오 사이트 만들기
excerpt: 정적 사이트로 회사 홈페이지를 만들고 마크다운으로 글을 배포한 과정.
---

# GitHub Pages + Markdown 으로 스튜디오 사이트 만들기

회사 홈페이지를 어떻게 만들까 고민하다, 서버 없이 정적 사이트 + 마크다운으로 가기로 했습니다.

## 왜 GitHub Pages 인가

무료로 호스팅되고, `git push` 한 번으로 배포됩니다. 작은 스튜디오에 딱 맞습니다.

빌드 과정이 없는 순수 정적 사이트라 GitHub Actions도 필요 없습니다. 저장소 루트에 `.nojekyll` 파일만 두고, **Settings → Pages → Source: Deploy from a branch** 에서 `main` / `/ (root)` 만 선택하면 끝입니다.

```
저장소 루트
├─ .nojekyll        ← Jekyll 처리를 건너뛰게 하는 빈 파일
├─ index.html
└─ ...
```

## 마크다운으로 글쓰기

글은 전부 `.md` 파일로 관리합니다. 개발일지를 쓰는 마찰이 확 줄었습니다. 새 글은 `posts/` 에 마크다운 파일을 추가하고 `posts/posts.json` 에 항목 하나만 넣으면 끝입니다.
