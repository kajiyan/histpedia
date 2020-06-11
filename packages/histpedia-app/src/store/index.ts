import { Store } from 'redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';
import { initialState } from '../reducers';

export type StoreState = ReturnType<typeof initialState>;
export type ReduxStore = Store<StoreState>;

const selectedConfigureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

export const { configureStore } = selectedConfigureStore;

export const reduxWrapper = createWrapper(
  configureStore as MakeStore<StoreState, Actions> & {
    dispatch: unknown;
  },
  {
    debug: !(process.env.NODE_ENV === 'production'),
  }
);
