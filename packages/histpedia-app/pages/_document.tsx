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
      <Html lang="ja" className="hp">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <meta name="format-detection" content="telephone=no" />
          <title>Histpedia</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="hp-Body">
          <Main />
          <NextScript />
          <Global styles={globalStyle} />
        </body>
      </Html>
    );
  }
}
