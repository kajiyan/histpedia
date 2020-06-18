import styled from '@emotion/styled';
import React from 'react';
import Logo from '../atoms/logo';
import Container from '../molecules/container';
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
      <div className="t-home-Inner">
        <Container classes="t-home-Logo_Container">
          <Logo classes="t-home-Logo" />
        </Container>
        <SearchForm />
      </div>
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  .t-home-Inner {
    width: 100%;
  }

  .t-home-Logo_Container {
    margin: 0 auto 44px;
  }

  .t-home-Logo {
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
  }
`;

// Container ------------------------------------------
const Home: React.FC<ContainerProps> = ({ hoge }: ContainerProps) => {
  return <StyledComponent />;
};

export default Home;
