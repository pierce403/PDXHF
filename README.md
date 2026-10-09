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

Wrangler records the ordinary Worker route `pdxhf.org/*`, scoped to zone
`pdxhf.org`. It covers apex paths and query strings while retaining the
original GitHub Pages apex A values in DNS management. The apex records must be
proxied, the zone active, and its edge certificate ready before live verification.
Native Git publishing manages this route; no custom-domain DNS replacement is
requested by this configuration.

This Worker has no `main` script. Its static assets and generated `404.html`
provide a terminal 404 for missing paths with `not_found_handling: 404-page`.
It does not fetch the retained Pages origin. That origin can become reachable
again if the route is removed or bypassed, or proxying is disabled; inspect route
conflicts and fail mode before release. Apex routing does not cover `www`.

This child change remains local for coordinator review. See [NOTES](NOTES.md)
for the custom-domain conflict and remaining deployment, DNS, certificate, HTTPS,
and path checks. Preserve all original DNS/mail values and the previous Pages
deployment/source for recovery. Manual recovery must pause automatic builds and
wait for active builds, then verify recovery before re-enabling them.

Cloudflare documents [ordinary-route prerequisites](https://developers.cloudflare.com/workers/configuration/routing/routes/)
and [static-site 404 handling](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/).

Wrangler logs and traces are enabled, but asset-only requests bypass Worker
execution. Use Cloudflare HTTP analytics for those requests.
