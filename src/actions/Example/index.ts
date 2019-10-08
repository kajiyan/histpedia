import { Dispatch } from 'redux';
import types from './types';

export function asyncIncrementStarted(dispatch: Dispatch) {
  dispatch({
    type: types.asyncIncrementStarted
  });

  return {
    type: types.asyncIncrementStarted
  };
}

export function asyncIncrementDone(dispatch: Dispatch) {
  dispatch({
    type: types.asyncIncrementDone
  });

  return {
    type: types.asyncIncrementDone
  };
}

export function asyncIncrementFailed(dispatch: Dispatch) {
  dispatch({
    type: types.asyncIncrementFailed
  });

  return {
    type: types.asyncIncrementFailed
  };
}

function asyncIncrement() {
  return async (dispatch: Dispatch) => {
    const delay = (ms: number) =>
      new Promise(resolve => {
        setTimeout(resolve, ms);
      });

    asyncIncrementStarted(dispatch);

    await delay(4000);

    asyncIncrementDone(dispatch);
  };
}

export function increment() {
  return { type: types.increment };
}

export function decrement() {
  return { type: types.decrement };
}

export function updateCount(amount: number) {
  return {
    type: types.updateCount,
    payload: { amount }
  };
}

export default {
  asyncIncrement,
  increment,
  decrement,
  updateCount
};
