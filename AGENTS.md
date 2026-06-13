# AGENTS.md — how any AI editor operates this repo

This file is the **agent-agnostic** operating manual. It is read by Claude Code, Codex,
Cowork, Hermes, OpenCode, Cursor, and any other agent that looks for `AGENTS.md` or
`CLAUDE.md`. (If your tool only reads `CLAUDE.md`, copy this file to that name.)

The whole point: **content is plain Markdown in Git**, so you are never locked to one tool.

---

## What this project is

A static Astro site with a blog at `/blog`. Blog posts are Markdown files in
`src/content/blog/`. Pushing to `main` auto-deploys via Netlify.

## Golden rules for agents

1. **To publish a blog post**, create a new file `src/content/blog/<kebab-slug>.md`
   using the exact front matter below. Do not invent other fields.
2. **The URL** of a post is `/blog/<filename-without-.md>`. Choose the filename = the
   SEO slug.
3. After creating/editing posts, run `npm run build` to confirm it compiles, then
   `git add -A && git commit -m "..." && git push`.
4. Never put the blog on a subdomain. It stays at `/blog` (one GA4 + one GSC property).
5. Set `draft: true` for unfinished posts so they don't go live.

### Required blog post format

```markdown
---
title: "Post Title (≤60 chars is best for SEO)"
description: "Compelling 1-sentence meta description (≤155 chars)."
pubDate: 2026-06-13
author: "Author Name"
tags: ["primary-keyword", "topic"]
draft: false
---

Body in Markdown. Use one H1-free structure: the title is the H1.
Start with a strong intro paragraph, then use ## subheadings.
```

### Commands

```bash
npm install        # first time
npm run dev        # local preview at http://localhost:4321
npm run build      # MUST pass before committing
git add -A && git commit -m "Add post: <title>" && git push   # deploys
```

---

## MCP servers to connect (this is what makes the loop work)

Connect these to your agent so it can drive the whole pipeline by prompt. Config format
below is the common `mcpServers` JSON used by Claude Code/Codex-style clients; adapt paths
to your editor's settings location.

```jsonc
{
  "mcpServers": {
    // 1) GitHub — create repos, commit content, manage the per-client site repo
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxx" }
    },

    // 2) Netlify (official) — scaffold sites, set build config, trigger + inspect deploys
    "netlify": {
      "command": "npx",
      "args": ["-y", "@netlify/mcp"],
      "env": { "NETLIFY_AUTH_TOKEN": "nfp_xxx" }
    },

    // 3) DataForSEO — keyword volumes, difficulty, SERP + related keywords
    "dataforseo": {
      "command": "npx",
      "args": ["-y", "dataforseo-mcp-server"],
      "env": {
        "DATAFORSEO_USERNAME": "your-dataforseo-login",
        "DATAFORSEO_PASSWORD": "your-dataforseo-password"
      }
    }

    // 4) (optional) Google Analytics 4 + Search Console MCP servers — see notes below
  }
}
```

> Tokens: GitHub PAT from github.com → Settings → Developer settings → Personal access
> tokens (give it `repo` scope). Netlify token from Netlify → User settings → Applications
> → Personal access tokens. DataForSEO credentials from your DataForSEO dashboard.

### Where each editor stores MCP config
- **Claude Code:** `.mcp.json` in the repo root, or `claude mcp add ...`.
- **Codex / OpenCode / others:** their respective `config.toml` / settings JSON — same
  server commands, same env vars.
- Keep secrets out of Git: use the editor's secret store or shell env, not committed files.

---

## Task recipes (prompt patterns that work in any agent)

### Keyword research with DataForSEO
> "Using the DataForSEO MCP, get search volume, keyword difficulty, and 20 related
> keywords for the seed topic '<topic>' in the US. Group them into intent clusters
> (informational / comparison / transactional) and propose 5 blog post titles, one per
> the best opportunity (decent volume, lower difficulty)."

Then:
> "Write the post for the top cluster and save it to `src/content/blog/`, then build,
> commit, and push."

### Publish a post end-to-end
> "Draft a 900-word post titled '<title>' targeting the keyword '<kw>'. Save as
> `src/content/blog/<slug>.md` with correct front matter, run `npm run build`, and if it
> passes, commit and push to main."

### Read GA4 + GSC performance data
You can pull analytics two ways:

- **Search Console (queries, clicks, impressions, position):** connect a GSC MCP server
  (e.g. a community `mcp-server-gsc`) authenticated to the property, then ask:
  > "From Search Console, list the top 20 queries by impressions for the last 28 days and
  > flag any with high impressions but position > 10 — those are post ideas."

- **GA4 (traffic, engagement, conversions):** connect a Google Analytics MCP server
  authenticated to the property, then ask:
  > "From GA4, show sessions and engaged sessions for `/blog/*` pages over the last 28
  > days, sorted by sessions."

> Both GA4 and GSC MCP servers authenticate with a Google service account or OAuth that
> has access to the property. Add the service-account email as a user in GA4 (Admin →
> Property access) and in Search Console (Settings → Users and permissions). Then point the
> MCP server's credentials env var at the service-account key file.

### Close the loop
> "Compare last month's GSC top queries with my existing posts in `src/content/blog/`.
> List queries we rank for on page 2 that don't yet have a dedicated post, and draft the
> three highest-impression ones."

---

## Guardrails
- Always `npm run build` before committing; a broken build blocks the whole site's deploy.
- Don't edit `dist/` (generated) or `node_modules/`.
- Don't change the `/blog` routing to a subdomain.
- Keep one GA4 property and one GSC property per domain.
