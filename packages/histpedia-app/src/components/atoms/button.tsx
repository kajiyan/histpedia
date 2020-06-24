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
const StyledComponent = styled(Component)`
  background-color: #000;
  border: solid 1px #000;
  border-radius: 2px 0 0 2px;
  color: #fff;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  padding: 0.8em 1.2em;
  line-height: 1.6;
  width: 100%;
  transition: background-color 0.25s ease, color 0.25s ease,
    border-color 0.25s ease, box-shadow 0.25s ease;

  &:focus {
    box-shadow: inset 0 0 0 1px #000, inset 0 0 0 2px #fff;
    outline: 0;
  }

  &:hover {
    background-color: #484848;
    border-color: #484848;
  }
`;

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
