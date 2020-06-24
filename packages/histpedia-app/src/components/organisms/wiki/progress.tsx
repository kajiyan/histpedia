import styled from '@emotion/styled';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { List } from 'immutable';
import classNames from 'classnames';
import { StoreState } from '../../../store/index';

/* types */
type ContainerProps = {
  entityIds?: List<string>;
  classes?: string;
};

type Props = {
  className?: string;
  loading: boolean;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({ classes, className, loading }: Props) => {
  return (
    <div
      className={classNames(className, classes, { 'prgrs-loading': loading })}
    >
      <span className="prgrs-Letter">L</span>
      <span className="prgrs-Letter">o</span>
      <span className="prgrs-Letter">a</span>
      <span className="prgrs-Letter">d</span>
      <span className="prgrs-Letter">i</span>
      <span className="prgrs-Letter">n</span>
      <span className="prgrs-Letter">g</span>
      <span className="prgrs-Letter prgrs-Letter-blink prgrs-Letter-blink-0">
        #
      </span>
      <span className="prgrs-Letter prgrs-Letter-blink prgrs-Letter-blink-1">
        #
      </span>
      <span className="prgrs-Letter prgrs-Letter-blink prgrs-Letter-blink-2">
        #
      </span>
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  @keyframes blink {
    to {
      visibility: hidden;
    }
  }

  background-color: #000;
  color: #fff;
  display: flex;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
  flex-direction: column-reverse;
  padding: 1em 0.6em;
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 2;
  transform: translateY(-50%);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s ease, visibility 0s 0.25s;

  &.prgrs-loading {
    opacity: 1;
    visibility: visible;
  }

  .prgrs-Letter {
    display: block;
    width: 1em;
    height: 1em;
    transform: rotate(-90deg);
  }

  .prgrs-Letter-blink {
    animation: blink 0.6s steps(2, start) infinite;
  }

  .prgrs-Letter-blink-2 {
    animation-delay: 0.2s;
  }

  .prgrs-Letter-blink-1 {
    animation-delay: 0.1s;
  }

  .prgrs-Letter-blink-0 {
    animation-delay: 0s;
  }
`;

// Container ------------------------------------------
const Progress: React.FC<ContainerProps> = ({ classes }: ContainerProps) => {
  // console.log('[Progress] render');

  const wikiState = useSelector((state: StoreState) => {
    return (({ fetchingDiffContent }) => ({
      fetchingDiffContent,
    }))(state.wiki.histories);
  }, shallowEqual);
  const { fetchingDiffContent } = wikiState;

  return <StyledComponent classes={classes} loading={fetchingDiffContent} />;
};

export default Progress;
