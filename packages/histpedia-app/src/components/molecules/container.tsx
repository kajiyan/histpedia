import styled from '@emotion/styled';
import React from 'react';
import classNames from 'classnames';

/* types */
type ContainerProps = {
  children: React.ReactElement | React.ReactElement[] | string;
  classes?: string;
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  children,
  classes,
  className,
}: Props) => {
  return (
    <div className={classNames(className, classes, 'sw-Container')}>
      <div className="sw-Container_Inner">{children}</div>
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  max-width: 1280px;
  margin-top: 0;
  margin-right: auto;
  margin-bottom: 0;
  margin-left: auto;

  .sw-Container_Inner {
    padding: 0 ${(72 / 1280) * 100}%;
  }
`;

// Container ------------------------------------------
const Container: React.FC<ContainerProps> = ({
  children,
  classes,
}: ContainerProps) => {
  return <StyledComponent classes={classes}>{children}</StyledComponent>;
};

export default Container;
