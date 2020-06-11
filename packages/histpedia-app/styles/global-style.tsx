import { css, SerializedStyles } from '@emotion/core';

const globalStyle: SerializedStyles = css`
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

  :root {
    font-size: 62.5%;
  }
`;

export default globalStyle;
