import styled from '@emotion/styled';
import React, { memo } from 'react';
import classNames from 'classnames';
import { List } from 'immutable';
import Polygon from '../atoms/polygon';
import Scrubber from '../atoms/scrubber';
import { mapLinear } from '../../utils/mapLinear';

/* types */
type ContainerProps = {
  classes?: string;
  max?: number;
  hotPointsList?: List<number | undefined>;
  initialValue?: number;
  onSeek?: (index: number) => void;
};
type Props = {
  className?: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  points: string;
  viewBoxWidth: number;
  viewBoxHeight: number;
} & ContainerProps;

const MemoPolygon = memo(Polygon);

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  className,
  classes,
  max,
  initialValue,
  onChangeHandler,
  points,
  viewBoxWidth,
  viewBoxHeight,
}: Props) => {
  return (
    <div className={classNames(className, classes)}>
      <Scrubber
        classes="seekbar-Scrubber"
        max={max}
        name="progress"
        initialValue={initialValue}
        onChangeHandler={onChangeHandler}
      />
      <div className="seekbar-HotSpots">
        <MemoPolygon
          viewBoxWidth={viewBoxWidth}
          viewBoxHeight={viewBoxHeight}
          points={points}
        />
      </div>
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  height: 100%;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    box-sizing: content-box;
    content: '';
    display: block;
    width: 10%;
    height: 50%;
    right: 0;
    top: -3px;
    position: absolute;
  }

  &::before {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    padding: 0 0 5px;
    z-index: 0;
  }

  &::after {
    background-color: #fff;
    z-index: 1;
  }

  .seekbar-Scrubber {
    width: 90%;
    position: relative;
    z-index: 3;
  }

  .seekbar-HotSpots {
    pointer-events: none;
    width: 90%;
    height: calc(50% - 4px);
    padding: 0 8px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
`;

// Container ------------------------------------------
const Seekbar: React.FC<ContainerProps> = ({
  classes,
  hotPointsList = List<number>(),
  max = 0,
  initialValue = 0,
  onSeek = function noop() {},
}: ContainerProps) => {
  // console.log('[Seekbar] render');

  const viewBoxWidth = hotPointsList.size - 1;
  const viewBoxHeight = 100;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(event.target.value, 10);
    onSeek(index);
  };

  // hotPoints の中央値付近の値を取得する
  const medianHotPoints = (() => {
    const sortedHotPointsList = hotPointsList.sort();
    const centerIndex = Math.ceil(sortedHotPointsList.size * 0.8);

    if (sortedHotPointsList.size > 0) {
      if (sortedHotPointsList.size % 2) {
        return sortedHotPointsList.get(centerIndex) as number;
      }

      return (
        ((sortedHotPointsList.get(centerIndex - 1) as number) +
          (sortedHotPointsList.get(centerIndex) as number)) /
        2
      );
    }

    return 0;
  })();

  // polygon 要素の points 属性に設定する値を生成する
  const { hotPoints } = hotPointsList.reduce(
    (reduction, value = 0) => {
      const x = reduction.x + 1;
      const y =
        viewBoxHeight -
        Math.round(
          mapLinear(value, 0, medianHotPoints, 0, viewBoxHeight * 0.6, true)
        );
      return {
        x,
        hotPoints: `${reduction.hotPoints} ${x},${y}`,
      };
    },
    {
      x: -1,
      hotPoints: '',
    }
  );

  // points 属性に設定する値が存在していればパスを閉じるようにする
  const points =
    hotPoints.length > 0
      ? `${hotPoints} ${viewBoxWidth},${viewBoxHeight} 0,${viewBoxHeight}`.trim()
      : hotPoints;

  return (
    <StyledComponent
      classes={classes}
      max={max}
      initialValue={initialValue}
      onChangeHandler={onChangeHandler}
      points={points}
      viewBoxWidth={viewBoxWidth}
      viewBoxHeight={viewBoxHeight}
    />
  );
};

export default Seekbar;
