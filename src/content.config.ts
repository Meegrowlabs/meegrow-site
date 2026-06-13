import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts are plain Markdown files in src/content/blog/.
// This is your AGNOSTIC content core: any AI editor or human can create these files.
const blog = defineCollection({
  // Accept both .md (simple posts) and .mdx (posts that embed components).
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Team'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Hero image: a path under /public (e.g. "/uploads/hero.png"), an external URL,
    // or a CDN URL (Cloudinary/Bunny). Kept as a string so builds never break on
    // a missing local asset.
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
  }),
});

export const collections = { blog };
