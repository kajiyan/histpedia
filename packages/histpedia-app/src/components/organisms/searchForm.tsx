import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import SearchFieldSet from '../molecules/searchFieldSet';

/* types */
type ContainerProps = {
  classes?: string;
};

type Props = {
  classes?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput: (event: React.FormEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  classes,
  className,
  onClick,
  onChange,
  onInput,
  onSubmit,
}: Props) => {
  return (
    <form className={classNames(className, classes)} onSubmit={onSubmit}>
      <SearchFieldSet onClick={onClick} onChange={onChange} onInput={onInput} />
    </form>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const SearchForm: React.FC<ContainerProps> = ({ classes }: ContainerProps) => {
  const [titles, setTitles] = useState<string | undefined>();
  const router = useRouter();

  const onClick = useCallback(() => {}, []);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitles(event.target.value);
    },
    [setTitles]
  );

  const onInput = useCallback(() => {}, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({
      pathname: `/wiki/${titles}`,
    });
    console.log(titles, 'onSubmit');
  };

  return (
    <StyledComponent
      classes={classes}
      onClick={onClick}
      onChange={onChange}
      onInput={onInput}
      onSubmit={onSubmit}
    />
  );
};

export default SearchForm;
