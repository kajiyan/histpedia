import { Dispatch } from 'redux';
import types from './types';
import repositoryFactory from '../../services/repositoryFactory';

const ROOT_REVISION_ID = 0;
const repository = repositoryFactory.get('wiki');

export function asyncFetchRevisionsStarted(dispatch: Dispatch) {
  return dispatch({
    type: types.asyncFetchRevisionsStarted
  });
}

export function asyncFetchRevisionsDone(
  dispatch: Dispatch,
  payload: {
    revisions: WikiRevision[];
  }
) {
  return dispatch({
    type: types.asyncFetchRevisionsDone,
    payload
  });
}

export function asyncFetchRevisionsFailed(dispatch: Dispatch, error: Error) {
  return dispatch({
    type: types.asyncFetchRevisionsFailed,
    payload: {
      error
    },
    error: true
  });
}

function fetchRevisions(pageid: number) {
  return async (dispatch: Dispatch) => {
    asyncFetchRevisionsStarted(dispatch);

    try {
      const revisions = await new Promise<WikiRevision[]>(
        resolve => {
          (async function stackRevisions(
            results: WikiRevision[] = [],
            rvstartid?: number
          ) {
            const response = await repository.getRevisions(pageid, rvstartid);
            const { pages } = response.data.query;
            // 検索結果が1件以上返ってきており、1件目にpageidとリビジョンが存在するか
            if (pages.length >= 1 && pages[0].pageid && pages[0].revisions) {
              const { revisions } = pages[0];
              // 取得したリビジョンの末尾の親リビジョンのIDを取得する
              const endParentId = revisions[revisions.length - 1].parentid;
              const isComplete = endParentId === ROOT_REVISION_ID;

              results = results.concat(revisions);

              if (isComplete) {
                resolve(results.reverse());
              } else {
                stackRevisions(results, endParentId);
              }
            } else {
              resolve(results);
            }
          })();
        }
      );

      // 差分を求める場合
      // revisions.forEach((revision, index) => {
      //   if (index > 0) {
      //     revision.diff = revision.size - revisions[index - 1].size;
      //     return;
      //   }
      //   revision.diff = revision.size;
      // });

      return asyncFetchRevisionsDone(dispatch, { revisions });
    } catch (error) {
      return asyncFetchRevisionsFailed(dispatch, new Error(error));
    }
  };
}

export default {
  fetchRevisions
};
