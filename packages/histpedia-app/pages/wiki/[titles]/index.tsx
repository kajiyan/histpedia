import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import CircularProgressCover from '../../../src/components/organisms/circularProgressCover';
import Wiki from '../../../src/components/templates/wiki';
import WikiActions from '../../../src/actions/Wiki';
import { StoreState } from '../../../src/store';

interface PageProps {
  titles: string;
}

const WikiPage: NextPage<PageProps> = ({ titles }: PageProps) => {
  console.log('WikiPage', titles);

  const encodeTitles = encodeURIComponent(titles);

  const dispatch = useDispatch();
  const wikiState = useSelector((state: StoreState) => {
    return (({ currentTitle, entityIds, stylesheets, pageid, title }) => ({
      currentTitle,
      entityIds,
      stylesheets,
      pageid,
      title,
    }))(state.wiki.histories);
  }, shallowEqual);

  const { currentTitle, entityIds, stylesheets, pageid, title } = wikiState;

  useEffect(() => {
    // pageID が未取得、あるいは前回の開いた wiki/[titles] と
    // タイトルが異なっていれば pageID を再取得する
    if (currentTitle !== titles) {
      dispatch(WikiActions.fetchPageId(titles));
    }

    if (
      typeof pageid !== 'undefined' &&
      entityIds.isEmpty() &&
      stylesheets.isEmpty()
    ) {
      // pageid を取得済みかつ entityIds, stylesheets が未設定であれば Revision とスタイルシートのパスを取得する
      dispatch(WikiActions.fetchStylesheet(title as string));
      dispatch(WikiActions.fetchRevisions(pageid));
    }

    return () => {
      console.log('%c[WikiPage] useEffect clean', 'color: green');
    };
  }, [currentTitle, dispatch, entityIds, stylesheets, pageid, title, titles]);

  // Revision が未取得、スタイルシートが未取得、前回の開いた wiki/[titles] とタイトルが異なる、の
  // いづれかであればローディング画面を表示する
  const isLoading =
    entityIds.isEmpty() || stylesheets.isEmpty() || currentTitle !== titles;

  return (
    <>
      <Head>
        <meta property="og:title" content={`${titles} - Histpedia`} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://histpedia.org/wiki/${encodeTitles}/`}
        />
        <title>{titles} - Histpedia</title>
        {stylesheets.map((stylesheet) => (
          <link rel="stylesheet" href={stylesheet} key={stylesheet} />
        ))}
      </Head>
      {isLoading && <CircularProgressCover />}
      {!isLoading && <Wiki entityIds={entityIds} />}
    </>
  );
};

WikiPage.getInitialProps = (context) => {
  // 直接このディレクトリにアクセスするかもしれないのでデコードとサニタイズを行う
  const { query } = context;
  const { titles } = query;

  const decodeTitles = decodeURIComponent(titles as string);
  const sanitizedTitles = decodeTitles
    .replace(/^[\s\0x3000\uFEFF\xA0]+|[\s\0x3000\uFEFF\xA0]+$/g, '')
    .replace(/\s|\0x3000|\uFEFF|\xA0/g, '_');

  return { titles: sanitizedTitles };
};

export default WikiPage;
