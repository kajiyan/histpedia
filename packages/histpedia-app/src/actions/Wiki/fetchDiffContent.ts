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
  dispatch: Dispatch
): {
  type: typeof types.asyncFetchDiffContentDone;
  payload: {
    fetching: boolean;
  };
} {
  return dispatch({
    type: types.asyncFetchDiffContentDone,
    payload: {
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
  currentEntityIdIndex?: number
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
    asyncFetchDiffContentStarted(dispatch);

    // const diffWorker = new DiffWorker();
    const wikiState = getState().wiki;
    const entities = wikiState.entities.history;
    const { entityIds } = wikiState.histories;

    // 引数に EntityID の Index が指定されていれば +1 して次の index も用意する
    if (typeof currentEntityIdIndex !== 'undefined') {
      const prevEntityIdIndex = currentEntityIdIndex - 1;
      const currentEntityId = entityIds.get(currentEntityIdIndex);
      const prevEntityId = entityIds.get(prevEntityIdIndex);

      // EntityID の List に index が存在していれば EntityID を取得する
      // List 先頭の index が引数に指定されていると prevEntityIdIndex（-1）が存在しないので false となる
      if (
        typeof currentEntityId !== 'undefined' &&
        typeof prevEntityId !== 'undefined' &&
        prevEntityIdIndex >= 0
      ) {
        // #has で List に存在する index であることを保証しているので型変換する
        const currentEntity = entities.get(currentEntityId);
        const prevEntity = entities.get(prevEntityId);

        // pageid が undefined であれば未取得のリビジョンとみなしコンテンツを取得する
        if (
          typeof currentEntity?.pageid === 'undefined' &&
          typeof currentEntity?.revid !== 'undefined'
        ) {
          await dispatch(contentActions.fetchContent(currentEntity.revid));
        }

        if (
          typeof prevEntity?.pageid === 'undefined' &&
          typeof prevEntity?.revid !== 'undefined'
        ) {
          await dispatch(contentActions.fetchContent(prevEntity.revid));
        }

        console.log(
          '----------> done',
          currentEntity?.revid,
          prevEntity?.revid
        );

        return asyncFetchDiffContentDone(dispatch);

        // const onMessage = () => {
        //   console.log('----------> onMessage');
        // };

        // diffWorker.addEventListener('message', onMessage, false);

        // diffWorker.postMessage(10);

        // console.log(nextEntity?.pageid);
      }
      // 先頭の記事の処理
      console.log('----------> 先頭の記事の処理');
    }

    console.log('----------> failed');

    // エラーが発生した場合はエラーメッセージの文字列を投げる
    return asyncFetchDiffContentFailed(dispatch, new Error());

    // console.log(currentEntityIdIndex, nextEntityIdIndex, getState());
    // diffWorker.terminate();
  };
}

export default {
  fetchDiffContent,
};
