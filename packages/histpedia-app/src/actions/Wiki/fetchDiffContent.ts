// ※ この Action は Web Worker を含むのでクライアント側でしか実行することができない
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DiffWorker from 'worker-loader?name=static/[hash].worker.js!../../workers/diff.worker';
import types from './types';
import contentActions from './fetchContent';
import { StoreState } from '../../store/index';

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
    diffHTML?: string;
    entityId: string;
    viewEntityIdIndex: number;
  }
): {
  type: typeof types.asyncFetchDiffContentDone;
  payload: {
    diffHTML?: string;
    entityId: string;
    fetching: boolean;
    viewEntityIdIndex: number;
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
  currentEntityIdIndex: number,
  diff = true
): ThunkAction<
  Promise<
    | ReturnType<typeof asyncFetchDiffContentDone>
    | ReturnType<typeof asyncFetchDiffContentFailed>
  >,
  StoreState,
  undefined,
  Actions
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (dispatch: Dispatch<any>, getState) => {
    let wikiState = getState().wiki;
    let entities = wikiState.entities.history;
    const { entityIds } = wikiState.histories;
    const prevEntityIdIndex = currentEntityIdIndex - 1;
    const currentEntityId = entityIds.get(currentEntityIdIndex);
    const prevEntityId = entityIds.get(prevEntityIdIndex);

    // EntityID が存在しなければ何もしない
    // EntityID の List に index が存在していれば Entity を取得する
    if (typeof currentEntityId !== 'undefined') {
      let currentEntity = entities.get(currentEntityId);

      if (
        (typeof currentEntity?.text === 'undefined' && !diff) ||
        (typeof currentEntity?.diffHTML === 'undefined' && diff)
      ) {
        asyncFetchDiffContentStarted(dispatch);

        // pageid が undefined であれば未取得のリビジョンとみなしコンテンツを取得する
        if (
          typeof currentEntity?.pageid === 'undefined' &&
          typeof currentEntity?.revid !== 'undefined'
        ) {
          await dispatch(contentActions.fetchContent(currentEntity.revid));
          // state を更新する
          wikiState = getState().wiki;
          entities = wikiState.entities.history;
          currentEntity = entities.get(currentEntityId);
        }

        // currentEntityId ひとつ前の prevEntityId が存在していれば、
        // currentEntity.text と prevEntityId.text との差分を currentEntity.diffHTML とする
        // List 先頭の index が引数に指定されていると prevEntityIdIndex は存在しないので false となる
        if (
          typeof prevEntityId !== 'undefined' &&
          prevEntityIdIndex >= 0 &&
          diff
        ) {
          try {
            // currentEntity.text と prevEntityId.text との差分を取得する
            const diffHTML = await new Promise<string | undefined>(
              (resolve, reject) => {
                (async () => {
                  let prevEntity = entities.get(prevEntityId);

                  // pageid が undefined であれば未取得のリビジョンとみなしコンテンツを取得する
                  if (
                    typeof prevEntity?.pageid === 'undefined' &&
                    typeof prevEntity?.revid !== 'undefined'
                  ) {
                    await dispatch(
                      contentActions.fetchContent(prevEntity.revid)
                    );
                    // state を更新する
                    wikiState = getState().wiki;
                    entities = wikiState.entities.history;
                    prevEntity = entities.get(prevEntityId);
                  }

                  if (
                    typeof currentEntity?.text !== 'undefined' &&
                    typeof prevEntity?.text !== 'undefined'
                  ) {
                    // 差分検出をして、差分用のマークアップを含む HTML 文字列を返す Worker
                    const diffWorker = new DiffWorker();

                    // Worker からのメッセージを受け取った時の処理するイベントハンドラー
                    const onMessage = (e: {
                      data: {
                        html: string;
                      };
                    }) => {
                      // Worker のイベントリスナーを削除して終了する
                      diffWorker.removeEventListener(
                        'message',
                        onMessage,
                        false
                      );
                      diffWorker.terminate();
                      resolve(e.data.html);
                    };

                    // Worker からのメッセージを受け取った時のイベントリスナー
                    diffWorker.addEventListener('message', onMessage, false);

                    // Worker に比較する HTML を送る
                    diffWorker.postMessage({
                      htmlA: currentEntity?.text,
                      htmlB: prevEntity?.text,
                    });
                  } else {
                    // text キーに値が存在しなければコンテンツの取得に失敗しているので
                    // エラーメッセージを指定して状態を reject にする
                    reject(new Error('[fetchDiffContent] Content Missing'));
                  }
                })();
              }
            );

            return asyncFetchDiffContentDone(dispatch, {
              diffHTML,
              entityId: currentEntityId,
              viewEntityIdIndex: currentEntityIdIndex,
            });
          } catch (error) {
            // エラーが発生した場合はエラーメッセージの文字列を投げる
            return asyncFetchDiffContentFailed(dispatch, error);
          }
        }

        return asyncFetchDiffContentDone(dispatch, {
          // 先頭の記事のみ比較する差分が存在しないので text を diffHTML とする
          diffHTML:
            currentEntityIdIndex === 0 ? currentEntity?.text : undefined,
          entityId: currentEntityId,
          viewEntityIdIndex: currentEntityIdIndex,
        });
      }

      // すでに処理済みのリビジョンの処理
      // 表示位置（viewEntityIdIndex）のみをアップデートする
      return asyncFetchDiffContentDone(dispatch, {
        diffHTML: currentEntity?.diffHTML,
        entityId: currentEntityId,
        viewEntityIdIndex: currentEntityIdIndex,
      });
    }

    // 存在しない entityID が指定された場合は失敗とする
    return asyncFetchDiffContentFailed(
      dispatch,
      new Error("[Actions#fetchDiffContent] We couldn't find the entityID.")
    );
  };
}

export default {
  fetchDiffContent,
};
