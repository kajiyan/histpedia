import styled from '@emotion/styled';
import React, { useState } from 'react';

/* types */
type ContainerProps = {
  name: string;
  max?: number;
  initialValue?: number;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type Props = {
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  className,
  max = 0,
  onChange,
  value,
}: Props) => {
  return (
    <div className={className}>
      <input
        className="Wiki_Range"
        type="range"
        value={value}
        max={max}
        min="0"
        step="1"
        name="revisions"
        onChange={onChange}
      />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const Scrubber: React.FC<ContainerProps> = ({
  name,
  max,
  initialValue = 0,
  onChangeHandler = function noop() {},
}: ContainerProps) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10));
    onChangeHandler(event);
  };

  return (
    <StyledComponent name={name} max={max} onChange={onChange} value={value} />
  );
};

export default Scrubber;
