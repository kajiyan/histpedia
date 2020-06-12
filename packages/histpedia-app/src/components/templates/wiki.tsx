import styled from '@emotion/styled';
import React from 'react';
import { List } from 'immutable';
import Controller from '../organisms/controller';

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
      <h1>Template</h1>
      <Controller entityIds={entityIds} />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const Wiki: React.FC<ContainerProps> = ({ entityIds }: ContainerProps) => {
  return <StyledComponent entityIds={entityIds} />;
};

export default Wiki;
