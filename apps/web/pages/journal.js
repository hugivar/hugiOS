import React from 'react';

import Layout from 'containers/Layout';
import { Header } from 'containers/Header';
import ListView from 'components/ListView';
import { getAllArticles } from 'lib/api';

export async function getStaticProps() {
  const postsData = await getAllArticles(['slug', 'title', 'description', 'date', 'tags'], 'journal');

  return {
    props: {
      items: postsData,
    },
  };
}

const Journal = ({ ...rest }) => {
  return (
    <Layout pageTitle="Journal · Nezhivar">
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
