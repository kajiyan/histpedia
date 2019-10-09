import { NextJSContext } from 'next-redux-wrapper';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import actions from '../src/actions/Wiki';
import Wiki from '../src/containers/templates/Wiki';
import Layout from '../components/Layout';

type Props = {
  dispatch: Dispatch;
  titles: string;
};

class WikiPage extends React.Component<Props> {
  static getInitialProps = async ({ query, store }: NextJSContext) => {
    try {
      const { titles } = query as { titles: string };
      await store.dispatch<any>(actions.fetchPageId(titles));
      return { titles };
    } catch (err) {
      return { errors: err.message };
    }
  };

  render() {
    const { titles } = this.props;

    return (
      <Layout>
        <React.Fragment>
          <h1>{ titles }</h1>
          <Wiki />
        </React.Fragment>
      </Layout>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(WikiPage);
