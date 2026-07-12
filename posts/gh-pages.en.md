---
slug: gh-pages
title: Building a studio site with GitHub Pages + Markdown
excerpt: How we built our company site as a static site and publish posts in Markdown.
---

# Building a studio site with GitHub Pages + Markdown

While deciding how to build our company site, we chose a serverless static site with Markdown.

## Why GitHub Pages

Free hosting, and it deploys with a single `git push`. Perfect for a small studio.

No build step for a pure static site, so no GitHub Actions needed either. Just drop a `.nojekyll` file in the repo root and pick **Settings → Pages → Source: Deploy from a branch** → `main` / `/ (root)`.

```
repo root
├─ .nojekyll        ← empty file, skips Jekyll processing
├─ index.html
└─ ...
```

## Writing in Markdown

All posts live as `.md` files. The friction of writing dev logs dropped a lot. To add a post, drop a Markdown file in `posts/` and add one entry to `posts/posts.json`.
