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
            <a className="wiki-Header_Link">
              <Logo classes="wiki-Header_heading" />
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
  z-index: 2;

  .wiki-Header_Inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .wiki-Header_Link {
    display: block;
    color: #000;
    width: ${(188 / 1136) * 100}%;
    min-width: 94px;
    padding: 10px 0;

    svg {
      transition: color 0.25s ease;
    }

    &:hover {
      color: #484848;
    }
  }

  .wiki-Header_heading {
    /* wikipedia のスタイルを上書き */
    border-bottom: none;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 0;
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

  return <StyledComponent classes={classes} entity={entity} />;
};

export default Header;
