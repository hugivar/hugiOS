import React from 'react';
import { useTranslation } from "@nezhos/i18n";

import Layout from 'src/containers/Layout';
import Header from 'src/containers/Header';
import ListView from 'components/ListView';
import { getAllArticles } from 'src/data/api';

export async function getStaticProps() {
  const collectionData = await getAllArticles([
    'slug',
    'title',
    'description',
    'date',
  ], 'collection');

  return {
    props: {
      items: collectionData,
    },
  };
}

const Collection = ({ ...rest }) => {
  const { t } = useTranslation();

  return (
    <Layout pageTitle="Collection · Nezhivar">
      <div className="flex flex-row">
        <ListView title={t('collection.title')} {...rest} />
        <div className="flex-1">
          <Header />
        </div>
      </div>
    </Layout>
  );
};

export default Collection;
