import { applyMiddleware, createStore, CombinedState, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createRootReducer, initialState } from '../reducers';

export type StoreState = ReturnType<typeof initialState>;

const rootReducer = createRootReducer();
const middleware = [thunkMiddleware];
const enhancer = applyMiddleware(...middleware);

function configureStore(
  preloadedState = initialState()
): Store<CombinedState<StoreState>, Actions> & {
  dispatch: unknown;
} {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default { configureStore };
