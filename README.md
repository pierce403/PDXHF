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

Add posts in `docs/blog/posts/` with YAML front matter:

```markdown
---
title: "Meeting summary: May 13, 2026"
date:
  created: 2026-05-13
  updated: 2026-10-14
slug: meeting-summary
categories:
  - Meeting summaries
tags:
  - minutes
  - governance
---

Meeting held on May 13, 2026. Published on October 14, 2026.

A short summary of the recorded discussion.

<!-- more -->

## Recorded discussion

Public decisions and organizational updates.
```

- Meeting summaries use the actual meeting date as `date.created` and the public release date as `date.updated`. State both dates in the body. For later edits, change only `updated`; changing `created` changes the dated permalink.
- Use a stable `slug`. Meeting posts use `meeting-summary`, which produces `/blog/YYYY/MM/DD/meeting-summary/`. Filenames follow `meeting-YYYY-MM-DD.md`.
- Use the `Meeting summaries` category for every meeting post. Add `Grants` and the `grants` tag where the post includes an approval or funding update. Each award has a stable heading ID linking to its timeline entry.
- Use a short introduction followed by `<!-- more -->` to keep blog/category pages readable.
- Keep summaries concise and source-faithful; omit private meeting material. Descriptions of proposed work must not claim completed results. Public rationales are editorial copy approved for publication, not quotations of unrecorded board reasoning.
- For historical backfills, prepare and review the exact copy before adding it to the publishing branch. The public release date must match the approved release day.
- Preview with `mkdocs serve` or run a strict build to a temporary directory before pushing.

## Grant timeline

Keep awards on `docs/grants/index.md`, newest first by **approval date** and grouped by year. Each dated award links to its approval section in a meeting-summary post, which links back to the stable timeline anchor. Keep descriptions and rationales consistent in both places.

Use one `.grant-timeline` wrapper per year and repeat `.grant-entry`:

```markdown
## APPROVAL_YEAR

<div class="grant-timeline" markdown>
<article class="grant-entry" markdown>

### PROJECT_NAME { #grant-YYYY-project-slug }

**Approved:** Month D, YYYY

**Project:** [Visit the funded project](VERIFIED_PROJECT_URL)

**What it does:** A short description of the funded scope.

**Why we funded it:** The reviewed public explanation of the decision.

[Approval summary](../blog/posts/meeting-YYYY-MM-DD.md#grant-YYYY-project-slug)

</article>
</div>
```

- If no verified project URL exists, use `**Project:** Project link not yet available.` Do not substitute an upstream reference, applicant profile, or guessed URL.
- Awards can be listed after approval even when payment is unconfirmed. Amounts and recipient names are omitted unless explicitly approved for publication.
- The Tails workshop is ordered within 2025 by its confirmed September 10 payment date, labeled **Payment sent**. Keep the source TODO for its approval date in an HTML comment; do not present the payment or submission date as an approval date.
- Keep all heading IDs stable. Update a grant's timeline and blog section together when adding links or correcting reviewed copy.
- Grant pages do not enter RSS; their meeting-summary posts do.

## RSS feed

The blog RSS feed is published at `https://pdxhf.org/feed_rss_created.xml` after deployment. Only blog posts are included, including meeting summaries and their grant announcements. `mkdocs.yml` reads `date.created` for the creation feed and `date.updated` for the updated feed.

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
