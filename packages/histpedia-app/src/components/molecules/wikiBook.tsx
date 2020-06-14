import styled from '@emotion/styled';
import React from 'react';
import WikiPaper from '../atoms/wikiPaper';
import History from '../../reducers/Wiki/models/History';

/* types */
type ContainerProps = {
  entity: Required<History>;
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ className, entity }: Props) => {
  return (
    <div className={className}>
      <WikiPaper entity={entity} />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const WikiBook: React.FC<ContainerProps> = ({ entity }: ContainerProps) => {
  return <StyledComponent entity={entity} />;
};

export default WikiBook;
