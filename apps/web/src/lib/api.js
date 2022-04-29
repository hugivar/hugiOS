import useSWR from "swr"

const postPath = "https://dev.to/api/articles?username=nezhivar";
const slugPath = ""
const fetcher = url => fetch(url).then(res => res.json())

export const getAllPosts = async (fields = []) => {
  const posts = await fetcher(postPath);

  return (
    posts
      .reduce((acc, currentItem) => {
        const newObject = Object
          .keys(currentItem)
          .filter(key => fields.includes(key))
          .reduce((acc, item) => (
            { ...acc, [item]: currentItem[item] }
          ), { type: 'journal' });

        return [...acc, newObject]
      }, [])
      // sort posts by date in descending order
      .sort(
        (post1, post2) =>
          new Date(post2.date) - new Date(post1.date),
      )
  );
};

export const getPostBySlug = async (slug) => {
  const article = await fetcher(`https://dev.to/api/articles/nezhivar/${slug}`);

  return article;
};

export const useGetPosts = () => {
  const { data: posts, error } = useSWR(postPath, fetcher)

  return { posts, error }
};

export const getAllCollectionArticles = async (fields = []) => {
  const posts = await fetcher(postPath);

  return (
    posts
      .reduce((acc, currentItem) => {
        const newObject = Object
          .keys(currentItem)
          .filter(key => fields.includes(key))
          .reduce((acc, item) => (
            { ...acc, [item]: currentItem[item] }
          ), { type: 'journal' });

        return [...acc, newObject]
      }, [])
      // sort posts by date in descending order
      .sort(
        (post1, post2) =>
          new Date(post2.date) - new Date(post1.date),
      )
  );
};