import styled from '@emotion/styled';
import React from 'react';
import { format } from 'date-fns';
import classNames from 'classnames';

/* types */
type ContainerProps = {
  classes?: string;
  timestamp?: string;
};

type Props = {
  className?: string;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  classes,
  className,
  timestamp,
}: Props) => {
  if (typeof timestamp === 'undefined') {
    return <></>;
  }

  return (
    <time className={classNames(className, classes)} dateTime={timestamp}>
      {format(new Date(timestamp), 'MMM dd, yyyy hh:mm:ss aa')}
    </time>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const Timestamp: React.FC<ContainerProps> = ({
  classes,
  timestamp,
}: ContainerProps) => {
  // console.log('[Timestamp] render');
  return <StyledComponent classes={classes} timestamp={timestamp} />;
};

export default Timestamp;
