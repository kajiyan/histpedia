import styled from '@emotion/styled';
import React from 'react';
import classNames from 'classnames';

/* types */
type ContainerProps = {
  classes?: string;
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ classes, className }: Props) => {
  return <h1 className={classNames(className, classes)}>Histpedia</h1>;
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const Logo: React.FC<ContainerProps> = ({ classes }: ContainerProps) => {
  // console.log('[Logo] render');
  return <StyledComponent classes={classes} />;
};

export default Logo;
