import styled from '@emotion/styled';
import React from 'react';
import Link from 'next/link';
import { shallowEqual, useSelector } from 'react-redux';
import { List } from 'immutable';
import classNames from 'classnames';
import Logo from '../../atoms/logo';
import Timestamp from '../../atoms/wiki/timestamp';
import Container from '../../molecules/container';
import History from '../../../reducers/Wiki/models/History';
import { StoreState } from '../../../store/index';

/* types */
type ContainerProps = {
  entityIds?: List<string>;
  classes?: string;
};

type Props = {
  className?: string;
  entity?: History;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ classes, className, entity }: Props) => {
  return (
    <header className={classNames(className, classes, 'wiki-Header')}>
      <Container>
        <div className="wiki-Header_Inner">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
          <Timestamp timestamp={entity?.timestamp} />
        </div>
      </Container>
    </header>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  background-color: #fff;
  border-bottom: solid 1px #000;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  .wiki-Header_Inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

// Container ------------------------------------------
const Header: React.FC<ContainerProps> = ({
  classes,
  entityIds = List<string>(),
}: ContainerProps) => {
  // console.log('[Header] render');

  const { entity } = useSelector((state: StoreState) => {
    const { entities, histories } = state.wiki;
    const entityId = entityIds.get(histories.viewEntityIdIndex);

    if (entityId) {
      return {
        entity: entities.history.get(entityId),
      };
    }

    return {
      entity: undefined,
    };
  }, shallowEqual);

  console.log(entity?.toJS());

  return <StyledComponent classes={classes} entity={entity} />;
};

export default Header;
