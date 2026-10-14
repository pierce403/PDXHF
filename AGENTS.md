# AGENTS.md - Instructions for Coding Agents

Record wins, misses, and collaborator signals so every handoff compounds.

## Self-Improvement Directive

**IMPORTANT:** When working on this project, update this file whenever you learn anything important about the codebase. Capture both successes to repeat and failures to avoid. Include rapport-building observations about collaborators. This includes:
- New build or test commands that work
- Project conventions you discover
- Common errors and their solutions
- Tips for navigating the codebase
- Dependencies or tools that are essential
- Positive or negative results from experiments
- Collaboration preferences you observe

Your learnings will help future agents work more effectively on this project and create a feedback loop of improvements.

**Project rule:** After every update, commit changes and push to the default branch.

This file is a shared knowledge base: read it before starting, and update it before you finish.

## What is Recursive Self-Improvement?

Recursive self-improvement means agents learn from each task, document those learnings, and continuously get more effective over time.

## The AGENTS.md File

`AGENTS.md` is a shared knowledge base for agent-specific instructions, conventions, and learnings for this project.

## Core Instruction for AGENTS.md

Every agent should update this file whenever they learn something important. This creates a feedback loop where discoveries help future agents.

## What to Document

- Build & test commands
- Project structure and key directories
- Coding conventions and patterns
- Common pitfalls and solutions
- Dependencies and versions
- Deployment notes
- Agent-specific tips
- Rapport cues and collaborator preferences
- Reflection notes to keep this file concise over time

## Project Overview

PDXHF is a static website built with MkDocs Material. The homepage and content live in `docs/`, with a built-in blog and RSS for blog posts only.

## Architecture

- MkDocs Material theme
- Material blog + tags plugins
- `mkdocs-rss-plugin` for blog-only RSS
- Cloudflare Workers Static Assets publishes via native Git builds; GitHub Actions validates only; prior Pages deployment retained for recovery

## Project Structure

- `docs/index.md`: homepage content and CTAs
- `docs/blog/index.md`: blog landing page
- `docs/blog/posts/`: individual blog posts (Markdown with front matter)
- `docs/grants/index.md`: public grants page and future approval-date timeline
- `docs/tags.md`: tag index page (`<!-- material/tags -->`)
- `docs/assets/`: images + favicon
- `docs/stylesheets/extra.css`: site theming to match original colors
- `mkdocs.yml`: site config, theme, plugins, RSS
- `requirements.txt`: pinned Python deps
- `.github/workflows/deploy.yml`: strict build + Wrangler validation + artifact retention
- `docs/CNAME`: custom domain (root `CNAME` may exist too)

