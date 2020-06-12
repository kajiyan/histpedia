import styled from '@emotion/styled';
import React from 'react';
import { List } from 'immutable';
import Scrubber from '../atoms/scrubber';

/* types */
type ContainerProps = {
  entityIds: List<string>;
};
type Props = {
  className?: string;
  max: number;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ className, max }: Props) => {
  return (
    <div className={className}>
      <div>seekbar</div>
      <Scrubber max={max} name="progress" />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const Seekbar: React.FC<ContainerProps> = ({ entityIds }: ContainerProps) => {
  const max = entityIds.size;

  return <StyledComponent entityIds={entityIds} max={max} />;
};

export default Seekbar;
