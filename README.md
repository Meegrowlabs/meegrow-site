# Web + Blog Starter

A fast marketing site with a built-in blog at **`/blog`** (subdirectory, not a subdomain — so you run **one** GA4 property and **one** Search Console property). Built with [Astro](https://astro.build), deploys to Netlify, editable by any AI agent or by non-technical teammates via a visual editor.

This is your **template repo**: clone it per client/site.

---

## TL;DR for today's team test

1. **Run it locally:** `npm install` then `npm run dev` → open http://localhost:4321
2. **Push to GitHub**, connect the repo to **Netlify** → you get a live URL in ~1 min.
3. **Add GA4 + GSC** env vars in Netlify (steps below) → analytics + Search Console start collecting.
4. **Publish a blog post** three ways: an AI agent writes a `.md` file, a teammate uses `/admin`, or you copy a sample file.

Full agent instructions (incl. DataForSEO keyword research and GA/GSC data pulls from Claude Code / Codex / Cowork / etc.) are in **`AGENTS.md`**.

---

## 1. Run locally

Requirements: Node 20+ (Node 22 recommended).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## 2. Deploy to Netlify (you have both accounts)

1. Create a GitHub repo and push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial site + blog"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. In **Netlify → Add new site → Import from Git → GitHub**, pick the repo.
   Netlify auto-detects Astro (build command `npm run build`, publish dir `dist`). Click **Deploy**.
3. You'll get a `https://random-name.netlify.app` URL immediately. Share that with your team for today's test.
4. Add your real domain later in **Netlify → Domain settings**. Keep the blog on the **same** domain at `/blog` (already configured) — do **not** use a `blog.` subdomain.

> Every `git push` to `main` now auto-builds and redeploys. That's the publishing loop.

## 3. Enable Google Analytics 4

1. In [Google Analytics](https://analytics.google.com) → **Admin → Create property** (or use an existing one).
2. **Admin → Data Streams → Web** → add your site URL → copy the **Measurement ID** (`G-XXXXXXXXXX`).
3. In **Netlify → Site settings → Environment variables**, add:
   - `PUBLIC_GA4_ID` = `G-XXXXXXXXXX`
   - `SITE_URL` = your live URL (e.g. `https://your-site.netlify.app` or your domain)
4. Trigger a redeploy (**Deploys → Trigger deploy**). GA4 now loads on every page **including `/blog`**, all under one property.
5. Verify in GA4 → **Reports → Realtime** while someone browses the site.

> Because the blog is a subdirectory, you do **not** create a second GA4 property. One property covers the whole site.

## 4. Enable Google Search Console (GSC)

1. Go to [Search Console](https://search.google.com/search-console) → **Add property**.
   - Easiest for one domain: choose **URL prefix**, enter your full site URL.
2. Choose the **HTML tag** verification method. Copy the token — the value inside
   `<meta name="google-site-verification" content="THIS_TOKEN">`.
3. In **Netlify → Environment variables**, add `PUBLIC_GSC_VERIFICATION` = `THIS_TOKEN`, then redeploy.
4. Back in Search Console, click **Verify**.
5. **Submit your sitemap:** Search Console → **Sitemaps** → enter `sitemap-index.xml` → Submit.
   (This site auto-generates `/sitemap-index.xml`.)

> One URL-prefix property covers `/` and `/blog` together. Query/click data appears within a few days.

## 5. Publish a blog post (3 ways)

**A. With any AI agent** (Claude Code, Codex, Cowork, Hermes, OpenCode…):
> "Write a blog post about <topic> and save it as a new Markdown file in `src/content/blog/`, then commit and push."
See `AGENTS.md` for the exact file format the agent should follow.

**B. Visual editor (non-technical teammates):** go to `/admin` on the live site, log in with GitHub, write, and publish. (One-time OAuth setup below.)

**C. By hand:** copy `src/content/blog/welcome-to-the-blog.md`, change the front matter and body, save with a new filename, commit, push.

All three end the same way: a Markdown file in `src/content/blog/` → auto-deploy.

### Blog post format

```markdown
---
title: "Your Post Title"
description: "One-sentence summary used for SEO and social cards."
pubDate: 2026-06-13
author: "Your Name"
tags: ["tag-one", "tag-two"]
draft: false
---

Your post body in Markdown.
```

Set `draft: true` to keep a post out of the live site until ready.

## 6. Visual CMS one-time setup (`/admin`)

The `/admin` editor uses **Sveltia CMS** with a GitHub backend. Two steps:

1. Edit `public/admin/config.yml` and set `repo: YOUR_GITHUB_USERNAME/YOUR_REPO`.
2. Register a **GitHub OAuth app** so teammates can log in, and point the CMS at it.
   The simplest path is the free **Sveltia CMS Authenticator** (a small OAuth helper you deploy once on Netlify/Cloudflare). Follow: https://github.com/sveltia/sveltia-cms#installation

> For *today's* quick test you can skip OAuth and have teammates create posts directly in the **GitHub web UI** (Add file → name it `src/content/blog/my-post.md` → paste the format above → Commit). It deploys the same way.

## Project structure

```
src/
  content/blog/        ← blog posts (Markdown) — your content core
  content.config.ts    ← blog schema (front-matter fields)
  layouts/Base.astro   ← shared <head>: SEO, GA4, GSC verification
  pages/
    index.astro        ← marketing home (/)
    blog/index.astro   ← blog listing (/blog)
    blog/[...slug].astro ← individual posts (/blog/<slug>)
    rss.xml.js         ← RSS feed (/rss.xml) — feeds Postiz/n8n for social
public/
  admin/               ← Sveltia visual CMS
  styles/global.css    ← styling
astro.config.mjs       ← set your SITE_URL here / via env
netlify.toml           ← Netlify build config
.env.example           ← copy to .env for local GA4/GSC testing
AGENTS.md              ← how any AI agent should operate this repo
```

## Cloning for a new client

```bash
# copy the template, point at a new repo, done
cp -r web-blog-starter client-acme && cd client-acme
rm -rf .git node_modules dist
# update site name in src/layouts/Base.astro, repo in public/admin/config.yml,
# and SITE_URL, then push to a new GitHub repo + new Netlify site.
```
