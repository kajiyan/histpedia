import { Dispatch } from 'redux';
import { normalize, schema } from 'normalizr';
import types from './types';
import repositoryFactory from '../../services/repositoryFactory';

const repository = repositoryFactory.get('wiki');

export function asyncFetchContentStarted(dispatch: Dispatch) {
  return dispatch({
    type: types.asyncFetchContentStarted
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
) {
  return dispatch({
    type: types.asyncFetchContentDone,
    payload
  });
}

export function asyncFetchContentFailed(dispatch: Dispatch, error: Error) {
  return dispatch({
    type: types.asyncFetchContentFailed,
    payload: {
      error
    },
    error: true
  });
}

function fetchContent(revid: number) {
  return async (dispatch: Dispatch) => {
    asyncFetchContentStarted(dispatch);

    try {
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
            }
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
          entities
        });
      } else {
        // エラーが発生した場合はエラーメッセージの文字列を投げる
        throw response.data.error!.info;
      }
    } catch (error) {
      return asyncFetchContentFailed(dispatch, new Error(error));
    }
  };
}

export default {
  fetchContent
};
