import styled from '@emotion/styled';
import React from 'react';
import Title from '../atoms/wiki/title';
import WikiPaper from '../atoms/wikiPaper';
import History from '../../reducers/Wiki/models/History';

/* types */
type ContainerProps = {
  diff: boolean;
  entity?: History;
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ diff, className, entity }: Props) => {
  const text =
    diff && typeof entity?.diffHTML !== 'undefined'
      ? entity?.diffHTML
      : entity?.text;

  return (
    <div className={className}>
      <Title classes="wikiBook-Title" title={entity?.title} />
      <WikiPaper text={text} />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  .wikiBook-Title {
    text-align: center;
  }
`;

// Container ------------------------------------------
const WikiBook: React.FC<ContainerProps> = ({
  diff,
  entity,
}: ContainerProps) => {
  // console.log('[WikiBook] render');

  return <StyledComponent diff={diff} entity={entity} />;
};

export default WikiBook;
