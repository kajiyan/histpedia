import styled from '@emotion/styled';
import React from 'react';
import classNames from 'classnames';

/* types */
type ContainerProps = {
  children: React.ReactNode;
  classes?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: 'button' | 'reset' | 'submit';
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  children,
  classes,
  className,
  onClick,
  type,
}: Props) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={classNames(className, classes)}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const Button: React.FC<ContainerProps> = ({
  children,
  classes,
  onClick,
  type = 'button',
}: ContainerProps) => {
  console.log('[SearchField] Button');
  return (
    <StyledComponent classes={classes} type={type} onClick={onClick}>
      {children}
    </StyledComponent>
  );
};

export default Button;
