# Publishing notes

## 2026-10-09: Cloudflare Git migration preparation

- Prepared `pdxhf` Static Assets Worker in account `b6d1478423f0bb0c0477df387305e46b`, with workers.dev enabled and no custom routes yet. No production deployment or DNS cutover was performed by this preparation.
- Kept canonical `https://pdxhf.org`, Markdown/static source, search, configured feeds, robots behavior, and `docs/CNAME` intact. Output is isolated in `.cloudflare/site/`, so legacy generated Pages files remain recoverable and unchanged.
- Added complete baseline Python version pins in `requirements.lock`, Node/Python runtime files, pinned local Wrangler, and strict build/validation scripts. The original `requirements.txt` remains for legacy helper recovery.
- Changed the existing GitHub Actions workflow to validation plus build-artifact retention. Cloudflare native Builds will fetch/deploy on `main` after connection; no Cloudflare secrets were added to GitHub.
- Intended settings: production `main`, root `/`, build `npm run build`, deploy `npx wrangler deploy`, all paths included. Keep production branch history and prior Pages deployment/source.
- Live Git connection, exact commit deployment, workers.dev/domain HTTPS, DNS preservation, and registrar cutover verification remain pending. Manual deployment must not overlap automatic Builds.

- Compatibility date is `2026-10-07`, the newest date supported by the bundled workerd in pinned Wrangler 4.145.0. A `2026-10-09` local runtime refused startup; this asset-only configuration uses the supported date so development and validation exercise the configured runtime. Review compatibility changes before advancing it with a future Wrangler update.

Local validation passed: `npm install`, `npm run build`, and `npm run deploy:check` (Wrangler 4.145.0 schema/packaging) succeeded. The configured local Worker passed 8 HTTP checks covering homepage/article, canonical URLs, slash redirect, populated search, real 404, blog RSS. Only owned local test processes were started and stopped. Public deployment and domain cutover remain unverified at this preparation stage.
