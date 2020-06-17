import styled from '@emotion/styled';
import React from 'react';

/* types */
type ContainerProps = {
  text?: string;
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ className, text }: Props) => {
  if (typeof text === 'undefined') {
    return <div className={className} />;
  }

  return (
    <div
      className={className}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  font-size: 1.5em;

  inc {
    background-color: #ffeef0;
    text-decoration: none;
  }

  del {
    background-color: #e6ffed;
    text-decoration: none;
  }
`;

// Container ------------------------------------------
const wikiPaper: React.FC<ContainerProps> = ({ text }: ContainerProps) => {
  console.log('[wikiPaper] render');
  return <StyledComponent text={text} />;
};

export default wikiPaper;
