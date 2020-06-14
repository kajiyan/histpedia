import styled from '@emotion/styled';
import React, { useState } from 'react';

/* types */
type ContainerProps = {
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
const Component: React.FC<Props> = ({ className, onClick, paused }: Props) => {
  if (paused) {
    return (
      <button className={className} type="button" onClick={onClick}>
        再生
      </button>
    );
  }

  return (
    <button className={className} type="button" onClick={onClick}>
      一時停止
    </button>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const PlayButton: React.FC<ContainerProps> = ({
  onPause = function noop() {},
  onPlay = function noop() {},
  initialPaused = false,
}: ContainerProps) => {
  console.log('[PlayButton] render');

  const [paused, setPaused] = useState(initialPaused);

  const onClick = () => {
    setPaused(!paused);

    if (!paused) {
      onPause();
    } else {
      onPlay();
    }
  };

  return <StyledComponent onClick={onClick} paused={paused} />;
};

export default PlayButton;
