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

  return <h1 className={classNames(className, classes)}>{title}</h1>;
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const Title: React.FC<ContainerProps> = ({
  classes,
  title,
}: ContainerProps) => {
  // console.log('[Title] render');
  return <StyledComponent classes={classes} title={title} />;
};

export default Title;
