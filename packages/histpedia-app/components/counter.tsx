import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../src/store/index';

// Todo 進捗を拾う

/* types */
type Props = {
  className?: string;
  count: number;
};

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ className, count }: Props) => {
  return <div className={className}>{count}</div>;
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const Controller: React.FC = () => {
  const exampleState = useSelector((state: StoreState) => state.example);
  const { count } = exampleState;

  return <StyledComponent count={count} />;
};

export default Controller;
