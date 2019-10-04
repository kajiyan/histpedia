import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../../actions/Home/counter';

const initialState: HomeState = {
  count: 0
};

export default reducerWithInitialState(initialState)
  .case(actions.incrementHappened, (state: HomeState, payload: HomeState) => {
    const nextState = Object.assign({}, state, { count: payload.count });
    return nextState;
  })
  .case(actions.decrementHappened, (state: HomeState, payload: HomeState) => {
    const nextState = Object.assign({}, state, { count: payload.count });
    return nextState;
  })
  .case(actions.incrementAsync.async.started, state => Object.assign({}, state))
  .case(actions.incrementAsync.async.failed, (state, { error }) => {
    console.log(error);
    return Object.assign({}, state);
  })
  .case(actions.incrementAsync.async.done, (state, { result }) => {
    console.log(result);
    return Object.assign({}, state);
  });
