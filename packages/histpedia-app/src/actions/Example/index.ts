import { Dispatch } from 'redux';
import types from './types';

export function asyncIncrementStarted(
  dispatch: Dispatch
): {
  type: typeof types.asyncIncrementStarted;
} {
  dispatch({
    type: types.asyncIncrementStarted,
  });

  return {
    type: types.asyncIncrementStarted,
  };
}

export function asyncIncrementDone(
  dispatch: Dispatch
): {
  type: typeof types.asyncIncrementDone;
} {
  dispatch({
    type: types.asyncIncrementDone,
  });

  return {
    type: types.asyncIncrementDone,
  };
}

export function asyncIncrementFailed(
  dispatch: Dispatch
): {
  type: typeof types.asyncIncrementFailed;
} {
  dispatch({
    type: types.asyncIncrementFailed,
  });

  return {
    type: types.asyncIncrementFailed,
  };
}

function asyncIncrement(): (dispatch: Dispatch<Actions>) => Promise<void> {
  return async (dispatch: Dispatch) => {
    const delay = (ms: number) =>
      new Promise((resolve) => {
        setTimeout(resolve, ms);
      });

    asyncIncrementStarted(dispatch);

    await delay(4000);

    asyncIncrementDone(dispatch);
  };
}

export function increment(): {
  type: typeof types.increment;
} {
  return { type: types.increment };
}

export function decrement(): {
  type: typeof types.decrement;
} {
  return { type: types.decrement };
}

export function updateCount(
  amount: number
): {
  type: typeof types.updateCount;
  payload: {
    amount: number;
  };
} {
  return {
    type: types.updateCount,
    payload: { amount },
  };
}

export default {
  asyncIncrement,
  increment,
  decrement,
  updateCount,
};
