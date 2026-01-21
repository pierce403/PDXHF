# PDXHF

Portland Hacker Foundation website, built with MkDocs Material.

## Run locally

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

## Blog posts

Add new posts in `docs/blog/posts/` using YAML front matter, for example:

```markdown
---
title: Post title
date: 2026-01-20
categories:
  - Announcements
tags:
  - community
  - grants
---

Write your post here.
```

Notes:
- Use a short, descriptive filename like `welcome-to-the-pdxhf-blog.md`.
- `date` should be in `YYYY-MM-DD` format. The RSS plugin uses this for both created and updated dates, so bump it if you want the update reflected in the feed.
- Preview locally with `mkdocs serve` or run `mkdocs build --strict` before pushing.

## RSS feed

The blog RSS feed is published at `https://pdxhf.org/feed_rss_created.xml` after deployment. (Only blog posts are included.)
