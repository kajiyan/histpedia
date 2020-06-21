import styled from '@emotion/styled';
import React, { useState } from 'react';
import classNames from 'classnames';

/* types */
type ContainerProps = {
  children: React.ReactNode;
  classes?: string;
  onToggle?: (toggle: boolean) => void;
  initialValue?: boolean;
};

type Props = {
  className?: string;
  onClick: () => void;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  children,
  classes,
  className,
  onClick,
}: Props) => {
  return (
    <button
      className={classNames(className, classes)}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const ToggleButton: React.FC<ContainerProps> = ({
  children,
  classes,
  onToggle = function noop() {},
  initialValue = false,
}: ContainerProps) => {
  const [value, setValue] = useState(initialValue);

  console.log('[ToggleButton] render', value);

  const onClick = () => {
    const nextValue = !value;

    setValue(nextValue);
    onToggle(nextValue);
  };

  return (
    <StyledComponent classes={classes} onClick={onClick}>
      {children}
    </StyledComponent>
  );
};

export default ToggleButton;
