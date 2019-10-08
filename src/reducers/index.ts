import { combineReducers } from 'redux';
import * as Example from './Example';

export function initialState() {
  return {
    example: Example.initialState(),
  };
}

export function createRootReducer() {
  return combineReducers({
    example: Example.reducer,
  });
}
