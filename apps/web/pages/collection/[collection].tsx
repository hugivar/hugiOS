/* tslint:disable */
import React from "react";

import {
  getAllCollections,
  getCollectionSlugs,
  getCollectionBySlug,
} from "lib/api";
import Layout from "containers/Layout";
import { Header } from "containers/Header";
import ListView from "components/ListView";
import ContentItem from "components/ContentItem";

interface IPost {
  frontmatter: any;
  body: any;
}

const CollectionItem = ({ frontmatter, body, ...rest }: IPost) => {
  if (!frontmatter) return null;

  return (
    <Layout pageTitle={`${frontmatter.title} · Nezhivar`}>
      <div className="flex flex-row">
        <ListView title="Collection" {...rest} />
        <div className="flex-1 w-full overflow-x-auto h-screen" id="content">
          <Header title={frontmatter.title} />
          <ContentItem frontmatter={frontmatter} body={body} />
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
  const postsData = await getAllCollections([
    "slug",
    "title",
    "description",
    "date",
  ]);

  const { frontmatter, body } = await getCollectionBySlug(params.collection);

  return {
    props: {
      items: postsData,
      frontmatter,
      body,
    },
  };
}

export async function getStaticPaths() {
  const paths = getCollectionSlugs().map((slug) => `/collection/${slug}`);

  return {
    paths,
    fallback: false,
  };
}

export default CollectionItem;
