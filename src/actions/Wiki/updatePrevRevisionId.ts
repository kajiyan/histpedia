import types from './types';

export function updatePrevEntityId(entityId: string) {
  return {
    type: types.updatePrevEntityId,
    payload: { entityId }
  };
}

export default {
  updatePrevEntityId
};
