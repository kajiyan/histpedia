import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// import { normalize, schema } from 'normalizr';
import types from './types';
import contentActions from './fetchContent';
import repositoryFactory from '../../services/repositoryFactory';
import { StoreState } from '../../store/index';

const repository = repositoryFactory.get('wiki');

export function asyncFetchDiffContentStarted(
  dispatch: Dispatch
): {
  type: typeof types.asyncFetchDiffContentStarted;
} {
  return dispatch({
    type: types.asyncFetchDiffContentStarted,
  });
}

//  => (dispatch: Dispatch<Actions>, getState: any) => Promise<void>

function fetchDiffContent(
  currentEntityIdIndex?: number
): ThunkAction<Promise<void>, StoreState, undefined, Actions> {
  return async (dispatch: Dispatch<any>, getState) => {
    asyncFetchDiffContentStarted(dispatch);

    const wikiState = getState().wiki;
    const entities = wikiState.entities.history;
    const { entityIds } = wikiState.histories;

    // 引数に EntityID の Index が指定されていれば +1 して次の index も用意する
    if (typeof currentEntityIdIndex !== 'undefined') {
      const nextEntityIdIndex = currentEntityIdIndex + 1;
      const currentEntityId = entityIds.get(currentEntityIdIndex);
      const nextEntityId = entityIds.get(nextEntityIdIndex);

      // EntityID の List に index が存在していれば EntityID を取得する
      // 最後の List 末尾の index が引数に指定されていると nextEntityIdIndex が存在しないので false となる
      if (
        typeof currentEntityId !== 'undefined' &&
        typeof nextEntityId !== 'undefined'
      ) {
        // #has で List に存在する index であることを保証しているので型変換する
        const currentEntity = entities.get(currentEntityId);
        const nextEntity = entities.get(nextEntityId);

        // pageid が undefined であれば未取得のリビジョンとみなしコンテンツを取得する
        if (
          typeof currentEntity?.pageid === 'undefined' &&
          typeof currentEntity?.revid !== 'undefined'
        ) {
          await dispatch(contentActions.fetchContent(currentEntity.revid));
        }

        if (
          typeof nextEntity?.pageid === 'undefined' &&
          typeof nextEntity?.revid !== 'undefined'
        ) {
          await dispatch(contentActions.fetchContent(nextEntity.revid));
        }

        console.log(nextEntity?.pageid);
      }
    }

    // console.log(currentEntityIdIndex, nextEntityIdIndex, getState());
  };
}

export default {
  fetchDiffContent,
};
