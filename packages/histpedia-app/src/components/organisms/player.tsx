import styled from '@emotion/styled';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { List } from 'immutable';
import History from '../../reducers/Wiki/models/History';
import WikiBook from '../molecules/wikiBook';
import { StoreState } from '../../store/index';

/* types */
type ContainerProps = {
  entityIds: List<string>;
};

type Props = {
  className?: string;
  entity?: History;
  loading: boolean;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ className, entity, loading }: Props) => {
  if (
    typeof entity?.diffHTML !== 'undefined' &&
    typeof entity?.pageid !== 'undefined' &&
    typeof entity?.revid !== 'undefined' &&
    typeof entity?.text !== 'undefined' &&
    typeof entity?.title !== 'undefined'
  ) {
    return (
      <div className={className}>
        <WikiBook entity={entity as Required<History>} />
      </div>
    );
  }

  return <div className={className}>Player</div>;
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const Player: React.FC<ContainerProps> = ({ entityIds }: ContainerProps) => {
  console.log('[Player] render');

  // const dispatch = useDispatch();
  const { entity, fetchingDiffContent } = useSelector((state: StoreState) => {
    const { entities, histories } = state.wiki;
    const entityId = entityIds.get(histories.currentEntityIdIndex);

    if (entityId) {
      return {
        entity: entities.history.get(entityId),
        fetchingDiffContent: histories.fetchingDiffContent,
      };
    }

    return {
      entity: undefined,
      fetchingDiffContent: histories.fetchingDiffContent,
    };
  }, shallowEqual);

  return (
    <StyledComponent
      entity={entity}
      entityIds={entityIds}
      loading={fetchingDiffContent}
    />
  );
};

export default Player;
