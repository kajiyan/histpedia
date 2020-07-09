import styled from '@emotion/styled';
import React from 'react';
import classNames from 'classnames';
import { List } from 'immutable';
import Title from '../atoms/wiki/title';
import Container from './container';

/* types */
type ContainerProps = {
  classes?: string;
  editorList?: List<string | undefined>;
  ended?: boolean;
};

type Props = {
  className?: string;
  duration: number;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  classes,
  className,
  editorList,
  ended,
}: Props) => {
  return (
    <article className={classNames(className, classes, { 'er-show': ended })}>
      <Container>
        <div className="er-Inner">
          <Title classes="er-Title" title="Editors" />
          <ul className="er-List">
            {editorList?.map((editor, key) => (
              <li className="er-List_Item" key={key}>
                {editor}
              </li>
            ))}
          </ul>
          <div className="er-Outro">To Be Continued</div>
        </div>
      </Container>
    </article>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  font-family: 'Roboto Condensed', 'Helvetica Neue', Arial,
    'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s ease, visibility 0s ease 0.5s;

  &.er-show {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.5s ease 1.5s;

    .er-Inner {
      transform: translateY(calc(-100% + 100vh));
      transition: transform ${({ duration }) => duration * 0.25}s linear 3s;
    }
  }

  .er-Inner {
    padding: 40vh 0 0;
  }

  .er-Title {
    border-bottom: solid 1px #fff;
    color: #fff;
  }

  .er-List {
    color: #fff;
    font-size: 15px;
    font-size: 1.5rem;
    text-align: center;
    line-height: 1.6;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .er-Outro {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 28px;
    font-size: 2.8rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    height: 100vh;
  }
`;

// Container ------------------------------------------
const EndRoll: React.FC<ContainerProps> = ({
  classes,
  editorList = List<string>(),
  ended = false,
}: ContainerProps) => {
  // console.log('[EndRoll] render');

  const duration = editorList.size - 1;

  return (
    <StyledComponent
      classes={classes}
      duration={duration}
      editorList={editorList}
      ended={ended}
    />
  );
};

export default EndRoll;
