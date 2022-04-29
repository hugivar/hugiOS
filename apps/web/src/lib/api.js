import useSWR from "swr"

const postPath = "https://dev.to/api/articles?username=nezhivar&per_page=1000";
const fetcher = url => fetch(url).then(res => res.json())

export const getAllArticles = async (fields = [], type) => {
  const posts = await fetcher(postPath);
  const tagType = type === 'journal' ? 'nezhivarjournal' : 'nezhivarcollection';

  return (
    posts
      .filter(item => item.tag_list.includes(tagType))
      .reduce((acc, currentItem) => {
        const newObject = Object
          .keys(currentItem)
          .filter(key => fields.includes(key))
          .reduce((acc, item) => (
            { ...acc, [item]: currentItem[item] }
          ), { type });

        return [...acc, newObject]
      }, [])
      // sort posts by date in descending order
      .sort(
        (post1, post2) =>
          new Date(post2.date) - new Date(post1.date),
      )
  );
};

export const getArticleBySlug = async (slug) => {
  const article = await fetcher(`https://dev.to/api/articles/nezhivar/${slug}`);

  return article;
};

export const useGetPosts = () => {
  const { data: posts, error } = useSWR(postPath, fetcher)

  return { posts, error }
};