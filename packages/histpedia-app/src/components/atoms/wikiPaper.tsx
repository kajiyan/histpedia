import styled from '@emotion/styled';
import React from 'react';
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
    <div
      className={className}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: entity.diffHTML }}
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
const WikiBook: React.FC<ContainerProps> = ({ entity }: ContainerProps) => {
  return <StyledComponent entity={entity} />;
};

export default WikiBook;
