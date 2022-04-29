/* eslint-disable no-useless-escape */
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import useSWR from "swr"

const postsDirectory = join(process.cwd(), 'src/_posts');
const collectionsDirectory = join(process.cwd(), 'src/_collections');

export function getArticleSlugs(type) {
  const directory = type === 'journal' ? postsDirectory : collectionsDirectory;

  const slugs = fs.readdirSync(directory);
  return slugs.map((key) => key.replace(/^.*[\\\/]/, '').slice(0, -3));
}

export const getArticleFromFileBySlug = (slug, type) => {
  const directory = type === 'journal' ? '_posts' : 'collections';

  const file = fs.readFileSync(`src/${directory}/${slug}.md`, 'utf8');

  const { data, content: body } = matter(file);

  return { ...data, body, slug, type: 'journal' };
};

export const getArticlesFromFiles = (type) => {
  const slugs = getArticleSlugs(type);

  return (
    slugs
      .map((slug) => getArticleFromFileBySlug(slug, type))
      // sort posts by date in descending order
      .sort(
        (post1, post2) =>
          new Date(post2.date) - new Date(post1.date),
      )
  );
};