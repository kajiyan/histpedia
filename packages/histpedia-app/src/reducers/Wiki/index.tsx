import { combineReducers } from 'redux';
import * as histories from './histories';

type Injects = {
  histories?: histories.Injects;
};

export function initialState(
  injects: Injects = {}
): {
  histories: ReturnType<typeof histories.initialState>;
} {
  return {
    histories: histories.initialState(injects.histories),
  };
}

export const reducers = combineReducers({
  histories: histories.reducer,
});
