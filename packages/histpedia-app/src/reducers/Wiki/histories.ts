import * as Immutable from 'immutable';
import types from '../../actions/Wiki/types';

export type Injects = {
  /*
   * -1  該当記事なし
   * >=0 該当記事のID
   */
  pageid?: number;
  initialized?: boolean;
};

export function initialState(
  injects?: Injects
): Immutable.Record<Injects> & Readonly<Injects> {
  return Immutable.Record({
    pageid: undefined,
    initialized: false,
    ...injects,
  })();
}

export function reducer(
  state = initialState(),
  action: Actions
): ReturnType<typeof initialState> {
  switch (action.type) {
    case types.asyncFetchPageIdStarted: {
      return state.withMutations((mutable) => {
        mutable.set('pageid', undefined);
        mutable.set('initialized', true);
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
    default: {
      return state;
    }
  }
}
