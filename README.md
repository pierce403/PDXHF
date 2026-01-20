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

## RSS feed

The blog RSS feed is published at `https://pdxhf.org/feed_rss_created.xml` after deployment. (Only blog posts are included.)
