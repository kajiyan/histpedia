import styled from '@emotion/styled';
import React from 'react';
import classNames from 'classnames';

/* types */
type ContainerProps = {
  classes?: string;
  title?: string;
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ classes, className, title }: Props) => {
  if (typeof title === 'undefined') {
    return <></>;
  }

  if (title === 'HTTP 404') {
    return <h1 className={classNames(className, classes)}>NOT FOUND</h1>;
  }

  return <h1 className={classNames(className, classes)}>{title}</h1>;
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  font-size: 28px;
  font-size: 2.8rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  padding-top: 0;
  padding-bottom: 0.6em;
`;

// Container ------------------------------------------
const Title: React.FC<ContainerProps> = ({
  classes,
  title,
}: ContainerProps) => {
  // console.log('[Title] render');
  return <StyledComponent classes={classes} title={title} />;
};

export default Title;
