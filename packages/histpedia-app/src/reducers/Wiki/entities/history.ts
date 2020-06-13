import * as Immutable from 'immutable';
import types from '../../../actions/Wiki/types';
import History from '../models/History';

export type Injects = Immutable.Map<string, History>;

export function initialState(
  injects: Injects = Immutable.Map<string, History>()
): Injects {
  return injects;
}

export function reducer(
  state = initialState(),
  action: Actions
): ReturnType<typeof initialState> {
  switch (action.type) {
    case types.asyncFetchRevisionsDone: {
      const { result, entities } = action.payload;

      return result.reduce((accumulator, entityId) => {
        const { revid } = entities.revisions[entityId];
        return accumulator.update(entityId, new History(), (history) => {
          return history.merge({ revid });
        });
      }, state);
    }
    case types.asyncFetchContentDone: {
      const { result, entities } = action.payload;

      return result.reduce((accumulator, entityId) => {
        const entity = entities.content[entityId];
        return accumulator.update(entityId, new History(), (history) => {
          return history.merge(entity);
        });
      }, state);
    }
    // リビジョン同士の差分の比較をして終了
    case types.asyncFetchDiffContentDone: {
      const { diffHTML, entityId } = action.payload;

      return state.update(entityId, (history) => history.merge({ diffHTML }));
    }
    default: {
      return state;
    }
  }
}
