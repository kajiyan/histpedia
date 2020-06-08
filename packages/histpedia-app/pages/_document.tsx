import { Global } from '@emotion/core';
import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import globalStyle from '../styles/global-style';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

export default class CustomDocument extends NextDocument<Props> {
  public static async getInitialProps(
    context: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await NextDocument.getInitialProps(context);

    return { ...initialProps };
  }

  public render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <meta name="format-detection" content="telephone=no" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Global styles={globalStyle} />
        </body>
      </Html>
    );
  }
}
