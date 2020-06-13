// ※ この Action は Web Worker を含むのでクライアント側でしか実行することができない
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// import { normalize, schema } from 'normalizr';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DiffWorker from 'worker-loader?name=static/[hash].worker.js!../../workers/diff.worker';
import types from './types';
import contentActions from './fetchContent';
import repositoryFactory from '../../services/repositoryFactory';
import { StoreState } from '../../store/index';

const repository = repositoryFactory.get('wiki');

/**
 * asyncFetchDiffContentStarted
 */
export function asyncFetchDiffContentStarted(
  dispatch: Dispatch
): {
  type: typeof types.asyncFetchDiffContentStarted;
  payload: {
    fetching: boolean;
  };
} {
  return dispatch({
    type: types.asyncFetchDiffContentStarted,
    payload: {
      fetching: true,
    },
  });
}

/**
 * asyncFetchDiffContentDone
 */
export function asyncFetchDiffContentDone(
  dispatch: Dispatch,
  payload: {
    diffHTML: string;
    entityId: string;
  }
): {
  type: typeof types.asyncFetchDiffContentDone;
  payload: {
    diffHTML: string;
    entityId: string;
    fetching: boolean;
  };
} {
  return dispatch({
    type: types.asyncFetchDiffContentDone,
    payload: {
      ...payload,
      fetching: false,
    },
  });
}

/**
 * asyncFetchDiffContentFailed
 */
export function asyncFetchDiffContentFailed(
  dispatch: Dispatch,
  error: Error
): {
  type: typeof types.asyncFetchDiffContentFailed;
  payload: {
    error: Error;
    fetching: boolean;
  };
  error: boolean;
} {
  return dispatch({
    type: types.asyncFetchDiffContentFailed,
    payload: {
      error,
      fetching: false,
    },
    error: true,
  });
}

//  => (dispatch: Dispatch<Actions>, getState: any) => Promise<void>

function fetchDiffContent(
  currentEntityIdIndex: number
): ThunkAction<
  Promise<
    | ReturnType<typeof asyncFetchDiffContentDone>
    | ReturnType<typeof asyncFetchDiffContentFailed>
  >,
  StoreState,
  undefined,
  Actions
> {
  return async (dispatch: Dispatch<any>, getState) => {
    // 差分を取得済みかも見る

    asyncFetchDiffContentStarted(dispatch);

    const wikiState = getState().wiki;
    const { entityIds } = wikiState.histories;
    const entities = wikiState.entities.history;
    const prevEntityIdIndex = currentEntityIdIndex - 1;
    const currentEntityId = entityIds.get(currentEntityIdIndex);
    const prevEntityId = entityIds.get(prevEntityIdIndex);

    // if (typeof currentEntityId !== 'undefined') {
    //   const currentEntity = entities.get(currentEntityId);

    //   if (typeof currentEntity?.diffHTML !== 'undefined') {
    //     asyncFetchDiffContentStarted(dispatch);
    //   }
    // }

    // EntityID の List に index が存在していれば EntityID を取得する
    // List 先頭の index が引数に指定されていると prevEntityIdIndex（-1）が存在しないので false となる
    if (
      typeof currentEntityId !== 'undefined' &&
      typeof prevEntityId !== 'undefined' &&
      prevEntityIdIndex >= 0
    ) {
      try {
        const diffHTML = await new Promise<string>((resolve, reject) => {
          (async () => {
            const currentEntity = entities.get(currentEntityId);
            const prevEntity = entities.get(prevEntityId);

            // pageid が undefined であれば未取得のリビジョンとみなしコンテンツを取得する
            if (
              typeof currentEntity?.pageid === 'undefined' &&
              typeof currentEntity?.revid !== 'undefined'
            ) {
              await dispatch(contentActions.fetchContent(currentEntity.revid));
            }

            // pageid が undefined であれば未取得のリビジョンとみなしコンテンツを取得する
            if (
              typeof prevEntity?.pageid === 'undefined' &&
              typeof prevEntity?.revid !== 'undefined'
            ) {
              await dispatch(contentActions.fetchContent(prevEntity.revid));
            }

            if (
              typeof currentEntity?.text !== 'undefined' &&
              typeof prevEntity?.text !== 'undefined'
            ) {
              const diffWorker = new DiffWorker();

              const onMessage = (e: {
                data: {
                  html: string;
                };
              }) => {
                diffWorker.removeEventListener('message', onMessage, false);
                diffWorker.terminate();
                resolve(e.data.html);
              };

              diffWorker.addEventListener('message', onMessage, false);

              diffWorker.postMessage({
                htmlA: currentEntity?.text,
                htmlB: prevEntity?.text,
              });
            } else {
              // コンテンツの取得に失敗した場合はエラーメッセージを指定して状態を reject にする
              reject(new Error('[fetchDiffContent] Content Missing'));
            }
          })();
        });

        return asyncFetchDiffContentDone(dispatch, {
          diffHTML,
          entityId: currentEntityId,
        });
      } catch (error) {
        // エラーが発生した場合はエラーメッセージの文字列を投げる
        return asyncFetchDiffContentFailed(dispatch, error);
      }
    }

    // 先頭の記事の処理
    if (typeof currentEntityId !== 'undefined') {
      const currentEntity = entities.get(currentEntityId);
      // pageid が undefined であれば未取得のリビジョンとみなしコンテンツを取得する
      if (
        typeof currentEntity?.pageid === 'undefined' &&
        typeof currentEntity?.revid !== 'undefined'
      ) {
        await dispatch(contentActions.fetchContent(currentEntity.revid));

        const diffHTML = currentEntity.text;

        if (typeof diffHTML !== 'undefined') {
          return asyncFetchDiffContentDone(dispatch, {
            diffHTML,
            entityId: currentEntityId,
          });
        }

        return asyncFetchDiffContentFailed(
          dispatch,
          new Error(
            '[Actions#fetchDiffContent] Failed to retrieve first revision content.'
          )
        );
      }
    }

    return asyncFetchDiffContentFailed(
      dispatch,
      new Error("[Actions#fetchDiffContent] We couldn't find the entityID.")
    );
  };
}

export default {
  fetchDiffContent,
};
