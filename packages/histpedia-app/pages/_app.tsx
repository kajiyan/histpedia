import App, { AppContext, AppProps, AppInitialProps } from 'next/app';
import React from 'react';
import { reduxWrapper } from '../src/store';
import '../styles/ress.min.css';
import '../styles/wikipedia-base-style.css';

type TPageProps = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  pageProps: {};
};

type Props = AppProps<AppInitialProps> & TPageProps;

class HistpediaApp extends App<Props> {
  static async getInitialProps({
    Component,
    ctx,
  }: AppContext): Promise<TPageProps> {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  /**
   * render
   */
  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...pageProps} />;
  }
}

export default reduxWrapper.withRedux(HistpediaApp);
