import * as Immutable from 'immutable';
import types from '../../actions/Wiki/types';

export type Injects = {
  /*
   * pageid 記事IDの数値 -1 であれば該当記事なし >=0 であれば該当記事のID
   * fetchingDiffContent リビジョン同士の差分を比較中かの真偽値
   */
  currentEntityIdIndex: number;
  currentTitle?: string; // 検索に使用された文字列
  diff: boolean;
  entityIds: Immutable.List<string>;
  fetchingDiffContent: boolean;
  pageid?: number;
  paused: boolean;
  stylesheets: Immutable.List<string>;
  title?: string; // データの取得に使用された文字列、例えば「猫」で検索すると「ネコ」にリダイレクトされる
  viewEntityIdIndex: number;
};

const defaultState: Injects = {
  currentEntityIdIndex: 0,
  currentTitle: undefined,
  diff: false,
  entityIds: Immutable.List<string>(),
  fetchingDiffContent: false,
  pageid: undefined,
  paused: false,
  stylesheets: Immutable.List<string>(),
  title: undefined,
  viewEntityIdIndex: 0,
};

export function initialState(
  injects: Partial<Injects> = {}
): Immutable.Record<Injects> & Readonly<Injects> {
  return Immutable.Record({ ...defaultState, ...injects })();
}

export function reducer(
  state = initialState(),
  action: Actions
): ReturnType<typeof initialState> {
  switch (action.type) {
    // PageID の取得開始
    case types.asyncFetchPageIdStarted: {
      return state.withMutations((mutable) => {
        mutable.merge({
          currentEntityIdIndex: defaultState.currentEntityIdIndex,
          diff: defaultState.diff,
          entityIds: defaultState.entityIds,
          fetchingDiffContent: defaultState.fetchingDiffContent,
          paused: defaultState.paused,
          stylesheets: defaultState.stylesheets,
          viewEntityIdIndex: defaultState.viewEntityIdIndex,
        });
        return mutable;
      });
    }
    // PageID の取得成功
    case types.asyncFetchPageIdDone: {
      const { currentTitle, pageid, title } = action.payload;

      return state.withMutations((mutable) => {
        mutable.merge({
          currentTitle,
          pageid,
          title,
        });
        return mutable;
      });
    }
    // PageID の取得失敗
    case types.asyncFetchPageIdFailed: {
      return state.withMutations((mutable) => {
        mutable.merge(defaultState);
        return mutable;
      });
    }
    // スタイルシートの取得開始
    case types.asyncFetchStyleSheetStarted: {
      return state.withMutations((mutable) => {
        mutable.set('stylesheets', mutable.stylesheets.clear());
        return mutable;
      });
    }
    // スタイルシートの取得完了
    case types.asyncFetchStyleSheetDone: {
      return state.withMutations((mutable) => {
        mutable.update('stylesheets', (stylesheets) =>
          stylesheets.concat(action.payload.stylesheets)
        );
        return mutable;
      });
    }
    // スタイルシートの取得失敗
    case types.asyncFetchStyleSheetFailed: {
      return state.withMutations((mutable) => {
        mutable.update('stylesheets', (stylesheets) =>
          stylesheets.concat(action.payload.stylesheets)
        );
        return mutable;
      });
    }
    // リビジョンの取得開始
    case types.asyncFetchRevisionsStarted: {
      return state.withMutations((mutable) => {
        mutable.set('entityIds', mutable.entityIds.clear());
        return mutable;
      });
    }
    // リビジョンの取得完了
    case types.asyncFetchRevisionsDone: {
      const { result } = action.payload;

      return state.withMutations((mutable) => {
        mutable.update('entityIds', (entityIds) => entityIds.concat(result));
        return mutable;
      });
    }
    // リビジョンの取得失敗
    case types.asyncFetchRevisionsFailed: {
      return state.withMutations((mutable) => {
        mutable.set('entityIds', mutable.entityIds.clear());
        return mutable;
      });
    }
    // 読み込むリビジョンのインデックスが変わった時
    case types.updateCurrentEntityIdIndex: {
      const { index } = action.payload;

      return state.withMutations((mutable) => {
        mutable.set('currentEntityIdIndex', index);
        return mutable;
      });
    }
    // 停止状態が変更された時
    case types.updatePaused: {
      const { diff, paused } = action.payload;

      return state.withMutations((mutable) => {
        mutable.merge({
          diff,
          paused,
        });
        return mutable;
      });
    }
    // 差分の表示状態が変更された時
    case types.updateDiff: {
      const { diff, paused } = action.payload;

      return state.withMutations((mutable) => {
        mutable.merge({
          diff,
          paused,
        });
        return mutable;
      });
    }
    // リビジョン同士の差分を比較開始
    case types.asyncFetchDiffContentStarted: {
      const { fetching } = action.payload;

      return state.withMutations((mutable) => {
        mutable.set('fetchingDiffContent', fetching);
        return mutable;
      });
    }
    // リビジョン同士の差分の比較をして終了
    case types.asyncFetchDiffContentDone: {
      const { fetching, viewEntityIdIndex } = action.payload;

      return state.withMutations((mutable) => {
        mutable.set('fetchingDiffContent', fetching);
        mutable.set('viewEntityIdIndex', viewEntityIdIndex);
        return mutable;
      });
    }
    // リビジョン同士の差分の比較をできずに終了
    case types.asyncFetchDiffContentFailed: {
      const { fetching } = action.payload;

      return state.withMutations((mutable) => {
        mutable.set('fetchingDiffContent', fetching);
        return mutable;
      });
    }
    default: {
      return state;
    }
  }
}
