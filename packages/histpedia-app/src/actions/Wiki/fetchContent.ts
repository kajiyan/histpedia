import { Dispatch } from 'redux';
import { normalize, schema } from 'normalizr';
import types from './types';
import repositoryFactory from '../../services/repositoryFactory';

const repository = repositoryFactory.get('wiki');

export function asyncFetchContentStarted(
  dispatch: Dispatch
): {
  type: typeof types.asyncFetchContentStarted;
} {
  return dispatch({
    type: types.asyncFetchContentStarted,
  });
}

export function asyncFetchContentDone(
  dispatch: Dispatch,
  payload: {
    result: string[];
    entities: {
      content: {
        [key: string]: WikiContent;
      };
    };
  }
): {
  type: typeof types.asyncFetchContentDone;
  payload: {
    result: string[];
    entities: {
      content: {
        [key: string]: WikiContent;
      };
    };
  };
} {
  return dispatch({
    type: types.asyncFetchContentDone,
    payload,
  });
}

export function asyncFetchContentFailed(
  dispatch: Dispatch,
  error: Error
): {
  type: typeof types.asyncFetchContentFailed;
  payload: {
    error: Error;
  };
  error: boolean;
} {
  return dispatch({
    type: types.asyncFetchContentFailed,
    payload: {
      error,
    },
    error: true,
  });
}

function fetchContent(
  revid: number
): (
  dispatch: Dispatch<Actions>
) => Promise<
  | ReturnType<typeof asyncFetchContentDone>
  | ReturnType<typeof asyncFetchContentFailed>
> {
  return async (dispatch: Dispatch) => {
    asyncFetchContentStarted(dispatch);

    const response = await repository.getContent(revid);
    const isntError =
      response.data && typeof response.data.error === 'undefined';

    if (isntError) {
      // 正常にAPIからデータを取得した場合は正規化する
      const { data } = response;
      const contentSchema = new schema.Entity<WikiContent>(
        'content',
        {},
        {
          idAttribute: (value: WikiContent) => {
            return value.revid.toString();
          },
        }
      );
      const contentListSchema = new schema.Array(contentSchema);
      const { result, entities } = normalize<
        WikiContent,
        {
          content: {
            [key: string]: WikiContent;
          };
        },
        string[]
      >(data, contentListSchema);

      return asyncFetchContentDone(dispatch, {
        result,
        entities,
      });
    }

    // エラーが発生した場合はエラーメッセージの文字列を投げる
    return asyncFetchContentFailed(
      dispatch,
      new Error(response.data.error?.info)
    );
  };
}

export default {
  fetchContent,
};
