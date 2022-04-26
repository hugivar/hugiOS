/* tslint:disable */
import React from "react";

import { getAllPosts, getPostSlugs, getPostBySlug } from "lib/api";
import Layout from "containers/Layout";
import { Header } from "containers/Header";
import ListView from "components/ListView";
import ContentItem from "components/ContentItem";

interface IPost {
  frontmatter: any;
  body: any;
}

const Item = ({ frontmatter, body, ...rest }: IPost) => {
  if (!frontmatter) return null;

  return (
    <Layout pageTitle={`${frontmatter.title} · Nezhivar`}>
      <div className="flex flex-row">
        <ListView title="Journal" {...rest} />
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
    post: string;
  };
}

export async function getStaticProps({ params }: PageParams) {
  const postsData = await getAllPosts(["slug", "title", "description", "date"]);

  const { frontmatter, body } = await getPostBySlug(params.post);

  return {
    props: {
      items: postsData,
      frontmatter,
      body,
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
