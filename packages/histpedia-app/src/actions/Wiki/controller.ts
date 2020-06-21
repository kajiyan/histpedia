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

export function updateDiff(
  diff: boolean
): {
  type: typeof types.updateDiff;
  payload: {
    diff: boolean;
    paused: boolean;
  };
} {
  return {
    type: types.updateDiff,
    payload: {
      diff,
      paused: true,
    },
  };
}

export function updatePaused(
  paused: boolean
): {
  type: typeof types.updatePaused;
  payload: {
    diff: boolean;
    paused: boolean;
  };
} {
  return {
    type: types.updatePaused,
    payload: {
      diff: false,
      paused,
    },
  };
}

export default {
  updateCurrentEntityIdIndex,
  updateDiff,
  updatePaused,
};
