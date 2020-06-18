import React from 'react';
import Head from 'next/head';
import Home from '../src/components/templates/home';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Histpedia</title>
      </Head>
      <Home />
    </>
  );
};

export default IndexPage;
