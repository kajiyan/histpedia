import styled from '@emotion/styled';
import React from 'react';
import classNames from 'classnames';

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
    <svg
      className={classNames(className, classes)}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
    >
      <path d="M20.52,17.91a1.25,1.25,0,0,1,0,1.74l-.87.87a1.23,1.23,0,0,1-1.74,0L14,16.61l-3.91,3.91a1.23,1.23,0,0,1-1.74,0l-.86-.87a1.21,1.21,0,0,1,0-1.74L11.39,14l-3.9-3.91a1.21,1.21,0,0,1,0-1.74l.86-.87a1.23,1.23,0,0,1,1.74,0L14,11.39l3.91-3.91a1.23,1.23,0,0,1,1.74,0l.87.87a1.25,1.25,0,0,1,0,1.74L16.61,14Z" />
    </svg>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  max-width: 100%;
  width: 100%;
  max-height: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

// Container ------------------------------------------
const CloseIcon: React.FC<ContainerProps> = ({ classes }: ContainerProps) => {
  return <StyledComponent classes={classes} />;
};

export default CloseIcon;
