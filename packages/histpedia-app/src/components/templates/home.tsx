import styled from '@emotion/styled';
import React from 'react';
import SearchForm from '../organisms/searchForm';

/* types */
type ContainerProps = {
  hoge?: 'hoge';
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ className }: Props) => {
  return (
    <div className={className}>
      <SearchForm />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const Home: React.FC<ContainerProps> = ({ hoge }: ContainerProps) => {
  return <StyledComponent />;
};

export default Home;
