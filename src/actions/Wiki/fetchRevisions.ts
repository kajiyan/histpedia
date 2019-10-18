import { Dispatch } from 'redux';
import { normalize, schema } from 'normalizr';
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
    result: string[];
    entities: {
      revisions: {
        [key: string]: WikiRevision;
      };
    };
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
      const revisions = await new Promise<WikiRevision[] | string>(
        (resolve, reject) => {
          (async function stackRevisions(
            results: WikiRevision[] = [],
            rvstartid?: number
          ) {
            const response = await repository.getRevisions(pageid,　rvstartid);
            const { pages } = response.data.query;

            // 検索結果が1件以上返ってきており、0件目にリビジョンが存在しているか
            if (
              pages.length >= 1 &&
              pages[0].revisions &&
              typeof pages[0].missing === 'undefined'
            ) {
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
              // リビジョンの取得に失敗した場合はエラーメッセージを指定して状態をrejectにする
              reject('missing');
            }
          })();
        }
      );

      // 差分のバイト数を求める場合
      // revisions.forEach((revision, index) => {
      //   if (index > 0) {
      //     revision.diff = revision.size - revisions[index - 1].size;
      //     return;
      //   }
      //   revision.diff = revision.size;
      // });

      const revisionSchema = new schema.Entity<WikiRevision>(
        'revisions',
        {},
        {
          idAttribute: (value: WikiRevision) => {
            return value.revid.toString();
          }
        }
      );
      const revisionListSchema = new schema.Array(revisionSchema);
      const { result, entities } = normalize<
        WikiRevision,
        {
          revisions: {
            [key: string]: WikiRevision;
          };
        },
        string[]
      >(revisions, revisionListSchema);

      return asyncFetchRevisionsDone(dispatch, {
        result,
        entities
      });
    } catch (error) {
      return asyncFetchRevisionsFailed(dispatch, new Error(error));
    }
  };
}

export default {
  fetchRevisions
};
