import { CombinedState, combineReducers, Reducer } from 'redux';
import * as wiki from './Wiki';

/**
 * initialState
 * configureStoreを呼ぶ時の引数の初期値に使用する関数
 */
export function initialState(): {
  wiki: ReturnType<typeof wiki.initialState>;
} {
  return {
    wiki: wiki.initialState(),
  };
}

export function createRootReducer(): Reducer<
  CombinedState<{
    wiki: CombinedState<ReturnType<typeof wiki.initialState>>;
  }>,
  Actions
> {
  return combineReducers({
    wiki: wiki.reducers,
  });
}
