import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { List } from 'immutable';
import WikiActions from '../../actions/Wiki';
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
  initialValue: number;
  onSeek: (index: number) => void;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  className,
  max,
  initialValue,
  onSeek,
}: Props) => {
  return (
    <div className={className}>
      Controller {initialValue}
      <Seekbar max={max} initialValue={initialValue} onSeek={onSeek} />
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const Controller: React.FC<ContainerProps> = ({
  entityIds,
}: ContainerProps) => {
  console.log('[Controller] render');

  const dispatch = useDispatch();
  const wikiState = useSelector((state: StoreState) => {
    return (({ currentEntityIdIndex, fetchingDiffContent }) => ({
      currentEntityIdIndex,
      fetchingDiffContent,
    }))(state.wiki.histories);
  }, shallowEqual);
  const { currentEntityIdIndex, fetchingDiffContent } = wikiState;
  const max = entityIds.size;

  const onSeek = (index: number) => {
    dispatch(WikiActions.updateCurrentEntityIdIndex(index));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // fetchDiff
      // start の時にフラグを倒す
      // エンティティからpageIDとrevid渡す
      // pageidを取得済みであれば読み込みスキップ
      console.log(currentEntityIdIndex, fetchingDiffContent);
      if (!fetchingDiffContent) {
        dispatch(WikiActions.fetchDiffContent(currentEntityIdIndex));
      }
    }, 1000);

    return () => {
      console.log('[Controller] clear', intervalId);
      clearInterval(intervalId);
    };
  }, [currentEntityIdIndex, dispatch, fetchingDiffContent]);

  return (
    <StyledComponent
      entityIds={entityIds}
      max={max}
      initialValue={currentEntityIdIndex}
      onSeek={onSeek}
    />
  );
};

export default Controller;
