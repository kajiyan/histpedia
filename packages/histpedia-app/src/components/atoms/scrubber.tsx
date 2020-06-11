import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

/* types */
type ContainerProps = {
  name: string;
};
type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = (props: Props) => {
  const { className } = props;
  return (
    <div className={className}>
      <input
        className="Wiki_Range"
        type="range"
        value="0"
        max="0"
        min="0"
        step="1"
        name="revisions"
      />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  box-sizing: border-box;
`;

// Container ------------------------------------------
const Scrubber: React.FC<ContainerProps> = ({ name }: ContainerProps) => {
  return <StyledComponent name={name} />;
};

export default Scrubber;
