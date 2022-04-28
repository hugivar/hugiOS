import React from 'react';

import Layout from 'containers/Layout';
import { Header } from 'containers/Header';
import ListView from 'components/ListView';
import { getAllPosts, useGetPosts } from 'lib/api';
// import { getPostsFromFiles } from 'lib/fs';

export async function getStaticProps() {
  const postsData = await getAllPosts(['slug', 'title', 'description', 'date', 'tags']);
  // const posts = getPostsFromFiles(['slug', 'title', 'description', 'date']);

  return {
    props: {
      items: postsData,
    },
  };
}

const Journal = ({ ...rest }) => {
  const { posts, error } = useGetPosts()

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
