---
title: "Welcome to the Blog"
description: "How this site is structured and how new posts get published in seconds."
pubDate: 2026-06-13
author: "Team"
tags: ["announcement", "getting-started"]
draft: false
---

This is a sample post. It lives as a single Markdown file at
`src/content/blog/welcome-to-the-blog.md`, and it is published at
`/blog/welcome-to-the-blog` on the **same domain** as the main site.

## Why one domain matters

Keeping the blog at `/blog` (a subdirectory) instead of `blog.yoursite.com`
(a subdomain) means you run **one** Google Analytics 4 property and **one**
Search Console property, and all your SEO authority stays consolidated.

## How to publish a new post

You have three ways, and they all end the same place — a Markdown file in
`src/content/blog/`, committed to Git, which auto-deploys:

1. **Any AI editor** (Claude Code, Codex, Cowork, etc.): "Write a blog post
   about X" → it creates the `.md` file and commits it.
2. **The visual editor** at `/admin`: write in a browser, hit publish.
3. **By hand**: copy this file, change the front matter and body.

That's the whole loop.
