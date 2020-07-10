import styled from '@emotion/styled';
import React from 'react';
import classNames from 'classnames';
import Circular from '../atoms/circular';

/* types */
type ContainerProps = {
  classes?: string;
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ classes, className }: Props) => {
  return (
    <div className={classNames(className, classes)}>
      <Circular />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
`;

// Container ------------------------------------------
const CircularProgressCover: React.FC<ContainerProps> = ({
  classes,
}: ContainerProps) => {
  // console.log('[CircularProgressCover] render');
  return <StyledComponent classes={classes} />;
};

export default CircularProgressCover;
