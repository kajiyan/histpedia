import { Dispatch } from 'redux';
import types from './types';
import repositoryFactory from '../../services/repositoryFactory';

const HTTP_404_PAGE_ID = 1014744;
const repository = repositoryFactory.get('wiki');

export function asyncFetchPageIdStarted(
  dispatch: Dispatch
): {
  type: typeof types.asyncFetchPageIdStarted;
} {
  return dispatch({
    type: types.asyncFetchPageIdStarted,
  });
}

export function asyncFetchPageIdDone(
  dispatch: Dispatch,
  payload: {
    currentTitle: string; // URL で渡ってきたタイトル
    pageid: number; // ページのID
    title: string; // ページのタイトル（URLに指定されているものは`_`で単語同士が接続されている）
  }
): {
  type: typeof types.asyncFetchPageIdDone;
  payload: {
    currentTitle: string;
    pageid: number;
    title: string;
  };
} {
  return dispatch({
    type: types.asyncFetchPageIdDone,
    payload,
  });
}

export function asyncFetchPageIdFailed(
  dispatch: Dispatch,
  error: Error
): {
  type: typeof types.asyncFetchPageIdFailed;
  payload: {
    error: Error;
  };
  error: boolean;
} {
  return dispatch({
    type: types.asyncFetchPageIdFailed,
    payload: {
      error,
    },
    error: true,
  });
}

/**
 * ページの ID を取得する
 * @param {string} titles ID を取得する記事のタイトル
 */
function fetchPageId(
  titles: string
): (
  dispatch: Dispatch<Actions>
) => Promise<
  | ReturnType<typeof asyncFetchPageIdDone>
  | ReturnType<typeof asyncFetchPageIdFailed>
> {
  return async (dispatch: Dispatch) => {
    asyncFetchPageIdStarted(dispatch, {
      currentTitle: titles,
    });

    try {
      const response = await repository.getPageId(titles);
      const { pages } = response.data.query;

      // 検索結果が1件以上返ってきており、1件目にpageidが存在するか
      if (
        pages.length >= 1 &&
        typeof pages[0].pageid !== 'undefined' &&
        typeof pages[0].missing === 'undefined'
      ) {
        // ページのIDが取得できた時の処理
        const { pageid, title } = pages[0];

        return asyncFetchPageIdDone(dispatch, {
          currentTitle: titles,
          pageid,
          title,
        });
      }

      // ページのIDが取得できなかった時の処理
      return asyncFetchPageIdDone(dispatch, {
        currentTitle: titles,
        pageid: HTTP_404_PAGE_ID,
        title: titles,
      });
    } catch (error) {
      return asyncFetchPageIdFailed(dispatch, new Error(error));
    }
  };
}

export default {
  fetchPageId,
};
