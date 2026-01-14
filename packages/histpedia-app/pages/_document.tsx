import { Head, Html, Main, NextScript } from 'next/document';
import { GA_TARGET_ID } from '../src/utils/gtag';

export default function CustomDocument() {
  return (
    <Html lang="ja" className="hp">
      <Head>
        <meta
          name="description"
          content="Histpedia はウィキペディア（Wikipedia）の改訂履歴をタイムライン上にハイライトとともに表示します。"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta
          property="og:image"
          content="https://histpedia.org/shared/images/ogp-0.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TARGET_ID}`}
        />
        <script
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
      </body>
    </Html>
  );
}
