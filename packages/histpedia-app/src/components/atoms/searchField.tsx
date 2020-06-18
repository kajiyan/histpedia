import styled from '@emotion/styled';
import React from 'react';
import classNames from 'classnames';

/* types */
type ContainerProps = {
  classes?: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  classes,
  className,
  name,
  onChange,
  onInput,
}: Props) => {
  return (
    <input
      autoComplete="off"
      className={classNames(className, classes)}
      type="text"
      name={name}
      onChange={onChange}
      onInput={onInput}
    />
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  border: solid 1px #000;
  border-radius: 2px 0 0 2px;
  font-size: 16px;
  font-size: 1.6rem;
  padding: 0.8em 1.2em;
  line-height: 1.6;
  width: 100%;

  &:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 1px #000;
    outline: 0;
  }
`;

// Container ------------------------------------------
const SearchField: React.FC<ContainerProps> = ({
  classes,
  name,
  onChange,
  onInput,
}: ContainerProps) => {
  console.log('[SearchField] render');
  return (
    <StyledComponent
      classes={classes}
      name={name}
      onChange={onChange}
      onInput={onInput}
    />
  );
};

export default SearchField;
