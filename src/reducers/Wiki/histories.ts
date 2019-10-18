import * as Immutable from 'Immutable';
import types from '../../actions/Wiki/types';

export type Injects = {
  currentRevisionId?: Immutable.Set<string>;
  entityIds?: Immutable.OrderedSet<string>;
  prevRevisionId?: Immutable.Set<string>;
};

export function initialState(injects?: Injects) {
  return Immutable.Record({
    currentRevisionId: Immutable.Set<string>(),
    entityIds: Immutable.OrderedSet<string>(),
    prevRevisionId: Immutable.Set<string>(),
    ...injects
  })();
}

export function reducer(state = initialState(), action: Actions) {
  switch (action.type) {
    case types.asyncFetchRevisionsStarted:
      return state.update('entityIds', value => value.clear());
    case types.asyncFetchRevisionsDone:
      const { result } = action.payload;
      return state.update('entityIds', value => value.union(result));
    case types.asyncFetchRevisionsFailed:
      return state.update('entityIds', value => value.clear());
    default:
      return state;
  }
}
