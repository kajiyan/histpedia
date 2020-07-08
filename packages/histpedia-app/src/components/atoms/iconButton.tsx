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
      <span className="ib-Label">{children}</span>
      {/* TODO: アイコンの種類が増えたら拡張する */}
      <svg
        className="ib-Icon"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
      >
        <path d="M20.52,17.91a1.25,1.25,0,0,1,0,1.74l-.87.87a1.23,1.23,0,0,1-1.74,0L14,16.61l-3.91,3.91a1.23,1.23,0,0,1-1.74,0l-.86-.87a1.21,1.21,0,0,1,0-1.74L11.39,14l-3.9-3.91a1.21,1.21,0,0,1,0-1.74l.86-.87a1.23,1.23,0,0,1,1.74,0L14,11.39l3.91-3.91a1.23,1.23,0,0,1,1.74,0l.87.87a1.25,1.25,0,0,1,0,1.74L16.61,14Z" />
      </svg>
    </button>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  border-radius: 50%;
  width: 28px;
  height: 28px;
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

  .ib-Label {
    border: 0;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    position: absolute;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }

  .ib-Icon {
    max-width: 100%;
    width: 100%;
    max-height: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

// Container ------------------------------------------
const IconButton: React.FC<ContainerProps> = ({
  children,
  classes,
  onClick,
  type = 'button',
}: ContainerProps) => {
  // console.log('[IconButton] render');

  return (
    <StyledComponent classes={classes} type={type} onClick={onClick}>
      {children}
    </StyledComponent>
  );
};

export default IconButton;
