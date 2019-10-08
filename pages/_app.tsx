import 'ress/dist/ress.min.css';

import App, { AppInitialProps, AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import TransitionMotionExample from '../src/components/atoms/TransitionMotionExample';

import theme from '../src/styles/Theme';

type Props = AppInitialProps & AppProps;

class HistpediaApp extends App<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <>
          <TransitionMotionExample route={router.route} />
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    );
  }
}

export default HistpediaApp;
