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

  @import url('https://ja.wikipedia.org/w/load.php?lang=ja&modules=ext.cite.styles%7Cext.tmh.thumbnail.styles%7Cext.uls.interlanguage%7Cext.visualEditor.desktopArticleTarget.noscript%7Cext.wikimediaBadges%7Cmediawiki.page.gallery.styles%7Cmediawiki.toc.styles%7Cskins.vector.styles.legacy%7Cwikibase.client.init&only=styles&skin=vector');

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
