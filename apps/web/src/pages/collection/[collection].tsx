/* tslint:disable */
import React from "react";

import {
  getArticlesFromFiles,
  getArticleSlugs,
  getArticleFromFileBySlug,
} from "src/lib/fs";
import Layout from "src/containers/Layout";
import Header from "src/containers/Header";
import ListView from "components/ListView";
import ContentItem from "components/ContentItem";
import { determineIPFS } from "src/utils/routing";
import { getAllArticles, getArticleBySlug } from "src/data/api";

interface IPost {
  data: any;
}

const CollectionItem = ({ data, ...rest }: IPost) => {
  const { title, body_markdown } = data;

  return (
    <Layout pageTitle={`${title} · Nezhivar`}>
      <div className="flex flex-row">
        <ListView title="Collection" {...rest} />
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
    collection: string;
  };
}

export async function getStaticProps({ params }: PageParams) {
  const ipfsEnabled = determineIPFS();

  const postsData = ipfsEnabled
    ? await getArticlesFromFiles("collection")
    : await getAllArticles(
      ["slug", "title", "description", "date"],
      "collection"
    );

  const data = ipfsEnabled
    ? await getArticleFromFileBySlug(params.collection, "collection")
    : await getArticleBySlug(params.collection);

  return {
    props: {
      items: postsData,
      data,
    },
  };
}

export async function getStaticPaths() {
  const paths = getArticleSlugs("collection").map(
    (slug) => `/collection/${slug}`
  );

  return {
    paths,
    fallback: false,
  };
}

export default CollectionItem;
