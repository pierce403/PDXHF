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

## Cloudflare publishing

The `pdxhf` Worker is prepared to serve only `.cloudflare/site/` with
Workers Static Assets. The strict build uses a complete version-pinned Python
renderer and locally pinned Wrangler 4.145.0. Original `site/`, content, canonical
`https://pdxhf.org`, page paths, search, feeds where configured, and `docs/CNAME`
remain preserved for recovery. The isolated output avoids modifying tracked
legacy generated files. No robots policy was added or changed.

```bash
npm ci
npm run build
npm run deploy:check
npm run dev
```

Configure Cloudflare Workers Builds for `pierce403/PDXHF`, production `main`,
root `/`, build `npm run build`, deploy `npx wrangler deploy`, and included paths
`*`. Once connected, a validated commit pushed to `main` lets Cloudflare fetch,
build, and deploy. Cloudflare retains its deployment credential; no Cloudflare
secrets belong in GitHub. `.github/workflows/deploy.yml` now validates and saves a
build artifact only, with no Pages or Cloudflare deployment step.

Git connection, workers.dev serving, custom-domain attachment, and registrar
cutover require separate live verification. Initial Wrangler configuration has no
custom routes; attach only the exact intended domain after its zone is ready and
DNS preservation is verified. Keep the prior GitHub Pages deployment/source for
rollback. Manual recovery must pause automatic builds and wait for active builds;
verify recovery before re-enabling them.

Wrangler logs and traces are enabled, but asset-only requests bypass Worker
execution. Use Cloudflare HTTP analytics for those requests.
