import { AppProps } from 'next/app';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { reduxWrapper } from '../src/store';
import * as gtag from '../src/utils/gtag';
import '../styles/ress.min.css';

// type TPageProps = {
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   pageProps: {};
// };

// type Props = AppProps<AppInitialProps> & TPageProps;

// class HistpediaApp extends App<Props> {
//   static async getInitialProps({
//     Component,
//     ctx,
//   }: AppContext): Promise<TPageProps> {
//     const pageProps = Component.getInitialProps
//       ? await Component.getInitialProps(ctx)
//       : {};

//     return { pageProps };
//   }

//   /**
//    * render
//    */
//   render(): JSX.Element {
//     const { Component, pageProps } = this.props;

//     // eslint-disable-next-line react/jsx-props-no-spreading
//     return <Component {...pageProps} />;
//   }
// }

const HistpediaApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const handleRouteChange = (pagePath: string) => {
      gtag.pageview(pagePath);
    };

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
};

export default reduxWrapper.withRedux(HistpediaApp);
