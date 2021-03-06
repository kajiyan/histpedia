import { css, SerializedStyles } from '@emotion/core';

const globalStyle: SerializedStyles = css`
  :root {
    font-size: 62.5%;
  }

  ::-moz-selection {
    color: #fff;
    background: #000;
  }

  ::selection {
    color: #fff;
    background: #000;
  }

  .hp {
    background-color: #fff;
    color: #000;
    font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN',
      'Hiragino Sans', Meiryo, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'palt' 1;
    font-size: 62.5%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    word-break: break-word;
    overflow-wrap: break-word;
    text-align: justify;
    height: 100%;
  }

  .hp-Body {
    background-color: #fff;
    height: 100%;
  }

  #__next {
    height: 100%;
  }
`;

export default globalStyle;
