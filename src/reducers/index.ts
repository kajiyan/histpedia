import { combineReducers } from 'redux';
import * as example from './Example';
import * as wiki from './Wiki';

/**
 * initialState
 * configureStoreを呼ぶ時の引数の初期値に使用する関数
 */
export function initialState() {
  return {
    example: example.initialState(),
    wiki: wiki.initialState()
  };
}

export function createRootReducer() {
  return combineReducers({
    example: example.reducer,
    wiki: wiki.reducers
  });
}
