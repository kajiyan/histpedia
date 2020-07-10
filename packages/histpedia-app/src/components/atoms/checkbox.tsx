import styled from '@emotion/styled';
import React, { ChangeEvent, ReactNode } from 'react';
import classNames from 'classnames';

// TODO: Container にある if 文を DOM 側に移したい

/* types */
interface BaseProps {
  children: ReactNode;
  classes?: string;
  id: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface ControlledProps extends BaseProps {
  checked?: boolean;
  defaultChecked?: never;
}

interface UncontrolledProps extends BaseProps {
  checked?: never;
  defaultChecked?: boolean;
}

type ContainerProps = ControlledProps | UncontrolledProps;

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  defaultChecked,
  checked,
  children,
  classes,
  className,
  id,
  onChange,
}: Props) => {
  return (
    <label className={classNames(className, classes)} htmlFor={id}>
      <input
        defaultChecked={defaultChecked}
        checked={checked}
        className="cb-Input"
        id={id}
        name="start"
        onChange={onChange}
        type="checkbox"
      />
      <span className="cb-Label">{children}</span>
    </label>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 14px;
  font-size: 1.4rem;
  letter-spacing: 0.02em;
  line-height: 1.6;

  .cb-Input {
    border: 0;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    position: absolute;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);

    &:checked + .cb-Label {
      &::after {
        opacity: 1;
      }
    }
  }

  .cb-Label {
    display: inline-block;
    padding: 0 0 0 1.6em;
    position: relative;

    &::before,
    &::after {
      content: '';
      display: block;
      width: 1em;
      height: 1em;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }

    &::before {
      background-color: #fff;
      border-style: solid;
      border-width: 1px;
      border-color: #000;
      z-index: 0;
    }

    &::after {
      background: #000
        url(data:image/svg+xml;base64,PHN2ZyBpZD0i44Os44Kk44Ok44O8XzEiIGRhdGEtbmFtZT0i44Os44Kk44Ok44O8IDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0IiB2aWV3Qm94PSIwIDAgMTQgMTQiPgogIDxwYXRoIGQ9Ik0yLjE1LDcuMzNhLjUuNSwwLDAsMSwwLS43MWwuNy0uN2EuNS41LDAsMCwxLC43MSwwTDUuNzUsOC4xMWw0LjY5LTQuNjlhLjUuNSwwLDAsMSwuNzEsMGwuNy43YS41LjUsMCwwLDEsMCwuNzFMNi4xLDEwLjU4YS40OC40OCwwLDAsMS0uNywwWiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4K)
        no-repeat center/contain;
      z-index: 1;
      opacity: 0;
      transition: opacity 0.25s ease-in-out;
    }
  }
`;

// Container ------------------------------------------
const Checkbox: React.FC<ContainerProps> = ({
  defaultChecked,
  checked,
  children,
  classes,
  id,
  onChange,
}: ContainerProps) => {
  // console.log('[Checkbox] render');

  if (typeof checked !== 'undefined') {
    return (
      <StyledComponent
        checked={checked}
        classes={classes}
        id={id}
        onChange={onChange}
      >
        {children}
      </StyledComponent>
    );
  }

  if (typeof defaultChecked !== 'undefined') {
    return (
      <StyledComponent
        defaultChecked={defaultChecked}
        classes={classes}
        id={id}
        onChange={onChange}
      >
        {children}
      </StyledComponent>
    );
  }

  return (
    <StyledComponent classes={classes} id={id} onChange={onChange}>
      {children}
    </StyledComponent>
  );
};

export default Checkbox;
