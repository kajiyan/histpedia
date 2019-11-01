import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createRootReducer, initialState } from '../reducers';

const reducer = createRootReducer();
const enhancer = applyMiddleware(thunk);

function configureStore(preloadedState = initialState()) {
  return createStore(reducer, preloadedState, enhancer);
}

export default { configureStore };
