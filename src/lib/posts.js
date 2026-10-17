import { getCollection } from "astro:content";

export async function getPosts() {
  const posts = await getCollection(
    "blog",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return posts.sort((a, b) => b.data.date - a.data.date);
}

export function readingMinutes(body = "") {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

export function formatDate(
  date,
  options = { month: "short", day: "numeric", year: "numeric" },
) {
  return date.toLocaleDateString("en-US", options);
}
