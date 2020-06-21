import styled from '@emotion/styled';
import React from 'react';
import classNames from 'classnames';
import Scrubber from '../atoms/scrubber';

/* types */
type ContainerProps = {
  classes?: string;
  max?: number;
  initialValue?: number;
  onSeek?: (index: number) => void;
};
type Props = {
  className?: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  className,
  classes,
  max,
  initialValue,
  onChangeHandler,
}: Props) => {
  return (
    <div className={classNames(className, classes)}>
      <Scrubber
        classes="seekbar-Scrubber"
        max={max}
        name="progress"
        initialValue={initialValue}
        onChangeHandler={onChangeHandler}
      />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  height: 100%;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    box-sizing: content-box;
    content: '';
    display: block;
    width: 10%;
    height: 50%;
    right: 0;
    top: -3px;
    position: absolute;
  }

  &::before {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    padding: 0 0 5px;
    z-index: 0;
  }

  &::after {
    background-color: #fff;
    z-index: 1;
  }

  .seekbar-Scrubber {
    width: 90%;
    position: relative;
    z-index: 2;
  }
`;

// Container ------------------------------------------
const Seekbar: React.FC<ContainerProps> = ({
  classes,
  max = 0,
  initialValue = 0,
  onSeek = function noop() {},
}: ContainerProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(event.target.value, 10);
    onSeek(index);
  };

  return (
    <StyledComponent
      classes={classes}
      max={max}
      initialValue={initialValue}
      onChangeHandler={onChangeHandler}
    />
  );
};

export default Seekbar;
