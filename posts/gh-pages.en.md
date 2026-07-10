---
slug: gh-pages
title: Building a studio site with GitHub Pages + Markdown
excerpt: How we built our company site as a static site and publish posts in Markdown.
---

# Building a studio site with GitHub Pages + Markdown

While deciding how to build our company site, we chose a serverless static site with Markdown.

## Why GitHub Pages

Free hosting, and it deploys with a single `git push`. Perfect for a small studio.

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push: { branches: [main] }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/deploy-pages@v4
```

## Writing in Markdown

All posts live as `.md` files. The friction of writing dev logs dropped a lot. To add a post, drop a Markdown file in `posts/` and add one entry to `posts/posts.json`.
