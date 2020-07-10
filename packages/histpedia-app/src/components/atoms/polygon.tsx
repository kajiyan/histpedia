import styled from '@emotion/styled';
import React from 'react';
import classNames from 'classnames';

/* types */
type ContainerProps = {
  classes?: string;
  points: string;
  viewBoxWidth: number;
  viewBoxHeight: number;
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  classes,
  className,
  points,
  viewBoxWidth,
  viewBoxHeight,
}: Props) => {
  return (
    <svg
      className={classNames(className, classes)}
      preserveAspectRatio="none"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points={points} />
    </svg>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  display: block;
  width: 100%;
  height: 100%;
`;

// Container ------------------------------------------
const Polygon: React.FC<ContainerProps> = ({
  classes,
  points,
  viewBoxWidth,
  viewBoxHeight,
}: ContainerProps) => {
  // console.log('[Polygon] render');

  return (
    <StyledComponent
      classes={classes}
      points={points}
      viewBoxWidth={viewBoxWidth}
      viewBoxHeight={viewBoxHeight}
    />
  );
};

export default Polygon;
