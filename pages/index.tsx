import * as React from 'react';
import Layout from '../components/Layout';
import { NextPage } from 'next';
import Paper from '../src/components/atoms/Paper';

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Paper />
    </Layout>
  );
};

export default IndexPage;
