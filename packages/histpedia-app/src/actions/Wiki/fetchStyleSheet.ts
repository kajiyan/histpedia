import { Dispatch } from 'redux';
import types from './types';
import repositoryFactory from '../../services/repositoryFactory';

const HTTP_404_PAGE_STYLE_SHEET = [
  'https://ja.wikipedia.org/w/load.php?modules=mediawiki.skinning.content.parsoid%7Cmediawiki.skinning.interface%7Csite.styles%7Cmediawiki.page.gallery.styles%7Cext.cite.style%7Cext.cite.styles&only=styles&skin=vector',
];
const repository = repositoryFactory.get('wiki');

export function asyncFetchStyleSheetStarted(
  dispatch: Dispatch
): {
  type: typeof types.asyncFetchStyleSheetStarted;
} {
  return dispatch({
    type: types.asyncFetchStyleSheetStarted,
  });
}

export function asyncFetchStyleSheetDone(
  dispatch: Dispatch,
  payload: {
    stylesheets: string[];
  }
): {
  type: typeof types.asyncFetchStyleSheetDone;
  payload: {
    stylesheets: string[];
  };
} {
  return dispatch({
    type: types.asyncFetchStyleSheetDone,
    payload,
  });
}

export function asyncFetchStyleSheetFailed(
  dispatch: Dispatch,
  error: Error
): {
  type: typeof types.asyncFetchStyleSheetFailed;
  payload: {
    stylesheets: string[];
    error: Error;
  };
  error: boolean;
} {
  return dispatch({
    type: types.asyncFetchStyleSheetFailed,
    payload: {
      stylesheets: HTTP_404_PAGE_STYLE_SHEET,
      error,
    },
    error: true,
  });
}

/**
 * ページに使用されているスタイルシートを取得する
 * @param {string} titles ID を取得する記事のタイトル
 */
function fetchStylesheet(
  titles: string
): (
  dispatch: Dispatch<Actions>
) => Promise<
  | ReturnType<typeof asyncFetchStyleSheetDone>
  | ReturnType<typeof asyncFetchStyleSheetFailed>
> {
  return async (dispatch: Dispatch) => {
    asyncFetchStyleSheetStarted(dispatch);

    try {
      const response = await repository.getStylesheet(titles);
      const doc = new DOMParser().parseFromString(response.data, 'text/html');
      const stylesheets: string[] = [];
      const stylesheetList = doc.querySelectorAll(
        'head link[rel="stylesheet"]'
      );

      stylesheetList.forEach((stylesheet) => {
        const href = stylesheet.getAttribute('href');

        if (href) {
          stylesheets.push(`https://ja.wikipedia.org${href}`);
        }
      });

      // ページのIDが取得できなかった時の処理
      return asyncFetchStyleSheetDone(dispatch, { stylesheets });
    } catch (error) {
      return asyncFetchStyleSheetFailed(dispatch, new Error(error));
    }
  };
}

export default {
  fetchStylesheet,
};
