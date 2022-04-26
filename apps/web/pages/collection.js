import React from 'react';

import Layout from 'containers/Layout';
import { Header } from 'containers/Header';
import ListView from 'components/ListView';
import { getAllCollections } from 'lib/api';

export async function getStaticProps() {
  const collectionData = getAllCollections([
    'slug',
    'title',
    'description',
    'date',
  ]);

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
