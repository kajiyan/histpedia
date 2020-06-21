import styled from '@emotion/styled';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { List } from 'immutable';
import History from '../../reducers/Wiki/models/History';
import WikiBook from '../molecules/wikiBook';
import Container from '../molecules/container';
import { StoreState } from '../../store/index';

/* types */
type ContainerProps = {
  entityIds: List<string>;
};

type Props = {
  className?: string;
  diff: boolean;
  entity?: History;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ className, diff, entity }: Props) => {
  return (
    <div className={className}>
      <Container>
        <WikiBook diff={diff} entity={entity} />
      </Container>
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  padding: 72px 0;
`;

// Container ------------------------------------------
const Player: React.FC<ContainerProps> = ({ entityIds }: ContainerProps) => {
  console.log('[Player] render');

  // const dispatch = useDispatch();
  const { diff, entity } = useSelector((state: StoreState) => {
    const { entities, histories } = state.wiki;
    const entityId = entityIds.get(histories.viewEntityIdIndex);

    if (entityId) {
      return {
        diff: histories.diff,
        entity: entities.history.get(entityId),
      };
    }

    return {
      diff: histories.diff,
      entity: undefined,
    };
  }, shallowEqual);

  return <StyledComponent diff={diff} entity={entity} entityIds={entityIds} />;
};

export default Player;
