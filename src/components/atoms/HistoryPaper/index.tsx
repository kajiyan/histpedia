// import { NextComponentType, NextPageContext } from 'next';
import * as React from 'react';
// import { useEffect, useRef } from 'react';
import Measure, { ContentRect } from 'react-measure';
import * as THREE from 'three';
import styled from 'styled-components';

type Props = {
  className?: string;
};

const Atelier = styled.div`
  position: relative;
`;

const Easel = styled.div`
  width: 100%;
  height: 100%;
`;

const Canvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
`;

let h2c: Html2CanvasStatic;

// html2canvas を import するとエラーとなるのでCSRの時だけ読み込む
if (process.browser) {
  h2c = require('html2canvas');
  console.log(h2c);
}

class HistoryPaper extends React.Component<Props> {
  /**
   * @constructs
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    const axesHelper = new THREE.AxesHelper(2); // X軸が赤色、Y軸が緑色、Z軸が青色
    const gridHelper = new THREE.GridHelper(10, 10); // size, step

    this.canvasEl = null;
    this.devicePixelRatio =
      process.browser && window.devicePixelRatio
        ? window.devicePixelRatio
        : 1.0;
    this.width = 0;
    this.height = 0;

    // Scene
    this.scene = new THREE.Scene();

    // Light
    this.scene.add(ambientLight);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      0.1,
      2000
    );
    this.camera.position.set(0, 0, 1000);

    // Helpers
    this.scene.add(gridHelper);
    this.scene.add(axesHelper);

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.onResize = this.onResize.bind(this);

    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    this.scene.add(box);
  }

  private canvasEl: HTMLCanvasElement | null;

  private scene: THREE.Scene;

  private camera: THREE.PerspectiveCamera;

  private renderer: THREE.WebGLRenderer | undefined;

  private devicePixelRatio: number;

  private width: number;

  private height: number;

  /**
   * update
   */
  private update() {}

  /**
   * draw
   */
  private draw() {
    window.requestAnimationFrame(() => {
      this.draw();
    });

    this.renderer!.render(this.scene, this.camera);
  }

  /**
   * onResize
   * リサイズ時のイベントハンドラー
   */
  private onResize(contentRect: ContentRect) {
    console.log(contentRect, this.canvasEl, this.devicePixelRatio);

    if (this.renderer && contentRect.entry) {
      this.width = Math.round(contentRect.entry.width);
      this.height = Math.round(contentRect.entry.height);
      this.devicePixelRatio = window.devicePixelRatio;

      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();

      this.renderer.setPixelRatio(this.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
    }
  }

  /**
   * componentDidMount
   */
  public componentDidMount() {
    // レンダラーを作成
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvasEl!
    });
    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(this.devicePixelRatio); // ピクセル比
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    this.update();
    this.draw();
  }

  /**
   * shouldComponentUpdate
   */
  public shouldComponentUpdate(nextProps: Props) {
    console.log(nextProps);
    return false;
  }

  /**
   * render
   */
  public render() {
    return (
      <Atelier>
        <Measure onResize={this.onResize}>
          {({ measureRef }) => (
            <Easel ref={measureRef}>
              <Canvas
                ref={(el: HTMLCanvasElement) => {
                  this.canvasEl = el;
                }}
              ></Canvas>
            </Easel>
          )}
        </Measure>
      </Atelier>
    );
  }
}

export default HistoryPaper;
