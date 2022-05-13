import React from 'react';

import Layout from 'containers/Layout';
import Header from 'containers/Header';
import ListView from 'components/ListView';
import { getAllArticles } from 'lib/api';

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

const Collection = ({ ...rest }) => (
  <Layout pageTitle="Collection · Nezhivar">
    <div className="flex flex-row">
      <ListView title="Collection" {...rest} />
      <div className="flex-1">
        <Header />
      </div>
    </div>
  </Layout>
);

export default Collection;
