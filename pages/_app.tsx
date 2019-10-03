import 'ress/dist/ress.min.css';

import App, { AppInitialProps, AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../src/styles/Theme';

type Props = AppInitialProps & AppProps;

class HistpediaApp extends App<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default HistpediaApp;
