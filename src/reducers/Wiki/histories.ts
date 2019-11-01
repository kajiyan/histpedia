import * as Immutable from 'Immutable';
import types from '../../actions/Wiki/types';

export type Injects = {
  currentRevisionIndex?: number;
  entityIds?: Immutable.List<string>;
  prevRevisionIndex?: number;
};

export function initialState(injects?: Injects) {
  return Immutable.Record({
    currentRevisionIndex: 0,
    entityIds: Immutable.List<string>(),
    prevRevisionIndex: 0,
    ...injects
  })();
}

export function reducer(state = initialState(), action: Actions) {
  switch (action.type) {
    case types.asyncFetchRevisionsStarted:
      console.log(state);

      return state.withMutations(mutable => {
        mutable.set('currentRevisionIndex', 0);
        mutable.set('prevRevisionIndex', 0);
        mutable.entityIds.clear();
        return mutable;
      });
    case types.asyncFetchRevisionsDone:
      const { result } = action.payload;

      return state.withMutations(mutable => {
        mutable.set('currentRevisionIndex', 0);
        mutable.set('prevRevisionIndex', 0);
        mutable.update('entityIds', entityIds => entityIds.concat(result));
        return mutable;
      });
    case types.asyncFetchRevisionsFailed:
      return state.withMutations(mutable => {
        mutable.set('currentRevisionIndex', 0);
        mutable.set('prevRevisionIndex', 0);
        mutable.entityIds.clear();
        return mutable;
      });
    default:
      return state;
  }
}
