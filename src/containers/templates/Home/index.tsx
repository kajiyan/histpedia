import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Home from '../../../components/templates/Home';
import ExampleActions from '../../../actions/Example';
import { StoreState } from '../../../store/configureStore';

function mapStateToProps(state: StoreState) {
  return {
    count: state.example.count
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ExampleActions, dispatch);
}

export type Props =
  ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
