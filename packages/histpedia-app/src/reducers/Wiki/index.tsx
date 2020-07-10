import { combineReducers } from 'redux';
import * as entities from './entities';
import * as histories from './histories';

type Injects = {
  entities?: entities.Injects;
  histories?: histories.Injects;
};

export function initialState(
  injects: Injects = {}
): {
  entities: ReturnType<typeof entities.initialState>;
  histories: ReturnType<typeof histories.initialState>;
} {
  return {
    entities: entities.initialState(injects.entities),
    histories: histories.initialState(injects.histories),
  };
}

export const reducers = combineReducers({
  entities: entities.reducers,
  histories: histories.reducer,
});
