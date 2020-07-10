import styled from '@emotion/styled';
import React from 'react';
import classNames from 'classnames';

/* types */
type ContainerProps = {
  children: React.ReactNode;
  classes?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label: string;
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
  label,
  onClick,
  type,
}: Props) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      aria-label={label}
      className={classNames(className, classes)}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  border-radius: 50%;
  color: #000;
  position: relative;
  transition: color 0.25s ease, background-color 0.25s ease,
    border-color 0.25s ease, box-shadow 0.25s ease;

  &::before {
    content: '';
    display: block;
    width: 100%;
    padding: 100% 0 0;
    position: relative;
  }

  &:focus {
    color: #fff;
    background-color: #000;
    box-shadow: inset 0 0 0 1px #000, inset 0 0 0 2px #fff;
    outline: 0;
  }

  &:hover {
    color: #fff;
    background-color: #000;
    border-color: #000;
  }
`;

// Container ------------------------------------------
const IconButton: React.FC<ContainerProps> = ({
  children,
  classes,
  label,
  onClick,
  type = 'button',
}: ContainerProps) => {
  // console.log('[IconButton] render');

  return (
    <StyledComponent
      classes={classes}
      label={label}
      type={type}
      onClick={onClick}
    >
      {children}
    </StyledComponent>
  );
};

export default IconButton;
