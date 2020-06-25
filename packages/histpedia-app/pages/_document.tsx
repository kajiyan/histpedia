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
import { GA_TARGET_ID } from '../src/utils/gtag';
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
            name="description"
            content="Histpedia はウィキペディア（Wikipedia）の改訂履歴をタイムライン上にハイライトとともに表示します。"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta property="og:title" content="Histpedia" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://histpedia.org/" />
          <meta
            property="og:image"
            content="https://histpedia.org/shared/images/ogp-0.png"
          />
          <title>Histpedia</title>
          <link rel="manifest" href="site.webmanifest" />
          <link rel="apple-touch-icon" href="icon.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap"
            rel="stylesheet"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TARGET_ID}`}
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TARGET_ID}', { page_path: window.location.pathname });
              `,
            }}
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
