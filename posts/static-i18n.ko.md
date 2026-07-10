---
slug: static-i18n
date: 2026.04
tag: guide
read: 5
title: 정적 사이트에서 다국어(i18n) 다루기
excerpt: 빌드 없이 한/영 토글을 붙이는 방법.
---

# 정적 사이트에서 다국어(i18n) 다루기

빌드 과정 없이 정적 사이트에 한/영 토글을 붙이는 방법을 정리했습니다.

## 사전 객체 하나면 충분

언어별 문자열을 객체에 담고, 렌더링할 때 현재 언어의 값을 꺼내 씁니다.

```js
const lang = localStorage.getItem("lang") || "ko";
document.querySelectorAll("[data-i18n]").forEach(el => {
  el.textContent = dict[lang][el.dataset.i18n];
});
```

## 상태 저장

선택한 언어는 `localStorage` 에 저장해 다음 방문에도 유지합니다.
