import styled from '@emotion/styled';
import React, { memo } from 'react';
import classNames from 'classnames';
import Button from '../atoms/button';
import SearchField from '../atoms/searchField';

/* types */
type ContainerProps = {
  classes?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
};

type Props = {
  className?: string;
} & ContainerProps;

const MemoSearchField = memo(SearchField);
const MemoButton = memo(Button);

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  classes,
  className,
  onChange,
  onClick,
  onInput,
}: Props) => {
  return (
    <div className={classNames(className, classes)}>
      <fieldset className="sfs-Fieldset">
        <legend className="sfs-Legend">Choose your favorite monster</legend>
        <MemoSearchField
          classes="sfs-SearchField"
          name="titles"
          onChange={onChange}
          onInput={onInput}
        />
      </fieldset>
      <MemoButton classes="sfs-Button" onClick={onClick} type="submit">
        History Search
      </MemoButton>
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  .sfs-Fieldset {
    border: none;
    display: block;
    width: 100%;
    max-width: 490px;
    margin: 0 auto 10px;
  }

  .sfs-Legend {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .sfs-Button {
    display: block;
    border: solid 1px #000;
    width: 100%;
    max-width: 490px;
    margin: 0 auto;
  }
`;

// Container ------------------------------------------
const SearchFieldSet: React.FC<ContainerProps> = ({
  classes,
  onChange,
  onClick,
  onInput,
}: ContainerProps) => {
  return (
    <StyledComponent
      classes={classes}
      onChange={onChange}
      onClick={onClick}
      onInput={onInput}
    />
  );
};

export default SearchFieldSet;
