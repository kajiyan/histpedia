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
  value: boolean;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  children,
  classes,
  className,
  onClick,
  value,
}: Props) => {
  return (
    <button
      className={classNames(
        className,
        {
          'tglBtn-on': value,
          'tglBtn-off': !value,
        },
        classes
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  display: inline-block;
  border: solid 1px #000;
  border-radius: 2px 0 0 2px;
  font-size: 16px;
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  line-height: 1.6;
  width: 100%;
  padding: 0.8em 1.2em;
  transition: background-color 0.1s ease, color 0.1s ease;

  &:focus {
    box-shadow: inset 0 0 0 1px #000, inset 0 0 0 2px #fff;
    outline: 0;
  }

  &:hover,
  &.tglBtn-on {
    background-color: #000;
    color: #fff;
  }
`;

// Container ------------------------------------------
const ToggleButton: React.FC<ContainerProps> = ({
  children,
  classes,
  onToggle = function noop() {},
  initialValue = false,
}: ContainerProps) => {
  const [value, setValue] = useState(initialValue);

  // console.log('[ToggleButton] render', value);

  if (value !== initialValue) {
    setValue(initialValue);
  }

  const onClick = () => {
    const nextValue = !value;

    setValue(nextValue);
    onToggle(nextValue);
  };

  return (
    <StyledComponent classes={classes} onClick={onClick} value={value}>
      {children}
    </StyledComponent>
  );
};

export default ToggleButton;
