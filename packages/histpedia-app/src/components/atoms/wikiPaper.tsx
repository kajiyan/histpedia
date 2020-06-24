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

  ins,
  del {
    &:after {
      font-size: 0.6em;
      vertical-align: top;
      padding: 0 0.25em;
    }
  }

  ins {
    background-color: #acf2bd;
    text-decoration: none;

    &:after {
      content: '+';
    }
  }

  del {
    background-color: #fdb8c0;
    text-decoration: none;

    &:after {
      content: '-';
    }
  }
`;

// Container ------------------------------------------
const wikiPaper: React.FC<ContainerProps> = ({ text }: ContainerProps) => {
  console.log('[wikiPaper] render');
  return <StyledComponent text={text} />;
};

export default wikiPaper;
