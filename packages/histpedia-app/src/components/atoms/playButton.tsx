import styled from '@emotion/styled';
import React, { useState } from 'react';
import classNames from 'classnames';

/* types */
type ContainerProps = {
  classes?: string;
  onPause?: () => void;
  onPlay?: () => void;
  initialPaused?: boolean;
};

type Props = {
  className?: string;
  onClick: () => void;
  paused: boolean;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  classes,
  className,
  onClick,
  paused,
}: Props) => {
  if (paused) {
    return (
      <button
        className={classNames(className, 'plybtn-paused', classes)}
        type="button"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="46"
          height="36"
          viewBox="0 0 46 36"
          className="pb-SVG"
        >
          <title>play</title>
          <path d="M16 27L16 9 30 18 16 27" />
        </svg>
      </button>
    );
  }

  return (
    <button
      className={classNames(className, 'plybtn-playing', classes)}
      type="button"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="46"
        height="36"
        viewBox="0 0 46 36"
        className="pb-SVG"
      >
        <title>pause</title>
        <path d="M16.5 10H20.5V26H16.5zM25.5 10H29.5V26H25.5z" />
      </svg>
    </button>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  display: inline-block;
  width: 46px;
  height: 100%;
  transition: background-color 0.1s ease, color 0.1s ease;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 100%;
    padding: ${(36 / 46) * 100}% 0 0;
    position: relative;
  }

  &:focus {
    box-shadow: inset 0 0 0 1px #000, inset 0 0 0 2px #fff;
    outline: 0;
  }

  &:hover,
  &.plybtn-playing {
    background-color: #000;
    color: #fff;
  }

  .pb-SVG {
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
const PlayButton: React.FC<ContainerProps> = ({
  classes,
  onPause = function noop() {},
  onPlay = function noop() {},
  initialPaused = false,
}: ContainerProps) => {
  // console.log('[PlayButton] render');

  const [paused, setPaused] = useState(initialPaused);

  if (paused !== initialPaused) {
    setPaused(initialPaused);
  }

  const onClick = () => {
    setPaused(!paused);

    if (!paused) {
      onPause();
    } else {
      onPlay();
    }
  };

  return (
    <StyledComponent classes={classes} onClick={onClick} paused={paused} />
  );
};

export default PlayButton;
