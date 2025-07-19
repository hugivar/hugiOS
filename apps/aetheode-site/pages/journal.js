import React from 'react';

import Layout from 'components/Layout';
import { Header } from 'components/Header';
import ListView from 'components/ListView';
import { getAllPosts } from 'lib/api';

export async function getStaticProps() {
  const postsData = getAllPosts(['slug', 'title', 'description', 'date']);

  return {
    props: {
      items: postsData,
    },
  };
}

const Journal = ({ ...rest }) => {
  return (
    <Layout pageTitle="Journal - Nezhivar">
      <div className="flex flex-row">
        <ListView title="Journal" {...rest} />
        <div className="flex-1">
          <Header />
        </div>
      </div>
    </Layout>
  );
};

export default Journal;
