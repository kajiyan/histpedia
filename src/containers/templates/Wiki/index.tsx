import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Wiki from '../../../components/templates/Wiki';
import fetchPageId from '../../../actions/Wiki/fetchPageId';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      ...fetchPageId
    },
    dispatch
  );
}

export type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wiki);
