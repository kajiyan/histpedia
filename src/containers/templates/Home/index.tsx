import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Home from '../../../components/templates/Home';
import CounterActions from '../../../actions/Home/counter';

function mapStateToProps(state: AppReducersMapObject) {
  return {
    count: state.home.count
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
