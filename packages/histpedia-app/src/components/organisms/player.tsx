import styled from '@emotion/styled';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { List, is } from 'immutable';
import History from '../../reducers/Wiki/models/History';
import EndRoll from '../molecules/endroll';
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
  ended: boolean;
  entity?: History;
  userList: List<string | undefined>;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  className,
  diff,
  ended,
  entity,
  userList,
}: Props) => {
  return (
    <div className={className}>
      <Container>
        <WikiBook diff={diff} entity={entity} />
      </Container>
      <EndRoll editorList={userList} ended={ended} />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  padding: 72px 0;
`;

// Container ------------------------------------------
const Player: React.FC<ContainerProps> = ({ entityIds }: ContainerProps) => {
  // console.log('[Player] render');

  const { diff, ended } = useSelector((state: StoreState) => {
    const { entities, histories } = state.wiki;
    const entityId = entityIds.get(entityIds.size - 1);

    return {
      diff: histories.diff,
      ended:
        entityIds.size - 1 === histories.currentEntityIdIndex &&
        typeof entityId !== 'undefined' &&
        typeof entities.history.get(entityId)?.text !== 'undefined',
    };
  }, shallowEqual);

  const entity = useSelector(
    (state: StoreState) => {
      const { entities, histories } = state.wiki;
      const entityId = entityIds.get(histories.viewEntityIdIndex);

      if (entityId) {
        return entities.history.get(entityId);
      }

      return undefined;
    },
    (entityA, entityB) => {
      // console.log(is(entityA, entityB));
      return is(entityA, entityB);
    }
  );

  const userList = useSelector(
    (state: StoreState) => {
      const { entities, histories } = state.wiki;

      return histories.entityIds
        .map((entityId) => entities.history.get(entityId)?.user)
        .toSet()
        .toList();
    },
    (listA, listB) => {
      return is(listA, listB);
    }
  );

  return (
    <StyledComponent
      diff={diff}
      ended={ended}
      entity={entity}
      entityIds={entityIds}
      userList={userList}
    />
  );
};

export default Player;
