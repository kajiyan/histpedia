import {
  applyMiddleware,
  createStore,
  CombinedState,
  Middleware,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createRootReducer, initialState } from '../reducers';

export type StoreState = ReturnType<typeof initialState>;

const rootReducer = createRootReducer();

function configureStore(
  preloadedState = initialState()
): Store<CombinedState<StoreState>, Actions> & {
  dispatch: unknown;
} {
  const middleware: Middleware[] = [thunkMiddleware];

  // Logging Middleware
  const logger = createLogger({
    collapsed: true,
    diff: true,
    level: 'info',
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Create Store
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      () => store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}

export default { configureStore };
