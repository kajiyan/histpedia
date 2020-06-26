import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { List, is } from 'immutable';
import WikiActions from '../../actions/Wiki';
import PlayButton from '../atoms/playButton';
import ToggleButton from '../atoms/toggleButton';
import Seekbar from '../molecules/seekbar';
import { StoreState } from '../../store/index';

// Todo 進捗を拾う

/* types */
type ContainerProps = {
  entityIds: List<string>;
};

type Props = {
  className?: string;
  max: number;
  initialDiff: boolean;
  initialPaused: boolean;
  initialValue: number;
  onPause: () => void;
  onPlay: () => void;
  onSeek: (index: number) => void;
  onToggle: (value: boolean) => void;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  className,
  max,
  initialDiff,
  initialPaused,
  initialValue,
  onPause,
  onPlay,
  onSeek,
  onToggle,
}: Props) => {
  return (
    <div className={className}>
      <PlayButton
        classes="ctr-PlayButton"
        onPause={onPause}
        onPlay={onPlay}
        initialPaused={initialPaused}
      />
      <ToggleButton
        classes="ctr-ToggleButton"
        onToggle={onToggle}
        initialValue={initialDiff}
      >
        <svg
          className="ctr-ToggleButton_SVG"
          xmlns="http://www.w3.org/2000/svg"
          width="46"
          height="36"
          viewBox="0 0 46 36"
        >
          <title>difference from preceding version.</title>
          <path d="M26.21,12.08V7H18.65a.9.9,0,0,0-.91.9v3.62l-4.25.74A1.79,1.79,0,0,0,12,14.28l2.69,15.24A1.79,1.79,0,0,0,16.8,31l10.58-1.86A1.79,1.79,0,0,0,28.83,27l-.14-.79h2.66a.9.9,0,0,0,.91-.9V13H27.12A.91.91,0,0,1,26.21,12.08Zm-4.84,6.18a.45.45,0,0,1,.45-.45h6.36a.45.45,0,0,1,.45.45v.3a.45.45,0,0,1-.45.45H21.82a.45.45,0,0,1-.45-.45Zm0,2.41a.45.45,0,0,1,.45-.45h6.36a.45.45,0,0,1,.45.45V21a.46.46,0,0,1-.45.46H21.82a.46.46,0,0,1-.45-.46Zm5.7,6.68L16.49,29.21,13.79,14l3.95-.69V25.35a.9.9,0,0,0,.91.9h8.22Zm1.56-11.5v.3a.45.45,0,0,1-.45.45H21.82a.45.45,0,0,1-.45-.45v-.3a.46.46,0,0,1,.45-.46h6.36A.46.46,0,0,1,28.63,15.85Z" />
          <path d="M32,10.91l-3.7-3.7A.9.9,0,0,0,27.65,7h-.23v4.82h4.84v-.23A.9.9,0,0,0,32,10.91Z" />
        </svg>
      </ToggleButton>
      <Seekbar
        classes="ctr-Seekbar"
        max={max}
        initialValue={initialValue}
        onSeek={onSeek}
      />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  background-color: #fff;
  border-top: solid 1px #000;
  display: flex;
  width: 100%;
  height: 36px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;

  .ctr-PlayButton {
    border-right: 1px solid #000;
    flex-shrink: 0;
  }

  .ctr-ToggleButton {
    border: none;
    border-right: 1px solid #000;
    border-radius: 0;
    flex-shrink: 0;
    width: 46px;
    height: 100%;
    padding: 0;
    position: relative;

    &::before {
      content: '';
      display: block;
      width: 100%;
      padding: ${(36 / 46) * 100}% 0 0;
      position: relative;
    }
  }

  .ctr-ToggleButton_SVG {
    max-width: 100%;
    width: 100%;
    max-height: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .ctr-Seekbar {
    flex-grow: 1;
  }
`;

// Container ------------------------------------------
const Controller: React.FC<ContainerProps> = ({
  entityIds,
}: ContainerProps) => {
  console.log('[Controller] render');

  const dispatch = useDispatch();
  const wikiState = useSelector((state: StoreState) => {
    return (({ currentEntityIdIndex, diff, fetchingDiffContent, paused }) => ({
      currentEntityIdIndex,
      diff,
      fetchingDiffContent,
      paused,
    }))(state.wiki.histories);
  }, shallowEqual);
  // 差分のバイト数の List
  const diffBytesList = useSelector(
    (state: StoreState) => {
      const { entities, histories } = state.wiki;

      return histories.entityIds.map(
        (entityId) => entities.history.get(entityId)?.diffBytes
      );
    },
    (listA, listB) => {
      return is(listA, listB);
    }
  );
  // ユーザーの List
  const userList = useSelector(
    (state: StoreState) => {
      const { entities, histories } = state.wiki;

      return histories.entityIds
        .map((entityId) => entities.history.get(entityId)?.user)
        .toSet();
    },
    (listA, listB) => {
      return is(listA, listB);
    }
  );
  // console.log(diffBytesList.toJS(), userList.toJS());
  const { currentEntityIdIndex, diff, fetchingDiffContent, paused } = wikiState;
  const max = entityIds.size - 1;

  /**
   * onPlay
   */
  const onPlay = () => {
    dispatch(WikiActions.updatePaused(false));
  };

  /**
   * onPause
   */
  const onPause = () => {
    dispatch(WikiActions.updatePaused(true));
  };

  /**
   * onSeek
   * シークバーの値が変わった時のイベントハンドラー、現在の EntityId を更新する
   */
  const onSeek = (index: number) => {
    dispatch(WikiActions.updateCurrentEntityIdIndex(index));
  };

  /**
   * onToggle
   */
  const onToggle = (value: boolean) => {
    dispatch(WikiActions.updateDiff(value));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // fetchDiff
      // start の時にフラグを倒す
      // エンティティからpageIDとrevid渡す
      // pageidを取得済みであれば読み込みスキップ
      if (!fetchingDiffContent) {
        dispatch(WikiActions.fetchDiffContent(currentEntityIdIndex, diff));
        if (!paused && !diff && currentEntityIdIndex < max) {
          dispatch(
            WikiActions.updateCurrentEntityIdIndex(currentEntityIdIndex + 1)
          );
        }
      }
    }, 1000);

    return () => {
      console.log('[Controller] clear', intervalId);
      clearInterval(intervalId);
    };
  }, [currentEntityIdIndex, diff, dispatch, fetchingDiffContent, max, paused]);

  return (
    <StyledComponent
      entityIds={entityIds}
      max={max}
      initialDiff={diff}
      initialPaused={paused}
      initialValue={currentEntityIdIndex}
      onPause={onPause}
      onPlay={onPlay}
      onSeek={onSeek}
      onToggle={onToggle}
    />
  );
};

export default Controller;
