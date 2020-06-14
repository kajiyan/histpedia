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

export function updatePaused(
  paused: boolean
): {
  type: typeof types.updatePaused;
  payload: {
    paused: boolean;
  };
} {
  return {
    type: types.updatePaused,
    payload: { paused },
  };
}

export default {
  updateCurrentEntityIdIndex,
  updatePaused,
};
