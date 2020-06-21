import styled from '@emotion/styled';
import React, { useState } from 'react';
import classNames from 'classnames';

/* types */
type ContainerProps = {
  classes?: string;
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
  classes,
  className,
  max = 0,
  onChange,
  value,
}: Props) => {
  return (
    <div className={classNames(className, classes)}>
      <input
        className="scrubber-Input"
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
const StyledComponent = styled(Component)`
  height: 100%;
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 50%;
    margin: -7px 0 0;
  }

  /* Generator http://danielstern.ca/range.css/#/ */
  .scrubber-Input {
    -webkit-appearance: none;
    background-color: transparent;
    display: block;
    width: 100%;
    margin: 4px 0;
  }

  .scrubber-Input:focus {
    outline: none;
  }

  .scrubber-Input::-webkit-slider-runnable-track {
    background: #000;
    border: 0;
    width: 100%;
    height: 5px;
    cursor: pointer;
  }

  .scrubber-Input::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: pointer;
    background: #000;
    border: 0;
    border-radius: 7px;
    width: 13px;
    height: 13px;
    margin-top: -4px;
  }

  .scrubber-Input:focus::-webkit-slider-runnable-track {
    background: #000;
  }

  .scrubber-Input::-moz-range-track {
    cursor: pointer;
    background: #000;
    border: 0;
    width: 100%;
    height: 5px;
  }

  .scrubber-Input::-moz-range-thumb {
    cursor: pointer;
    background: #000;
    border: 0;
    border-radius: 7px;
    width: 13px;
    height: 13px;
  }

  .scrubber-Input::-ms-track {
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 4px 0;
    color: transparent;
    width: 100%;
    height: 5px;
  }

  .scrubber-Input::-ms-fill-lower {
    background: #000;
    border: 0;
  }

  .scrubber-Input::-ms-fill-upper {
    background: #000;
    border: 0;
  }

  .scrubber-Input::-ms-thumb {
    cursor: pointer;
    background: #000;
    border: 0;
    border-radius: 7px;
    width: 13px;
    height: 13px;
    margin-top: 0;
  }

  .scrubber-Input:focus::-ms-fill-lower {
    background: #000;
  }

  .scrubber-Input:focus::-ms-fill-upper {
    background: #000;
  }

  @supports (-ms-ime-align: auto) {
    .scrubber-Input {
      margin: 0;
    }
  }
`;

// Container ------------------------------------------
const Scrubber: React.FC<ContainerProps> = ({
  classes,
  name,
  max,
  initialValue = 0,
  onChangeHandler = function noop() {},
}: ContainerProps) => {
  const [value, setValue] = useState(initialValue);

  if (value !== initialValue) {
    setValue(initialValue);
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10));
    onChangeHandler(event);
  };

  return (
    <StyledComponent
      classes={classes}
      name={name}
      max={max}
      onChange={onChange}
      value={value}
    />
  );
};

export default Scrubber;
