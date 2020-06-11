import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  children: React.ReactNode;
  title: string;
};

// {
//   children: React.ReactNode;
//   title?: string;
// }

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/wiki/猫">
          <a>Wiki</a>
        </Link>{' '}
        |{' '}
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/users">
          <a>Users List</a>
        </Link>{' '}
        | <a href="/api/users">Users API</a>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I`&apos;`m here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
