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
  return (
    <div className={classNames(className, classes)} role="progressbar">
      <svg className="circular-Svg" viewBox="22 22 44 44">
        <circle
          className="circular-Svg_Circle"
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          strokeWidth="3.6"
        />
      </svg>
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  @keyframes circular-rotate {
    0% {
      transform-origin: 50% 50%;
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes circular-dash {
    0% {
      stroke-dasharray: 1px, 200px;
      stroke-dashoffset: 0px;
    }
    50% {
      stroke-dasharray: 100px, 200px;
      stroke-dashoffset: -15px;
    }
    100% {
      stroke-dasharray: 100px, 200px;
      stroke-dashoffset: -125px;
    }
  }

  display: inline-block;
  color: #000;
  width: 40px;
  height: 40px;
  animation: 1400ms linear 0ms infinite normal none running circular-rotate;

  .circular-Svg_Circle {
    stroke: currentColor;
    stroke-dasharray: 80px, 200px;
    stroke-dashoffset: 0px;
    animation: circular-dash 1.4s ease-in-out infinite;
  }
`;

// Container ------------------------------------------
const Circular: React.FC<ContainerProps> = ({ classes }: ContainerProps) => {
  // console.log('[Circular] render');
  return <StyledComponent classes={classes} />;
};

export default Circular;
