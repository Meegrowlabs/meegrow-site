# CLAUDE.md

This repo's operating manual lives in **`AGENTS.md`** — read it first. It explains how to
publish blog posts (Markdown in `src/content/blog/`), the required front-matter format, the
build/commit/push loop, and the MCP servers (GitHub, Netlify, DataForSEO, GA4, GSC) used to
run the full pipeline.

Quick rules:
- New post = `src/content/blog/<slug>.md` → URL becomes `/blog/<slug>`.
- Always `npm run build` before committing.
- Blog stays at `/blog` (one GA4 + one GSC property). Never a subdomain.
