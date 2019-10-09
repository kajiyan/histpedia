import 'ress/dist/ress.min.css';

import App, { AppContext, AppProps, AppInitialProps } from 'next/app';
import withRedux from 'next-redux-wrapper';
import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import TransitionMotionExample from '../src/components/atoms/TransitionMotionExample';
import theme from '../src/styles/Theme';
import { configureStore } from '../src/store/configureStore';

type Props = AppProps<AppInitialProps> & {
  err?:
    | Error & {
        statusCode?: number;
      }
    | null;
  store: Store;
  isServer: boolean;
};

class HistpediaApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    // ctx.store.dispatch({ type: 'FOO', payload: 'foo' });

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  /**
   * render
   */
  render() {
    const { Component, pageProps, router, store } = this.props;

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <>
            <TransitionMotionExample route={router.route} />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withRedux(configureStore)(HistpediaApp);
