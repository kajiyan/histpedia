import styled from '@emotion/styled';
import React from 'react';
import classNames from 'classnames';

/* types */
type ContainerProps = {
  classes?: string;
  text?: string;
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ classes, className, text }: Props) => {
  // モバイルの wikipedia のスタイルを適応するのに .content を付与する必要がある
  if (typeof text === 'undefined') {
    return <div className={classNames('content', className, classes)} />;
  }

  return (
    <div
      className={classNames('content', className, classes)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  font-size: 1.5em;

  ins,
  del {
    &::after {
      font-size: 0.6em;
      vertical-align: top;
      padding: 0 0.25em;
    }
  }

  ins {
    background-color: #acf2bd;
    text-decoration: none;

    &::after {
      content: '+';
    }
  }

  del {
    background-color: #fdb8c0;
    text-decoration: none;

    &::after {
      content: '-';
    }
  }
`;

// Container ------------------------------------------
const wikiPaper: React.FC<ContainerProps> = ({
  classes,
  text,
}: ContainerProps) => {
  // console.log('[wikiPaper] render');

  return <StyledComponent classes={classes} text={text} />;
};

export default wikiPaper;
