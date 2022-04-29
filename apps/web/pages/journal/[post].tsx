/* tslint:disable */
import React from "react";

import { getPostsFromFiles, getPostSlugs, getPostBySlugFromFile } from "lib/fs";
import Layout from "containers/Layout";
import { Header } from "containers/Header";
import ListView from "components/ListView";
import ContentItem from "components/ContentItem";
import { getAllPosts, getPostBySlug } from "lib/api";
import { determineIPFS } from "utils/routing";

interface IPost {
  data: any;
}

const Item = ({ data, ...rest }: IPost) => {
  const { title, body_markdown } = data;

  return (
    <Layout pageTitle={`${title} · Nezhivar`}>
      <div className="flex flex-row">
        <ListView title="Journal" {...rest} />
        <div className="flex-1 w-full overflow-x-auto h-screen" id="content">
          <Header title={title} />
          <ContentItem title={title} body={body_markdown} />
        </div>
      </div>
    </Layout>
  );
};

interface PageParams {
  params: {
    post: string;
  };
}

export async function getStaticProps({ params }: PageParams) {
  const ipfsEnabled = determineIPFS();

  const postsData = ipfsEnabled
    ? await getPostsFromFiles(["slug", "title", "description", "date"])
    : await getAllPosts(["slug", "title", "description", "date"]);

  const data = ipfsEnabled
    ? await getPostBySlugFromFile(params.post)
    : await getPostBySlug(params.post);

  return {
    props: {
      items: postsData,
      data,
    },
  };
}

export async function getStaticPaths() {
  const paths = getPostSlugs().map((slug) => `/journal/${slug}`);

  return {
    paths,
    fallback: false,
  };
}

export default Item;
