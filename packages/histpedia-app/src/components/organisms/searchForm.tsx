import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Container from '../molecules/container';
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
      <Container>
        <SearchFieldSet
          onClick={onClick}
          onChange={onChange}
          onInput={onInput}
        />
      </Container>
    </form>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const SearchForm: React.FC<ContainerProps> = ({ classes }: ContainerProps) => {
  const [titles, setTitles] = useState('');
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

    // 入力された文字列の前後の空白を削除した後、文字列内のスペースを _ へ置き換える
    const sanitizedTitles = titles
      .replace(/^[\s\0x3000\uFEFF\xA0]+|[\s\0x3000\uFEFF\xA0]+$/g, '')
      .replace(/\s|\0x3000|\uFEFF|\xA0/g, '_');

    // サニタイズした文字列
    if (sanitizedTitles.length > 0) {
      router.push({
        pathname: `/wiki/${encodeURIComponent(sanitizedTitles)}`,
      });
    }
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
