import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// RSS feed at /rss.xml — this is what Postiz / n8n / IFTTT can watch to
// auto-trigger social posts when you publish a new blog post.
export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: 'Your Brand Blog',
    description: 'Articles, guides, and updates.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      author: post.data.author,
      link: `/blog/${post.id}/`,
    })),
  });
}
