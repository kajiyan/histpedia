import types from './types';

export function updateCurrentEntityId(entityId: string) {
  return {
    type: types.updateCurrentEntityId,
    payload: { entityId }
  };
}

export default {
  updateCurrentEntityId
};
