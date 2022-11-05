import React from 'react';
import { useTranslation } from "@nezhos/i18n";

import Layout from 'src/containers/Layout';
import Header from 'src/containers/Header';
import ListView from 'components/ListView';
import { getBlocksByPageId, getPagesByBlocks } from 'src/data/notion';

export async function getStaticProps() {
  const pageId = 'a80184c58ec54d99b8ec4b994d5cd7c8';
  const blocks = await getBlocksByPageId(pageId);
  const pages = await getPagesByBlocks(blocks);

  return {
    props: {
      blocks,
      pages
    },
  };
}

const Journal = ({ blocks, pages, ...rest }: any) => {
  const { t } = useTranslation();

  return (
    <Layout pageTitle="Journal · Nezhivar">
      <div className="flex flex-row">
        <ListView title={t("journal.title")} pages={pages} {...rest} />
        <div className="flex-1">
          <Header />
        </div>
      </div>
    </Layout>
  );
};

export default Journal;
