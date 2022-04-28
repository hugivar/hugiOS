/* tslint:disable */
import React from "react";
import { useRouter } from "next/router";

import { getPostsFromFiles, getPostSlugs, getPostBySlug } from "lib/fs";
import Layout from "containers/Layout";
import { Header } from "containers/Header";
import ListView from "components/ListView";
import ContentItem from "components/ContentItem";
import { getAllPosts, useGetPosts } from "lib/api";

interface IPost {
  frontmatter: any;
  body: any;
}

const Item = ({ ...rest }: IPost) => {
  const router = useRouter();

  console.log("16", router);

  // if (!frontmatter) return null;

  // return (
  //   <Layout pageTitle={`${frontmatter.title} · Nezhivar`}>
  //     <div className="flex flex-row">
  //       <ListView title="Journal" {...rest} />
  //       <div className="flex-1 w-full overflow-x-auto h-screen" id="content">
  //         <Header title={frontmatter.title} />
  //         <ContentItem frontmatter={frontmatter} body={body} />
  //       </div>
  //     </div>
  //   </Layout>
  // );
};

interface PageParams {
  params: {
    post: string;
  };
}

export async function getStaticProps({ params }: PageParams) {
  console.log("params", params);

  // const postsData = await getPostsFromFiles([
  //   "slug",
  //   "title",
  //   "description",
  //   "date",
  // ]);

  // const { body } = await getPostBySlug(params.post);

  return {
    props: {
      items: [],
    },
  };
}

export async function getStaticPaths() {
  // const paths = getPostSlugs().map((slug) => `/journal/${slug}`);
  // console.log("64", props);

  return {
    paths: ["/journal/*"],
    fallback: false,
  };
}

export default Item;
