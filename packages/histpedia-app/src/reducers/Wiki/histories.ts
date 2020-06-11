import * as Immutable from 'immutable';
import types from '../../actions/Wiki/types';

export type Injects = {
  /*
   * -1  該当記事なし
   * >=0 該当記事のID
   */
  pageid: number | undefined;
  entityIds: Immutable.List<string>;
  initialized: boolean;
};

export function initialState(
  injects: Injects = {
    pageid: undefined,
    entityIds: Immutable.List<string>(),
    initialized: false,
  }
): Immutable.Record<Injects> & Readonly<Injects> {
  return Immutable.Record(injects)();
}

export function reducer(
  state = initialState(),
  action: Actions
): ReturnType<typeof initialState> {
  switch (action.type) {
    case types.asyncFetchPageIdStarted: {
      return state.withMutations((mutable) => {
        mutable.set('pageid', undefined).set('initialized', true);
        return mutable;
      });
    }
    case types.asyncFetchPageIdDone: {
      const { pageid } = action.payload;

      return state.withMutations((mutable) => {
        mutable.set('pageid', pageid);
        return mutable;
      });
    }
    case types.asyncFetchPageIdFailed: {
      return state.withMutations((mutable) => {
        mutable.set('pageid', undefined);
        return mutable;
      });
    }
    case types.asyncFetchRevisionsStarted: {
      return state.withMutations((mutable) => {
        mutable.set('entityIds', mutable.entityIds.clear());
        return mutable;
      });
    }
    case types.asyncFetchRevisionsDone: {
      const { result } = action.payload;

      return state.withMutations((mutable) => {
        mutable.update('entityIds', (entityIds) => entityIds.concat(result));
        return mutable;
      });
    }
    case types.asyncFetchRevisionsFailed: {
      return state.withMutations((mutable) => {
        mutable.set('entityIds', mutable.entityIds.clear());
        return mutable;
      });
    }
    default: {
      return state;
    }
  }
}