## Build & Test Commands

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
mkdocs build --strict
```

For a local check that leaves tracked legacy `site/` untouched, use `mkdocs build --strict --clean --site-dir /tmp/pdxhf-site-check` after installing the locked dependencies.

Convenience script:
```bash
./run.sh
```
`run.sh` creates `.venv` if needed, installs deps, runs `mkdocs build --strict`, then starts `mkdocs serve` (long-running; stop with Ctrl+C).

Expected RSS outputs from a build:
- `site/feed_rss_created.xml`
- `site/feed_rss_updated.xml`

## Coding Conventions

- Blog posts use YAML front matter with `title`, `date.created` and `date.updated` (YYYY-MM-DD), optional `categories`, and `tags`. Meeting summaries are dated to meetings, with actual public release dates in `updated` and in the body. Stable slugs prevent title edits from changing URLs.
- CTA buttons on the homepage use `{ .md-button }` and `{ .md-button--primary }`.
- Grants belong on one page, newest first by approval date and grouped by year. `README.md` documents timeline markup and reciprocal links to award sections in meeting posts. Each entry needs a reviewed description and public rationale; a missing project URL is visibly marked. Tails is ordered within 2025 by its confirmed payment date, explicitly labeled Payment sent, with approval-date verification retained as a source TODO.

## Dependencies

- The Cloudflare build installs `requirements.lock` (notably `mkdocs==1.6.1`, `mkdocs-material==9.7.7`, `mkdocs-rss-plugin==1.17.9`); `requirements.txt` supports the legacy helper workflow.
- CI reads `.python-version` (currently Python 3.14.4); use `python3` locally and match that version when possible.

## Deployment Notes

- GitHub Actions validates pushes to `main`; Cloudflare native Git builds publish them. Verify the exact Cloudflare build and public pages after pushing.
- `site_url` in `mkdocs.yml` must match the custom domain for a valid RSS feed.
- `docs/CNAME` is copied into the build output to preserve the custom domain.

## Known Issues & Solutions

- If `python` is missing, use `python3`.
- Historical `site/` is tracked on `main`; legacy local builds may modify generated recovery files. The Cloudflare build now writes only ignored `.cloudflare/site/`, with dependencies and secrets also ignored by the new `.gitignore`.
- `.pages-update.json` may appear as an untracked repo-root file with `{"build_type": "workflow", "source": null}`; treat it as local Pages metadata unless the collaborator asks to track it.
- If RSS output is missing, ensure `mkdocs-rss-plugin` is installed and `match_path` points to `blog/posts/`.
- If `mkdocs build --strict` fails with deprecation warnings for `materialx.emoji.*`, update `mkdocs.yml` to use `material.extensions.emoji.twemoji` and `material.extensions.emoji.to_svg`.
- If the header trees image disappears, ensure both `.md-header` and `.md-tabs` set `background` with `../assets/trees.jpg` (light/dark schemes).
- If mobile layout looks too narrow, ensure `.md-sidebar--primary/secondary` are `position: fixed` at small widths so the sidebar doesn’t take horizontal space.
- If CSS changes don’t appear in `mkdocs serve`, restart the dev server.
- If the header background image is missing, confirm `docs/assets/trees.jpg` and `docs/stylesheets/extra.css` paths.
- GitHub Actions currently validates and retains an artifact; it does not publish. After a push, check the Cloudflare native Git build and the public route before reporting a live update. The retained Pages source is recovery material.
- If local pip or npm installation reports `Errno 122` despite free filesystem space, treat it as a host quota limit. A strict build with a separately verified locked Python environment can still check Markdown; rely on CI for the pinned Node package build if local installation remains blocked.

## Agent Tips

- Keep homepage content and donation CTAs intact when editing copy.
- Use short, readable blog posts with a clear date and tags.
- Header icon buttons (RSS/GitHub) are injected by `docs/javascripts/extra.js` and wired via `mkdocs.yml` `extra_javascript`.
- Publish only reviewed award records. Do not invent grants, dates, recipients, amounts, project links, or completed deliverables. The current public rationales are reviewed editorial statements; the raw meeting notes do not record board rationales.
- For grant layout QA, build an isolated temporary copy outside this repo. Full-page Playwright checks at 1280×900 and 390×844 in light/dark mode now pass with cached Chromium headless shell 1248. Check the rendered timeline and meeting/category pages before committing.

## How Agents Should Use This

1. Read First: At the start of any task, read this file to understand project conventions and previous learnings.
2. Learn Actively: As you work, note discoveries about the codebase, build process, or effective approaches. Record both wins and missteps.
3. Update Regularly: Before completing a task, update this file with new knowledge that would help future agents.
4. Be Specific: Include exact commands, file paths, concrete examples, and collaborator cues rather than vague descriptions.

## Benefits of Recursive Self-Improvement

- Knowledge Persistence: Learnings survive across sessions and agents.
- Reduced Redundancy: Agents do not repeat the same discoveries.
- Faster Onboarding: New agents can quickly understand the project.
- Higher Quality: Accumulated best practices lead to better work.
- Error Prevention: Documented pitfalls help avoid repeated mistakes.

## Getting Started

If you ever bootstrap a new repo or sub-project, follow these steps:

1. Create an `AGENTS.md` file in the project root.
2. Copy this template as a starting point.
3. Add the self-improvement directive prominently near the top.
4. Begin documenting project-specific information as you work.
5. Encourage all agents to read and update it.

## Rapport & Reflection

- Collaborator preference: commit and push after every update (no exceptions).
- Keep responses concise and action-oriented.
- If guidance grows too long, consolidate and keep the file scannable.
- Before committing any UX/layout change, verify with Playwright (e.g., take a screenshot or measure layout) and note the check in your response.

Pro tip: The more detailed and accurate this file is, the more effective agents will be.

Remember: small, specific updates compound over time and make future handoffs easier.

## Cloudflare migration lessons (2026-10-09)

- Worker `pdxhf` publishes only `.cloudflare/site/`, leaving legacy `site/` untouched. Use `npm ci`, `npm run build`, and `npm run deploy:check`; strict MkDocs uses the baseline renderer versions in `requirements.lock`.
- Native Git settings: `pierce403/PDXHF`, production `main`, root `/`, build `npm run build`, deploy `npx wrangler deploy`, paths `*`. GitHub Actions validates only; credentials stay in Cloudflare, with no GitHub Cloudflare secrets.
- Wrangler records the ordinary route `pdxhf.org/*` with `zone_name: pdxhf.org`. Retain the original apex A values and all mail/TXT/unrelated records; proxying the apex must send traffic through Cloudflare. The coordinator owns the reviewed push and live changes. Verify the active zone, edge certificate, exact native build, HTTPS, paths, and any separate `www` behavior.
- Keep this configuration without `main` or `run_worker_first`: generated root `404.html` and `not_found_handling: 404-page` produce terminal missing-page responses. There is no application fetch of the Pages origin. Route bypass/removal, proxy disablement, or a changed fail mode can expose the retained origin and require review.
- Preserve canonical URL, existing public paths and standalone HTML, search, feeds, robots behavior, unrelated DNS/mail records, and prior Pages recovery source. Asset-only requests do not emit Worker invocation logs.
- Do not overlap manual and native Git deployment. Pause automatic builds and wait before deliberate recovery; verify before re-enabling them.

- Compatibility date is `2026-10-07`, the newest date supported by the bundled workerd in pinned Wrangler 4.145.0. A `2026-10-09` local runtime refused startup; this asset-only configuration uses the supported date so development and validation exercise the configured runtime. Review compatibility changes before advancing it with a future Wrangler update.

## Dependency security validation (2026-10-10)

- Miniflare pins its transitive sharp dependency exactly. A sharp-only `overrides.sharp` at `0.35.5` fixes GHSA-wq5f-xc86-pv6w while retaining pinned Wrangler; regenerate the npm lockfile so matching sharp binaries and libvips packages also update. Use the sharp-only form: a nested Miniflare override can produce an invalid `npm ci` tree on npm 10. Remove the override once the parent dependency supplies a patched version.
- Keep urllib3 in both `requirements.txt` and build-time `requirements.lock` at `2.7.0` or newer for GHSA-mf9v-mfxr-j63j and GHSA-qccp-gfcp-xxvc. Validate with the strict Cloudflare build and `.venv/bin/python -m pip check`.
- In restricted environments, use a writable `XDG_CONFIG_HOME` for Wrangler dry-runs; missing/unwritable home configuration can otherwise fail before validation. `npm ci`, `npm audit`, sharp SVG-to-PNG conversion, strict MkDocs, pip check, and Wrangler dry-run passed for this update on Node 24.19.0/Python 3.12.14; CI checks the repository-pinned Python version.

## Meeting and grant publication lessons (2026-10-14)

- Meeting summaries and grant approvals share backdated blog posts. Use `Meeting summaries` on all meeting posts and add `Grants` on approval/funding updates; one meeting can contain multiple separately anchored awards. Link Transparency to `blog/category/meeting-summaries.md`, which Material generates and MkDocs resolves.
- `use_material_blog: true` in RSS 1.17.9 does not extract Material date mappings. Set `date_from_meta.as_creation: date.created` and `as_update: date.updated`; a whole `date` mapping otherwise falls back to build time. Normalize existing posts when changing the keys, keeping their original creation/update dates.
- Preserve the creation date and explicit post slug for stable dated URLs. Update only `date.updated` for later edits; the old README advice to bump a scalar date would change the permalink.
- Collaboration preference for this backfill: review one packet containing exact meeting summaries and grant copy before pushing to the publishing branch. Keep unapproved drafts in an isolated temporary source tree, then commit/push the approved copy as one focused update.
- A PayPal receipt confirms the Tails payment was sent September 10, 2025. Label this as `Payment sent` in the timeline and funding update; it does not establish the approval date. The collaborator requested removing the public pending label. Place Tails in the 2025 timeline by the labeled payment date and keep the approval-date source TODO in an HTML comment; do not relabel payment as approval.

- Full-page Playwright checks now work with the cached newer headless shell. The existing mobile width override made `.md-content__inner` span the viewport plus Material margins, causing 16px overflow at 390px. Keep the outer content width at 100% but the inner article width at auto so margins fit.
- The 15-summary/six-grant preview passed 214 HTML/RSS checks and 16 Playwright cases across homepage, timeline, two-award meeting post, and category in desktop/mobile light/dark modes. Both feeds contain 18 blog items; creation dates are meetings and update dates are release dates.
- The April 2025 summary follows the source filename (April 10); timestamps suggest April 9 but the body has no date. A source TODO preserves this unresolved discrepancy for later confirmation.
- After merging the small-grants post, the strict build and 12 Playwright cases passed across the timeline, Tails meeting post, and new article at desktop/mobile sizes in light/dark themes. Both feeds contain 19 blog items with the new article's October 14 creation/update dates; Tails retains its stable anchor and reciprocal links.
