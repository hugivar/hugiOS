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
import { getAllArticles, getArticleBySlug } from "src/data/api";
import { determineIPFS } from "src/utils/routing";
import { getNotes } from 'src/data/notion';

interface IPost {
  data: any;
}

const JournalItem = ({ data, ...rest }: IPost) => {
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
    journal: string;
  };
}

export async function getStaticProps({ params }: PageParams) {
  const ipfsEnabled = determineIPFS();
  getNotes();
  const postsData = ipfsEnabled
    ? await getArticlesFromFiles("journal")
    : await getAllArticles(["slug", "title", "description", "date"], "journal");

  const data = ipfsEnabled
    ? await getArticleFromFileBySlug(params.journal, "journal")
    : await getArticleBySlug(params.journal);

  return {
    props: {
      items: postsData,
      data,
    },
  };
}

export async function getStaticPaths() {
  const paths = getArticleSlugs("journal").map((slug) => `/journal/${slug}`);

  return {
    paths,
    fallback: false,
  };
}

export default JournalItem;
