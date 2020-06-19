import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { List } from 'immutable';
import WikiActions from '../../actions/Wiki';
import PlayButton from '../atoms/playButton';
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
  initialPaused: boolean;
  initialValue: number;
  onPause: () => void;
  onPlay: () => void;
  onSeek: (index: number) => void;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  className,
  max,
  initialPaused,
  initialValue,
  onPause,
  onPlay,
  onSeek,
}: Props) => {
  return (
    <div className={className}>
      <PlayButton
        classes="ctr-PlayButton"
        onPause={onPause}
        onPlay={onPlay}
        initialPaused={initialPaused}
      />
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
    border-right: 1px solid;
    flex-shrink: 0;
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
    return (({ currentEntityIdIndex, fetchingDiffContent, paused }) => ({
      currentEntityIdIndex,
      fetchingDiffContent,
      paused,
    }))(state.wiki.histories);
  }, shallowEqual);
  const { currentEntityIdIndex, fetchingDiffContent, paused } = wikiState;
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      // fetchDiff
      // start の時にフラグを倒す
      // エンティティからpageIDとrevid渡す
      // pageidを取得済みであれば読み込みスキップ
      // console.log(currentEntityIdIndex, fetchingDiffContent);
      if (!fetchingDiffContent) {
        dispatch(WikiActions.fetchDiffContent(currentEntityIdIndex, false));
        if (!paused && currentEntityIdIndex < entityIds.size - 1) {
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
  }, [currentEntityIdIndex, dispatch, fetchingDiffContent, paused]);

  return (
    <StyledComponent
      entityIds={entityIds}
      max={max}
      initialPaused={paused}
      initialValue={currentEntityIdIndex}
      onPause={onPause}
      onPlay={onPlay}
      onSeek={onSeek}
    />
  );
};

export default Controller;
