/* eslint-disable no-useless-escape */
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

type Type = "journal";

const postsDirectory = join(process.cwd(), "data/posts");
const collectionsDirectory = join(process.cwd(), "data/collections");

export function getArticleSlugs(type: Type) {
  const directory = type === "journal" ? postsDirectory : collectionsDirectory;

  const slugs = fs.readdirSync(directory);
  return slugs.map((key) => key.replace(/^.*[\\\/]/, "").slice(0, -3));
}

export const getArticleFromFileBySlug = (slug: string, type: Type) => {
  const directory = type === "journal" ? "posts" : "collections";

  const file = fs.readFileSync(`src/${directory}/${slug}.md`, "utf8");

  const { data, content: body } = matter(file);

  return { ...data, body, slug, type: "journal" };
};

export const getArticlesFromFiles = (type: Type) => {
  const slugs = getArticleSlugs(type);

  return (
    slugs
      .map((slug) => getArticleFromFileBySlug(slug, type))
      // sort posts by date in descending order
      .sort(
        (post1: any, post2: any) =>
          new Date(post2.date).valueOf() - new Date(post1.date).valueOf()
      )
  );
};
