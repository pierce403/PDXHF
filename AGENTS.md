<INSTRUCTIONS>
- After every update, commit changes and push to the default branch.
- Context: PDXHF site is a MkDocs Material project. Content lives in `docs/` with the homepage at `docs/index.md`.
- Blog: posts go in `docs/blog/posts/` with a landing page at `docs/blog/index.md`. Tags index is `docs/tags.md`.
- Architecture: MkDocs Material theme + built-in blog/tags plugins with `mkdocs-rss-plugin` for blog-only RSS.
- Assets: images/favicon live under `docs/assets/`. Custom styles are in `docs/stylesheets/extra.css`.
- Deployment: GitHub Actions workflow `/.github/workflows/deploy.yml` builds and deploys to GitHub Pages via upload artifact + deploy.
- Domain: custom domain is preserved via `docs/CNAME` (root `CNAME` may remain for reference).
- Dependencies: pinned in `requirements.txt` for reproducible local/CI builds.
</INSTRUCTIONS>
