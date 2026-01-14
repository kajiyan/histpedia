import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { reduxWrapper } from '../src/store';
import * as gtag from '../src/utils/gtag';
import globalStyle from '../styles/global-style';
import '../styles/ress.min.css';

function HistpediaApp({ Component, ...rest }: AppProps) {
  const router = useRouter();
  const { store, props } = reduxWrapper.useWrappedStore(rest);
  const pageProps = props.pageProps ?? {};

  useEffect(() => {
    const handleRouteChange = (pagePath: string) => {
      gtag.pageview(pagePath);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <Global styles={globalStyle} />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default HistpediaApp;
