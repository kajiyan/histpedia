import { combineReducers } from 'redux';
import home from './home';

export default function createRootReducer() {
  return combineReducers({
    home,
  });
}
