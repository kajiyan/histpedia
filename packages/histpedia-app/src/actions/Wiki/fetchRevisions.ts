import { Dispatch } from 'redux';
import { normalize, schema } from 'normalizr';
import types from './types';
import repositoryFactory from '../../services/repositoryFactory';

const ROOT_REVISION_ID = 0;
const repository = repositoryFactory.get('wiki');

export function asyncFetchRevisionsStarted(
  dispatch: Dispatch
): {
  type: typeof types.asyncFetchRevisionsStarted;
} {
  return dispatch({
    type: types.asyncFetchRevisionsStarted,
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
): {
  type: typeof types.asyncFetchRevisionsDone;
  payload: {
    result: string[];
    entities: {
      revisions: {
        [key: string]: WikiRevision;
      };
    };
  };
} {
  return dispatch({
    type: types.asyncFetchRevisionsDone,
    payload,
  });
}

export function asyncFetchRevisionsFailed(
  dispatch: Dispatch,
  error: Error
): {
  type: typeof types.asyncFetchRevisionsFailed;
  payload: {
    error: Error;
  };
  error: boolean;
} {
  return dispatch({
    type: types.asyncFetchRevisionsFailed,
    payload: {
      error,
    },
    error: true,
  });
}

function fetchRevisions(
  pageid: number
): (
  dispatch: Dispatch<Actions>
) => Promise<
  | ReturnType<typeof asyncFetchRevisionsDone>
  | ReturnType<typeof asyncFetchRevisionsFailed>
> {
  return async (dispatch: Dispatch) => {
    asyncFetchRevisionsStarted(dispatch);

    try {
      let revisions = await new Promise<WikiRevision[]>((resolve, reject) => {
        (async function stackRevisions(
          results: WikiRevision[] = [],
          rvstartid?: number
        ) {
          const response = await repository.getRevisions(pageid, rvstartid);
          const { pages } = response.data.query;

          // 検索結果が1件以上返ってきており、0件目にリビジョンが存在しているか
          if (
            pages.length >= 1 &&
            pages[0].revisions &&
            typeof pages[0].missing === 'undefined'
          ) {
            const r = pages[0].revisions;
            // 取得したリビジョンの末尾の親リビジョンのIDを取得する
            const endParentId = r[r.length - 1].parentid;
            const isComplete = endParentId === ROOT_REVISION_ID;

            results.push(...r);

            if (isComplete) {
              resolve(results.reverse());
            } else {
              stackRevisions(results, endParentId);
            }
          } else {
            // リビジョンの取得に失敗した場合はエラーメッセージを指定して状態をrejectにする
            reject(new Error('missing'));
          }
        })();
      });

      // 差分のバイト数を求める
      revisions = revisions.map(
        (revision, index): WikiRevision => {
          if (index > 0) {
            return {
              ...revision,
              // 差分はその絶対値とする
              diffBytes: Math.abs(revision.size - revisions[index - 1].size),
            };
          }

          return {
            ...revision,
            // 最初のリビジョンにマイナス方向の差分はないと推測されるが念のため
            diffBytes: Math.abs(revision.size),
          };
        }
      );

      const revisionSchema = new schema.Entity<WikiRevision>(
        'revisions',
        {},
        {
          idAttribute: (value: WikiRevision) => {
            return value.revid.toString();
          },
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
        entities,
      });
    } catch (error) {
      return asyncFetchRevisionsFailed(dispatch, error);
    }
  };
}

export default {
  fetchRevisions,
};
