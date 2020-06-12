import types from './types';

export function updateCurrentEntityIdIndex(
  index: number
): {
  type: typeof types.updateCurrentEntityIdIndex;
  payload: {
    index: number;
  };
} {
  return {
    type: types.updateCurrentEntityIdIndex,
    payload: { index },
  };
}

export default {
  updateCurrentEntityIdIndex,
};
