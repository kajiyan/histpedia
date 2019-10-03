import React, { useEffect, useRef } from 'react';
import Measure, { ContentRect } from 'react-measure';
import styled from 'styled-components';

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

const Paper = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motifRef = useRef<HTMLDivElement>(null);
  const startTime = 0;
  let ctx: CanvasRenderingContext2D | null;
  let color = '#000000';
  let font = '10px sans-serif';
  let fontSize = 10;
  let textAlign: CanvasTextAlign = 'start';
  // let letterSpacing = 'normal';
  // let lineHeight = 1.2;

  const draw = () => {
    window.requestAnimationFrame(draw);
    const now = performance.now();
    const sec = ((now - startTime) / 1000) % 1;

    // canvasRef.current!.style.letterSpacing = letterSpacing;

    console.log(sec);

    ctx!.clearRect(0, 0, 1000, 1000);

    ctx!.save();
    ctx!.font = font;
    ctx!.textAlign = textAlign;
    ctx!.textBaseline = 'alphabetic';
    ctx!.fillStyle = color;
    ctx!.fillText(
      'Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World',
      0,
      (fontSize + (fontSize * 1.2 - fontSize) / 2) *
        (window.devicePixelRatio || 1)
    );

    // ctx!.fillText('Hello World', 200, 0);
    ctx!.restore();
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
      ctx = canvasRef.current.getContext('2d')!;
      draw();
    }
  }, [canvasRef]);

  useEffect(() => {
    if (motifRef.current && motifRef.current.hasChildNodes()) {
      const motifChildEl = motifRef.current.firstChild as HTMLElement;
      const style = getComputedStyle(motifChildEl);
      color = style.color || '#000000';
      font = [
        style.fontStyle,
        style.fontVariant,
        style.fontWeight,
        `${parseInt(style.fontSize) * window.devicePixelRatio}px`,
        '/',
        style.lineHeight,
        style.fontFamily
      ].join(' ');
      fontSize = parseInt(style.fontSize);
      textAlign = style.textAlign as CanvasTextAlign;

      motifChildEl.style.color = 'transparent';

      // letterSpacing = style.letterSpacing;
      console.log(color, font, textAlign, fontSize, style.fontSize);
    }
  }, [motifRef]);

  console.log('render');

  return (
    <Atelier>
      <Measure onResize={onResize}>
        {({ measureRef }) => (
          <Easel ref={measureRef}>
            <Canvas ref={canvasRef}></Canvas>
          </Easel>
        )}
      </Measure>
      <Motif ref={motifRef}>
        <div>
          Hello WorldHello WorldHello WorldHello WorldHello WorldHello
          WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello
          WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello
          WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello
          WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello
          WorldHello WorldHello WorldHello WorldHello World
        </div>
      </Motif>
    </Atelier>
  );
};

export default Paper;
