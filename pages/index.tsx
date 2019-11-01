import * as React from 'react';
import Layout from '../components/Layout';
import { NextPage } from 'next';
// import HistoryPaper from '../src/components/atoms/HistoryPaper';
// import Paper from '../src/components/atoms/Paper';
// import Home from '../src/containers/templates/Home';
// import { withRedux } from '../src/utilities/HOC/redux';

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      {/* <Home /> */}
      {/* <HistoryPaper /> */}
      {/* <Paper>Hello world</Paper> */}
      <div>test</div>
    </Layout>
  );
};

export default IndexPage;
// export default withRedux(IndexPage);