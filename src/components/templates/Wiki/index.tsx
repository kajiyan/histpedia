import { Props } from '../../../containers/templates/Wiki';
import HistoryPaper from '../../atoms/HistoryPaper';

const defaultProps = {};

const Wiki = (props: Props) => {
  console.log(props);
  const currentEntityId = props.histories.entityIds.get(
    props.histories.currentRevisionIndex
  );
  const prevEntityId = props.histories.entityIds.get(
    props.histories.prevRevisionIndex
  );

  console.log(props.histories.entityIds);

  return (
    <div>
      <div>currentRevisionIndex: {props.histories.currentRevisionIndex}</div>
      <div>prevRevisionIndex: {props.histories.prevRevisionIndex}</div>
      {currentEntityId && (
        <HistoryPaper history={props.entities.history.get(currentEntityId)!} />
      )}
      {prevEntityId && (
        <HistoryPaper history={props.entities.history.get(prevEntityId)!} />
      )}
      <button>Fetch Page ID</button>
    </div>
  );
};

Wiki.defaultProps = defaultProps;

export default Wiki;
