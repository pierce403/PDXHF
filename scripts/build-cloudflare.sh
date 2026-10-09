#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

# Keep the legacy site/ recovery output untouched, including tracked PDXHF files.
python3 -m venv .venv
.venv/bin/python -m pip install --disable-pip-version-check -q -r requirements.lock
.venv/bin/python -m mkdocs build --strict --clean --site-dir .cloudflare/site
# CNAME remains in docs/ as Pages recovery metadata; Workers routing uses Wrangler.
rm -f .cloudflare/site/CNAME
