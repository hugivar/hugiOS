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
import { getPage, getBlocksByPageId, getPagesByBlocks } from 'src/data/notion';
import { getRichText } from 'src/data/selector';
import TextBlock from 'src/components/TextBlock';

interface PageParams {
  params: {
    journal: string;
  };
}

export async function getStaticProps({ params }: PageParams) {
  const ipfsEnabled = determineIPFS();

  const page = await getPage(params.journal);
  const blocks = await getBlocksByPageId(params.journal);

  // const postsData = ipfsEnabled
  //   ? await getArticlesFromFiles("journal")
  //   : await getAllArticles(["slug", "title", "description", "date"], "journal");

  // const data = ipfsEnabled
  //   ? await getArticleFromFileBySlug(params.journal, "journal")
  //   : await getArticleBySlug(params.journal);

  return {
    props: {
      page,
      blocks
    },
  };
}

export async function getStaticPaths() {
  const pageId = 'a80184c58ec54d99b8ec4b994d5cd7c8';
  const blocks = await getBlocksByPageId(pageId);
  const pages = await getPagesByBlocks(blocks);

  const paths = pages.map((item: any) => `/journal/${item.id}`);

  return {
    paths,
    fallback: false
  };
}

interface IPost {
  page: any;
  blocks: any
}

const JournalItem = ({ page, blocks }: IPost) => {
  const title = page?.properties?.title?.title[0]?.plain_text;
  const date = new Date(page?.created_time);
  const content = blocks.results.map(block => getRichText(block)).filter(item => item);

  return (
    <Layout pageTitle={`${title} · Nezhivar`}>
      <div className="flex flex-row">
        <div className="flex-1 w-full overflow-x-auto h-screen" id="content">
          <Header title={title} />
          <div className="w-full max-w-3xl px-4 py-6 pb-10 mx-auto md:px-8 dark:text-slate-300">
            <div className="w-full flex">
              <div>
                <h1 className="font-sans text-2xl font-bold xl:text-3xl text-primary dark:text-slate-300">
                  {title}
                </h1>
                <p className="inline-block leading-snug text-tertiary mt-4 dark:text-slate-300">
                  {date.toLocaleDateString("en-US")}
                </p>
                <div className="mt-8 prose dark:text-slate-300">
                  {content.map(block => (
                    <TextBlock
                      type={block.type}
                      text={block.plain_text}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JournalItem;