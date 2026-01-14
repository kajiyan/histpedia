import { configureStore, Middleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { createLogger } from 'redux-logger';
import { createRootReducer, initialState } from '../reducers';

// Root reducer
const rootReducer = createRootReducer();

// State types
export type StoreState = ReturnType<typeof initialState>;
export type RootState = StoreState;

// Create store factory for next-redux-wrapper
const makeStore = () => {
  const middleware: Middleware[] = [];

  // Development-only middleware
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    const logger = createLogger({
      collapsed: true,
      diff: true,
      level: 'info',
    });
    middleware.push(logger);
  }

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // Disable serializable check for Immutable.js
        serializableCheck: false,
        // Disable immutable check since we use Immutable.js
        immutableCheck: false,
      }).concat(middleware),
    preloadedState: initialState(),
    devTools: process.env.NODE_ENV !== 'production',
  });

  return store;
};

// Store types
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

// next-redux-wrapper
export const reduxWrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});

// Legacy export for compatibility
export const configureStoreExport = { configureStore: makeStore };
export { configureStoreExport as configureStore };
