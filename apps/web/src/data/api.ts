import useSWR from "swr";

const articlePath =
  "https://dev.to/api/articles?username=nezhivar&per_page=1000";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Type = "journal";
type IArticle = {
  date: any;
  tag_list: string[];
};

export const getAllArticles = async (fields: string[] = [], type: Type) => {
  const articles = await fetcher(articlePath);
  const tagType = type === "journal" ? "nezhivarjournal" : "nezhivarcollection";

  return articles
    .filter((item: IArticle) => item.tag_list.includes(tagType))
    .reduce((acc: IArticle[], currentItem: any) => {
      const newObject = Object.keys(currentItem)
        .filter((key: string) => fields.includes(key))
        .reduce((acc, item) => ({ ...acc, [item]: currentItem[item] }), {
          type,
        });

      return [...acc, newObject];
    }, []);
  // sort posts by date in descending order
  // .sort(
  //   (post1: any, post2: any) => new Date(post2.date) - new Date(post1.date)
  // )
};

export const getArticleBySlug = async (slug: string) => {
  const article = await fetcher(`https://dev.to/api/articles/nezhivar/${slug}`);

  return article;
};

export const useGetPosts = () => {
  const { data: posts, error } = useSWR(articlePath, fetcher);

  return { posts, error };
};
