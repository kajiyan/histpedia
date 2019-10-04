import { applyMiddleware, createStore, DeepPartial } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers';

const reducer = createRootReducer();
const enhancer = applyMiddleware(thunk);

function configureStore(preloadedState?: DeepPartial<AppReducersMapObject>) {
  return createStore(reducer, preloadedState, enhancer);
}

export default { configureStore };
