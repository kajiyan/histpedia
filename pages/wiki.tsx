import { NextJSContext } from 'next-redux-wrapper';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import actions from '../src/actions/Wiki';
import types from '../src/actions/Wiki/types';
import Wiki from '../src/containers/templates/Wiki';
import Layout from '../components/Layout';

type Props = {
  dispatch: Dispatch;
};

class WikiPage extends React.Component<Props> {
  static getInitialProps = async ({ query, store }: NextJSContext) => {
    try {
      // ParsedUrlQuery 型は string | string[] なのでアサーションする
      const { titles } = query as { titles: string };

      const fetchPageIdAction = await actions.fetchPageId(titles)(
        store.dispatch
      );

      if (
        fetchPageIdAction.type === types.asyncFetchPageIdDone &&
        fetchPageIdAction.payload.pageid > 0
      ) {
        // 指定されたキーワードに該当するページのIDが取得できたら、
        // その更新履歴のIDを取得する
        const { pageid } = fetchPageIdAction.payload;
        const fetchRevisionsAction = await actions.fetchRevisions(pageid)(
          store.dispatch
        );

        if (
          fetchRevisionsAction.type === types.asyncFetchRevisionsDone &&
          fetchRevisionsAction.payload.result.length > 0
        ) {
          const { result, entities } = fetchRevisionsAction.payload;
          const { revisions } = entities;
          const curRevId = revisions[result[0]].revid;
          await actions.fetchContent(curRevId)(store.dispatch);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * render
   */
  render() {
    return (
      <Layout>
        <React.Fragment>
          <h1>Title</h1>
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
