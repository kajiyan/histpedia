import styled from '@emotion/styled';
import React from 'react';
import { List } from 'immutable';
import Seekbar from '../molecules/seekbar';

// Todo 進捗を拾う

/* types */
type ContainerProps = {
  entityIds: List<string>;
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ className, entityIds }: Props) => {
  return (
    <div className={className}>
      Controller
      <Seekbar entityIds={entityIds} />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const Controller: React.FC<ContainerProps> = ({
  entityIds,
}: ContainerProps) => {
  return <StyledComponent entityIds={entityIds} />;
};

export default Controller;
