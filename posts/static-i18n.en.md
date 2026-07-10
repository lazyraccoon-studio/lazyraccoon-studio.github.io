---
slug: static-i18n
title: Handling i18n on a static site
excerpt: Adding a KO/EN toggle without a build step.
---

# Handling i18n on a static site

How to add a KO/EN toggle to a static site with no build step.

## One dictionary is enough

Keep strings per language in an object and pull the current language's value at render time.

```js
const lang = localStorage.getItem("lang") || "ko";
document.querySelectorAll("[data-i18n]").forEach(el => {
  el.textContent = dict[lang][el.dataset.i18n];
});
```

## Persisting state

Save the chosen language in `localStorage` so it persists on the next visit.
