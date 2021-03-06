import { combineReducers } from 'redux';
import * as history from './history';

export type Injects = {
  history?: history.Injects;
};

export function initialState(
  injects: Injects = {}
): {
  history: ReturnType<typeof history.initialState>;
} {
  return {
    history: history.initialState(injects.history),
  };
}

export const reducers = combineReducers({
  history: history.reducer,
});
