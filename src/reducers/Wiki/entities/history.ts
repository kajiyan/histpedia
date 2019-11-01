import * as Immutable from 'Immutable';
import types from '../../../actions/Wiki/types';
import History from '../models/History';

export type Injects = Immutable.Map<string, History>;

export function initialState(injects?: Injects) {
  return injects ? injects : Immutable.Map<string, History>();
}

export function reducer(state = initialState(), action: Actions) {
  switch (action.type) {
    case types.asyncFetchContentDone:
      const { result, entities } = action.payload;

      return result.reduce((accumulator, entityId) => {
        const entity = entities.content[entityId];
        return accumulator.update(entityId, new History(), history => {
          return history.merge(entity);
        });
      }, state);
    default:
      return state;
  }
}
