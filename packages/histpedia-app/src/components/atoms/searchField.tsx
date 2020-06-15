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
      className={classNames(className, classes)}
      type="input"
      name={name}
      onChange={onChange}
      onInput={onInput}
    />
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

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
