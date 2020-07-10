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
      width="36"
      height="36"
      viewBox="0 0 36 36"
    >
      <path d="M25.12,23.76a3.46,3.46,0,0,1-6.91,0h0a4.65,4.65,0,0,1,.08-.75L14.61,20.7a3.45,3.45,0,1,1,0-5.4L18.29,13a3.67,3.67,0,0,1-.08-.75A3.45,3.45,0,1,1,19.51,15l-3.68,2.3a4.78,4.78,0,0,1,.08.75,4.78,4.78,0,0,1-.08.75l3.68,2.3a3.46,3.46,0,0,1,5.61,2.71Z" />
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
const ShareIcon: React.FC<ContainerProps> = ({ classes }: ContainerProps) => {
  return <StyledComponent classes={classes} />;
};

export default ShareIcon;
