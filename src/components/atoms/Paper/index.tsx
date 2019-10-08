import { NextComponentType, NextPageContext } from 'next';
import React, { useEffect, useRef } from 'react';
import Measure, { ContentRect } from 'react-measure';
import styled from 'styled-components';

type Props = {
  className?: string;
};

const Atelier = styled.div`
  position: relative;
`;

const Easel = styled.div`
  pointer-events: none;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;

const Canvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
`;

const Motif = styled.div``;

let h2c: Html2CanvasStatic;

// html2canvas を import するとエラーとなるのでCSRの時だけ読み込む
if (process.browser) {
  h2c = require('html2canvas');
}

const Paper: NextComponentType<NextPageContext, {}, Props> = props => {
  console.log('render');

  const { children } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motifRef = useRef<HTMLDivElement>(null);
  // const startTime = 0;
  // let ctx: CanvasRenderingContext2D | null;

  const draw = () => {
    window.requestAnimationFrame(draw);
    // const now = performance.now();
    // const sec = ((now - startTime) / 1000) % 1;
    // console.log(sec);
  };

  const onResize = (contentRect: ContentRect) => {
    if (contentRect.entry && canvasRef.current) {
      canvasRef.current.width = contentRect.entry.width;
      canvasRef.current.height = contentRect.entry.height;
      canvasRef.current.width *= window.devicePixelRatio || 1;
      canvasRef.current.height *= window.devicePixelRatio || 1;
      canvasRef.current.style.width = `${canvasRef.current.width /
        devicePixelRatio}px`;
      canvasRef.current.style.height = `${canvasRef.current.height /
        devicePixelRatio}px`;
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      // ctx = canvasRef.current.getContext('2d')!;
      draw();
    }
  }, [canvasRef]);

  useEffect(() => {
    if (motifRef.current && h2c) {
      h2c(motifRef.current).then(canvas => {
        document.body.appendChild(canvas);
      });
    }
  }, [motifRef]);

  return (
    <Atelier>
      <Measure onResize={onResize}>
        {({ measureRef }) => (
          <Easel ref={measureRef}>
            <Canvas ref={canvasRef}></Canvas>
          </Easel>
        )}
      </Measure>
      <Motif ref={motifRef}>{children}</Motif>
    </Atelier>
  );
};

export default Paper;
