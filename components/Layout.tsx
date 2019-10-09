import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  title?: string;
};

const titles = 'Hello_world';

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title'
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        <Link
          as={`/wiki/${titles}`}
          href={{ pathname: '/wiki', query: { titles } }}
        >
          <a>Wiki</a>
        </Link>
        |{' '}
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/initial-props">
          <a>With Initial Props</a>
        </Link>
      </nav>
    </header>
    {children}
  </div>
);

export default Layout;
