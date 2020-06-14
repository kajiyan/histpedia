import * as Immutable from 'immutable';
import types from '../../actions/Wiki/types';

export type Injects = {
  /*
   * pageid 記事IDの数値 -1 であれば該当記事なし >=0 であれば該当記事のID
   * fetchingDiffContent リビジョン同士の差分を比較中かの真偽値
   */
  currentEntityIdIndex: number;
  currentTitle: string | undefined;
  entityIds: Immutable.List<string>;
  fetchingDiffContent: boolean;
  pageid: number | undefined;
  paused: boolean;
  viewEntityIdIndex: number;
};

export function initialState(
  injects: Injects = {
    currentEntityIdIndex: 0,
    currentTitle: undefined,
    entityIds: Immutable.List<string>(),
    fetchingDiffContent: false,
    pageid: undefined,
    paused: false,
    viewEntityIdIndex: 0,
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
      const { currentTitle } = action.payload;

      return state.withMutations((mutable) => {
        mutable
          .set('currentTitle', currentTitle)
          .set('entityIds', mutable.entityIds.clear())
          .set('pageid', undefined);
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
        mutable
          .set('entityIds', mutable.entityIds.clear())
          .set('pageid', undefined);
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
    // 読み込むリビジョンのインデックスが変わった時
    case types.updateCurrentEntityIdIndex: {
      return state.withMutations((mutable) => {
        const { index } = action.payload;

        mutable.set('currentEntityIdIndex', index);
        return mutable;
      });
    }
    // 停止状態が変更された時
    case types.updatePaused: {
      return state.withMutations((mutable) => {
        const { paused } = action.payload;

        mutable.set('paused', paused);
        return mutable;
      });
    }
    // リビジョン同士の差分を比較開始
    case types.asyncFetchDiffContentStarted: {
      return state.withMutations((mutable) => {
        const { fetching } = action.payload;

        mutable.set('fetchingDiffContent', fetching);
        return mutable;
      });
    }
    // リビジョン同士の差分の比較をして終了
    case types.asyncFetchDiffContentDone: {
      return state.withMutations((mutable) => {
        const { fetching, viewEntityIdIndex } = action.payload;

        mutable.set('fetchingDiffContent', fetching);
        mutable.set('viewEntityIdIndex', viewEntityIdIndex);
        return mutable;
      });
    }
    // リビジョン同士の差分の比較をできずに終了
    case types.asyncFetchDiffContentFailed: {
      return state.withMutations((mutable) => {
        const { fetching } = action.payload;

        mutable.set('fetchingDiffContent', fetching);
        return mutable;
      });
    }
    default: {
      return state;
    }
  }
}
