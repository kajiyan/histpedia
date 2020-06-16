import styled from '@emotion/styled';
import React from 'react';
import Scrubber from '../atoms/scrubber';

/* types */
type ContainerProps = {
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
  max,
  initialValue,
  onChangeHandler,
}: Props) => {
  return (
    <div className={className}>
      <Scrubber
        max={max}
        name="progress"
        initialValue={initialValue}
        onChangeHandler={onChangeHandler}
      />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const Seekbar: React.FC<ContainerProps> = ({
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
      max={max}
      initialValue={initialValue}
      onChangeHandler={onChangeHandler}
    />
  );
};

export default Seekbar;
