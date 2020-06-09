import React from 'react';
import Link from 'next/link';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import ExampleActions from '../src/actions/Example';
import Layout from '../components/Layout';

function mapStateToProps(state: StoreState) {
  return {
    count: state.example.count,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ExampleActions, dispatch);
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const IndexPage = (props: Props): JSX.Element => {
  const { count } = props;

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>
        Hello Next.js {count}
        <span role="img" aria-label="Hello">
          👋
        </span>
      </h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
