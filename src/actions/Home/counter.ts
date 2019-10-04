import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import {
  ACTION_CREATOR_FACTORY_PREFIX,
  ASYNC_INCREMENT_COUNTER,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER
} from '../../constants/Home';

const actionCreator = actionCreatorFactory(ACTION_CREATOR_FACTORY_PREFIX);
const asyncActionCreator = asyncFactory<AppReducersMapObject>(actionCreator);
export const incrementHappened = actionCreator<HomeState>(INCREMENT_COUNTER);
export const decrementHappened = actionCreator<HomeState>(DECREMENT_COUNTER);

export function increment(count: number = 0) {
  const action = incrementHappened({ count: count + 1 });
  return action;
}

export function decrement(count: number = 0) {
  const action = decrementHappened({ count: count - 1 });
  return action;
}

export const incrementAsync = asyncActionCreator<number, HomeState>(
  ASYNC_INCREMENT_COUNTER,
  async (delay, dispatch, getState) => {
    const timeout = () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, delay);
      });

    await timeout();

    dispatch(increment(getState().home.count));

    return getState().home;
  }
);

export function incrementIfOdd() {
  return (dispatch: Dispatch, getState: () => HomeState) => {
    const { count } = getState();

    if (count % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export default {
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync: incrementAsync.action
};
