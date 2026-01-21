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
- GitHub Pages deployment via official upload-artifact + deploy-pages workflow

## Project Structure

- `docs/index.md`: homepage content and CTAs
- `docs/blog/index.md`: blog landing page
- `docs/blog/posts/`: individual blog posts (Markdown with front matter)
- `docs/tags.md`: tag index page (`<!-- material/tags -->`)
- `docs/assets/`: images + favicon
- `docs/stylesheets/extra.css`: site theming to match original colors
- `mkdocs.yml`: site config, theme, plugins, RSS
- `requirements.txt`: pinned Python deps
- `.github/workflows/deploy.yml`: Pages build + deploy
- `docs/CNAME`: custom domain (root `CNAME` may exist too)

## Build & Test Commands

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
mkdocs build --strict
```

Convenience script:
```bash
./run.sh
```
`run.sh` creates `.venv` if needed, installs deps, runs `mkdocs build --strict`, then starts `mkdocs serve` (long-running; stop with Ctrl+C).

Expected RSS outputs from a build:
- `site/feed_rss_created.xml`
- `site/feed_rss_updated.xml`

## Coding Conventions

- Blog posts require YAML front matter with `title`, `date` (YYYY-MM-DD), optional `categories`, and `tags`.
- CTA buttons on the homepage use `{ .md-button }` and `{ .md-button--primary }`.

## Dependencies

- Pinned in `requirements.txt` (notably `mkdocs==1.6.1`, `mkdocs-material==9.7.1`, `mkdocs-rss-plugin==1.17.9`).
- CI uses Python 3.12; local Python 3.x works (use `python3`).

## Deployment Notes

- GitHub Actions workflow builds on push to default branch and deploys to Pages.
- `site_url` in `mkdocs.yml` must match the custom domain for a valid RSS feed.
- `docs/CNAME` is copied into the build output to preserve the custom domain.

## Known Issues & Solutions

- If `python` is missing, use `python3`.
- If RSS output is missing, ensure `mkdocs-rss-plugin` is installed and `match_path` points to `blog/posts/`.
- If `mkdocs build --strict` fails with deprecation warnings for `materialx.emoji.*`, update `mkdocs.yml` to use `material.extensions.emoji.twemoji` and `material.extensions.emoji.to_svg`.
- If the header trees image disappears, ensure both `.md-header` and `.md-tabs` set `background` with `../assets/trees.jpg` (light/dark schemes).
- If mobile layout looks too narrow, ensure `.md-sidebar--primary/secondary` are `position: fixed` at small widths so the sidebar doesn’t take horizontal space.
- If CSS changes don’t appear in `mkdocs serve`, restart the dev server.
- If the header background image is missing, confirm `docs/assets/trees.jpg` and `docs/stylesheets/extra.css` paths.
- If Pages serves the README/Jekyll site, check for the built-in `pages-build-deployment` workflow deploying from branch; it can override the MkDocs deployment. Ensure Pages source is set to GitHub Actions and trigger the MkDocs workflow after any branch build.
- If a redeploy is needed, a tiny commit + push can retrigger GitHub Actions; then re-run the MkDocs workflow if it remains queued.

## Agent Tips

- Keep homepage content and donation CTAs intact when editing copy.
- Use short, readable blog posts with a clear date and tags.
- Header icon buttons (RSS/GitHub) are injected by `docs/javascripts/extra.js` and wired via `mkdocs.yml` `extra_javascript`.

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
