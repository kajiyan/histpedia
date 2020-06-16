import styled from '@emotion/styled';
import React from 'react';
import Title from '../atoms/wiki/title';
import WikiPaper from '../atoms/wikiPaper';
import History from '../../reducers/Wiki/models/History';

/* types */
type ContainerProps = {
  entity?: History;
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ className, entity }: Props) => {
  return (
    <div className={className}>
      <Title title={entity?.title} />
      <WikiPaper text={entity?.text} />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const WikiBook: React.FC<ContainerProps> = ({ entity }: ContainerProps) => {
  console.log('[WikiBook] render');
  return <StyledComponent entity={entity} />;
};

export default WikiBook;
