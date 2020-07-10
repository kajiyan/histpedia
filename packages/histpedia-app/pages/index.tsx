import React from 'react';
import Head from 'next/head';
import Home from '../src/components/templates/home';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <meta property="og:title" content="Histpedia" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://histpedia.org/" />
        <title>Histpedia</title>
      </Head>
      <Home />
    </>
  );
};

export default IndexPage;
