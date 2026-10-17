import { getPosts } from "../lib/posts";

const pages = ["/", "/writing/", "/books/"];

export async function GET({ site }) {
  const posts = await getPosts();
  const urls = [
    ...pages.map((path) => ({ loc: new URL(path, site).href })),
    ...posts.map((post) => ({
      loc: new URL(`/writing/${post.id}/`, site).href,
      lastmod: post.data.date.toISOString().slice(0, 10),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ loc, lastmod }) =>
    lastmod
      ? `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
      : `  <url><loc>${loc}</loc></url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
