import { NextComponentType, NextPageContext } from 'next';
import History from '../../../reducers/Wiki/models/History';
import * as React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
  history: History;
};

const Content = styled.div``;

const HistoryPaper: NextComponentType<NextPageContext, {}, Props> = props => {
  return <Content dangerouslySetInnerHTML={{ __html: props.history.text! }} />;
};

export default HistoryPaper;
