import { CombinedState, combineReducers, Reducer } from 'redux';
import * as example from './Example';
import * as wiki from './Wiki';

/**
 * initialState
 * configureStoreを呼ぶ時の引数の初期値に使用する関数
 */
export function initialState(): {
  example: ReturnType<typeof example.initialState>;
  wiki: ReturnType<typeof wiki.initialState>;
} {
  return {
    example: example.initialState(),
    wiki: wiki.initialState(),
  };
}

export function createRootReducer(): Reducer<
  CombinedState<{
    example: ReturnType<typeof example.initialState>;
    wiki: CombinedState<ReturnType<typeof wiki.initialState>>;
  }>,
  Actions
> {
  return combineReducers({
    example: example.reducer,
    wiki: wiki.reducers,
  });
}
