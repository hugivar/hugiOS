import React from 'react';
import { useTranslation } from "@nezhos/i18n";

import Layout from 'src/containers/Layout';
import Header from 'src/containers/Header';
import ListView from 'components/ListView';
import getPages from 'src/data/getPages';

export async function getStaticProps() {
  const pageId = 'a80184c5-8ec5-4d99-b8ec-4b994d5cd7c8';
  const pages = await getPages(pageId);

  return {
    props: {
      pages
    },
  };
}

const Journal = ({ pages, ...rest }) => {
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
